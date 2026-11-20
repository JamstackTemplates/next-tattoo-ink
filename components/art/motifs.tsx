import type { ReactElement } from 'react';
import type { MotifId } from '../../content/motifs';

/** `ink` = bone linework on black stock (colour fills become hatching/stipple); `line` = bare stencil outline. */
export type MotifVariant = 'ink' | 'line';

interface Palette {
  ink: string;
  red: string;
  mustard: string;
  jade: string;
  black: string;
  cream: string;
  sw: number;
  thin: number;
  stencil: boolean;
}

/*
 * Every motif was drawn as traditional flash. Rendered here as a luminance-true
 * print in two inks on black stock: solid black stays black (held by bone lines),
 * skin/highlights print as solid bone, red stays blood red, and the old mustard
 * and jade fills become engraved hatching and stipple (patterns live in InkDefs).
 */
function getPalette(variant: MotifVariant): Palette {
  if (variant === 'line') {
    return {
      ink: 'var(--art-line)',
      red: 'none',
      mustard: 'none',
      jade: 'none',
      black: 'none',
      cream: 'none',
      sw: 1.6,
      thin: 1,
      stencil: true,
    };
  }
  return {
    ink: 'var(--art-line)',
    red: 'var(--art-red)',
    mustard: 'url(#mn-hatch)',
    jade: 'url(#mn-stipple)',
    black: 'var(--art-bg)',
    cream: 'var(--art-line)',
    sw: 2.8,
    thin: 1.4,
    stencil: false,
  };
}

function Swallow(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Accent stars & whip rays */}
      <path d="M24 38l3 2-3 2-2 3-2-3-3-2 3-2 2-3Z" fill={p.mustard} strokeWidth={p.thin} />
      <path d="M168 156l3 2-3 2-2 3-2-3-3-2 3-2 2-3Z" fill={p.red} strokeWidth={p.thin} />
      {/* Far wing */}
      <path d="M98 86C110 52 138 30 176 26c-8 24-22 44-42 56l-10 8Z" fill={p.black} />
      {!p.stencil ? <path d="M126 52l28-14M122 64l24-10" stroke={p.cream} strokeWidth="2.2" /> : null}
      {/* Forked tail */}
      <path d="M74 128L26 154l32-4-16 26 48-34Z" fill={p.black} />
      {/* Body & crimson breast */}
      <path d="M62 126c12-26 36-44 64-48 16-2 30 3 38 12-10 10-20 18-36 26-22 10-44 18-66 10Z" fill={p.cream} />
      <path d="M116 80c18-3 34 2 44 12-8 9-18 15-30 19-9-6-15-16-14-31Z" fill={p.red} />
      {/* Beak & eye */}
      <path d="M158 88l18 4-16 8Z" fill={p.mustard} />
      <circle cx="144" cy="90" r="3.5" fill={p.stencil ? 'none' : 'var(--art-bg)'} />
      {/* Near sweeping wing */}
      <path d="M104 94C84 62 58 42 22 42c12 24 28 42 52 54l16 8Z" fill={p.black} />
      <path d="M40 54c18 6 34 16 48 30" fill="none" stroke={p.stencil ? p.ink : p.mustard} strokeWidth={p.sw} />
      <path d="M54 70c14 6 26 14 38 22" fill="none" stroke={p.stencil ? p.ink : p.red} strokeWidth={p.sw} />
      {/* Stippled breast shading */}
      <g fill={p.ink} stroke="none" opacity={p.stencil ? 0.7 : 0.85}>
        <circle cx="102" cy="112" r="1.7" />
        <circle cx="109" cy="115" r="1.5" />
        <circle cx="95" cy="116" r="1.4" />
        <circle cx="114" cy="109" r="1.3" />
      </g>
    </g>
  );
}

