interface WaveBadgeProps {
  href?: string;
  className?: string;
}

export default function WaveBadge({
  href = '#reserve',
  className = '',
}: WaveBadgeProps) {
  return (
    <a
      href={href}
      aria-label="[Wave 1 Beta] 30 Founder Passes Left — 70% Off Lifetime Access. Lock $0 Spot."
      className={`group inline-flex flex-wrap sm:flex-nowrap items-center justify-center gap-2 sm:gap-2.5 rounded-full border border-slate-700/80 bg-slate-900/50 px-3.5 py-1.5 text-xs text-slate-300 backdrop-blur-md transition-all duration-300 hover:border-slate-600 hover:shadow-lg hover:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${className}`.trim()}
    >
      {/* Left: Animated live indicator */}
      <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
        <span className="animate-ping motion-reduce:animate-none absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>

      {/* Left text */}
      <span className="font-medium text-slate-200">
        [Wave 1 Beta] 30 Founder Passes Left
      </span>

      {/* Separator */}
      <span className="hidden sm:inline-block h-3 w-[1px] bg-slate-700" aria-hidden="true" />

      {/* Middle text */}
      <span className="text-slate-400">
        70% Off Lifetime Access
      </span>

      {/* Right action */}
      <span className="inline-flex items-center gap-1 font-medium text-emerald-400">
        <span>Lock $0 Spot</span>
        <span
          className="inline-block transition-transform duration-300 group-hover:translate-x-1"
          aria-hidden="true"
        >
          →
        </span>
      </span>
    </a>
  );
}
