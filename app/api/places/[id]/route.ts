// API route for individual place details
import { type NextRequest, NextResponse } from "next/server"
import { PlacesService } from "@/lib/places-service"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params

    if (!id) {
      return NextResponse.json({ success: false, error: "Place ID is required" }, { status: 400 })
    }

    const result = await PlacesService.getPlaceById(id)

    if (!result.success) {
      return NextResponse.json(result, { status: 404 })
    }

    return NextResponse.json(result)
  } catch (error) {
    console.error("Place details API error:", error)
    return NextResponse.json({ success: false, error: "Failed to fetch place details" }, { status: 500 })
  }
}
