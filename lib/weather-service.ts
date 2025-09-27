// Weather API Service using OpenWeatherMap API
import { WEATHER_API_KEY, WEATHER_API_BASE_URL } from "./constants"
import type { WeatherData, WeatherAlert } from "./types"

export class WeatherService {
  private static readonly API_KEY = WEATHER_API_KEY
  private static readonly BASE_URL = WEATHER_API_BASE_URL

  // Get current weather by coordinates
  static async getCurrentWeather(lat: number, lon: number): Promise<WeatherData> {
    try {
      const response = await fetch(`${this.BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`)

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }

      const data = await response.json()
      return this.transformCurrentWeatherData(data)
    } catch (error) {
      console.error("Error fetching current weather:", error)
      throw new Error("Failed to fetch current weather data")
    }
  }

  // Get current weather by city name
  static async getCurrentWeatherByCity(city: string): Promise<WeatherData> {
    try {
      const response = await fetch(
        `${this.BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${this.API_KEY}&units=metric`,
      )

      if (!response.ok) {
        throw new Error(`Weather API error: ${response.status}`)
      }

      const data = await response.json()
      return this.transformCurrentWeatherData(data)
    } catch (error) {
      console.error("Error fetching weather by city:", error)
      throw new Error("Failed to fetch weather data for city")
    }
  }

  // Get 7-day forecast
  static async getForecast(lat: number, lon: number): Promise<WeatherData> {
    try {
      // Get current weather
      const currentWeather = await this.getCurrentWeather(lat, lon)

      // Get 5-day forecast (OpenWeatherMap free tier limitation)
      const forecastResponse = await fetch(
        `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`,
      )

      if (!forecastResponse.ok) {
        throw new Error(`Forecast API error: ${forecastResponse.status}`)
      }

      const forecastData = await forecastResponse.json()

      // Get hourly data for today
      const hourlyResponse = await fetch(
        `${this.BASE_URL}/forecast?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric&cnt=24`,
      )

      const hourlyData = hourlyResponse.ok ? await hourlyResponse.json() : null

      return {
        ...currentWeather,
        forecast: this.transformForecastData(forecastData),
        hourly: this.transformHourlyData(hourlyData),
      }
    } catch (error) {
      console.error("Error fetching forecast:", error)
      throw new Error("Failed to fetch weather forecast")
    }
  }

  // Get weather alerts (using One Call API if available, otherwise generate based on conditions)
  static async getWeatherAlerts(lat: number, lon: number): Promise<WeatherAlert[]> {
    try {
      // Try One Call API first (requires subscription)
      const oneCallResponse = await fetch(
        `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&appid=${this.API_KEY}&units=metric`,
      )

      if (oneCallResponse.ok) {
        const data = await oneCallResponse.json()
        return this.transformAlertsData(data.alerts || [])
      }

      // Fallback: Generate alerts based on current conditions
      const currentWeather = await this.getCurrentWeather(lat, lon)
      return this.generateAlertsFromConditions(currentWeather)
    } catch (error) {
      console.error("Error fetching weather alerts:", error)
      return []
    }
  }

  // Transform OpenWeatherMap current weather data to our format
  private static transformCurrentWeatherData(data: any): WeatherData {
    return {
      location: {
        name: data.name,
        latitude: data.coord.lat,
        longitude: data.coord.lon,
      },
      current: {
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        humidity: data.main.humidity,
        windSpeed: data.wind?.speed || 0,
        windDirection: this.getWindDirection(data.wind?.deg || 0),
        visibility: data.visibility ? data.visibility / 1000 : 10, // Convert to km
        uvIndex: 0, // Not available in current weather API
        condition: data.weather[0].description,
        icon: this.mapWeatherIcon(data.weather[0].icon),
        pressure: data.main.pressure,
        dewPoint: this.calculateDewPoint(data.main.temp, data.main.humidity),
      },
      forecast: [],
      hourly: [],
      alerts: [],
    }
  }

  // Transform forecast data
  private static transformForecastData(data: any) {
    const dailyForecasts = new Map()

    data.list.forEach((item: any) => {
      const date = new Date(item.dt * 1000).toISOString().split("T")[0]

      if (!dailyForecasts.has(date)) {
        dailyForecasts.set(date, {
          date,
          high: item.main.temp_max,
          low: item.main.temp_min,
          condition: item.weather[0].description,
          icon: this.mapWeatherIcon(item.weather[0].icon),
          precipitationChance: Math.round((item.pop || 0) * 100),
          windSpeed: item.wind?.speed || 0,
          humidity: item.main.humidity,
          uvIndex: 0,
        })
      } else {
        const existing = dailyForecasts.get(date)
        existing.high = Math.max(existing.high, item.main.temp_max)
        existing.low = Math.min(existing.low, item.main.temp_min)
      }
    })

    return Array.from(dailyForecasts.values())
      .slice(0, 7)
      .map((forecast: any) => ({
        ...forecast,
        high: Math.round(forecast.high),
        low: Math.round(forecast.low),
      }))
  }

  // Transform hourly data
  private static transformHourlyData(data: any) {
    if (!data || !data.list) return []

    return data.list.slice(0, 24).map((item: any) => ({
      time: new Date(item.dt * 1000).toISOString(),
      temperature: Math.round(item.main.temp),
      condition: item.weather[0].description,
      icon: this.mapWeatherIcon(item.weather[0].icon),
      precipitationChance: Math.round((item.pop || 0) * 100),
      windSpeed: item.wind?.speed || 0,
    }))
  }

  // Transform alerts data
  private static transformAlertsData(alerts: any[]): WeatherAlert[] {
    return alerts.map((alert: any) => ({
      id: `alert_${Date.now()}_${Math.random()}`,
      type: this.mapAlertType(alert.event),
      severity: this.mapAlertSeverity(alert.tags),
      title: alert.event,
      description: alert.description,
      startTime: new Date(alert.start * 1000),
      endTime: new Date(alert.end * 1000),
      affectedAreas: alert.areas || [],
    }))
  }

  // Generate alerts based on current conditions
  private static generateAlertsFromConditions(weather: WeatherData): WeatherAlert[] {
    const alerts: WeatherAlert[] = []
    const current = weather.current

    // High temperature alert
    if (current.temperature > 40) {
      alerts.push({
        id: `heat_${Date.now()}`,
        type: "heat",
        severity: current.temperature > 45 ? "extreme" : "high",
        title: "Extreme Heat Warning",
        description: `Temperature is ${current.temperature}°C. Stay hydrated and avoid outdoor activities.`,
        startTime: new Date(),
        endTime: new Date(Date.now() + 6 * 60 * 60 * 1000), // 6 hours
        affectedAreas: [weather.location.name],
      })
    }

    // High UV alert (if available)
    if (current.uvIndex > 8) {
      alerts.push({
        id: `uv_${Date.now()}`,
        type: "uv",
        severity: current.uvIndex > 10 ? "extreme" : "high",
        title: "High UV Index",
        description: `UV Index is ${current.uvIndex}. Use sunscreen and protective clothing.`,
        startTime: new Date(),
        endTime: new Date(Date.now() + 4 * 60 * 60 * 1000), // 4 hours
        affectedAreas: [weather.location.name],
      })
    }

    // High wind alert
    if (current.windSpeed > 15) {
      alerts.push({
        id: `wind_${Date.now()}`,
        type: "wind",
        severity: current.windSpeed > 25 ? "high" : "medium",
        title: "Strong Wind Advisory",
        description: `Wind speed is ${current.windSpeed} m/s. Be cautious of flying debris.`,
        startTime: new Date(),
        endTime: new Date(Date.now() + 3 * 60 * 60 * 1000), // 3 hours
        affectedAreas: [weather.location.name],
      })
    }

    // Rain alert based on condition
    if (current.condition.toLowerCase().includes("rain") || current.condition.toLowerCase().includes("storm")) {
      alerts.push({
        id: `rain_${Date.now()}`,
        type: current.condition.toLowerCase().includes("storm") ? "storm" : "rain",
        severity: current.condition.toLowerCase().includes("heavy") ? "high" : "medium",
        title: current.condition.toLowerCase().includes("storm") ? "Thunderstorm Alert" : "Rain Alert",
        description: `${current.condition} expected. Carry umbrella and avoid outdoor activities.`,
        startTime: new Date(),
        endTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours
        affectedAreas: [weather.location.name],
      })
    }

    return alerts
  }

  // Helper methods
  private static mapWeatherIcon(icon: string): string {
    const iconMap: Record<string, string> = {
      "01d": "clear-day",
      "01n": "clear-night",
      "02d": "partly-cloudy-day",
      "02n": "partly-cloudy-night",
      "03d": "cloudy",
      "03n": "cloudy",
      "04d": "cloudy",
      "04n": "cloudy",
      "09d": "rain",
      "09n": "rain",
      "10d": "rain",
      "10n": "rain",
      "11d": "thunderstorm",
      "11n": "thunderstorm",
      "13d": "snow",
      "13n": "snow",
      "50d": "fog",
      "50n": "fog",
    }
    return iconMap[icon] || "cloudy"
  }

  private static getWindDirection(degrees: number): string {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ]
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  }

  private static calculateDewPoint(temp: number, humidity: number): number {
    const a = 17.27
    const b = 237.7
    const alpha = (a * temp) / (b + temp) + Math.log(humidity / 100)
    return Math.round((b * alpha) / (a - alpha))
  }

  private static mapAlertType(event: string): WeatherAlert["type"] {
    const eventLower = event.toLowerCase()
    if (eventLower.includes("rain") || eventLower.includes("flood")) return "rain"
    if (eventLower.includes("storm") || eventLower.includes("thunder")) return "storm"
    if (eventLower.includes("heat")) return "heat"
    if (eventLower.includes("cold") || eventLower.includes("freeze")) return "cold"
    if (eventLower.includes("wind")) return "wind"
    if (eventLower.includes("uv")) return "uv"
    return "rain" // default
  }

  private static mapAlertSeverity(tags: string[]): WeatherAlert["severity"] {
    if (!tags) return "medium"
    const tagsStr = tags.join(" ").toLowerCase()
    if (tagsStr.includes("extreme")) return "extreme"
    if (tagsStr.includes("severe") || tagsStr.includes("high")) return "high"
    if (tagsStr.includes("moderate") || tagsStr.includes("medium")) return "medium"
    return "low"
  }
}

// Weather cache service
export class WeatherCacheService {
  private static readonly CACHE_DURATION = 10 * 60 * 1000 // 10 minutes

  static async getCachedWeather(locationKey: string): Promise<WeatherData | null> {
    try {
      // In a real app, this would query the database
      // For now, we'll use a simple in-memory cache
      const cached = this.memoryCache.get(locationKey)
      if (cached && Date.now() - cached.timestamp < this.CACHE_DURATION) {
        return cached.data
      }
      return null
    } catch (error) {
      console.error("Error getting cached weather:", error)
      return null
    }
  }

  static async setCachedWeather(locationKey: string, data: WeatherData): Promise<void> {
    try {
      // In a real app, this would save to database
      this.memoryCache.set(locationKey, {
        data,
        timestamp: Date.now(),
      })
    } catch (error) {
      console.error("Error caching weather:", error)
    }
  }

  private static memoryCache = new Map<string, { data: WeatherData; timestamp: number }>()
}
