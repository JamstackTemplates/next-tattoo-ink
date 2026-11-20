import { artists } from '../content/artists.ts';
import { business } from '../content/business.ts';
import { absoluteUrl } from './paths.ts';

/** TattooParlor JSON-LD derived directly from typed studio content. */
export function businessStructuredData() {
  const url = absoluteUrl('/');
  const openingHoursSpecification = business.hours
    .filter(entry => entry.opens && entry.closes)
    .map(entry => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: `https://schema.org/${entry.day}`,
      opens: entry.opens,
      closes: entry.closes,
    }));

  return {
    '@context': 'https://schema.org',
    '@type': 'TattooParlor',
    name: business.name,
    description: business.introduction,
    email: business.email,
    ...(business.phone ? { telephone: business.phone } : {}),
    ...(url ? { url } : {}),
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.city,
      addressRegion: business.address.region,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification,
    employee: artists.map(artist => {
      const artistUrl = absoluteUrl(`/artists/${artist.id}/`);
      return {
        '@type': 'Person',
        name: artist.name,
        jobTitle: artist.role,
        ...(artistUrl ? { url: artistUrl } : {}),
      };
    }),
  };
}

/** Prevent content containing a closing script tag from escaping JSON-LD. */
export function jsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}
