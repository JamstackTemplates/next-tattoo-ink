import { site } from './site.ts';

// Centralised URL helpers. next/link and file-convention metadata add the base path themselves;
// these helpers are only for plain <a href> and <img src> values that Next.js does not rewrite.

/** Prefix a public asset path (e.g. /og.png) with the deployment base path. */
export function asset(path: string): string {
  if (!path.startsWith('/')) throw new Error(`Asset paths must start with "/": ${path}`);
  return `${site.basePath}${path}`;
}

/** Ensure a site route's pathname ends with a trailing slash while preserving any query or hash. */
export function route(path: string): string {
  if (!path.startsWith('/')) throw new Error(`Routes must start with "/": ${path}`);
  const hashIndex = path.indexOf('#');
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : '';
  const withoutHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const queryIndex = withoutHash.indexOf('?');
  const query = queryIndex >= 0 ? withoutHash.slice(queryIndex) : '';
  const pathname = queryIndex >= 0 ? withoutHash.slice(0, queryIndex) : withoutHash;
  const withSlash = pathname.endsWith('/') ? pathname : `${pathname}/`;
  return `${withSlash}${query}${hash}`;
}

/** Extract just the normalized pathname (with trailing slash, without query or hash). */
export function routePathname(path: string): string {
  const pathname = path.split(/[?#]/, 1)[0] || '/';
  return route(pathname);
}

/** Full-document href for a site route, including the base path. */
export function documentHref(path: string): string {
  return `${site.basePath}${route(path)}`;
}

/** Absolute URL for metadata, or undefined when the deployed URL is not known at build time. */
export function absoluteUrl(path: string): string | undefined {
  return site.url ? `${site.url}${route(path)}` : undefined;
}

export const CONTACT_ROUTE = '/contact/';

/** Contact is entered and left with full-document navigation (see components/site-link.tsx). */
export function isContactRoute(path: string | null | undefined): boolean {
  if (!path) return false;
  return routePathname(path) === CONTACT_ROUTE;
}
