import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Waitlist position API is disabled in the static marketing deployment.",
    },
    { status: 404 }
  );
}
