-- Weather and Travel Planner Database Schema
-- MongoDB-style collections represented as SQL for reference

-- Users Collection
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(255) PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  preferred_language ENUM('en', 'ta') DEFAULT 'en',
  dark_mode BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- User Preferences
CREATE TABLE IF NOT EXISTS user_preferences (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  temperature_unit ENUM('celsius', 'fahrenheit') DEFAULT 'celsius',
  distance_unit ENUM('km', 'miles') DEFAULT 'km',
  weather_alerts BOOLEAN DEFAULT true,
  travel_notifications BOOLEAN DEFAULT true,
  eco_friendly_suggestions BOOLEAN DEFAULT true,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tourist Places Collection
CREATE TABLE IF NOT EXISTS tourist_places (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_tamil VARCHAR(255),
  description TEXT,
  description_tamil TEXT,
  category ENUM('beach', 'temple', 'nature', 'heritage', 'adventure', 'cultural') NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  city VARCHAR(255) NOT NULL,
  district VARCHAR(255) NOT NULL,
  best_visiting_months JSON, -- Array of month numbers
  average_visit_duration INT, -- in hours
  entry_fee DECIMAL(10, 2) DEFAULT 0,
  opening_hours JSON, -- {open: "06:00", close: "18:00"}
  rating DECIMAL(3, 2) DEFAULT 0,
  total_reviews INT DEFAULT 0,
  images JSON, -- Array of image URLs
  amenities JSON, -- Array of amenities
  accessibility_features JSON,
  eco_friendly_features JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Nearby Attractions
CREATE TABLE IF NOT EXISTS nearby_attractions (
  id VARCHAR(255) PRIMARY KEY,
  place_id VARCHAR(255) NOT NULL,
  nearby_place_id VARCHAR(255) NOT NULL,
  distance_km DECIMAL(5, 2) NOT NULL,
  travel_time_minutes INT NOT NULL,
  FOREIGN KEY (place_id) REFERENCES tourist_places(id) ON DELETE CASCADE,
  FOREIGN KEY (nearby_place_id) REFERENCES tourist_places(id) ON DELETE CASCADE
);

-- Food Spots
CREATE TABLE IF NOT EXISTS food_spots (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  name_tamil VARCHAR(255),
  place_id VARCHAR(255) NOT NULL,
  cuisine_type VARCHAR(255),
  specialty_dishes JSON,
  price_range ENUM('budget', 'mid-range', 'premium') DEFAULT 'mid-range',
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  rating DECIMAL(3, 2) DEFAULT 0,
  vegetarian_friendly BOOLEAN DEFAULT true,
  FOREIGN KEY (place_id) REFERENCES tourist_places(id) ON DELETE CASCADE
);

-- User Favorites
CREATE TABLE IF NOT EXISTS user_favorites (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  place_id VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES tourist_places(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_place (user_id, place_id)
);

-- Trip Itineraries
CREATE TABLE IF NOT EXISTS trip_itineraries (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE NOT NULL,
  end_date DATE NOT NULL,
  total_budget DECIMAL(10, 2),
  transportation_mode ENUM('car', 'bus', 'train', 'bike', 'walking') DEFAULT 'car',
  eco_friendly BOOLEAN DEFAULT false,
  status ENUM('draft', 'confirmed', 'completed', 'cancelled') DEFAULT 'draft',
  weather_dependent BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Itinerary Items
CREATE TABLE IF NOT EXISTS itinerary_items (
  id VARCHAR(255) PRIMARY KEY,
  itinerary_id VARCHAR(255) NOT NULL,
  place_id VARCHAR(255) NOT NULL,
  day_number INT NOT NULL,
  start_time TIME,
  end_time TIME,
  notes TEXT,
  estimated_cost DECIMAL(8, 2),
  weather_backup_plan TEXT,
  order_index INT NOT NULL,
  FOREIGN KEY (itinerary_id) REFERENCES trip_itineraries(id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES tourist_places(id) ON DELETE CASCADE
);

-- Weather Cache
CREATE TABLE IF NOT EXISTS weather_cache (
  id VARCHAR(255) PRIMARY KEY,
  location_key VARCHAR(255) NOT NULL, -- lat,lng or city name
  weather_data JSON NOT NULL,
  forecast_data JSON,
  cached_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expires_at TIMESTAMP NOT NULL,
  INDEX idx_location_expires (location_key, expires_at)
);

-- Local Events
CREATE TABLE IF NOT EXISTS local_events (
  id VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  title_tamil VARCHAR(255),
  description TEXT,
  description_tamil TEXT,
  event_type ENUM('festival', 'temple', 'cultural', 'concert', 'exhibition') NOT NULL,
  place_id VARCHAR(255),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE,
  start_time TIME,
  end_time TIME,
  entry_fee DECIMAL(8, 2) DEFAULT 0,
  contact_info JSON,
  images JSON,
  weather_dependent BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (place_id) REFERENCES tourist_places(id) ON DELETE SET NULL
);

-- User Badges (Gamification)
CREATE TABLE IF NOT EXISTS user_badges (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  badge_type ENUM('explorer', 'weather_wise', 'eco_warrior', 'cultural_enthusiast', 'temple_hopper', 'beach_lover', 'nature_lover') NOT NULL,
  badge_level INT DEFAULT 1,
  earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  progress_data JSON, -- Track progress towards next level
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- User Activity Log
CREATE TABLE IF NOT EXISTS user_activities (
  id VARCHAR(255) PRIMARY KEY,
  user_id VARCHAR(255) NOT NULL,
  activity_type ENUM('place_visited', 'itinerary_created', 'weather_checked', 'event_attended') NOT NULL,
  place_id VARCHAR(255),
  activity_data JSON,
  points_earned INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (place_id) REFERENCES tourist_places(id) ON DELETE SET NULL
);

-- Packing Lists
CREATE TABLE IF NOT EXISTS packing_lists (
  id VARCHAR(255) PRIMARY KEY,
  itinerary_id VARCHAR(255) NOT NULL,
  weather_based_items JSON, -- Generated based on forecast
  activity_based_items JSON, -- Based on planned activities
  user_custom_items JSON, -- User added items
  eco_friendly_alternatives JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (itinerary_id) REFERENCES trip_itineraries(id) ON DELETE CASCADE
);

-- EV Charging Stations
CREATE TABLE IF NOT EXISTS ev_charging_stations (
  id VARCHAR(255) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  address TEXT NOT NULL,
  charging_types JSON, -- ["fast", "slow", "rapid"]
  number_of_ports INT DEFAULT 1,
  availability_status ENUM('available', 'occupied', 'maintenance', 'unknown') DEFAULT 'unknown',
  pricing_info JSON,
  amenities JSON, -- ["restaurant", "restroom", "wifi"]
  last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX idx_tourist_places_category ON tourist_places(category);
CREATE INDEX idx_tourist_places_city ON tourist_places(city);
CREATE INDEX idx_tourist_places_location ON tourist_places(latitude, longitude);
CREATE INDEX idx_user_favorites_user ON user_favorites(user_id);
CREATE INDEX idx_itinerary_items_itinerary ON itinerary_items(itinerary_id);
CREATE INDEX idx_local_events_date ON local_events(start_date, end_date);
CREATE INDEX idx_weather_cache_location ON weather_cache(location_key);
