/**
 * Universal Footer Component with Clean Brand & Legal Navigation.
 * 
 * @param {{
 *   onNavigate: (view: 'home' | 'pricing' | 'legal', hash?: string, tab?: 'terms' | 'privacy') => void
 * }} props
 */
export function Footer({ onNavigate }) {
  const handleNav = (e, view, hash = '', tab = null) => {
    e.preventDefault();
    if (typeof onNavigate === 'function') {
      onNavigate(view, hash, tab);
    }
  };

  return (
    <footer className="py-12 border-t border-black/[0.06] bg-[#fbfbfd] text-xs text-[#86868b]">
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6">
        
        {/* Left: Logo & Copyright */}
        <div className="flex flex-col sm:flex-row items-center gap-3 font-medium text-[#1d1d1f] text-center sm:text-left">
          <button
            type="button"
            onClick={(e) => handleNav(e, 'home')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
            aria-label="GhostLead Home"
          >
            <img 
              src="/logo.png" 
              alt="GhostLead" 
              className="w-6 h-6 object-contain drop-shadow-sm" 
            />
            <span className="text-sm tracking-tight flex items-center gap-0.5 font-bold">
              <span className="text-slate-800 font-extrabold">Ghost</span>
              <span className="bg-gradient-to-r from-blue-600 via-sky-500 to-cyan-500 bg-clip-text text-transparent font-extrabold">
                Lead
              </span>
            </span>
          </button>
          <span className="text-[#86868b] font-normal">
            © 2026. Stateless, zero-bounce executive prospecting infrastructure.
          </span>
        </div>

        {/* Right: Single Clean Legal Link */}
        <div className="flex items-center text-[#6e6e73]">
          <a 
            href="/privacy" 
            onClick={(e) => handleNav(e, 'legal', '#privacy')} 
            className="hover:text-[#1d1d1f] transition-colors cursor-pointer font-medium"
          >
            Privacy &amp; Terms
          </a>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
