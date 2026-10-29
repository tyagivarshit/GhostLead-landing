import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

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
 * Modern Floating 3D Glassmorphic Sticky Navbar with Responsive Mobile Navigation.
 * 
 * - Fixed container: fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-4 pointer-events-none
 * - Glassmorphic capsule: bg-white/80 backdrop-blur-2xl border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)]
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef(null);
  const isClosed = Boolean(waveMetrics?.isClosed);

  // Close mobile menu on desktop resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!isMobileMenuOpen) return;

    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (e, view, hash = '') => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (typeof onNavigate === 'function') {
      onNavigate(view, hash);
    }
  };

  return (
    <div 
      ref={navRef}
      data-testid="floating-navbar-container"
      className="fixed top-3 sm:top-5 inset-x-0 z-50 flex flex-col items-center px-3 sm:px-4 pointer-events-none"
    >
      <header 
        data-testid="navbar-glass-capsule"
        className="pointer-events-auto w-full max-w-5xl rounded-full transition-all duration-300 bg-white/80 backdrop-blur-2xl border border-black/[0.06] shadow-[0_10px_30px_-10px_rgba(0,0,0,0.05)] px-3.5 sm:px-6 py-2 sm:py-3 flex items-center justify-between transform-gpu will-change-transform"
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

        {/* Center: Desktop smooth scroll anchor navigation links */}
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

        {/* Right: Primary Action CTA + Mobile Hamburger Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
          <button 
            type="button"
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenModal('Pro');
            }}
            className="transform-gpu will-change-transform inline-flex items-center gap-1 px-3 sm:px-5 py-1.5 sm:py-2.5 text-xs sm:text-sm rounded-full font-semibold bg-[#1d1d1f] hover:bg-black text-white shadow-sm transition-all cursor-pointer flex-shrink-0 active:scale-98"
          >
            <span>{isClosed ? 'Join Waitlist →' : 'Claim Slot →'}</span>
          </button>

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="flex md:hidden items-center justify-center p-2 rounded-xl text-slate-700 hover:text-black hover:bg-slate-100 transition-colors cursor-pointer"
          >
            {isMobileMenuOpen ? (
              <X className="w-5 h-5 text-slate-900" />
            ) : (
              <Menu className="w-5 h-5 text-slate-900" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Slide/Dropdown Glassmorphic Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="pointer-events-auto md:hidden w-full max-w-5xl mt-2 p-3 sm:p-4 rounded-2xl bg-white/95 backdrop-blur-2xl border border-black/[0.06] shadow-xl space-y-2 transform-gpu will-change-transform"
          >
            <div className="flex flex-col space-y-1">
              <a
                href="/#sandbox"
                onClick={(e) => handleNavClick(e, 'home', '#sandbox')}
                className="flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-[#1d1d1f] hover:bg-slate-100/80 transition-colors"
              >
                Live Sandbox
              </a>
              <a
                href="/#features"
                onClick={(e) => handleNavClick(e, 'home', '#features')}
                className="flex items-center px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-700 hover:text-[#1d1d1f] hover:bg-slate-100/80 transition-colors"
              >
                Features
              </a>
              <a
                href="/pricing"
                onClick={(e) => handleNavClick(e, 'pricing')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  currentView === 'pricing'
                    ? 'text-indigo-600 bg-indigo-50/80 font-semibold'
                    : 'text-slate-700 hover:text-[#1d1d1f] hover:bg-slate-100/80'
                }`}
              >
                <span>Pricing</span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </a>
            </div>

            <div className="pt-2 border-t border-black/[0.04]">
              <button
                type="button"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenModal('Pro');
                }}
                className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm bg-[#1d1d1f] hover:bg-black text-white shadow-sm transition-all cursor-pointer flex items-center justify-center gap-1.5 active:scale-98"
              >
                <span>{isClosed ? 'Join Waitlist →' : 'Claim Slot →'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
