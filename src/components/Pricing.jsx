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
        className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 flex flex-col justify-between hover:shadow-lg transition-all transform-gpu will-change-transform"
      >
        <div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-xl font-bold text-slate-950">{Starter.name}</span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70 inline-flex items-center gap-1.5 flex-shrink-0">
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
            <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">{Starter.formattedPrice}</span>
            <span className="text-slate-500 text-sm font-semibold">{Starter.priceSuffix}</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {Starter.subtitle}
          </p>

          {/* Dynamic Wave Escalation Badge (Replacing fake slot sub-bar) */}
          <div className="mt-5 py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">Price Escalation</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {Starter.nextJumpNotice}
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              What's included:
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
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
          className="transform-gpu will-change-transform mt-7 w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 transition-all cursor-pointer flex items-center justify-center active:scale-98"
        >
          {Starter.ctaText}
        </button>
      </div>

      {/* Pro Card (Founder's Choice / Highlighted) */}
      <div 
        data-testid="pricing-card-pro"
        className="rounded-3xl p-6 sm:p-8 bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-100/70 flex flex-col justify-between relative hover:shadow-2xl transition-all transform-gpu will-change-transform"
      >
        {/* Founder's Choice Pill */}
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md shadow-indigo-600/30 flex items-center gap-1.5 whitespace-nowrap">
          <Sparkles className="w-3 h-3 text-amber-300" />
          Founder's Choice
        </div>

        <div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-xl font-bold text-slate-950">{Pro.name}</span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 inline-flex items-center gap-1.5 flex-shrink-0">
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
            <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">{Pro.formattedPrice}</span>
            <span className="text-slate-500 text-sm font-semibold">{Pro.priceSuffix}</span>
          </div>
          <p className="text-xs text-indigo-600 font-semibold mt-1">
            {Pro.subtitle}
          </p>

          {/* Dynamic Wave Escalation Badge (Replacing fake slot sub-bar) */}
          <div className="mt-5 py-2.5 px-3.5 rounded-2xl bg-indigo-50/70 border border-indigo-100 flex items-center justify-between text-xs">
            <span className="font-semibold text-indigo-900">Price Escalation</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-indigo-600 text-white">
              {Pro.nextJumpNotice}
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              What's included:
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {Pro.features.map((feat, idx) => {
                if (feat.startsWith('Everything in')) {
                  return (
                    <li key={idx} className="pt-2 pb-0.5 text-xs font-bold uppercase tracking-wider text-indigo-600 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
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
          className="transform-gpu will-change-transform mt-7 w-full min-h-[44px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center active:scale-98"
        >
          {Pro.ctaText}
        </button>
      </div>

      {/* Agency Card */}
      <div 
        data-testid="pricing-card-agency"
        className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 flex flex-col justify-between hover:shadow-lg transition-all transform-gpu will-change-transform"
      >
        <div>
          <div className="flex justify-between items-center gap-2">
            <span className="text-xl font-bold text-slate-950">{Agency.name}</span>
            <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200/70 inline-flex items-center gap-1.5 flex-shrink-0">
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
            <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">{Agency.formattedPrice}</span>
            <span className="text-slate-500 text-sm font-semibold">{Agency.priceSuffix}</span>
          </div>
          <p className="text-xs text-rose-600 font-semibold mt-1">
            {Agency.subtitle}
          </p>

          {/* Dynamic Wave Escalation Badge (Replacing fake slot sub-bar) */}
          <div className="mt-5 py-2.5 px-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-600">Price Escalation</span>
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
              {Agency.nextJumpNotice}
            </span>
          </div>

          <div className="mt-6 pt-5 border-t border-slate-100">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              What's included:
            </div>
            <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              {Agency.features.map((feat, idx) => {
                if (feat.startsWith('Everything in')) {
                  return (
                    <li key={idx} className="pt-2 pb-0.5 text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
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
          className="transform-gpu will-change-transform mt-7 w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-950 hover:bg-slate-800 text-white transition-all cursor-pointer flex items-center justify-center active:scale-98"
        >
          {Agency.ctaText}
        </button>
      </div>

    </div>
  );
}

export default Pricing;
