import { createServerSupabaseClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createServerSupabaseClient();

  try {
    const body = await request.json();

    if (!body.email || typeof body.email !== "string") {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from("soulmate_readiness_quiz_submissions")
      .insert({
        email: body.email,
        attachment_style: body.attachmentStyle,
        communication_style: body.communicationStyle,
        long_term_intent: body.longTermIntent,
        self_awareness_score: parseInt(body.selfAwarenessScore, 10),
        emotional_availability_score: parseInt(body.emotionalAvailabilityScore, 10),
        values_alignment_score: parseInt(body.valuesAlignmentScore, 10),
        notes: body.notes
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json({
      scoreAvg: Math.round((
        parseInt(body.selfAwarenessScore, 10) +
        parseInt(body.emotionalAvailabilityScore, 10) +
        parseInt(body.valuesAlignmentScore, 10)
      ) / 3)
    });

  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
