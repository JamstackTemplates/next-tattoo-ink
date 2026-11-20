/** Weekly opening-hours model. Time zone stays in site.config.json. */
export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;
export type Day = typeof DAYS[number];

export interface OpeningHours {
  /** Every weekday occurs exactly once. */
  day: Day;
  /** Inclusive local HH:MM; omit both times for a closed day. */
  opens?: string;
  /** Exclusive local HH:MM; overnight intervals are deliberately unsupported. */
  closes?: string;
}

export const NEUTRAL_HOURS_LABEL = 'Studio hours below';

const clock = /^([01]\d|2[0-3]):[0-5]\d$/;
const minutes = (value: string) => Number(value.slice(0, 2)) * 60 + Number(value.slice(3));

/** Format 24-hour HH:MM into compact 12-hour studio display, e.g. "20:00" -> "8 pm", "12:30" -> "12:30 pm". */
export function formatClock12(value: string): string {
  const hour24 = Number(value.slice(0, 2));
  const min = Number(value.slice(3));
  const suffix = hour24 >= 12 ? 'pm' : 'am';
  const hour12 = hour24 % 12 || 12;
  return min === 0 ? `${hour12} ${suffix}` : `${hour12}:${String(min).padStart(2, '0')} ${suffix}`;
}

/** Format an opening hours entry for tables, e.g. "12 pm–8 pm" or "Closed". */
export function formatDayHours(entry: OpeningHours): string {
  if (!entry.opens || !entry.closes) return 'Closed';
  return `${formatClock12(entry.opens)}–${formatClock12(entry.closes)}`;
}

export function validateHours(hours: readonly OpeningHours[]): void {
  for (const day of DAYS) {
    const matches = hours.filter(entry => entry.day === day);
    if (matches.length !== 1) throw new Error(`hours: ${day} must occur exactly once`);
    const { opens, closes } = matches[0];
    if (opens === undefined && closes === undefined) continue;
    if (!opens || !closes || !clock.test(opens) || !clock.test(closes) || minutes(opens) >= minutes(closes)) {
      throw new Error(`hours: ${day} needs HH:MM opening before closing; overnight service is unsupported`);
    }
  }
  if (hours.length !== 7) throw new Error('hours: expected seven weekdays');
}

/** Determine the current weekday in the business time zone (browser only). */
export function currentWeekday(timeZone: string, now = new Date()): Day | null {
  if (!timeZone) return null;
  try {
    const parts = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'long' }).formatToParts(now);
    const weekday = parts.find(entry => entry.type === 'weekday')?.value ?? '';
    return DAYS.includes(weekday as Day) ? (weekday as Day) : null;
  } catch {
    return null;
  }
}

/** Browser callers supply the clock; build/static views never compute current availability. */
export function openingLabel(hours: readonly OpeningHours[], timeZone: string, now = new Date()): string {
  if (!timeZone) return NEUTRAL_HOURS_LABEL;
  validateHours(hours);
  let parts: Intl.DateTimeFormatPart[];
  try {
    parts = new Intl.DateTimeFormat('en-US', {
      timeZone,
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      hourCycle: 'h23',
    }).formatToParts(now);
  } catch {
    return NEUTRAL_HOURS_LABEL;
  }
  const part = (type: string) => parts.find(entry => entry.type === type)?.value ?? '';
  const index = DAYS.indexOf(part('weekday') as Day);
  if (index < 0) return NEUTRAL_HOURS_LABEL;
  const current = Number(part('hour')) * 60 + Number(part('minute'));
  const today = hours.find(entry => entry.day === DAYS[index])!;
  if (today.opens && today.closes && current >= minutes(today.opens) && current < minutes(today.closes)) {
    return `Open now · until ${formatClock12(today.closes)}`;
  }
  for (let offset = 0; offset <= 7; offset++) {
    const day = DAYS[(index + offset) % 7];
    const entry = hours.find(value => value.day === day)!;
    if (entry.opens && (offset > 0 || current < minutes(entry.opens))) {
      return `Closed · opens ${offset === 0 ? 'today' : day} ${formatClock12(entry.opens)}`;
    }
  }
  return 'Closed · see studio hours';
}
