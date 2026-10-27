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
  Copy,
  AlertCircle,
  RefreshCw,
  Star,
  BadgeCheck,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { registerWaitlistUser } from './lib/supabase';

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

// GhostLead Sleek Mascot Icon
function GhostIcon({ className = "w-6 h-6" }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M9 10h.01" />
      <path d="M15 10h.01" />
      <path d="M12 2a8 8 0 0 0-8 8v12l3-2.5 2.5 2.5L12 19.5l2.5 2.5 2.5-2.5 3 2.5V10a8 8 0 0 0-8-8z" />
    </svg>
  );
}

// Hardware-Accelerated Deliverability Gauge (Zero layout reflow)
function DeliverabilityGauge({ score = 98, status = 'deliverable', size = 64, isDark = true }) {
  const strokeWidth = 5.5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const normalizedStatus = (status || 'deliverable').toLowerCase();

  let strokeColor = '#10B981';
  let statusText = 'Deliverable';
  let labelColor = 'text-emerald-400';
  let displayScore = 98;
  let trackStroke = isDark ? '#1E293B' : '#E2E8F0';

  if (normalizedStatus === 'undeliverable') {
    displayScore = 0;
    strokeColor = '#EF4444';
    statusText = 'Invalid';
    labelColor = 'text-rose-400';
    trackStroke = 'rgba(239, 68, 68, 0.25)';
  } else if (normalizedStatus === 'risky') {
    displayScore = 55;
    strokeColor = '#F59E0B';
    statusText = 'Risky';
    labelColor = 'text-amber-400';
    trackStroke = 'rgba(245, 158, 11, 0.2)';
  } else {
    displayScore = typeof score === 'number' && score > 0 ? Math.round(score) : 98;
    strokeColor = '#10B981';
    statusText = 'Deliverable';
    labelColor = 'text-emerald-400';
    trackStroke = isDark ? '#1E293B' : '#E2E8F0';
  }

  const strokeDashoffset = circumference - (displayScore / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center flex-shrink-0" style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackStroke}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          className="transition-all duration-500 ease-out"
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center text-center">
        <span className={`text-sm font-extrabold tracking-tight leading-none ${
          normalizedStatus === 'undeliverable'
            ? 'text-rose-400'
            : normalizedStatus === 'risky'
            ? 'text-amber-400'
            : (isDark ? 'text-white' : 'text-slate-900')
        }`}>
          {displayScore}%
        </span>
        <span className={`text-[8px] font-bold uppercase tracking-wider mt-0.5 ${labelColor}`}>
          {statusText}
        </span>
      </div>
    </div>
  );
}

// Wave 1 Lifetime Plans
const PLANS = {
  Starter: {
    name: 'Starter',
    price: 49,
    leads: '1,000 Verified Leads / month',
    seats: 'Single User Account',
    claimed: 11,
    total: 15,
    tag: '4 Slots Left',
    barColor: 'bg-amber-500',
    popular: false,
    nextWavePrice: '$69',
    features: [
      '1,000 Verified Leads / month',
      'Single User Account',
      'Chrome Extension LinkedIn Capture',
      'Real-Time Mailbox Verification',
      'Direct CSV Lead Export',
      'Standard Processing Queue'
    ]
  },
  Pro: {
    name: 'Pro',
    price: 119,
    leads: '5,000 Verified Leads / month',
    seats: 'Up to 3 Team Seats',
    claimed: 6,
    total: 10,
    tag: '4 Slots Left',
    barColor: 'bg-indigo-600',
    popular: true,
    nextWavePrice: '$159',
    features: [
      '5,000 Verified Leads / month',
      'Up to 3 Team Seats',
      'Real-Time Mailbox Verification',
      'Zero-Bounce Deliverability Guard',
      'Instantly & Smartlead 1-Click Sync',
      'Priority Processing Queue'
    ]
  },
  Agency: {
    name: 'Agency',
    price: 249,
    leads: '15,000 Verified Leads / month',
    seats: 'Unlimited Team Seats',
    claimed: 4,
    total: 5,
    tag: 'LAST SEAT!',
    barColor: 'bg-rose-500',
    popular: false,
    nextWavePrice: '$299',
    features: [
      '15,000 Verified Leads / month',
      'Unlimited Team Seats',
      'Bulk LinkedIn List Prospector',
      'Direct CRM & Webhook Integrations',
      'Dedicated Account Specialist',
      'Ultra-Fast Dedicated Queue'
    ]
  }
};

