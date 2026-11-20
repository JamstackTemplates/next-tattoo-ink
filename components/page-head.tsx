import type { ReactNode } from 'react';
import type { MotifId } from '../content/motifs';
import { MotifArt } from './art/motifs';

/**
 * Inner-page head: the same black wall as the home hero. Mono eyebrow, a
 * blackletter title at sign scale, the subtitle behind a red rule, and the
 * page's flash motif printed large on the right inside a dotted seal ring.
 */
export function PageHead({
  eyebrow,
  title,
  children,
  id,
  motif = 'swallow',
  hideInPrint = false,
}: {
  eyebrow: string;
  title: ReactNode;
  children?: ReactNode;
  id?: string;
  motif?: MotifId;
  hideInPrint?: boolean;
}) {
  return (
    <header className={`night-wall mb-14 overflow-hidden border-b border-wall-rule sm:mb-20 ${hideInPrint ? 'no-print' : ''}`}>
      <div className="wrap relative grid grid-cols-1 items-center gap-10 py-14 sm:py-20 md:grid-cols-12">
        <div className="relative z-10 md:col-span-8">
          <p className="eyebrow text-wall-muted">{eyebrow}</p>
          <h1 id={id} className="type-giant mt-5 text-[clamp(3.4rem,9vw,8rem)] text-wall-ink">
            {title}
          </h1>
          {children ? (
            <div className="mt-8 max-w-2xl border-l-2 border-wall-accent pl-5 font-sans text-base leading-relaxed text-wall-muted sm:text-lg">
              {children}
            </div>
          ) : null}
        </div>

        <div aria-hidden="true" className="hidden justify-center md:col-span-4 md:flex">
          <div className="relative flex aspect-square w-full max-w-[19rem] items-center justify-center rounded-full border border-wall-rule">
            <span className="absolute inset-3 rounded-full border border-dashed border-wall-rule" />
            <MotifArt motif={motif} className="relative h-[68%] w-[68%]" />
          </div>
        </div>
      </div>
    </header>
  );
}
