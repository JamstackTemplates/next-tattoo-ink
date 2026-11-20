'use client';

import { useEffect, useState } from 'react';
import { NEUTRAL_HOURS_LABEL, openingLabel, type OpeningHours } from '../lib/hours';
import { site } from '../lib/site';

/** Neutral static output ("Studio hours below"); browser refreshes in America/Los_Angeles every minute. */
export function OpenBadge({ hours }: { hours: readonly OpeningHours[] }) {
  const [label, setLabel] = useState(NEUTRAL_HOURS_LABEL);

  useEffect(() => {
    const update = () => setLabel(openingLabel(hours, site.timeZone));
    update();
    const timer = setInterval(update, 60_000);
    return () => clearInterval(timer);
  }, [hours]);

  return <span>{label}</span>;
}
