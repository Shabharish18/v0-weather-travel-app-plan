"use client"

// Custom hooks for places data management
import { useState, useEffect } from "react"
import useSWR from "swr"
import type { SearchParams, PlacesApiResponse } from "@/lib/types"

const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error("Failed to fetch places")
  }
  const data = await response.json()
  if (!data.success) {
    throw new Error(data.error || "Places API error")
  }
  return data
}

// Hook for places list with search and filters
export function usePlaces(params: SearchParams = {}) {
  const queryString = new URLSearchParams()

  if (params.query) queryString.set("query", params.query)
  if (params.sortBy) queryString.set("sortBy", params.sortBy)
  if (params.sortOrder) queryString.set("sortOrder", params.sortOrder)
  if (params.page) queryString.set("page", params.page.toString())
  if (params.limit) queryString.set("limit", params.limit.toString())

  // Add filters
  if (params.filters) {
    const { filters } = params
    if (filters.category) queryString.set("category", filters.category.join(","))
    if (filters.city) queryString.set("city", filters.city)
    if (filters.district) queryString.set("district", filters.district)
    if (filters.rating) queryString.set("rating", filters.rating.toString())
    if (filters.entryFee?.min) queryString.set("minFee", filters.entryFee.min.toString())
    if (filters.entryFee?.max) queryString.set("maxFee", filters.entryFee.max.toString())
    if (filters.amenities) queryString.set("amenities", filters.amenities.join(","))
    if (filters.ecoFriendly) queryString.set("ecoFriendly", "true")
  }

  const url = `/api/places?${queryString.toString()}`

  const {
    data,
    error,
    mutate: refetch,
    isLoading,
  } = useSWR<PlacesApiResponse>(url, fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 300000, // 5 minutes
  })

  return {
    places: data?.data || [],
    pagination: data?.pagination,
    isLoading,
    error: error?.message || null,
    refetch,
  }
}

// Hook for individual place details
export function usePlace(id: string | null) {
  const url = id ? `/api/places/${id}` : null

  const {
    data,
    error,
    mutate: refetch,
    isLoading,
  } = useSWR(url, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    place: data?.data || null,
    isLoading,
    error: error?.message || null,
    refetch,
  }
}

// Hook for search suggestions
export function useSearchSuggestions(query: string) {
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([])
      return
    }

    const timeoutId = setTimeout(async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`/api/places/search?q=${encodeURIComponent(query)}`)
        const data = await response.json()
        if (data.success) {
          setSuggestions(data.data)
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error)
      } finally {
        setIsLoading(false)
      }
    }, 300) // Debounce

    return () => clearTimeout(timeoutId)
  }, [query])

  return { suggestions, isLoading }
}

// Hook for filter options
export function useFilterOptions() {
  const { data, error, isLoading } = useSWR("/api/places/filters", fetcher, {
    revalidateOnFocus: false,
    dedupingInterval: 3600000, // 1 hour - filter options don't change often
  })

  return {
    filterOptions: data?.data || null,
    isLoading,
    error: error?.message || null,
  }
}

// Hook for popular places
export function usePopularPlaces(limit = 10) {
  const { data, error, isLoading } = useSWR<PlacesApiResponse>(
    `/api/places?sortBy=rating&sortOrder=desc&limit=${limit}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1800000, // 30 minutes
    },
  )

  return {
    places: data?.data || [],
    isLoading,
    error: error?.message || null,
  }
}

// Hook for places by category
export function usePlacesByCategory(category: string, limit = 10) {
  const { data, error, isLoading } = useSWR<PlacesApiResponse>(
    `/api/places?category=${category}&sortBy=rating&sortOrder=desc&limit=${limit}`,
    fetcher,
    {
      revalidateOnFocus: false,
      dedupingInterval: 1800000, // 30 minutes
    },
  )

  return {
    places: data?.data || [],
    isLoading,
    error: error?.message || null,
  }
}

// Hook for location-based places (requires geolocation)
export function useNearbyPlaces(radiusKm = 50, limit = 10) {
  const [location, setLocation] = useState<{ lat: number; lon: number } | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          })
          setLocationError(null)
        },
        (error) => {
          setLocationError("Failed to get location: " + error.message)
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000, // 5 minutes
        },
      )
    } else {
      setLocationError("Geolocation is not supported")
    }
  }, [])

  // For now, return popular places as fallback
  // In a real implementation, you'd have a separate API endpoint for nearby places
  const popularPlaces = usePopularPlaces(limit)

  return {
    places: popularPlaces.places,
    location,
    locationError,
    isLoading: popularPlaces.isLoading,
    error: popularPlaces.error,
  }
}
