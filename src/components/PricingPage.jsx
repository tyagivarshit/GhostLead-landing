import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Check, 
  Flame, 
  ArrowRight, 
  Zap, 
  Layers, 
  ChevronDown, 
  AlertCircle,
  HelpCircle,
  Clock,
  Lock
} from 'lucide-react';
import { Pricing } from './Pricing';
import { WavesSection } from './WavesSection';

const FAQ_ITEMS = [
  {
    question: "Do verification credits expire at the end of the month?",
    answer: "Never. Unlike traditional SaaS tools that wipe unused credits every 30 days, all GhostLead LTD credits are 100% non-expiring. Your tokens remain in your wallet indefinitely until an email is actively verified."
  },
  {
    question: "What happens when Wave 1 slots fill up?",
    answer: "As soon as 30 accounts register, the smart wave contract automatically escalates pricing to Wave 2 (+$20 on Starter, +$40 on Pro, +$70 on Agency). Once you lock in your slot, your early-bird rate is guaranteed for life."
  },
  {
    question: "Can I stack additional credits or upgrade later?",
    answer: "Yes. Early founders are granted perpetual lifetime staking privileges. You will be able to stack additional non-expiring credit batches at your locked-in wave discount rate anytime in the founder portal."
  },
  {
    question: "What is the daily abuse limit and why does it exist?",
    answer: "The daily abuse ceiling (e.g. 8,000 rows/day on Pro) prevents automated bot floods and guarantees low-latency SMTP handshake queues for all active founders. Your total lifetime credits never expire."
  },
  {
    question: "Are there any hidden monthly fees or renewal traps?",
    answer: "Zero. GhostLead Lifetime Deal tiers require only a single one-time payment. You will never be asked for recurring subscription fees, maintenance fees, or seat license upcharges."
  },
  {
    question: "How does the zero upfront reservation work today?",
    answer: "No credit card is required to secure your slot today. When you select a plan, you receive an official Reservation Token (#GL-W1-...) that locks in your lifetime discount before public release."
  }
];

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
 *   onNavigateHome: (hash?: string) => void
 * }} props
 */
