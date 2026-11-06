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
    <footer className="bg-slate-950 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 md:py-12">
        {/* Tier 1 (Upper) */}
        <div className="flex flex-col gap-8 md:flex-row md:justify-between md:items-start">
          
          {/* Left Column: Logo & Tagline */}
          <div className="flex flex-col items-start">
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
            <p className="text-sm text-zinc-400 mt-2 max-w-xs">
              Stateless, zero-bounce executive prospecting infrastructure.
            </p>
          </div>

          {/* Right Column: Contact Line & Socials */}
          <div className="flex flex-col gap-4 items-start text-left md:items-end md:text-right">
            <p className="text-sm text-zinc-400 break-words">
              Questions or Support?{' '}
              <a 
                href="mailto:contact@ghostlead.co" 
                className="text-blue-500 hover:text-blue-400 font-medium transition-colors"
              >
                contact@ghostlead.co
              </a>
            </p>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-t border-zinc-800 my-6" />

        {/* Tier 2 (Lower) */}
        <div className="flex flex-col gap-3 items-start md:flex-row md:justify-between md:items-center">
          
          {/* Left: Copyright */}
          <p className="text-xs text-zinc-500">
            © 2026 GhostLead. All rights reserved.
          </p>

          {/* Right: Legal Links */}
          <div className="flex items-center gap-4">
            <a 
              href="/privacy" 
              onClick={(e) => handleNav(e, 'legal', '#privacy')} 
              className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              Privacy Policy
            </a>
            <a 
              href="/terms" 
              onClick={(e) => handleNav(e, 'legal', '#terms')} 
              className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors"
            >
              Terms of Service
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}

export default Footer;
