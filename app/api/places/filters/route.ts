// API route for filter options
import { type NextRequest, NextResponse } from "next/server"
import { PlacesService } from "@/lib/places-service"

export async function GET(request: NextRequest) {
  try {
    const filterOptions = await PlacesService.getFilterOptions()
    return NextResponse.json({ success: true, data: filterOptions })
  } catch (error) {
    console.error("Filter options API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch filter options" }, { status: 500 })
  }
}
