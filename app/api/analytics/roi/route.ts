import { NextRequest, NextResponse } from "next/server";
import { getSql } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const sql = getSql();
    if (!sql) {
      return NextResponse.json({ success: true });
    }

    const body = await request.json();
    const { sessionId, inputs, results, source } = body;

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;

    await sql`
      INSERT INTO roi_calculations (
        session_id, properties, beds_per_property, avg_rent,
        utility_cost_per_bed, admin_hours_saved, revenue_leakage_recovered,
        annual_profit_impact, cost_reduction_pct, source, ip_address
      ) VALUES (
        ${sessionId ?? null}, ${inputs?.properties ?? null}, ${inputs?.bedsPerProperty ?? null},
        ${inputs?.avgRent ?? null}, ${inputs?.utilityCostPerBed ?? null},
        ${results?.adminHoursSaved ?? null}, ${results?.revenueLeakageRecovered ?? null},
        ${results?.annualProfitImpact ?? null}, ${results?.costReductionPct ?? null},
        ${source ?? null}, ${ip}
      )
    `;

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("ROI analytics error:", error);
    return NextResponse.json({ success: true });
  }
}
