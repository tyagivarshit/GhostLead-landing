import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  Zap,
  Flame,
  Check,
  Lock,
  Download,
  X,
  AlertCircle,
  RefreshCw,
  Clock,
  Server,
  Globe,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { registerWaitlistUser, supabase } from './lib/supabase';
import { calculateWaveMetrics } from './lib/waveMetrics';
import { TopAnnouncementBar } from './components/TopAnnouncementBar';
import { WavesSection } from './components/WavesSection';
import { Pricing } from './components/Pricing';
import { getPricingPlans } from './lib/pricingPlans';
import { Navbar, GhostIcon } from './components/Navbar';
import { PricingPage } from './components/PricingPage';
import { LegalPolicyView } from './components/LegalPolicyView';
import { Footer } from './components/Footer';

export { WavesSection, Pricing, Navbar, PricingPage, LegalPolicyView, Footer, GhostIcon };

// 6-Hour Rolling Sandbox Window
const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const CHECKS_COUNT_KEY = 'ghostlead_sandbox_checks_count';
const LAST_RESET_KEY = 'ghostlead_sandbox_last_reset';

// Performance-optimized 60FPS cubic bezier easing & spring physics
const FAST_EASE = [0.16, 1, 0.3, 1];
const FAST_TRANSITION = { duration: 0.25, ease: FAST_EASE };
const MODAL_SPRING = { type: 'spring', stiffness: 280, damping: 26 };

