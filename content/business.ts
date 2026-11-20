import type { OpeningHours } from '../lib/hours.ts';

export interface BusinessAddress {
  /** Full formatted street address for display and maps. */
  full: string;
  street: string;
  city: string;
  region: string;
  postalCode: string;
  country: string;
  /** Neighbourhood landmark hint shown next to the address. */
  landmark: string;
  /** Transit and entrance directions. */
  directions: string;
}

export interface Business {
  /** Public display name; also update site.config.json's name when renaming. */
  name: string;
  /** Short headline for the home page and metadata. */
  tagline: string;
  /** Plain-text introduction used by fallback metadata and schema. */
  introduction: string;
  /** Public contact address, never a private notification destination. */
  email: string;
  /** Public phone number; blank hides it. */
  phone: string;
  /** Physical studio location and directions. */
  address: BusinessAddress;
  /** Weekly studio hours (seven weekdays, same-day intervals only). */
  hours: readonly OpeningHours[];
  /** Walk-in flash schedule shown as static copy (not a live status). */
  walkInFlash: string;
  /** Contact copy; the hosted form supports name, email and message only. */
  enquiries: {
    /** Contact page heading. */
    title: string;
    /** No booking, payment or delivery promises. */
    introduction: string;
    /** Suggestions for the message, not additional form inputs. */
    usefulToInclude: readonly string[];
  };
}

export const business: Business = {
  name: 'Midnight Needle Tattoo',
  tagline: 'Black ink. Steady hands. Open late.',
  introduction:
    'Four artists, one long wall of flash, and a studio that keeps the lamps on until ten on weekends. Pick a piece off the wall or bring us an idea worth drawing.',
  email: 'ink@midnightneedletattoo.com',
  phone: '(206) 555-0143',
  address: {
    full: '1520 11th Ave, Seattle, WA 98122',
    street: '1520 11th Ave',
    city: 'Seattle',
    region: 'WA',
    postalCode: '98122',
    country: 'US',
    landmark: 'Across from Cal Anderson Park, upstairs above the record shop.',
    directions:
      'Two blocks north of the Capitol Hill Link light rail station. Look for the black door beside the record shop and head up the stairs.',
  },
  hours: [
    { day: 'Monday' },
    { day: 'Tuesday', opens: '12:00', closes: '20:00' },
    { day: 'Wednesday', opens: '12:00', closes: '20:00' },
    { day: 'Thursday', opens: '12:00', closes: '20:00' },
    { day: 'Friday', opens: '12:00', closes: '22:00' },
    { day: 'Saturday', opens: '12:00', closes: '22:00' },
    { day: 'Sunday', opens: '12:00', closes: '18:00' },
  ],
  walkInFlash:
    'Walk-in flash runs Friday and Saturday, 2 pm–9 pm — first come, first served, repeatable and available wall flash only.',
  enquiries: {
    title: 'Send a booking enquiry',
    introduction:
      "Tell us what you'd like and we'll pass it to the right artist. Nothing is booked until your artist replies with a date and your deposit is received — we'll explain how to pay it in that reply. This website does not take payments.",
    usefulToInclude: [
      'The artist you’d like, or “any”',
      'The flash ID (e.g. dagger-rose) or a description of your custom idea',
      'Placement and rough size in inches',
      'Black and grey or colour',
      'Whether it’s a cover-up (describe the existing tattoo)',
      'Days that suit you',
      'A link to reference images if you have them (attachments aren’t supported)',
      'Confirmation that you’re 18 or over',
    ],
  },
};
