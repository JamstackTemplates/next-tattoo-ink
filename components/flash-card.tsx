import { artistById } from '../content/artists';
import { formatUsd, type FlashPiece } from '../content/flash';
import { MotifArt } from './art/motifs';
import { SiteLink } from './site-link';

const STATUS_LABEL = {
  available: 'One-off',
  repeatable: 'Repeatable',
  claimed: 'Claimed',
} as const;

/**
 * Flash tile: a square of black stock with the design printed in bone and red,
 * a mono sheet number and price, and a red double-ruled CLAIMED stamp across
 * one-offs that have already been tattooed.
 */
export function FlashCard({
  piece,
  index = 0,
  showArtist = true,
}: {
  piece: FlashPiece;
  index?: number;
  showArtist?: boolean;
}) {
  const artist = artistById.get(piece.artistId);
  const isClaimed = piece.status === 'claimed';

  return (
    <article
      data-flash-id={piece.id}
      data-flash-status={piece.status}
      className="flash-tile flex h-full flex-col border border-wall-rule bg-wall text-wall-ink"
    >
      {/* Sheet header */}
      <div className="flex items-center justify-between border-b border-wall-rule px-4 py-2.5 font-label text-[0.68rem] tracking-[0.18em] uppercase">
        <span className="text-wall-muted">No. {String(index + 1).padStart(2, '0')}</span>
        <span className={piece.status === 'repeatable' ? 'text-wall-accent' : 'text-wall-muted'}>
          {STATUS_LABEL[piece.status]}
        </span>
      </div>

      {/* Artwork */}
      <div className="art-stage relative flex aspect-square items-center justify-center overflow-hidden">
        <MotifArt
          motif={piece.motif}
          className={`flash-tile__art h-[72%] w-[72%] ${isClaimed ? 'opacity-35' : ''}`}
        />
        {isClaimed ? (
          <span
            aria-label="Claimed — already tattooed"
            className="stamp pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 bg-wall/70 px-4 py-1 text-2xl text-wall-accent!"
          >
            Claimed
          </span>
        ) : null}
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col justify-between gap-3 border-t border-wall-rule p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="font-display text-[1.7rem] leading-none text-wall-ink">{piece.title}</h3>
            <p className="mt-1.5 font-label text-[0.7rem] tracking-[0.12em] uppercase text-wall-muted">
              #{piece.id} · {piece.sizeInches} in
              {showArtist && artist ? (
                <>
                  {' · '}
                  <SiteLink href={`/artists/${artist.id}/`} className="text-wall-ink underline underline-offset-4 hover:text-wall-accent">
                    {artist.name}
                  </SiteLink>
                </>
              ) : null}
            </p>
          </div>
          <p
            aria-label={`Price ${formatUsd(piece.priceUsd)}`}
            className={`font-cond text-2xl font-semibold ${isClaimed ? 'text-wall-muted line-through' : 'text-wall-ink'}`}
          >
            {formatUsd(piece.priceUsd)}
          </p>
        </div>

        {isClaimed ? (
          <p className="font-label text-[0.7rem] tracking-[0.12em] uppercase text-wall-muted">Already tattooed · wall archive</p>
        ) : (
          <SiteLink
            href="/contact/"
            className="group inline-flex items-center gap-2 font-cond text-sm tracking-[0.14em] uppercase text-wall-accent no-underline hover:text-wall-ink"
          >
            Enquire about #{piece.id}
            <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span>
          </SiteLink>
        )}
      </div>
    </article>
  );
}
