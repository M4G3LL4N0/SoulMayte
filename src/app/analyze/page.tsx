import Link from "next/link";
import { AnalyzeForm } from "@/components/analyze-form";

export const dynamic = "force-dynamic";

export default function AnalyzePage() {
  return (
    <main className="min-h-screen bg-[#04050b] text-white px-6 py-14">
      <div className="max-w-5xl mx-auto">
        <Link href="/" className="text-white/60 hover:text-white">
          ← Back
        </Link>

        <div className="mt-10 mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-300">
            Relationship Intelligence
          </p>
          <h1 className="text-5xl font-semibold mt-3">
            Analyze your connection
          </h1>
          <p className="text-white/70 mt-4 max-w-2xl">
            Paste messages, describe the situation, and get a real analysis of your connection's compatibility and potential.
          </p>
        </div>

        <AnalyzeForm />
      </div>
    </main>
  );
}
