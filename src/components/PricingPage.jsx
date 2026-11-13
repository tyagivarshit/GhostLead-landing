import { motion } from 'framer-motion';
import { 
  Check, 
  Flame, 
  AlertCircle
} from 'lucide-react';
import { Pricing } from './Pricing';
import { WavesSection } from './WavesSection';

/**
 * Dedicated Full-Page Pricing View.
 * Matches clean modern theme with natural window scrolling and zero popup constraints.
 * 
 * @param {{
 *   totalCount?: number,
 *   waveMetrics: {
 *     waveName: string,
 *     currentSlots: number,
 *     maxSlots: number,
 *     discountLabel: string,
 *     isClosed: boolean,
 *     soldOutMessage?: string
 *   },
 *   onSelectPlan: (tier: 'Starter' | 'Pro' | 'Agency', headline?: string) => void,
 *   onNavigateHome?: (hash?: string) => void
 * }} props
 */
export function PricingPage({ totalCount = 0, waveMetrics, onSelectPlan }) {
  return (
    <div className="w-full max-w-full text-[#1d1d1f]">
      {/* Hero Header for Dedicated Pricing View */}
      <section className="pt-4 pb-10 sm:pt-6 sm:pb-12 max-w-4xl mx-auto text-center px-4">
        
        {/* Scarcity Wave Pill */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/[0.04] border border-black/[0.04] text-[#6e6e73] text-xs font-semibold mb-5 shadow-2xs"
        >
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500 animate-pulse flex-shrink-0" />
          <span>
            {waveMetrics.isClosed 
              ? "All 150 LTD Slots Claimed — Public Waitlist Active" 
              : `Strict Scarcity Wave Release • ${waveMetrics.waveName} Active`}
          </span>
          <span className="hidden sm:inline text-black/[0.1]">•</span>
          <span className="hidden sm:inline font-medium text-[#1d1d1f]">
            {waveMetrics.isClosed ? "Shifting to SaaS" : "Strict 150 Account Lifetime Cap"}
          </span>
        </motion.div>

        {/* Primary Page Headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
        >
          Non-Expiring Lifetime Token Stack.
          <span className="block mt-1 sm:mt-2 text-slate-600 font-semibold">
            One-time payment. Never pay monthly.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-[#86868b] max-w-2xl mx-auto leading-relaxed"
        >
          Pay once, verify forever with credits that never vanish. Parallel concurrency slots for high-speed enrichment, and transparent wave escalations before public SaaS launch.
        </motion.p>

        {/* Scarcity Callout Bar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-[#86868b] font-medium"
        >
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            Tokens Never Expire
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            2-for-1 Bounce Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            Zero Recurring Subscriptions
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            Zero Upfront Payment Today
          </span>
        </motion.div>
      </section>

      {/* Main Pricing Section Container */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Closed / Sold Out Notification */}
        {waveMetrics.isClosed && (
          <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap shadow-xs">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0" />
              <div>
                <div className="text-sm font-semibold">All 150 Lifetime Slots Claimed</div>
                <div className="text-xs text-amber-800 mt-0.5">{waveMetrics.soldOutMessage}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => onSelectPlan('Pro', 'Join Public Launch Waitlist')}
              className="px-5 py-2.5 bg-[#1d1d1f] hover:bg-black text-white rounded-full text-xs font-medium transition-all shadow-sm cursor-pointer flex-shrink-0 whitespace-nowrap active:scale-95"
            >
              Join Launch Waitlist →
            </button>
          </div>
        )}

        {/* Visual Wave Escalation Tracker */}
        <div className="mb-12">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-[#86868b] uppercase tracking-wider">
              Real-Time Wave Tracker
            </span>
          </div>
          <WavesSection totalCount={totalCount} />
        </div>

        {/* 3 Wide Dynamic LTD Pricing Cards */}
        <div className="relative">
          <Pricing totalCount={totalCount} onSelectPlan={onSelectPlan} onOpenModal={onSelectPlan} />
        </div>

        {/* Public Launch Transition Notice */}
        <p className="text-sm text-slate-500 text-center max-w-3xl mx-auto mt-6">
          Notice: Public launch transitions permanently to monthly recurring billing ($39/mo, $79/mo, $159/mo). Early Founder Access spots guarantee lifetime status.
        </p>

        {/* Spacing wrapper between pricing cards container and footer */}
        <div className="pt-16 pb-12" />
      </section>
    </div>
  );
}

export default PricingPage;
