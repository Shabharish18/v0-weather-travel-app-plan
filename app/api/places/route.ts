// API route for tourist places
import { type NextRequest, NextResponse } from "next/server"
import { PlacesService } from "@/lib/places-service"
import type { SearchParams } from "@/lib/types"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)

    // Parse query parameters
    const params: SearchParams = {
      query: searchParams.get("query") || undefined,
      sortBy: (searchParams.get("sortBy") as any) || "rating",
      sortOrder: (searchParams.get("sortOrder") as any) || "desc",
      page: Number.parseInt(searchParams.get("page") || "1"),
      limit: Number.parseInt(searchParams.get("limit") || "20"),
    }

    // Parse filters
    const filters: any = {}

    const category = searchParams.get("category")
    if (category) {
      filters.category = category.split(",")
    }

    const city = searchParams.get("city")
    if (city) {
      filters.city = city
    }

    const district = searchParams.get("district")
    if (district) {
      filters.district = district
    }

    const rating = searchParams.get("rating")
    if (rating) {
      filters.rating = Number.parseFloat(rating)
    }

    const minFee = searchParams.get("minFee")
    const maxFee = searchParams.get("maxFee")
    if (minFee || maxFee) {
      filters.entryFee = {}
      if (minFee) filters.entryFee.min = Number.parseFloat(minFee)
      if (maxFee) filters.entryFee.max = Number.parseFloat(maxFee)
    }

    const amenities = searchParams.get("amenities")
    if (amenities) {
      filters.amenities = amenities.split(",")
    }

    const ecoFriendly = searchParams.get("ecoFriendly")
    if (ecoFriendly === "true") {
      filters.ecoFriendly = true
    }

    params.filters = filters

    const result = await PlacesService.getPlaces(params)
    return NextResponse.json(result)
  } catch (error) {
    console.error("Places API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch places" }, { status: 500 })
  }
}
