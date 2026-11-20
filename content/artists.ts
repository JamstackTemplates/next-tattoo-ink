import type { MotifId } from './motifs.ts';
import type { StyleId } from './styles.ts';

export type BookStatus = 'open' | 'waitlist' | 'closed';

export interface Artist {
  /** Stable, URL-safe ID used in /artists/<id>/ and flash/portfolio references. */
  id: string;
  /** Public artist name. */
  name: string;
  /** Studio role, used on pages and Person JSON-LD jobTitle. */
  role: string;
  /** Whole years tattooing professionally. */
  yearsTattooing: number;
  /** Style IDs offered by this artist; the first is their primary style. */
  styles: readonly StyleId[];
  /** Current booking status: edit here to update Home, Artists and the portfolio page. */
  books: BookStatus;
  /** Short owner-edited line explaining what they are currently booking. */
  booksNote: string;
  /** Regular days in the studio. */
  days: string;
  /** Two or three sentences introducing the artist's work. */
  bio: string;
  /** Motif ID rendered inside their station mirror frame. */
  signatureMotif: MotifId;
}

export const artists: readonly Artist[] = [
  {
    id: 'rook-alvarez',
    name: 'Rook Alvarez',
    role: 'Owner, tattooer',
    yearsTattooing: 16,
    styles: ['traditional', 'lettering'],
    books: 'open',
    booksNote: 'Taking custom work and flash',
    days: 'Tue–Sat',
    bio: 'Rook opened Midnight Needle after a decade on the street-shop circuit and still paints a new flash sheet every month. Expect heavy lines, honest advice on placement and a strong opinion about swallows.',
    signatureMotif: 'swallow',
  },
  {
    id: 'vee-okafor',
    name: 'Vee Okafor',
    role: 'Tattooer',
    yearsTattooing: 9,
    styles: ['blackwork', 'dotwork'],
    books: 'waitlist',
    booksNote: 'Waitlist for large blackwork; flash open',
    days: 'Wed–Sun',
    bio: 'Vee builds graphic blackwork that holds its shape for life — moths, ornamental bands and cover-ups that actually cover. Bring the old tattoo in daylight and Vee will tell you straight what’s possible.',
    signatureMotif: 'death-moth',
  },
  {
    id: 'junie-castellano',
    name: 'Junie Castellano',
    role: 'Tattooer',
    yearsTattooing: 6,
    styles: ['fine-line', 'dotwork'],
    books: 'open',
    booksNote: 'Booking small pieces two weeks out',
    days: 'Tue, Thu–Sat',
    bio: 'Junie works single-needle and soft stipple for small, quiet pieces: botanicals, moon phases and fine script. Most of Junie’s clients are getting their first tattoo.',
    signatureMotif: 'night-peony',
  },
  {
    id: 'hal-sato-marsh',
    name: 'Hal Sato-Marsh',
    role: 'Tattooer',
    yearsTattooing: 12,
    styles: ['japanese', 'neo-traditional'],
    books: 'closed',
    booksNote: 'Books closed for sleeves; flash only',
    days: 'Fri–Sun',
    bio: 'Hal draws Japanese-inspired large-scale work and neo-traditional feature pieces, planned over a consult and built across sessions. Hal’s flash days are the best way onto the books.',
    signatureMotif: 'koi-wave',
  },
];

export const artistById = new Map<string, Artist>(artists.map(item => [item.id, item]));

export const BOOK_STATUS_LABEL: Record<BookStatus, string> = {
  open: 'Books open',
  waitlist: 'Waitlist',
  closed: 'Books closed',
};
