import type { MotifId } from './motifs.ts';
import type { StyleId } from './styles.ts';

/**
 * Flash sheet availability:
 * - 'available': one-off design still on the wall.
 * - 'claimed': one-off design already tattooed (stays pinned on /flash/ with a red CLAIMED stamp; dropped from Home's featured strip).
 * - 'repeatable': can be tattooed on multiple clients.
 */
export type FlashStatus = 'available' | 'claimed' | 'repeatable';

export interface FlashPiece {
  /** Stable, URL-safe flash ID (visitors quote this in their enquiry message). */
  id: string;
  /** Display title on the flash sheet. */
  title: string;
  /** Artist ID from content/artists.ts. */
  artistId: string;
  /** Style IDs from content/styles.ts. */
  styles: readonly StyleId[];
  /** Listed size in inches (1–12). */
  sizeInches: number;
  /** Whole US dollars (>= policies.shopMinimumUsd). */
  priceUsd: number;
  /** Edit to 'claimed' once a one-off piece has been tattooed. */
  status: FlashStatus;
  /** Set true to surface on the Home page's "Pick off the wall" strip (unclaimed pieces only). */
  featured: boolean;
  /** Motif ID rendered on the sheet. */
  motif: MotifId;
}

export const flashPieces: readonly FlashPiece[] = [
  {
    id: 'swallow-pair',
    title: 'Swallow pair',
    artistId: 'rook-alvarez',
    styles: ['traditional'],
    sizeInches: 3.5,
    priceUsd: 160,
    status: 'repeatable',
    featured: true,
    motif: 'swallow',
  },
  {
    id: 'dagger-rose',
    title: 'Dagger through rose',
    artistId: 'rook-alvarez',
    styles: ['traditional'],
    sizeInches: 5,
    priceUsd: 260,
    status: 'available',
    featured: true,
    motif: 'dagger-rose',
  },
  {
    id: 'panther-head',
    title: 'Crawling panther',
    artistId: 'rook-alvarez',
    styles: ['traditional'],
    sizeInches: 4,
    priceUsd: 220,
    status: 'claimed',
    featured: false,
    motif: 'panther',
  },
  {
    id: 'sacred-heart',
    title: 'Sacred heart in flames',
    artistId: 'rook-alvarez',
    styles: ['traditional'],
    sizeInches: 4,
    priceUsd: 240,
    status: 'available',
    featured: false,
    motif: 'sacred-heart',
  },
  {
    id: 'anchor-banner',
    title: 'Anchor and "Midnight" banner',
    artistId: 'rook-alvarez',
    styles: ['traditional', 'lettering'],
    sizeInches: 4,
    priceUsd: 200,
    status: 'repeatable',
    featured: false,
    motif: 'anchor',
  },
  {
    id: 'death-moth',
    title: "Death's-head moth",
    artistId: 'vee-okafor',
    styles: ['blackwork'],
    sizeInches: 5,
    priceUsd: 280,
    status: 'available',
    featured: true,
    motif: 'death-moth',
  },
  {
    id: 'crescent-eye',
    title: 'Crescent eye',
    artistId: 'vee-okafor',
    styles: ['blackwork', 'dotwork'],
    sizeInches: 3,
    priceUsd: 150,
    status: 'repeatable',
    featured: false,
    motif: 'crescent-eye',
  },
  {
    id: 'elbow-web',
    title: 'Elbow web',
    artistId: 'vee-okafor',
    styles: ['blackwork'],
    sizeInches: 5,
    priceUsd: 300,
    status: 'claimed',
    featured: false,
    motif: 'spiderweb',
  },
  {
    id: 'night-peony',
    title: 'Night peony',
    artistId: 'junie-castellano',
    styles: ['fine-line'],
    sizeInches: 4,
    priceUsd: 200,
    status: 'available',
    featured: true,
    motif: 'night-peony',
  },
  {
    id: 'snake-juniper',
    title: 'Snake and juniper sprig',
    artistId: 'junie-castellano',
    styles: ['fine-line'],
    sizeInches: 4.5,
    priceUsd: 220,
    status: 'available',
    featured: false,
    motif: 'snake',
  },
  {
    id: 'moon-phases',
    title: 'Moon phase strip',
    artistId: 'junie-castellano',
    styles: ['fine-line', 'dotwork'],
    sizeInches: 2,
    priceUsd: 120,
    status: 'repeatable',
    featured: true,
    motif: 'moon-phases',
  },
  {
    id: 'koi-wave',
    title: 'Koi in a wave',
    artistId: 'hal-sato-marsh',
    styles: ['japanese'],
    sizeInches: 6,
    priceUsd: 380,
    status: 'available',
    featured: true,
    motif: 'koi-wave',
  },
  {
    id: 'hannya-mask',
    title: 'Hannya mask',
    artistId: 'hal-sato-marsh',
    styles: ['japanese', 'neo-traditional'],
    sizeInches: 4,
    priceUsd: 260,
    status: 'claimed',
    featured: false,
    motif: 'hannya',
  },
  {
    id: 'skull-hourglass',
    title: 'Skull and hourglass',
    artistId: 'hal-sato-marsh',
    styles: ['neo-traditional'],
    sizeInches: 5,
    priceUsd: 300,
    status: 'available',
    featured: false,
    motif: 'skull-hourglass',
  },
];

/** Featured, unclaimed pieces shown on the Home page's "Pick off the wall" strip. */
export function getFeaturedFlash(pieces: readonly FlashPiece[] = flashPieces): FlashPiece[] {
  return pieces.filter(piece => piece.featured && piece.status !== 'claimed');
}

export function formatUsd(amount: number): string {
  return `$${amount.toLocaleString('en-US')}`;
}
