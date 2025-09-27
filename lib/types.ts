// Core TypeScript interfaces for the Weather & Travel Planner

export interface User {
  id: string
  email: string
  name: string
  preferredLanguage: "en" | "ta"
  darkMode: boolean
  createdAt: Date
  updatedAt: Date
}

export interface UserPreferences {
  id: string
  userId: string
  temperatureUnit: "celsius" | "fahrenheit"
  distanceUnit: "km" | "miles"
  weatherAlerts: boolean
  travelNotifications: boolean
  ecoFriendlySuggestions: boolean
}

export interface TouristPlace {
  id: string
  name: string
  nameTamil?: string
  description: string
  descriptionTamil?: string
  category: "beach" | "temple" | "nature" | "heritage" | "adventure" | "cultural"
  latitude: number
  longitude: number
  city: string
  district: string
  bestVisitingMonths: number[]
  averageVisitDuration: number // in hours
  entryFee: number
  openingHours: {
    open: string
    close: string
  }
  rating: number
  totalReviews: number
  images: string[]
  amenities: string[]
  accessibilityFeatures: string[]
  ecoFriendlyFeatures: string[]
  createdAt: Date
  updatedAt: Date
}

export interface WeatherData {
  location: {
    name: string
    latitude: number
    longitude: number
  }
  current: {
    temperature: number
    feelsLike: number
    humidity: number
    windSpeed: number
    windDirection: string
    visibility: number
    uvIndex: number
    condition: string
    icon: string
    pressure: number
    dewPoint: number
  }
  forecast: {
    date: string
    high: number
    low: number
    condition: string
    icon: string
    precipitationChance: number
    windSpeed: number
    humidity: number
    uvIndex: number
  }[]
  hourly: {
    time: string
    temperature: number
    condition: string
    icon: string
    precipitationChance: number
    windSpeed: number
  }[]
  alerts: WeatherAlert[]
}

export interface WeatherAlert {
  id: string
  type: "rain" | "storm" | "uv" | "heat" | "cold" | "wind"
  severity: "low" | "medium" | "high" | "extreme"
  title: string
  description: string
  startTime: Date
  endTime: Date
  affectedAreas: string[]
}

export interface TripItinerary {
  id: string
  userId: string
  title: string
  description?: string
  startDate: Date
  endDate: Date
  totalBudget?: number
  transportationMode: "car" | "bus" | "train" | "bike" | "walking"
  ecoFriendly: boolean
  status: "draft" | "confirmed" | "completed" | "cancelled"
  weatherDependent: boolean
  items: ItineraryItem[]
  createdAt: Date
  updatedAt: Date
}

export interface ItineraryItem {
  id: string
  itineraryId: string
  placeId: string
  place?: TouristPlace
  dayNumber: number
  startTime?: string
  endTime?: string
  notes?: string
  estimatedCost?: number
  weatherBackupPlan?: string
  orderIndex: number
}

export interface LocalEvent {
  id: string
  title: string
  titleTamil?: string
  description: string
  descriptionTamil?: string
  eventType: "festival" | "temple" | "cultural" | "concert" | "exhibition"
  placeId?: string
  latitude: number
  longitude: number
  startDate: Date
  endDate?: Date
  startTime?: string
  endTime?: string
  entryFee: number
  contactInfo: Record<string, any>
  images: string[]
  weatherDependent: boolean
  createdAt: Date
}

export interface UserBadge {
  id: string
  userId: string
  badgeType:
    | "explorer"
    | "weather_wise"
    | "eco_warrior"
    | "cultural_enthusiast"
    | "temple_hopper"
    | "beach_lover"
    | "nature_lover"
  badgeLevel: number
  earnedAt: Date
  progressData: Record<string, any>
}

export interface PackingList {
  id: string
  itineraryId: string
  weatherBasedItems: string[]
  activityBasedItems: string[]
  userCustomItems: string[]
  ecoFriendlyAlternatives: Record<string, string>
  createdAt: Date
  updatedAt: Date
}

export interface EVChargingStation {
  id: string
  name: string
  latitude: number
  longitude: number
  address: string
  chargingTypes: string[]
  numberOfPorts: number
  availabilityStatus: "available" | "occupied" | "maintenance" | "unknown"
  pricingInfo: Record<string, any>
  amenities: string[]
  lastUpdated: Date
}

// API Response Types
export interface WeatherApiResponse {
  success: boolean
  data?: WeatherData
  error?: string
}

export interface PlacesApiResponse {
  success: boolean
  data?: TouristPlace[]
  pagination?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  error?: string
}

// Search and Filter Types
export interface PlaceFilters {
  category?: string[]
  city?: string
  district?: string
  rating?: number
  entryFee?: {
    min?: number
    max?: number
  }
  amenities?: string[]
  ecoFriendly?: boolean
}

export interface SearchParams {
  query?: string
  filters?: PlaceFilters
  sortBy?: "name" | "rating" | "distance" | "popularity"
  sortOrder?: "asc" | "desc"
  page?: number
  limit?: number
}

// AI Recommendation Types
export interface TravelRecommendation {
  place: TouristPlace
  score: number
  reasons: string[]
  bestVisitTime: {
    date: string
    timeSlot: string
    weatherCondition: string
  }
  alternativePlans: {
    condition: string
    suggestion: string
  }[]
}

export interface WeatherTravelSuggestion {
  date: string
  weather: {
    condition: string
    temperature: number
    precipitationChance: number
  }
  recommendedActivities: string[]
  bestPlaces: TouristPlace[]
  packingTips: string[]
  travelTips: string[]
}
