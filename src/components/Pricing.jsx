import { Check, Sparkles } from 'lucide-react';
import { getPricingPlans } from '../lib/pricingPlans';

/**
 * Dynamic Pricing Cards Component displaying Non-Expiring LTD Token Stack with Wave-based price escalation.
 * 
 * @param {{
 *   totalCount?: number,
 *   onSelectPlan: (tier: 'Starter' | 'Pro' | 'Agency') => void
 * }} props
 */
export function Pricing({ totalCount = 0, onSelectPlan }) {
  const plansData = getPricingPlans(totalCount);
  const { activeWaveTag, isClosed, Starter, Pro, Agency } = plansData;

  const handleSelect = (tierId) => {
    if (typeof onSelectPlan === 'function') {
      onSelectPlan(tierId);
    }
  };

  return (
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
            <span className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f]">{Starter.formattedPrice}</span>
            <span className="text-[#86868b] text-sm font-medium">{Starter.priceSuffix}</span>
          </div>
          <p className="text-xs text-[#86868b] mt-1">
            {Starter.subtitle}
          </p>

          {/* Dynamic Wave Escalation Badge */}
          <div className="mt-5 py-2.5 px-3.5 rounded-2xl bg-slate-50/80 border border-black/[0.04] flex items-center justify-between text-xs">
            <span className="font-medium text-[#6e6e73]">Price Escalation</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
              {Starter.nextJumpNotice}
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-black/[0.05]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
              What's included:
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6e6e73]">
              {Starter.features.map((feat, idx) => (
                <li key={idx} className="flex items-center gap-2.5">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => handleSelect('Starter')}
          className="transform-gpu will-change-transform mt-7 w-full min-h-[44px] py-2.5 px-4 rounded-full font-medium text-xs sm:text-sm bg-slate-100 hover:bg-slate-200/80 text-[#1d1d1f] border border-black/[0.04] transition-all cursor-pointer flex items-center justify-center active:scale-98"
        >
          {Starter.ctaText}
        </button>
      </div>

      {/* Pro Card (Founder's Choice / Highlighted) */}
      <div 
        data-testid="pricing-card-pro"
        className="rounded-[28px] p-6 sm:p-8 bg-white/95 backdrop-blur-xl border-2 border-purple-500/40 ring-1 ring-purple-500/20 shadow-lg flex flex-col justify-between relative hover:shadow-xl transition-all transform-gpu will-change-transform"
      >
        {/* Founder's Choice Pill */}
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#1d1d1f] text-white text-[11px] font-semibold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3 h-3 text-amber-300" />
          Founder's Choice
        </div>

        <div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-xl font-semibold text-[#1d1d1f]">{Pro.name}</span>
            <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60 inline-flex items-center gap-1.5 flex-shrink-0">
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
            <span className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f]">{Pro.formattedPrice}</span>
            <span className="text-[#86868b] text-sm font-medium">{Pro.priceSuffix}</span>
          </div>
          <p className="text-xs text-purple-600 font-medium mt-1">
            {Pro.subtitle}
          </p>

          {/* Dynamic Wave Escalation Badge */}
          <div className="mt-5 py-2.5 px-3.5 rounded-2xl bg-purple-50/60 border border-purple-100 flex items-center justify-between text-xs">
            <span className="font-medium text-purple-900">Price Escalation</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-purple-600 text-white">
              {Pro.nextJumpNotice}
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-black/[0.05]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
              What's included:
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6e6e73]">
              {Pro.features.map((feat, idx) => {
                if (feat.startsWith('Everything in')) {
                  return (
                    <li key={idx} className="pt-2 pb-0.5 text-xs font-semibold uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  );
                }
                return (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => handleSelect('Pro')}
          className="transform-gpu will-change-transform mt-7 w-full min-h-[44px] py-3 px-4 rounded-full font-medium text-xs sm:text-sm bg-[#1d1d1f] hover:bg-black text-white transition-all shadow-sm cursor-pointer flex items-center justify-center active:scale-98"
        >
          {Pro.ctaText}
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
            <span className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f]">{Agency.formattedPrice}</span>
            <span className="text-[#86868b] text-sm font-medium">{Agency.priceSuffix}</span>
          </div>
          <p className="text-xs text-rose-600 font-medium mt-1">
            {Agency.subtitle}
          </p>

          {/* Dynamic Wave Escalation Badge */}
          <div className="mt-5 py-2.5 px-3.5 rounded-2xl bg-slate-50/80 border border-black/[0.04] flex items-center justify-between text-xs">
            <span className="font-medium text-[#6e6e73]">Price Escalation</span>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
              {Agency.nextJumpNotice}
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-black/[0.05]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
              What's included:
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-[#6e6e73]">
              {Agency.features.map((feat, idx) => {
                if (feat.startsWith('Everything in')) {
                  return (
                    <li key={idx} className="pt-2 pb-0.5 text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  );
                }
                return (
                  <li key={idx} className="flex items-center gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <button 
          type="button"
          onClick={() => handleSelect('Agency')}
          className="transform-gpu will-change-transform mt-7 w-full min-h-[44px] py-2.5 px-4 rounded-full font-medium text-xs sm:text-sm bg-slate-100 hover:bg-slate-200/80 text-[#1d1d1f] border border-black/[0.04] transition-all cursor-pointer flex items-center justify-center active:scale-98"
        >
          {Agency.ctaText}
        </button>
      </div>

    </div>
  );
}

export default Pricing;
