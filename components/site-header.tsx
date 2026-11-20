'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { DarkModeToggle } from 'jamstacks';
import { Wordmark } from './art/wordmark';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/artists/', label: 'Artists', markCurrent: 'section' as const },
  { href: '/flash/', label: 'Flash', markCurrent: 'page' as const },
  { href: '/aftercare/', label: 'Aftercare', markCurrent: 'page' as const },
  { href: '/deposits/', label: 'Deposits', markCurrent: 'page' as const },
  { href: '/contact/', label: 'Contact', markCurrent: 'page' as const },
];

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  return (
    <header className="site-header relative z-40">
      {/* Shop strip: hours tag, ID rule and location in mono */}
      <div className="hidden border-b border-wall-rule bg-wall text-wall-muted sm:block">
        <div className="wrap flex h-8 items-center justify-between gap-4 font-label text-[0.68rem] tracking-[0.2em] uppercase">
          <span>Capitol Hill · Seattle</span>
          <span className="hidden md:inline">Custom · Flash · Cover-ups · Walk-ins Fri &amp; Sat</span>
          <span className="text-wall-accent">18+ · Photo ID</span>
        </div>
      </div>

      <div className="night-wall border-b border-wall-rule">
        <div className="wrap flex min-h-20 items-center justify-between gap-3 py-3">
          <SiteLink href="/" className="shrink-0 no-underline" aria-label="Midnight Needle Tattoo — Home">
            <Wordmark compact />
          </SiteLink>

          {/* Desktop navigation */}
          <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map(item => (
              <SiteLink
                key={item.href}
                href={item.href}
                markCurrent={item.markCurrent}
                className="nav-link font-cond text-[0.95rem] font-medium tracking-[0.16em] uppercase text-wall-ink hover:text-wall-accent"
              >
                {item.label}
              </SiteLink>
            ))}
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <DarkModeToggle />
            <SiteLink href="/contact/" className="button min-h-11 px-5 text-sm">
              Book an enquiry
            </SiteLink>
          </div>

          {/* Mobile controls */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <DarkModeToggle />
            <button
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-sheet"
              onClick={() => setMenuOpen(open => !open)}
              className="inline-flex min-h-11 items-center gap-2 border border-wall-ink px-3.5 py-2 font-cond text-sm tracking-[0.16em] uppercase text-wall-ink hover:bg-wall-ink hover:text-wall"
            >
              <span>{menuOpen ? 'Close' : 'Menu'}</span>
              <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
                {menuOpen ? (
                  <path d="M4 4l12 12M16 4L4 16" stroke="currentColor" strokeWidth="2" />
                ) : (
                  <path d="M2 5h16M2 10h16M2 15h16" stroke="currentColor" strokeWidth="2" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Full-width mobile sheet */}
        {menuOpen ? (
          <nav
            id="mobile-nav-sheet"
            aria-label="Mobile menu"
            className="border-t border-wall-rule bg-wall px-4 pt-2 pb-6 lg:hidden"
          >
            <ul className="wrap flex flex-col">
              {NAV_ITEMS.map((item, i) => (
                <li key={item.href} className="border-b border-wall-rule">
                  <SiteLink
                    href={item.href}
                    markCurrent={item.markCurrent}
                    className="flex items-baseline gap-4 py-3.5 font-display text-4xl text-wall-ink no-underline hover:text-wall-accent aria-[current]:text-wall-accent"
                    onClick={() => setMenuOpen(false)}
                  >
                    <span className="font-label text-xs text-wall-muted">0{i + 1}</span>
                    {item.label}
                  </SiteLink>
                </li>
              ))}
            </ul>
            <div className="wrap mt-6">
              <SiteLink href="/contact/" className="button w-full" onClick={() => setMenuOpen(false)}>
                Book an enquiry
              </SiteLink>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}