function DaggerRose(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Upper handle & pommel */}
      <circle cx="100" cy="24" r="9" fill={p.mustard} />
      <path d="M93 33h14l-2 28H95Z" fill={p.black} />
      {!p.stencil ? <path d="M95 40h10M95 48h10M95 55h10" stroke={p.mustard} strokeWidth="2.2" /> : null}
      {/* Guard */}
      <path d="M68 62c10-6 54-6 64 0-3 7-10 9-32 9s-29-2-32-9Z" fill={p.mustard} />
      {/* Dagger blade behind rose */}
      <path d="M90 71h20l-2 92-8 20-8-20Z" fill={p.cream} />
      <line x1="100" y1="72" x2="100" y2="178" strokeWidth={p.thin} />
      {!p.stencil ? <path d="M100 72h9l-2 91-7 17Z" fill="url(#mn-hatch-dark)" stroke="none" /> : null}
      {/* Jagged traditional leaves */}
      <path d="M64 102c-22-8-32-2-34 10 12 4 22 10 34 6Z" fill={p.jade} />
      <path d="M136 102c22-8 32-2 34 10-12 4-22 10-34 6Z" fill={p.jade} />
      <path d="M68 134c-16 8-22 18-16 26 12-2 20-6 26-14Z" fill={p.jade} />
      {/* Traditional crimson rose */}
      <path d="M64 114c-8-14 2-32 18-32 8-12 28-12 36 0 16 0 26 18 18 32 4 16-10 32-36 32s-40-16-36-32Z" fill={p.red} />
      <path d="M76 112c2-14 14-20 24-20s22 6 24 20c-8 10-40 10-48 0Z" fill={p.red} />
      <path d="M84 106c4-9 28-9 32 0-6 7-26 7-32 0Z" fill={p.mustard} />
      <path d="M93 108c4 4 10 4 14 0" fill="none" />
      <path d="M72 124c12 10 44 10 56 0" fill="none" />
      {/* Ink blood drops beneath dagger tip */}
      <path d="M100 186c-3 4-4 8 0 10 4-2 3-6 0-10Z" fill={p.red} strokeWidth={p.thin} />
      {/* Whip dots */}
      <g fill={p.ink} stroke="none">
        <circle cx="80" cy="96" r="1.6" />
        <circle cx="120" cy="96" r="1.6" />
        <circle cx="100" cy="134" r="1.7" />
      </g>
    </g>
  );
}

function Panther(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Claw scratch marks behind head */}
      <path d="M36 36l22 24M52 28l18 22M164 36l-22 24" stroke={p.stencil ? p.ink : p.red} strokeWidth={p.sw} />
      {/* Ears */}
      <path d="M46 66L38 40l26 14Z" fill={p.black} />
      <path d="M154 66l8-26-26 14Z" fill={p.black} />
      {/* Panther skull silhouette */}
      <path d="M44 82c4-22 26-34 56-34s52 12 56 34c4 22-8 44-20 56-10 10-20 26-36 26s-26-16-36-26c-12-12-24-34-20-56Z" fill={p.black} />
      {/* Fur brow highlights */}
      {!p.stencil ? (
        <path d="M62 66c10-6 22-8 38-8s28 2 38 8" fill="none" stroke={p.cream} strokeWidth="2.2" opacity="0.65" />
      ) : null}
      {/* Fierce mustard eyes */}
      <path d="M62 84l22 8-18 8Z" fill={p.mustard} />
      <path d="M138 84l-22 8 18 8Z" fill={p.mustard} />
      <circle cx="74" cy="91" r="2.6" fill={p.ink} stroke="none" />
      <circle cx="126" cy="91" r="2.6" fill={p.ink} stroke="none" />
      {/* Snarling muzzle & nose */}
      <path d="M88 104h24l-12 12Z" fill={p.red} />
      <path d="M66 118c8-8 22-10 34-4 12-6 26-4 34 4-4 24-16 38-34 38s-30-14-34-38Z" fill={p.red} />
      {/* Bared fangs */}
      <path d="M74 120l6 18 6-16Z" fill={p.cream} />
      <path d="M126 120l-6 18-6-16Z" fill={p.cream} />
      <path d="M88 122h24v8H88Z" fill={p.cream} />
      <path d="M78 148l5-13 5 13Z" fill={p.cream} />
      <path d="M122 148l-5-13-5 13Z" fill={p.cream} />
      {/* Whiskers */}
      <path d="M24 106l28 4M22 120l28-2M176 106l-28 4M178 120l-28-2" strokeWidth={p.thin} />
    </g>
  );
}

