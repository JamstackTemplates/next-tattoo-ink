import type { StyleId } from '../../content/styles';

/**
 * Small single-ink emblems for the seven studio styles, drawn in currentColor
 * with one red accent each. Used in the Home style index.
 */
export function StyleEmblem({
  styleId,
  className = 'h-14 w-14',
}: {
  styleId: StyleId;
  className?: string;
}) {
  const red = 'var(--art-red)';
  const common = {
    viewBox: '0 0 64 64',
    className,
    'aria-hidden': true as const,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  switch (styleId) {
    case 'traditional':
      // Rose head, bold and closed
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="17" />
          <path d="M22 28c3-7 17-7 20 0-3 5-17 5-20 0Z" />
          <path d="M20 36c6 6 18 6 24 0" />
          <path d="M28 31c2 2 6 2 8 0" />
          <circle cx="32" cy="29" r="3.5" fill={red} stroke="none" />
          <path d="M15 42c-5 4-6 9-3 11 5 0 8-3 10-7M49 42c5 4 6 9 3 11-5 0-8-3-10-7" />
        </svg>
      );
    case 'blackwork':
      return (
        <svg {...common}>
          <polygon points="32,6 56,32 32,58 8,32" fill="currentColor" />
          <polygon points="32,17 45,32 32,47 19,32" fill="var(--bg)" stroke="none" />
          <polygon points="32,25 38,32 32,39 26,32" fill={red} stroke="none" />
        </svg>
      );
    case 'fine-line':
      return (
        <svg {...common} strokeWidth={1.2}>
          <path d="M32 56V10" />
          <path d="M32 44c-9-1-13-7-12-13 6 1 11 5 12 13Z" />
          <path d="M32 35c9-1 13-7 12-13-6 1-11 5-12 13Z" />
          <path d="M32 25c-7-2-10-7-9-12 5 1 8 5 9 12Z" />
          <circle cx="32" cy="8" r="1.8" fill={red} stroke="none" />
        </svg>
      );
    case 'neo-traditional':
      return (
        <svg {...common}>
          <path d="M32 54S12 40 12 24c0-7.5 6-12.5 12-12.5 3.8 0 6.5 2 8 5 1.5-3 4.2-5 8-5 6 0 12 5 12 12.5 0 16-20 30-20 30Z" fill={red} />
          <path d="M32 22l7 9-7 11-7-11Z" fill="var(--bg)" />
          <path d="M18 23c1-3 3-5 6-5" />
        </svg>
      );
    case 'dotwork':
      return (
        <svg {...common}>
          <circle cx="32" cy="32" r="23" strokeDasharray="0.5 4.5" strokeWidth={2.4} />
          <circle cx="32" cy="32" r="15" strokeDasharray="0.5 3.4" strokeWidth={2.4} />
          <circle cx="32" cy="32" r="8" />
          <circle cx="32" cy="32" r="3" fill={red} stroke="none" />
        </svg>
      );
    case 'japanese':
      // Curling wave crest
      return (
        <svg {...common}>
          <path d="M6 48c8-18 22-30 38-28 5 .6 9 4 9 9 0 4-3 7-7 7-3 0-5-2-5-5 0-2 1.5-3.5 3.5-3.5-5-2-12 2-15 9 7-3 15-2 23 3" />
          <path d="M12 52c8-7 18-8 28-4M6 58h52" />
          <circle cx="16" cy="16" r="5" fill={red} stroke="none" />
        </svg>
      );
    case 'lettering':
      return (
        <svg {...common}>
          <path d="M8 20h48v24H8Z" />
          <path d="M8 20l-4 12 4 12M56 20l4 12-4 12" />
          <text x="32" y="38.5" textAnchor="middle" fill="currentColor" stroke="none" fontFamily="var(--font-display)" fontSize="19">
            Ink
          </text>
          <path d="M18 50h28" stroke={red} />
        </svg>
      );
  }
}
