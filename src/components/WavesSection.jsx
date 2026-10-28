import { Lock } from 'lucide-react';

/**
 * 3 Wave Cards section completely dynamic and reactive to live Supabase waitlist count.
 * 
 * Wave 1: 30 slots total
 * Wave 2: 70 slots total (activates when totalCount >= 30)
 * Wave 3: 50 slots total (activates when totalCount >= 100)
 * 
 * @param {{ totalCount?: number }} props
 */
export function WavesSection({ totalCount = 0 }) {
  const count = typeof totalCount === 'number' && !Number.isNaN(totalCount)
    ? Math.max(0, totalCount)
    : 0;

  // WAVE 1 (30 slots total)
  const isWave1Active = count < 30;
  const isWave1SoldOut = count >= 30;
  const wave1Remaining = Math.max(0, 30 - count);
  const wave1Percent = isWave1SoldOut ? 100 : Math.round((count / 30) * 100);

  // WAVE 2 (70 slots total, activates when totalCount >= 30)
  const isWave2Upcoming = count < 30;
  const isWave2Active = count >= 30 && count < 100;
  const isWave2SoldOut = count >= 100;
  const wave2Remaining = Math.max(0, 100 - count);
  const wave2Percent = isWave2SoldOut 
    ? 100 
    : isWave2Active 
      ? Math.round(((count - 30) / 70) * 100) 
      : 0;

  // WAVE 3 (50 slots total, activates when totalCount >= 100)
  const isWave3Locked = count < 100;
  const isWave3Active = count >= 100 && count < 150;
  const isWave3SoldOut = count >= 150;
  const wave3Remaining = Math.max(0, 150 - count);
  const wave3Percent = isWave3SoldOut 
    ? 100 
    : isWave3Active 
      ? Math.round(((count - 100) / 50) * 100) 
      : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4" data-testid="waves-section">
      
      {/* ========================================================= */}
      {/* WAVE 1 (30 slots total)                                   */}
      {/* ========================================================= */}
      <div 
        data-testid="wave-card-1"
        className={`p-4 sm:p-5 rounded-2xl transition-all transform-gpu will-change-transform ${
          isWave1Active
            ? 'bg-white/95 border-2 border-purple-500/40 ring-1 ring-purple-500/20 shadow-sm hover:shadow-md'
            : 'bg-white/90 border border-black/[0.06] shadow-sm hover:shadow-md opacity-90'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
            isWave1Active ? 'text-purple-700' : 'text-[#86868b]'
          }`}>
            {isWave1Active ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                ACTIVE
              </>
            ) : (
              'SOLD OUT'
            )}
          </span>
          <span className={`text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full ${
            isWave1Active
              ? 'bg-purple-600 text-white font-semibold shadow-xs uppercase tracking-wider'
              : 'bg-black/[0.04] text-[#86868b] border border-black/[0.04] font-medium'
          }`}>
            {isWave1Active ? 'WAVE 1: ACTIVE NOW' : 'SOLD OUT (30/30)'}
          </span>
        </div>

        <div className="font-semibold text-[#1d1d1f] text-base sm:text-lg mt-2">
          Wave 1: Early-Bird
        </div>

        <div className="text-xs text-[#86868b] mt-1 min-h-[1.5rem]">
          {isWave1Active ? (
            <>Only <strong className="text-purple-700 font-semibold">{`${wave1Remaining} / 30`}</strong> slots remaining</>
          ) : (
            <>All <strong className="text-[#1d1d1f] font-semibold">30 / 30</strong> slots claimed in this phase.</>
          )}
        </div>

        {/* Progress Bar */}
        <div 
          className="mt-3 w-full h-1.5 rounded-full overflow-hidden bg-black/[0.04]"
          role="progressbar"
          aria-valuenow={wave1Percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              isWave1Active ? 'bg-purple-600' : 'bg-slate-300'
            }`}
            style={{ width: `${wave1Percent}%` }} 
          />
        </div>

        <div className={`text-[10px] font-medium text-right mt-1.5 ${
          isWave1Active ? 'text-purple-700' : 'text-[#86868b]'
        }`}>
          {`${wave1Percent}% Claimed`}
        </div>
      </div>

      {/* ========================================================= */}
      {/* WAVE 2 (70 slots total, activates when totalCount >= 30)  */}
      {/* ========================================================= */}
      <div 
        data-testid="wave-card-2"
        className={`p-4 sm:p-5 rounded-2xl transition-all transform-gpu will-change-transform ${
          isWave2Active
            ? 'bg-white/95 border-2 border-purple-500/40 ring-1 ring-purple-500/20 shadow-sm hover:shadow-md'
            : isWave2Upcoming
              ? 'bg-white/90 border border-black/[0.06] shadow-sm hover:shadow-md opacity-75'
              : 'bg-white/90 border border-black/[0.06] shadow-sm hover:shadow-md opacity-90'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
            isWave2Active 
              ? 'text-purple-700' 
              : 'text-[#86868b]'
          }`}>
            {isWave2Active ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                ACTIVE NOW
              </>
            ) : isWave2SoldOut ? (
              'SOLD OUT'
            ) : (
              <>
                <Lock className="w-3 h-3 text-[#86868b]" />
                UPCOMING
              </>
            )}
          </span>
          <span className={`text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full ${
            isWave2Active
              ? 'bg-purple-600 text-white font-semibold shadow-xs uppercase tracking-wider'
              : 'bg-black/[0.04] text-[#86868b] border border-black/[0.04] font-medium'
          }`}>
            {isWave2Active 
              ? 'WAVE 2: ACTIVE NOW' 
              : isWave2SoldOut 
                ? 'SOLD OUT (70/70)' 
                : 'Pending Activation'}
          </span>
        </div>

        <div className="font-semibold text-[#1d1d1f] text-base sm:text-lg mt-2">
          Wave 2: Standard
        </div>

        <div className="text-xs text-[#86868b] mt-1 min-h-[1.5rem]">
          {isWave2Upcoming ? (
            '70 Total Slots • Unlocks immediately once Wave 1 ends'
          ) : isWave2SoldOut ? (
            <>All <strong className="text-[#1d1d1f] font-semibold">70 / 70</strong> slots claimed in this phase.</>
          ) : (
            <>Only <strong className="text-purple-700 font-semibold">{`${wave2Remaining} / 70`}</strong> slots remaining</>
          )}
        </div>

        {/* Progress Bar */}
        <div 
          className="mt-3 w-full h-1.5 rounded-full overflow-hidden bg-black/[0.04]"
          role="progressbar"
          aria-valuenow={wave2Percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              isWave2Active ? 'bg-purple-600' : 'bg-slate-300'
            }`}
            style={{ width: `${wave2Percent}%` }} 
          />
        </div>

        <div className={`text-[10px] font-medium text-right mt-1.5 ${
          isWave2Active ? 'text-purple-700' : 'text-[#86868b]'
        }`}>
          {isWave2Upcoming
            ? 'Pending Activation'
            : `${wave2Percent}% Claimed`}
        </div>
      </div>

      {/* ========================================================= */}
      {/* WAVE 3 (50 slots total, activates when totalCount >= 100) */}
      {/* ========================================================= */}
      <div 
        data-testid="wave-card-3"
        className={`p-4 sm:p-5 rounded-2xl transition-all transform-gpu will-change-transform ${
          isWave3Active
            ? 'bg-white/95 border-2 border-purple-500/40 ring-1 ring-purple-500/20 shadow-sm hover:shadow-md'
            : isWave3Locked
              ? 'bg-white/90 border border-black/[0.06] shadow-sm hover:shadow-md opacity-60'
              : 'bg-white/90 border border-black/[0.06] shadow-sm hover:shadow-md opacity-90'
        }`}
      >
        <div className="flex items-center justify-between gap-2">
          <span className={`text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 ${
            isWave3Active 
              ? 'text-purple-700' 
              : 'text-[#86868b]'
          }`}>
            {isWave3Active ? (
              <>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                ACTIVE NOW
              </>
            ) : isWave3SoldOut ? (
              'SOLD OUT'
            ) : (
              <>
                <Lock className="w-3 h-3 text-[#86868b]" />
                LOCKED
              </>
            )}
          </span>
          <span className={`text-[10px] sm:text-[11px] px-2.5 py-0.5 rounded-full ${
            isWave3Active
              ? 'bg-purple-600 text-white font-semibold shadow-xs uppercase tracking-wider'
              : 'bg-black/[0.04] text-[#86868b] border border-black/[0.04] font-medium'
          }`}>
            {isWave3Active 
              ? 'WAVE 3: FINAL PHASE' 
              : isWave3SoldOut 
                ? 'ALL LTD SLOTS CLAIMED' 
                : 'Locked'}
          </span>
        </div>

        <div className="font-semibold text-[#1d1d1f] text-base sm:text-lg mt-2">
          Wave 3: Final Lockdown
        </div>

        <div className="text-xs text-[#86868b] mt-1 min-h-[1.5rem]">
          {isWave3Locked ? (
            '50 Slots • Permanent maximum LTD before SaaS transition.'
          ) : isWave3SoldOut ? (
            <>All <strong className="text-[#1d1d1f] font-semibold">50 / 50</strong> slots claimed.</>
          ) : (
            <>Only <strong className="text-purple-700 font-semibold">{`${wave3Remaining} / 50`}</strong> slots remaining</>
          )}
        </div>

        {/* Progress Bar */}
        <div 
          className="mt-3 w-full h-1.5 rounded-full overflow-hidden bg-black/[0.04]"
          role="progressbar"
          aria-valuenow={wave3Percent}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div 
            className={`h-full transition-all duration-500 rounded-full ${
              isWave3Active ? 'bg-purple-600' : 'bg-slate-300'
            }`}
            style={{ width: `${wave3Percent}%` }} 
          />
        </div>

        <div className={`text-[10px] font-medium text-right mt-1.5 ${
          isWave3Active ? 'text-purple-700' : 'text-[#86868b]'
        }`}>
          {isWave3Locked
            ? 'Locked'
            : `${wave3Percent}% Claimed`}
        </div>
      </div>

    </div>
  );
}

export default WavesSection;
