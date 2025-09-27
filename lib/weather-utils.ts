// Weather utility functions and helpers
import { WEATHER_CONDITIONS, PACKING_SUGGESTIONS, WEATHER_ACTIVITIES } from "./constants"
import type { WeatherData, TouristPlace } from "./types"

export class WeatherUtils {
  // Get weather condition styling
  static getWeatherStyling(condition: string) {
    return WEATHER_CONDITIONS[condition as keyof typeof WEATHER_CONDITIONS] || WEATHER_CONDITIONS.cloudy
  }

  // Get weather-based recommendations
  static getWeatherRecommendations(weather: WeatherData): {
    activities: string[]
    packing: string[]
    travelTips: string[]
  } {
    const temp = weather.current.temperature
    const condition = weather.current.condition.toLowerCase()

    let tempCategory: keyof typeof PACKING_SUGGESTIONS
    if (temp > 35) tempCategory = "hot"
    else if (temp > 25) tempCategory = "warm"
    else if (temp > 15) tempCategory = "cool"
    else tempCategory = "cold"

    let conditionCategory: keyof typeof WEATHER_ACTIVITIES
    if (condition.includes("rain") || condition.includes("storm")) conditionCategory = "rainy"
    else if (condition.includes("cloud")) conditionCategory = "cloudy"
    else if (condition.includes("storm")) conditionCategory = "stormy"
    else conditionCategory = "sunny"

    const packing = [...PACKING_SUGGESTIONS[tempCategory]]
    if (condition.includes("rain")) {
      packing.push(...PACKING_SUGGESTIONS.rainy)
    }
    if (weather.current.windSpeed > 10) {
      packing.push(...PACKING_SUGGESTIONS.windy)
    }

    const activities = WEATHER_ACTIVITIES[conditionCategory] || WEATHER_ACTIVITIES.sunny

    const travelTips = this.generateTravelTips(weather)

    return {
      activities,
      packing: [...new Set(packing)], // Remove duplicates
      travelTips,
    }
  }

  // Generate travel tips based on weather
  private static generateTravelTips(weather: WeatherData): string[] {
    const tips: string[] = []
    const current = weather.current

    // Temperature-based tips
    if (current.temperature > 40) {
      tips.push("Avoid outdoor activities during peak hours (11 AM - 4 PM)")
      tips.push("Stay hydrated and take frequent breaks in shade")
    } else if (current.temperature > 30) {
      tips.push("Start early morning or late evening for outdoor activities")
      tips.push("Carry plenty of water and wear light-colored clothing")
    } else if (current.temperature < 15) {
      tips.push("Layer your clothing for warmth")
      tips.push("Check if attractions have indoor facilities")
    }

    // Condition-based tips
    if (current.condition.toLowerCase().includes("rain")) {
      tips.push("Keep important items in waterproof bags")
      tips.push("Check if outdoor attractions are open during rain")
    }

    // Wind-based tips
    if (current.windSpeed > 15) {
      tips.push("Secure loose items and be cautious near water bodies")
      tips.push("Consider indoor alternatives for planned activities")
    }

    // Humidity-based tips
    if (current.humidity > 80) {
      tips.push("Wear breathable fabrics and stay in ventilated areas")
    }

    // UV-based tips
    if (current.uvIndex > 6) {
      tips.push("Use sunscreen with high SPF and wear protective clothing")
      tips.push("Seek shade during midday hours")
    }

    return tips
  }

