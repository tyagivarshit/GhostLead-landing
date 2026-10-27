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
      className={`sticky top-0 z-50 px-3 py-1.5 sm:py-2 text-xs font-medium text-center transform-gpu will-change-transform border-b transition-colors ${
        isClosed
          ? 'bg-amber-50/95 border-amber-300/90 text-amber-950'
          : 'bg-amber-50 border-amber-200/80 text-amber-950'
      }`}
    >
      <div className="max-w-4xl mx-auto flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-3">
        {isClosed ? (
          <>
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500 shadow-xs shadow-rose-500/50" />
            </span>
            <span className="inline-flex items-center gap-1.5 font-bold text-rose-900 bg-rose-100/90 border border-rose-300 px-2.5 py-0.5 rounded-full text-[11px] sm:text-xs shadow-2xs">
              <AlertCircle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
              <span>All LTD slots claimed — Public launch waitlist open</span>
            </span>
            <button
              type="button"
              onClick={() => onOpenModal('Pro', 'Join Public Launch Waitlist')}
              className="ml-1 sm:ml-2 font-bold text-indigo-700 hover:text-indigo-900 underline underline-offset-2 transition-colors cursor-pointer inline-flex items-center gap-1 flex-shrink-0"
            >
              <span>Join Launch Waitlist</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </>
        ) : (
          <>
            <span className="relative flex h-2 w-2 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-xs shadow-amber-500/50" />
            </span>

            {/* Active wave badge */}
            <span className="font-bold text-amber-900 bg-amber-100/90 px-2 py-0.5 rounded border border-amber-300 inline-flex items-center gap-1 text-[11px] sm:text-xs flex-shrink-0">
              [{waveName}] {currentSlots}/{maxSlots} claimed
            </span>

            {/* Dynamic progress bar */}
            <div 
              className="w-16 sm:w-24 h-2 bg-amber-200/80 rounded-full overflow-hidden inline-flex items-center flex-shrink-0"
              role="progressbar"
              aria-valuenow={roundedPercent}
              aria-valuemin={0}
              aria-valuemax={100}
              title={`${roundedPercent}% claimed`}
            >
              <div 
                className="h-full bg-amber-500 rounded-full transition-all duration-500 ease-out" 
                style={{ width: `${progressPercent}%` }} 
              />
            </div>

            {/* Discount promise */}
            <span className="text-amber-950 font-medium text-xs">
              🔥 <strong className="font-semibold text-amber-900">{discountLabel}</strong>
            </span>

            {/* Reserve Spot CTA */}
            <button
              type="button"
              onClick={() => onOpenModal('Pro', `Lock Your ${waveName} Early-Bird Slot`)}
              className="ml-1 sm:ml-2 font-bold text-indigo-700 hover:text-indigo-900 underline underline-offset-2 transition-colors cursor-pointer inline-flex items-center gap-1 flex-shrink-0"
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
