/**
 * Shared SVG defs rendered once in the root layout. Motif art references these by id:
 * engraved hatching and stipple (standing in for flat colour fills) and a slight
 * ink-bleed displacement so vector lines read as printed, not plotted.
 * Colours are literal because pattern content resolves against this element, and
 * flash art is always printed bone-on-black.
 */
export function InkDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" className="pointer-events-none absolute h-0 w-0 overflow-hidden">
      <defs>
        <pattern id="mn-hatch" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="5" stroke="#ECE7DE" strokeWidth="1.5" />
        </pattern>
        <pattern id="mn-hatch-dark" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
          <line x1="0" y1="0" x2="0" y2="4" stroke="#0A0A0A" strokeWidth="1.3" />
        </pattern>
        <pattern id="mn-stipple" width="6" height="6" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.05" fill="#ECE7DE" />
          <circle cx="4.5" cy="4.5" r="1.05" fill="#ECE7DE" />
        </pattern>
        <filter id="mn-bleed" x="-5%" y="-5%" width="110%" height="110%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </defs>
    </svg>
  );
}