// Chrome Browser Extension Icon
function ChromeIcon({ className = "w-6 h-6" }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2" />
      <path d="M21.17 8H12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M3.95 6.06L8.45 13.85" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M10.88 21.94L15.38 14.15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function App() {
  // Sandbox State
  const [domain, setDomain] = useState('automexiaai.in');
  // 6-Hour Rolling Reset Window State
  const [lastReset, setLastReset] = useState(() => {
    try {
      const now = Date.now();
      const savedReset = localStorage.getItem(LAST_RESET_KEY);
      if (savedReset !== null) {
        const parsed = parseInt(savedReset, 10);
        if (!isNaN(parsed) && parsed > 0) {
          if (now - parsed >= SIX_HOURS_MS) {
            localStorage.setItem(CHECKS_COUNT_KEY, '0');
            localStorage.setItem(LAST_RESET_KEY, now.toString());
            return now;
          }
          return parsed;
        }
      }
      const savedCount = localStorage.getItem(CHECKS_COUNT_KEY);
      if (savedCount !== null && parseInt(savedCount, 10) > 0) {
        localStorage.setItem(LAST_RESET_KEY, now.toString());
        return now;
      }
    } catch {
      // storage unavailable
    }
    return null;
  });

  const [checksCount, setChecksCount] = useState(() => {
    try {
      const now = Date.now();
      const savedReset = localStorage.getItem(LAST_RESET_KEY);
      if (savedReset !== null) {
        const parsedReset = parseInt(savedReset, 10);
        if (!isNaN(parsedReset) && parsedReset > 0) {
          if (now - parsedReset >= SIX_HOURS_MS) {
            return 0;
          }
        }
      }
      const saved = localStorage.getItem(CHECKS_COUNT_KEY);
      if (saved !== null) {
        const parsed = parseInt(saved, 10);
        if (!isNaN(parsed)) {
          return Math.max(0, Math.min(5, parsed));
        }
      }
    } catch {
      // storage unavailable
    }
    return 0;
  });

  const [currentTime, setCurrentTime] = useState(() => Date.now());

  // 6-Hour Rolling Window Live Timer & Automatic Expiration Unlock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      setCurrentTime(now);

      if (lastReset) {
        if (now - lastReset >= SIX_HOURS_MS) {
          setChecksCount(0);
          setLastReset(now);
          try {
            localStorage.setItem(CHECKS_COUNT_KEY, '0');
            localStorage.setItem(LAST_RESET_KEY, now.toString());
          } catch {
            // storage fallback
          }
        }
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [lastReset]);

  const isLimitReached = checksCount >= 5;
  const remainingMs = lastReset ? Math.max(0, SIX_HOURS_MS - (currentTime - lastReset)) : SIX_HOURS_MS;
  const remainingTotalSeconds = Math.floor(remainingMs / 1000);
  const countdownHours = Math.floor(remainingTotalSeconds / 3600);
  const countdownMinutes = Math.floor((remainingTotalSeconds % 3600) / 60);

  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyStep, setVerifyStep] = useState(0);
  const [verifyError, setVerifyError] = useState(null);
  const [verifyResult, setVerifyResult] = useState(null);

  // Live Waitlist Total Count from Supabase
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    let isMounted = true;

    async function fetchWaitlistCount() {
      try {
        if (!supabase) {
          if (isMounted) setTotalCount(0);
          return;
        }

        const { count, error } = await supabase
          .from('waitlist')
          .select('*', { count: 'exact', head: true });

        if (error) {
          console.error('[GhostLead] Waitlist count error:', error);
          if (isMounted) setTotalCount(0);
          return;
        }

        if (isMounted) {
          setTotalCount(typeof count === 'number' ? count : 0);
        }
      } catch (err) {
        console.error('[GhostLead] Failed to fetch waitlist count:', err);
        if (isMounted) setTotalCount(0);
      }
    }

    fetchWaitlistCount();

    return () => {
      isMounted = false;
    };
  }, []);

  const waveMetrics = calculateWaveMetrics(totalCount);
  const pricingPlans = getPricingPlans(totalCount);

  // Dedicated Routing View State ('home' | 'pricing' | 'legal')
  const getInitialView = () => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.toLowerCase();
      if (path === '/pricing' || path === '/pricing/' || window.location.hash === '#pricing') {
        return 'pricing';
      }
      if (path === '/legal' || path === '/legal/' || path === '/terms' || path === '/terms/' || path === '/privacy' || path === '/privacy/') {
        return 'legal';
      }
    }
    return 'home';
  };

  const [currentView, setCurrentView] = useState(getInitialView);

  // Synchronize browser history and popstate navigation
  useEffect(() => {
    const handlePopState = () => {
      if (typeof window !== 'undefined') {
        const path = window.location.pathname.toLowerCase();
        if (path === '/pricing' || path === '/pricing/') {
          setCurrentView('pricing');
        } else if (path === '/legal' || path === '/legal/' || path === '/terms' || path === '/terms/' || path === '/privacy' || path === '/privacy/') {
          setCurrentView('legal');
        } else {
          setCurrentView('home');
        }
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (view, hash = '') => {
    setCurrentView(view);

    let targetPath = '/';
    if (view === 'pricing') {
      targetPath = '/pricing';
    } else if (view === 'legal') {
      targetPath = hash === '#privacy' ? '/privacy' : '/terms';
    } else if (hash) {
      targetPath = `/${hash}`;
    }

    if (typeof window !== 'undefined') {
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view }, '', targetPath);
      } else if (hash) {
        window.history.replaceState({ view }, '', targetPath);
      }

      if (hash) {
        setTimeout(() => {
          const el = document.querySelector(hash);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          } else {
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        }, 60);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalHeadline, setModalHeadline] = useState("Lock Your Wave 1 Early-Bird Slot");
  const [isLimitGateModal, setIsLimitGateModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Pro');
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [reservationToken, setReservationToken] = useState('#GL-W1-024');

  // Isolated 60FPS Confetti
  const triggerConfettiCelebration = () => {
    try {
      confetti({
        particleCount: 65,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#4F46E5', '#10B981', '#F59E0B', '#6366F1', '#EC4899'],
        disableForReducedMotion: true,
        ticks: 180,
        scalar: 0.95,
      });
    } catch {
      // fallback
    }
  };

  const openLimitGateModal = () => {
    setSelectedTier('Pro');
    setIsLimitGateModal(true);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setIsDuplicate(false);
    setIsModalOpen(true);
  };

  const openModal = (tier = 'Pro', customHeadline = null) => {
    setSelectedTier(tier);
    const defaultHeadline = waveMetrics.isClosed
      ? "Join Public Launch Waitlist"
      : `Lock Your ${waveMetrics.waveName} Early-Bird Slot`;
    setModalHeadline(customHeadline || defaultHeadline);
    setIsLimitGateModal(false);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setIsDuplicate(false);
    setIsModalOpen(true);
  };

  const setIsWaitlistOpen = (open) => {
    if (open) {
      openModal('Pro', waveMetrics.isClosed ? 'Join Public Launch Waitlist' : `Claim ${waveMetrics.waveName} Extension Access`);
    } else {
      setIsModalOpen(false);
    }
  };

  const sanitizeDomainInput = (raw) => {
    if (!raw || typeof raw !== 'string') return '';
    let clean = raw.trim().toLowerCase();
    clean = clean.replace(/^https?:\/\//i, '');
    clean = clean.replace(/^www\./i, '');
    if (clean.includes('@')) {
      clean = clean.split('@')[1];
    }
    clean = clean.split('/')[0].split('?')[0].split('#')[0].split(':')[0].trim();
    return clean;
  };

  const handleDemoVerify = async (e, verifyDomain = null, verifyName = null) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (checksCount >= 5) {
      openLimitGateModal();
      return;
    }

    const domainInput = (verifyDomain !== null ? verifyDomain : domain) || '';
    const nameFallback = (verifyName !== null ? verifyName : '') || '';

    let cleanDomain = sanitizeDomainInput(domainInput);
    if (!cleanDomain && nameFallback) {
      cleanDomain = sanitizeDomainInput(nameFallback);
    }

    if (!cleanDomain) {
      setVerifyError('Please provide a valid domain name.');
      return;
    }

    setVerifyError(null);
    setIsVerifying(true);
    setVerifyStep(1);
    setVerifyResult(null);

    const stepTimer1 = setTimeout(() => setVerifyStep(2), 350);
    const stepTimer2 = setTimeout(() => setVerifyStep(3), 700);

    const startTime = performance.now();

    let res = null;
    let data = null;
    let networkError = false;

    try {
      const endpoint = import.meta.env.VITE_BACKEND_URL
        ? `${import.meta.env.VITE_BACKEND_URL}/api/public/check-domain`
        : 'https://ghostlead.automexiaai.in/api/public/check-domain';

      res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          domain: cleanDomain,
        }),
      });
      data = await res.json().catch(() => null);
    } catch {
      networkError = true;
    }

    const elapsed = performance.now() - startTime;
    const minAnimationRemaining = Math.max(0, 850 - elapsed);
    if (minAnimationRemaining > 0) {
      await new Promise((resolve) => setTimeout(resolve, minAnimationRemaining));
    }

    clearTimeout(stepTimer1);
    clearTimeout(stepTimer2);
    setIsVerifying(false);
    setVerifyStep(0);

    if (networkError) {
      setVerifyResult(null);
      setVerifyError('Could not reach the verification service.');
      return;
    }

    if (!res || !res.ok || !data || !data.ok) {
      setVerifyResult(null);
      const errorCode = data?.error;
      const serverMessage = data?.message;

      if (res?.status === 400 || errorCode === 'invalid_domain') {
        setVerifyError(serverMessage || 'Please provide a valid domain name.');
      } else {
        setVerifyError(serverMessage || 'Could not reach the verification service.');
      }
      return;
    }

    const newCount = Math.min(5, checksCount + 1);
    setChecksCount(newCount);

    // First Check Initialization: If no timestamp exists, set last_reset = Date.now()
    let activeReset = lastReset;
    if (!activeReset) {
      activeReset = Date.now();
      setLastReset(activeReset);
      try {
        localStorage.setItem(LAST_RESET_KEY, activeReset.toString());
      } catch {
        // storage fallback
      }
    }

    try {
      localStorage.setItem(CHECKS_COUNT_KEY, newCount.toString());
    } catch {
      // storage fallback
    }

    setVerifyResult(data);

    // Automatic Gate Trigger on 5th Completion: Exactly 800ms after the 5th result appears
    if (newCount >= 5) {
      setTimeout(() => {
        openLimitGateModal();
        triggerConfettiCelebration();
      }, 800);
    }
  };

  const handlePresetSelect = (domainOrName, domainVal = null) => {
    const selectedDomain = domainVal || domainOrName;
    setDomain(selectedDomain);
    setVerifyError(null);
    handleDemoVerify(null, selectedDomain);
  };

  const handlePreRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await registerWaitlistUser(emailInput, selectedTier);

    setIsSubmitting(false);

    if (result.success) {
      setTotalCount((prev) => prev + 1);
      const randomTokenNum = Math.floor(10 + Math.random() * 80);
      const waveTag = waveMetrics.isClosed ? 'WL' : (waveMetrics.waveName || 'W1').replace(/\s+/g, '');
      setReservationToken(`#GL-${waveTag}-0${randomTokenNum}`);
      setIsDuplicate(Boolean(result.isDuplicate));
      setIsSubmitted(true);
      triggerConfettiCelebration();
    } else {
      setSubmitError(result.error || 'Failed to reserve your slot. Please try again.');
    }
  };

  const cleanDomainDisplay = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0].trim() || 'domain.com';

  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#FAFAFC] text-slate-900 font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 relative">
      
      {/* Soft Ambient Light Glow (GPU accelerated, zero re-rasterization) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[450px] pointer-events-none -z-10 overflow-hidden flex justify-center transform-gpu will-change-transform">
        <div className="w-[750px] h-[320px] bg-gradient-to-b from-indigo-100/35 via-violet-50/15 to-transparent blur-[90px] rounded-full" />
      </div>

      {/* ========================================================= */}
      {/* 1. FLOATING 3D GLASSMORPHIC NAVBAR                        */}
      {/* ========================================================= */}
      <Navbar 
        waveMetrics={waveMetrics} 
        currentView={currentView}
        onNavigate={navigateTo}
        onOpenModal={openModal} 
      />

      {/* Main Content Flow with Adequate Top Padding Fix (pt-24 sm:pt-28 lg:pt-32) */}
      <main className={currentView === 'legal' ? '' : 'pt-24 sm:pt-28 lg:pt-32'}>
        <AnimatePresence mode="wait">
          {currentView === 'legal' ? (
            <motion.div
              key="legal-page"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: FAST_EASE }}
              className="w-full"
            >
              <LegalPolicyView />
            </motion.div>
          ) : currentView === 'pricing' ? (
            <motion.div
              key="pricing-page"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: FAST_EASE }}
              className="w-full"
            >
              <PricingPage
                totalCount={totalCount}
                waveMetrics={waveMetrics}
                onSelectPlan={openModal}
                onNavigateHome={(hash) => navigateTo('home', hash)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="home-page"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.22, ease: FAST_EASE }}
              className="w-full"
            >
              {/* ========================================================= */}
              {/* 2. TOP SCARCITY BAR (COMPACT)                             */}
              {/* ========================================================= */}
              <TopAnnouncementBar 
                waveMetrics={waveMetrics} 
                onOpenModal={openModal} 
              />

        {/* ========================================================= */}
        {/* 3. HERO SECTION (TIGHTENED FOLD, HUMAN HIGH-TRUST COPY)   */}
        {/* ========================================================= */}
        <section className="pt-6 pb-6 sm:pt-8 sm:pb-8 max-w-4xl mx-auto text-center px-4 transform-gpu will-change-transform">
        
        {/* H1 Main Title & Human Sub-headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={FAST_TRANSITION}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]"
        >
          Stop sending cold emails to dead mailboxes.
          <span className="block mt-1.5 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">
            Find active founder emails with business domain verification preview.
          </span>
        </motion.h1>

        {/* Value Explanation (Human & Direct, max 2 lines) */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...FAST_TRANSITION, delay: 0.05 }}
          className="mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal"
        >
          Browse leads on LinkedIn, ping their mail server in real time, and guarantee your outbound emails actually land in the primary inbox.
        </motion.p>

        {/* ========================================================= */}
        {/* 4. INTERACTIVE SANDBOX WIDGET (IMMEDIATELY BELOW WITH MT-6) */}
        {/* ========================================================= */}
        <div id="sandbox" className="mt-6 text-left scroll-mt-24 sm:scroll-mt-28">
          <div className="transform-gpu will-change-transform bg-slate-950 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Subtle Ambient Console Lighting */}
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Console Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Mail Server Health Inspector
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Inspect any business domain&apos;s mail infrastructure.
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Live DNS &amp; MX verification. Test your own domain or target company below.
                </p>
              </div>

              {/* Checks Used Pill */}
              <div className="self-start sm:self-center flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
                <span className="text-slate-400">UI Demo Checks:</span>
                <span className={`font-extrabold px-2 py-0.5 rounded text-xs ${
                  isLimitReached ? 'bg-rose-500 text-white' : 'bg-indigo-600 text-white'
                }`}>
                  {isLimitReached ? '5 / 5 (Limit Reached)' : `${checksCount} / 5`}
                </span>
              </div>
            </div>

            {/* 1-Click Test Chips */}
            <div className="pt-3.5 flex items-center gap-2 text-xs relative z-10">
              <span className="text-slate-400 font-medium flex-shrink-0">Quick Presets:</span>
              <div className="flex overflow-x-auto no-scrollbar py-0.5 gap-2 items-center w-full touch-pan-x">
                <button
                  type="button"
                  onClick={() => handlePresetSelect('automexiaai.in')}
                  disabled={isLimitReached || isVerifying}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium transition-colors disabled:opacity-40 flex-shrink-0 cursor-pointer text-xs"
                >
                  automexiaai.in
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('stripe.com')}
                  disabled={isLimitReached || isVerifying}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium transition-colors disabled:opacity-40 flex-shrink-0 cursor-pointer text-xs"
                >
                  stripe.com
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('airbnb.com')}
                  disabled={isLimitReached || isVerifying}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white font-medium transition-colors disabled:opacity-40 flex-shrink-0 cursor-pointer text-xs"
                >
                  airbnb.com
                </button>
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleDemoVerify} className="mt-3.5 flex flex-col sm:flex-row gap-2.5 sm:gap-3 relative z-10">
              <div className="flex-1 min-w-0">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Company Domain
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input 
                    type="text" 
                    placeholder="e.g. stripe.com or automexiaai.in"
                    value={domain}
                    onChange={(e) => {
                      setDomain(e.target.value);
                      if (verifyError) setVerifyError(null);
                    }}
                    disabled={isLimitReached || isVerifying}
                    required
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:bg-slate-900/50 disabled:cursor-not-allowed font-mono"
                  />
                </div>
              </div>

              <div className="sm:self-end w-full sm:w-auto flex-shrink-0">
                <button 
                  type="submit"
                  disabled={isVerifying}
                  className="transform-gpu will-change-transform w-full sm:w-auto h-[42px] sm:h-[46px] bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm rounded-xl px-5 sm:px-6 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer active:scale-98 whitespace-nowrap"
                >
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
                      <span>Inspecting DNS...</span>
                    </span>
                  ) : isLimitReached ? (
                    <>
                      <Lock className="w-4 h-4 text-amber-300 flex-shrink-0" />
                      <span>Unlock Unlimited Checks</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-amber-300 text-amber-300 flex-shrink-0" />
                      <span>Inspect Mail Server</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Live Countdown on Limit Reached */}
            {isLimitReached && (
              <div className="transform-gpu will-change-transform mt-3 p-2.5 sm:p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300 flex items-center justify-center flex-wrap gap-x-2 gap-y-1 relative z-10 text-center shadow-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0 animate-pulse" />
                  <span>
                    UI demo checks refresh in <strong className="text-white font-semibold">{countdownHours}h {countdownMinutes}m</strong>
                  </span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <button
                  type="button"
                  onClick={openLimitGateModal}
                  className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer hover:underline inline-flex items-center gap-0.5"
                >
                  Need unlimited? {waveMetrics.isClosed ? 'Join Launch Waitlist' : `Claim ${waveMetrics.waveName} Slot`} →
                </button>
              </div>
            )}

            {/* Stable-Height Container: Prevents Reflow / Jitter */}
            <div className="mt-4 min-h-[210px] flex flex-col justify-center relative z-10">
              <AnimatePresence mode="wait">
                
                {/* Stage A: 3-Stage Live Radar Pipeline Animation */}
                {isVerifying && (
                  <motion.div 
                    key="live-pipeline"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={FAST_TRANSITION}
                    className="transform-gpu will-change-transform space-y-2 p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800"
                  >
                    <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      <span>DNS &amp; MX Inspection Radar</span>
                      <span className="text-indigo-400 animate-pulse">Inspecting mail infrastructure...</span>
                    </div>

                    {/* Stage 1 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      verifyStep >= 1 ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base flex-shrink-0">🔍</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-xs">Step 1: Domain Format &amp; Hostname Validation</div>
                          <div className="text-[11px] text-slate-400 truncate">
                            Validating format for {cleanDomainDisplay}
                          </div>
                        </div>
                      </div>
                      {verifyStep >= 1 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider flex-shrink-0">Pending</span>
                      )}
                    </div>

                    {/* Stage 2 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      verifyStep >= 2 ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base flex-shrink-0">⚙️</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-xs">Step 2: DNS &amp; MX Server Resolution</div>
                          <div className="text-[11px] text-slate-400 truncate">
                            Querying exchange servers for {cleanDomainDisplay}
                          </div>
                        </div>
                      </div>
                      {verifyStep >= 2 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" /> Resolved
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider flex-shrink-0">
                          {verifyStep === 1 ? 'Querying...' : 'Waiting'}
                        </span>
                      )}
                    </div>

                    {/* Stage 3 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      verifyStep >= 3 ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base flex-shrink-0">🛡️</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-xs">Step 3: SPF &amp; Provider Identification</div>
                          <div className="text-[11px] text-slate-400 truncate">
                            Inspecting mail security records
                          </div>
                        </div>
                      </div>
                      {verifyStep >= 3 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" /> Complete
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider flex-shrink-0">
                          {verifyStep === 2 ? 'Analyzing...' : 'Waiting'}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Stage B: Live DNS Health Inspection Result Card */}
                {!isVerifying && verifyResult && verifyResult.ok && (
                  <motion.div 
                    key="result-card"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={FAST_TRANSITION}
                    className="transform-gpu will-change-transform p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-xl flex flex-col gap-4 text-left"
                  >
                    {/* Domain & Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-slate-800/80">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 flex-shrink-0">
                          <Globe className="w-4 h-4 text-indigo-400" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Target Domain</span>
                          <span className="font-mono font-bold text-white text-base sm:text-lg truncate block">
                            {verifyResult.domain}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        {verifyResult.hasMx ? (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 shadow-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Active Mail Server
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/80 border border-amber-500/30 text-amber-400 shadow-xs">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
                            No MX Found
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Inspection Grid (3 columns on md+, responsive) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {/* 1. Primary Mail Provider */}
                      <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          <Server className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                          <span>Primary Mail Provider</span>
                        </div>
                        <div className="text-sm font-semibold text-white tracking-tight">
                          {verifyResult.provider || 'None'}
                        </div>
                      </div>

                      {/* 2. Primary MX Host */}
                      <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          <span>Primary MX Host</span>
                          <span className="text-[10px] font-medium text-slate-400 bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                            ({verifyResult.mxCount ?? 0} exchange servers)
                          </span>
                        </div>
                        <div className="font-mono text-xs text-slate-200 truncate" title={verifyResult.primaryMx || 'None'}>
                          {verifyResult.primaryMx || 'None'}
                        </div>
                      </div>

                      {/* 3. SPF Protection */}
                      <div className="p-3 sm:p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col justify-between sm:col-span-2 md:col-span-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-indigo-400 flex-shrink-0" />
                          <span>SPF Protection</span>
                        </div>
                        <div>
                          {verifyResult.hasSpf ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                              <Check className="w-3.5 h-3.5 flex-shrink-0" />
                              SPF Record Configured (v=spf1)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-850 border border-slate-700 text-slate-400">
                              <X className="w-3.5 h-3.5 flex-shrink-0" />
                              No SPF Detected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Extension Trust Callout Banner */}
                    <div className="mt-2 pt-3.5 border-t border-slate-800/80 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-950/40 -mx-4 sm:-mx-5 -mb-4 sm:-mb-5 p-4 sm:p-5 rounded-b-2xl">
                      <div className="flex items-start gap-2.5 max-w-xl text-xs text-slate-300 leading-relaxed">
                        <ChromeIcon className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                        <p>
                          <strong className="text-white font-medium">Domain configuration verified live.</strong> Want to ping individual executive inboxes on this server with zero bounce? Individual mailbox SMTP handshakes run natively inside the GhostLead Chrome Extension.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsWaitlistOpen(true)}
                        className="w-full md:w-auto flex-shrink-0 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-indigo-600/25 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap"
                      >
                        <span>{waveMetrics.isClosed ? 'Join Extension Waitlist' : `Claim ${waveMetrics.waveName} Extension Access`}</span>
                        <ArrowRight className="w-3.5 h-3.5 flex-shrink-0" />
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Idle Preview Prompt */}
                {!isVerifying && !verifyResult && !verifyError && (
                  <div className="text-center py-6 text-slate-500 text-xs">
                    Enter any business domain above to inspect its live DNS, MX records, and mail infrastructure.
                  </div>
                )}

                {/* Stage C: Graceful Verification Error State */}
                {!isVerifying && !verifyResult && verifyError && (
                  <motion.div 
                    key="error-card"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={FAST_TRANSITION}
                    className="transform-gpu will-change-transform p-4 sm:p-5 rounded-2xl bg-slate-900 border border-rose-500/30 shadow-md flex items-center justify-between gap-3 text-rose-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center flex-shrink-0 text-rose-400">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                          Inspection Notice
                        </div>
                        <div className="text-sm text-slate-300 mt-0.5">
                          {verifyError}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVerifyError(null)}
                      className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer flex-shrink-0"
                      title="Dismiss"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                )}

              </AnimatePresence>
            </div>

            {/* Subtle Locked Indicator when Limit Reached */}
            {isLimitReached && (
              <div className="transform-gpu will-change-transform mt-4 p-3.5 rounded-2xl bg-amber-950/60 border border-amber-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-200 relative z-10">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>
                    UI demo limit reached. Claim your Lifetime Deal to unlock unlimited checks.
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={openLimitGateModal}
                  className="w-full sm:w-auto flex-shrink-0 font-bold px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow-sm text-xs transition-all active:scale-95 cursor-pointer"
                >
                  {waveMetrics.isClosed ? 'Join Waitlist →' : `Claim ${waveMetrics.waveName} Deal →`}
                </button>
              </div>
            )}

          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 4.5 SCARCITY WAVES TRACKER                                */}
      {/* ========================================================= */}
      <section className="py-14 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-2.5 border border-amber-200/70">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Strict Scarcity Wave Release
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight">
            Lifetime Wave Progression
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600">
            Strictly capped to the first 150 accounts across 3 waves before shifting to monthly SaaS.
          </p>
        </div>
        <WavesSection totalCount={totalCount} />
      </section>

      {/* ========================================================= */}
      {/* 5. FEATURES BENTO GRID (SPACIOUS 3-CARD ROW)              */}
      {/* ========================================================= */}
      <section id="features" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 sm:scroll-mt-28">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold mb-3 border border-indigo-200/70">
            <Sparkles className="w-3.5 h-3.5" />
            Built for Modern Outbound
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-950 leading-tight">
            Engineered for Zero-Bounce Executive Prospecting
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600">
            Everything your sales team and agency need to land directly in primary inboxes without risking domain blacklists.
          </p>
        </div>

        {/* 3 Spacious Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          
          {/* Card 1: One-Click Extension Capture */}
          <div className="transform-gpu will-change-transform bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 mb-5 shadow-xs">
                <ChromeIcon className="w-5 h-5 text-indigo-600" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-1">
                LinkedIn Native
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                One-Click Extension Capture
              </h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Target any decision-maker on LinkedIn and instantly grab their verified active address without switching tabs. Reveal direct emails directly beside their profile in real time.
              </p>
            </div>

            <div className="mt-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span className="font-semibold text-slate-800">LinkedIn Profile Widget</span>
                </div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100/60 px-2 py-0.5 rounded">
                  1-Click
                </span>
              </div>
              <div className="mt-2.5 flex items-center justify-between">
                <span className="font-mono text-slate-600">brian@airbnb.com</span>
                <span className="font-bold text-emerald-600 flex items-center gap-1 text-[11px]">
                  <CheckCircle2 className="w-3.5 h-3.5" /> 99.8% Safe
                </span>
              </div>
            </div>
          </div>

          {/* Card 2: Zero-Bounce Protection */}
          <div className="transform-gpu will-change-transform bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 mb-5 shadow-xs">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                Domain Health
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                Zero-Bounce Protection
              </h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Every address undergoes direct real-time mailbox validation before you add it to your campaigns. Say goodbye to 20-30% bounce rates from stale databases and keep your sender score flawless.
              </p>
            </div>

            <div className="mt-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <span className="font-semibold text-slate-800">Deliverability Comparison</span>
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  99% vs 76%
                </span>
              </div>
              <div className="mt-2.5 space-y-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-slate-500">GhostLead Bounces</span>
                  <span className="font-bold text-emerald-600">&lt; 0.6%</span>
                </div>
                <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full w-[99.4%]" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Direct CSV & CRM Export */}
          <div className="transform-gpu will-change-transform bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between">
            <div>
              <div className="w-11 h-11 rounded-2xl bg-violet-50 border border-violet-100 flex items-center justify-center text-violet-600 mb-5 shadow-xs">
                <Download className="w-5 h-5 text-violet-600" />
              </div>
              <div className="text-xs font-bold uppercase tracking-wider text-violet-600 mb-1">
                Seamless Export
              </div>
              <h3 className="text-xl font-bold text-slate-950">
                Direct CSV & CRM Export
              </h3>
              <p className="mt-2.5 text-sm text-slate-600 leading-relaxed">
                Export high-confidence lead files ready to plug straight into Instantly, Smartlead, HubSpot, or your cold outreach sequencer with zero manual cleanups or column rearranging.
              </p>
            </div>

            <div className="mt-6 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200/80">
                <span className="font-semibold text-slate-800">1-Click Integration Formats</span>
                <span className="text-[10px] font-bold text-violet-700 bg-violet-100 px-2 py-0.5 rounded">
                  Instant
                </span>
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono text-[10px] font-bold text-slate-700">
                  Instantly.ai
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono text-[10px] font-bold text-slate-700">
                  Smartlead
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 font-mono text-[10px] font-bold text-slate-700">
                  Clean CSV
                </span>
              </div>
            </div>
          </div>

        </div>
      </section>

        {/* ========================================================= */}
        {/* 6. LIFETIME DEAL (LTD) SUMMARY BANNER                     */}
        {/* ========================================================= */}
        <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-slate-200/60">
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-8 sm:p-12 text-white shadow-xl relative overflow-hidden">
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-300 text-xs font-bold mb-4 border border-white/10 backdrop-blur-md">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                Strict Scarcity Wave Release
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
                Lifetime Deal Token Stack
              </h2>
              <p className="mt-3 text-sm sm:text-base text-slate-300">
                Pay once, verify forever with non-expiring credits. Starter $69, Pro $149, Agency $299 with automatic wave escalations before public SaaS launch.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={() => navigateTo('pricing')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-sm bg-white text-slate-950 hover:bg-slate-100 shadow-lg shadow-white/10 transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-98"
                >
                  <span>View Dedicated Pricing & Waves</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => openModal('Pro')}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full font-bold text-sm bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer active:scale-98"
                >
                  <span>Claim Wave 1 Slot Now</span>
                </button>
              </div>
            </div>
          </div>
        </section>

      </motion.div>
    )}
  </AnimatePresence>
