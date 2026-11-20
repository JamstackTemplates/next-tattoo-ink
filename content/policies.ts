/**
 * Owner-edited studio pricing, deposits, age and rescheduling rules.
 * Edit the numbers here to update the deposit ticket, policy rules, pricing strip
 * and aftercare touch-up window everywhere on the site.
 */
export interface Policies {
  /** Deposit amounts in whole US dollars, deducted from the final session's price. */
  depositUsd: {
    custom: number;
    flash: number;
    largeScale: number;
  };
  /** Minimum tattoo charge in whole US dollars. */
  shopMinimumUsd: number;
  /** Standard hourly studio rate in whole US dollars. */
  hourlyRateUsd: number;
  /** Full-day session rate in whole US dollars (up to dayRateHours). */
  dayRateUsd: number;
  /** Maximum hours included in a day rate. */
  dayRateHours: number;
  /** Minimum notice in hours required to reschedule without losing the deposit. */
  rescheduleNoticeHours: number;
  /** Minutes of grace before an appointment may be cancelled as a no-show. */
  lateGraceMinutes: number;
  /** Minimum client age; valid government photo ID is required every visit. */
  minimumAge: number;
  /** Months after the appointment within which one free touch-up is offered. */
  touchUpMonths: number;
  /** Deposits are non-refundable (transferable once with proper notice). */
  refundable: boolean;
}

export const policies: Policies = {
  depositUsd: {
    custom: 100,
    flash: 50,
    largeScale: 200,
  },
  shopMinimumUsd: 120,
  hourlyRateUsd: 180,
  dayRateUsd: 1100,
  dayRateHours: 6,
  rescheduleNoticeHours: 48,
  lateGraceMinutes: 20,
  minimumAge: 18,
  touchUpMonths: 3,
  refundable: false,
};

/** Generate plain-sentence rules directly from policy numbers so edits stay in sync. */
export function buildPolicyRules(p: Policies = policies): string[] {
  return [
    `Every booked appointment requires a deposit arranged directly with your artist after they reply to your enquiry: $${p.depositUsd.flash} for wall flash, $${p.depositUsd.custom} for custom pieces, and $${p.depositUsd.largeScale} for large-scale or multi-session work. This website does not take payments.`,
    'Your deposit comes off the final price of your tattoo on the day of your final session.',
    p.refundable
      ? 'Deposits may be refunded if cancelled within the notice window.'
      : `Deposits are non-refundable, but transferable once if you give at least ${p.rescheduleNoticeHours} hours’ notice before your appointment.`,
    `One reschedule with at least ${p.rescheduleNoticeHours} hours’ notice keeps your deposit on file. A second reschedule or shorter notice forfeits it, and a new deposit is required to book again.`,
    `Please arrive on time. We hold a ${p.lateGraceMinutes}-minute grace window; arriving later than ${p.lateGraceMinutes} minutes past your slot may mean we have to cancel the session and forfeit the deposit.`,
    'No-shows forfeit the deposit immediately.',
    `All clients must be ${p.minimumAge}+ with valid photo ID (state ID, driver’s licence or passport) at every appointment — no tattoos on minors, with or without parental consent.`,
    `One free touch-up is included within ${p.touchUpMonths} months of your appointment when studio aftercare instructions were followed (excludes hands, fingers and feet).`,
  ];
}

export const policyRules: readonly string[] = buildPolicyRules(policies);
