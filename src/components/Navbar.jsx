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
 *   currentView?: 'home' | 'pricing',
 *   onNavigate?: (view: 'home' | 'pricing', hash?: string) => void,
 *   onOpenModal: (tier?: string) => void
 * }} props
 */
export function Navbar({ waveMetrics, currentView = 'home', onNavigate, onOpenModal }) {
  const isClosed = Boolean(waveMetrics?.isClosed);

  const handleNavClick = (e, view, hash = '') => {
    e.preventDefault();
    if (typeof onNavigate === 'function') {
      onNavigate(view, hash);
    }
  };

  return (
    <div 
      data-testid="floating-navbar-container"
      className="fixed top-3 sm:top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <header 
        data-testid="navbar-glass-capsule"
        className="pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 bg-white/80 backdrop-blur-2xl border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] px-4 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between transform-gpu will-change-transform"
      >
        {/* Left: GhostLead 3D emblem logo + bold title "GhostLead" */}
        <a 
          href="/" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-2 group flex-shrink-0 cursor-pointer"
          aria-label="GhostLead Home"
        >
          <img 
            src="/logo.png" 
            alt="GhostLead Emblem" 
            className="w-8 h-8 sm:w-9 sm:h-9 object-contain drop-shadow-[0_2px_8px_rgba(59,130,246,0.35)] transition-transform duration-200 hover:scale-105" 
          />
          <span className="text-xl sm:text-2xl flex items-center gap-0.5 tracking-tight">
            <span className="text-slate-900 font-extrabold">Ghost</span>
            <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent font-extrabold drop-shadow-[0_1px_8px_rgba(56,189,248,0.25)]">
              Lead
            </span>
          </span>
        </a>

        {/* Center: Smooth scroll anchor navigation links */}
        <nav 
          aria-label="Main Navigation" 
          className="hidden md:flex items-center gap-6 lg:gap-7 text-xs sm:text-sm font-medium text-[#6e6e73]"
        >
          <a 
            href="/#sandbox" 
            onClick={(e) => handleNavClick(e, 'home', '#sandbox')}
            className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
          >
            Live Sandbox
          </a>
          <a 
            href="/#features" 
            onClick={(e) => handleNavClick(e, 'home', '#features')}
            className="hover:text-[#1d1d1f] transition-colors cursor-pointer"
          >
            Features
          </a>
          <a 
            href="/pricing" 
            onClick={(e) => handleNavClick(e, 'pricing')}
            className={`transition-all flex items-center gap-1.5 cursor-pointer rounded-full px-3 py-1 -my-1 ${
              currentView === 'pricing'
                ? 'text-indigo-600 bg-indigo-50/80 font-semibold border border-indigo-200/60 shadow-2xs'
                : 'hover:text-[#1d1d1f]'
            }`}
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
            className="transform-gpu will-change-transform inline-flex items-center gap-1.5 px-4 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm rounded-full font-semibold bg-[#1d1d1f] hover:bg-black text-white shadow-sm transition-all cursor-pointer flex-shrink-0 active:scale-98"
          >
            <span>{isClosed ? 'Join Waitlist →' : 'Claim Slot →'}</span>
          </button>
        </div>
      </header>
    </div>
  );
}

export default Navbar;
