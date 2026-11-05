import type { MouseEvent } from 'react';

interface WaveBadgeProps {
  href?: string;
  className?: string;
  onOpenModal?: () => void;
}

export default function WaveBadge({
  href = '#pricing',
  className = '',
  onOpenModal,
}: WaveBadgeProps) {
  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (onOpenModal) {
      e.preventDefault();
      onOpenModal();
    }
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      aria-label="Early Founder Access — 30 Slots Only • From $69. Lock $0 Spot."
      className={`group inline-flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-4 py-1.5 rounded-full border border-sky-200/80 bg-sky-50/80 hover:bg-sky-100/90 backdrop-blur-sm shadow-sm transition-colors duration-200 whitespace-nowrap max-w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`.trim()}
    >
      {/* Mobile compact text (< 640px) */}
      <span className="text-xs sm:hidden font-semibold text-slate-800 tracking-tight">
        Early Access • 30 Slots Left
      </span>

      {/* Desktop left text (>= 640px) */}
      <span className="hidden sm:inline text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
        Early Founder Access
      </span>

      {/* Divider (>= 640px) */}
      <span aria-hidden="true" className="hidden sm:inline-flex h-3.5 w-[1px] bg-slate-300" />

      {/* Middle text (>= 640px) */}
      <span className="hidden sm:inline text-xs sm:text-sm font-normal text-slate-600">
        30 Slots Only • From $69
      </span>

      {/* Right action */}
      <span className="text-xs sm:text-sm font-semibold text-blue-600 group-hover:text-blue-700 ml-1 inline-flex items-center gap-1">
        <span>Lock $0 Spot</span>
        <span
          aria-hidden="true"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        >
          →
        </span>
      </span>
    </a>
  );
}
