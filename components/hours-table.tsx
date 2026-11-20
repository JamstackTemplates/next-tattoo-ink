'use client';

import { useEffect, useState } from 'react';
import { currentWeekday, formatDayHours, type Day, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/**
 * Mono hours table. Renders neutrally in static HTML; highlights today's row
 * in the configured studio time zone only after mounting in the browser.
 */
export function HoursTable({
  hours,
  className = '',
  onDark = false,
}: {
  hours: readonly OpeningHours[];
  className?: string;
  /** Set on black bands so rules and highlights use the wall inks. */
  onDark?: boolean;
}) {
  const [today, setToday] = useState<Day | null>(null);

  useEffect(() => {
    const update = () => setToday(currentWeekday(site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, []);

  return (
    <table className={`w-full border-collapse font-label text-sm ${className}`}>
      <caption className="sr-only">Weekly studio opening hours</caption>
      <tbody>
        {hours.map(entry => {
          const isToday = today === entry.day;
          return (
            <tr
              key={entry.day}
              data-today={isToday ? 'true' : undefined}
              className={`border-b ${onDark ? 'border-wall-rule text-wall-ink' : 'border-rule-soft'} ${
                isToday ? (onDark ? 'bg-wall-2 font-semibold' : 'bg-surface-2 font-semibold') : ''
              }`}
            >
              <th scope="row" className="py-2 pr-4 pl-1 text-left font-normal">
                <span className={isToday ? 'font-bold' : ''}>{entry.day}</span>
                {isToday ? (
                  <span className="ml-2 inline-block bg-primary px-1.5 py-0.5 text-[0.6rem] tracking-[0.14em] text-white uppercase">
                    Today
                  </span>
                ) : null}
              </th>
              <td className={`py-2 text-right ${entry.opens ? '' : onDark ? 'text-wall-accent' : 'text-primary-ink'}`}>
                {formatDayHours(entry)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
