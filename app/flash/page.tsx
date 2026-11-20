import type { Metadata } from 'next';
import { ClockIcon, InkCapIcon } from '../../components/art/icons';
import { FlashWallBrowser } from '../../components/flash-wall-browser';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { business } from '../../content/business';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Flash Wall',
  description:
    'Browse pinned wall flash from all four Midnight Needle Tattoo artists — prices, sizes, one-offs, repeatable sheets and walk-in flash hours.',
  alternates: { canonical: absoluteUrl('/flash/') },
};

export default function FlashPage() {
  return (
    <>
      <PageHead eyebrow="Hand-painted sheets · Seattle" title="The Flash Wall" motif="dagger-rose">
        <p>
          Every sheet on the wall is drawn in-house by our four artists. Listed prices include line
          and fill at the listed size; size or placement changes are quoted by your artist in their
          reply.
        </p>
      </PageHead>

      {/* How flash works — three ruled columns */}
      <section aria-labelledby="how-flash-works-heading" className="wrap pb-14">
        <h2 id="how-flash-works-heading" className="sr-only">How wall flash works</h2>
        <dl className="grid border-t border-l border-rule md:grid-cols-3">
          <div className="border-r border-b border-rule p-6 sm:p-8">
            <dt className="font-label text-xs tracking-[0.18em] uppercase text-muted">01 · One-off</dt>
            <dd className="mt-3 font-sans text-base leading-relaxed text-ink">
              Tattooed once and never repeated. Once tattooed, the owner stamps it{' '}
              <strong className="text-primary-ink">CLAIMED</strong> on the wall.
            </dd>
          </div>
          <div className="border-r border-b border-rule p-6 sm:p-8">
            <dt className="font-label text-xs tracking-[0.18em] uppercase text-muted">02 · Repeatable</dt>
            <dd className="mt-3 font-sans text-base leading-relaxed text-ink">
              Classic shop flash that can be tattooed on anyone — available by enquiry or during
              weekend walk-in flash hours.
            </dd>
          </div>
          <div className="border-r border-b border-rule p-6 sm:p-8">
            <dt className="font-label text-xs tracking-[0.18em] uppercase text-muted">03 · Claimed</dt>
            <dd className="mt-3 font-sans text-base leading-relaxed text-ink">
              Already tattooed on someone’s skin. Kept pinned as part of the shop wall archive so
              you can see each artist’s hand.
            </dd>
          </div>
        </dl>
      </section>

      {/* Interactive wall + cork-dark artist groups */}
      <FlashWallBrowser />

      {/* Walk-in flash & claim-a-piece */}
      <section aria-labelledby="walk-in-heading" className="wrap py-16">
        <div className="grid border-t border-l border-rule md:grid-cols-2">
          <div className="night-wall border-r border-b border-wall-rule p-7 sm:p-10">
            <p className="flex items-center gap-2 font-label text-xs tracking-[0.18em] uppercase text-wall-accent">
              <ClockIcon className="h-4 w-4" />
              <span>Walk-in flash days</span>
            </p>
            <h2 id="walk-in-heading" className="type-giant mt-4 text-[clamp(2.4rem,4.4vw,3.6rem)] text-wall-ink">
              Fridays &amp; Saturdays, 2 pm–9 pm
            </h2>
            <p className="mt-4 font-sans text-base leading-relaxed text-wall-muted">
              {business.walkInFlash} Bring valid government photo ID (18+ only) and expect a short
              wait on busy nights.
            </p>
          </div>

          <div className="flex flex-col justify-between border-r border-b border-rule p-7 sm:p-10">
            <div>
              <p className="eyebrow text-muted">Enquire about a sheet</p>
              <h2 className="type-giant mt-4 text-[clamp(2.4rem,4.4vw,3.6rem)] text-ink">Claim a piece</h2>
              <p className="mt-4 font-sans text-base leading-relaxed text-muted">
                Send an enquiry with the exact <strong className="text-ink">flash ID</strong> (for example{' '}
                <code className="font-label text-ink">dagger-rose</code>), your preferred placement and
                days that suit you. Sending an enquiry does not hold or reserve a piece — your artist
                confirms availability in their reply and explains how to arrange the deposit.
              </p>
            </div>
            <div className="mt-8">
              <SiteLink href="/contact/" className="button">
                <InkCapIcon className="h-5 w-5" />
                <span>Send a flash enquiry</span>
              </SiteLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
