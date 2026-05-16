"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const items = [
  { href: "/#how-it-works", label: "How it works" },
  { href: "/#features", label: "Features" },
  { href: "/quiz", label: "Quiz" },
  { href: "/#waitlist", label: "Waitlist" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight text-white" onClick={() => setOpen(false)}>
          SoulMayte
        </Link>

        <nav className="hidden items-center gap-6 text-sm text-white/70 md:flex">
          {items.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-white md:hidden"
          aria-expanded={open}
          aria-controls="soulmayte-mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <span aria-hidden>{open ? "×" : "☰"}</span>
        </button>
      </div>

      {open ? (
        <nav
          id="soulmayte-mobile-nav"
          className="mx-auto flex max-w-7xl flex-col gap-1 border-t border-white/10 px-6 pb-4 md:hidden"
        >
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2.5 text-sm text-white/90 hover:bg-white/5"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <p className="px-3 pt-2 text-[11px] leading-relaxed text-white/45">
            Compatibility insights are for reflection and conversation — not therapy, diagnosis, or
            relationship guarantees.
          </p>
        </nav>
      ) : null}
    </header>
  );
}
