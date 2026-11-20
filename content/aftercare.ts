import { policies } from './policies.ts';

export type AftercareIconId = 'wrap' | 'soap' | 'stencil' | 'no-sun' | 'calendar';

export interface AftercarePhase {
  /** Stable, URL-safe phase ID. */
  id: string;
  /** Time window tab shown in stencil violet. */
  window: string;
  /** Short phase heading. */
  title: string;
  /** Matching line-style icon shown beside the phase. */
  icon: AftercareIconId;
  /** Step-by-step care instructions for this phase. */
  steps: readonly string[];
}

export const aftercarePhases: readonly AftercarePhase[] = [
  {
    id: 'first-hours',
    window: 'Hours 0–4',
    title: 'Leave the wrap on',
    icon: 'wrap',
    steps: [
      'Keep the wrap on for 2–4 hours (or follow your artist’s timing if they applied second-skin film).',
      'Wash your hands thoroughly before touching the wrap or the tattoo.',
      'Remove the wrap and wash gently with lukewarm water and mild, unscented soap.',
      'Pat dry with a clean paper towel — never rub and skip shared bath towels.',
    ],
  },
  {
    id: 'days-1-3',
    window: 'Days 1–3',
    title: 'Wash and breathe',
    icon: 'soap',
    steps: [
      'Wash gently two or three times a day with lukewarm water and unscented soap.',
      'Apply a very thin layer of unscented aftercare balm once the skin is dry — it should sheen, not glisten.',
      'Sleep on clean sheets and wear loose, soft cotton over the tattoo.',
      'Some weeping, redness and clear plasma over the first couple of days is normal.',
    ],
  },
  {
    id: 'days-4-14',
    window: 'Days 4–14',
    title: "Peel, don't pick",
    icon: 'stencil',
    steps: [
      'Flaking, light scabbing and itching are a normal part of healing.',
      'Do not scratch, pick or peel loose flakes — let them fall off on their own.',
      'Keep moisturising thinly with unscented lotion or balm whenever the skin feels tight.',
      'No baths, pools, hot tubs, ocean swims or saunas until the skin has finished peeling.',
    ],
  },
  {
    id: 'weeks-3-4',
    window: 'Weeks 3–4',
    title: 'Cloudy skin',
    icon: 'no-sun',
    steps: [
      'A milky, matte layer of new skin may sit over the ink while the deeper layers settle.',
      'Keep moisturising daily until the texture matches the surrounding skin.',
      'Keep the tattoo out of direct sun and stay away from tanning beds.',
    ],
  },
  {
    id: 'for-life',
    window: 'For life',
    title: 'Keep it black',
    icon: 'calendar',
    steps: [
      'Wear SPF 50 on healed tattoos whenever they are in the sun — UV fades ink faster than anything else.',
      `Send us a touch-up enquiry within ${policies.touchUpMonths} months if a healed line needs tightening — your first touch-up is free when aftercare was followed.`,
    ],
  },
];

export const aftercareDo: readonly string[] = [
  'Wash hands before every clean or balm application.',
  'Use lukewarm water, unscented liquid soap and clean paper towels.',
  'Apply balm or lotion in a barely-there thin layer.',
  'Wear clean, breathable clothes and sleep on fresh sheets.',
  'Use SPF 50 once the tattoo is fully healed.',
];

export const aftercareDont: readonly string[] = [
  'Never pick, scratch or peel flaking ink or scabs.',
  'No soaking in baths, pools, hot tubs, lakes, the sea or saunas during healing.',
  'No direct sunlight, sunburn or tanning beds on a healing tattoo.',
  'Avoid heavy workouts that stretch or rub the fresh tattoo for the first 48 hours.',
  'Skip petroleum jelly, scented creams and alcohol-based sprays.',
];