function SacredHeart(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Radiant whip rays */}
      <path d="M100 14v12M54 30l8 10M146 30l-8 10M30 68l12 4M170 68l-12 4" strokeWidth={p.thin} />
      {/* Blazing flames */}
      <path d="M78 74c-6-20 8-34 10-46 10 10 14 20 12 28 8-12 12-26 6-38 18 10 28 32 16 56Z" fill={p.mustard} />
      <path d="M88 74c-2-14 8-22 12-32 6 10 12 18 8 32Z" fill={p.red} />
      {/* Heart body */}
      <path d="M100 172S44 134 44 92c0-22 16-36 34-36 10 0 18 6 22 14 4-8 12-14 22-14 18 0 34 14 34 36 0 42-56 80-56 80Z" fill={p.red} />
      {/* Highlight */}
      {!p.stencil ? <path d="M60 88c2-12 10-18 18-20" fill="none" stroke={p.cream} strokeWidth="3" /> : null}
      {/* Crown of thorns */}
      <path d="M44 102c18 10 94 10 112 0" fill="none" strokeWidth={p.sw} />
      <path d="M48 116c20-12 84-12 104 0" fill="none" strokeWidth={p.sw} />
      <path d="M62 108l-6-9M86 112l-4-10M116 112l6-10M140 108l6-8" strokeWidth={p.thin} />
      {/* Banner scroll across heart */}
      <path d="M32 124h136v22H32Z" fill={p.cream} />
      <path d="M32 124l-10 11 10 11M168 124l10 11-10 11" fill={p.mustard} />
      <path d="M56 135h88" strokeDasharray="4 5" strokeWidth={p.thin} />
    </g>
  );
}

function Anchor(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Twisted mustard rope behind shank */}
      <path d="M114 44c26 8 34 34 10 50-26 16-66 12-66 36 0 18 20 26 42 26" fill="none" stroke={p.stencil ? p.ink : p.mustard} strokeWidth={p.stencil ? 2 : 7} />
      <path d="M114 44c26 8 34 34 10 50-26 16-66 12-66 36 0 18 20 26 42 26" fill="none" stroke={p.ink} strokeWidth={p.thin} strokeDasharray="5 6" />
      {/* Ring */}
      <circle cx="100" cy="34" r="14" fill="none" strokeWidth={p.sw + 1} />
      {/* Crossbar stock */}
      <rect x="64" y="54" width="72" height="12" rx="4" fill={p.black} />
      {/* Shank */}
      <path d="M93 48h14v108H93Z" fill={p.black} />
      {/* Flukes / arms */}
      <path d="M40 114c4 36 28 58 60 58s56-22 60-58l-14 14c-6 20-24 30-46 30s-40-10-46-30Z" fill={p.black} />
      <path d="M34 118l16-14 6 20Z" fill={p.black} />
      <path d="M166 118l-16-14-6 20Z" fill={p.black} />
      {/* Red MIDNIGHT banner */}
      <path d="M32 82c42-10 94-10 136 0v26c-42-10-94-10-136 0Z" fill={p.red} />
      {!p.stencil ? (
        <text x="100" y="99" textAnchor="middle" fill="var(--art-line)" stroke="none" fontFamily="var(--font-cond)" fontSize="14" fontWeight="700" letterSpacing="2">
          MIDNIGHT
        </text>
      ) : (
        <path d="M52 95h96" strokeDasharray="3 4" strokeWidth={p.thin} />
      )}
    </g>
  );
}

