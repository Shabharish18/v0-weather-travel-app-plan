// API route for place search suggestions
import { type NextRequest, NextResponse } from "next/server"
import { PlacesService } from "@/lib/places-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get("q")

    if (!query || query.length < 2) {
      return NextResponse.json({ success: true, data: [] })
    }

    const suggestions = await PlacesService.getSearchSuggestions(query, 8)
    return NextResponse.json({ success: true, data: suggestions })
  } catch (error) {
    console.error("Search suggestions API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch search suggestions" }, { status: 500 })
  }
}
