import type { MotifId } from './motifs.ts';
import type { StyleId } from './styles.ts';

export interface PortfolioPiece {
  /** Stable, URL-safe ID. */
  id: string;
  /** Artist ID from content/artists.ts. */
  artistId: string;
  /** Piece title shown on the sketchbook sleeve label. */
  title: string;
  /** Style ID from content/styles.ts (must be one of the artist's styles). */
  style: StyleId;
  /** Body placement label, e.g. Forearm, Ribs, Thigh. */
  placement: string;
  /** Finished size in inches (1–12). */
  sizeInches: number;
  /** Number of sessions (whole integer >= 1). */
  sessions: number;
  /** True for healed work, false for fresh off the chair. */
  healed: boolean;
  /** Motif ID rendered in full flash colour and stencil-line variant. */
  motif: MotifId;
}

export const portfolioPieces: readonly PortfolioPiece[] = [
  {
    id: 'rook-swallow-chest',
    artistId: 'rook-alvarez',
    title: 'Chest swallows',
    style: 'traditional',
    placement: 'Chest',
    sizeInches: 5,
    sessions: 1,
    healed: true,
    motif: 'swallow',
  },
  {
    id: 'rook-heart-forearm',
    artistId: 'rook-alvarez',
    title: 'Sacred heart',
    style: 'traditional',
    placement: 'Forearm',
    sizeInches: 6,
    sessions: 1,
    healed: true,
    motif: 'sacred-heart',
  },
  {
    id: 'rook-banner-calf',
    artistId: 'rook-alvarez',
    title: '"Midnight" anchor',
    style: 'lettering',
    placement: 'Calf',
    sizeInches: 5,
    sessions: 1,
    healed: false,
    motif: 'anchor',
  },
  {
    id: 'vee-moth-sternum',
    artistId: 'vee-okafor',
    title: 'Sternum moth',
    style: 'blackwork',
    placement: 'Sternum',
    sizeInches: 7,
    sessions: 2,
    healed: true,
    motif: 'death-moth',
  },
  {
    id: 'vee-web-elbow',
    artistId: 'vee-okafor',
    title: 'Elbow web',
    style: 'blackwork',
    placement: 'Elbow',
    sizeInches: 5,
    sessions: 1,
    healed: true,
    motif: 'spiderweb',
  },
  {
    id: 'vee-eye-hand',
    artistId: 'vee-okafor',
    title: 'Stippled crescent eye',
    style: 'dotwork',
    placement: 'Hand',
    sizeInches: 3,
    sessions: 1,
    healed: false,
    motif: 'crescent-eye',
  },
  {
    id: 'junie-peony-ribs',
    artistId: 'junie-castellano',
    title: 'Night peony',
    style: 'fine-line',
    placement: 'Ribs',
    sizeInches: 5,
    sessions: 1,
    healed: true,
    motif: 'night-peony',
  },
  {
    id: 'junie-moons-spine',
    artistId: 'junie-castellano',
    title: 'Moon phases',
    style: 'dotwork',
    placement: 'Spine',
    sizeInches: 6,
    sessions: 1,
    healed: true,
    motif: 'moon-phases',
  },
  {
    id: 'junie-snake-ankle',
    artistId: 'junie-castellano',
    title: 'Juniper snake',
    style: 'fine-line',
    placement: 'Ankle',
    sizeInches: 4,
    sessions: 1,
    healed: false,
    motif: 'snake',
  },
  {
    id: 'hal-koi-sleeve',
    artistId: 'hal-sato-marsh',
    title: 'Koi half sleeve',
    style: 'japanese',
    placement: 'Upper arm',
    sizeInches: 11,
    sessions: 5,
    healed: true,
    motif: 'koi-wave',
  },
  {
    id: 'hal-hannya-thigh',
    artistId: 'hal-sato-marsh',
    title: 'Hannya',
    style: 'japanese',
    placement: 'Thigh',
    sizeInches: 8,
    sessions: 3,
    healed: true,
    motif: 'hannya',
  },
  {
    id: 'hal-skull-shin',
    artistId: 'hal-sato-marsh',
    title: 'Skull and hourglass',
    style: 'neo-traditional',
    placement: 'Shin',
    sizeInches: 6,
    sessions: 2,
    healed: false,
    motif: 'skull-hourglass',
  },
];
