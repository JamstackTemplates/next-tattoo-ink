import type { Metadata } from 'next';
import { IdCardIcon, InkCapIcon } from '../../components/art/icons';
import { DepositTicket } from '../../components/deposit-ticket';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { formatUsd } from '../../content/flash';
import { policies, policyRules } from '../../content/policies';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Deposits & Policy',
  description:
    'Midnight Needle Tattoo deposit schedule, shop minimum, hourly and day rates, rescheduling rules, 18+ ID policy and studio FAQ.',
  alternates: { canonical: absoluteUrl('/deposits/') },
};

export default function DepositsPage() {
  return (
    <>
      <PageHead eyebrow="Clear rules · No surprises" title="Deposits & Policy" motif="sacred-heart">
        <p>
          Every number below is straight off the shop wall. Deposits are arranged directly with your
          artist after they reply to your enquiry — this website does not take payments.
        </p>
      </PageHead>

      {/* Full-width perforated deposit ticket */}
      <div className="wrap pb-12">
        <DepositTicket policy={policies} />
      </div>

      {/* Pricing basics — three figures at sign scale */}
      <section aria-labelledby="pricing-basics-heading" className="wrap pb-16">
        <p className="eyebrow text-muted">Studio rates</p>
        <h2 id="pricing-basics-heading" className="type-giant mt-4 text-[clamp(2.6rem,5vw,4.2rem)] text-ink">
          Pricing basics
        </h2>
        <div className="mt-8 grid border-t border-l border-rule md:grid-cols-3">
          <div className="border-r border-b border-rule p-6 sm:p-8">
            <p className="label text-muted">Shop minimum</p>
            <p className="mt-3 font-cond text-7xl leading-none font-semibold text-primary-ink">
              {formatUsd(policies.shopMinimumUsd)}
            </p>
            <p className="mt-4 font-sans text-sm text-muted">
              Covers single-use sterile setup, needles and small walk-in or custom pieces.
            </p>
          </div>
          <div className="border-r border-b border-rule p-6 sm:p-8">
            <p className="label text-muted">Hourly rate</p>
            <p className="mt-3 font-cond text-7xl leading-none font-semibold text-primary-ink">
              {formatUsd(policies.hourlyRateUsd)}
              <span className="text-3xl">/hr</span>
            </p>
            <p className="mt-4 font-sans text-sm text-muted">
              Standard rate for custom pieces and multi-session work; your artist quotes before
              booking.
            </p>
          </div>
          <div className="border-r border-b border-rule p-6 sm:p-8">
            <p className="label text-muted">Full-day rate</p>
            <p className="mt-3 font-cond text-7xl leading-none font-semibold text-primary-ink">
              {formatUsd(policies.dayRateUsd)}
            </p>
            <p className="mt-4 font-sans text-sm text-muted">
              Up to {policies.dayRateHours} hours in the chair for sleeves, back pieces and large
              sessions.
            </p>
          </div>
        </div>
      </section>

      {/* Rules as a numbered house-rules board */}
      <section aria-labelledby="rules-heading" className="wrap pb-16">
        <div className="night-wall border border-wall-rule p-6 sm:p-10">
          <p className="eyebrow text-wall-muted">House rules · Read before booking</p>
          <h2 id="rules-heading" className="type-giant mt-4 text-[clamp(2.4rem,4.6vw,3.8rem)] text-wall-ink">
            Deposit, reschedule &amp; studio rules
          </h2>
          <ol className="mt-8 border-t border-wall-rule">
            {policyRules.map((rule, i) => (
              <li key={rule} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-wall-rule py-4 font-sans text-base leading-relaxed text-wall-ink">
                <span className="font-label text-xs leading-7 tracking-[0.14em] text-wall-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span>{rule}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 18+ with valid photo ID band */}
      <section aria-labelledby="age-policy-heading" className="night-wall">
        <div aria-hidden="true" className="hazard h-3" />
        <div className="wrap flex flex-col items-start justify-between gap-8 py-14 md:flex-row md:items-center">
          <div className="flex items-center gap-6">
            <IdCardIcon className="h-14 w-14 shrink-0 text-wall-accent" />
            <div>
              <p className="eyebrow text-wall-muted">No exceptions</p>
              <h2 id="age-policy-heading" className="type-giant mt-3 text-[clamp(2.4rem,4.4vw,3.6rem)] text-wall-ink">
                {policies.minimumAge}+ with valid photo ID
              </h2>
              <p className="mt-3 max-w-2xl font-sans text-sm text-wall-muted sm:text-base">
                Bring an unexpired government-issued photo ID (state ID, driver’s licence or
                passport) to every appointment. We do not tattoo anyone under {policies.minimumAge},
                even with a parent or guardian present.
              </p>
            </div>
          </div>
          <SiteLink href="/contact/" className="button shrink-0">
            <InkCapIcon className="h-5 w-5" />
            <span>Send a booking enquiry</span>
          </SiteLink>
        </div>
        <div aria-hidden="true" className="hazard h-3" />
      </section>

      {/* FAQ as ruled details accordion (no headings inside summary per modern-web-guidance) */}
      <section aria-labelledby="faq-heading" className="faq-accordion wrap py-20">
        <p className="eyebrow text-muted">Common questions</p>
        <h2 id="faq-heading" className="type-giant mt-4 text-[clamp(2.6rem,5vw,4.2rem)] text-ink">
          Before you sit in the chair
        </h2>

        <div className="mt-10">
          <details>
            <summary>Do you take on cover-ups and blast-overs?</summary>
            <div className="max-w-3xl pb-6 font-sans text-base leading-relaxed text-muted">
              Yes — Vee Okafor and Rook Alvarez both love solid cover-up work. In your enquiry,
              describe the size, age and darkness of the old tattoo (and link a clear daylight photo
              if you have one). Expect a short in-person consultation before locking in a custom
              cover-up design.
            </div>
          </details>

          <details>
            <summary>How do free touch-ups work?</summary>
            <div className="max-w-3xl pb-6 font-sans text-base leading-relaxed text-muted">
              We include one free touch-up within {policies.touchUpMonths} months of your original
              appointment when studio aftercare was followed (excluding hands, fingers and feet,
              which naturally wear faster). Wait at least 4–6 weeks for the piece to settle, then
              send a touch-up enquiry.
            </div>
          </details>

          <details>
            <summary>Can I bring a friend or guest with me?</summary>
            <div className="max-w-3xl pb-6 font-sans text-base leading-relaxed text-muted">
              Our upstairs room is snug and busy on weekends. One quiet friend is welcome in the
              front waiting area, and for space and hygiene we keep tattoo stations one-on-one
              unless you’ve checked with your artist beforehand. No children or pets in the studio.
            </div>
          </details>

          <details>
            <summary>Can I use numbing cream before my appointment?</summary>
            <div className="max-w-3xl pb-6 font-sans text-base leading-relaxed text-muted">
              Please talk to your artist before applying any topical anaesthetic. Some creams change
              skin texture and affect how cleanly ink takes — never show up with numbing cream
              already on without checking first.
            </div>
          </details>
        </div>
      </section>
    </>
  );
}
