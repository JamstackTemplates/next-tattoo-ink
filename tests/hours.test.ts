import assert from 'node:assert/strict';
import { test } from 'node:test';
import { business } from '../content/business.ts';
import { DAYS, NEUTRAL_HOURS_LABEL, openingLabel, validateHours } from '../lib/hours.ts';

const ZONE = 'America/Los_Angeles';
const at = (isoUtc: string, zone = ZONE) => openingLabel(business.hours, zone, new Date(isoUtc));

test('studio hours validate cleanly and include all seven weekdays with same-day intervals', () => {
  assert.equal(business.hours.length, 7);
  assert.doesNotThrow(() => validateHours(business.hours));
});

test('Friday 21:59 open, Friday 22:00 closed, and Monday closed all day in America/Los_Angeles', () => {
  // Friday Nov 20, 2026 is PST (UTC-8):
  // 21:59 PST = 2026-11-21T05:59:00Z
  // 22:00 PST = 2026-11-21T06:00:00Z
  assert.equal(at('2026-11-21T05:59:00Z'), 'Open now · until 10 pm');
  assert.equal(at('2026-11-21T06:00:00Z'), 'Closed · opens Saturday 12 pm');

  // Monday Nov 16, 2026 is closed all day in PST (UTC-8):
  // 00:05 PST = 2026-11-16T08:05:00Z, 15:00 PST = 2026-11-16T23:00:00Z, 23:55 PST = 2026-11-17T07:55:00Z
  assert.equal(at('2026-11-16T08:05:00Z'), 'Closed · opens Tuesday 12 pm');
  assert.equal(at('2026-11-16T23:00:00Z'), 'Closed · opens Tuesday 12 pm');
  assert.equal(at('2026-11-17T07:55:00Z'), 'Closed · opens Tuesday 12 pm');

  // Sunday evening after 18:00 wraps past closed Monday to Tuesday 12 pm
  // Sunday Nov 15, 2026 18:00 PST = 2026-11-16T02:00:00Z
  assert.equal(at('2026-11-16T02:00:00Z'), 'Closed · opens Tuesday 12 pm');
});

test('March and November America/Los_Angeles DST transitions preserve local opening times', () => {
  // Sunday March 8, 2026: clocks spring forward at 02:00 PST -> 03:00 PDT (UTC-7).
  // Sunday hours are 12:00–18:00 PDT (19:00–01:00 UTC).
  assert.equal(at('2026-03-08T18:59:00Z'), 'Closed · opens today 12 pm');
  assert.equal(at('2026-03-08T19:00:00Z'), 'Open now · until 6 pm');
  assert.equal(at('2026-03-09T00:59:00Z'), 'Open now · until 6 pm');
  assert.equal(at('2026-03-09T01:00:00Z'), 'Closed · opens Tuesday 12 pm');

  // Sunday November 1, 2026: clocks fall back at 02:00 PDT -> 01:00 PST (UTC-8).
  // Sunday hours are 12:00–18:00 PST (20:00–02:00 UTC).
  assert.equal(at('2026-11-01T19:59:00Z'), 'Closed · opens today 12 pm');
  assert.equal(at('2026-11-01T20:00:00Z'), 'Open now · until 6 pm');
  assert.equal(at('2026-11-02T01:59:00Z'), 'Open now · until 6 pm');
  assert.equal(at('2026-11-02T02:00:00Z'), 'Closed · opens Tuesday 12 pm');
});

test('missing or invalid time zones stay neutral', () => {
  assert.equal(at('2026-11-20T21:00:00Z', ''), NEUTRAL_HOURS_LABEL);
  assert.equal(at('2026-11-20T21:00:00Z', 'Mars/Base'), NEUTRAL_HOURS_LABEL);
  assert.equal(openingLabel(DAYS.map(day => ({ day })), 'UTC'), 'Closed · see studio hours');
});

test('invalid, incomplete, or overnight intervals name the weekday to fix', () => {
  for (const opens of ['24:00', '9:00', '22:00']) {
    assert.throws(
      () => validateHours(business.hours.map(x => (x.day === 'Tuesday' ? { ...x, opens } : x))),
      /Tuesday/,
    );
  }
  assert.throws(() => validateHours(business.hours.slice(1)), /Monday/);
  assert.throws(
    () => validateHours(business.hours.map(x => (x.day === 'Friday' ? { ...x, closes: undefined } : x))),
    /Friday/,
  );
});
