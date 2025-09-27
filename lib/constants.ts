// Constants for the Weather & Travel Planner App

export const WEATHER_API_KEY = "8987f0ac66e36030e709146c8ace1f98"
export const WEATHER_API_BASE_URL = "https://api.openweathermap.org/data/2.5"

// Tamil Nadu Districts
export const TAMIL_NADU_DISTRICTS = [
  "Chennai",
  "Coimbatore",
  "Madurai",
  "Tiruchirappalli",
  "Salem",
  "Tirunelveli",
  "Tiruppur",
  "Vellore",
  "Erode",
  "Thoothukudi",
  "Dindigul",
  "Thanjavur",
  "Ranipet",
  "Sivaganga",
  "Karur",
  "Namakkal",
  "Cuddalore",
  "Kanchipuram",
  "Villupuram",
  "Virudhunagar",
  "Tiruvannamalai",
  "Nagapattinam",
  "Dharmapuri",
  "Krishnagiri",
  "Ramanathapuram",
  "Pudukkottai",
  "Ariyalur",
  "Perambalur",
  "Kallakurichi",
  "Chengalpattu",
  "Tenkasi",
  "Tirupathur",
  "Mayiladuthurai",
  "Kanyakumari",
  "The Nilgiris",
]

// Popular Tourist Categories
export const PLACE_CATEGORIES = [
  { id: "temple", name: "Temples", nameTamil: "கோவில்கள்", icon: "🛕" },
  { id: "beach", name: "Beaches", nameTamil: "கடற்கரைகள்", icon: "🏖️" },
  { id: "nature", name: "Nature", nameTamil: "இயற்கை", icon: "🌿" },
  { id: "heritage", name: "Heritage", nameTamil: "பாரம்பரியம்", icon: "🏛️" },
  { id: "adventure", name: "Adventure", nameTamil: "சாகசம்", icon: "🏔️" },
  { id: "cultural", name: "Cultural", nameTamil: "கலாச்சாரம்", icon: "🎭" },
]

// Weather Condition Icons and Colors
export const WEATHER_CONDITIONS = {
  "clear-day": { icon: "☀️", color: "#FFA500", bgColor: "#FFF8DC" },
  "clear-night": { icon: "🌙", color: "#4169E1", bgColor: "#191970" },
  rain: { icon: "🌧️", color: "#4682B4", bgColor: "#E6F3FF" },
  snow: { icon: "❄️", color: "#87CEEB", bgColor: "#F0F8FF" },
  sleet: { icon: "🌨️", color: "#708090", bgColor: "#F5F5F5" },
  wind: { icon: "💨", color: "#20B2AA", bgColor: "#E0FFFF" },
  fog: { icon: "🌫️", color: "#696969", bgColor: "#F5F5F5" },
  cloudy: { icon: "☁️", color: "#708090", bgColor: "#F0F0F0" },
  "partly-cloudy-day": { icon: "⛅", color: "#DAA520", bgColor: "#FFFACD" },
  "partly-cloudy-night": { icon: "☁️", color: "#4682B4", bgColor: "#2F4F4F" },
  thunderstorm: { icon: "⛈️", color: "#8B0000", bgColor: "#FFE4E1" },
}

// Badge Types and Requirements
export const BADGE_TYPES = {
  explorer: {
    name: "Explorer",
    nameTamil: "ஆய்வாளர்",
    description: "Visit different places",
    levels: [5, 15, 30, 50, 100], // places to visit for each level
    icon: "🗺️",
  },
  weather_wise: {
    name: "Weather Wise",
    nameTamil: "வானிலை அறிஞர்",
    description: "Check weather regularly",
    levels: [10, 25, 50, 100, 200], // weather checks
    icon: "🌤️",
  },
  eco_warrior: {
    name: "Eco Warrior",
    nameTamil: "சுற்றுச்சூழல் வீரர்",
    description: "Choose eco-friendly options",
    levels: [5, 15, 30, 50, 100], // eco-friendly choices
    icon: "🌱",
  },
  cultural_enthusiast: {
    name: "Cultural Enthusiast",
    nameTamil: "கலாச்சார ஆர்வலர்",
    description: "Visit cultural sites",
    levels: [3, 10, 20, 35, 60], // cultural places visited
    icon: "🎭",
  },
  temple_hopper: {
    name: "Temple Hopper",
    nameTamil: "கோவில் பயணி",
    description: "Visit temples across Tamil Nadu",
    levels: [5, 15, 30, 50, 100], // temples visited
    icon: "🛕",
  },
  beach_lover: {
    name: "Beach Lover",
    nameTamil: "கடற்கரை காதலர்",
    description: "Explore coastal destinations",
    levels: [3, 8, 15, 25, 40], // beaches visited
    icon: "🏖️",
  },
  nature_lover: {
    name: "Nature Lover",
    nameTamil: "இயற்கை காதலர்",
    description: "Connect with nature",
    levels: [5, 12, 25, 40, 70], // nature spots visited
    icon: "🌿",
  },
}

// Packing Suggestions Based on Weather
export const PACKING_SUGGESTIONS = {
  hot: ["Light cotton clothes", "Sunscreen", "Hat", "Sunglasses", "Water bottle"],
  warm: ["Comfortable clothes", "Light jacket", "Comfortable shoes"],
  cool: ["Warm clothes", "Jacket", "Closed shoes", "Light scarf"],
  cold: ["Heavy jacket", "Warm clothes", "Gloves", "Warm shoes", "Thermal wear"],
  rainy: ["Umbrella", "Raincoat", "Waterproof bag", "Quick-dry clothes"],
  windy: ["Windproof jacket", "Secure hat", "Protective eyewear"],
}

// Activity Recommendations Based on Weather
export const WEATHER_ACTIVITIES = {
  sunny: ["Beach visits", "Outdoor photography", "Hiking", "Temple visits"],
  cloudy: ["Sightseeing", "Cultural tours", "Shopping", "Museum visits"],
  rainy: ["Indoor attractions", "Covered markets", "Temples with shelter", "Cafes"],
  stormy: ["Indoor activities", "Hotels/resorts", "Covered shopping areas"],
}

// Default App Settings
export const DEFAULT_SETTINGS = {
  temperatureUnit: "celsius" as const,
  distanceUnit: "km" as const,
  language: "en" as const,
  darkMode: false,
  weatherAlerts: true,
  travelNotifications: true,
  ecoFriendlySuggestions: true,
}

// API Endpoints
export const API_ENDPOINTS = {
  weather: {
    current: "/api/weather/current",
    forecast: "/api/weather/forecast",
    alerts: "/api/weather/alerts",
  },
  places: {
    list: "/api/places",
    search: "/api/places/search",
    details: "/api/places/:id",
    nearby: "/api/places/:id/nearby",
  },
  user: {
    profile: "/api/user/profile",
    preferences: "/api/user/preferences",
    favorites: "/api/user/favorites",
    badges: "/api/user/badges",
  },
  itinerary: {
    list: "/api/itineraries",
    create: "/api/itineraries",
    details: "/api/itineraries/:id",
    update: "/api/itineraries/:id",
  },
  ai: {
    recommendations: "/api/ai/recommendations",
    tripPlanner: "/api/ai/trip-planner",
    packingList: "/api/ai/packing-list",
  },
}