function DeathMoth(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Upper wings */}
      <path d="M94 82C66 56 36 44 18 54c4 28 18 48 44 56l30-8Z" fill={p.black} />
      <path d="M106 82c28-26 58-38 76-28-4 28-18 48-44 56l-30-8Z" fill={p.black} />
      {/* Wing markings */}
      <path d="M34 66c16 2 30 10 42 22" fill="none" stroke={p.stencil ? p.ink : p.cream} strokeWidth="2.5" />
      <path d="M166 66c-16 2-30 10-42 22" fill="none" stroke={p.stencil ? p.ink : p.cream} strokeWidth="2.5" />
      <circle cx="54" cy="84" r="9" fill={p.mustard} />
      <circle cx="146" cy="84" r="9" fill={p.mustard} />
      <circle cx="54" cy="84" r="3.5" fill={p.black} />
      <circle cx="146" cy="84" r="3.5" fill={p.black} />
      {/* Lower wings */}
      <path d="M92 104c-24 6-46 22-48 44 20 8 38 0 48-18Z" fill={p.mustard} />
      <path d="M108 104c24 6 46 22 48 44-20 8-38 0-48-18Z" fill={p.mustard} />
      <path d="M54 136c12-4 22-10 30-18" fill="none" strokeWidth={p.thin} />
      <path d="M146 136c-12-4-22-10-30-18" fill="none" strokeWidth={p.thin} />
      {/* Antennae */}
      <path d="M94 60c-6-16-16-24-26-26" fill="none" strokeWidth={p.thin} />
      <path d="M106 60c6-16 16-24 26-26" fill="none" strokeWidth={p.thin} />
      {/* Abdomen */}
      <ellipse cx="100" cy="128" rx="11" ry="30" fill={p.black} />
      {!p.stencil ? <path d="M92 118h16M91 128h18M93 138h14" stroke={p.mustard} strokeWidth="2.4" /> : null}
      {/* Thorax: the death's-head skull */}
      <path d="M86 80c0-12 6-20 14-20s14 8 14 20c0 7-3 11-6 13v8H92v-8c-3-2-6-6-6-13Z" fill={p.cream} />
      <path d="M90 78l8 2-1 7-7-2Z" fill={p.black} strokeWidth={p.thin} />
      <path d="M110 78l-8 2 1 7 7-2Z" fill={p.black} strokeWidth={p.thin} />
      <path d="M100 88l-2.5 5h5Z" fill={p.black} stroke="none" />
      <path d="M95 96v5M100 96v5M105 96v5" stroke={p.stencil ? p.ink : 'var(--art-bg)'} strokeWidth={p.thin} />
      {/* Crescent moon above */}
      <path d="M104 22a11 11 0 1 0 7 19 8.5 8.5 0 1 1-7-19Z" fill={p.cream} strokeWidth={p.thin} />
    </g>
  );
}

function CrescentEye(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Dotwork outer halo */}
      <circle cx="100" cy="96" r="72" fill="none" strokeDasharray="2 7" strokeWidth={p.thin} />
      {/* Sunburst rays */}
      <path d="M100 18v16M100 164v16M26 96h16M158 96h16M46 44l12 12M154 44l-12 12M46 148l12-12M154 148l-12-12" strokeWidth={p.thin} />
      {/* Waning crescent moon cradling the eye */}
      <path d="M118 34a62 62 0 1 0 28 112 46 46 0 1 1-28-112Z" fill={p.black} />
      {/* All-seeing eye */}
      <path d="M58 96c18-24 66-24 84 0-18 24-66 24-84 0Z" fill={p.cream} />
      <circle cx="100" cy="96" r="19" fill={p.mustard} />
      <circle cx="100" cy="96" r="9" fill={p.black} />
      <circle cx="95" cy="91" r="3" fill={p.cream} stroke="none" />
      {/* Tear drop */}
      <path d="M100 132c-6 10-8 18 0 22 8-4 6-12 0-22Z" fill={p.red} />
      {/* Stipple accents */}
      <g fill={p.ink} stroke="none">
        <circle cx="100" cy="58" r="2" />
        <circle cx="88" cy="61" r="1.6" />
        <circle cx="112" cy="61" r="1.6" />
      </g>
    </g>
  );
}

