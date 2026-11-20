import type { Metadata } from 'next';
import { ClockIcon, IdCardIcon, MapPinIcon } from '../../components/art/icons';
import { CopyEmail } from '../../components/copy-email';
import { HoursTable } from '../../components/hours-table';
import { JamstacksSupportForm } from '../../components/jamstacks-support-form';
import { OpenBadge } from '../../components/open-badge';
import { PageHead } from '../../components/page-head';
import { TimeZoneNote } from '../../components/time-zone-note';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';
import { site } from '../../lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description: business.enquiries.introduction,
  alternates: { canonical: absoluteUrl('/contact/') },
};

export default function ContactPage() {
  const hosted = Boolean(site.jamstacksSite && site.jamstacksEmbedUrl);

  return (
    <>
      <PageHead eyebrow="Booking &amp; flash enquiries" title={business.enquiries.title} motif="anchor">
        <p>{business.enquiries.introduction}</p>
      </PageHead>

      <div className="wrap grid grid-cols-1 items-start gap-10 pb-20 lg:grid-cols-12">
        {/* Checklist — first on mobile, right column top on desktop */}
        <section aria-labelledby="include-heading" className="order-1 lg:order-2 lg:col-span-5">
          <div className="border-t-2 border-rule pt-6">
            <p className="eyebrow text-muted">Before you write</p>
            <h2 id="include-heading" className="type-giant mt-4 text-[clamp(2.4rem,4vw,3.25rem)] text-ink">
              Put this in your message
            </h2>
            <p className="mt-3 font-sans text-sm text-muted">
              The form only asks for your name, email and message — drop these details right into
              your message so your artist can quote faster:
            </p>
            <ol className="mt-5 border-t border-rule-soft font-sans text-base text-ink">
              {business.enquiries.usefulToInclude.map((tip, index) => (
                <li key={tip} className="flex items-start gap-4 border-b border-rule-soft py-3">
                  <span className="font-label text-xs leading-6 tracking-[0.14em] text-primary-ink">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span>{tip}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Direct contact details, visible email + copy button, phone, address, hours */}
          <aside aria-label="Studio contact details" className="mt-10 hidden lg:block">
            <ContactDetailsCard />
          </aside>
        </section>

        {/* Hosted form or email fallback on a black panel */}
        <section aria-label="Booking enquiry form" className="order-2 lg:order-1 lg:col-span-7">
          <div className="night-wall border border-wall-rule p-4 sm:p-6">
            <div className="mb-4 flex items-center justify-between font-label text-[0.68rem] tracking-[0.2em] uppercase text-wall-muted">
              <span>Booking enquiry</span>
              <span className="text-wall-accent">Enquiry only</span>
            </div>
            <div className="panel p-5 sm:p-7">
              {hosted ? (
                <JamstacksSupportForm
                  siteId={site.jamstacksSite}
                  embedUrl={site.jamstacksEmbedUrl}
                  email={business.email}
                />
              ) : (
                <div>
                  <p className="stamp mb-4 -rotate-2 text-xs">Direct email enquiry</p>
                  <h2 className="type-giant text-[clamp(2.2rem,4vw,3rem)] text-sheet-ink">
                    Write to the studio directly
                  </h2>
                  <p className="mt-4 font-sans text-base leading-relaxed text-sheet-muted">
                    The online enquiry form is not connected on this preview. Send your tattoo or
                    flash enquiry directly to{' '}
                    <a className="text-link-sheet font-semibold wrap-anywhere" href={`mailto:${business.email}`}>
                      {business.email}
                    </a>{' '}
                    with the checklist details alongside, and we’ll pass it straight to your artist.
                  </p>
                  <div className="mt-6 flex flex-wrap items-center gap-3">
                    <a className="button" href={`mailto:${business.email}?subject=Tattoo%20enquiry`}>
                      Email {business.email}
                    </a>
                    <CopyEmail email={business.email} />
                  </div>
                </div>
              )}
            </div>

            {/* Enquiry-only & age policy wording beneath the form */}
            <div className="mt-5 space-y-2 border-t border-wall-rule pt-4 font-label text-xs leading-relaxed text-wall-muted">
              <p>
                Sending a message submits a booking enquiry only — nothing is booked, reserved or
                held until your artist replies with dates and your deposit is arranged directly.
                This website does not take payments.
              </p>
              <p className="flex items-center gap-2 text-wall-accent">
                <IdCardIcon className="h-4 w-4 shrink-0" />
                <span>All clients must be 18+ with valid photo ID at every appointment.</span>
              </p>
            </div>
          </div>
        </section>

        {/* Mobile contact details below form */}
        <aside aria-label="Studio contact details" className="order-3 lg:hidden">
          <ContactDetailsCard />
        </aside>
      </div>
    </>
  );
}

function ContactDetailsCard() {
  return (
    <div className="border-t-2 border-rule pt-6">
      <p className="eyebrow text-muted">Direct desk</p>
      <h2 className="type-giant mt-4 text-[clamp(2.2rem,3.6vw,3rem)] text-ink">Email, phone &amp; studio</h2>

      <div className="mt-5 divide-y divide-rule-soft border-y border-rule-soft">
        <div className="py-4">
          <p className="label text-muted">Studio email</p>
          <a className="text-link mt-1 block font-label text-base wrap-anywhere" href={`mailto:${business.email}`}>
            {business.email}
          </a>
          <div className="mt-3 flex flex-wrap items-center gap-3">
            <CopyEmail email={business.email} />
          </div>
        </div>

        {business.phone ? (
          <div className="py-4">
            <p className="label text-muted">Studio phone</p>
            <a className="text-link mt-1 block font-label text-base" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
              {business.phone}
            </a>
          </div>
        ) : null}

        <div className="py-4">
          <p className="label flex items-center gap-1.5 text-muted">
            <MapPinIcon className="h-3.5 w-3.5 text-primary-ink" />
            <span>Address</span>
          </p>
          <p className="mt-1 font-sans text-sm font-semibold text-ink">{business.address.full}</p>
          <p className="mt-1 font-sans text-sm text-muted">
            {business.address.landmark} {business.address.directions}
          </p>
        </div>

        <div className="py-4">
          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
            <p className="label flex items-center gap-1.5 text-muted">
              <ClockIcon className="h-3.5 w-3.5 text-primary-ink" />
              <span>Hours</span>
            </p>
            <span className="label text-primary-ink">
              <OpenBadge hours={business.hours} />
            </span>
          </div>
          <HoursTable hours={business.hours} />
          <TimeZoneNote className="mt-2 font-label text-xs text-muted" />
        </div>
      </div>
    </div>
  );
}
