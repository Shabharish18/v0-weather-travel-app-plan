// Tourist Places Service for managing place data and operations
import { getCollection, COLLECTIONS } from "./database"
import type { TouristPlace, SearchParams, PlacesApiResponse } from "./types"
import { PLACE_CATEGORIES, TAMIL_NADU_DISTRICTS } from "./constants"

export class PlacesService {
  // Get all places with optional filtering and pagination
  static async getPlaces(params: SearchParams = {}): Promise<PlacesApiResponse> {
    try {
      const { query, filters = {}, sortBy = "rating", sortOrder = "desc", page = 1, limit = 20 } = params

      const collection = await getCollection<TouristPlace>(COLLECTIONS.TOURIST_PLACES)

      // Build MongoDB query
      const mongoQuery: any = {}

      // Text search
      if (query) {
        mongoQuery.$or = [
          { name: { $regex: query, $options: "i" } },
          { nameTamil: { $regex: query, $options: "i" } },
          { description: { $regex: query, $options: "i" } },
          { city: { $regex: query, $options: "i" } },
          { district: { $regex: query, $options: "i" } },
        ]
      }

      // Apply filters
      if (filters.category && filters.category.length > 0) {
        mongoQuery.category = { $in: filters.category }
      }

      if (filters.city) {
        mongoQuery.city = { $regex: filters.city, $options: "i" }
      }

      if (filters.district) {
        mongoQuery.district = { $regex: filters.district, $options: "i" }
      }

      if (filters.rating) {
        mongoQuery.rating = { $gte: filters.rating }
      }

      if (filters.entryFee) {
        const feeQuery: any = {}
        if (filters.entryFee.min !== undefined) feeQuery.$gte = filters.entryFee.min
        if (filters.entryFee.max !== undefined) feeQuery.$lte = filters.entryFee.max
        mongoQuery.entryFee = feeQuery
      }

      if (filters.amenities && filters.amenities.length > 0) {
        mongoQuery.amenities = { $in: filters.amenities }
      }

      if (filters.ecoFriendly) {
        mongoQuery.ecoFriendlyFeatures = { $exists: true, $ne: [] }
      }

      // Build sort object
      const sortObj: any = {}
      sortObj[sortBy] = sortOrder === "desc" ? -1 : 1

      // Execute query with pagination
      const skip = (page - 1) * limit
      const places = await collection.find(mongoQuery).sort(sortObj).skip(skip).limit(limit).toArray()

      // Get total count for pagination
      const total = await collection.countDocuments(mongoQuery)
      const totalPages = Math.ceil(total / limit)

      return {
        success: true,
        data: places,
        pagination: {
          page,
          limit,
          total,
          totalPages,
        },
      }
    } catch (error) {
      console.error("Error fetching places:", error)
      return {
        success: false,
        error: "Failed to fetch places",
      }
    }
  }

  // Get place by ID with nearby attractions and food spots
  static async getPlaceById(id: string): Promise<{
    success: boolean
    data?: TouristPlace & {
      nearbyAttractions: TouristPlace[]
      foodSpots: any[]
    }
    error?: string
  }> {
    try {
      const placesCollection = await getCollection<TouristPlace>(COLLECTIONS.TOURIST_PLACES)
      const nearbyCollection = await getCollection(COLLECTIONS.NEARBY_ATTRACTIONS)
      const foodCollection = await getCollection(COLLECTIONS.FOOD_SPOTS)

      // Get main place
      const place = await placesCollection.findOne({ id })
      if (!place) {
        return { success: false, error: "Place not found" }
      }

      // Get nearby attractions
      const nearbyAttractions = await nearbyCollection
        .aggregate([
          { $match: { placeId: id } },
          {
            $lookup: {
              from: COLLECTIONS.TOURIST_PLACES,
              localField: "nearbyPlaceId",
              foreignField: "id",
              as: "place",
            },
          },
          { $unwind: "$place" },
          { $sort: { distanceKm: 1 } },
          { $limit: 5 },
          {
            $project: {
              _id: 0,
              distanceKm: 1,
              travelTimeMinutes: 1,
              place: 1,
            },
          },
        ])
        .toArray()

      // Get food spots
      const foodSpots = await foodCollection.find({ placeId: id }).sort({ rating: -1 }).limit(5).toArray()

      return {
        success: true,
        data: {
          ...place,
          nearbyAttractions: nearbyAttractions.map((item: any) => item.place),
          foodSpots,
        },
      }
    } catch (error) {
      console.error("Error fetching place details:", error)
      return {
        success: false,
        error: "Failed to fetch place details",
      }
    }
  }

  // Get places by category
  static async getPlacesByCategory(category: string, limit = 10): Promise<TouristPlace[]> {
    try {
      const collection = await getCollection<TouristPlace>(COLLECTIONS.TOURIST_PLACES)
      const places = await collection.find({ category }).sort({ rating: -1 }).limit(limit).toArray()

      return places
    } catch (error) {
      console.error("Error fetching places by category:", error)
      return []
    }
  }

