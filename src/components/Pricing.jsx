import { Check, Sparkles, ShieldCheck } from 'lucide-react';
import { getPricingPlans } from '../lib/pricingPlans';

/**
 * Dynamic Pricing Cards Component displaying Non-Expiring LTD Token Stack with Wave-based price escalation.
 * 
 * @param {{
 *   totalCount?: number,
 *   onSelectPlan?: (tier: 'Solo' | 'Pro' | 'Agency' | 'Starter') => void,
 *   onOpenModal?: (tier: 'Solo' | 'Pro' | 'Agency' | 'Starter') => void
 * }} props
 */
export function Pricing({ totalCount = 0, onSelectPlan, onOpenModal }) {
  const plansData = getPricingPlans(totalCount);
  const { activeWaveTag, isClosed, Starter, Pro, Agency, guarantees, creditLabel, fairUseNote } = plansData;

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
      
        {/* Starter (Solo) Card */}
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
              {Starter.formattedAnchorPrice && (
                <span className="line-through text-slate-400 text-sm font-medium mr-2">
                  {Starter.formattedAnchorPrice}
                </span>
              )}
              <span className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f]">
                {Starter.formattedPrice}
              </span>
              <span className="text-[#86868b] text-sm font-medium">
                {Starter.priceSuffix}
              </span>
            </div>
            <p className="text-xs text-[#86868b] mt-1">
              {Starter.subtitle}
            </p>

            {/* Non-Expiring Badge & Fair-Use Note */}
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/70">
                <Check className="w-3 h-3 text-emerald-600" />
                {creditLabel}
              </span>
              <p className="text-[11px] text-slate-400 mt-1 pl-0.5">
                {fairUseNote}
              </p>
            </div>

            {/* Dynamic Wave Escalation Badge */}
            <div className="mt-4 py-2 px-3 rounded-2xl bg-slate-50/80 border border-black/[0.04] flex items-center justify-between text-xs">
              <span className="font-medium text-[#6e6e73]">Price Escalation</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                {Starter.nextJumpNotice}
              </span>
            </div>

            {/* Credit Protection Guarantee Strip */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2 text-left">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-slate-800 block">
                    {guarantees[0].title}
                  </span>
                  <span className="text-slate-500">
                    {guarantees[0].description}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1.5 border-t border-slate-200/60">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-slate-800 block">
                    {guarantees[1].title}
                  </span>
                  <span className="text-slate-500">
                    {guarantees[1].description}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-black/[0.05]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
                What's included:
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#6e6e73]">
                {Starter.features.map((feat, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <button 
            type="button"
            disabled={Starter.disabled}
            onClick={() => handleSelect('Solo')}
            className="w-full mt-7 cursor-pointer flex items-center justify-center bg-slate-100 hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed text-slate-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-slate-200/80 active:scale-[0.99]"
          >
            {Starter.ctaText}
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
              {Pro.formattedAnchorPrice && (
                <span className="line-through text-slate-400 text-sm font-medium mr-2">
                  {Pro.formattedAnchorPrice}
                </span>
              )}
              <span className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f]">
                {Pro.formattedPrice}
              </span>
              <span className="text-[#86868b] text-sm font-medium">
                {Pro.priceSuffix}
              </span>
            </div>
            <p className="text-xs text-blue-600 font-medium mt-1">
              {Pro.subtitle}
            </p>

            {/* Non-Expiring Badge & Fair-Use Note */}
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/70">
                <Check className="w-3 h-3 text-emerald-600" />
                {creditLabel}
              </span>
              <p className="text-[11px] text-slate-400 mt-1 pl-0.5">
                {fairUseNote}
              </p>
            </div>

            {/* Dynamic Wave Escalation Badge */}
            <div className="mt-4 py-2 px-3 rounded-2xl bg-blue-50/60 border border-blue-100 flex items-center justify-between text-xs">
              <span className="font-medium text-blue-900">Price Escalation</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full text-blue-600 bg-blue-50 border border-blue-200">
                {Pro.nextJumpNotice}
              </span>
            </div>

            {/* Credit Protection Guarantee Strip */}
            <div className="mt-4 p-3 rounded-2xl bg-blue-50/40 border border-blue-200/60 space-y-2 text-left">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-slate-800 block">
                    {guarantees[0].title}
                  </span>
                  <span className="text-slate-500">
                    {guarantees[0].description}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1.5 border-t border-blue-100">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-slate-800 block">
                    {guarantees[1].title}
                  </span>
                  <span className="text-slate-500">
                    {guarantees[1].description}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-black/[0.05]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
                What's included:
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#6e6e73]">
                {Pro.features.map((feat, idx) => {
                  const isHeader = feat.startsWith('Everything in');
                  if (isHeader) {
                    return (
                      <li key={idx} className="pt-2 pb-0.5 text-xs font-semibold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
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
            className="w-full mt-7 cursor-pointer flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.99] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
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
              {Agency.formattedAnchorPrice && (
                <span className="line-through text-slate-400 text-sm font-medium mr-2">
                  {Agency.formattedAnchorPrice}
                </span>
              )}
              <span className="text-4xl sm:text-5xl font-semibold text-[#1d1d1f]">
                {Agency.formattedPrice}
              </span>
              <span className="text-[#86868b] text-sm font-medium">
                {Agency.priceSuffix}
              </span>
            </div>
            <p className="text-xs text-rose-600 font-medium mt-1">
              {Agency.subtitle}
            </p>

            {/* Non-Expiring Badge & Fair-Use Note */}
            <div className="mt-3">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200/70">
                <Check className="w-3 h-3 text-emerald-600" />
                {creditLabel}
              </span>
              <p className="text-[11px] text-slate-400 mt-1 pl-0.5">
                {fairUseNote}
              </p>
            </div>

            {/* Dynamic Wave Escalation Badge */}
            <div className="mt-4 py-2 px-3 rounded-2xl bg-slate-50/80 border border-black/[0.04] flex items-center justify-between text-xs">
              <span className="font-medium text-[#6e6e73]">Price Escalation</span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200/60">
                {Agency.nextJumpNotice}
              </span>
            </div>

            {/* Credit Protection Guarantee Strip */}
            <div className="mt-4 p-3 rounded-2xl bg-slate-50/70 border border-slate-200/60 space-y-2 text-left">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-slate-800 block">
                    {guarantees[0].title}
                  </span>
                  <span className="text-slate-500">
                    {guarantees[0].description}
                  </span>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1.5 border-t border-slate-200/60">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-tight">
                  <span className="font-semibold text-slate-800 block">
                    {guarantees[1].title}
                  </span>
                  <span className="text-slate-500">
                    {guarantees[1].description}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-4 border-t border-black/[0.05]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#86868b] mb-3">
                What's included:
              </div>
              <ul className="space-y-2.5 text-xs sm:text-sm text-[#6e6e73]">
                {Agency.features.map((feat, idx) => {
                  const isHeader = feat.startsWith('Everything in');
                  if (isHeader) {
                    return (
                      <li key={idx} className="pt-2 pb-0.5 text-xs font-semibold uppercase tracking-wider text-[#1d1d1f] flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-purple-600 flex-shrink-0" />
                        <span>{feat}</span>
                      </li>
                    );
                  }
                  return (
                    <li key={idx} className="flex items-start gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
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
            className="w-full mt-7 cursor-pointer flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold py-3 px-6 rounded-xl transition-all duration-200 border border-slate-200/80 active:scale-[0.99]"
          >
            {Agency.ctaText}
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
