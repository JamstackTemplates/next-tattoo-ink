import type { ReactNode } from 'react';
import { artists } from '../content/artists';
import { business } from '../content/business';
import { getFeaturedFlash } from '../content/flash';
import { styles, styleById } from '../content/styles';
import { mapDirectionsUrl } from '../lib/maps';
import { asset } from '../lib/paths';
import { MotifArt } from './art/motifs';
import { StyleEmblem } from './art/style-emblems';
import { BookStatusTag } from './book-status';
import { FlashCard } from './flash-card';
import { GoogleMap } from './google-map';
import { HoursTable } from './hours-table';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';
import { TimeZoneNote } from './time-zone-note';

type Children = { children: ReactNode };

/* ==========================================================================
   Shared section heading: index number + mono eyebrow, then blackletter at
   sign scale. `onDark` for the black bands.
   ========================================================================== */

function SectionHeader({
  id,
  index,
  eyebrow,
  title,
  ctaHref,
  ctaLabel,
  onDark = false,
}: {
  id: string;
  index: string;
  eyebrow: string;
  title: ReactNode;
  ctaHref?: string;
  ctaLabel?: ReactNode;
  onDark?: boolean;
}) {
  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className={`eyebrow ${onDark ? 'text-wall-muted' : 'text-muted'}`}>
          <span className={onDark ? 'text-wall-accent' : 'text-primary-ink'}>{index}</span> {eyebrow}
        </p>
        <h2
          id={id}
          className={`type-giant mt-4 text-[clamp(3.2rem,8vw,7.5rem)] ${onDark ? 'text-wall-ink' : 'text-ink'}`}
        >
          {title}
        </h2>
      </div>
      {ctaHref && ctaLabel ? (
        <SiteLink href={ctaHref} className={`button shrink-0 ${onDark ? 'button-wall' : 'button-quiet'}`}>
          {ctaLabel} <span aria-hidden="true">→</span>
        </SiteLink>
      ) : null}
    </div>
  );
}

/* ==========================================================================
   1. Hero — a low-key studio photograph faded into the black wall,
   blackletter at full scale with the last line in red neon. A ticker
   runs along the floor.
   ========================================================================== */

const TICKER = [
  'Custom tattooing',
  'Wall flash',
  'Walk-ins Fri & Sat 2–9 pm',
  'Cover-ups',
  'Touch-ups',
  'Traditional',
  'Blackwork',
  'Fine line',
  'Japanese',
  '18+ with photo ID',
];

function Ticker() {
  const items = TICKER.map(item => (
    <span key={item} className="flex items-center">
      <span className="px-6">{item}</span>
      <span aria-hidden="true" className="text-wall-accent">✕</span>
    </span>
  ));
  return (
    <div className="marquee border-y border-wall-rule bg-wall py-3 font-cond text-lg tracking-[0.2em] uppercase text-wall-ink sm:text-xl" aria-hidden="true">
      <div className="marquee__track">{items}</div>
      <div className="marquee__track">{items}</div>
    </div>
  );
}

