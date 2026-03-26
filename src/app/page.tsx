import Link from "next/link";
import { Heart, Radar, ShieldCheck, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { WaitlistForm } from "@/components/waitlist-form";

const features = [
  {
    icon: Heart,
    title: "Soulmate certainty",
    description:
      "Go beyond matching. SoulMayte helps people know when a connection is real, mutual, and built to last.",
  },
  {
    icon: Radar,
    title: "Compatibility intelligence",
    description:
      "Map values, emotional availability, communication style, and long-term alignment.",
  },
  {
    icon: ShieldCheck,
    title: "Clarity over confusion",
    description:
      "Spot relationship risk, mixed signals, and false positives before you waste time or emotions.",
  },
  {
    icon: Sparkles,
    title: "Founder-first MVP",
    description:
      "Launch a premium brand, collect demand, and expand into soulmate scoring, pair reports, and coaching.",
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(236,72,153,0.18),transparent_28%),radial-gradient(circle_at_20%_20%,rgba(168,85,247,0.18),transparent_24%),#04050b] text-white">
      <SiteHeader />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pb-28 md:pt-24">
        <div className="max-w-4xl">
          <p className="mb-5 text-xs uppercase tracking-[0.35em] text-pink-300">
            Relationship certainty engine
          </p>
          <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl">
            Know if they’re your person.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/70 md:text-xl">
            SoulMayte helps people find, evaluate, and understand real romantic
            compatibility so they stop guessing and start choosing better.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#waitlist"
              className="rounded-2xl bg-white px-5 py-3 font-medium text-black transition hover:opacity-90"
            >
              Join the waitlist
            </a>
            <Link
              href="/dashboard"
              className="rounded-2xl border border-white/15 bg-white/5 px-5 py-3 font-medium text-white transition hover:bg-white/10"
            >
              Founder dashboard
            </Link>
            <Link
              href="/quiz"
              className="rounded-2xl border border-pink-300/20 bg-pink-300/10 px-5 py-3 font-medium text-pink-300 transition hover:bg-pink-300/20"
            >
              Take the quiz
            </Link>
            <Link
              href="/analyze"
              className="rounded-2xl border border-purple-300/20 bg-purple-300/10 px-5 py-3 font-medium text-purple-300 transition hover:bg-purple-300/20"
            >
              Analyze connection
            </Link>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto grid max-w-7xl gap-6 px-6 pb-20 md:grid-cols-2 xl:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20"
            >
              <div className="mb-4 inline-flex rounded-2xl border border-white/10 bg-white/10 p-3">
                <Icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-medium">{feature.title}</h2>
              <p className="mt-3 text-sm leading-7 text-white/65">
                {feature.description}
              </p>
            </div>
          );
        })}
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-6 pb-20">
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-300">
            How it works
          </p>
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm text-white/45">01</p>
              <h3 className="mt-2 text-2xl font-medium">Describe yourself</h3>
              <p className="mt-3 text-white/65">
                Tell SoulMayte about your relationship patterns, values, and what
                you actually want.
              </p>
            </div>
            <div>
              <p className="text-sm text-white/45">02</p>
              <h3 className="mt-2 text-2xl font-medium">Evaluate connection</h3>
              <p className="mt-3 text-white/65">
                Compare emotional style, communication fit, timing, and long-term
                alignment.
              </p>
            </div>
            <div>
              <p className="text-sm text-white/45">03</p>
              <h3 className="mt-2 text-2xl font-medium">Get clarity</h3>
              <p className="mt-3 text-white/65">
                Know whether you’re looking at chemistry, convenience, fantasy,
                or the real thing.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="waitlist" className="mx-auto max-w-4xl px-6 pb-24">
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-pink-300">
            Early access
          </p>
          <h2 className="mt-3 text-4xl font-semibold tracking-tight">
            Join the SoulMayte waitlist
          </h2>
          <p className="mt-4 text-white/65">
            Launch the brand, capture demand, and validate the soulmate
            intelligence category immediately.
          </p>
        </div>

        <WaitlistForm />
      </section>

      <SiteFooter />
    </main>
  );
}
