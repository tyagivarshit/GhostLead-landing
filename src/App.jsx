import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Zap,
  Check,
  Lock,
  ChevronDown,
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
import WaveBadge from './components/WaveBadge';
import { Pricing } from './components/Pricing';
import { getPricingPlans } from './lib/pricingPlans';
import { Navbar, GhostIcon } from './components/Navbar';
import { PricingPage } from './components/PricingPage';
import { LegalPolicyView } from './components/LegalPolicyView';
import { Footer } from './components/Footer';
import Comparison from './components/Comparison';
import LtdBanner from './components/LtdBanner';
import Faq from './components/Faq';

export { Pricing, Navbar, PricingPage, LegalPolicyView, Footer, GhostIcon };

// 6-Hour Rolling Sandbox Window
const SIX_HOURS_MS = 6 * 60 * 60 * 1000;
const CHECKS_COUNT_KEY = 'ghostlead_sandbox_checks_count';
const LAST_RESET_KEY = 'ghostlead_sandbox_last_reset';

// Performance-optimized 60FPS cubic bezier easing & spring physics
const FAST_EASE = [0.16, 1, 0.3, 1];
const FAST_TRANSITION = { duration: 0.25, ease: FAST_EASE };
const MODAL_SPRING = { type: 'spring', stiffness: 280, damping: 26 };
const MODAL_TIERS = [
  { id: 'Starter', name: 'Starter', price: 69, credits: '7,500 Credits' },
  { id: 'Pro', name: 'Pro', price: 149, credits: '22,000 Credits', popular: true },
  { id: 'Agency', name: 'Agency', price: 299, credits: '50,000 Credits' },
];

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
      targetPath = hash === '#terms' ? '/terms' : '/privacy';
    } else if (hash) {
      targetPath = `/${hash}`;
    }

    if (typeof window !== 'undefined') {
      if (window.location.pathname !== targetPath) {
        window.history.pushState({ view }, '', targetPath);
      } else if (hash) {
        window.history.replaceState({ view }, '', targetPath);
      } else if (window.location.hash) {
        window.history.pushState({ view }, '', targetPath);
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
  const [modalHeadline, setModalHeadline] = useState("Lock Your Early Founder Access");
  const [isLimitGateModal, setIsLimitGateModal] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Pro');
  const [emailInput, setEmailInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [reservationToken, setReservationToken] = useState('#GL-EB-024');

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
      : "Lock Your Early Founder Access";
    setModalHeadline((customHeadline && !customHeadline.includes('Wave')) ? customHeadline : defaultHeadline);
    setIsLimitGateModal(false);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setIsDuplicate(false);
    setIsModalOpen(true);
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
    <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-[#fbfbfd] text-[#1d1d1f] font-sans antialiased selection:bg-indigo-100 selection:text-indigo-900 relative">
      
      {/* Soft Ambient Light Glow (GPU accelerated, zero re-rasterization) */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[450px] pointer-events-none -z-10 overflow-hidden flex justify-center transform-gpu will-change-transform">
        <div className="w-[750px] h-[320px] bg-[radial-gradient(ellipse_at_top,_rgba(240,240,245,0.85),_transparent_70%)] blur-[80px] rounded-full" />
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

      {/* Main Content Flow with Adequate Top Padding Fix (pt-28 sm:pt-32) */}
      <main className={currentView === 'legal' ? '' : 'pt-28 sm:pt-32'}>
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
              <div className="flex justify-center py-2.5 px-4">
                <WaveBadge onOpenModal={openModal} />
              </div>

        {/* ========================================================= */}
        {/* 3. HERO SECTION (TIGHTENED FOLD, HUMAN HIGH-TRUST COPY)   */}
        {/* ========================================================= */}
        <section className="pt-6 pb-6 sm:pt-8 sm:pb-8 max-w-4xl mx-auto text-center px-4 transform-gpu will-change-transform">
        
        {/* H1 Main Title & Human Sub-headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={FAST_TRANSITION}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]"
        >
          <span>Stop burning sending domains and credits</span>
          <span className="block bg-gradient-to-r from-blue-600 to-sky-500 bg-clip-text text-transparent">
            on dead mailboxes.
          </span>
        </motion.h1>

        {/* Value Explanation (Human & Direct, max 2 lines) */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...FAST_TRANSITION, delay: 0.05 }}
          className="mt-3.5 sm:mt-4 text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
        >
          Outdated contact lists destroy your sender reputation before you even get a reply. GhostLead guarantees active business inboxes right at the source—and dead or risky addresses never consume your balance.
        </motion.p>

        {/* ========================================================= */}
        {/* 4. INTERACTIVE SANDBOX WIDGET (IMMEDIATELY BELOW WITH MT-6) */}
        {/* ========================================================= */}
        <div id="sandbox" className="mt-6 text-left scroll-mt-24 sm:scroll-mt-28">
          <div className="transform-gpu will-change-transform bg-white/80 backdrop-blur-2xl text-[#1d1d1f] rounded-[28px] p-6 sm:p-8 border border-black/[0.06] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05),0_0_1px_1px_rgba(0,0,0,0.03)] relative overflow-hidden">
            
            {/* Subtle Ambient Lighting */}
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />

            {/* Console Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-black/[0.05] relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 uppercase tracking-wider mb-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Mail Server Health Inspector
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-[#1d1d1f] tracking-tight">
                  Inspect any business domain&apos;s mail infrastructure.
                </h2>
                <p className="text-xs text-[#86868b] mt-0.5">
                  Live DNS &amp; MX verification. Test your own domain or target company below.
                </p>
              </div>

              {/* Checks Used Pill */}
              <div className="self-start sm:self-center flex items-center gap-2 bg-black/[0.03] border border-black/[0.04] px-3.5 py-1.5 rounded-full text-xs font-medium flex-shrink-0">
                <span className="text-[#86868b]">UI Demo Checks:</span>
                <span className={`font-bold px-2 py-0.5 rounded-full text-[11px] ${
                  isLimitReached ? 'bg-rose-500 text-white' : 'bg-[#1d1d1f] text-white'
                }`}>
                  {isLimitReached ? '5 / 5 (Limit Reached)' : `${checksCount} / 5`}
                </span>
              </div>
            </div>

            {/* 1-Click Test Chips */}
            <div className="pt-3.5 flex items-center gap-2 text-xs relative z-10">
              <span className="text-[#86868b] font-medium flex-shrink-0">Quick Presets:</span>
              <div className="flex overflow-x-auto no-scrollbar py-0.5 gap-2 items-center w-full touch-pan-x">
                <button
                  type="button"
                  onClick={() => handlePresetSelect('automexiaai.in')}
                  disabled={isLimitReached || isVerifying}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100/80 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  automexiaai.in
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('stripe.com')}
                  disabled={isLimitReached || isVerifying}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100/80 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  stripe.com
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('airbnb.com')}
                  disabled={isLimitReached || isVerifying}
                  className="text-xs font-medium px-3 py-1.5 rounded-lg bg-slate-100/80 hover:bg-blue-50 hover:text-blue-600 border border-transparent hover:border-blue-200 transition-all cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
                >
                  airbnb.com
                </button>
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleDemoVerify} className="mt-3.5 flex flex-col sm:flex-row gap-2.5 sm:gap-3 relative z-10">
              <div className="flex-1 min-w-0">
                <label className="block text-[11px] font-semibold text-[#86868b] uppercase tracking-wider mb-1">
                  Company Domain
                </label>
                <div className="relative border border-slate-200 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 rounded-xl bg-slate-100/70 focus-within:bg-white transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
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
                    className="w-full bg-transparent border-0 rounded-xl pl-10 pr-3.5 py-2.5 sm:py-3 text-sm text-[#1d1d1f] placeholder:text-slate-400 focus:outline-none transition-all disabled:cursor-not-allowed font-mono"
                  />
                </div>
              </div>

              <div className="sm:self-end w-full sm:w-auto flex-shrink-0">
                <button 
                  type="submit"
                  disabled={isVerifying}
                  className="transform-gpu will-change-transform w-full sm:w-auto bg-blue-600 hover:bg-blue-500 text-white font-medium px-5 py-2.5 rounded-xl shadow-sm hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98 whitespace-nowrap disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed"
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
              <div className="transform-gpu will-change-transform mt-3.5 p-3 rounded-2xl bg-slate-50 border border-black/[0.05] text-xs text-[#6e6e73] flex items-center justify-center flex-wrap gap-x-2 gap-y-1 relative z-10 text-center shadow-2xs">
                <div className="flex items-center gap-1.5 text-[#6e6e73]">
                  <Clock className="w-3.5 h-3.5 text-purple-600 flex-shrink-0 animate-pulse" />
                  <span>
                    UI demo checks refresh in <strong className="text-[#1d1d1f] font-semibold">{countdownHours}h {countdownMinutes}m</strong>
                  </span>
                </div>
                <span className="text-slate-300 hidden sm:inline">•</span>
                <button
                  type="button"
                  onClick={openLimitGateModal}
                  className="font-semibold text-purple-600 hover:text-purple-700 transition-colors cursor-pointer hover:underline inline-flex items-center gap-0.5"
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
                    className="transform-gpu will-change-transform space-y-2.5 p-3.5 sm:p-4 rounded-2xl bg-slate-50/80 border border-black/[0.05]"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-black/[0.04] text-[10px] font-semibold text-[#86868b] uppercase tracking-wider">
                      <span>DNS &amp; MX Inspection Radar</span>
                      <span className="text-purple-600 animate-pulse">Inspecting mail infrastructure...</span>
                    </div>

                    {/* Stage 1 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      verifyStep >= 1 ? 'bg-white border-black/[0.06] text-[#1d1d1f] shadow-2xs' : 'bg-slate-100/40 border-black/[0.03] text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base flex-shrink-0">🔍</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-[#1d1d1f] text-xs">Step 1: Domain Format &amp; Hostname Validation</div>
                          <div className="text-[11px] text-[#86868b] truncate">
                            Validating format for {cleanDomainDisplay}
                          </div>
                        </div>
                      </div>
                      {verifyStep >= 1 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" /> Valid
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider flex-shrink-0">Pending</span>
                      )}
                    </div>

                    {/* Stage 2 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      verifyStep >= 2 ? 'bg-white border-black/[0.06] text-[#1d1d1f] shadow-2xs' : 'bg-slate-100/40 border-black/[0.03] text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base flex-shrink-0">⚙️</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-[#1d1d1f] text-xs">Step 2: DNS &amp; MX Server Resolution</div>
                          <div className="text-[11px] text-[#86868b] truncate">
                            Querying exchange servers for {cleanDomainDisplay}
                          </div>
                        </div>
                      </div>
                      {verifyStep >= 2 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" /> Resolved
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider flex-shrink-0">
                          {verifyStep === 1 ? 'Querying...' : 'Waiting'}
                        </span>
                      )}
                    </div>

                    {/* Stage 3 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      verifyStep >= 3 ? 'bg-white border-black/[0.06] text-[#1d1d1f] shadow-2xs' : 'bg-slate-100/40 border-black/[0.03] text-slate-400'
                    }`}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base flex-shrink-0">🛡️</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-[#1d1d1f] text-xs">Step 3: SPF &amp; Provider Identification</div>
                          <div className="text-[11px] text-[#86868b] truncate">
                            Inspecting mail security records
                          </div>
                        </div>
                      </div>
                      {verifyStep >= 3 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" /> Complete
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider flex-shrink-0">
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
                    className="transform-gpu will-change-transform p-5 sm:p-6 rounded-2xl bg-white border border-black/[0.06] shadow-sm flex flex-col gap-4 text-left"
                  >
                    {/* Domain & Status Badge */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-black/[0.05]">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 flex-shrink-0">
                          <Globe className="w-4 h-4 text-purple-600" />
                        </div>
                        <div className="min-w-0">
                          <span className="text-[10px] font-semibold text-[#86868b] uppercase tracking-wider block">Target Domain</span>
                          <span className="font-mono font-semibold text-[#1d1d1f] text-base sm:text-lg truncate block">
                            {verifyResult.domain}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0 flex-wrap">
                        {verifyResult.hasMx ? (
                          <>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 border border-emerald-200/60 text-emerald-700 shadow-2xs">
                              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                              Active Mail Server
                            </span>
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-50 border border-blue-200/60 text-blue-700 shadow-2xs">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                              SMTP Ping: Ready
                            </span>
                          </>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 border border-amber-200/60 text-amber-700 shadow-2xs">
                            <AlertCircle className="w-3.5 h-3.5 text-amber-500" />
                            No MX Found
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Inspection Grid (3 columns on md+, responsive) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                      {/* 1. Primary Mail Provider */}
                      <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center gap-2 text-[10px] font-semibold text-[#86868b] uppercase tracking-wider mb-2">
                          <Server className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>Primary Mail Provider</span>
                        </div>
                        <div className="text-sm font-semibold text-[#1d1d1f] tracking-tight">
                          {verifyResult.provider || 'None'}
                        </div>
                      </div>

                      {/* 2. Primary MX Host */}
                      <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col justify-between">
                        <div className="flex items-center justify-between gap-1 text-[10px] font-semibold text-[#86868b] uppercase tracking-wider mb-2">
                          <span>Primary MX Host</span>
                          <span className="text-[10px] font-medium text-[#86868b] bg-white px-1.5 py-0.5 rounded border border-black/[0.04]">
                            ({verifyResult.mxCount ?? 0} exchange servers)
                          </span>
                        </div>
                        <div className="font-mono text-xs text-[#1d1d1f] truncate" title={verifyResult.primaryMx || 'None'}>
                          {verifyResult.primaryMx || 'None'}
                        </div>
                      </div>

                      {/* 3. SPF Protection */}
                      <div className="bg-slate-50/60 border border-slate-200/80 rounded-xl p-4 shadow-sm flex flex-col justify-between sm:col-span-2 md:col-span-1">
                        <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#86868b] uppercase tracking-wider mb-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                          <span>SPF Protection</span>
                        </div>
                        <div>
                          {verifyResult.hasSpf ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-50 border border-emerald-200/60 text-emerald-700">
                              <Check className="w-3.5 h-3.5 flex-shrink-0" />
                              SPF Record Configured (v=spf1)
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-500">
                              <X className="w-3.5 h-3.5 flex-shrink-0" />
                              No SPF Detected
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Extension Trust Callout Banner */}
                    <div className="mt-2 pt-4 border-t border-black/[0.06] flex flex-col md:flex-row items-start md:items-center justify-between gap-3 bg-slate-50/50 -mx-5 sm:-mx-6 -mb-5 sm:-mb-6 p-5 sm:p-6 rounded-b-2xl">
                      <div className="flex items-start gap-2.5 max-w-xl text-xs text-[#6e6e73] leading-relaxed">
                        <ChromeIcon className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                        <p>
                          <strong className="text-[#1d1d1f] font-semibold">Live mail infrastructure verified.</strong>{' '}
                          GhostLead executes this direct SMTP handshake right inside LinkedIn—guaranteeing 0% bounce and charging $0 for dead mailboxes.
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => openModal('Pro')}
                        className="w-full md:w-auto flex-shrink-0 bg-blue-600 hover:bg-blue-500 text-white font-medium px-4 py-2 rounded-xl shadow-sm hover:shadow-blue-500/25 transition-all flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-95 text-xs sm:text-sm"
                      >
                        <span>Lock Founder Access ($0) →</span>
                      </button>
                    </div>
                  </motion.div>
                )}

                {/* Idle Preview Prompt */}
                {!isVerifying && !verifyResult && !verifyError && (
                  <div className="border border-dashed border-slate-200 rounded-2xl p-8 bg-slate-50/50 text-center">
                    <Server className="h-6 w-6 text-slate-400 mx-auto mb-3" aria-hidden="true" />
                    <p className="text-sm font-semibold text-slate-700">
                      Test your target company's mail setup in real-time
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      See if their mail server blocks cold outreach or accepts live handshakes before you waste sending credits.
                    </p>
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
                    className="transform-gpu will-change-transform p-4 sm:p-5 rounded-2xl bg-rose-50/70 border border-rose-200/70 shadow-2xs flex items-center justify-between gap-3 text-rose-900"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-rose-100/80 border border-rose-200 flex items-center justify-center flex-shrink-0 text-rose-600">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-rose-700 uppercase tracking-wider">
                          Inspection Notice
                        </div>
                        <div className="text-sm text-rose-950 mt-0.5">
                          {verifyError}
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setVerifyError(null)}
                      className="text-rose-400 hover:text-rose-700 p-1.5 rounded-lg hover:bg-rose-100/60 transition-colors cursor-pointer flex-shrink-0"
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
              <div className="transform-gpu will-change-transform mt-4 p-4 rounded-2xl bg-amber-50/80 border border-amber-200/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs sm:text-sm text-amber-950 relative z-10">
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>
                    UI demo limit reached. Claim your Lifetime Deal to unlock unlimited checks.
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={openLimitGateModal}
                  className="w-full sm:w-auto flex-shrink-0 font-medium px-4 py-2 bg-[#1d1d1f] hover:bg-black text-white rounded-full shadow-sm text-xs transition-all active:scale-95 cursor-pointer"
                >
                  {waveMetrics.isClosed ? 'Join Waitlist →' : `Claim ${waveMetrics.waveName} Deal →`}
                </button>
              </div>
            )}

          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 5. FEATURES SECTION (3 ALTERNATING ZIG-ZAG ROWS)          */}
      {/* ========================================================= */}
      <section id="features" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 scroll-mt-24 sm:scroll-mt-28">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl text-slate-900 font-extrabold tracking-tight leading-tight">
            Turn LinkedIn Profiles into Verified, Ready-to-Send Leads
          </h2>
          <p className="mt-3 text-base sm:text-lg text-[#86868b]">
            Everything you need to prospect safely, eliminate bounces, and export clean data without manual work.
          </p>
        </div>

        {/* 3 Stacked Zig-Zag Rows */}
        <div className="space-y-24 lg:space-y-32">
          
          {/* Row 1: LINKEDIN SAFETY */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Copy Column */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <span className="inline-flex rounded-full bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 text-xs font-semibold tracking-wide">
                  LINKEDIN SAFETY
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Scrape Leads Without Account Restrictions
              </h3>
              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600" aria-hidden="true">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span className="text-base text-slate-600">
                    Prospect aggressively with built-in human pacing that keeps your LinkedIn account completely safe.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600" aria-hidden="true">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span className="text-base text-slate-600">
                    Grab entire search pages in one click without opening dozens of tabs.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual Panel Column */}
            <div className="w-full lg:w-1/2" aria-hidden="true">
              <div className="relative mx-auto w-full max-w-md [perspective:1200px] [transform-style:preserve-3d]">
                {/* Offset Ghost Layer to fake depth */}
                <div 
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-slate-800/60 pointer-events-none translate-x-2.5 translate-y-2.5 scale-[0.98] lg:[transform:rotateX(8deg)_rotateY(-12deg)] motion-reduce:transform-none" 
                  aria-hidden="true" 
                />

                {/* Main Dark Glass Panel */}
                <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur p-5 space-y-3 text-left transition-transform duration-500 lg:[transform:rotateX(8deg)_rotateY(-12deg)] hover:lg:[transform:rotateX(4deg)_rotateY(-6deg)] motion-reduce:transition-none motion-reduce:transform-none shadow-[0_40px_100px_rgba(59,130,246,0.2)]">
                  {/* Header row */}
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="text-sm text-slate-200">Safe Zone</span>
                    <div className="w-9 h-5 rounded-full bg-emerald-500 p-0.5 shadow-[0_0_12px_rgba(16,185,129,0.6)] flex items-center justify-end">
                      <div className="w-4 h-4 rounded-full bg-white shadow-xs" />
                    </div>
                  </div>

                  {/* Text + Bar */}
                  <div className="space-y-2 py-1">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span className="text-xs text-slate-300">Today: 18 / 50 • Human-paced</span>
                    </div>
                    <div className="w-full bg-slate-700 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-sky-400 h-full w-[36%]" />
                    </div>
                  </div>

                  {/* Floating Badge */}
                  <div className="pt-2 sm:pt-0 sm:absolute sm:-bottom-3 sm:-right-3">
                    <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/15 text-emerald-300 backdrop-blur px-3 py-1 text-xs font-medium shadow-lg whitespace-normal sm:whitespace-nowrap text-center">
                      Save Status: Already Saved • $0 Charged
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: ZERO WASTE */}
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            {/* Copy Column */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <span className="inline-flex rounded-full bg-teal-50 text-teal-600 border border-teal-100 px-3 py-1 text-xs font-semibold tracking-wide">
                  ZERO WASTE
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                0% Bounces. $0 Charged for Dead Emails.
              </h3>
              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600" aria-hidden="true">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span className="text-base text-slate-600">
                    Stop burning money on stale database dumps.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600" aria-hidden="true">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span className="text-base text-slate-600">
                    We only charge credits for 100% deliverable emails—risky and invalid mailboxes are completely free so your sender reputation stays bulletproof.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual Panel Column */}
            <div className="w-full lg:w-1/2" aria-hidden="true">
              <div className="relative mx-auto w-full max-w-md [perspective:1200px] [transform-style:preserve-3d]">
                {/* Offset Ghost Layer to fake depth (mirrored tilt) */}
                <div 
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-slate-800/60 pointer-events-none -translate-x-2.5 translate-y-2.5 scale-[0.98] lg:[transform:rotateX(8deg)_rotateY(12deg)] motion-reduce:transform-none" 
                  aria-hidden="true" 
                />

                {/* Main Dark Glass Panel */}
                <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur p-5 space-y-3 text-left transition-transform duration-500 lg:[transform:rotateX(8deg)_rotateY(12deg)] hover:lg:[transform:rotateX(4deg)_rotateY(6deg)] motion-reduce:transition-none motion-reduce:transform-none shadow-[0_40px_100px_rgba(20,184,166,0.2)]">
                  {/* Shield Indicator + Verified Active Mailbox */}
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-teal-500/15 border border-teal-400/30 text-teal-300 flex items-center justify-center shrink-0">
                      <ShieldCheck className="h-6 w-6 text-teal-300" aria-hidden="true" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                      <span className="text-sm font-medium text-slate-200">Verified Active Mailbox</span>
                    </div>
                  </div>

                  {/* Red dot + Bounce Screened • $0 */}
                  <div className="flex items-center gap-2 py-1 text-sm text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0" />
                    <span>Bounce Screened • $0</span>
                  </div>

                  {/* Bottom status bar */}
                  <div className="rounded-lg border border-teal-400/20 bg-teal-500/10 px-3 py-2 text-xs text-teal-200 font-medium">
                    No Credit Used - Catch-All filtered
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: OUTBOUND READY */}
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Copy Column */}
            <div className="w-full lg:w-1/2 space-y-4">
              <div>
                <span className="inline-flex rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 px-3 py-1 text-xs font-semibold tracking-wide">
                  OUTBOUND READY
                </span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                Export Clean Data Ready for Instantly &amp; Smartlead
              </h3>
              <ul className="space-y-3 pt-2">
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600" aria-hidden="true">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span className="text-base text-slate-600">
                    Skip manual spreadsheet cleanups.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600" aria-hidden="true">
                    <Check className="h-3 w-3 stroke-[2.5]" />
                  </span>
                  <span className="text-base text-slate-600">
                    Download pre-formatted CSVs mapped perfectly for your email sequencer, complete with verified titles and companies for maximum reply rates.
                  </span>
                </li>
              </ul>
            </div>

            {/* Visual Panel Column */}
            <div className="w-full lg:w-1/2" aria-hidden="true">
              <div className="relative mx-auto w-full max-w-md [perspective:1200px] [transform-style:preserve-3d]">
                {/* Ambient glow behind panel */}
                <div 
                  className="absolute -inset-6 -z-10 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" 
                  aria-hidden="true" 
                />

                {/* Offset Ghost Layer to fake depth */}
                <div 
                  className="absolute inset-0 rounded-2xl border border-white/10 bg-slate-800/60 pointer-events-none translate-x-2.5 translate-y-2.5 scale-[0.98] lg:[transform:rotateX(8deg)_rotateY(-12deg)] motion-reduce:transform-none" 
                  aria-hidden="true" 
                />

                {/* Main Dark Glass Panel */}
                <div className="relative rounded-2xl border border-white/10 bg-slate-900/90 backdrop-blur p-5 space-y-3 text-left transition-transform duration-500 lg:[transform:rotateX(8deg)_rotateY(-12deg)] hover:lg:[transform:rotateX(4deg)_rotateY(-6deg)] motion-reduce:transition-none motion-reduce:transform-none shadow-[0_40px_100px_rgba(99,102,241,0.25)]">
                  {/* Faux Select */}
                  <div className="flex items-center justify-between rounded-lg border border-white/15 bg-gradient-to-b from-slate-700 to-slate-800 px-3 py-2 text-sm text-slate-100">
                    <span>CSV Format Preset: Instantly.ai</span>
                    <ChevronDown className="h-4 w-4 text-slate-300 shrink-0 ml-2" aria-hidden="true" />
                  </div>

                  {/* Layered Stack Under It */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-slate-300 relative z-20">
                      <span>Cleaned Name</span>
                      <span className="text-slate-400 font-mono text-[11px]">instantly.com</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-slate-300 -mt-1 translate-x-1.5 scale-[0.98] relative z-10">
                      <span>Verified Direct Work Email</span>
                      <span className="text-slate-400 font-mono text-[11px]">deliverable</span>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-slate-800/70 px-3 py-2 text-xs text-slate-300 -mt-1 translate-x-3 scale-[0.96] relative z-0">
                      <span>Validated Title &amp; Company</span>
                      <span className="text-slate-400 font-mono text-[11px]">ready</span>
                    </div>
                  </div>

                  {/* Bottom block (static span, not a button) */}
                  <div className="pt-1">
                    <span className="inline-flex rounded-lg bg-gradient-to-r from-indigo-500 to-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-indigo-500/30">
                      348 Leads Ready (.csv) ↓
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Comparison Section */}
      <Comparison />

      {/* High-urgency LTD Banner */}
      <LtdBanner onOpenModal={openModal} />

      {/* FAQ Accordion */}
      <Faq />

      </motion.div>
    )}
  </AnimatePresence>
