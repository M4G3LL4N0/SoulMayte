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

    interface WaitlistPayload {
      email: string;
      full_name?: string | null;
      city?: string | null;
      state?: string | null;
      relationship_status?: string | null;
      looking_for?: string | null;
      notes?: string | null;
      source: string;
    }

    const payload: WaitlistPayload = {
      email: body.email.trim().toLowerCase(),
      full_name: body.fullName?.trim() || null,
      city: body.city?.trim() || null,
      state: body.state?.trim() || null,
      relationship_status: body.relationshipStatus || null,
      looking_for: body.lookingFor || null,
      notes: body.notes?.trim() || null,
      source: "landing_page"
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
