import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CalendarIcon, InkCapIcon } from '../../../components/art/icons';
import { MotifArt } from '../../../components/art/motifs';
import { BookStatusTag } from '../../../components/book-status';
import { FlashCard } from '../../../components/flash-card';
import { PortfolioSpread } from '../../../components/portfolio-spread';
import { SiteLink } from '../../../components/site-link';
import { artistById, artists } from '../../../content/artists';
import { flashPieces } from '../../../content/flash';
import { portfolioPieces } from '../../../content/portfolio';
import { styleById } from '../../../content/styles';
import { absoluteUrl } from '../../../lib/paths';

export function generateStaticParams() {
  return artists.map(artist => ({ id: artist.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const artist = artistById.get(id);
  if (!artist) return { title: 'Artist not found' };
  const styleNames = artist.styles.map(s => styleById.get(s)?.name ?? s).join(', ');
  return {
    title: artist.name,
    description: `${artist.name} (${artist.role}) at Midnight Needle Tattoo — ${styleNames}. ${artist.booksNote}.`,
    alternates: { canonical: absoluteUrl(`/artists/${artist.id}/`) },
  };
}

export default async function ArtistPortfolioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const artist = artistById.get(id);
  if (!artist) notFound();

  const artistPortfolio = portfolioPieces.filter(piece => piece.artistId === artist.id);
  const artistFlash = flashPieces.filter(piece => piece.artistId === artist.id);
  const firstName = artist.name.split(' ')[0];

  return (
    <>
      {/* Artist head */}
      <header className="night-wall overflow-hidden border-b border-wall-rule">
        <div className="wrap py-10 sm:py-14">
          <p className="mb-8 font-label text-xs tracking-[0.14em] uppercase">
            <SiteLink href="/artists/" className="text-wall-muted underline underline-offset-4 hover:text-wall-accent">
              ← Back to all artists
            </SiteLink>
          </p>

          <div className="grid items-center gap-10 md:grid-cols-12">
            <div className="flex justify-center md:col-span-5">
              <div className="relative flex aspect-square w-full max-w-[22rem] items-center justify-center rounded-full border border-wall-rule">
                <span aria-hidden="true" className="absolute inset-3 rounded-full border border-dashed border-wall-rule" />
                <MotifArt motif={artist.signatureMotif} className="relative h-[68%] w-[68%]" />
              </div>
            </div>

            <div className="md:col-span-7">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <span className="eyebrow text-wall-muted">{artist.role}</span>
                <BookStatusTag status={artist.books} className="text-wall-ink" />
              </div>

              <h1 className="type-giant mt-5 text-[clamp(3.4rem,8vw,7rem)] text-wall-ink">{artist.name}</h1>

              <ul className="mt-5 flex flex-wrap gap-2">
                {artist.styles.map(styleId => (
                  <li
                    key={styleId}
                    className="border border-wall-rule px-3 py-1 font-label text-[0.7rem] tracking-[0.12em] uppercase text-wall-ink"
                  >
                    {styleById.get(styleId)?.name ?? styleId}
                  </li>
                ))}
              </ul>

              <p className="mt-6 max-w-2xl border-l-2 border-wall-accent pl-5 font-sans text-base leading-relaxed text-wall-muted sm:text-lg">
                {artist.bio}
              </p>

              <dl className="mt-8 grid border-t border-l border-wall-rule font-label text-xs sm:grid-cols-3">
                <div className="border-r border-b border-wall-rule p-4">
                  <dt className="tracking-[0.14em] uppercase text-wall-muted">Experience</dt>
                  <dd className="mt-1.5 text-sm text-wall-ink">{artist.yearsTattooing} years tattooing</dd>
                </div>
                <div className="border-r border-b border-wall-rule p-4">
                  <dt className="flex items-center gap-1.5 tracking-[0.14em] uppercase text-wall-muted">
                    <CalendarIcon className="h-3.5 w-3.5" />
                    <span>Studio days</span>
                  </dt>
                  <dd className="mt-1.5 text-sm text-wall-ink">{artist.days}</dd>
                </div>
                <div className="border-r border-b border-wall-rule p-4">
                  <dt className="tracking-[0.14em] uppercase text-wall-muted">Books</dt>
                  <dd className="mt-1.5 text-sm text-wall-accent">{artist.booksNote}</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </header>

      {/* Portfolio plates */}
      <PortfolioSpread artistName={artist.name} pieces={artistPortfolio} />

      {/* Artist's current flash on the wall */}
      <section aria-labelledby="artist-flash-heading" className="night-wall border-y border-wall-rule py-16 sm:py-20">
        <div className="wrap">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-wall-muted">Current sheets</p>
              <h2 id="artist-flash-heading" className="type-giant mt-4 text-[clamp(2.6rem,5vw,4.2rem)] text-wall-ink">
                On the wall from {firstName}
              </h2>
            </div>
            <SiteLink
              href={`/flash/?artist=${artist.id}`}
              className="button button-wall"
            >
              Filter full wall to {firstName} →
            </SiteLink>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {artistFlash.map((piece, idx) => (
              <FlashCard key={piece.id} piece={piece} index={idx} showArtist={false} />
            ))}
          </div>
        </div>
      </section>

      {/* Enquire closing band */}
      <section aria-labelledby="artist-enquire-heading" className="wrap py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-8 border-y border-rule py-10 md:flex-row md:items-center">
          <div>
            <p className="eyebrow text-muted">Booking enquiry</p>
            <h2 id="artist-enquire-heading" className="type-giant mt-4 text-[clamp(2.6rem,5vw,4.5rem)] text-ink">
              Enquire with {artist.name}
            </h2>
            <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-muted">
              Name <strong className="text-ink">{artist.name}</strong> at the start of your message along with your flash
              ID or custom idea, placement and rough size in inches. Nothing is booked until{' '}
              {firstName} replies with open dates and arranges your deposit directly.
            </p>
          </div>
          <SiteLink href="/contact/" className="button shrink-0">
            <InkCapIcon className="h-5 w-5" />
            <span>Enquire with {firstName}</span>
          </SiteLink>
        </div>
      </section>
    </>
  );
}
