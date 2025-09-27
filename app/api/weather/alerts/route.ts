// API route for weather alerts
import { type NextRequest, NextResponse } from "next/server"
import { WeatherService } from "@/lib/weather-service"

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

    const alerts = await WeatherService.getWeatherAlerts(latitude, longitude)

    return NextResponse.json({ success: true, data: alerts })
  } catch (error) {
    console.error("Weather alerts API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch weather alerts" }, { status: 500 })
  }
}
