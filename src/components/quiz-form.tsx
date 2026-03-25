"use client";

import { useState } from "react";

type FormState = {
  email: string;
  attachmentStyle: string;
  communicationStyle: string;
  longTermIntent: string;
  selfAwarenessScore: string;
  emotionalAvailabilityScore: string;
  valuesAlignmentScore: string;
  notes: string;
};

const initialState: FormState = {
  email: "",
  attachmentStyle: "",
  communicationStyle: "",
  longTermIntent: "",
  selfAwarenessScore: "50",
  emotionalAvailabilityScore: "50",
  valuesAlignmentScore: "50",
  notes: ""
};

export function QuizForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [result, setResult] = useState<number | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/quiz", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Submission failed");
      }

      setResult(data.scoreAvg);
      setMessage("Thank you! Your results have been saved.");
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false);
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function renderScoreInput(label: string, key: keyof FormState) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-white/75">
          {label} <span className="text-white/50">({form[key]})</span>
        </label>
        <input
          type="range"
          min="0"
          max="100"
          step="5"
          className="w-full accent-pink-500"
          value={form[key]}
          onChange={(e) => update(key, e.target.value)}
        />
        <div className="flex justify-between text-xs text-white/50">
          <span>Low</span>
          <span>Medium</span>
          <span>High</span>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {result !== null ? (
        <div className="animate-fade-in overflow-hidden rounded-2xl bg-gradient-to-r from-pink-500/20 to-pink-900/20 p-6 text-center">
          <p className="mb-2 text-sm uppercase tracking-wider text-pink-300">
            Your Soulmate Readiness Score
          </p>
          <p className="text-5xl font-bold text-pink-100">{result}</p>
          <p className="mt-2 text-sm text-white/70">
            {result >= 70
              ? "You're highly prepared for deep connection!"
              : result >= 40
              ? "You're on your way to readiness"
              : "Focus on self-growth for now"}{" "}
            •{" "}
            <button
              type="button"
              onClick={() => setResult(null)}
              className="underline underline-offset-2 hover:text-pink-300"
            >
              Edit answers
            </button>
          </p>
          {message && <p className="mt-4 text-sm text-green-400">{message}</p>}
        </div>
      ) : (
        <>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-white/75">
                Attachment Style
              </label>
              <select
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-pink-500"
                value={form.attachmentStyle}
                onChange={(e) => update("attachmentStyle", e.target.value)}
              >
                <option value="">Select one</option>
                <option value="secure">Secure</option>
                <option value="anxious">Anxious</option>
                <option value="avoidant">Avoidant</option>
                <option value="disorganized">Disorganized</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-white/75">
                Communication Style
              </label>
              <select
                className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-pink-500"
                value={form.communicationStyle}
                onChange={(e) => update("communicationStyle", e.target.value)}
              >
                <option value="">Select one</option>
                <option value="direct">Direct</option>
                <option value="passive">Passive</option>
                <option value="passive_aggressive">Passive Aggressive</option>
                <option value="avoidant">Avoidant</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-white/75">
              Long-term Intentions
            </label>
            <select
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-pink-500"
              value={form.longTermIntent}
              onChange={(e) => update("longTermIntent", e.target.value)}
            >
              <option value="">Select one</option>
              <option value="marriage">Marriage</option>
              <option value="serious_relationship">Serious Relationship</option>
              <option value="companionship">Companionship</option>
              <option value="exploring">Exploring</option>
            </select>
          </div>

          {renderScoreInput("Self-Awareness", "selfAwarenessScore")}
          {renderScoreInput("Emotional Availability", "emotionalAvailabilityScore")}
          {renderScoreInput("Values Alignment", "valuesAlignmentScore")}

          <div>
            <label className="block text-sm font-medium text-white/75">
              Email
            </label>
            <input
              required
              type="email"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-pink-500"
              placeholder="your@email.com"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/75">
              Anything else we should know?
            </label>
            <textarea
              className="mt-2 w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none focus:ring-2 focus:ring-pink-500"
              rows={3}
              value={form.notes}
              onChange={(e) => update("notes", e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-pink-600 px-6 py-3 font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50"
          >
            {loading ? "Calculating..." : "Get My Readiness Score"}
          </button>

          {message && (
            <p className="text-center text-sm text-red-400">{message}</p>
          )}
        </>
      )}
    </form>
  );
}
