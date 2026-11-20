import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource/pirata-one';
import '@fontsource-variable/oswald';
import '@fontsource-variable/familjen-grotesk';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import { ThemeProvider } from 'jamstacks';
import { ThemeScript } from 'jamstacks/server';
import { InkDefs } from '../components/art/ink-defs';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { business } from '../content/business';
import { asset } from '../lib/paths';
import { site } from '../lib/site';
import './tailwind.input.css';

const ogImage = asset('/og.png');
const description = site.description || business.introduction;

export const metadata: Metadata = {
  title: { default: business.name, template: `%s — ${business.name}` },
  description,
  ...(site.url ? { metadataBase: new URL(`${site.url}/`) } : {}),
  openGraph: {
    type: 'website',
    siteName: business.name,
    title: business.name,
    description,
    images: [{ url: ogImage, width: 1200, height: 630, alt: `${business.name} — custom and flash tattooing on Capitol Hill, Seattle` }],
  },
  twitter: {
    card: 'summary_large_image',
    title: business.name,
    description,
    images: [ogImage],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="color-scheme" content="light dark" />
        <ThemeScript />
      </head>
      <body>
        <InkDefs />
        <ThemeProvider>
          <a className="skip-link" href="#main">Skip to content</a>
          <SiteHeader />
          <main id="main" tabIndex={-1}>{children}</main>
          <SiteFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
