"use client";

import { useState } from "react";

export function AnalyzeForm() {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function submit(e: any) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: JSON.stringify({ text }),
    });

    const data = await res.json();
    setResult(data);
    setLoading(false);
  }

  return (
    <div className="grid gap-6">
      <form onSubmit={submit} className="grid gap-4">
        <textarea
          className="w-full min-h-40 bg-black/30 border border-white/10 rounded-xl p-4"
          placeholder="Describe your situation or paste messages..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button className="bg-white text-black px-4 py-3 rounded-xl">
          {loading ? "Analyzing..." : "Analyze"}
        </button>
      </form>

      {result && (
        <div className="border border-white/10 p-6 rounded-xl bg-white/5">
          <h2 className="text-xl font-semibold mb-2">
            Compatibility Score: {result.compatibility_score}
          </h2>
          <p className="mb-2">Risk: {result.risk_level}</p>

          <div className="mb-2">
            <p className="font-semibold">Green Flags</p>
            <ul>
              {result.green_flags?.map((f: string, i: number) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </div>

          <div className="mb-2">
            <p className="font-semibold">Red Flags</p>
            <ul>
              {result.red_flags?.map((f: string, i: number) => (
                <li key={i}>• {f}</li>
              ))}
            </ul>
          </div>

          <p className="mt-4 text-white/70">{result.summary}</p>
        </div>
      )}
    </div>
  );
}