</main>

      {/* ========================================================= */}
      {/* 6. FOOTER                                                 */}
      {/* ========================================================= */}
      <Footer onNavigate={navigateTo} />

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
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-md transform-gpu will-change-transform"
            />

            {/* Dialog Container */}
            <motion.div 
              initial={{ opacity: 0, y: 30, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.98 }}
              transition={MODAL_SPRING}
              className="relative w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-t-[28px] sm:rounded-[28px] p-6 sm:p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-slate-200/80 z-10 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden transform-gpu will-change-transform text-slate-900"
            >
              {/* Drag Handle on Mobile */}
              <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto mb-4 sm:hidden flex-shrink-0" />

              {!isSubmitted ? (
                <>
                  {isLimitGateModal && (
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/90 text-amber-900 text-xs font-semibold mb-3 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
                      <span>⚡ UI Demo Limit Reached (5/5)</span>
                    </div>
                  )}

                  {/* Header: Title (left) + Close Button (right) */}
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight leading-snug">
                        {isLimitGateModal
                          ? "You've experienced real-time verification speed."
                          : modalHeadline}
                      </h3>
                      <p className="mt-1.5 sm:mt-2 text-sm text-slate-500 leading-relaxed">
                        {isLimitGateModal
                          ? "Lock your lifetime spot at the lowest early-bird rate today before slots close to get unlimited verification."
                          : "Reserve your lifetime spot at the lowest early-bird rate. Zero upfront payment today."}
                      </p>
                    </div>
                    <button 
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer flex-shrink-0 -mr-1 -mt-1"
                      aria-label="Close modal"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Plan Selection Pills */}
                  <div className="my-3.5 sm:my-4">
                    <label className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                      Selected Tier:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {MODAL_TIERS.map((tier) => {
                        const isCurrent = selectedTier === tier.id;
                        return (
                          <button
                            key={tier.id}
                            type="button"
                            onClick={() => setSelectedTier(tier.id)}
                            className={`p-2 sm:p-2.5 rounded-xl text-center transition-all cursor-pointer flex flex-col items-center justify-between min-h-[92px] ${
                              isCurrent
                                ? 'border-2 border-blue-600 bg-blue-50/50 shadow-sm ring-1 ring-blue-500/20'
                                : 'border border-slate-200 bg-white hover:border-slate-300'
                            }`}
                          >
                            <div className="w-full">
                              {tier.popular ? (
                                <span className="text-[10px] font-semibold text-blue-600 block leading-tight mb-0.5">
                                  Most Popular
                                </span>
                              ) : (
                                <span className="text-[10px] block leading-tight mb-0.5 invisible select-none">
                                  &nbsp;
                                </span>
                              )}
                              <div className="text-xs font-semibold text-slate-800">
                                {tier.name}
                              </div>
                            </div>
                            <div className="w-full mt-1">
                              <div className="text-sm sm:text-base font-bold text-slate-900 leading-tight">
                                {tier.price === 69 && (
                                  <span className="line-through text-slate-400 text-sm font-medium mr-2">
                                    $199
                                  </span>
                                )}
                                ${tier.price}
                              </div>
                              <div className="text-[10px] sm:text-xs text-slate-600 mt-0.5 leading-tight truncate">
                                {tier.credits}
                              </div>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                    <p className="text-center text-sm text-slate-500 mt-2.5">
                      $0 due today to lock slot
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handlePreRegisterSubmit} className="space-y-3 sm:space-y-3.5">
                    {submitError && (
                      <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">
                        Work Email Address
                      </label>
                      <input 
                        type="email" 
                        required
                        disabled={isSubmitting}
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="founder@company.com"
                        className="w-full px-4 py-2.5 sm:py-3 rounded-xl border border-slate-200 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-sm text-slate-900 placeholder:text-slate-400 transition-all disabled:bg-slate-100 disabled:text-slate-400 font-sans"
                      />
                    </div>

                    <button 
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold shadow-md shadow-blue-500/20 py-3.5 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
                          <span>Securing Your Slot...</span>
                        </span>
                      ) : (
                        <span>Lock Pre-Booking (${MODAL_TIERS.find((t) => t.id === selectedTier)?.price || 149}) →</span>
                      )}
                    </button>
                  </form>

                  {/* Trust Notes */}
                  <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-center gap-3 text-[11px] text-slate-500 text-center">
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
                <div className="relative text-center py-2 sm:py-4">
                  <button 
                    type="button"
                    onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
                    className="absolute -top-1 -right-1 text-slate-400 hover:text-slate-600 p-1.5 rounded-lg hover:bg-slate-100 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 mx-auto flex items-center justify-center mb-3 border border-emerald-100">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold mb-2 border border-slate-200">
                    Reservation Token {reservationToken}
                  </div>

                  <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {isDuplicate ? "Slot Already Secured!" : "Slot Reserved!"}
                  </h3>
                  
                  {isDuplicate ? (
                    <p className="mt-1.5 text-xs sm:text-sm text-amber-800 bg-amber-50 border border-amber-200 px-3 py-2 rounded-xl leading-relaxed max-w-sm mx-auto">
                      Good news! This email is already on the early-bird waitlist. We have verified your spot and refreshed your priority token.
                    </p>
                  ) : (
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
                      We will notify you 2 hours prior to public launch to lock your early-bird rate.
                    </p>
                  )}

                  <div className="mt-4 p-3.5 sm:p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left text-slate-700 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Selected Tier:</span>
                      <span className="font-semibold text-blue-600">{selectedTier} (${MODAL_TIERS.find((t) => t.id === selectedTier)?.price || 149} {pricingPlans.isClosed ? 'Monthly' : 'Lifetime'})</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Email:</span>
                      <span className="font-mono font-semibold text-slate-900 break-all">{emailInput}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">{waveMetrics.isClosed ? 'Waitlist Status:' : 'Early-Bird Discount:'}</span>
                      <span className="font-semibold text-emerald-600">{waveMetrics.isClosed ? 'Standard Waitlist Confirmed' : 'Locked In'}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => { setIsModalOpen(false); setIsSubmitted(false); }}
                    className="mt-5 w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition-all shadow-md shadow-blue-500/20 cursor-pointer active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
