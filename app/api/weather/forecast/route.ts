// API route for weather forecast data
import { type NextRequest, NextResponse } from "next/server"
import { WeatherService, WeatherCacheService } from "@/lib/weather-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const lat = searchParams.get("lat")
    const lon = searchParams.get("lon")

    if (!lat || !lon) {
      return NextResponse.json({ success: false, error: "Latitude and longitude are required" }, { status: 400 })
    }

    const latitude = Number.parseFloat(lat)
    const longitude = Number.parseFloat(lon)

    if (isNaN(latitude) || isNaN(longitude)) {
      return NextResponse.json({ success: false, error: "Invalid coordinates" }, { status: 400 })
    }

    const locationKey = `forecast:${latitude},${longitude}`

    // Check cache first
    const cached = await WeatherCacheService.getCachedWeather(locationKey)
    if (cached) {
      return NextResponse.json({ success: true, data: cached })
    }

    const forecastData = await WeatherService.getForecast(latitude, longitude)

    // Cache the result
    await WeatherCacheService.setCachedWeather(locationKey, forecastData)

    return NextResponse.json({ success: true, data: forecastData })
  } catch (error) {
    console.error("Forecast API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch forecast data" }, { status: 500 })
  }
}
