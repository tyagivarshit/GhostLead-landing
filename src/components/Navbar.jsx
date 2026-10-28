/**
 * GhostLead mascot logo icon
 */
export function GhostIcon({ className = "w-6 h-6" }) {
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

/**
 * Modern Floating 3D Glassmorphic Sticky Navbar.
 * 
 * - Fixed container: fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none
 * - Glassmorphic capsule: bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-white/10
 * - 3D shadow: shadow-[0_12px_30px_-6px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.06)]
 * 
 * @param {{
 *   waveMetrics?: {
 *     waveName?: string,
 *     isClosed?: boolean
 *   },
 *   onOpenModal: (tier?: string) => void,
 *   onOpenPricingModal?: () => void
 * }} props
 */
export function Navbar({ waveMetrics, onOpenModal, onOpenPricingModal }) {
  const isClosed = Boolean(waveMetrics?.isClosed);
  const waveName = waveMetrics?.waveName || 'Wave 1';
  const waveTagText = isClosed ? '[Waitlist]' : `[${waveName}]`;

  return (
    <div 
      data-testid="floating-navbar-container"
      className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <header 
        data-testid="navbar-glass-capsule"
        className="pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/60 dark:border-white/10 shadow-[0_12px_30px_-6px_rgba(0,0,0,0.12),0_4px_10px_rgba(0,0,0,0.06)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transform-gpu will-change-transform"
      >
        {/* Left: GhostLead logo icon + bold title "GhostLead" + rounded wave badge */}
        <a 
          href="#" 
          className="flex items-center gap-2 group flex-shrink-0"
          aria-label="GhostLead Home"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-slate-950 via-slate-900 to-indigo-950 dark:from-white dark:to-slate-200 text-white dark:text-slate-950 flex items-center justify-center shadow-md shadow-slate-950/20 group-hover:scale-105 transition-transform flex-shrink-0">
            <GhostIcon className="w-4 h-4" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-extrabold tracking-tight text-slate-950 dark:text-white">
              GhostLead
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-slate-100/90 dark:bg-slate-800/90 text-slate-700 dark:text-slate-300 px-2.5 py-0.5 rounded-full border border-slate-200/70 dark:border-slate-700/60 shadow-2xs">
              {waveTagText}
            </span>
          </div>
        </a>

        {/* Center: Smooth scroll anchor navigation links */}
        <nav 
          aria-label="Main Navigation" 
          className="hidden md:flex items-center gap-7 text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300"
        >
          <a 
            href="#sandbox" 
            className="hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            Live Sandbox
          </a>
          <a 
            href="#features" 
            className="hover:text-slate-950 dark:hover:text-white transition-colors"
          >
            Features
          </a>
          <a 
            href="#pricing" 
            onClick={(e) => {
              e.preventDefault();
              if (typeof onOpenPricingModal === 'function') {
                onOpenPricingModal();
              }
            }}
            className="hover:text-slate-950 dark:hover:text-white transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Pricing</span>
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
          </a>
        </nav>

        {/* Right: Primary Action CTA */}
        <div className="flex items-center flex-shrink-0">
          <button 
            type="button"
            onClick={() => onOpenModal('Pro')}
            className="transform-gpu will-change-transform inline-flex items-center gap-1.5 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-full font-bold bg-slate-950 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 shadow-md shadow-slate-950/20 dark:shadow-white/10 transition-all cursor-pointer flex-shrink-0 active:scale-98"
          >
            <span>{isClosed ? 'Join Waitlist →' : 'Claim Slot →'}</span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
