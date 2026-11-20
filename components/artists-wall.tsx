'use client';

import { useEffect, useState } from 'react';
import { artists } from '../content/artists';
import { styles, styleById, type StyleId } from '../content/styles';
import { CalendarIcon } from './art/icons';
import { MotifArt } from './art/motifs';
import { BookStatusTag } from './book-status';
import { SiteLink } from './site-link';

/**
 * Interactive artist directory with square style filter chips.
 * Reads ?style= on mount. Without JS, all artists render and the filter bar is omitted.
 */
export function ArtistsWall() {
  const [mounted, setMounted] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<StyleId | 'all'>('all');

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const raw = params.get('style');
    if (raw && styleById.has(raw)) {
      setSelectedStyle(raw as StyleId);
    }
  }, []);

  function chooseStyle(next: StyleId | 'all') {
    setSelectedStyle(next);
    const url = new URL(window.location.href);
    if (next === 'all') url.searchParams.delete('style');
    else url.searchParams.set('style', next);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  const visible =
    selectedStyle === 'all'
      ? artists
      : artists.filter(artist => artist.styles.includes(selectedStyle));

  return (
    <div className="wrap pb-16">
      {mounted ? (
        <section aria-label="Filter artists by style" className="mb-12 border-y border-rule py-6">
          <p className="label mb-3 text-muted">Filter by style</p>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Tattoo styles">
            <button
              type="button"
              aria-pressed={selectedStyle === 'all'}
              onClick={() => chooseStyle('all')}
              className="chip"
            >
              All styles ({artists.length})
            </button>
            {styles.map(style => {
              const active = selectedStyle === style.id;
              return (
                <button
                  key={style.id}
                  type="button"
                  aria-pressed={active}
                  onClick={() => chooseStyle(active ? 'all' : style.id)}
                  className="chip"
                >
                  {style.name}
                </button>
              );
            })}
          </div>
        </section>
      ) : null}

      <div className="border-t border-rule">
        {visible.map((artist, index) => {
          const reversed = index % 2 === 1;
          return (
            <article key={artist.id} className="grid gap-0 border-b border-rule md:grid-cols-12">
              {/* Signature motif on black stock */}
              <div className={`art-stage relative flex min-h-[20rem] items-center justify-center md:col-span-5 ${reversed ? 'md:order-2' : ''}`}>
                <span className="absolute top-5 left-5 font-label text-[0.7rem] tracking-[0.2em] text-wall-muted">
                  Stool 0{artists.indexOf(artist) + 1}
                </span>
                <span className="absolute top-5 right-5 text-wall-ink">
                  <BookStatusTag status={artist.books} />
                </span>
                <MotifArt motif={artist.signatureMotif} className="h-56 w-56 lg:h-64 lg:w-64" />
                <span className="absolute bottom-5 left-5 font-label text-[0.7rem] tracking-[0.2em] uppercase text-wall-muted">
                  {artist.yearsTattooing} years tattooing
                </span>
              </div>

              {/* Bio, styles, schedule & link */}
              <div className={`p-6 sm:p-10 md:col-span-7 ${reversed ? 'md:order-1' : ''}`}>
                <p className="eyebrow text-muted">{artist.role}</p>
                <h2 className="type-giant mt-4 text-[clamp(2.8rem,5vw,4.5rem)] text-ink">
                  <SiteLink href={`/artists/${artist.id}/`} className="no-underline hover:text-primary-ink">
                    {artist.name}
                  </SiteLink>
                </h2>

                <ul className="mt-4 flex flex-wrap gap-2">
                  {artist.styles.map(styleId => (
                    <li key={styleId} className="border border-rule px-2.5 py-1 font-label text-[0.7rem] tracking-[0.12em] uppercase text-ink">
                      {styleById.get(styleId)?.name ?? styleId}
                    </li>
                  ))}
                </ul>

                <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-ink">{artist.bio}</p>

                <dl className="mt-6 grid gap-4 border-t border-rule-soft pt-5 font-label text-xs sm:grid-cols-2">
                  <div>
                    <dt className="tracking-[0.14em] uppercase text-muted">Book status</dt>
                    <dd className="mt-1 text-sm text-ink">{artist.booksNote}</dd>
                  </div>
                  <div>
                    <dt className="flex items-center gap-1.5 tracking-[0.14em] uppercase text-muted">
                      <CalendarIcon className="h-3.5 w-3.5" />
                      <span>Studio days</span>
                    </dt>
                    <dd className="mt-1 text-sm text-ink">{artist.days}</dd>
                  </div>
                </dl>

                <div className="mt-7 flex flex-wrap items-center gap-4">
                  <SiteLink href={`/artists/${artist.id}/`} className="button">
                    View portfolio
                  </SiteLink>
                  <SiteLink href="/contact/" className="text-link font-cond text-sm tracking-[0.14em] uppercase">
                    Enquire with {artist.name.split(' ')[0]} →
                  </SiteLink>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
