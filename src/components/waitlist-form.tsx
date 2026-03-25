"use client";

import { useState } from "react";

type FormState = {
  fullName: string;
  email: string;
  city: string;
  state: string;
  relationshipStatus: string;
  lookingFor: string;
  notes: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  city: "",
  state: "",
  relationshipStatus: "",
  lookingFor: "",
  notes: "",
};

export function WaitlistForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setMessage("You’re in. We’ll let you know when SoulMayte opens.");
      setForm(initialState);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to submit.");
    } finally {
      setLoading(false);
    }
  }

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  return (
    <form
      onSubmit={onSubmit}
      className="grid gap-4 rounded-3xl border border-white/10 bg-white/5 p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35"
          placeholder="Full name"
          value={form.fullName}
          onChange={(e) => update("fullName", e.target.value)}
        />
        <input
          required
          type="email"
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35"
          placeholder="Email"
          value={form.email}
          onChange={(e) => update("email", e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <input
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35"
          placeholder="City"
          value={form.city}
          onChange={(e) => update("city", e.target.value)}
        />
        <input
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35"
          placeholder="State"
          value={form.state}
          onChange={(e) => update("state", e.target.value)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <select
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          value={form.relationshipStatus}
          onChange={(e) => update("relationshipStatus", e.target.value)}
        >
          <option value="">Relationship status</option>
          <option value="single">Single</option>
          <option value="talking">Talking</option>
          <option value="dating">Dating</option>
          <option value="situationship">Situationship</option>
          <option value="relationship">Relationship</option>
          <option value="complicated">Complicated</option>
        </select>

        <select
          className="rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none"
          value={form.lookingFor}
          onChange={(e) => update("lookingFor", e.target.value)}
        >
          <option value="">Looking for</option>
          <option value="soulmate">Soulmate</option>
          <option value="serious_relationship">Serious relationship</option>
          <option value="dating">Dating</option>
          <option value="marriage">Marriage</option>
          <option value="clarity">Clarity</option>
        </select>
      </div>

      <textarea
        className="min-h-28 rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-white/35"
        placeholder="What do you wish dating apps understood about you?"
        value={form.notes}
        onChange={(e) => update("notes", e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Join the waitlist"}
      </button>

      {message ? <p className="text-sm text-white/80">{message}</p> : null}
    </form>
  );
}
