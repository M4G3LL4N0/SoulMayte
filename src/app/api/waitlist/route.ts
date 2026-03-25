import { NextResponse } from "next/server";
import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const supabase = createServerSupabaseClient();

    const payload = {
      email: String(body.email).trim().toLowerCase(),
      full_name: body.fullName ? String(body.fullName).trim() : null,
      city: body.city ? String(body.city).trim() : null,
      state: body.state ? String(body.state).trim() : null,
      relationship_status: body.relationshipStatus
        ? String(body.relationshipStatus)
        : null,
      looking_for: body.lookingFor ? String(body.lookingFor) : null,
      notes: body.notes ? String(body.notes).trim() : null,
      source: "landing_page",
    };

    const { error } = await supabase
      .from("waitlist_entries")
      .insert(payload as never);

    if (error) {
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "That email is already on the waitlist." },
          { status: 409 }
        );
      }

      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { error: "Invalid request payload." },
      { status: 400 }
    );
  }
}
