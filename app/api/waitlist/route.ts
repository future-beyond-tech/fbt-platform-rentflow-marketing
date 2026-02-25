import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/ratelimit";
import { getSql } from "@/lib/db";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://rentflow.in";

export async function POST(request: NextRequest) {
  try {
    const sql = getSql();
    if (!sql) {
      return NextResponse.json({ success: false, error: "Database not configured" }, { status: 503 });
    }

    const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";
    const allowed = await checkRateLimit(ip);
    if (!allowed) {
      return NextResponse.json({ success: false, error: "Too many requests" }, { status: 429 });
    }

    const body = await request.json();
    const { email, fullName, phone, companyName, referralCode, source } = body;

    if (!email || !String(email).includes("@")) {
      return NextResponse.json({ success: false, error: "Valid email required" }, { status: 400 });
    }

    let referredBy: string | null = null;
    if (referralCode) {
      const referrer = (await sql`
        SELECT id FROM waitlist_entries WHERE referral_code = ${referralCode}
      `) as { id: string }[];
      if (referrer.length > 0) {
        referredBy = referrer[0].id;
        await sql`
          UPDATE waitlist_entries
          SET referral_count = referral_count + 1
          WHERE id = ${referredBy}
        `;
      }
    }

    const countResult = (await sql`SELECT COUNT(*) as count FROM waitlist_entries`) as { count: string }[];
    const position = Number(countResult[0]?.count ?? 0) + 1;

    const result = (await sql`
      INSERT INTO waitlist_entries (
        email, full_name, phone, company_name,
        referred_by, position, ip_address, user_agent, source
      ) VALUES (
        ${email}, ${fullName ?? null}, ${phone ?? null}, ${companyName ?? null},
        ${referredBy}, ${position}, ${ip}, ${request.headers.get("user-agent") ?? null}, ${source ?? null}
      )
      ON CONFLICT (email) DO NOTHING
      RETURNING id, referral_code, position
    `) as { id: string; referral_code: string; position: number }[];

    if (result.length === 0) {
      const existing = (await sql`
        SELECT id, referral_code, position
        FROM waitlist_entries WHERE email = ${email}
      `) as { id: string; referral_code: string; position: number }[];
      return NextResponse.json({
        success: true,
        data: {
          id: existing[0].id,
          position: existing[0].position,
          referralCode: existing[0].referral_code,
          referralLink: `${baseUrl}/waitlist?ref=${existing[0].referral_code}`,
          message: "You're already on the list!",
          alreadyRegistered: true,
        },
      });
    }

    const referralLink = `${baseUrl}/waitlist?ref=${result[0].referral_code}`;
    if (resend) {
      resend.emails
        .send({
          from: "RentFlow <hello@rentflow.in>",
          to: email,
          subject: "You're on the RentFlow waitlist!",
          html: `<p>Hi ${fullName || "there"},</p>
             <p>You're #${position} on the waitlist.</p>
             <p>Share your referral link to move up: ${referralLink}</p>`,
        })
        .catch(console.error);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: result[0].id,
          position: result[0].position,
          referralCode: result[0].referral_code,
          referralLink,
          message: "You're on the list! We'll be in touch.",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Waitlist error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