function Spiderweb(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* 8 radiating spokes */}
      <line x1="100" y1="18" x2="100" y2="176" />
      <line x1="20" y1="98" x2="180" y2="98" />
      <line x1="42" y1="40" x2="158" y2="156" />
      <line x1="158" y1="40" x2="42" y2="156" />
      {/* Scalloped concentric rings */}
      {[28, 52, 74].map(r => (
        <path
          key={r}
          d={`M ${100} ${98 - r} Q ${100 + r * 0.35} ${98 - r * 0.65} ${100 + r * 0.71} ${98 - r * 0.71}
              Q ${100 + r * 0.65} ${98 - r * 0.35} ${100 + r} ${98}
              Q ${100 + r * 0.65} ${98 + r * 0.35} ${100 + r * 0.71} ${98 + r * 0.71}
              Q ${100 + r * 0.35} ${98 + r * 0.65} ${100} ${98 + r}
              Q ${100 - r * 0.35} ${98 + r * 0.65} ${100 - r * 0.71} ${98 + r * 0.71}
              Q ${100 - r * 0.65} ${98 + r * 0.35} ${100 - r} ${98}
              Q ${100 - r * 0.65} ${98 - r * 0.35} ${100 - r * 0.71} ${98 - r * 0.71}
              Q ${100 - r * 0.35} ${98 - r * 0.65} ${100} ${98 - r} Z`}
          fill="none"
          strokeWidth={p.stencil ? 1.5 : 2.6}
        />
      ))}
      {/* Solid black center */}
      <circle cx="100" cy="98" r="7" fill={p.black} />
      {/* Dangling black widow spider */}
      <line x1="138" y1="126" x2="138" y2="156" strokeWidth={p.thin} />
      <circle cx="138" cy="164" r="9" fill={p.black} />
      <circle cx="138" cy="154" r="5" fill={p.black} />
      <polygon points="138,160 141,164 138,168 135,164" fill={p.red} stroke="none" />
      <path d="M133 156l-10-4M132 162l-11 2M134 168l-9 7M143 156l10-4M144 162l11 2M142 168l9 7" strokeWidth={p.thin} />
    </g>
  );
}

function NightPeony(p: Palette) {
  const line = p.stencil ? 1.5 : 2.4;
  return (
    <g stroke={p.ink} strokeWidth={line} strokeLinecap="round" strokeLinejoin="round">
      {/* Slender stem & leaves */}
      <path d="M100 116c-4 22-8 44-4 68" fill="none" />
      <path d="M96 144c-22-4-34 4-38 14 14 6 28 2 38-14Z" fill={p.jade} />
      <path d="M97 158c20-6 34 2 38 12-14 6-28 2-38-12Z" fill={p.jade} />
      {/* Small bud */}
      <path d="M98 130c18-12 34-18 46-32" fill="none" />
      <circle cx="148" cy="92" r="10" fill={p.red} />
      <path d="M142 98c4-6 8-6 12 0" fill="none" />
      {/* Layered ruffled peony petals: outer ring outlined, inner cup hatched */}
      <path d="M100 34c18-10 38 2 36 22 18 4 24 26 10 40 6 18-14 32-32 24-10 10-28 10-38 0-18 8-38-6-32-24-14-14-8-36 10-40-2-20 18-32 36-22Z" fill={p.black} />
      <path d="M100 44c12-6 26 2 26 16 12 4 16 18 8 28 4 12-10 22-22 16-8 6-16 6-24 0-12 6-26-4-22-16-8-10-4-24 8-28 0-14 14-22 26-16Z" fill={p.mustard} strokeWidth={p.thin} />
      <path d="M72 78c4-20 22-28 28-28s24 8 28 28c-6 16-18 24-28 24s-22-8-28-24Z" fill={p.red} />
      <path d="M84 78c4-12 28-12 32 0-4 10-28 10-32 0Z" fill={p.black} />
      {/* Fine-line petal veins & stipple dots */}
      <path d="M100 40v14M74 62l10 8M126 62l-10 8M64 92l14-4M136 92l-14-4" strokeWidth={p.thin} />
      <g fill={p.ink} stroke="none">
        <circle cx="52" cy="40" r="2" />
        <circle cx="156" cy="52" r="2" />
        <circle cx="44" cy="116" r="1.6" />
        <circle cx="96" cy="78" r="1.4" />
        <circle cx="104" cy="78" r="1.4" />
        <circle cx="100" cy="74" r="1.4" />
      </g>
    </g>
  );
}

