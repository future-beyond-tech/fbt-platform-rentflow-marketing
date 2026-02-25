import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function POST() {
  return NextResponse.json(
    {
      success: false,
      error: "ROI analytics API is not available in this static marketing deployment.",
    },
    { status: 404 }
  );
}
