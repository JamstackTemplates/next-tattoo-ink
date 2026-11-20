/**
 * Tattoo styles offered by the studio.
 * Referenced by artists, flash pieces, portfolio pieces, and the Home sampler strip.
 */
export const STYLE_IDS = [
  'traditional',
  'blackwork',
  'fine-line',
  'neo-traditional',
  'dotwork',
  'japanese',
  'lettering',
] as const;

export type StyleId = typeof STYLE_IDS[number];

export interface TattooStyle {
  /** Stable, URL-safe ID used in filter query strings (?style=<id>). */
  id: StyleId;
  /** Human-readable style name. */
  name: string;
  /** One-sentence description of the style. */
  summary: string;
  /** Short phrase naming what the style suits best. */
  suits: string;
}

export const styles: readonly TattooStyle[] = [
  {
    id: 'traditional',
    name: 'American traditional',
    summary: 'Bold black outlines, limited flat colour, built to last decades.',
    suits: 'Flash, first tattoos, patchwork sleeves',
  },
  {
    id: 'blackwork',
    name: 'Blackwork',
    summary: 'Solid black fills, negative space and heavy graphic shapes.',
    suits: 'Cover-ups, bold statements, ornamental pieces',
  },
  {
    id: 'fine-line',
    name: 'Fine line',
    summary: 'Single-needle linework, delicate botanicals and small script.',
    suits: 'Small first pieces, wrists, ribs',
  },
  {
    id: 'neo-traditional',
    name: 'Neo-traditional',
    summary: 'Traditional bones with richer palettes, depth and detail.',
    suits: 'Portraits of animals, mid-size feature pieces',
  },
  {
    id: 'dotwork',
    name: 'Dotwork',
    summary: 'Stippled shading and geometry built one dot at a time.',
    suits: 'Mandalas, moons, soft gradients',
  },
  {
    id: 'japanese',
    name: 'Japanese-inspired',
    summary: 'Koi, masks and waves in large flowing compositions.',
    suits: 'Half and full sleeves, back pieces',
  },
  {
    id: 'lettering',
    name: 'Lettering',
    summary: 'Script, banners and hand-drawn type.',
    suits: 'Names, dates, knuckles, banners',
  },
];

export const styleById = new Map<string, TattooStyle>(styles.map(item => [item.id, item]));
