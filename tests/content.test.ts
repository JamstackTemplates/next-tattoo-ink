import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';
import { aftercareDont, aftercareDo, aftercarePhases } from '../content/aftercare.ts';
import { artists, type BookStatus } from '../content/artists.ts';
import { business } from '../content/business.ts';
import { flashPieces, getFeaturedFlash, type FlashStatus } from '../content/flash.ts';
import { MOTIF_IDS } from '../content/motifs.ts';
import { buildPolicyRules, policies } from '../content/policies.ts';
import { portfolioPieces } from '../content/portfolio.ts';
import { styles } from '../content/styles.ts';
import { route, routePathname } from '../lib/paths.ts';
import { businessStructuredData, jsonLd } from '../lib/structured-data.ts';

const URL_SAFE_ID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const VALID_BOOKS = new Set<BookStatus>(['open', 'waitlist', 'closed']);
const VALID_FLASH_STATUS = new Set<FlashStatus>(['available', 'claimed', 'repeatable']);
const MOTIF_SET = new Set<string>(MOTIF_IDS);

function assertUniqueUrlSafeIds(collection: string, items: readonly { id: string }[]) {
  const seen = new Set<string>();
  for (const item of items) {
    assert.match(item.id, URL_SAFE_ID, `${collection} "${item.id}": ID must be lowercase URL-safe`);
    assert.ok(!seen.has(item.id), `${collection} "${item.id}": duplicate ID`);
    seen.add(item.id);
  }
}

test('business content has actionable required fields', () => {
  for (const key of ['name', 'tagline', 'introduction', 'email', 'walkInFlash'] as const) {
    assert.ok(business[key].trim(), `business.${key}: required`);
  }
  assert.match(business.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'business.email: valid public email required');
  assert.ok(business.address.full.trim(), 'business.address.full: required');
  assert.ok(business.address.directions.trim(), 'business.address.directions: required');
  assert.ok(business.enquiries.title.trim(), 'business.enquiries.title: required');
  assert.ok(business.enquiries.introduction.trim(), 'business.enquiries.introduction: required');
  assert.ok(business.enquiries.usefulToInclude.length >= 4, 'business.enquiries.usefulToInclude: include message guidance');
  for (const tip of business.enquiries.usefulToInclude) {
    assert.ok(tip.trim(), 'business.enquiries.usefulToInclude: empty tip');
  }
});

test('every collection has unique, URL-safe IDs', () => {
  assertUniqueUrlSafeIds('styles', styles);
  assertUniqueUrlSafeIds('artists', artists);
  assertUniqueUrlSafeIds('flash', flashPieces);
  assertUniqueUrlSafeIds('portfolio', portfolioPieces);
  assertUniqueUrlSafeIds('aftercare', aftercarePhases);
});

test('artists have valid styles, book statuses, experience and motifs', () => {
  const styleIds = new Set<string>(styles.map(s => s.id));
  assert.ok(artists.length > 0, 'artists: at least one artist required');
  for (const artist of artists) {
    assert.ok(artist.name.trim(), `artist "${artist.id}": name required`);
    assert.ok(artist.role.trim(), `artist "${artist.id}": role required`);
    assert.ok(artist.bio.trim(), `artist "${artist.id}": bio required`);
    assert.ok(artist.days.trim(), `artist "${artist.id}": days required`);
    assert.ok(artist.booksNote.trim(), `artist "${artist.id}": booksNote required`);
    assert.ok(Number.isInteger(artist.yearsTattooing) && artist.yearsTattooing > 0, `artist "${artist.id}": yearsTattooing must be a positive integer`);
    assert.ok(VALID_BOOKS.has(artist.books), `artist "${artist.id}": invalid books status "${artist.books}"`);
    assert.ok(artist.styles.length > 0, `artist "${artist.id}": at least one style required`);
    for (const styleId of artist.styles) {
      assert.ok(styleIds.has(styleId), `artist "${artist.id}": unknown style "${styleId}"`);
    }
    assert.ok(MOTIF_SET.has(artist.signatureMotif), `artist "${artist.id}": unknown signatureMotif "${artist.signatureMotif}"`);
  }
});

test('flash pieces have valid artists, styles, sizes, prices, statuses and motifs', () => {
  const artistIds = new Set(artists.map(a => a.id));
  const styleIds = new Set<string>(styles.map(s => s.id));

  for (const piece of flashPieces) {
    assert.ok(piece.title.trim(), `flash "${piece.id}": title required`);
    assert.ok(artistIds.has(piece.artistId), `flash "${piece.id}": unknown artistId "${piece.artistId}"`);
    assert.ok(piece.styles.length > 0, `flash "${piece.id}": at least one style required`);
    for (const styleId of piece.styles) {
      assert.ok(styleIds.has(styleId), `flash "${piece.id}": unknown style "${styleId}"`);
    }
    assert.ok(piece.sizeInches >= 1 && piece.sizeInches <= 12, `flash "${piece.id}": sizeInches (${piece.sizeInches}) must be 1–12`);
    assert.ok(
      Number.isInteger(piece.priceUsd) && piece.priceUsd >= policies.shopMinimumUsd,
      `flash "${piece.id}": priceUsd (${piece.priceUsd}) must be an integer >= shopMinimumUsd (${policies.shopMinimumUsd})`,
    );
    assert.ok(VALID_FLASH_STATUS.has(piece.status), `flash "${piece.id}": invalid status "${piece.status}"`);
    assert.ok(MOTIF_SET.has(piece.motif), `flash "${piece.id}": unknown motif "${piece.motif}"`);
  }

  const featuredUnclaimed = getFeaturedFlash(flashPieces);
  assert.ok(featuredUnclaimed.length >= 1, 'flash: at least one featured piece must be unclaimed');

  // Marking a featured piece claimed drops it from the Home featured strip immediately.
  const simulated = flashPieces.map(piece => (piece.id === 'dagger-rose' ? { ...piece, status: 'claimed' as const } : piece));
  assert.ok(!getFeaturedFlash(simulated).some(piece => piece.id === 'dagger-rose'), 'claimed featured piece must drop from featured strip');
});