function Snake(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.stencil ? 1.6 : 2.8} strokeLinecap="round" strokeLinejoin="round">
      {/* Botanical juniper branch */}
      <path d="M102 180C98 134 104 82 96 22" fill="none" strokeWidth={p.thin} />
      <path d="M98 48l-24-12M99 66l24-14M100 104l-26-10M100 132l24-12M100 156l-22-8" fill="none" strokeWidth={p.thin} />
      {/* Juniper berries */}
      <circle cx="70" cy="34" r="5" fill={p.jade} />
      <circle cx="126" cy="50" r="5" fill={p.jade} />
      <circle cx="70" cy="92" r="5" fill={p.jade} />
      <circle cx="126" cy="118" r="5" fill={p.jade} />
      {/* Coiled serpent body */}
      <path
        d="M84 44c26-4 54 6 54 24 0 20-76 16-76 40 0 22 72 16 72 38 0 18-34 24-56 18"
        fill="none"
        stroke={p.ink}
        strokeWidth={p.stencil ? 10 : 18}
      />
      <path
        d="M84 44c26-4 54 6 54 24 0 20-76 16-76 40 0 22 72 16 72 38 0 18-34 24-56 18"
        fill="none"
        stroke={p.stencil ? 'var(--art-bg)' : p.cream}
        strokeWidth={p.stencil ? 7 : 12}
      />
      {/* Diamond markings along spine */}
      {!p.stencil ? (
        <g fill={p.black} stroke="none">
          <polygon points="128,68 133,64 138,68 133,72" />
          <polygon points="74,104 79,100 84,104 79,108" />
          <polygon points="122,146 127,142 132,146 127,150" />
        </g>
      ) : null}
      {/* Serpent head */}
      <path d="M84 34c-14 0-26 6-30 12 4 6 16 12 30 12 6-6 6-18 0-24Z" fill={p.jade} />
      <circle cx="70" cy="44" r="2.2" fill={p.mustard} stroke="none" />
      {/* Forked tongue */}
      <path d="M54 46H40l-6-5M40 46l-6 5" fill="none" stroke={p.stencil ? p.ink : p.red} strokeWidth={p.thin} />
    </g>
  );
}

function MoonPhases(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.stencil ? 1.5 : 2.6} strokeLinecap="round" strokeLinejoin="round">
      {/* Vertical ornamental spine */}
      <line x1="100" y1="16" x2="100" y2="184" strokeWidth={p.thin} />
      {/* 1: New moon */}
      <circle cx="100" cy="30" r="12" fill={p.black} />
      {/* 2: Waxing crescent */}
      <circle cx="100" cy="64" r="13" fill={p.black} />
      <path d="M100 51a13 13 0 0 1 0 26 9 13 0 0 0 0-26Z" fill={p.cream} />
      {/* 3: Full stippled moon with halo */}
      <circle cx="100" cy="100" r="24" fill="none" strokeDasharray="2 5" strokeWidth={p.thin} />
      <circle cx="100" cy="100" r="16" fill={p.mustard} />
      <g fill={p.ink} stroke="none">
        <circle cx="94" cy="95" r="2" />
        <circle cx="106" cy="104" r="2.4" />
        <circle cx="103" cy="93" r="1.4" />
      </g>
      {/* 4: Waning crescent */}
      <circle cx="100" cy="136" r="13" fill={p.black} />
      <path d="M100 123a13 13 0 0 0 0 26 9 13 0 0 1 0-26Z" fill={p.cream} />
      {/* 5: Dark moon with dot */}
      <circle cx="100" cy="170" r="12" fill={p.cream} />
      <circle cx="100" cy="170" r="4" fill={p.black} />
      {/* Side stars */}
      <path d="M60 100l4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" fill={p.ink} stroke="none" />
      <path d="M140 100l4 2-4 2-2 4-2-4-4-2 4-2 2-4Z" fill={p.ink} stroke="none" />
    </g>
  );
}

