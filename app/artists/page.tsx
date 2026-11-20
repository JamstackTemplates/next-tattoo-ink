import type { Metadata } from 'next';
import { ArtistsWall } from '../../components/artists-wall';
import { PageHead } from '../../components/page-head';
import { SiteLink } from '../../components/site-link';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Artists',
  description:
    'Meet the four tattoo artists at Midnight Needle Tattoo in Seattle — compare styles, studio days and current book status.',
  alternates: { canonical: absoluteUrl('/artists/') },
};

export default function ArtistsPage() {
  return (
    <>
      <PageHead eyebrow="Four stools · Capitol Hill" title="Artists" motif="swallow">
        <p>
          Compare our four resident tattooers by style, studio days and current books. Open any
          artist to see their portfolio plates and current wall flash.
        </p>
      </PageHead>

      <ArtistsWall />

      <section aria-labelledby="match-artist-heading" className="wrap pb-16">
        <div className="night-wall grid gap-6 border border-wall-rule p-7 sm:p-10 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow text-wall-muted">First tattoo or torn between two styles?</p>
            <h2 id="match-artist-heading" className="type-giant mt-4 text-[clamp(2.6rem,5vw,4rem)] text-wall-ink">
              Not sure who fits?
            </h2>
            <p className="mt-3 max-w-2xl font-sans text-base text-wall-muted">
              Name a style or describe the piece in your enquiry and we’ll match you with the artist
              best suited to draw and tattoo it.
            </p>
          </div>
          <SiteLink href="/contact/" className="button shrink-0">
            Send a booking enquiry
          </SiteLink>
        </div>
      </section>
    </>
  );
}
