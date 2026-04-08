import { createServerSupabaseClient } from "@/lib/supabase/server";
import { hasValidSupabaseEnv } from "@/lib/env";

export const dynamic = "force-dynamic";

type WaitlistEntry = {
  id: string;
  created_at: string;
  email: string;
  full_name: string | null;
  city: string | null;
  state: string | null;
  relationship_status: string | null;
  looking_for: string | null;
};

function DashboardShell({
  count,
  recent,
  warning,
}: {
  count: number;
  recent: WaitlistEntry[];
  warning?: string;
}) {
  return (
    <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10">
          <p className="mb-2 text-xs uppercase tracking-[0.28em] text-pink-300">
            Internal Dashboard
          </p>
          <h1 className="text-4xl font-semibold tracking-tight">
            SoulMayte waitlist
          </h1>
          <p className="mt-3 text-white/65">
            Simple founder dashboard for early traction and signups.
          </p>
        </div>

        {warning ? (
          <div className="mb-8 rounded-3xl border border-yellow-400/20 bg-yellow-500/10 p-6 text-yellow-100">
            <p className="text-sm font-medium">Dashboard not connected yet</p>
            <p className="mt-2 text-sm text-yellow-100/80">{warning}</p>
          </div>
        ) : null}

        <div className="mb-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <p className="text-sm text-white/60">Total waitlist signups</p>
          <p className="mt-2 text-5xl font-semibold">{count}</p>
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
                {recent.length > 0 ? (
                  recent.map((entry) => (
                    <tr key={entry.id} className="border-t border-white/10">
                      <td className="px-6 py-4 text-white/70">
                        {new Date(entry.created_at).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">{entry.full_name || "—"}</td>
                      <td className="px-6 py-4">{entry.email}</td>
                      <td className="px-6 py-4">
                        {[entry.city, entry.state].filter(Boolean).join(", ") || "—"}
                      </td>
                      <td className="px-6 py-4">
                        {entry.relationship_status || "—"}
                      </td>
                      <td className="px-6 py-4">{entry.looking_for || "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr className="border-t border-white/10">
                    <td colSpan={6} className="px-6 py-8 text-center text-white/50">
                      No signups yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}

export default async function DashboardPage() {
  if (!hasValidSupabaseEnv()) {
    return (
      <DashboardShell
        count={0}
        recent={[]}
        warning="Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local and in Vercel project settings to load live data."
      />
    );
  }

  try {
    const supabase = createServerSupabaseClient();

    const [{ count }, { data: recent }] = await Promise.all([
      supabase.from("waitlist_entries").select("*", { count: "exact", head: true }),
      supabase
        .from("waitlist_entries")
        .select(
          "id, created_at, email, full_name, city, state, relationship_status, looking_for"
        )
        .order("created_at", { ascending: false })
        .limit(10),
    ]);

    return (
      <DashboardShell
        count={count ?? 0}
        recent={(recent ?? []) as WaitlistEntry[]}
      />
    );
  } catch {
    return (
      <DashboardShell
        count={0}
        recent={[]}
        warning="Supabase connection failed while loading dashboard data. Check your env vars and exposed schema settings."
      />
    );
  }
}
