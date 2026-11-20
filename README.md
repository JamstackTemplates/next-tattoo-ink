# Midnight Needle Tattoo (`next-tattoo-ink`)

A static Next.js website template for tattoo studios, styled as **blackwork after dark**: three
inks only (black, bone, blood red), blackletter at sign scale, a red neon tube, a low-key
studio-photo hero, flash printed bone-on-black in a hard grid, artist portfolio plates, a
printable aftercare card, a clear deposit claim ticket, and a hosted Jamstacks enquiry form on Contact.

All names, addresses and sample details in this template are fictitious. Replace them with your
studio's real details before publishing. Local development requires Node 24 or later and npm.

To preview locally:

```sh
npm ci
npm run dev
```

## Pages

| Route | Purpose |
| --- | --- |
| `/` | Studio-photo hero with neon heading, featured unclaimed flash, four artist stations, style menu board, booking steps, studio hours & map, 18+ rule, and `TattooParlor` JSON-LD |
| `/artists/` | Style-filterable resident artist stations and matching note |
| `/artists/<id>/` | Static portfolio page per artist (`rook-alvarez`, `vee-okafor`, `junie-castellano`, `hal-sato-marsh`) with portfolio plates (inked/stencil toggle) and their current flash |
| `/flash/` | Full flash wall grouped by artist on a black band with style/artist filters and "Hide claimed" toggle |
| `/aftercare/` | Printable day-by-day healing card, Do/Don't check, medical warning and touch-up note |
| `/deposits/` | Black deposit claim ticket, pricing basics, numbered house rules, 18+ band and ruled FAQ |
| `/contact/` | Hosted Jamstacks enquiry form when configured, visible public email with copy helper, message checklist and studio hours |
| `/404.html` | Custom "Blowout" static error page |

## Make it yours (file ownership & frequent edits)

| File | Owns |
| --- | --- |
| `content/flash.ts` | **Most-edited:** wall flash pieces (`status`: `'available' \| 'claimed' \| 'repeatable'`, `featured`, `priceUsd`, `sizeInches`, `motif`). Marking a piece `'claimed'` adds the red **CLAIMED** rubber stamp on `/flash/` and drops it from Home's featured strip. |
| `content/artists.ts` | Artist profiles, `books` (`'open' \| 'waitlist' \| 'closed'`), `booksNote`, studio `days`, `styles`, `bio`, `signatureMotif`. The book-status tag follows `books`: a lit red dot when open, a hollow ring for a waitlist, struck through when closed. |
| `content/policies.ts` | Deposit amounts (`depositUsd.custom`, `flash`, `largeScale`), `shopMinimumUsd`, `hourlyRateUsd`, `dayRateUsd`, reschedule notice, grace window, `minimumAge`, `touchUpMonths`. Editing any number updates both the deposit ticket and the generated policy rules automatically. |
| `content/portfolio.ts` | Healed and fresh portfolio plates rendered on each artist's portfolio page. |
| `content/styles.ts` | The seven tattoo styles shown on Home's sampler arm and filter chips. |
| `content/aftercare.ts` | Ordered healing phases and Do/Don't checklists. |
| `content/business.ts` | Studio name, email, phone, address, directions, weekly hours (`OpeningHours`), walk-in flash schedule and Contact message checklist. |
| `app/**/page.tsx` | Page-specific headings, prose, labels and calls to action written directly as JSX children in page order. |
| `site.config.json` | Public name, description, hostname, IANA `timeZone` (`America/Los_Angeles`) and Jamstacks `siteId`/`cdnUrl`. Keep business data out of this file; the provisioner replaces it wholesale. |
| `app/tailwind.input.css` | Three-ink palette (black, bone, blood red): light ("bone stock") and dark ("lights off") tokens, grain, neon, print styles and `--jamstacks-*` styling. |
| `components/art/*` | Bespoke SVG artwork: all 14 flash motifs printed bone-and-red on black (`ink`) or as bare `line` stencils, shared hatch/stipple/ink-bleed defs (`ink-defs.tsx`), wordmark seal, icons and style emblems. |
| `public/hero.webp`, `public/hero-800.webp` | Home hero photograph (1600w and 800w for phones). The hero band is always black, so one image serves light and dark themes; keep the subject on the right and the left third dark for the heading. |
| `lib/structured-data.ts` | `TattooParlor` schema.org JSON-LD derived from `content/`. |
| `app/sitemap.ts` | Public static routes including every artist portfolio page. |

## Self-hosted fonts & licences

Fonts are bundled locally via Fontsource (no runtime calls to Google Fonts):

- **Display blackletter:** `@fontsource/pirata-one` — SIL Open Font License 1.1 (OFL-1.1)
- **Condensed caps (nav, buttons, numerals):** `@fontsource-variable/oswald` — SIL Open Font License 1.1 (OFL-1.1)
- **Body:** `@fontsource-variable/familjen-grotesk` — SIL Open Font License 1.1 (OFL-1.1)
- **Mono labels:** `@fontsource/ibm-plex-mono` — SIL Open Font License 1.1 (OFL-1.1)

## Public configuration

```json
{
  "name": "Midnight Needle Tattoo",
  "description": "Midnight Needle Tattoo — custom and flash tattooing on Capitol Hill, Seattle. Four artists, traditional to fine-line, walk-in flash Fridays and Saturdays.",
  "domain": "next-tattoo-ink.jamstacks.net",
  "timeZone": "America/Los_Angeles",
  "jamstacks": { "siteId": "", "cdnUrl": "https://cdn.jamstacks.net" }
}
```

| Environment variable | Public build-time meaning |
| --- | --- |
| `JAMSTACKS_SITE` | Website ID; blank retains file default, absent ID gives email fallback |
| `NEXT_PUBLIC_JAMSTACKS_CDN_URL` | CDN asset base; default `https://cdn.jamstacks.net` |
| `NEXT_PUBLIC_SITE_DOMAIN` | Hostname overriding config domain |
| `SITE_TIME_ZONE` | IANA zone overriding config `timeZone` |
| `PAGES_BASE_PATH` | Project path such as `/preview`; blank for custom domain/root |
| `PAGES_BASE_URL` | Actual Pages origin and path; takes precedence for canonical URLs |
| `JAMSTACKS_ALLOW_LOCAL_CDN` | Explicit localhost-only testing opt-in; disallowed in Actions |

## Contact contract

The real `<jamstacks-support-form>` host and one `{cdn}/sites/{siteId}/embed.js` bootstrap appear
only on `/contact/` when a public site ID is configured. Without a site ID, Contact shows the
direct email fallback with no host or bootstrap request. The studio email stays visible either way.
All copy frames submissions as **booking enquiries** — nothing is booked, reserved or claimed until
an artist replies and arranges the deposit directly. The website takes no payments.

## Checks and preview

```sh
npm run check
PAGES_BASE_PATH=/preview PAGES_BASE_URL=https://owner.github.io/preview npm run build
npm start -- --base /preview --port 3000
```

Gallery publishing metadata lives solely in `jamstacks/` (removable without affecting builds, tests
or Pages deployments):

```sh
node --test jamstacks/config.test.mjs
```
