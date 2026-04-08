export const dynamic = 'force-dynamic';

import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Metadata } from "next";
import Link from "next/link";
import { QuizForm } from "@/components/quiz-form";
import { hasValidSupabaseEnv } from "@/lib/env";

export const metadata: Metadata = {
  title: "Soulmate Readiness Quiz | SoulMayte",
};

export default async function QuizPage() {
  const hasValidEnv = hasValidSupabaseEnv();
  const supabase = hasValidEnv ? createServerSupabaseClient() : null;

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
          {hasValidEnv ? (
            <QuizForm />
          ) : (
            <div className="space-y-4 text-center">
              <div className="flex justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-300 border-t-transparent" />
              </div>
              <h3 className="text-lg font-medium text-pink-300">
                Loading Quiz...
              </h3>
              <p className="text-white/75">
                We're preparing your personalized readiness assessment
              </p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
