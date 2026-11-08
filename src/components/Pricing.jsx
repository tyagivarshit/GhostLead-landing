import { Check, Sparkles } from 'lucide-react';
import { getPricingPlans } from '../lib/pricingPlans';

const STARTER_FEATURES = [
  { text: '5,000 Lifetime Verified Deliverable Prospects (Non-expiring)' },
  { text: 'In-Page LinkedIn Multi-Capture (10 profiles per view)' },
  { text: '2 Concurrent Mailbox Probing Channels' },
  { text: '1,000 Daily Prospect Ingestion Limit' },
  { text: 'Dynamic CSV Mapping & Ingestion Rail' },
  { text: 'Native 1-Click Exports: Instantly.ai, Smartlead, Lemlist' },
  { text: 'LinkedIn Human-Pacing Activity Meter' },
  { text: '1 User Seat' },
];

const PRO_FEATURES = [
  { text: '15,000 Lifetime Verified Deliverable Prospects (Non-expiring)' },
  { text: 'Everything in Solo, plus:', isHeader: true },
  { text: '4 Concurrent Mailbox Probing Channels' },
  { text: '4,000 Daily Prospect Ingestion Limit' },
  { text: 'Background CSV Processing Queue (runs even if browser is closed)' },
  { text: 'Company Email Pattern Detector ({first}.{last} heuristic)' },
  { text: 'Live MX Host Telemetry (Google Workspace vs Microsoft 365)' },
  { text: '1 User Seat' },
];

const AGENCY_FEATURES = [
  { text: '35,000 Lifetime Verified Deliverable Prospects (Non-expiring)' },
  { text: 'Everything in Pro, plus:', isHeader: true },
  { text: '3 Team Operator Seats Included (Unified workspace & shared credit ledger)' },
  { text: '8 Concurrent Mailbox Probing Channels (High-throughput priority queue)' },
  { text: '10,000 Daily Prospect Ingestion Limit' },
  { text: 'Low-Latency Real-Time Webhooks (Zapier, Make, HubSpot sync)' },
  { text: 'Programmatic Enrichment API Rail (POST /api/v1/enrich)' },
];

/**
 * Dynamic Pricing Cards Component displaying Non-Expiring LTD Token Stack with Wave-based price escalation.
 * 
 * @param {{
 *   totalCount?: number,
 *   onSelectPlan?: (tier: 'Starter' | 'Pro' | 'Agency') => void,
 *   onOpenModal?: (tier: 'Starter' | 'Pro' | 'Agency') => void
 * }} props
 */