  // Check if weather is suitable for a place visit
  static isWeatherSuitableForPlace(
    weather: WeatherData,
    place: TouristPlace,
  ): {
    suitable: boolean
    score: number
    reasons: string[]
  } {
    let score = 50 // Base score
    const reasons: string[] = []
    const current = weather.current

    // Category-specific weather preferences
    switch (place.category) {
      case "beach":
        if (current.temperature >= 25 && current.temperature <= 35) {
          score += 20
          reasons.push("Perfect temperature for beach activities")
        } else if (current.temperature > 35) {
          score -= 15
          reasons.push("Very hot for beach activities")
        } else if (current.temperature < 20) {
          score -= 25
          reasons.push("Too cool for beach activities")
        }

        if (current.condition.toLowerCase().includes("rain")) {
          score -= 30
          reasons.push("Rain not ideal for beach visits")
        } else if (current.condition.toLowerCase().includes("clear")) {
          score += 15
          reasons.push("Clear skies perfect for beach")
        }

        if (current.windSpeed > 20) {
          score -= 10
          reasons.push("Strong winds may affect beach experience")
        }
        break

      case "temple":
        // Temples are generally weather-independent but some considerations
        if (current.temperature > 40) {
          score -= 10
          reasons.push("Very hot for temple visits")
        }

        if (current.condition.toLowerCase().includes("storm")) {
          score -= 20
          reasons.push("Thunderstorms may affect temple visits")
        } else if (current.condition.toLowerCase().includes("rain")) {
          score += 5
          reasons.push("Light rain can be pleasant for temple visits")
        }
        break

      case "nature":
        if (current.temperature >= 20 && current.temperature <= 30) {
          score += 20
          reasons.push("Ideal temperature for nature exploration")
        } else if (current.temperature > 35) {
          score -= 15
          reasons.push("Hot weather for hiking/nature walks")
        }

        if (current.condition.toLowerCase().includes("clear")) {
          score += 15
          reasons.push("Clear weather perfect for nature photography")
        } else if (current.condition.toLowerCase().includes("rain")) {
          score -= 20
          reasons.push("Rain may make trails slippery")
        }

        if (current.windSpeed > 25) {
          score -= 15
          reasons.push("Strong winds not ideal for nature activities")
        }
        break

      case "heritage":
        // Similar to temples, mostly weather-independent
        if (current.temperature > 38) {
          score -= 10
          reasons.push("Very hot for outdoor heritage site exploration")
        }

        if (current.condition.toLowerCase().includes("storm")) {
          score -= 15
          reasons.push("Storms may affect heritage site visits")
        }
        break

      case "adventure":
        if (current.temperature >= 15 && current.temperature <= 32) {
          score += 20
          reasons.push("Good temperature for adventure activities")
        } else if (current.temperature > 35) {
          score -= 20
          reasons.push("Too hot for strenuous adventure activities")
        }

        if (current.condition.toLowerCase().includes("rain") || current.condition.toLowerCase().includes("storm")) {
          score -= 30
          reasons.push("Weather not safe for adventure activities")
        } else if (current.condition.toLowerCase().includes("clear")) {
          score += 15
          reasons.push("Clear weather ideal for adventure")
        }

        if (current.windSpeed > 20) {
          score -= 20
          reasons.push("Strong winds dangerous for adventure activities")
        }
        break

      case "cultural":
        // Generally weather-independent, slight preferences
        if (current.temperature > 38) {
          score -= 5
          reasons.push("Very hot for cultural site visits")
        }

        if (current.condition.toLowerCase().includes("storm")) {
          score -= 10
          reasons.push("Storms may affect cultural events")
        }
        break
    }

    // General weather factors
    if (current.visibility < 5) {
      score -= 15
      reasons.push("Poor visibility may affect sightseeing")
    }

    if (current.uvIndex > 8) {
      score -= 5
      reasons.push("High UV index - take sun protection")
    }

    // Ensure score is within bounds
    score = Math.max(0, Math.min(100, score))

    return {
      suitable: score >= 60,
      score,
      reasons,
    }
  }

  // Get best visiting time for a place based on forecast
  static getBestVisitingTime(
    forecast: WeatherData,
    place: TouristPlace,
  ): {
    bestDay: string
    bestTime: string
    score: number
    reason: string
  } | null {
    if (!forecast.forecast || forecast.forecast.length === 0) {
      return null
    }

    let bestDay = forecast.forecast[0]
    let bestScore = 0

    forecast.forecast.forEach((day) => {
      const mockWeather: WeatherData = {
        ...forecast,
        current: {
          ...forecast.current,
          temperature: (day.high + day.low) / 2,
          condition: day.condition,
        },
      }

      const suitability = this.isWeatherSuitableForPlace(mockWeather, place)
      if (suitability.score > bestScore) {
        bestScore = suitability.score
        bestDay = day
      }
    })

    // Determine best time of day based on category and weather
    let bestTime = "Morning (8-11 AM)"
    if (place.category === "beach" && bestDay.high > 30) {
      bestTime = "Early morning (6-9 AM) or Evening (4-7 PM)"
    } else if (place.category === "adventure" && bestDay.high > 32) {
      bestTime = "Early morning (6-10 AM)"
    } else if (place.category === "temple" || place.category === "heritage") {
      bestTime = "Morning (7-11 AM) or Evening (4-6 PM)"
    }

    return {
      bestDay: bestDay.date,
      bestTime,
      score: bestScore,
      reason: `${bestDay.condition} with temperature ${bestDay.low}-${bestDay.high}°C`,
    }
  }

  // Format temperature based on user preference
  static formatTemperature(celsius: number, unit: "celsius" | "fahrenheit" = "celsius"): string {
    if (unit === "fahrenheit") {
      const fahrenheit = (celsius * 9) / 5 + 32
      return `${Math.round(fahrenheit)}°F`
    }
    return `${Math.round(celsius)}°C`
  }

  // Format wind speed based on user preference
  static formatWindSpeed(mps: number, unit: "km" | "miles" = "km"): string {
    if (unit === "miles") {
      const mph = mps * 2.237
      return `${Math.round(mph)} mph`
    }
    const kmh = mps * 3.6
    return `${Math.round(kmh)} km/h`
  }

  // Get weather emoji for quick display
  static getWeatherEmoji(condition: string): string {
    const conditionLower = condition.toLowerCase()
    if (conditionLower.includes("clear") || conditionLower.includes("sunny")) return "☀️"
    if (conditionLower.includes("cloud")) return "☁️"
    if (conditionLower.includes("rain")) return "🌧️"
    if (conditionLower.includes("storm") || conditionLower.includes("thunder")) return "⛈️"
    if (conditionLower.includes("snow")) return "❄️"
    if (conditionLower.includes("fog") || conditionLower.includes("mist")) return "🌫️"
    if (conditionLower.includes("wind")) return "💨"
    return "🌤️"
  }
}
