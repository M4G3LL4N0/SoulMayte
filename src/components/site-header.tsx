export function SiteHeader() {
  return (
    <header className="border-b border-white/10 bg-black/40 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-lg font-semibold tracking-tight text-white">
          SoulMayte
        </div>
        <nav className="hidden gap-6 text-sm text-white/70 md:flex">
          <a href="#how-it-works" className="transition hover:text-white">
            How it works
          </a>
          <a href="#features" className="transition hover:text-white">
            Features
          </a>
          <a href="#waitlist" className="transition hover:text-white">
            Join waitlist
          </a>
        </nav>
      </div>
    </header>
  );
}
