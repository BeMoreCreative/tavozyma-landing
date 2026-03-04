import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.KV_REST_API_URL!,
  token: process.env.KV_REST_API_TOKEN!,
});

export async function POST(request: Request) {
  try {
    const { email, consent, consentTimestamp, source, utmContent, utmSource, utmMedium, utmCampaign } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    if (!consent) {
      return NextResponse.json({ error: "Consent required" }, { status: 400 });
    }

    // Add to set (returns 1 if new, 0 if already exists)
    const isNew = await redis.sadd("waitlist:emails", email);

    // Store metadata (overwrites if exists)
    await redis.hset(`waitlist:meta:${email}`, {
      email,
      consent: "true",
      consentTimestamp: consentTimestamp || new Date().toISOString(),
      source: source || "unknown",
      utmContent: utmContent || "organic",
      utmSource: utmSource || "",
      utmMedium: utmMedium || "",
      utmCampaign: utmCampaign || "",
      registeredAt: new Date().toISOString(),
    });

    // Get total count for position
    const total = await redis.scard("waitlist:emails");

    return NextResponse.json({
      success: true,
      isNew: isNew === 1,
      position: total,
    });
  } catch (err) {
    console.error("Waitlist error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const { email, specialty, specialtyOther } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email required" }, { status: 400 });
    }

    const fields: Record<string, string> = { specialty: specialty || "" };
    if (specialtyOther) {
      fields.specialtyOther = specialtyOther.slice(0, 50);
    }

    await redis.hset(`waitlist:meta:${email}`, fields);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Specialty update error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const count = await redis.scard("waitlist:emails");
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
