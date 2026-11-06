import { X, Check } from 'lucide-react';

export default function Comparison() {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
      {/* Header, centered */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div>
          <span className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold tracking-wide text-blue-600">
            WHY COLD EMAILERS ARE SWITCHING
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
          Stop Burning Domains on 6-Month-Old Database Dumps
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">
          The difference between hitting the primary inbox and landing in spam.
        </p>
      </div>

      {/* Grid: 2 cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 mt-12">
        {/* Left card: Traditional Database Tools */}
        <div className="rounded-2xl p-8 backdrop-blur border border-rose-500/20 bg-rose-50/60">
          <h3 className="text-xl font-bold text-slate-900">
            Traditional Database Tools
          </h3>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-3">
              <X className="mt-1 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
              <span className="text-base text-slate-700">
                Scrapes stale databases refreshed months ago
              </span>
            </li>
            <li className="flex items-start gap-3">
              <X className="mt-1 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
              <span className="text-base text-slate-700">
                15%–30% bounce rates that trash domain sender reputation
              </span>
            </li>
            <li className="flex items-start gap-3">
              <X className="mt-1 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
              <span className="text-base text-slate-700">
                Burns your paid credits on catch-all and dead mailboxes
              </span>
            </li>
            <li className="flex items-start gap-3">
              <X className="mt-1 h-5 w-5 shrink-0 text-rose-500" aria-hidden="true" />
              <span className="text-base text-slate-700">
                Aggressive bot scraping that risks LinkedIn account bans
              </span>
            </li>
          </ul>
        </div>

        {/* Right card: The GhostLead Standard */}
        <div className="rounded-2xl p-8 backdrop-blur border border-blue-500/40 bg-blue-50/70 shadow-[0_20px_60px_rgba(59,130,246,0.15)]">
          <h3 className="text-xl font-bold text-slate-900">
            The GhostLead Standard
          </h3>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
              <span className="text-base text-slate-700">
                Live direct mailbox handshakes right at the source
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
              <span className="text-base text-slate-700">
                0% guaranteed bounce rate for bulletproof deliverability
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
              <span className="text-base text-slate-700">
                Strictly $0 charged for risky, invalid, or catch-all leads
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Check className="mt-1 h-5 w-5 shrink-0 text-emerald-600" aria-hidden="true" />
              <span className="text-base text-slate-700">
                Built-in human-pacing meter to keep LinkedIn 100% ban-safe
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export { Comparison };