  // Get places near coordinates (for location-based recommendations)
  static async getPlacesNearLocation(
    latitude: number,
    longitude: number,
    radiusKm = 50,
    limit = 10,
  ): Promise<TouristPlace[]> {
    try {
      const collection = await getCollection<TouristPlace>(COLLECTIONS.TOURIST_PLACES)

      // Use MongoDB geospatial query
      const places = await collection
        .find({
          location: {
            $near: {
              $geometry: {
                type: "Point",
                coordinates: [longitude, latitude],
              },
              $maxDistance: radiusKm * 1000, // Convert to meters
            },
          },
        })
        .limit(limit)
        .toArray()

      return places
    } catch (error) {
      console.error("Error fetching places near location:", error)
      // Fallback: calculate distance manually
      return this.getPlacesNearLocationFallback(latitude, longitude, radiusKm, limit)
    }
  }

  // Fallback method for location-based search without geospatial index
  private static async getPlacesNearLocationFallback(
    latitude: number,
    longitude: number,
    radiusKm: number,
    limit: number,
  ): Promise<TouristPlace[]> {
    try {
      const collection = await getCollection<TouristPlace>(COLLECTIONS.TOURIST_PLACES)
      const allPlaces = await collection.find({}).toArray()

      // Calculate distances and filter
      const placesWithDistance = allPlaces
        .map((place) => ({
          ...place,
          distance: this.calculateDistance(latitude, longitude, place.latitude, place.longitude),
        }))
        .filter((place) => place.distance <= radiusKm)
        .sort((a, b) => a.distance - b.distance)
        .slice(0, limit)

      return placesWithDistance
    } catch (error) {
      console.error("Error in fallback location search:", error)
      return []
    }
  }

  // Calculate distance between two coordinates using Haversine formula
  private static calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371 // Earth's radius in kilometers
    const dLat = this.toRadians(lat2 - lat1)
    const dLon = this.toRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.toRadians(lat1)) * Math.cos(this.toRadians(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  private static toRadians(degrees: number): number {
    return degrees * (Math.PI / 180)
  }

  // Get popular places (highest rated)
  static async getPopularPlaces(limit = 10): Promise<TouristPlace[]> {
    try {
      const collection = await getCollection<TouristPlace>(COLLECTIONS.TOURIST_PLACES)
      const places = await collection.find({}).sort({ rating: -1, totalReviews: -1 }).limit(limit).toArray()

      return places
    } catch (error) {
      console.error("Error fetching popular places:", error)
      return []
    }
  }

  // Get places suitable for current month
  static async getPlacesForCurrentMonth(limit = 10): Promise<TouristPlace[]> {
    try {
      const currentMonth = new Date().getMonth() + 1 // JavaScript months are 0-indexed
      const collection = await getCollection<TouristPlace>(COLLECTIONS.TOURIST_PLACES)

      const places = await collection
        .find({
          bestVisitingMonths: { $in: [currentMonth] },
        })
        .sort({ rating: -1 })
        .limit(limit)
        .toArray()

      return places
    } catch (error) {
      console.error("Error fetching places for current month:", error)
      return []
    }
  }

  // Search suggestions for autocomplete
  static async getSearchSuggestions(query: string, limit = 5): Promise<string[]> {
    try {
      const collection = await getCollection<TouristPlace>(COLLECTIONS.TOURIST_PLACES)

      const places = await collection
        .find({
          $or: [
            { name: { $regex: query, $options: "i" } },
            { city: { $regex: query, $options: "i" } },
            { district: { $regex: query, $options: "i" } },
          ],
        })
        .limit(limit)
        .toArray()

      const suggestions = new Set<string>()

      places.forEach((place) => {
        if (place.name.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(place.name)
        }
        if (place.city.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(place.city)
        }
        if (place.district.toLowerCase().includes(query.toLowerCase())) {
          suggestions.add(place.district)
        }
      })

      return Array.from(suggestions).slice(0, limit)
    } catch (error) {
      console.error("Error fetching search suggestions:", error)
      return []
    }
  }

  // Get available filters data
  static async getFilterOptions(): Promise<{
    categories: typeof PLACE_CATEGORIES
    districts: string[]
    cities: string[]
    amenities: string[]
  }> {
    try {
      const collection = await getCollection<TouristPlace>(COLLECTIONS.TOURIST_PLACES)

      // Get unique cities and amenities from database
      const cities = await collection.distinct("city")
      const amenitiesArrays = await collection.distinct("amenities")
      const amenities = [...new Set(amenitiesArrays.flat())]

      return {
        categories: PLACE_CATEGORIES,
        districts: TAMIL_NADU_DISTRICTS,
        cities: cities.sort(),
        amenities: amenities.sort(),
      }
    } catch (error) {
      console.error("Error fetching filter options:", error)
      return {
        categories: PLACE_CATEGORIES,
        districts: TAMIL_NADU_DISTRICTS,
        cities: [],
        amenities: [],
      }
    }
  }
}
