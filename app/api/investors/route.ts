import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/ratelimit";
import { getSql } from "@/lib/db";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

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
    const { fullName, email, phone, investorType, linkedinUrl, message } = body;

    if (!fullName || !email) {
      return NextResponse.json({ success: false, error: "Name and email required" }, { status: 400 });
    }

    const result = (await sql`
      INSERT INTO investor_leads (
        full_name, email, phone, investor_type,
        linkedin_url, message, ip_address
      ) VALUES (
        ${fullName}, ${email}, ${phone ?? null}, ${investorType ?? null},
        ${linkedinUrl ?? null}, ${message ?? null}, ${ip}
      )
      RETURNING id
    `) as { id: string }[];

    if (resend) {
      resend.emails
        .send({
          from: "RentFlow <hello@rentflow.in>",
          to: "founders@rentflow.in",
          subject: `New Investor Lead: ${fullName}`,
          html: `<p><strong>${fullName}</strong> (${investorType ?? "N/A"})</p>
             <p>Email: ${email}</p>
             <p>LinkedIn: ${linkedinUrl ?? "N/A"}</p>
             <p>Message: ${message ?? "N/A"}</p>`,
        })
        .catch(console.error);
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          id: result[0].id,
          message: "Thank you! We'll be in touch within 48 hours.",
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Investor lead error:", error);
    return NextResponse.json({ success: false, error: "Something went wrong" }, { status: 500 });
  }
}
