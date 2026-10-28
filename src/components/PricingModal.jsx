import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, ShieldCheck } from 'lucide-react';
import { Pricing } from './Pricing';
import { getPricingPlans } from '../lib/pricingPlans';

// 3D Spring-Bounce physics as requested: damping: 20, stiffness: 260
const SPRING_3D_BOUNCE = {
  type: 'spring',
  damping: 20,
  stiffness: 260,
  mass: 0.9,
};

/**
 * 3D Animated Spring-Bounce Pricing Modal.
 * 
 * @param {{
 *   isOpen: boolean,
 *   onClose: () => void,
 *   totalCount?: number,
 *   onSelectPlan: (tier: 'Starter' | 'Pro' | 'Agency') => void
 * }} props
 */
export function PricingModal({ isOpen, onClose, totalCount = 0, onSelectPlan }) {
  const plansData = getPricingPlans(totalCount);

  // Close on Escape key press and prevent body scroll when open
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, onClose]);

  const handlePlanSelect = (tierId) => {
    onClose();
    if (typeof onSelectPlan === 'function') {
      onSelectPlan(tierId);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          data-testid="pricing-modal-backdrop"
          onClick={onClose}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto"
        >
          {/* Modal Container with 3D Spring-Bounce Physics */}
          <motion.div
            data-testid="pricing-modal-container"
            initial={{ opacity: 0, scale: 0.85, y: 30, rotateX: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20, rotateX: 4, transition: { duration: 0.18 } }}
            transition={SPRING_3D_BOUNCE}
            style={{ transformPerspective: 1200 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-white/60 dark:border-indigo-500/30 p-5 sm:p-8 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_50px_-10px_rgba(99,102,241,0.25)] ring-1 ring-white/40 dark:ring-white/10 max-h-[92vh] overflow-y-auto transform-gpu will-change-transform text-slate-900 dark:text-slate-100"
          >
            {/* Soft Ambient Neon Glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-gradient-to-b from-indigo-500/25 via-violet-500/15 to-transparent blur-3xl rounded-full pointer-events-none" />

            {/* Sticky / Top-Right Close Button */}
            <button
              type="button"
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-slate-900 dark:hover:text-white p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors z-20 cursor-pointer shadow-2xs"
              aria-label="Close pricing modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Header */}
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-500/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold mb-3 shadow-[0_0_15px_rgba(99,102,241,0.25)]">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 animate-pulse" />
                <span>{plansData.activeWaveTag} • Non-Expiring Token Stack</span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                Lifetime Deal Access
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                One-time investment. Credits never expire. Select a tier to reserve your locked early-bird rate with zero upfront payment today.
              </p>
            </div>

            {/* Dynamic LTD Token Stack Pricing Cards */}
            <Pricing 
              totalCount={totalCount} 
              onSelectPlan={handlePlanSelect} 
            />

            {/* Bottom Trust Guarantee Footnote */}
            <div className="mt-8 pt-5 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-500 dark:text-slate-400 text-center">
              <span className="flex items-center gap-1.5 font-medium">
                <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>99.4% Primary Inbox Deliverability Guarantee</span>
              </span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span>🔒 Zero credit card required today</span>
              <span className="hidden sm:inline text-slate-300 dark:text-slate-700">•</span>
              <span>Private activation invite sent prior to launch</span>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default PricingModal;
