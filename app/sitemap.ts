import type { MetadataRoute } from 'next';
import { artists } from '../content/artists';
import { absoluteUrl } from '../lib/paths';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    '/',
    '/artists/',
    ...artists.map(artist => `/artists/${artist.id}/`),
    '/flash/',
    '/aftercare/',
    '/deposits/',
    '/contact/',
  ];
  return routes.flatMap(path => {
    const url = absoluteUrl(path);
    return url ? [{ url }] : [];
  });
}
