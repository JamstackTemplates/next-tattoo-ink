/**
 * Midnight Needle wordmark: a ringed seal with a crescent moon run through by a
 * needle-dagger and one red drop, beside "Midnight Needle" in Pirata One.
 * Always sits on a black band.
 */
export function WordmarkSeal({ className = 'h-10 w-10' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={`shrink-0 ${className}`} aria-hidden="true">
      <mask id="mn-seal-crescent">
        <rect width="48" height="48" fill="black" />
        <circle cx="24" cy="25" r="12.5" fill="white" />
        <circle cx="29.5" cy="21.5" r="10.5" fill="black" />
      </mask>
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="#ECE7DE" strokeWidth="1.4" />
      <circle cx="24" cy="24" r="19.5" fill="none" stroke="#ECE7DE" strokeWidth="1" strokeDasharray="0.6 2.6" strokeLinecap="round" />
      <circle cx="24" cy="25" r="12.5" fill="#ECE7DE" mask="url(#mn-seal-crescent)" />
      {/* Needle-dagger */}
      <path d="M22.4 4h3.2v4h-3.2z" fill="#ECE7DE" />
      <path d="M17 10.5h14" stroke="#ECE7DE" strokeWidth="2.4" strokeLinecap="round" />
      <path d="M22.3 12h3.4l-.4 24-1.3 4.5-1.3-4.5z" fill="#070707" stroke="#ECE7DE" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M24 41.5c-1.4 2-1.8 3.4 0 4.2 1.8-.8 1.4-2.2 0-4.2Z" fill="#E0242B" />
    </svg>
  );
}

export function Wordmark({
  compact = false,
  className = '',
}: {
  compact?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <WordmarkSeal className={compact ? 'h-10 w-10' : 'h-12 w-12'} />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-wall-ink ${compact ? 'text-2xl sm:text-[1.7rem]' : 'text-3xl sm:text-4xl'}`}>
          Midnight Needle
        </span>
        <span className="mt-1 font-label text-[0.6rem] tracking-[0.32em] uppercase text-wall-muted">
          Tattoo · Seattle
        </span>
      </span>
    </span>
  );
}