function KoiWave(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Curling finger waves */}
      <path d="M22 152c16-26 38-34 60-24-8 10-4 24 14 26 16 2 34-12 52-24 16 8 24 22 28 38H22Z" fill={p.jade} />
      <path d="M36 154c14-12 30-14 44-6M116 156c14-10 28-10 42-2" fill="none" stroke={p.stencil ? p.ink : p.cream} strokeWidth="2.2" />
      {/* Pectoral fins */}
      <path d="M74 96c-22 2-36 14-38 28 16 4 30-2 40-14Z" fill={p.cream} />
      <path d="M126 88c22-4 38 6 42 20-16 6-30 2-42-8Z" fill={p.cream} />
      {/* Leaping koi body */}
      <path d="M110 34c18 14 26 42 18 70-8 26-26 40-44 46 4-16-2-28-12-34 10-20 8-54 38-82Z" fill={p.red} />
      {/* Mustard koi patches */}
      <path d="M92 66c12-6 26-4 34 6-4 14-14 20-26 18-8-6-12-14-8-24Z" fill={p.mustard} />
      <path d="M84 110c10-4 20-2 26 8-6 10-14 14-24 12Z" fill={p.cream} />
      {/* Flowing tail */}
      <path d="M78 142c-22 6-36 18-40 34 18 2 34-4 46-18 6 12 16 18 28 16-4-14-12-26-34-32Z" fill={p.mustard} />
      {/* Scales */}
      <path d="M98 76c4 4 10 4 14 0M94 94c4 4 10 4 14 0M90 108c4 4 10 4 14 0" fill="none" strokeWidth={p.thin} />
      {/* Whiskers & eye */}
      <path d="M116 44c12-10 26-14 38-8M98 42c-12-10-24-12-34-4" fill="none" strokeWidth={p.thin} />
      <circle cx="106" cy="48" r="3" fill={p.black} />
      {/* Spray droplets */}
      <circle cx="44" cy="56" r="3.5" fill={p.cream} strokeWidth={p.thin} />
      <circle cx="158" cy="60" r="3" fill={p.cream} strokeWidth={p.thin} />
    </g>
  );
}

function Hannya(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Flowing dark hair wisps */}
      <path d="M46 82c-16 16-22 40-14 64 10-10 18-20 22-32" fill={p.black} />
      <path d="M154 82c16 16 22 40 14 64-10-10-18-20-22-32" fill={p.black} />
      {/* Curved mustard horns */}
      <path d="M68 62c-16-14-20-34-10-46 6 14 16 22 28 30Z" fill={p.mustard} />
      <path d="M132 62c16-14 20-34 10-46-6 14-16 22-28 30Z" fill={p.mustard} />
      {/* Mask face */}
      <path d="M52 72c10-16 28-22 48-22s38 6 48 22c6 26-2 58-16 78-10 14-20 22-32 22s-22-8-32-22c-14-20-22-52-16-78Z" fill={p.red} />
      {/* Furrowed brow */}
      <path d="M66 78c10 10 22 10 34 4 12 6 24 6 34-4" fill="none" strokeWidth={p.sw} />
      {/* Sunken glowing eyes */}
      <path d="M64 94l26 8-22 10Z" fill={p.mustard} />
      <path d="M136 94l-26 8 22 10Z" fill={p.mustard} />
      <circle cx="77" cy="102" r="3" fill={p.black} stroke="none" />
      <circle cx="123" cy="102" r="3" fill={p.black} stroke="none" />
      {/* Cheekbones & nose */}
      <path d="M94 114h12l-6 10Z" fill={p.black} />
      {/* Fanged grimacing mouth */}
      <path d="M64 134c18-10 54-10 72 0-6 22-20 30-36 30s-30-8-36-30Z" fill={p.black} />
      <path d="M72 134l6 16 6-14Z" fill={p.cream} />
      <path d="M128 134l-6 16-6-14Z" fill={p.cream} />
      <path d="M88 134h24v8H88Z" fill={p.cream} />
      <path d="M84 156h32v-7H84Z" fill={p.cream} />
    </g>
  );
}

