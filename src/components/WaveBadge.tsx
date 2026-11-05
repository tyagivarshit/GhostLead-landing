interface WaveBadgeProps {
  href?: string;
  className?: string;
}

export default function WaveBadge({
  href = '#pricing',
  className = '',
}: WaveBadgeProps) {
  return (
    <a
      href={href}
      aria-label="Early Founder Access — 30 Slots Only • From $49. Lock $0 Spot."
      className={`group inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-sky-200/80 bg-sky-50/80 hover:bg-sky-100/90 backdrop-blur-sm shadow-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 ${className}`.trim()}
    >
      {/* Left text */}
      <span className="text-xs sm:text-sm font-semibold text-slate-800 tracking-tight">
        Early Founder Access
      </span>

      {/* Divider */}
      <span aria-hidden="true" className="h-3.5 w-[1px] bg-slate-300" />

      {/* Middle text */}
      <span className="text-xs sm:text-sm font-normal text-slate-600">
        30 Slots Only • From $49
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
