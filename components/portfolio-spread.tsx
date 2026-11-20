'use client';

import { useEffect, useState } from 'react';
import type { PortfolioPiece } from '../content/portfolio';
import { styleById } from '../content/styles';
import { MotifArt } from './art/motifs';

/**
 * Portfolio plates for an artist. Each plate prints the piece in bone and red on
 * black stock with placement, size, sessions and a Healed/Fresh tag. With
 * JavaScript, visitors can strip any piece (or the whole spread) back to its
 * stencil linework. Without JS, the inked view shows.
 */
export function PortfolioSpread({
  artistName,
  pieces,
}: {
  artistName: string;
  pieces: readonly PortfolioPiece[];
}) {
  const [mounted, setMounted] = useState(false);
  const [stencilIds, setStencilIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  const allStencil = pieces.length > 0 && pieces.every(p => stencilIds[p.id]);

  function toggleOne(id: string) {
    setStencilIds(prev => ({ ...prev, [id]: !prev[id] }));
  }

  function toggleAll() {
    const next = !allStencil;
    const map: Record<string, boolean> = {};
    for (const p of pieces) map[p.id] = next;
    setStencilIds(map);
  }

  return (
    <section aria-labelledby="portfolio-heading" className="wrap py-16">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-muted">Portfolio plates</p>
          <h2 id="portfolio-heading" className="type-giant mt-4 text-[clamp(2.8rem,5vw,4.5rem)] text-ink">
            {artistName.split(' ')[0]}’s work
          </h2>
        </div>

        {mounted ? (
          <button type="button" aria-pressed={allStencil} onClick={toggleAll} className="button button-quiet text-sm">
            {allStencil ? 'Show all inked' : 'Strip all to stencil'}
          </button>
        ) : null}
      </div>

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {pieces.map((piece, idx) => {
          const isStencil = mounted && Boolean(stencilIds[piece.id]);
          const styleName = styleById.get(piece.style)?.name ?? piece.style;

          return (
            <article
              key={piece.id}
              data-portfolio-id={piece.id}
              data-view={isStencil ? 'stencil' : 'ink'}
              className="flash-tile flex flex-col border border-wall-rule bg-wall text-wall-ink"
            >
              <div className="flex items-center justify-between border-b border-wall-rule px-4 py-2.5 font-label text-[0.68rem] tracking-[0.18em] uppercase">
                <span className="text-wall-muted">Plate {String(idx + 1).padStart(2, '0')}</span>
                <span className={piece.healed ? 'text-wall-ink' : 'text-wall-accent'}>
                  {piece.healed ? 'Healed' : 'Fresh'}
                </span>
              </div>

              <div className="art-stage flex aspect-square items-center justify-center">
                <MotifArt motif={piece.motif} variant={isStencil ? 'line' : 'ink'} className="flash-tile__art h-[70%] w-[70%]" />
              </div>

              <div className="flex flex-1 flex-col border-t border-wall-rule p-4">
                <p className="label text-wall-muted">{styleName}</p>
                <h3 className="mt-1 font-display text-[1.7rem] leading-none text-wall-ink">{piece.title}</h3>
                <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-label text-[0.7rem] tracking-[0.1em] uppercase text-wall-muted">
                  <div>
                    <dt className="sr-only">Placement</dt>
                    <dd>{piece.placement}</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Size</dt>
                    <dd>{piece.sizeInches} in</dd>
                  </div>
                  <div>
                    <dt className="sr-only">Sessions</dt>
                    <dd>
                      {piece.sessions} {piece.sessions === 1 ? 'session' : 'sessions'}
                    </dd>
                  </div>
                </dl>

                {mounted ? (
                  <button
                    type="button"
                    aria-pressed={isStencil}
                    onClick={() => toggleOne(piece.id)}
                    className="mt-4 w-full border border-wall-rule px-3 py-2 font-cond text-sm tracking-[0.14em] uppercase text-wall-ink transition-colors hover:border-wall-ink hover:bg-wall-ink hover:text-wall"
                  >
                    {isStencil ? 'Show inked' : 'Strip to stencil'}
                  </button>
                ) : null}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
