import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, AlertCircle, RefreshCw, Sparkles, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { DFY_TIERS, DFY_VOLUME_OPTIONS } from '../lib/dfyPlans';
import { submitDfyPilotLead } from '../lib/supabase';

const MODAL_SPRING = {
  type: 'spring',
  damping: 28,
  stiffness: 340,
  mass: 0.7,
};

/**
 * 50-Lead Free Pilot Capture Modal for DFY Agency Data Desk.
 * 
 * @param {{
 *   isOpen: boolean,
 *   initialTierId?: 'starter' | 'growth' | 'scale',
 *   onClose: () => void,
 * }} props
 */
export function PilotModal({ isOpen, initialTierId = 'growth', onClose }) {
  const [selectedTierId, setSelectedTierId] = useState(initialTierId);
  const [email, setEmail] = useState('');
  const [targetIcp, setTargetIcp] = useState('');
  const [volume, setVolume] = useState('2,500 leads/mo ($1,250)');
  const [notes, setNotes] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [ticketToken, setTicketToken] = useState('#GL-DFY-01');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDuplicate, setIsDuplicate] = useState(false);

  const [prevInitialTierId, setPrevInitialTierId] = useState(initialTierId);
  if (initialTierId !== prevInitialTierId) {
    setPrevInitialTierId(initialTierId);
    setSelectedTierId(initialTierId);
    const matched = DFY_TIERS.find((t) => t.id === initialTierId);
    if (matched) {
      setVolume(matched.volumeOption);
    }
  }

  const modalRef = useRef(null);
  const firstInputRef = useRef(null);
  const triggerElementRef = useRef(null);

  const handleClose = useCallback(() => {
    setIsSubmitting(false);
    setSubmitError(null);
    onClose();
    // Reset submission state after exit animation finishes
    setTimeout(() => {
      setIsSubmitted(false);
      setIsDuplicate(false);
      setEmail('');
      setTargetIcp('');
      setNotes('');
      setHoneypot('');
    }, 250);
  }, [onClose]);

  // Handle tier selection pill click
  const handleSelectTier = (tierId) => {
    setSelectedTierId(tierId);
    const matched = DFY_TIERS.find((t) => t.id === tierId);
    if (matched) {
      setVolume(matched.volumeOption);
    }
  };

  // Handle volume select change (keep tier in sync)
  const handleVolumeChange = (newVolume) => {
    setVolume(newVolume);
    const matched = DFY_TIERS.find((t) => t.volumeOption === newVolume);
    if (matched) {
      setSelectedTierId(matched.id);
    }
  };

  // Focus management and body scroll lock
  useEffect(() => {
    if (isOpen) {
      // Save previously focused element to return focus on close
      triggerElementRef.current = document.activeElement;

      // Body scroll lock
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';

      // Move focus into the modal
      const timer = setTimeout(() => {
        if (firstInputRef.current) {
          firstInputRef.current.focus();
        }
      }, 60);

      // ESC key handler
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          handleClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      return () => {
        document.body.style.overflow = originalOverflow;
        window.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
        if (triggerElementRef.current && typeof triggerElementRef.current.focus === 'function') {
          triggerElementRef.current.focus();
        }
      };
    }
  }, [isOpen, handleClose]);

  const triggerConfettiCelebration = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#2563EB', '#10B981', '#F59E0B', '#3B82F6'],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore fallback
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate email format
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@') || !cleanEmail.includes('.')) {
      setSubmitError('Please enter a valid work email address.');
      return;
    }

    if (!targetIcp.trim()) {
      setSubmitError('Please enter your target job titles and location.');
      return;
    }

    // Honeypot trap: if filled, bot detected. Pretend success without inserting.
    if (honeypot) {
      console.warn('[GhostLead DFY] Honeypot triggered. Suppressing insert.');
      setIsSubmitted(true);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const currentTierObj = DFY_TIERS.find((t) => t.id === selectedTierId) || DFY_TIERS[1];
    const currentTierLabel = `${currentTierObj.name} (${currentTierObj.priceFormatted}/mo)`;

    const result = await submitDfyPilotLead({
      email: cleanEmail,
      targetIcp: targetIcp.trim(),
      volume: volume,
      tier: currentTierLabel,
      notes: notes.trim(),
      sourcePath: typeof window !== 'undefined' ? window.location.pathname : '/agency',
    });

    setIsSubmitting(false);

    if (result.success) {
      const rand = Math.floor(10 + Math.random() * 89);
      setTicketToken(`#GL-DFY-${rand}`);
      setIsDuplicate(Boolean(result.isDuplicate));
      setIsSubmitted(true);
      triggerConfettiCelebration();
    } else {
      setSubmitError(result.error || 'Failed to submit pilot request.');
    }
  };

  const currentTierObj = DFY_TIERS.find((t) => t.id === selectedTierId) || DFY_TIERS[1];
  const currentTierLabel = `${currentTierObj.name} (${currentTierObj.priceFormatted}/mo)`;

  // Mailto fallback link prefilled with form content on error
  const mailtoSubject = encodeURIComponent(`50-Lead Free Pilot Request: ${currentTierLabel}`);
  const mailtoBody = encodeURIComponent(
    `Hello GhostLead Team,\n\nI would like to request the 50-Lead Free Pilot:\n\n` +
      `• Work Email: ${email.trim()}\n` +
      `• Target Titles & Location: ${targetIcp.trim()}\n` +
      `• Monthly Volume Needed: ${volume}\n` +
      `• Tier Interested In: ${currentTierLabel}\n` +
      `• Company / Notes: ${notes.trim() || 'N/A'}\n` +
      `• Requested From: ${typeof window !== 'undefined' ? window.location.href : 'GhostLead'}\n\n` +
      `Please prepare our custom 50-lead sample list within 24 hours.`
  );
  const mailtoUrl = `mailto:contact@ghostlead.co?subject=${mailtoSubject}&body=${mailtoBody}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden"
          role="dialog"
          aria-modal="true"
          aria-labelledby="pilot-modal-title"
        >
          {/* Backdrop Scrim */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={handleClose}
            className="absolute inset-0 bg-slate-950/45 backdrop-blur-md transform-gpu will-change-transform"
            aria-hidden="true"
          />

          {/* Dialog Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.98 }}
            transition={MODAL_SPRING}
            className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-t-[28px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] border border-slate-200/90 z-10 max-h-[92vh] overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transform-gpu will-change-transform text-slate-900"
          >
            {/* Mobile Drag Handle */}
            <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden flex-shrink-0" />

            {!isSubmitted ? (
              <>
                {/* Header Badge */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-slate-100 text-xs font-semibold mb-3 shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
                  <span>ZERO-RISK PILOT • 50 VERIFIED LEADS IN 24H</span>
                </div>

                {/* Header: Title + Close Button */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 id="pilot-modal-title" className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                      Claim Your 50-Lead Free Custom Pilot
                    </h3>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                      Test our live-SMTP data quality before spending a dollar. We’ll deliver 50 verified decision-makers + 1-line AI openers tailored to your exact ICP.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0 -mr-1 -mt-1"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Tier Selection Pills */}
                <div className="my-3.5">
                  <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Select Agency Target Tier:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {DFY_TIERS.map((tier) => {
                      const isCurrent = selectedTierId === tier.id;
                      return (
                        <button
                          key={tier.id}
                          type="button"
                          onClick={() => handleSelectTier(tier.id)}
                          className={`p-2 sm:p-2.5 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[82px] ${
                            isCurrent
                              ? 'border-2 border-blue-600 bg-blue-50/70 shadow-xs ring-1 ring-blue-500/20'
                              : 'border border-slate-200 bg-white hover:border-slate-300'
                          }`}
                        >
                          <div className="w-full">
                            {tier.popular ? (
                              <span className="text-[9px] font-bold text-blue-600 block leading-tight mb-0.5 uppercase tracking-wide">
                                Most Popular
                              </span>
                            ) : (
                              <span className="text-[9px] block leading-tight mb-0.5 invisible select-none">
                                &nbsp;
                              </span>
                            )}
                            <div className="text-xs font-semibold text-slate-900 truncate">
                              {tier.name.replace(' Data Engine', '').replace(' Outbound Fuel', '').replace(' Pipeline Partner', '')}
                            </div>
                          </div>
                          <div className="w-full mt-1">
                            <div className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                              {tier.priceFormatted}
                              <span className="text-[10px] text-slate-500 font-normal">/mo</span>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-3">
                  {/* Honeypot field (hidden from screen, filled by spam bots) */}
                  <div className="hidden" aria-hidden="true" style={{ display: 'none' }}>
                    <label htmlFor="hp_field">Leave this empty</label>
                    <input
                      id="hp_field"
                      type="text"
                      name="hp_field"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </div>

                  {submitError && (
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800 space-y-1.5">
                      <div className="flex items-center gap-2 font-semibold">
                        <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                        <span>Submission notice:</span>
                      </div>
                      <p>{submitError}</p>
                      <p className="pt-1 text-[11px] text-slate-600">
                        Prefer to bypass?{' '}
                        <a
                          href={mailtoUrl}
                          className="text-blue-600 hover:text-blue-700 underline font-semibold"
                        >
                          Email us directly at contact@ghostlead.co →
                        </a>
                      </p>
                    </div>
                  )}

                  {/* Field 1: Work Email */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Work Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      ref={firstInputRef}
                      type="email"
                      required
                      disabled={isSubmitting}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="founder@agency.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 placeholder:text-slate-400 transition-all disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>

                  {/* Field 2: Target Job Titles & Location */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Target Job Titles & Location <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      disabled={isSubmitting}
                      value={targetIcp}
                      onChange={(e) => setTargetIcp(e.target.value)}
                      placeholder="e.g., SaaS CEOs in USA, 10–50 employees"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 placeholder:text-slate-400 transition-all disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>

                  {/* Field 3: Monthly Lead Volume Needed (select) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Monthly Lead Volume Needed <span className="text-rose-500">*</span>
                    </label>
                    <select
                      value={volume}
                      disabled={isSubmitting}
                      onChange={(e) => handleVolumeChange(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 transition-all disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer"
                    >
                      {DFY_VOLUME_OPTIONS.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Field 4: Company Website / Notes (optional) */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                      Company Website / Notes <span className="text-slate-400 font-normal lowercase">(optional)</span>
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="https://youragency.com or tech stack requirements"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 placeholder:text-slate-400 transition-all disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold shadow-md shadow-blue-500/20 py-3 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm sm:text-base"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
                        <span>Submitting Pilot Request...</span>
                      </span>
                    ) : (
                      <span>Send My 50 Free Verified Leads</span>
                    )}
                  </button>
                </form>

                {/* Trust Notes Footer */}
                <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-2.5 text-[11px] text-slate-500 text-center">
                  <span className="flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                    Zero credit card required
                  </span>
                  <span>•</span>
                  <span>50 sample leads delivered in &lt;24h</span>
                </div>
              </>
            ) : (
              /* Success Confirmation Screen */
              <div className="relative text-center py-2 sm:py-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="absolute -top-1 -right-1 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3 border border-emerald-100">
                  <CheckCircle2 className="w-7 h-7" />
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 text-white text-xs font-semibold mb-2">
                  <span>Priority Queue {ticketToken}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                  Pilot Request Received — 50 verified leads will land in your inbox within 24 hours
                </h3>

                {isDuplicate ? (
                  <p className="mt-2 text-xs sm:text-sm text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl leading-relaxed max-w-sm mx-auto">
                    Note: This email already had an active pilot or waitlist inquiry. We refreshed your priority slot and queued your 50 sample leads.
                  </p>
                ) : (
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                    Our internal data desk is currently parsing live-SMTP signals for your criteria. Check your inbox for your sample CSV + custom AI hooks.
                  </p>
                )}

                {/* Submitted Lead Metadata Recap */}
                <div className="mt-4 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left text-slate-700 space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Target ICP:</span>
                    <span className="font-semibold text-slate-900 truncate max-w-[220px]">{targetIcp || 'Custom'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Selected Tier:</span>
                    <span className="font-semibold text-blue-600">{currentTierLabel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery Inbox:</span>
                    <span className="font-mono font-semibold text-slate-900 break-all">{email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Status:</span>
                    <span className="font-semibold text-emerald-600">Sample List Queued (Free)</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleClose}
                  className="mt-5 w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Done & Return to Site
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PilotModal;
