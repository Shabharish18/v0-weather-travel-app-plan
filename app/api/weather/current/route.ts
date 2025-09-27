// API route for current weather data
import { type NextRequest, NextResponse } from "next/server"
import { WeatherService, WeatherCacheService } from "@/lib/weather-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")
    const city = searchParams.get("city")

    if (!lat && !lon && !city) {
      return NextResponse.json(
        { success: false, error: "Either coordinates (lat, lon) or city name is required" },
        { status: 400 },
      )
    }

    let locationKey: string
    let weatherData: any

    if (city) {
      locationKey = `city:${city}`
      // Check cache first
      const cached = await WeatherCacheService.getCachedWeather(locationKey)
      if (cached) {
        return NextResponse.json({ success: true, data: cached })
      }

      weatherData = await WeatherService.getCurrentWeatherByCity(city)
    } else {
      const latitude = Number.parseFloat(lat!)
      const longitude = Number.parseFloat(lon!)

      if (isNaN(latitude) || isNaN(longitude)) {
        return NextResponse.json({ success: false, error: "Invalid coordinates" }, { status: 400 })
      }

      locationKey = `coords:${latitude},${longitude}`
      // Check cache first
      const cached = await WeatherCacheService.getCachedWeather(locationKey)
      if (cached) {
        return NextResponse.json({ success: true, data: cached })
      }

      weatherData = await WeatherService.getCurrentWeather(latitude, longitude)
    }

    // Cache the result
    await WeatherCacheService.setCachedWeather(locationKey, weatherData)

    return NextResponse.json({ success: true, data: weatherData })
  } catch (error) {
    console.error("Weather API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch weather data" }, { status: 500 })
  }
}
