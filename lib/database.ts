// Database connection and utility functions
// Note: This is a MongoDB connection setup as requested

import { MongoClient, type Db, type Collection } from "mongodb"

let client: MongoClient
let db: Db

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017"
const DATABASE_NAME = "weather_travel_planner"

export async function connectToDatabase(): Promise<Db> {
  if (db) {
    return db
  }

  try {
    client = new MongoClient(MONGODB_URI)
    await client.connect()
    db = client.db(DATABASE_NAME)

    console.log("Connected to MongoDB")
    return db
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    throw error
  }
}

export async function getCollection<T = any>(collectionName: string): Promise<Collection<T>> {
  const database = await connectToDatabase()
  return database.collection<T>(collectionName)
}

// Collection names
export const COLLECTIONS = {
  USERS: "users",
  USER_PREFERENCES: "user_preferences",
  TOURIST_PLACES: "tourist_places",
  NEARBY_ATTRACTIONS: "nearby_attractions",
  FOOD_SPOTS: "food_spots",
  USER_FAVORITES: "user_favorites",
  TRIP_ITINERARIES: "trip_itineraries",
  ITINERARY_ITEMS: "itinerary_items",
  WEATHER_CACHE: "weather_cache",
  LOCAL_EVENTS: "local_events",
  USER_BADGES: "user_badges",
  USER_ACTIVITIES: "user_activities",
  PACKING_LISTS: "packing_lists",
  EV_CHARGING_STATIONS: "ev_charging_stations",
} as const

// Database utility functions
export class DatabaseService {
  static async createIndexes() {
    const db = await connectToDatabase()

    // Create indexes for better performance
    await db.collection(COLLECTIONS.TOURIST_PLACES).createIndexes([
      { key: { category: 1 } },
      { key: { city: 1 } },
      { key: { location: "2dsphere" } }, // For geospatial queries
      { key: { rating: -1 } },
    ])

    await db
      .collection(COLLECTIONS.USER_FAVORITES)
      .createIndexes([{ key: { userId: 1 } }, { key: { userId: 1, placeId: 1 }, unique: true }])

    await db.collection(COLLECTIONS.WEATHER_CACHE).createIndexes([
      { key: { locationKey: 1 } },
      { key: { expiresAt: 1 }, expireAfterSeconds: 0 }, // TTL index
    ])

    await db
      .collection(COLLECTIONS.LOCAL_EVENTS)
      .createIndexes([{ key: { startDate: 1 } }, { key: { eventType: 1 } }, { key: { location: "2dsphere" } }])

    console.log("Database indexes created successfully")
  }

  static async seedInitialData() {
    const db = await connectToDatabase()

    // Check if data already exists
    const placesCount = await db.collection(COLLECTIONS.TOURIST_PLACES).countDocuments()
    if (placesCount > 0) {
      console.log("Database already seeded")
      return
    }

    // This will be populated with actual Tamil Nadu tourist places data
    console.log("Seeding initial data...")
    // Seed data will be added in the next step
  }
}

// Close database connection
export async function closeDatabaseConnection() {
  if (client) {
    await client.close()
    console.log("Database connection closed")
  }
}