function SkullHourglass(p: Palette) {
  return (
    <g stroke={p.ink} strokeWidth={p.sw} strokeLinecap="round" strokeLinejoin="round">
      {/* Ornate top & bottom wooden/brass frames */}
      <rect x="46" y="20" width="108" height="14" rx="4" fill={p.mustard} />
      <rect x="46" y="166" width="108" height="14" rx="4" fill={p.mustard} />
      {/* Side pillars */}
      <line x1="56" y1="34" x2="56" y2="166" strokeWidth={p.sw} />
      <line x1="144" y1="34" x2="144" y2="166" strokeWidth={p.sw} />
      {/* Glass bulbs */}
      <path d="M64 34h72c0 34-24 54-36 66 12 12 36 32 36 66H64c0-34 24-54 36-66-12-12-36-32-36-66Z" fill={p.cream} />
      {/* Skull inside upper bulb */}
      <circle cx="100" cy="60" r="19" fill={p.cream} />
      <path d="M88 74h24v10H88Z" fill={p.cream} />
      <circle cx="93" cy="60" r="4.5" fill={p.black} />
      <circle cx="107" cy="60" r="4.5" fill={p.black} />
      <polygon points="100,65 103,71 97,71" fill={p.black} stroke="none" />
      <path d="M94 78v6M100 78v6M106 78v6" strokeWidth={p.thin} />
      {/* Trickling sand */}
      <line x1="100" y1="98" x2="100" y2="142" stroke={p.stencil ? p.ink : p.mustard} strokeWidth="2.5" strokeDasharray="3 3" />
      <path d="M72 164c6-16 20-24 28-24s22 8 28 24Z" fill={p.mustard} />
      {/* Flanking neo-traditional roses */}
      <circle cx="44" cy="100" r="12" fill={p.red} />
      <circle cx="156" cy="100" r="12" fill={p.red} />
      <path d="M38 112l-6 12 12-4M162 112l6 12-12-4" fill={p.jade} />
    </g>
  );
}

export const MOTIF_ART: Record<MotifId, (p: Palette) => ReactElement> = {
  swallow: Swallow,
  'dagger-rose': DaggerRose,
  panther: Panther,
  'sacred-heart': SacredHeart,
  anchor: Anchor,
  'death-moth': DeathMoth,
  'crescent-eye': CrescentEye,
  spiderweb: Spiderweb,
  'night-peony': NightPeony,
  snake: Snake,
  'moon-phases': MoonPhases,
  'koi-wave': KoiWave,
  hannya: Hannya,
  'skull-hourglass': SkullHourglass,
};

/**
 * Inner <g> layers for a motif so outer SVG compositions can embed motifs directly
 * in their own coordinate system without nested <svg> sizing quirks.
 */
export function MotifLayers({
  motif,
  variant = 'ink',
}: {
  motif: MotifId;
  variant?: MotifVariant;
}) {
  const palette = getPalette(variant);
  return <g filter="url(#mn-bleed)">{MOTIF_ART[motif](palette)}</g>;
}

/**
 * Flash artwork: bone-and-red ink print (`ink`) or bare stencil linework (`line`).
 * Always sits on black stock — wrap it in `.art-stage` or a black band.
 */
export function MotifArt({
  motif,
  variant = 'ink',
  className = 'h-40 w-40',
}: {
  motif: MotifId;
  variant?: MotifVariant;
  className?: string;
}) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <MotifLayers motif={motif} variant={variant} />
    </svg>
  );
}