function HeroRoot({ children }: Children) {
  return (
    <section aria-labelledby="home-hero-heading" className="night-wall relative overflow-hidden">
      {/* Studio photograph: one image for both themes since the hero band is always black.
          Faded to black on the left (desktop) or dimmed overall (mobile) so the type stays legible. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <picture>
          <source media="(max-width: 767px)" srcSet={asset('/hero-800.webp')} />
          <img
            src={asset('/hero.webp')}
            alt=""
            width={1600}
            height={1195}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-[70%_center] lg:object-right"
          />
        </picture>
        <div className="absolute inset-0 bg-wall/70 lg:bg-[linear-gradient(90deg,var(--wall)_0%,rgb(7_7_7/0.85)_25%,rgb(7_7_7/0.25)_48%,transparent_65%)]" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-wall to-transparent" />
      </div>

      <div className="wrap relative grid grid-cols-1 items-center gap-4 pt-10 pb-14 lg:min-h-[calc(100svh-7rem)] lg:grid-cols-12 lg:pt-6 lg:pb-20">
        <div className="relative z-10 lg:col-span-8">
          <p className="inline-flex items-center gap-3 border border-wall-rule bg-wall/80 px-3 py-1.5 font-label text-[0.7rem] tracking-[0.18em] uppercase text-wall-ink">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-wall-accent shadow-[0_0_10px_2px_rgb(255_74_64/0.6)]" />
            <OpenBadge hours={business.hours} />
          </p>
          {children}
        </div>
      </div>
      <Ticker />
    </section>
  );
}

function HeroHeading({ children }: Children) {
  return (
    <h1
      id="home-hero-heading"
      className="type-giant mt-8 text-[clamp(3.6rem,9.5vw,8.6rem)] text-wall-ink"
    >
      {children}
    </h1>
  );
}

/** One line of the hero heading: `solid` bone, `outline` hollow linework, or `neon` red tube. */
function HeroLine({ children, tone = 'solid' }: { children: ReactNode; tone?: 'solid' | 'outline' | 'neon' }) {
  const toneClass =
    tone === 'outline' ? 'type-outline text-wall-ink' : tone === 'neon' ? 'neon neon-flicker' : '';
  return (
    <>
      <span className={`block ${toneClass}`}>{children}</span>{' '}
    </>
  );
}

function HeroIntro({ children }: Children) {
  return (
    <p className="mt-8 max-w-xl border-l-2 border-wall-accent pl-5 font-sans text-base leading-relaxed text-wall-muted sm:text-lg">
      {children}
    </p>
  );
}

function HeroActions({ primary, secondary }: { primary: ReactNode; secondary: ReactNode }) {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-4">
      <SiteLink href="/contact/" className="button min-h-14 px-8 text-base">
        {primary}
      </SiteLink>
      <SiteLink href="/flash/" className="button button-wall min-h-14 px-8 text-base">
        {secondary}
      </SiteLink>
    </div>
  );
}

export const Hero = Object.assign(HeroRoot, {
  Heading: HeroHeading,
  Line: HeroLine,
  Intro: HeroIntro,
  Actions: HeroActions,
});

/* ==========================================================================
   2. "Pick off the wall" — featured flash as a hard grid of black tiles.
   ========================================================================== */

function FlashWallRoot({ children }: Children) {
  const featured = getFeaturedFlash();
  return (
    <section aria-labelledby="home-flash-heading" className="grain relative py-20 lg:py-28">
      <div className="wrap">
        {children}
        <p className="mt-6 max-w-md font-label text-xs leading-relaxed tracking-wide text-muted">
          {featured.length} featured sheets still on the wall. Quote the flash ID in your enquiry.
          <span className="sm:hidden"> Swipe sideways →</span>
        </p>
        <div
          className="flash-carousel-track mt-10"
          role="region"
          aria-roledescription="carousel"
          aria-label="Featured wall flash"
          tabIndex={0}
        >
          {featured.map((piece, i) => (
            <div key={piece.id} role="group" aria-roledescription="slide" aria-label={`${i + 1} of ${featured.length}`}>
              <FlashCard piece={piece} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export const FlashWallSection = Object.assign(FlashWallRoot, { Header: SectionHeader });

/* ==========================================================================
   3. "Who's on the stools" — four stations as black columns. Each carries
   its artist's signature motif as bare stencil linework that inks in on hover.
   ========================================================================== */

function ArtistStationsRoot({ children }: Children) {
  return (
    <section aria-labelledby="home-artists-heading" className="night-wall py-20 lg:py-28">
      <div className="wrap">{children}</div>

      <ul className="wrap mt-14 grid grid-cols-1 border-t border-l border-wall-rule sm:grid-cols-2 lg:grid-cols-4">
        {artists.map((artist, idx) => (
          <li key={artist.id} className="group relative flex flex-col border-r border-b border-wall-rule">
            <div className="art-stage relative flex aspect-[4/5] items-center justify-center overflow-hidden">
              <span className="absolute top-4 left-4 font-label text-[0.68rem] tracking-[0.2em] text-wall-muted">
                Stool 0{idx + 1}
              </span>
              <MotifArt
                motif={artist.signatureMotif}
                variant="line"
                className="h-3/5 w-3/5 transition-opacity duration-300 group-hover:opacity-0 group-focus-within:opacity-0"
              />
              <MotifArt
                motif={artist.signatureMotif}
                className="absolute h-3/5 w-3/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3 p-5">
              <BookStatusTag status={artist.books} className="text-wall-ink" />
              <h3 className="font-display text-[2.4rem] leading-none text-wall-ink">
                <SiteLink href={`/artists/${artist.id}/`} className="no-underline after:absolute after:inset-0 hover:text-wall-accent">
                  {artist.name}
                </SiteLink>
              </h3>
              <p className="font-label text-[0.7rem] tracking-[0.14em] uppercase text-wall-muted">
                {artist.yearsTattooing} yrs · {artist.days}
              </p>
              <p className="font-cond text-sm tracking-[0.1em] uppercase text-wall-ink">
                {artist.styles.map(s => styleById.get(s)?.name ?? s).join(' / ')}
              </p>
              <p className="mt-auto pt-2 font-sans text-sm leading-relaxed text-wall-muted">{artist.booksNote}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}

export const ArtistStationsSection = Object.assign(ArtistStationsRoot, { Header: SectionHeader });

/* ==========================================================================
   4. "Styles we tattoo" — a shop menu board: one ruled row per style, the
   name at sign scale, and the row floods red on hover.
   ========================================================================== */

function StyleSamplerRoot({ children }: Children) {
  return (
    <section aria-labelledby="home-styles-heading" className="grain py-20 lg:py-28">
      <div className="wrap">
        {children}
        <ul className="mt-12 border-t border-rule">
          {styles.map((style, i) => (
            <li key={style.id} className="border-b border-rule">
              <SiteLink
                href={`/artists/?style=${style.id}`}
                className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 px-2 py-5 text-ink no-underline transition-colors hover:bg-primary hover:text-white sm:grid-cols-[3.5rem_4rem_1fr_auto] sm:gap-6 lg:grid-cols-[4rem_4rem_1.1fr_1fr_auto]"
              >
                <span className="font-label text-xs tracking-[0.2em] text-muted group-hover:text-white">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <StyleEmblem styleId={style.id} className="hidden h-12 w-12 sm:block" />
                <span className="font-display text-[clamp(2rem,4.4vw,3.6rem)] leading-none">{style.name}</span>
                <span className="hidden font-sans text-sm text-muted group-hover:text-white lg:block">{style.suits}</span>
                <span aria-hidden="true" className="font-cond text-2xl transition-transform group-hover:translate-x-1">→</span>
              </SiteLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export const StyleSamplerSection = Object.assign(StyleSamplerRoot, { Header: SectionHeader });

/* ==========================================================================
   5. "How a booking happens" — four hollow numerals on a hard grid and a
   black enquiry-only notice with a red stamp.
   ========================================================================== */

function BookingStepsRoot({ children, stamp }: { children: ReactNode; stamp: ReactNode }) {
  return (
    <section aria-labelledby="home-booking-heading" className="grain border-t border-rule py-20 lg:py-28">
      {children}

      <div className="wrap mt-14">
        <div className="night-wall grid gap-6 border border-wall-rule p-6 sm:p-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
          <p className="stamp -rotate-6 self-start text-sm text-wall-accent! lg:self-center">
            Enquiry only
            <br />
            No online payments
          </p>
          <p className="font-sans text-lg leading-relaxed text-wall-ink sm:text-xl">{stamp}</p>
          <SiteLink href="/deposits/" className="button button-wall shrink-0">
            Deposit policy →
          </SiteLink>
        </div>
      </div>
    </section>
  );
}

function BookingHeader(props: Parameters<typeof SectionHeader>[0]) {
  return (
    <div className="wrap">
      <SectionHeader {...props} />
    </div>
  );
}

function BookingStepGrid({ children }: Children) {
  return (
    <div className="wrap mt-12">
      <ol className="grid border-t border-l border-rule sm:grid-cols-2 lg:grid-cols-4">{children}</ol>
    </div>
  );
}

function BookingStep({
  number,
  title,
  children,
}: {
  number: 1 | 2 | 3 | 4;
  title: string;
  children: ReactNode;
}) {
  return (
    <li className="group relative border-r border-b border-rule p-6 transition-colors hover:bg-surface sm:p-8">
      <span
        aria-hidden="true"
        className="type-outline block font-cond text-[7rem] leading-[0.8] font-bold text-ink transition-colors group-hover:text-primary-ink"
      >
        0{number}
      </span>
      <h3 className="mt-6 font-display text-[2.1rem] leading-none text-ink">
        <span className="sr-only">Step {number}: </span>
        {title}
      </h3>
      <p className="mt-3 font-sans text-base leading-relaxed text-muted">{children}</p>
    </li>
  );
}

export const BookingStepsSection = Object.assign(BookingStepsRoot, {
  Header: BookingHeader,
  Grid: BookingStepGrid,
  Step: BookingStep,
});

/* ==========================================================================
   6. "Find the studio" — black band: address in big type, hours ruled in
   mono, and the map printed in grayscale ink.
   ========================================================================== */

function StudioLocationRoot({ children }: Children) {
  return (
    <section aria-labelledby="home-studio-heading" className="night-wall py-20 lg:py-28">
      <div className="wrap grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          {children}

          <div className="mt-10 border border-wall-rule p-5 sm:p-7">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 border-b border-wall-rule pb-3">
              <h3 className="font-display text-3xl text-wall-ink">Studio hours</h3>
              <span className="font-label text-[0.7rem] tracking-[0.14em] uppercase text-wall-accent">
                <OpenBadge hours={business.hours} />
              </span>
            </div>
            <HoursTable hours={business.hours} onDark />
            <TimeZoneNote className="mt-2 font-label text-xs text-wall-muted" />
            <p className="mt-5 border-l-2 border-wall-accent pl-4 font-label text-xs leading-relaxed text-wall-ink">
              <strong className="tracking-[0.14em] uppercase">Walk-in flash:</strong> {business.walkInFlash}
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-4">
          <div className="border border-wall-rule">
            <GoogleMap
              address={business.address.full}
              title={`${business.name} map — ${business.address.full}`}
              className="[&_iframe]:min-h-[30rem]"
            />
            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-wall-rule px-4 py-3">
              <p className="font-label text-xs tracking-wide text-wall-muted">{business.address.full}</p>
              <a
                href={mapDirectionsUrl(business.address.full)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-link-wall font-cond text-sm tracking-[0.14em] uppercase"
              >
                Open directions in Google Maps →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StudioDetails({
  heading,
  eyebrow,
  children,
}: {
  heading: ReactNode;
  eyebrow: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="eyebrow text-wall-muted">
        <span className="text-wall-accent">05</span> {eyebrow}
      </p>
      <h2 id="home-studio-heading" className="type-giant mt-4 text-[clamp(3.2rem,7vw,6.5rem)] text-wall-ink">
        {heading}
      </h2>
      <div className="mt-6 space-y-2 font-sans text-base leading-relaxed text-wall-muted">{children}</div>
    </div>
  );
}

export const StudioLocationSection = Object.assign(StudioLocationRoot, {
  Details: StudioDetails,
});

/* ==========================================================================
   7. Closing band — warning stripes, a hollow 18+ at sign scale.
   ========================================================================== */

export function AgeClosingBand({
  rule,
  detail,
  cta,
}: {
  rule: ReactNode;
  detail: ReactNode;
  cta: ReactNode;
}) {
  return (
    <section aria-labelledby="age-rule-heading" className="night-wall">
      <div aria-hidden="true" className="hazard h-3" />
      <div className="wrap grid grid-cols-1 items-center gap-8 py-16 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <p
          aria-hidden="true"
          className="type-outline font-cond text-[clamp(8rem,22vw,19rem)] leading-[0.8] font-bold text-wall-accent lg:col-span-5"
        >
          18+
        </p>
        <div className="lg:col-span-7">
          <p className="eyebrow text-wall-muted">House rule</p>
          <h2 id="age-rule-heading" className="type-giant mt-4 text-[clamp(2.6rem,5vw,4.5rem)] text-wall-ink">
            {rule}
          </h2>
          <p className="mt-5 max-w-xl font-sans text-base leading-relaxed text-wall-muted">{detail}</p>
          <SiteLink href="/contact/" className="button mt-8">
            {cta}
          </SiteLink>
        </div>
      </div>
      <div aria-hidden="true" className="hazard h-3" />
    </section>
  );
}
