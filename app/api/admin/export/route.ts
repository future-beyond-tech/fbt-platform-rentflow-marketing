import { NextResponse } from "next/server";

// This project is deployed with `output: "export"` (static HTML export),
// so admin export is not available as a live API in this deployment.
// Mark the route as static and always return a 404-style JSON response
// so that static export builds succeed.
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json(
    { success: false, error: "Admin export is not available in static export deployments." },
    { status: 404 }
  );
}
