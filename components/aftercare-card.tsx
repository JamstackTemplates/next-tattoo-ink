import { aftercareDont, aftercareDo, aftercarePhases, type AftercareIconId } from '../content/aftercare';
import { business } from '../content/business';
import { policies } from '../content/policies';
import { CalendarIcon, NoSunIcon, SoapIcon, StencilIcon, WrapIcon } from './art/icons';
import { SiteLink } from './site-link';

const PHASE_ICON: Record<AftercareIconId, typeof WrapIcon> = {
  wrap: WrapIcon,
  soap: SoapIcon,
  stencil: StencilIcon,
  'no-sun': NoSunIcon,
  calendar: CalendarIcon,
};

/**
 * Printable healing card: ruled phases with red mono window tags, a Do/Don't split,
 * a doctor warning slip and the free touch-up note reading policies.touchUpMonths.
 * Prints as clean black on white.
 */
export function AftercareCard() {
  return (
    <div className="wrap pb-16">
      {/* Main printable aftercare card */}
      <article className="panel print-card relative mx-auto max-w-4xl overflow-hidden">
          {/* Card header */}
        <div className="night-wall border-b border-sheet-rule px-6 py-7 sm:px-9">
          <p className="label text-wall-muted">
            {business.name} · {business.address.full} · {business.phone}
          </p>
          <h2 className="type-giant mt-3 text-4xl text-wall-ink sm:text-5xl">
            Day-by-day healing card
          </h2>
          <p className="mt-3 font-label text-xs text-wall-muted">
            Print this sheet and tape it to the bathroom mirror while your new tattoo heals.
          </p>
        </div>

        {/* Perforated vertical timeline of healing phases */}
        <ol className="divide-y divide-sheet-rule">
          {aftercarePhases.map((phase, idx) => {
            const Icon = PHASE_ICON[phase.icon];
            return (
              <li key={phase.id} className="print-break-avoid grid gap-4 px-6 py-6 sm:grid-cols-12 sm:px-9">
                <div className="sm:col-span-4">
                  <span className="inline-flex items-center gap-2 bg-primary px-3 py-1 font-label text-xs tracking-[0.14em] text-white uppercase">
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{phase.window}</span>
                  </span>
                  <h3 className="mt-3 font-display text-3xl text-sheet-ink sm:text-4xl">
                    {idx + 1}. {phase.title}
                  </h3>
                </div>

                <ul className="space-y-2.5 sm:col-span-8">
                  {phase.steps.map(step => (
                    <li key={step} className="flex items-start gap-2.5 font-sans text-sm leading-relaxed text-sheet-ink sm:text-base">
                      <span
                        aria-hidden="true"
                        className="mt-1.5 inline-block h-3.5 w-3.5 shrink-0 border border-sheet-ink"
                      />
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>

        {/* Do / Don't split sheet */}
        <section
          aria-labelledby="do-dont-heading"
          className="print-break-avoid border-t border-sheet-rule px-6 py-8 sm:px-9"
        >
          <h2 id="do-dont-heading" className="type-giant text-4xl text-sheet-ink">
            Quick check: Do &amp; Don’t
          </h2>
          <div className="mt-6 grid gap-0 border-t border-l border-sheet-rule md:grid-cols-2">
            <div className="border-r border-b border-sheet-rule p-5 sm:p-6">
              <h3 className="font-cond text-lg tracking-[0.16em] uppercase text-sheet-ink">
                ✓ Do
              </h3>
              <ul className="mt-3 space-y-2 font-sans text-sm text-sheet-ink">
                {aftercareDo.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="font-bold text-sheet-ink">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-r border-b border-sheet-rule p-5 sm:p-6">
              <h3 className="font-cond text-lg tracking-[0.16em] uppercase text-primary-ink">
                ✕ Don’t
              </h3>
              <ul className="mt-3 space-y-2 font-sans text-sm text-sheet-ink">
                {aftercareDont.map(item => (
                  <li key={item} className="flex items-start gap-2">
                    <span aria-hidden="true" className="font-bold text-primary-ink">✕</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* When to call a doctor warning slip */}
        <section
          aria-labelledby="doctor-heading"
          className="print-break-avoid border-t border-sheet-rule px-6 py-8 sm:px-9"
        >
          <div className="border-2 border-primary-ink p-5 sm:p-6">
            <p className="stamp mb-3 -rotate-2 text-xs">Medical warning</p>
            <h2 id="doctor-heading" className="type-giant text-3xl text-sheet-ink sm:text-4xl">
              When to call a doctor
            </h2>
            <p className="mt-2 font-sans text-sm leading-relaxed text-sheet-ink sm:text-base">
              Mild redness and warmth for a day or two is normal, but watch for signs of infection:
              <strong> spreading redness</strong> moving outward from the tattoo, increasing heat or swelling,
              fever, chills, red streaks or yellow/green pus. <strong>We are tattooers, not medical professionals; see a doctor</strong>{' '}
              or urgent care clinic right away if you spot any of these symptoms.
            </p>
          </div>
        </section>

        {/* Free touch-up policy note */}
        <div className="print-break-avoid flex flex-wrap items-center justify-between gap-4 border-t border-sheet-rule bg-sheet-2 px-6 py-6 sm:px-9">
          <div>
            <h2 className="type-giant text-3xl text-sheet-ink">
              Free touch-up within {policies.touchUpMonths} months
            </h2>
            <p className="mt-1 max-w-2xl font-sans text-sm text-sheet-muted">
              Once your tattoo is fully healed (after 4–6 weeks), if a line dropped ink while you followed
              aftercare, send a touch-up enquiry within {policies.touchUpMonths} months and we’ll sharpen it up
              at no charge (excludes hands, fingers and feet).
            </p>
          </div>
          <SiteLink href="/contact/" className="no-print button shrink-0 text-xs">
            Send a touch-up enquiry
          </SiteLink>
        </div>
      </article>
    </div>
  );
}