test('portfolio pieces reference valid artists, artist styles, sizes, sessions and motifs', () => {
  const artistMap = new Map(artists.map(a => [a.id, a]));

  for (const piece of portfolioPieces) {
    assert.ok(piece.title.trim(), `portfolio "${piece.id}": title required`);
    assert.ok(piece.placement.trim(), `portfolio "${piece.id}": placement required`);
    const artist = artistMap.get(piece.artistId);
    assert.ok(artist, `portfolio "${piece.id}": unknown artistId "${piece.artistId}"`);
    assert.ok(
      artist.styles.includes(piece.style),
      `portfolio "${piece.id}": style "${piece.style}" is not one of ${artist.id}'s styles (${artist.styles.join(', ')})`,
    );
    assert.ok(piece.sizeInches >= 1 && piece.sizeInches <= 12, `portfolio "${piece.id}": sizeInches (${piece.sizeInches}) must be 1–12`);
    assert.ok(Number.isInteger(piece.sessions) && piece.sessions >= 1, `portfolio "${piece.id}": sessions must be an integer >= 1`);
    assert.ok(MOTIF_SET.has(piece.motif), `portfolio "${piece.id}": unknown motif "${piece.motif}"`);
  }
});

test('every motif ID has a corresponding SVG artwork entry in components/art/motifs.tsx', () => {
  const motifsSource = readFileSync(new URL('../components/art/motifs.tsx', import.meta.url), 'utf8');
  for (const motif of MOTIF_IDS) {
    const keyPattern = new RegExp(`(?:^|[\\s,{])(?:'${motif}'|${motif})\\s*:`, 'm');
    assert.match(motifsSource, keyPattern, `motif "${motif}": missing entry in MOTIF_ART`);
  }
});

test('policies numbers are valid and generated rules update when deposit numbers change', () => {
  const { depositUsd, shopMinimumUsd, hourlyRateUsd, dayRateUsd } = policies;
  for (const [kind, amount] of Object.entries(depositUsd)) {
    assert.ok(Number.isInteger(amount) && amount > 0, `policies.depositUsd.${kind}: must be a positive integer`);
  }
  assert.ok(depositUsd.custom <= shopMinimumUsd, `policies.depositUsd.custom (${depositUsd.custom}) must be <= shopMinimumUsd (${shopMinimumUsd})`);
  assert.ok(depositUsd.flash <= shopMinimumUsd, `policies.depositUsd.flash (${depositUsd.flash}) must be <= shopMinimumUsd (${shopMinimumUsd})`);
  assert.ok(Number.isInteger(shopMinimumUsd) && shopMinimumUsd > 0, 'policies.shopMinimumUsd: positive integer required');
  assert.ok(Number.isInteger(hourlyRateUsd) && hourlyRateUsd > 0, 'policies.hourlyRateUsd: positive integer required');
  assert.ok(Number.isInteger(dayRateUsd) && dayRateUsd > 0, 'policies.dayRateUsd: positive integer required');
  assert.equal(policies.minimumAge, 18, 'policies.minimumAge: must be 18');

  const updatedRules = buildPolicyRules({ ...policies, depositUsd: { ...depositUsd, custom: 120 } });
  assert.ok(updatedRules.some(line => line.includes('$120 for custom pieces')), 'policy rules must reflect edited custom deposit');
});

test('aftercare phases and Do/Don’t lists are complete', () => {
  assert.ok(aftercarePhases.length >= 4, 'aftercare: phases required');
  for (const phase of aftercarePhases) {
    assert.ok(phase.window.trim(), `aftercare "${phase.id}": window required`);
    assert.ok(phase.title.trim(), `aftercare "${phase.id}": title required`);
    assert.ok(phase.steps.length > 0, `aftercare "${phase.id}": steps required`);
  }
  assert.ok(aftercareDo.length > 0 && aftercareDont.length > 0, 'aftercare: Do and Don’t lists required');
});

test('TattooParlor structured data derives from content and escapes closing script tags', () => {
  const schema = businessStructuredData();
  assert.equal(schema['@type'], 'TattooParlor');
  assert.equal(schema.name, business.name);
  assert.equal(schema.email, business.email);
  assert.equal(schema.telephone, business.phone);
  assert.equal(schema.priceRange, '$$');
  assert.equal(schema.address.streetAddress, business.address.street);
  assert.equal(schema.openingHoursSpecification.length, 6); // Mon closed, Tue–Sun open
  assert.equal(schema.employee.length, artists.length);
  for (const artist of artists) {
    const emp = schema.employee.find(e => e.name === artist.name);
    assert.ok(emp, `schema.employee: missing ${artist.name}`);
    assert.equal(emp.jobTitle, artist.role);
  }

  const dangerous = { name: '</script><script>alert(1)</script>', text: '< & >' };
  const encoded = jsonLd(dangerous);
  assert.ok(!encoded.includes('<'), 'JSON-LD must escape <');
  assert.deepEqual(JSON.parse(encoded), dangerous);
});

test('route helpers normalize trailing slashes while preserving query strings and hashes', () => {
  assert.equal(route('/artists?style=traditional'), '/artists/?style=traditional');
  assert.equal(route('/artists/?style=traditional#top'), '/artists/?style=traditional#top');
  assert.equal(routePathname('/artists/?style=traditional'), '/artists/');
});
