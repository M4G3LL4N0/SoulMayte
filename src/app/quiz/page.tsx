import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
import { QuizForm } from "@/components/quiz-form";

export const metadata: Metadata = {
  title: "Soulmate Readiness Quiz | SoulMayte",
};

export default async function QuizPage() {
  const supabase = createServerSupabaseClient();

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10">
          <Link
            href="/"
            className="text-xs uppercase tracking-[0.28em] text-pink-300 hover:opacity-80"
          >
            ← Back to SoulMayte
          </Link>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">
            Soulmate Readiness Quiz
          </h1>
          <p className="mt-3 text-white/65">
            Discover if you're truly ready for the deep, lasting relationship
            you desire.
          </p>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl">
          <QuizForm />
        </div>
      </div>
    </main>
  );
}