</main>

      {/* ========================================================= */}
      {/* 7. FOOTER                                                 */}
      {/* ========================================================= */}
      <Footer waveMetrics={waveMetrics} onNavigate={navigateTo} />

      {/* ========================================================= */}
      {/* 8. PRE-REGISTRATION MODAL (60FPS FAST ACCELERATION)        */}
      {/* ========================================================= */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 overflow-hidden">
            
            {/* Scrim Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/70 transform-gpu will-change-transform"
            />

            {/* Dialog Container */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={MODAL_SPRING}
              className="relative w-full max-w-lg bg-white rounded-t-3xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200/90 z-10 max-h-[90vh] overflow-y-auto transform-gpu will-change-transform"
            >
              {/* Drag Handle on Mobile */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden flex-shrink-0" />

              {/* Close Button */}
              <button 
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-2 rounded-full hover:bg-slate-100 transition-colors z-20 cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              {!isSubmitted ? (
                <>
                  {isLimitGateModal && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 text-xs font-bold mb-3 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>⚡ UI Demo Limit Reached (5/5)</span>
                    </div>
                  )}

                  <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mb-4 shadow-xs">
                    <Lock className="w-6 h-6 text-indigo-600" />
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-950 tracking-tight leading-snug pr-6">
                    {isLimitGateModal
                      ? "You've experienced real-time verification speed."
                      : modalHeadline}
                  </h3>
                  
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {isLimitGateModal
                      ? `Lock your ${waveMetrics.isClosed ? 'standard launch waitlist rate' : `${waveMetrics.waveName} early-bird lifetime rate`} today before slots close to get unlimited verification.`
                      : waveMetrics.isClosed
                        ? waveMetrics.soldOutMessage
                        : `Reserve your ${waveMetrics.waveName} early-bird rate before this tier locks. Zero upfront payment today.`}
                  </p>

                  {/* Plan Selection Pills */}
                  <div className="mt-5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-2">
                      Selected Tier:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Starter', 'Pro', 'Agency']).map((tierKey) => {
                        const plan = pricingPlans[tierKey];
                        const isCurrent = selectedTier === tierKey;
                        return (
                          <button
                            key={tierKey}
                            type="button"
                            onClick={() => setSelectedTier(tierKey)}
                            className={`p-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                              isCurrent
                                ? 'bg-indigo-50 border-indigo-600 text-indigo-900 ring-2 ring-indigo-500/20 shadow-xs'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <div className="text-xs font-bold">{plan.badge || plan.name}</div>
                            <div className="text-sm font-extrabold text-slate-950 mt-0.5">${plan.price}{pricingPlans.isClosed ? '/mo' : ''}</div>
                            <div className="text-[10px] text-slate-500 truncate">{pricingPlans.activeWaveTag}</div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handlePreRegisterSubmit} className="mt-5 space-y-4">
                    {submitError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                        Work Email Address
                      </label>
                      <input 
                        type="email" 
                        required
                        disabled={isSubmitting}
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="founder@company.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:border-indigo-600 focus:ring-4 focus:ring-indigo-500/10 text-sm text-slate-900 placeholder-slate-400 transition-all disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="transform-gpu will-change-transform w-full min-h-[46px] py-3 px-4 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
                          <span>Securing Your Slot...</span>
                        </span>
                      ) : waveMetrics.isClosed ? (
                        <>
                          <span>Join Launch Waitlist</span>
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
                        </>
                      ) : (
                        <>
                          <span>Claim {waveMetrics.waveName} Slot (${pricingPlans[selectedTier].price})</span>
                          <ArrowRight className="w-4 h-4 flex-shrink-0" />
                        </>
                      )}
                    </button>
                  </form>

                  {/* Trust Notes */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-400 text-center">
                    <span className="flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                      Zero credit card charged today
                    </span>
                    <span>•</span>
                    <span>Private invite sent before public drop</span>
                  </div>
                </>
              ) : (
                /* Instant Confirmation Screen */
                <div className="text-center py-4">
                  <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4 shadow-xs">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold mb-2 border border-emerald-200">
                    Reservation Token {reservationToken}
                  </div>

                  <h3 className="text-2xl font-extrabold text-slate-950 tracking-tight">
                    {isDuplicate ? "Slot Already Secured!" : "Slot Reserved!"}
                  </h3>
                  
                  {isDuplicate ? (
                    <p className="mt-2 text-xs sm:text-sm text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl leading-relaxed max-w-sm mx-auto">
                      Good news! This email is already on the {waveMetrics.isClosed ? 'standard launch' : `${waveMetrics.waveName} early-bird`} waitlist. We have verified your spot and refreshed your priority token.
                    </p>
                  ) : (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                      We will notify you 2 hours prior to public launch to lock your {waveMetrics.isClosed ? 'launch spot' : 'early-bird rate'}.
                    </p>
                  )}

                  <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left text-slate-700 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Selected Tier:</span>
                      <span className="font-bold text-indigo-700">{selectedTier} (${pricingPlans[selectedTier].price} {pricingPlans.isClosed ? 'Monthly' : 'Lifetime'})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Email:</span>
                      <span className="font-mono font-semibold text-slate-950 break-all">{emailInput}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{waveMetrics.isClosed ? 'Waitlist Status:' : `${waveMetrics.waveName} Discount:`}</span>
                      <span className="font-bold text-emerald-600">{waveMetrics.isClosed ? 'Standard Waitlist Confirmed' : 'Locked In'}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
                    className="transform-gpu will-change-transform mt-6 w-full py-3.5 px-4 bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm rounded-xl transition-all shadow-sm cursor-pointer active:scale-98"
                  >
                    Done & Return to Site
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
