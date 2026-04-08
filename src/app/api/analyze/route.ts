import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { text } = await req.json();

  // fallback mock if no AI yet
  const mock = {
    compatibility_score: 72,
    risk_level: "moderate",
    green_flags: [
      "Strong communication moments",
      "Emotional interest present"
    ],
    red_flags: [
      "Inconsistency",
      "Unclear intentions"
    ],
    summary:
      "This connection shows potential but has instability signals. Proceed with awareness."
  };

  return NextResponse.json(mock);
}
