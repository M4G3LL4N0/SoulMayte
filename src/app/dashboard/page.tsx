import { createServerSupabaseClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = createServerSupabaseClient();

  const [
    { count: waitlistCount },
    { count: quizCount }
  ] = await Promise.all([
    supabase.from("waitlist_entries").select("*", { count: "exact", head: true }),
    supabase.from("soulmate_readiness_quiz_submissions").select("*", { count: "exact", head: true })
  ]);

  const { data: recent } = await supabase
    .from("waitlist_entries")
    .select("id, created_at, email, full_name, city, state, relationship_status, looking_for")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-pink-300">
            Internal Dashboard
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">SoulMayte waitlist</h1>
          <p className="mt-3 text-white/65">
            Simple founder dashboard for early traction and signups.
          </p>
        </div>

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="grid grid-cols-2 divide-x divide-white/10">
            <div className="pr-4">
              <p className="text-sm text-white/60">Waitlist Signups</p>
              <p className="mt-2 text-5xl font-semibold">{waitlistCount ?? 0}</p>
            </div>
            <div className="pl-4">
              <p className="text-sm text-white/60">Quiz Completions</p>
              <p className="mt-2 text-5xl font-semibold">{quizCount ?? 0}</p>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="border-b border-white/10 px-6 py-4">
            <h2 className="text-lg font-medium">Recent signups</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-white/5 text-white/55">
                <tr>
                  <th className="px-6 py-4">Created</th>
                  <th className="px-6 py-4">Name</th>
                  <th className="px-6 py-4">Email</th>
                  <th className="px-6 py-4">Location</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Looking for</th>
                </tr>
              </thead>
              <tbody>
                {recent?.map((entry) => (
                  <tr key={entry.id} className="border-t border-white/10">
                    <td className="px-6 py-4 text-white/70">
                      {new Date(entry.created_at).toLocaleString()}
                    </td>
                    <td className="px-6 py-4">{entry.full_name || "—"}</td>
                    <td className="px-6 py-4">{entry.email}</td>
                    <td className="px-6 py-4">
                      {[entry.city, entry.state].filter(Boolean).join(", ") || "—"}
                    </td>
                    <td className="px-6 py-4">{entry.relationship_status || "—"}</td>
                    <td className="px-6 py-4">{entry.looking_for || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
