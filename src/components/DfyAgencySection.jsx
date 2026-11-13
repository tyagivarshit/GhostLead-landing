import { Check, Sparkles, ShieldCheck, ArrowRight, Zap, Target } from 'lucide-react';
import { DFY_COPY, DFY_TIERS } from '../lib/dfyPlans';

/**
 * "For Agencies (DFY — Done-For-You Data Desk)" section component.
 * Uses exact copy from DFY_COPY & DFY_TIERS in src/lib/dfyPlans.js.
 * 
 * @param {{
 *   currentView?: 'home' | 'agency' | 'pricing' | 'legal',
 *   onOpenPilotModal: (tierId?: 'starter' | 'growth' | 'scale') => void,
 *   onNavigate?: (view: string, hash?: string) => void,
 * }} props
 */
export function DfyAgencySection({ currentView = 'home', onOpenPilotModal, onNavigate }) {
  const handleSecondaryClick = (e) => {
    e.preventDefault();
    if (currentView === 'home') {
      const el = document.querySelector('#pricing');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.hash = '#pricing';
      }
    } else {
      if (typeof onNavigate === 'function') {
        onNavigate('home', '#pricing');
      } else {
        window.location.href = '/#pricing';
      }
    }
  };

  return (
    <section 
      id="dfy-agency" 
      data-testid="dfy-agency-section"
      className="mx-auto max-w-6xl px-4 sm:px-6 py-20 sm:py-24 scroll-mt-24 sm:scroll-mt-28"
    >
      {/* Top Header & Copy */}
      <div className="text-center max-w-4xl mx-auto space-y-4">
        {/* Dark slate-900 badge with subtle gold/blue accent */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 shadow-sm text-slate-200 text-xs font-semibold tracking-wide">
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
          <span className="text-slate-100">{DFY_COPY.badge}</span>
          <span className="hidden sm:inline text-slate-600">•</span>
          <span className="hidden sm:inline text-sky-400 font-medium">Weekly Drops</span>
        </div>

        {/* H2 Heading */}
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          {DFY_COPY.heading}
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed pt-1">
          {DFY_COPY.subheading}
        </p>
      </div>

      {/* 3 Pillars Row */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-5">
        {DFY_COPY.pillars.map((pillar, idx) => (
          <div
            key={pillar.title}
            className="rounded-2xl p-5 sm:p-6 bg-white/90 backdrop-blur border border-black/[0.06] shadow-xs flex flex-col justify-start"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-8 w-8 rounded-lg bg-blue-50 border border-blue-200/70 text-blue-600 font-bold text-sm flex items-center justify-center shrink-0">
                {idx === 0 ? <Target className="w-4 h-4 text-blue-600" /> : idx === 1 ? <ShieldCheck className="w-4 h-4 text-emerald-600" /> : <Zap className="w-4 h-4 text-amber-600" />}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900">
                {pillar.title}
              </h3>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              {pillar.description}
            </p>
          </div>
        ))}
      </div>

      {/* 3 DFY Pricing Cards */}
      <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch" data-testid="dfy-pricing-cards">
        {DFY_TIERS.map((tier) => {
          const isPopular = tier.popular;
          return (
            <div
              key={tier.id}
              data-testid={`dfy-card-${tier.id}`}
              className={`rounded-[28px] p-6 sm:p-8 flex flex-col justify-between transition-all transform-gpu will-change-transform relative ${
                isPopular
                  ? 'bg-white/95 backdrop-blur-xl border-2 border-blue-600 shadow-xl shadow-blue-500/10 hover:shadow-2xl'
                  : 'bg-white/90 backdrop-blur-xl border border-black/[0.06] shadow-sm hover:shadow-md'
              }`}
            >
              {/* Popular Badge (Visible but not neon) */}
              {isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[11px] font-semibold px-4 py-1 rounded-full uppercase tracking-wider shadow-sm flex items-center gap-1.5 whitespace-nowrap">
                  <Sparkles className="w-3 h-3 text-amber-300" />
                  {tier.popularBadge}
                </div>
              )}

              {/* Card Top Block */}
              <div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-xl font-bold text-slate-900 leading-tight">
                    {tier.name}
                  </span>
                </div>

                {/* Badge Note */}
                <div className="mt-2.5">
                  <span className={`inline-flex items-center text-[11px] font-semibold px-2.5 py-1 rounded-full border ${
                    isPopular
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'bg-slate-100 text-slate-700 border-black/[0.04]'
                  }`}>
                    {tier.badge}
                  </span>
                </div>

                {/* Price Block */}
                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-extrabold text-slate-900">
                    {tier.priceFormatted}
                  </span>
                  <span className="text-slate-500 text-sm font-medium">
                    {tier.billingPeriod}
                  </span>
                </div>

                <p className="text-xs text-slate-500 mt-2 min-h-[2rem] leading-relaxed">
                  {tier.subtitle}
                </p>

                {/* Divider & Features */}
                <div className="mt-6 pt-5 border-t border-black/[0.05]">
                  <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3.5">
                    What's included:
                  </div>
                  <ul className="space-y-3 text-xs sm:text-sm text-slate-700">
                    {tier.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Bottom CTA Block (aligned at exact same Y across cards via mt-auto) */}
              <div className="mt-8 pt-4">
                <button
                  type="button"
                  onClick={() => onOpenPilotModal(tier.id)}
                  className={`w-full py-3.5 px-5 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    isPopular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-500/20 focus:ring-blue-500'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200/80 focus:ring-slate-400'
                  }`}
                >
                  <span>{tier.ctaText}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Pilot Promise Strip */}
      <div className="mt-12 rounded-3xl border border-blue-500/30 bg-slate-900 p-6 sm:p-8 text-white shadow-[0_20px_50px_rgba(37,99,235,0.15)] flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-blue-300 uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            <span>{DFY_COPY.pilotPromise.title}</span>
          </div>
          <p className="text-sm sm:text-base text-slate-200 max-w-2xl leading-relaxed">
            {DFY_COPY.pilotPromise.description}
          </p>
        </div>
        <button
          type="button"
          onClick={() => onOpenPilotModal('growth')}
          className="bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 active:scale-98 shrink-0 text-sm"
        >
          <span>Claim 50 Free Sample Leads</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Secondary Link */}
      <div className="mt-8 text-center">
        <a
          href={currentView === 'home' ? '#pricing' : '/#pricing'}
          onClick={handleSecondaryClick}
          className="text-xs sm:text-sm text-slate-500 hover:text-slate-900 font-medium transition-colors cursor-pointer inline-flex items-center gap-1 group"
        >
          <span>{DFY_COPY.secondaryLink.text}</span>
        </a>
      </div>
    </section>
  );
}

export default DfyAgencySection;