export default function App() {
  // Sandbox State
  const [targetName, setTargetName] = useState('Sam Altman');
  const [domain, setDomain] = useState('openai.com');
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
  const [verifyResult, setVerifyResult] = useState({
    email: 's***@openai.com',
    deliverability: '98%',
    score: 98,
    status: 'deliverable',
    domain: 'openai.com',
    mxProvider: 'Google Workspace',
  });
  const [hasCopied, setHasCopied] = useState(false);

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

  const getDetectedMailServer = (rawDomain) => {
    const d = rawDomain.toLowerCase();
    if (d.includes('microsoft')) return 'Microsoft 365 Exchange Online (EOP) Detected';
    if (d.includes('apple')) return 'Apple Private MX Relay Detected';
    return 'Google Workspace (ASPSPMX) Detected';
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
    setModalHeadline(customHeadline || "Lock Your Wave 1 Early-Bird Slot");
    setIsLimitGateModal(false);
    setIsSubmitted(false);
    setIsSubmitting(false);
    setSubmitError(null);
    setIsDuplicate(false);
    setIsModalOpen(true);
  };

  const handleDemoVerify = async (e, overrideName = null, overrideDomain = null) => {
    if (e && typeof e.preventDefault === 'function') e.preventDefault();
    if (checksCount >= 5) {
      openLimitGateModal();
      return;
    }

    const nameToVerify = (overrideName !== null ? overrideName : targetName).trim();
    const domainToVerify = (overrideDomain !== null ? overrideDomain : domain).trim();

    if (!domainToVerify || !nameToVerify) return;

    setVerifyError(null);
    setIsVerifying(true);
    setVerifyStep(1);
    setVerifyResult(null);

    const stepTimer1 = setTimeout(() => setVerifyStep(2), 350);
    const stepTimer2 = setTimeout(() => setVerifyStep(3), 700);

    const startTime = performance.now();

    try {
      const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000';
      const res = await fetch(`${backendUrl}/demo/verify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
       body: JSON.stringify({
          name: nameToVerify,
          company: domainToVerify.toLowerCase().replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0].trim(),
        }),
      });

      const elapsed = performance.now() - startTime;
      const minAnimationRemaining = Math.max(0, 850 - elapsed);
      if (minAnimationRemaining > 0) {
        await new Promise((resolve) => setTimeout(resolve, minAnimationRemaining));
      }

      const data = await res.json().catch(() => null);

      if (!res.ok || !data || !data.ok) {
        const errorMsg = data?.message || data?.error || 'Invalid domain. Please enter an active business domain.';
        throw new Error(errorMsg);
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

      const probeStatus = (data.status || 'deliverable').toLowerCase();
      let normalizedScore = 98;
      if (probeStatus === 'undeliverable') {
        normalizedScore = 0;
      } else if (probeStatus === 'risky') {
        normalizedScore = 55;
      } else {
        normalizedScore = typeof data.confidence === 'number' && data.confidence > 0 ? Math.round(data.confidence) : 98;
      }

      setVerifyResult({
        email: data.maskedEmail || `${nameToVerify.charAt(0).toLowerCase()}***@${domainToVerify}`,
        deliverability: `${normalizedScore}%`,
        score: normalizedScore,
        status: probeStatus,
        domain: data.domain || domainToVerify,
        mxProvider: data.mxProvider || 'Custom MX',
      });
      setIsVerifying(false);
      setVerifyStep(0);

      // Automatic Gate Trigger on 5th Completion: Exactly 800ms after the 5th result appears
      if (newCount >= 5) {
        setTimeout(() => {
          openLimitGateModal();
          triggerConfettiCelebration();
        }, 800);
      }
    } catch {
      clearTimeout(stepTimer1);
      clearTimeout(stepTimer2);
      setIsVerifying(false);
      setVerifyStep(0);
      setVerifyResult(null);
      setVerifyError('Invalid domain. Please enter an active business domain.');
    }
  };

  const handlePresetSelect = (nameVal, domainVal) => {
    setTargetName(nameVal);
    setDomain(domainVal);
    setVerifyError(null);
    handleDemoVerify(null, nameVal, domainVal);
  };

  const handleCopyEmail = () => {
    if (!verifyResult) return;
    navigator.clipboard?.writeText(verifyResult.email);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handlePreRegisterSubmit = async (e) => {
    e.preventDefault();
    if (!emailInput.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setSubmitError(null);

    const result = await registerWaitlistUser(emailInput, selectedTier);

    setIsSubmitting(false);

    if (result.success) {
      const randomTokenNum = Math.floor(10 + Math.random() * 80);
      setReservationToken(`#GL-W1-0${randomTokenNum}`);
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
      {/* 1. TOP SCARCITY BAR (COMPACT STICKY)                      */}
      {/* ========================================================= */}
      <aside 
        aria-label="Early-Bird Announcement" 
        className="sticky top-0 z-50 bg-amber-50 border-b border-amber-200/80 px-3 py-1.5 sm:py-2 text-xs text-amber-950 font-medium text-center transform-gpu will-change-transform"
      >
        <div className="max-w-4xl mx-auto flex items-center justify-center gap-2">
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500 shadow-xs shadow-amber-500/50" />
          </span>
          <span>
            🔥 <strong className="font-semibold text-amber-900">Wave 1 Early-Bird:</strong> Only{' '}
            <span className="font-bold text-amber-900 bg-amber-100 px-1.5 py-0.2 rounded border border-amber-300 inline-block">
              7 / 30
            </span>{' '}
            Lifetime Slots Remaining. Next Wave price jumps by up to $50!
          </span>
          <button
            onClick={() => openModal('Pro')}
            className="ml-2 font-bold text-indigo-700 hover:text-indigo-900 underline underline-offset-2 transition-colors cursor-pointer hidden md:inline-flex items-center gap-1"
          >
            Claim Slot <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </aside>

      {/* ========================================================= */}
      {/* 2. FLOATING NAVIGATION BAR (COMPACT & SLIM)               */}
      {/* ========================================================= */}
      <div className="sticky top-2 z-40 px-3 sm:px-6 mb-2 sm:mb-3">
        <header className="max-w-4xl mx-auto rounded-full bg-white/95 border border-slate-200/80 shadow-xs px-4 sm:px-6 h-13 sm:h-14 flex items-center justify-between transform-gpu will-change-transform">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-slate-950 to-slate-800 text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform flex-shrink-0">
              <GhostIcon className="w-4 h-4" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-lg font-extrabold tracking-tight text-slate-950">
                GhostLead
              </span>
              <span className="text-[9px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full border border-slate-200/60">
                Wave 1
              </span>
            </div>
          </a>

          {/* Desktop Navigation Anchor Links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-medium text-slate-600">
            <a href="#sandbox" className="hover:text-slate-950 transition-colors">
              Live Sandbox
            </a>
            <a href="#features" className="hover:text-slate-950 transition-colors">
              Features
            </a>
            <a href="#pricing" className="hover:text-slate-950 transition-colors flex items-center gap-1.5">
              <span>Pricing</span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
            </a>
          </nav>

          {/* Sleek Dark CTA Button */}
          <button 
            onClick={() => openModal('Pro')}
            className="transform-gpu will-change-transform inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs rounded-full font-semibold bg-slate-950 text-white hover:bg-slate-800 shadow-xs transition-all cursor-pointer flex-shrink-0 active:scale-98"
          >
            <span>Claim Slot</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

        </header>
      </div>

      {/* ========================================================= */}
      {/* 3. HERO SECTION (TIGHTENED FOLD, HUMAN HIGH-TRUST COPY)   */}
      {/* ========================================================= */}
      <section className="pt-4 pb-6 sm:pt-6 sm:pb-8 max-w-4xl mx-auto text-center px-4 transform-gpu will-change-transform">
        
        {/* H1 Main Title & Human Sub-headline */}
        <motion.h1 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={FAST_TRANSITION}
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-950 leading-[1.15]"
        >
          Stop sending cold emails to dead mailboxes.
          <span className="block mt-1.5 sm:mt-2 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-indigo-700 to-violet-600">
            Find active founder emails with zero bounce risk — verified live against their company mail server.
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
        <div id="sandbox" className="mt-6 text-left">
          <div className="transform-gpu will-change-transform bg-slate-950 text-white rounded-3xl p-5 sm:p-7 border border-slate-800 shadow-2xl relative overflow-hidden">
            
            {/* Subtle Ambient Console Lighting */}
            <div className="absolute -top-24 -right-24 w-52 h-52 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* Console Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800 relative z-10">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-0.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Live Mailbox Verification Sandbox
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  Test any executive name & domain in real-time.
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Witness instant deliverability verification directly against destination mail servers.
                </p>
              </div>

              {/* Checks Used Pill */}
              <div className="self-start sm:self-center flex items-center gap-2 bg-slate-900 border border-slate-800 px-3 py-1.5 rounded-full text-xs font-semibold flex-shrink-0">
                <span className="text-slate-400">Free Checks Used:</span>
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
                  onClick={() => handlePresetSelect('Sam Altman', 'openai.com')}
                  disabled={isLimitReached || isVerifying}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-medium transition-colors disabled:opacity-40 flex-shrink-0 cursor-pointer text-xs"
                >
                  Sam Altman @ openai.com
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('Brian Chesky', 'airbnb.com')}
                  disabled={isLimitReached || isVerifying}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-medium transition-colors disabled:opacity-40 flex-shrink-0 cursor-pointer text-xs"
                >
                  Brian Chesky @ airbnb.com
                </button>
                <button
                  type="button"
                  onClick={() => handlePresetSelect('Satya Nadella', 'microsoft.com')}
                  disabled={isLimitReached || isVerifying}
                  className="px-3 py-1 rounded-lg bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-300 hover:text-white font-medium transition-colors disabled:opacity-40 flex-shrink-0 cursor-pointer text-xs"
                >
                  Satya Nadella @ microsoft.com
                </button>
              </div>
            </div>

            {/* Form Inputs */}
            <form onSubmit={handleDemoVerify} className="mt-3.5 flex flex-col sm:grid sm:grid-cols-12 gap-2.5 sm:gap-3 relative z-10">
              <div className="w-full sm:col-span-5">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Executive Full Name
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Sam Altman"
                  value={targetName}
                  onChange={(e) => {
                    setTargetName(e.target.value);
                    if (verifyError) setVerifyError(null);
                  }}
                  disabled={isLimitReached || isVerifying}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:bg-slate-900/50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="w-full sm:col-span-4">
                <label className="block text-[11px] font-bold text-slate-400 uppercase mb-1">
                  Company Domain
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. openai.com"
                  value={domain}
                  onChange={(e) => {
                    setDomain(e.target.value);
                    if (verifyError) setVerifyError(null);
                  }}
                  disabled={isLimitReached || isVerifying}
                  required
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 sm:py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all disabled:bg-slate-900/50 disabled:cursor-not-allowed"
                />
              </div>

              <div className="w-full sm:col-span-3 flex items-end">
                <button 
                  type="submit"
                  disabled={isVerifying}
                  className="transform-gpu will-change-transform w-full h-[42px] sm:h-[46px] bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-800 disabled:text-slate-500 disabled:cursor-not-allowed text-white font-semibold text-xs sm:text-sm rounded-xl px-4 flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all cursor-pointer active:scale-98"
                >
                  {isVerifying ? (
                    <span className="flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 animate-spin flex-shrink-0" />
                      <span>Verifying...</span>
                    </span>
                  ) : isLimitReached ? (
                    <>
                      <Lock className="w-4 h-4 text-amber-300 flex-shrink-0" />
                      <span>Unlock Unlimited Checks</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4 fill-amber-300 text-amber-300 flex-shrink-0" />
                      <span>Verify in Real-Time</span>
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
                    Free demo checks refresh in <strong className="text-white font-semibold">{countdownHours}h {countdownMinutes}m</strong>
                  </span>
                </div>
                <span className="text-slate-600 hidden sm:inline">•</span>
                <button
                  type="button"
                  onClick={openLimitGateModal}
                  className="font-bold text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer hover:underline inline-flex items-center gap-0.5"
                >
                  Need unlimited? Claim Wave 1 Slot →
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
                      <span>Live Verification Radar</span>
                      <span className="text-indigo-400 animate-pulse">Running SMTP Handshake...</span>
                    </div>

                    {/* Stage 1 */}
                    <div className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                      verifyStep >= 1 ? 'bg-slate-800/80 border-slate-700 text-white' : 'bg-slate-900/40 border-slate-800 text-slate-500'
                    }`}>
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="text-base flex-shrink-0">🔍</span>
                        <div className="min-w-0">
                          <div className="font-semibold text-white text-xs">Step 1: Mail Server Ping</div>
                          <div className="text-[11px] text-slate-400 truncate">
                            {getDetectedMailServer(cleanDomainDisplay)}
                          </div>
                        </div>
                      </div>
                      {verifyStep >= 1 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" /> Detected
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
                          <div className="font-semibold text-white text-xs">Step 2: Pattern Discovery</div>
                          <div className="text-[11px] text-slate-400 truncate">
                            Matching corporate mailbox conventions ({`{f}{last}@${cleanDomainDisplay}`})
                          </div>
                        </div>
                      </div>
                      {verifyStep >= 2 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" /> Resolved
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider flex-shrink-0">
                          {verifyStep === 1 ? 'Testing...' : 'Waiting'}
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
                          <div className="font-semibold text-white text-xs">Step 3: Direct Handshake Ping</div>
                          <div className="text-[11px] text-slate-400 truncate">
                            Mailbox exists & active (Zero Bounce Guaranteed)
                          </div>
                        </div>
                      </div>
                      {verifyStep >= 3 ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-950/70 border border-emerald-800/80 px-2 py-0.5 rounded-full flex-shrink-0">
                          <Check className="w-3 h-3" /> Verified Active
                        </span>
                      ) : (
                        <span className="text-[10px] text-slate-500 uppercase tracking-wider flex-shrink-0">
                          {verifyStep === 2 ? 'Pinging...' : 'Waiting'}
                        </span>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Stage B: Final Verified Result Card */}
                {!isVerifying && verifyResult && (() => {
                  const status = (verifyResult.status || 'deliverable').toLowerCase();

                  let badgeText = 'Primary Inbox Ready • 0% Bounce Risk';
                  let badgeBg = 'bg-emerald-950/80';
                  let badgeBorder = 'border-emerald-800';
                  let badgeTextColor = 'text-emerald-400';
                  let dotColor = 'bg-emerald-400';
                  let ctaText = 'Lock 99% Deliverability';
                  let ctaClass = 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/30';
                  let CtaIcon = CheckCircle2;

                  if (status === 'undeliverable') {
                    badgeText = 'Mailbox Does Not Exist • High Bounce Risk';
                    badgeBg = 'bg-rose-950/80';
                    badgeBorder = 'border-rose-800';
                    badgeTextColor = 'text-rose-400';
                    dotColor = 'bg-rose-400';
                    ctaText = 'Prevent Hard Bounces';
                    ctaClass = 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-900/30';
                    CtaIcon = AlertCircle;
                  } else if (status === 'risky') {
                    badgeText = 'Unverifiable / Greylisted';
                    badgeBg = 'bg-amber-950/80';
                    badgeBorder = 'border-amber-800';
                    badgeTextColor = 'text-amber-400';
                    dotColor = 'bg-amber-400';
                    ctaText = 'Safeguard Sender Score';
                    ctaClass = 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-900/30';
                    CtaIcon = AlertCircle;
                  }

                  return (
                    <motion.div 
                      key="result-card"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={FAST_TRANSITION}
                      className="transform-gpu will-change-transform p-4 sm:p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-md flex flex-col justify-between gap-3.5"
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <div className="flex items-center gap-3.5 w-full sm:w-auto overflow-hidden">
                          <DeliverabilityGauge 
                            score={verifyResult.score} 
                            status={status} 
                            size={64} 
                            isDark={true} 
                          />
                          
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Deliverability Confidence
                              </span>
                              <span className={`inline-flex items-center gap-1 text-[10px] font-bold ${badgeTextColor} ${badgeBg} border ${badgeBorder} px-2 py-0.5 rounded-full`}>
                                <span className={`h-1.5 w-1.5 rounded-full ${dotColor} animate-ping`} />
                                {badgeText}
                              </span>
                            </div>

                            <div className="mt-1 flex items-center gap-2">
                              <span className="text-base sm:text-lg font-mono font-bold text-white break-all">
                                {verifyResult.email}
                              </span>
                              <button
                                type="button"
                                onClick={handleCopyEmail}
                                title="Copy Masked Address"
                                className="p-1 text-slate-400 hover:text-white rounded hover:bg-slate-800 transition-colors flex-shrink-0 cursor-pointer"
                              >
                                {hasCopied ? (
                                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                                ) : (
                                  <Copy className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </div>

                            <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1.5">
                              <span className="text-slate-400">MX Provider:</span>
                              <strong className="text-slate-200 font-medium">
                                {verifyResult.mxProvider || 'Custom MX'}
                              </strong>
                            </div>
                          </div>
                        </div>

                        <div className="w-full sm:w-auto flex-shrink-0">
                          <button
                            type="button"
                            onClick={() => openModal('Pro')}
                            className={`w-full sm:w-auto px-4 py-2 ${ctaClass} text-xs font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap`}
                          >
                            <CtaIcon className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{ctaText}</span>
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}

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
                          Verification Notice
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
                    Free limit reached. Claim your Lifetime Deal to unlock unlimited checks.
                  </span>
                </div>
                <button 
                  type="button"
                  onClick={openLimitGateModal}
                  className="w-full sm:w-auto flex-shrink-0 font-bold px-3.5 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl shadow-sm text-xs transition-all active:scale-95 cursor-pointer"
                >
                  Claim Wave 1 Deal →
                </button>
              </div>
            )}

          </div>
        </div>

        {/* Social Proof & Value Badges (Directly Below Sandbox Widget) */}
        <div className="mt-8 flex flex-col items-center gap-4">
          
          {/* Avatar Cluster & Rating */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 text-xs sm:text-sm text-slate-600">
            <div className="flex -space-x-2 overflow-hidden flex-shrink-0">
              <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-indigo-100 text-indigo-700 font-bold text-xs flex items-center justify-center">AK</span>
              <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-violet-100 text-violet-700 font-bold text-xs flex items-center justify-center">TM</span>
              <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-emerald-100 text-emerald-700 font-bold text-xs flex items-center justify-center">DL</span>
              <span className="inline-block h-7 w-7 rounded-full ring-2 ring-white bg-amber-100 text-amber-700 font-bold text-xs flex items-center justify-center">SR</span>
            </div>

            <div className="flex items-center gap-0.5 text-amber-500 flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              ))}
            </div>

            <span className="font-medium text-slate-700">
              Join <strong className="text-slate-950 font-bold">340+ agency founders & sales teams</strong> securing their slot.
            </span>
          </div>

          {/* Key Value Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
              99% Deliverability Guarantee
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
              <Zap className="w-3.5 h-3.5 text-indigo-600 flex-shrink-0" />
              1.2s Real-Time Mailbox Ping
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 border border-slate-200 text-slate-700">
              <BadgeCheck className="w-3.5 h-3.5 text-violet-600 flex-shrink-0" />
              Zero Stale Database Scrapes
            </span>
          </div>

        </div>

      </section>

      {/* ========================================================= */}
      {/* 5. FEATURES BENTO GRID (SPACIOUS 3-CARD ROW)              */}
      {/* ========================================================= */}
      <section id="features" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
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
      {/* 6. LIFETIME DEAL (LTD) WAVES SECTION (CENTERED & CLEAR)    */}
      {/* ========================================================= */}
      <section id="pricing" className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold mb-3 border border-amber-200/70">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            Strict Scarcity Wave Release
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
            Lifetime Deal (LTD) Waves
          </h2>
          <p className="mt-3.5 text-base sm:text-lg text-slate-600">
            Pay once, use forever. As each wave sells out, pricing moves permanently to the next tier. No monthly subscriptions, no hidden renewals.
          </p>
        </div>

        {/* Visual Wave Tracker Indicator */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* Wave 1 - Active */}
            <div className="p-4 sm:p-5 rounded-2xl bg-indigo-50/70 border-2 border-indigo-600 shadow-sm relative transform-gpu will-change-transform">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-extrabold text-indigo-700 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                  Wave 1: Active Now
                </span>
                <span className="text-[10px] font-bold bg-indigo-600 text-white px-2 py-0.5 rounded-full">
                  Current Lowest Rate
                </span>
              </div>
              <div className="font-extrabold text-slate-950 text-base sm:text-lg mt-2">
                Wave 1: Early-Bird
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Only <strong className="text-indigo-700">7 / 30</strong> slots remaining in this release.
              </div>
              <div className="mt-3 w-full bg-indigo-200/60 h-2 rounded-full overflow-hidden">
                <div className="bg-indigo-600 h-full w-[76.6%]" />
              </div>
              <div className="text-[10px] font-semibold text-slate-500 text-right mt-1">
                76% Claimed
              </div>
            </div>

            {/* Wave 2 - Upcoming */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 opacity-80">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  Wave 2: Upcoming
                </span>
                <span className="text-[10px] font-semibold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                  +$20 to +$50 jump
                </span>
              </div>
              <div className="font-extrabold text-slate-900 text-base sm:text-lg mt-2">
                Wave 2: Standard
              </div>
              <div className="text-xs text-slate-500 mt-1">
                70 Total Slots • Unlocks immediately once Wave 1 ends.
              </div>
              <div className="mt-3 w-full bg-slate-200 h-2 rounded-full" />
              <div className="text-[10px] font-semibold text-slate-400 text-right mt-1">
                Pending Activation
              </div>
            </div>

            {/* Wave 3 - Final Phase */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 opacity-60">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  Wave 3: Final Phase
                </span>
                <span className="text-[10px] font-semibold text-slate-500 bg-slate-200 px-2 py-0.5 rounded-full">
                  Lockdown Rate
                </span>
              </div>
              <div className="font-extrabold text-slate-700 text-base sm:text-lg mt-2">
                Wave 3: Final Lockdown
              </div>
              <div className="text-xs text-slate-500 mt-1">
                50 Slots • Permanent maximum LTD before SaaS transition.
              </div>
              <div className="mt-3 w-full bg-slate-200 h-2 rounded-full" />
              <div className="text-[10px] font-semibold text-slate-400 text-right mt-1">
                Locked
              </div>
            </div>

          </div>
        </div>

        {/* 3 Wide Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          
          {/* Starter Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 flex flex-col justify-between hover:shadow-lg transition-all transform-gpu will-change-transform">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-slate-950">Starter</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700">
                  Hard Cap: 15 Slots
                </span>
              </div>
              
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">$49</span>
                <span className="text-slate-500 text-sm font-semibold">/ lifetime</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                One-time payment • Never pay monthly
              </p>

              {/* Progress bar */}
              <div className="mt-5 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">11 / 15 Claimed</span>
                  <span className="text-amber-600 font-bold">Only 4 left!</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full w-[73%]" />
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  What's included:
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {PLANS.Starter.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              onClick={() => openModal('Starter')}
              className="transform-gpu will-change-transform mt-7 w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-100 hover:bg-slate-200 text-slate-900 transition-all cursor-pointer flex items-center justify-center active:scale-98"
            >
              Claim Starter Slot ($49)
            </button>
          </div>

          {/* Pro Card (Founder's Choice) */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-100/70 flex flex-col justify-between relative hover:shadow-2xl transition-all transform-gpu will-change-transform">
            
            {/* Founder's Choice Pill */}
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-extrabold px-4 py-1 rounded-full uppercase tracking-wider shadow-md shadow-indigo-600/30 flex items-center gap-1.5 whitespace-nowrap">
              <Sparkles className="w-3 h-3 text-amber-300" />
              Founder's Choice
            </div>

            <div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-slate-950">Pro</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                  Hard Cap: 10 Slots
                </span>
              </div>
              
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">$119</span>
                <span className="text-slate-500 text-sm font-semibold">/ lifetime</span>
              </div>
              <p className="text-xs text-indigo-600 font-semibold mt-1">
                Save $40 vs Wave 2 ($159)
              </p>

              {/* Progress bar */}
              <div className="mt-5 p-3 rounded-2xl bg-indigo-50/50 border border-indigo-100">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">6 / 10 Claimed</span>
                  <span className="text-indigo-600 font-bold">4 Left</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-indigo-600 h-full w-[60%]" />
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-indigo-600 mb-3">
                  Everything in Starter, plus:
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {PLANS.Pro.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              onClick={() => openModal('Pro')}
              className="transform-gpu will-change-transform mt-7 w-full min-h-[44px] py-3 px-4 rounded-xl font-bold text-xs sm:text-sm bg-indigo-600 hover:bg-indigo-500 text-white transition-all shadow-lg shadow-indigo-600/30 cursor-pointer flex items-center justify-center active:scale-98"
            >
              Claim Pro Slot ($119)
            </button>
          </div>

          {/* Agency Card */}
          <div className="rounded-3xl p-6 sm:p-8 bg-white border border-slate-200/90 flex flex-col justify-between hover:shadow-lg transition-all transform-gpu will-change-transform">
            <div>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-slate-950">Agency</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
                  Hard Cap: 5 Slots
                </span>
              </div>
              
              <div className="mt-4 flex items-baseline gap-1.5">
                <span className="text-4xl sm:text-5xl font-extrabold text-slate-950">$249</span>
                <span className="text-slate-500 text-sm font-semibold">/ lifetime</span>
              </div>
              <p className="text-xs text-rose-600 font-semibold mt-1">
                Next wave jumps to $299+
              </p>

              {/* Progress bar */}
              <div className="mt-5 p-3 rounded-2xl bg-rose-50/50 border border-rose-100">
                <div className="flex justify-between text-xs font-semibold mb-1.5">
                  <span className="text-slate-700">4 / 5 Claimed</span>
                  <span className="text-rose-600 font-extrabold">LAST SEAT!</span>
                </div>
                <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full w-[80%]" />
                </div>
              </div>

              <div className="mt-6 pt-5 border-t border-slate-100">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Everything in Pro, plus:
                </div>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-600">
                  {PLANS.Agency.features.map((feat, idx) => (
                    <li key={idx} className="flex items-center gap-2.5">
                      <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <button 
              onClick={() => openModal('Agency')}
              className="transform-gpu will-change-transform mt-7 w-full min-h-[44px] py-2.5 px-4 rounded-xl font-bold text-xs sm:text-sm bg-slate-950 hover:bg-slate-800 text-white transition-all cursor-pointer flex items-center justify-center active:scale-98"
            >
              Claim Agency Slot ($249)
            </button>
          </div>

        </div>

        {/* Deliverability Trust Badge */}
        <div className="bg-slate-50 border border-slate-200/80 rounded-2xl p-4 sm:p-5 text-center max-w-xl mx-auto mt-10">
          <div className="inline-flex items-center justify-center gap-2 mb-1.5">
            <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-3.5 h-3.5" />
            </div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900">
              &lt; 2% Hard Bounce Rate Guarantee
            </h3>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed max-w-md mx-auto">
            Every verified email is checked directly against active recipient mailboxes in real time so your sender reputation stays safe.
          </p>
          <div className="mt-3 pt-3 border-t border-slate-200/60 inline-flex items-center justify-center text-[11px] font-semibold text-slate-500">
            <span>🔒 No Credit Card Required Today • Instant Wave 1 Slot Reservation</span>
          </div>
        </div>

      </section>

      {/* ========================================================= */}
      {/* 7. FOOTER                                                 */}
      {/* ========================================================= */}
      <footer className="py-10 border-t border-slate-200/70 bg-white text-center text-xs text-slate-500">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 font-bold text-slate-900">
            <div className="w-6 h-6 rounded-lg bg-slate-950 text-white flex items-center justify-center">
              <GhostIcon className="w-3.5 h-3.5" />
            </div>
            <span>GhostLead</span>
            <span className="text-slate-400 font-normal">© 2026. Zero-bounce prospecting infrastructure.</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <a href="#sandbox" className="hover:text-slate-950 transition-colors">Sandbox</a>
            <a href="#features" className="hover:text-slate-950 transition-colors">Features</a>
            <a href="#pricing" className="hover:text-slate-950 transition-colors">Wave 1 Matrix</a>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <span className="text-slate-400 font-medium">99.4% Deliverability Guaranteed</span>
          </div>
        </div>
      </footer>

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
                      <span>⚡ Free Checks Limit Reached (5/5)</span>
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
                      ? "Lock your Wave 1 early-bird lifetime rate today before slots close to get unlimited verification."
                      : "Reserve your Wave 1 early-bird rate before this tier locks. Zero upfront payment today."}
                  </p>

                  {/* Plan Selection Pills */}
                  <div className="mt-5">
                    <label className="block text-[11px] font-bold text-slate-700 uppercase mb-2">
                      Selected Tier:
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {(['Starter', 'Pro', 'Agency']).map((tierKey) => {
                        const plan = PLANS[tierKey];
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
                            <div className="text-xs font-bold">{plan.name}</div>
                            <div className="text-sm font-extrabold text-slate-950 mt-0.5">${plan.price}</div>
                            <div className="text-[10px] text-slate-500 truncate">{plan.tag}</div>
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
                      ) : (
                        <>
                          <span>Claim Wave 1 Slot (${PLANS[selectedTier].price})</span>
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
                      Good news! This email is already on the Wave 1 early-bird waitlist. We have verified your spot and refreshed your priority token.
                    </p>
                  ) : (
                    <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                      We will notify you 2 hours prior to public launch to lock your early-bird rate.
                    </p>
                  )}

                  <div className="mt-5 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-left text-slate-700 space-y-2">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Selected Tier:</span>
                      <span className="font-bold text-indigo-700">{selectedTier} (${PLANS[selectedTier].price} Lifetime)</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Contact Email:</span>
                      <span className="font-mono font-semibold text-slate-950 break-all">{emailInput}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Wave 1 Discount:</span>
                      <span className="font-bold text-emerald-600">Locked In</span>
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
