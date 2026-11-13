export default function LtdBanner({ onOpenModal }) {
  return (
    <section className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24">
      <div className="relative overflow-hidden rounded-3xl border border-blue-500/40 bg-slate-900 px-6 py-12 sm:px-12 sm:py-16 text-center shadow-[0_30px_80px_rgba(59,130,246,0.25)]">
        {/* Soft decorative glow */}
        <div
          className="absolute -top-24 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl pointer-events-none"
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-3xl mx-auto space-y-6">
          <div>
            <span className="inline-flex rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-300">
              STRICT SCARCITY • WAVE 1 ACTIVE
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Lock Your Lifetime Founder Access for $0 Today
          </h2>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto">
            Reserve your Wave 1 spot now. No credit card required today. Once 150 LTD slots are gone, GhostLead transitions permanently to monthly subscriptions.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => onOpenModal && onOpenModal()}
              className="bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white font-semibold px-6 py-3.5 rounded-xl shadow-lg shadow-blue-500/25 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 cursor-pointer"
            >
              Lock Founder Spot ($0) →
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
              ✓ Non-Expiring Credits
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
              ✓ $0 Due Today
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
              ✓ 2-for-1 Bounce Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export { LtdBanner };
