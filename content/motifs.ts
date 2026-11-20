/**
 * Motif IDs shared between flash sheets, artist signature mirrors, portfolio spreads,
 * and the bespoke SVG artwork registry in components/art/motifs.tsx.
 */
export const MOTIF_IDS = [
  'swallow',
  'dagger-rose',
  'panther',
  'sacred-heart',
  'anchor',
  'death-moth',
  'crescent-eye',
  'spiderweb',
  'night-peony',
  'snake',
  'moon-phases',
  'koi-wave',
  'hannya',
  'skull-hourglass',
] as const;

export type MotifId = typeof MOTIF_IDS[number];
