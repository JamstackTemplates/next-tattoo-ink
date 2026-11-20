import { business } from '../content/business';
import { formatDayHours } from '../lib/hours';
import { Wordmark } from './art/wordmark';
import { OpenBadge } from './open-badge';
import { SiteLink } from './site-link';

const FOOTER_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/artists/', label: 'Artists' },
  { href: '/flash/', label: 'Flash wall' },
  { href: '/aftercare/', label: 'Aftercare guide' },
  { href: '/deposits/', label: 'Deposits & policy' },
];

export function SiteFooter() {
  return (
    <footer className="site-footer night-wall overflow-hidden border-t border-wall-rule pt-16">
      <div className="wrap grid gap-12 md:grid-cols-12">
        {/* Brand & address */}
        <div className="md:col-span-4">
          <SiteLink href="/" className="inline-block no-underline">
            <Wordmark />
          </SiteLink>
          <p className="mt-6 font-sans text-sm leading-relaxed text-wall-muted">
            {business.address.full}
            <br />
            {business.address.landmark}
          </p>
          <div className="mt-5 flex flex-col gap-1.5 font-label text-sm">
            <a className="text-link-wall wrap-anywhere" href={`mailto:${business.email}`}>
              {business.email}
            </a>
            {business.phone ? (
              <a className="text-wall-ink hover:text-wall-accent" href={`tel:${business.phone.replace(/[^\d+]/g, '')}`}>
                {business.phone}
              </a>
            ) : null}
          </div>
          <p className="stamp mt-6 -rotate-3 text-xs text-wall-accent!">18+ with valid photo ID. No exceptions.</p>
        </div>

        {/* Hours */}
        <div className="md:col-span-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-wall-ink pb-2">
            <h2 className="font-cond text-lg tracking-[0.18em] uppercase text-wall-ink">Studio hours</h2>
            <span className="font-label text-[0.7rem] tracking-[0.12em] uppercase text-wall-accent">
              <OpenBadge hours={business.hours} />
            </span>
          </div>
          <dl className="mt-3 grid grid-cols-2 gap-x-6 font-label text-xs text-wall-muted">
            {business.hours.map(entry => (
              <div key={entry.day} className="flex justify-between gap-2 border-b border-wall-rule py-1.5">
                <dt className="text-wall-ink">{entry.day.slice(0, 3)}</dt>
                <dd className={entry.opens ? '' : 'text-wall-accent'}>{formatDayHours(entry)}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 font-sans text-xs leading-relaxed text-wall-muted">{business.walkInFlash}</p>
        </div>

        {/* Navigation links */}
        <div className="md:col-span-3">
          <h2 className="border-b border-wall-ink pb-2 font-cond text-lg tracking-[0.18em] uppercase text-wall-ink">Around the shop</h2>
          <ul className="mt-3 space-y-2.5 font-cond text-base tracking-[0.08em] uppercase">
            {FOOTER_LINKS.map(link => (
              <li key={link.href}>
                <SiteLink href={link.href} className="text-wall-ink no-underline hover:text-wall-accent">
                  {link.label}
                </SiteLink>
              </li>
            ))}
            <li>
              <SiteLink href="/contact/" className="text-link-wall">
                Send a booking enquiry
              </SiteLink>
            </li>
          </ul>
        </div>
      </div>

      <div className="wrap mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-wall-rule pt-6 font-label text-[0.7rem] tracking-[0.12em] uppercase text-wall-muted">
        <span>{business.name} · Capitol Hill, Seattle</span>
        <span title="Made with love by jamstacks.net">
          Built with{' '}
          <a className="text-wall-ink underline hover:text-wall-accent" href="https://jamstacks.net">
            jamstacks.net
          </a>
        </span>
      </div>

      {/* Shop sign: the name in hollow linework, cropped by the floor */}
      <p
        aria-hidden="true"
        className="type-giant type-outline mt-10 -mb-[3.2vw] text-center text-[16vw] leading-[0.85] whitespace-nowrap text-wall-rule select-none"
      >
        Midnight Needle
      </p>
    </footer>
  );
}
