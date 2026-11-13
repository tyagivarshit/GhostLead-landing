import { motion } from 'framer-motion';
import { ShieldCheck, Check, Sparkles, Mail, Zap, RefreshCw } from 'lucide-react';
import { DfyAgencySection } from './DfyAgencySection';
import { DFY_PROOF_POINTS } from '../lib/dfyPlans';

/**
 * Dedicated /agency Page View.
 * Renders the DFY Agency section, pilot promise strip, and existing deliverability proof claims.
 * Does NOT render the $79/$139/$269 LTD pricing cards or Waves.
 * 
 * @param {{
 *   onOpenPilotModal: (tierId?: 'starter' | 'growth' | 'scale') => void,
 *   onNavigate: (view: string, hash?: string) => void,
 * }} props
 */
export function AgencyPage({ onOpenPilotModal, onNavigate }) {
  return (
    <div className="w-full max-w-full text-[#1d1d1f]">
      {/* Hero Header for Standalone /agency view */}
      <section className="pt-4 pb-4 sm:pt-6 sm:pb-6 max-w-4xl mx-auto text-center px-4">
        {/* Scarcity Pill */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-200 text-xs font-semibold mb-5 shadow-xs"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>WHITE-GLOVE DATA INFRASTRUCTURE FOR AGENCIES</span>
        </motion.div>

        {/* Primary Page Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12]"
        >
          Done-For-You Data Desk.
          <span className="block mt-1 sm:mt-2 text-slate-600 font-semibold text-2xl sm:text-3xl lg:text-4xl">
            We scrape, live-verify & personalize your outbound lists.
          </span>
        </motion.h1>

        {/* Sub-headline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.1 }}
          className="mt-4 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed"
        >
          Skip the tools, VAs, and burned outreach domains. Our internal data team delivers bespoke, &lt;1% bounce decision-maker lists + AI icebreakers straight to your CRM every Monday.
        </motion.p>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, delay: 0.15 }}
          className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium"
        >
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            &lt;1% Hard Bounce SLA
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            0 Catch-Alls Charged
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            2-for-1 Bounce Credit Guarantee
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            Weekly Monday Drops
          </span>
        </motion.div>
      </section>

      {/* Main DFY Agency Section (Cards + Pillars + Pilot Strip + Secondary Link) */}
      <DfyAgencySection
        currentView="agency"
        onOpenPilotModal={onOpenPilotModal}
        onNavigate={onNavigate}
      />

      {/* Deliverability & Proof Block (Built strictly from claims already on the site) */}
      <section className="mx-auto max-w-6xl px-4 sm:px-6 py-12 sm:py-16">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold mb-2">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
            <span>BUILT-IN DATA INTEGRITY STANDARDS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Why Top B2B Agencies Rely On Our Engine
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Backed by the exact same multi-signal verification infrastructure powering GhostLead.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DFY_PROOF_POINTS.map((proof, idx) => (
            <div
              key={proof.title}
              className="rounded-2xl p-6 bg-white/90 backdrop-blur border border-black/[0.06] shadow-xs flex flex-col justify-start"
            >
              <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-200/70 text-blue-600 flex items-center justify-center mb-4 shrink-0">
                {idx === 0 ? (
                  <Mail className="w-5 h-5" />
                ) : idx === 1 ? (
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                ) : idx === 2 ? (
                  <RefreshCw className="w-5 h-5 text-amber-600" />
                ) : (
                  <Zap className="w-5 h-5 text-indigo-600" />
                )}
              </div>
              <h3 className="text-sm sm:text-base font-bold text-slate-900 mb-1.5">
                {proof.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {proof.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Spacing wrapper before footer */}
      <div className="pt-8 pb-12" />
    </div>
  );
}

export default AgencyPage;
