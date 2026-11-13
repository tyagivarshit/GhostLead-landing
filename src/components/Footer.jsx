/**
 * 3-Column Dark-Navy Footer Component with Brand, Product, Legal Navigation & Social Links.
 * 
 * @param {{
 *   currentView?: 'home' | 'agency' | 'pricing' | 'legal',
 *   onNavigate?: (view: 'home' | 'agency' | 'pricing' | 'legal', hash?: string) => void
 * }} props
 */
export function Footer({ currentView = 'home', onNavigate }) {
  const handleNav = (e, view, hash = '') => {
    e.preventDefault();
    if (typeof onNavigate === 'function') {
      onNavigate(view, hash);
    } else if (typeof window !== 'undefined') {
      let targetPath = '/';
      if (view === 'pricing') targetPath = '/pricing';
      else if (view === 'agency') targetPath = '/agency';
      else if (view === 'legal') targetPath = '/terms';
      else if (hash) targetPath = `/${hash}`;
      window.history.pushState({ view }, '', targetPath);
      if (hash) {
        const el = document.querySelector(hash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handleSandboxClick = (e) => {
    e.preventDefault();
    if (currentView === 'home') {
      const el = document.getElementById('sandbox');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (typeof window !== 'undefined' && window.location.hash !== '#sandbox') {
        window.history.pushState({ view: 'home' }, '', '/#sandbox');
      }
    } else if (typeof onNavigate === 'function') {
      onNavigate('home', '#sandbox');
    } else if (typeof window !== 'undefined') {
      window.history.pushState({ view: 'home' }, '', '/#sandbox');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleAgencyClick = (e) => {
    e.preventDefault();
    if (currentView === 'agency') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (typeof onNavigate === 'function') {
      onNavigate('agency');
    } else if (typeof window !== 'undefined') {
      window.history.pushState({ view: 'agency' }, '', '/agency');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#060B19] text-slate-400 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        
        {/* 3-Column Grid: Stacked on Mobile, 3 Columns on Tablet/Desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          
          {/* Column 1: Left - GhostLead Logo & Tagline */}
          <div className="flex flex-col items-start">
            <a
              href="/"
              onClick={(e) => handleNav(e, 'home')}
              className="flex items-center gap-2 cursor-pointer hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded"
              aria-label="GhostLead Home"
            >
              <img 
                src="/logo.png" 
                alt="GhostLead" 
                className="w-7 h-7 object-contain drop-shadow-sm" 
              />
              <span className="text-base tracking-tight flex items-center gap-0.5 font-bold">
                <span className="text-white font-extrabold">Ghost</span>
                <span className="bg-gradient-to-r from-blue-400 via-sky-300 to-cyan-300 bg-clip-text text-transparent font-extrabold">
                  Lead
                </span>
              </span>
            </a>
            <p className="text-sm text-slate-400 mt-3 max-w-xs leading-relaxed">
              Stateless, zero-bounce executive prospecting infrastructure.
            </p>
          </div>

          {/* Column 2: Middle - PRODUCT */}
          <div className="flex flex-col items-start">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              PRODUCT
            </h3>
            <ul className="mt-4 space-y-2.5">
              <li>
                <a
                  href="/#sandbox"
                  onClick={handleSandboxClick}
                  className="text-sm text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded block"
                >
                  Live Sandbox
                </a>
              </li>
              <li>
                <a
                  href="/pricing"
                  onClick={(e) => handleNav(e, 'pricing')}
                  className="text-sm text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded block"
                >
                  Pricing (LTD)
                </a>
              </li>
              <li>
                <a
                  href="/agency"
                  onClick={handleAgencyClick}
                  className="text-sm text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded block"
                >
                  Agency Data Desk
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Right - LEGAL & SUPPORT */}
          <div className="flex flex-col items-start">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              LEGAL &amp; SUPPORT
            </h3>
            <div className="mt-4 space-y-4">
              <div>
                <a
                  href="/terms"
                  onClick={(e) => handleNav(e, 'legal', '#terms')}
                  className="text-sm text-slate-400 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded block"
                >
                  Terms, Privacy &amp; Refund Policy
                </a>
              </div>
              <div>
                <p className="text-xs text-slate-400">Questions or Support?</p>
                <a
                  href="mailto:contact@ghostlead.co"
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded mt-0.5 inline-block"
                >
                  contact@ghostlead.co
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Divider */}
        <hr className="border-t border-white/10 my-8 lg:my-10" />

        {/* Bottom Bar: Stacked on Mobile, Row on Desktop */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Left: Copyright */}
          <p className="text-xs text-slate-400 text-center sm:text-left">
            © 2026 GhostLead. All rights reserved.
          </p>

          {/* Right: Credits & Social Icon Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2 text-xs text-slate-400">
            <span>Built by GhostLead</span>
            <span className="text-slate-600" aria-hidden="true">•</span>
            {/* OWNER CONFIGURATION: Swap or insert the founder's name below (e.g., "Follow Founder (Name):") and replace company URLs with personal profiles if desired */}
            <span>Follow Founder:</span>
            <div className="flex items-center gap-1.5 ml-1">
              <a
                href="https://x.com/GhostLeadHQ"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GhostLead on X"
                className="p-1 text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/ghostlead"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow GhostLead on LinkedIn"
                className="p-1 text-slate-400 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded transition-colors inline-flex items-center justify-center"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;