export function PricingPage({ totalCount = 0, waveMetrics, onSelectPlan, onNavigateHome }) {
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

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
          className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-[#1d1d1f] leading-[1.15]"
        >
          Non-Expiring Lifetime Token Stack.
          <span className="block mt-1 sm:mt-2 text-[#86868b] font-normal">
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
            Live SMTP Handshake
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
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
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
          <Pricing totalCount={totalCount} onSelectPlan={onSelectPlan} />
        </div>

        {/* Guarantee Banner */}
        <div className="mt-14 max-w-3xl mx-auto bg-white/80 backdrop-blur-2xl border border-black/[0.06] rounded-[28px] p-6 sm:p-8 text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_1px_1px_rgba(0,0,0,0.03)]">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-100 flex items-center justify-center mx-auto mb-3 shadow-2xs">
            <ShieldCheck className="w-6 h-6 text-emerald-600" />
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-[#1d1d1f]">
            0% Hard Bounce Rate Guarantee
          </h3>
          <p className="mt-2 text-xs sm:text-sm text-[#86868b] leading-relaxed max-w-xl mx-auto">
            Every address is queried directly against recipient MX mailboxes through our zero-bounce SMTP handshake engine. If any email marked valid causes a hard bounce, we will refund 2x verification credits automatically.
          </p>
          <div className="mt-4 pt-3 border-t border-black/[0.05] inline-flex flex-wrap items-center justify-center gap-3 text-xs font-medium text-[#1d1d1f]">
            <span>✓ No Credit Card Needed Today</span>
            <span>•</span>
            <span>✓ Instant Reservation Token</span>
            <span>•</span>
            <span>✓ Locked Wave Early-Bird Rate</span>
          </div>
        </div>

        {/* Comparison: GhostLead Non-Expiring LTD vs Traditional Monthly SaaS */}
        <div className="mt-20 max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[#6e6e73] text-xs font-semibold mb-3 border border-black/[0.04]">
              <Layers className="w-3.5 h-3.5 text-purple-600" />
              Token Economics
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Why Non-Expiring Credits Outperform Subscriptions
            </h2>
            <p className="mt-2 text-sm text-[#86868b] max-w-xl mx-auto">
              See why high-growth founders and outbound agencies are replacing monthly seat subscriptions with GhostLead lifetime tokens.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {/* The Old Way: Monthly SaaS */}
            <div className="p-6 sm:p-7 rounded-[28px] bg-white border border-rose-200/60 shadow-xs relative">
              <div className="flex items-center justify-between pb-4 border-b border-rose-100">
                <span className="text-sm font-semibold text-rose-900 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                  Monthly SaaS Subscriptions
                </span>
                <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200/60">
                  Recurring Cost
                </span>
              </div>
              <ul className="mt-5 space-y-3.5 text-xs sm:text-sm text-slate-600">
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-semibold flex-shrink-0 mt-0.5">✕</span>
                  <span>Credits expire every 30 days — unspent balance vanishes.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-semibold flex-shrink-0 mt-0.5">✕</span>
                  <span>Billed $49–$199 every month even if campaigns are paused.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-semibold flex-shrink-0 mt-0.5">✕</span>
                  <span>Stale 90-day cached lists yield 15-25% hard bounces.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-rose-500 font-semibold flex-shrink-0 mt-0.5">✕</span>
                  <span>Additional seat licenses increase cost by $30/user/mo.</span>
                </li>
              </ul>
            </div>

            {/* The GhostLead Way: Non-Expiring LTD */}
            <div className="p-6 sm:p-7 rounded-[28px] bg-white/95 border-2 border-purple-500/40 ring-1 ring-purple-500/20 shadow-md relative">
              <div className="flex items-center justify-between pb-4 border-b border-purple-100">
                <span className="text-sm font-semibold text-[#1d1d1f] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-600" />
                  GhostLead Non-Expiring LTD
                </span>
                <span className="text-[11px] font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200/60">
                  Pay Once, Own Forever
                </span>
              </div>
              <ul className="mt-5 space-y-3.5 text-xs sm:text-sm text-[#1d1d1f]">
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>100% Non-expiring tokens — stay in your balance until verified.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>One-time investment — zero renewal invoices forever.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Live SMTP mailbox handshake guarantees &lt;0.6% bounce rate.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>Up to 8 concurrency slots for ultra-fast multi-threaded lookups.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Frequently Asked Questions */}
        <div className="mt-20 max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[#6e6e73] text-xs font-semibold mb-3 border border-black/[0.04]">
              <HelpCircle className="w-3.5 h-3.5 text-slate-500" />
              Frequently Asked Questions
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#1d1d1f] tracking-tight">
              Everything You Need to Know
            </h2>
            <p className="mt-2 text-sm text-[#86868b]">
              Clear answers regarding wave escalation, non-expiring tokens, and slot reservations.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div 
                  key={index}
                  className="rounded-2xl bg-white/90 border border-black/[0.06] overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(index)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#1d1d1f]">
                      {faq.question}
                    </span>
                    <ChevronDown 
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-purple-600' : ''
                      }`} 
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-[#86868b] leading-relaxed border-t border-black/[0.04] pt-3">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Card */}
        <div className="mt-20 bg-white/80 backdrop-blur-2xl rounded-[28px] p-8 sm:p-14 text-[#1d1d1f] border border-black/[0.06] text-center shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_1px_1px_rgba(0,0,0,0.03)] relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/[0.04] text-[#6e6e73] text-xs font-semibold mb-4 border border-black/[0.04]">
              <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              Limited Founder Batch
            </div>
            
            <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight text-[#1d1d1f]">
              Secure Your Lifetime Deal Before Wave 1 Closes
            </h2>
            
            <p className="mt-3.5 text-sm sm:text-base text-[#86868b] leading-relaxed">
              Join founders and cold outreach leaders locking in non-expiring verification infrastructure. Next wave jumps up to +$70 automatically.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4">
              <button
                type="button"
                onClick={() => onSelectPlan('Pro')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-full font-medium text-sm bg-[#1d1d1f] hover:bg-black text-white shadow-sm transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
              >
                <span>Claim Pro LTD Slot ($149)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                type="button"
                onClick={() => onNavigateHome('#sandbox')}
                className="w-full sm:w-auto px-6 py-3.5 rounded-full font-medium text-sm bg-slate-100 hover:bg-slate-200/80 text-[#1d1d1f] border border-black/[0.04] transition-all cursor-pointer flex items-center justify-center gap-2 active:scale-98"
              >
                <span>Test Live Sandbox</span>
              </button>
            </div>

            <div className="mt-5 flex items-center justify-center gap-4 text-xs text-[#86868b]">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-purple-600" />
                Locks instantly
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-emerald-600" />
                Zero upfront payment
              </span>
            </div>
          </div>
        </div>

      </section>
    </div>
  );
}

export default PricingPage;
