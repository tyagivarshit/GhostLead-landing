import { GhostIcon } from './Navbar';

/**
 * Universal Footer Component with Airtight Legal & Route Navigation.
 * 
 * @param {{
 *   waveMetrics?: {
 *     waveName?: string,
 *     isClosed?: boolean
 *   },
 *   onNavigate: (view: 'home' | 'pricing' | 'legal', hash?: string, tab?: 'terms' | 'privacy') => void
 * }} props
 */
export function Footer({ waveMetrics, onNavigate }) {
  const isClosed = Boolean(waveMetrics?.isClosed);
  const waveName = waveMetrics?.waveName || 'Wave 1';

  const handleNav = (e, view, hash = '', tab = null) => {
    e.preventDefault();
    if (typeof onNavigate === 'function') {
      onNavigate(view, hash, tab);
    }
  };

  return (
    <footer className="py-12 border-t border-slate-200/70 bg-white text-xs text-slate-500">
      <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 font-medium text-slate-900 text-center sm:text-left">
          <button
            type="button"
            onClick={(e) => handleNav(e, 'home')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
            aria-label="GhostLead Home"
          >
            <div className="w-7 h-7 rounded-lg bg-slate-950 text-white flex items-center justify-center shadow-xs">
              <GhostIcon className="w-4 h-4" />
            </div>
            <span className="font-bold text-slate-950 text-sm">GhostLead</span>
          </button>
          <span className="text-slate-400 font-normal">
            © 2026. Stateless, zero-bounce executive prospecting infrastructure.
          </span>
        </div>

        {/* Right: Navigation & Legal Links */}
        <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-5 sm:gap-x-6 text-slate-600">
          <a 
            href="/#sandbox" 
            onClick={(e) => handleNav(e, 'home', '#sandbox')} 
            className="hover:text-slate-950 transition-colors cursor-pointer"
          >
            Sandbox
          </a>
          <a 
            href="/#features" 
            onClick={(e) => handleNav(e, 'home', '#features')} 
            className="hover:text-slate-950 transition-colors cursor-pointer"
          >
            Features
          </a>
          <a 
            href="/pricing" 
            onClick={(e) => handleNav(e, 'pricing')} 
            className="hover:text-slate-950 transition-colors cursor-pointer font-medium text-slate-700"
          >
            {isClosed ? 'Pricing Matrix' : `${waveName} Matrix`}
          </a>
          
          <span className="text-slate-300 hidden sm:inline">|</span>

          {/* Legal Links */}
          <a 
            href="/privacy" 
            onClick={(e) => handleNav(e, 'legal', '', 'privacy')} 
            className="hover:text-indigo-600 transition-colors cursor-pointer font-medium"
          >
            Privacy Policy
          </a>
          <a 
            href="/terms" 
            onClick={(e) => handleNav(e, 'legal', '', 'terms')} 
            className="hover:text-indigo-600 transition-colors cursor-pointer font-medium"
          >
            Terms of Service
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
