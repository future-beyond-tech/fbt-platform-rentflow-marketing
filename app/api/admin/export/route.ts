import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

const ADMIN_KEY = process.env.ADMIN_SECRET_KEY;
const IS_LEAN_BACKEND = process.env.ENABLE_LEAN_BACKEND === "true";

// When deploying with static export (ENABLE_LEAN_BACKEND !== "true"),
// mark this route as static-safe and return a simple 404 JSON response.
// When running with a real backend (ENABLE_LEAN_BACKEND === "true"),
// force dynamic behavior so the DB-backed export works as an API.
export const dynamic = IS_LEAN_BACKEND ? "force-dynamic" : "force-static";

export async function GET(request: NextRequest) {
  if (!IS_LEAN_BACKEND) {
    return NextResponse.json(
      { success: false, error: "Admin export is not available in static export deployments." },
      { status: 404 }
    );
  }

  try {
    const sql = getSql();
    if (!sql) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get("key");
    const table = searchParams.get("table");
    const format = searchParams.get("format") || "json";

    if (key !== ADMIN_KEY) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    let data: Record<string, unknown>[];
    switch (table) {
      case "waitlist":
        data = (await sql`SELECT * FROM waitlist_entries ORDER BY created_at DESC`) as Record<string, unknown>[];
        break;
      case "investors":
        data = (await sql`SELECT * FROM investor_leads ORDER BY created_at DESC`) as Record<string, unknown>[];
        break;
      case "roi":
        data = (await sql`SELECT * FROM roi_calculations ORDER BY created_at DESC`) as Record<string, unknown>[];
        break;
      default:
        return NextResponse.json({ success: false, error: "Invalid table" }, { status: 400 });
    }

    if (format === "csv") {
      const headers = Object.keys(data[0] || {}).join(",");
      const rows = data.map((row) =>
        Object.values(row)
          .map((v) => `"${v}"`)
          .join(",")
      );
      const csv = [headers, ...rows].join("\n");

      return new NextResponse(csv, {
        headers: {
          "Content-Type": "text/csv",
          "Content-Disposition": `attachment; filename="${table}.csv"`,
        },
      });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("Export error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
