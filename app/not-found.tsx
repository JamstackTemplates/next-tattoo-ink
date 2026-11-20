import { MotifArt } from '../components/art/motifs';
import { SiteLink } from '../components/site-link';

export default function NotFound() {
  return (
    <section className="night-wall relative overflow-hidden py-24 sm:py-32">
      <div className="wrap relative grid items-center gap-10 md:grid-cols-12">
        <div className="relative z-10 md:col-span-7">
          <p className="eyebrow text-wall-muted">Error 404</p>
          <h1 className="type-giant mt-5 text-[clamp(3.4rem,9vw,7.5rem)] text-wall-ink">
            That line <span className="neon">blew out.</span>
          </h1>
          <p className="mt-6 max-w-lg border-l-2 border-wall-accent pl-5 font-sans text-lg leading-relaxed text-wall-muted">
            This page isn’t on the wall. Head back to the front counter or check the flash sheets.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <SiteLink href="/" className="button">
              Back to Home
            </SiteLink>
            <SiteLink href="/flash/" className="button button-wall">
              See the flash wall
            </SiteLink>
            <SiteLink href="/contact/" className="text-link-wall font-cond text-sm tracking-[0.14em] uppercase">
              Contact the shop →
            </SiteLink>
          </div>
        </div>
        <div aria-hidden="true" className="relative md:col-span-5">
          <p className="type-outline text-center font-cond text-[clamp(8rem,22vw,18rem)] leading-none font-bold text-wall-rule">
            404
          </p>
          <MotifArt motif="spiderweb" variant="line" className="absolute inset-0 m-auto h-3/4 w-3/4 opacity-80" />
        </div>
      </div>
    </section>
  );
}
