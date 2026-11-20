import type { Metadata } from 'next';
import {
  AgeClosingBand,
  ArtistStationsSection,
  BookingStepsSection,
  FlashWallSection,
  Hero,
  StudioLocationSection,
  StyleSamplerSection,
} from '../components/home-sections';
import { business } from '../content/business';
import { absoluteUrl } from '../lib/paths';
import { businessStructuredData, jsonLd } from '../lib/structured-data';

export const metadata: Metadata = {
  alternates: { canonical: absoluteUrl('/') },
};

export default function HomePage() {
  return (
    <>
      <Hero>
        <Hero.Heading>
          <Hero.Line>Black ink.</Hero.Line>
          <Hero.Line tone="outline">Steady hands.</Hero.Line>
          <Hero.Line tone="neon">Open late.</Hero.Line>
        </Hero.Heading>
        <Hero.Intro>
          Four artists, one long wall of flash, and a studio that keeps the lamps on until ten on
          weekends. Pick a piece off the wall or bring us an idea worth drawing.
        </Hero.Intro>
        <Hero.Actions primary="Send a booking enquiry" secondary="See the flash wall" />
      </Hero>

      <FlashWallSection>
        <FlashWallSection.Header
          id="home-flash-heading"
          index="01"
          eyebrow="Pinned on the wall"
          title="Pick off the wall"
          ctaHref="/flash/"
          ctaLabel="Browse the full flash wall"
        />
      </FlashWallSection>

      <ArtistStationsSection>
        <ArtistStationsSection.Header
          id="home-artists-heading"
          index="02"
          eyebrow="Four stations · Capitol Hill"
          title="Who’s on the stools"
          ctaHref="/artists/"
          ctaLabel="Compare all four artists"
          onDark
        />
      </ArtistStationsSection>

      <StyleSamplerSection>
        <StyleSamplerSection.Header
          id="home-styles-heading"
          index="03"
          eyebrow="Pick a style to filter artists"
          title="Styles we tattoo"
          ctaHref="/artists/"
          ctaLabel="See every artist"
        />
      </StyleSamplerSection>

      <BookingStepsSection
        stamp="Nothing is booked until your artist replies with a date and your deposit is received. Deposits are arranged directly with your artist — this website does not take payments."
      >
        <BookingStepsSection.Header
          id="home-booking-heading"
          index="04"
          eyebrow="From idea to healed ink"
          title="How a booking happens"
        />
        <BookingStepsSection.Grid>
          <BookingStepsSection.Step number={1} title="Send an enquiry">
            Tell us the style, placement, rough size in inches, and artist you prefer — or quote a
            flash ID straight off the wall.
          </BookingStepsSection.Step>
          <BookingStepsSection.Step number={2} title="Quote &amp; dates">
            Your artist replies by email with a price estimate, open dates and any quick questions
            about placement or cover-up details.
          </BookingStepsSection.Step>
          <BookingStepsSection.Step number={3} title="Deposit directly">
            Once you pick a slot, your artist sends deposit instructions directly. Your deposit
            holds the time and comes off your final session total.
          </BookingStepsSection.Step>
          <BookingStepsSection.Step number={4} title="Stencil, ink, care">
            Show up fed and rested with photo ID. We size the stencil on your skin, tattoo the
            piece and send you home with printed aftercare.
          </BookingStepsSection.Step>
        </BookingStepsSection.Grid>
      </BookingStepsSection>

      <StudioLocationSection>
        <StudioLocationSection.Details eyebrow="Capitol Hill · Seattle" heading="Find the studio">
          <p className="font-cond text-2xl leading-snug tracking-[0.06em] text-wall-ink uppercase sm:text-3xl">{business.address.full}</p>
          <p className="text-wall-ink">{business.address.landmark}</p>
          <p>{business.address.directions}</p>
          <p className="pt-3 font-label text-sm">
            <a className="text-link-wall" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
              {business.phone}
            </a>
            {' · '}
            <a className="text-link-wall wrap-anywhere" href={`mailto:${business.email}`}>
              {business.email}
            </a>
          </p>
        </StudioLocationSection.Details>
      </StudioLocationSection>

      <AgeClosingBand
        rule="18+ with valid photo ID. No exceptions."
        detail="Bring a valid government-issued photo ID to every appointment or walk-in flash session — no tattoos on minors, with or without parental consent."
        cta="Send a booking enquiry"
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd(businessStructuredData()) }}
      />
    </>
  );
}
