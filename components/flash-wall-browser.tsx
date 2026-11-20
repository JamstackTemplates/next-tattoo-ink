'use client';

import { useEffect, useState } from 'react';
import { artists, artistById } from '../content/artists';
import { flashPieces } from '../content/flash';
import { styles, styleById, type StyleId } from '../content/styles';
import { FlashCard } from './flash-card';
import { SiteLink } from './site-link';

/**
 * Interactive flash wall for /flash/:
 * - Style patch chips + Artist select + "Hide claimed" toggle.
 * - Mirrors ?style=&artist= to the URL.
 * - Grouped by artist on a black band, each group headed by the artist's name in blackletter.
 * - Without JS: every piece renders grouped by artist, and filters are hidden.
 */
export function FlashWallBrowser() {
  const [mounted, setMounted] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState<StyleId | 'all'>('all');
  const [selectedArtist, setSelectedArtist] = useState<string>('all');
  const [hideClaimed, setHideClaimed] = useState(false);

  useEffect(() => {
    setMounted(true);
    const params = new URLSearchParams(window.location.search);
    const styleParam = params.get('style');
    const artistParam = params.get('artist');
    if (styleParam && styleById.has(styleParam)) {
      setSelectedStyle(styleParam as StyleId);
    }
    if (artistParam && artistById.has(artistParam)) {
      setSelectedArtist(artistParam);
    }
  }, []);

  function syncUrl(nextStyle: StyleId | 'all', nextArtist: string) {
    const url = new URL(window.location.href);
    if (nextStyle === 'all') url.searchParams.delete('style');
    else url.searchParams.set('style', nextStyle);
    if (nextArtist === 'all') url.searchParams.delete('artist');
    else url.searchParams.set('artist', nextArtist);
    window.history.replaceState({}, '', `${url.pathname}${url.search}${url.hash}`);
  }

  function onSelectStyle(next: StyleId | 'all') {
    setSelectedStyle(next);
    syncUrl(next, selectedArtist);
  }

  function onSelectArtist(next: string) {
    setSelectedArtist(next);
    syncUrl(selectedStyle, next);
  }

  const filtered = flashPieces.filter(piece => {
    if (selectedStyle !== 'all' && !piece.styles.includes(selectedStyle)) return false;
    if (selectedArtist !== 'all' && piece.artistId !== selectedArtist) return false;
    if (hideClaimed && piece.status === 'claimed') return false;
    return true;
  });

  const groups = artists
    .map(artist => ({
      artist,
      pieces: filtered.filter(piece => piece.artistId === artist.id),
    }))
    .filter(group => group.pieces.length > 0);

  return (
    <div>
      {/* Progressive filter bar (hidden when JS is unavailable) */}
      {mounted ? (
        <section aria-label="Filter flash sheets" className="wrap mb-10 border-y border-rule py-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="label mb-3 text-muted">Style</p>
              <div className="flex flex-wrap gap-2" role="group" aria-label="Filter flash by style">
                <button
                  type="button"
                  aria-pressed={selectedStyle === 'all'}
                  onClick={() => onSelectStyle('all')}
                  className="chip"
                >
                  All styles
                </button>
                {styles.map(style => {
                  const active = selectedStyle === style.id;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      aria-pressed={active}
                      onClick={() => onSelectStyle(active ? 'all' : style.id)}
                      className="chip"
                    >
                      {style.name}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-end gap-4">
              <label className="flex flex-col gap-2">
                <span className="label text-muted">Artist</span>
                <select
                  value={selectedArtist}
                  onChange={e => onSelectArtist(e.target.value)}
                  className="min-h-10 border border-rule bg-bg px-3 py-1.5 font-label text-sm text-ink"
                >
                  <option value="all">All four artists</option>
                  {artists.map(artist => (
                    <option key={artist.id} value={artist.id}>
                      {artist.name}
                    </option>
                  ))}
                </select>
              </label>

              <label className="label inline-flex min-h-10 cursor-pointer items-center gap-2.5 border border-rule px-3.5 py-1.5 text-ink">
                <input
                  type="checkbox"
                  checked={hideClaimed}
                  onChange={e => setHideClaimed(e.target.checked)}
                  className="h-4 w-4 accent-primary"
                />
                <span>Hide claimed</span>
              </label>
            </div>
          </div>

          <p className="mt-5 font-label text-xs text-muted" role="status" aria-live="polite">
            Showing {filtered.length} of {flashPieces.length} flash sheets on the wall.
          </p>
        </section>
      ) : null}

      {/* Full flash wall grouped by artist on a black band */}
      <section aria-label="Pinned wall flash" className="night-wall border-y border-wall-rule py-16 sm:py-20">
        <div className="wrap space-y-20">
          {groups.length === 0 ? (
            <div className="mx-auto max-w-lg border border-wall-rule p-8 text-center">
              <p className="type-giant text-4xl text-wall-ink">Nothing on that corner of the wall.</p>
              <p className="mt-3 font-sans text-sm text-wall-muted">
                Try clearing a style or artist filter, or send a custom enquiry if you had something specific in mind.
              </p>
              {mounted ? (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedStyle('all');
                    setSelectedArtist('all');
                    setHideClaimed(false);
                    syncUrl('all', 'all');
                  }}
                  className="button mt-6"
                >
                  Show full wall
                </button>
              ) : null}
            </div>
          ) : (
            groups.map(({ artist, pieces }) => (
              <div key={artist.id}>
                <div className="mb-8 flex flex-wrap items-end justify-between gap-4 border-b border-wall-rule pb-4">
                  <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                    <h2 className="type-giant text-[clamp(2.4rem,4.6vw,3.8rem)] text-wall-ink">{artist.name}</h2>
                    <span className="label text-wall-muted">{artist.days}</span>
                  </div>
                  <SiteLink
                    href={`/artists/${artist.id}/`}
                    className="text-link-wall font-cond text-sm tracking-[0.14em] uppercase"
                  >
                    {artist.name.split(' ')[0]}’s portfolio →
                  </SiteLink>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {pieces.map((piece, idx) => (
                    <div key={piece.id}>
                      <FlashCard piece={piece} index={idx} showArtist={false} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
