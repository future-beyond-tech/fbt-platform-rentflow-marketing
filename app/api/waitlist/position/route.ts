import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const sql = getSql();
    if (!sql) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 503 });
    }

    const { searchParams } = new URL(request.url);
    const email = searchParams.get("email");
    const code = searchParams.get("code");

    const countResult = (await sql`SELECT COUNT(*) as count FROM waitlist_entries`) as { count: string }[];
    const totalEntries = Number(countResult[0]?.count ?? 0);

    let position: number | null = null;
    let referralCount = 0;

    if (email) {
      const entry = (await sql`
        SELECT position, referral_count
        FROM waitlist_entries WHERE email = ${email}
      `) as { position: number; referral_count: number | null }[];
      if (entry.length > 0) {
        position = entry[0].position;
        referralCount = Number(entry[0].referral_count ?? 0);
      }
    }

    if (code) {
      const entry = (await sql`
        SELECT position, referral_count
        FROM waitlist_entries WHERE referral_code = ${code}
      `) as { position: number; referral_count: number | null }[];
      if (entry.length > 0) {
        position = entry[0].position;
        referralCount = Number(entry[0].referral_count ?? 0);
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        totalEntries,
        spotsRemaining: Math.max(0, 500 - totalEntries),
        position,
        referralCount,
        estimatedLaunch: "2026-07-01",
      },
    });
  } catch (error) {
    console.error("Position error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