export function Pricing({ totalCount = 0, onSelectPlan, onOpenModal }) {
  const plansData = getPricingPlans(totalCount);
  const { activeWaveTag, isClosed, Starter, Pro, Agency } = plansData;

  const handleSelect = (tierId) => {
    if (typeof onSelectPlan === 'function') {
      onSelectPlan(tierId);
    } else if (typeof onOpenModal === 'function') {
      onOpenModal(tierId);
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch" data-testid="pricing-cards">
      
      {/* Starter Card */}
      <div 
        data-testid="pricing-card-starter"
        className="rounded-[28px] p-6 sm:p-8 bg-white/90 backdrop-blur-xl border border-black/[0.06] flex flex-col justify-between hover:shadow-md transition-all transform-gpu will-change-transform"
      >
        <div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-xl font-semibold text-[#1d1d1f]">{Starter.name}</span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-[#6e6e73] border border-black/[0.04] inline-flex items-center gap-1.5 flex-shrink-0">
              {!isClosed && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
              {activeWaveTag}
            </span>
          </div>
          
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="line-through text-slate-400 text-sm font-medium mr-2">$199</span>
            <span className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f]">$69</span>
            <span className="text-[#86868b] text-sm font-medium">/ lifetime</span>
          </div>
          <p className="text-xs text-[#86868b] mt-1">
            {Starter.subtitle}
          </p>

          {/* Dynamic Wave Escalation Badge */}
          <div className="mt-5 py-2.5 px-3.5 rounded-2xl bg-slate-50/80 border border-black/[0.04] flex items-center justify-between text-xs">
            <span className="font-medium text-[#6e6e73]">Price Escalation</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
              +$20 in Wave 2 ($89)
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-black/[0.05]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
              What's included:
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6e6e73]">
              {STARTER_FEATURES.map((feat, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span>{feat.text}</span>
                    {feat.note && (
                      <span className="block text-xs text-[#86868b]">{feat.note}</span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => handleSelect('solo')}
          className="w-full mt-7 cursor-pointer flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-slate-200/80"
        >
          Claim Solo Slot ($69)
        </button>
      </div>

      {/* Pro Card (Founder's Choice / Highlighted) */}
      <div 
        data-testid="pricing-card-pro"
        className="rounded-[28px] p-6 sm:p-8 bg-white/95 backdrop-blur-xl border-2 border-blue-500 shadow-xl shadow-blue-500/10 flex flex-col justify-between relative hover:shadow-xl transition-all transform-gpu will-change-transform"
      >
        {/* Founder's Choice Pill */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-sky-500 text-white text-[11px] font-semibold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3 h-3 text-amber-300" />
          Founder's Choice
        </div>

        <div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-xl font-semibold text-[#1d1d1f]">{Pro.name}</span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full text-blue-600 bg-blue-50 border border-blue-200 inline-flex items-center gap-1.5 flex-shrink-0">
              {!isClosed && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
              {activeWaveTag}
            </span>
          </div>
          
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="line-through text-slate-400 text-sm font-medium mr-2">$349</span>
            <span className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f]">$129</span>
            <span className="text-[#86868b] text-sm font-medium">/ lifetime</span>
          </div>
          <p className="text-xs text-blue-600 font-medium mt-1">
            {Pro.subtitle}
          </p>

          {/* Dynamic Wave Escalation Badge */}
          <div className="mt-5 py-2.5 px-3.5 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
            <span className="font-medium text-blue-900">Price Escalation</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-blue-600 bg-blue-50 border border-blue-200">
              +$40 in Wave 2 ($169)
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-black/[0.05]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
              What's included:
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6e6e73]">
              {PRO_FEATURES.map((feat, idx) => {
                if (feat.isHeader) {
                  return (
                    <li key={idx} className="pt-2 pb-0.5 text-xs font-semibold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                      <span>{feat.text}</span>
                    </li>
                  );
                }
                return (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span>{feat.text}</span>
                      {feat.note && (
                        <span className="block text-xs text-[#86868b]">{feat.note}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => handleSelect('pro')}
          className="w-full mt-7 cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
          Claim Pro Slot ($129)
        </button>
      </div>

      {/* Agency Card */}
      <div 
        data-testid="pricing-card-agency"
        className="rounded-[28px] p-6 sm:p-8 bg-white/90 backdrop-blur-xl border border-black/[0.06] flex flex-col justify-between hover:shadow-md transition-all transform-gpu will-change-transform"
      >
        <div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-xl font-semibold text-[#1d1d1f]">{Agency.name}</span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-[#6e6e73] border border-black/[0.04] inline-flex items-center gap-1.5 flex-shrink-0">
              {!isClosed && (
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
              )}
              {activeWaveTag}
            </span>
          </div>
          
          <div className="mt-4 flex items-baseline gap-1.5">
            <span className="line-through text-slate-400 text-sm font-medium mr-2">$699</span>
            <span className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f]">$249</span>
            <span className="text-[#86868b] text-sm font-medium">/ lifetime</span>
          </div>
          <p className="text-xs text-rose-600 font-medium mt-1">
            {Agency.subtitle}
          </p>

          {/* Dynamic Wave Escalation Badge */}
          <div className="mt-5 py-2.5 px-3.5 rounded-2xl bg-slate-50/80 border border-black/[0.04] flex items-center justify-between text-xs">
            <span className="font-medium text-[#6e6e73]">Price Escalation</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
              +$100 in Wave 2 ($349)
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-black/[0.05]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
              What's included:
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6e6e73]">
              {AGENCY_FEATURES.map((feat, idx) => {
                if (feat.isHeader) {
                  return (
                    <li key={idx} className="pt-2 pb-0.5 text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                      <span>{feat.text}</span>
                    </li>
                  );
                }
                return (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <span>{feat.text}</span>
                      {feat.note && (
                        <span className="block text-xs text-[#86868b]">{feat.note}</span>
                      )}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => handleSelect('agency')}
          className="w-full mt-7 cursor-pointer flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-slate-200/80"
        >
          Claim Agency Slot ($249)
        </button>
      </div>

    </div>
    <p className="text-center text-sm text-slate-500 mt-6">
      $0 due today to lock slot • Non-expiring lifetime balance
    </p>
  </div>
  );
}

export default Pricing;
