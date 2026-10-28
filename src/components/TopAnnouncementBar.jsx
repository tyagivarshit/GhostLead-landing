import { ArrowRight, AlertCircle } from 'lucide-react';

/**
 * Dynamic Top Announcement Bar reflecting current wave progression and slot count.
 * 
 * - When !isClosed:
 *   - Displays active wave badge: "[Wave X] currentSlots/maxSlots claimed"
 *   - Displays dynamic progress bar: (currentSlots / maxSlots) * 100%
 *   - Displays discount promise with "Reserve Spot" CTA
 * - When isClosed:
 *   - Hides progress bar and slot numbers
 *   - Displays red/amber alert: "All LTD slots claimed — Public launch waitlist open"
 *   - Changes button to "Join Launch Waitlist"
 * 
 * @param {{
 *   waveMetrics: {
 *     waveName: string,
 *     currentSlots: number,
 *     maxSlots: number,
 *     discountLabel: string,
 *     isClosed: boolean,
 *     soldOutMessage?: string
 *   },
 *   onOpenModal: (tier?: string, headline?: string) => void
 * }} props
 */
export function TopAnnouncementBar({ waveMetrics, onOpenModal }) {
  const { waveName, currentSlots, maxSlots, discountLabel, isClosed } = waveMetrics;

  const rawPercent = maxSlots > 0 ? (currentSlots / maxSlots) * 100 : 0;
  const progressPercent = Math.min(100, Math.max(0, rawPercent));
  const roundedPercent = Math.round(progressPercent);

  return (
    <aside 
      aria-label="Early-Bird Announcement" 
      className={`relative z-20 px-3 py-1.5 sm:py-2 text-xs font-medium text-center transform-gpu will-change-transform border-b transition-colors ${
        isClosed
          ? 'bg-amber-50/80 border-amber-200/80 text-amber-950'
          : 'bg-[#fafafc] border-black/[0.05] text-[#1d1d1f]'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3">
        {isClosed ? (
          <>
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-xs shadow-rose-500/50" />
            </span>
            <span className="inline-flex items-center gap-1.5 font-semibold text-rose-900 bg-rose-100/80 border border-rose-200 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
              <span>All LTD slots claimed — Public launch waitlist open</span>
            </span>
            <button
              type="button"
              onClick={() => onOpenModal('Pro', 'Join Public Launch Waitlist')}
              className="ml-1 sm:ml-2 font-semibold text-[#1d1d1f] hover:opacity-70 transition-opacity cursor-pointer inline-flex items-center gap-1 flex-shrink-0 underline underline-offset-2"
            >
              <span>Join Launch Waitlist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <>
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>

            {/* Active wave badge */}
            <span className="font-semibold text-[#424245] bg-black/[0.04] px-2.5 py-0.5 rounded-full border border-black/[0.06] inline-flex items-center gap-1 text-[11px] sm:text-xs flex-shrink-0">
              [{waveName}] {currentSlots}/{maxSlots} claimed
            </span>

            {/* Dynamic progress bar */}
            <div 
              className="w-16 sm:w-24 h-1.5 bg-black/[0.06] rounded-full overflow-hidden inline-flex items-center flex-shrink-0"
              role="progressbar"
              aria-valuenow={roundedPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              title={`${roundedPercent}% claimed`}
            >
              <div 
                className="h-full bg-[#1d1d1f] rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>

            {/* Discount promise */}
            <span className="text-[#424245] font-normal text-xs">
              <strong className="font-semibold text-[#1d1d1f]">{discountLabel}</strong>
            </span>

            {/* Reserve Spot CTA */}
            <button
              type="button"
              onClick={() => onOpenModal('Pro', `Lock Your ${waveName} Early-Bird Slot`)}
              className="ml-1 sm:ml-2 font-semibold text-[#1d1d1f] hover:opacity-70 transition-opacity cursor-pointer inline-flex items-center gap-1 flex-shrink-0 underline underline-offset-2"
            >
              <span>Reserve Spot</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}
      </div>
    </aside>
  );
}

export default TopAnnouncementBar;
