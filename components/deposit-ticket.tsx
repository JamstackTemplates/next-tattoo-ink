import { formatUsd } from '../content/flash';
import { policies, type Policies } from '../content/policies';
import { TicketIcon } from './art/icons';

/**
 * Deposit schedule as a black claim ticket: three stubs reading Flash, Custom and
 * Large-scale amounts straight from content/policies.ts, perforated between, with a
 * red NON-REFUNDABLE stamp when deposits are not refundable.
 */
export function DepositTicket({ policy = policies }: { policy?: Policies }) {
  const stubs = [
    {
      label: 'Wall flash',
      amount: policy.depositUsd.flash,
      note: 'Holds your slot for one-off or repeatable wall flash.',
      code: 'Stub 01 · Flash',
    },
    {
      label: 'Custom piece',
      amount: policy.depositUsd.custom,
      note: 'Covers drawing time and locks in your custom appointment.',
      code: 'Stub 02 · Custom',
    },
    {
      label: 'Large-scale / sleeve',
      amount: policy.depositUsd.largeScale,
      note: 'For multi-session work, sleeves and full-day bookings.',
      code: 'Stub 03 · Large',
    },
  ];

  return (
    <section aria-label="Deposit schedule ticket" className="night-wall overflow-hidden border border-wall-rule">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-dashed border-wall-muted/50 px-6 py-5 sm:px-8">
        <div className="flex items-center gap-4">
          <TicketIcon className="h-8 w-8 text-wall-accent" />
          <div>
            <p className="label text-wall-muted">Midnight Needle Tattoo · Claim ticket No. 0143</p>
            <h2 className="type-giant mt-1 text-4xl text-wall-ink sm:text-5xl">Deposit schedule</h2>
          </div>
        </div>
        {!policy.refundable ? <span className="stamp -rotate-6 text-base text-wall-accent!">Non-refundable</span> : null}
      </div>

      <div className="grid divide-y divide-dashed divide-wall-muted/50 md:grid-cols-3 md:divide-x md:divide-y-0">
        {stubs.map(stub => (
          <div key={stub.code} className="flex flex-col justify-between p-6 sm:p-8">
            <div>
              <p className="label text-wall-muted">{stub.code}</p>
              <h3 className="mt-3 font-display text-3xl text-wall-ink">{stub.label}</h3>
              <p className="mt-3 font-cond text-6xl leading-none font-semibold text-wall-accent">{formatUsd(stub.amount)}</p>
              <p className="mt-4 font-sans text-sm leading-relaxed text-wall-muted">{stub.note}</p>
            </div>
            <p className="mt-6 border-t border-wall-rule pt-3 font-label text-xs text-wall-ink">
              Deducted from your final session total.
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-dashed border-wall-muted/50 bg-primary px-6 py-3.5 text-center font-label text-xs tracking-[0.12em] text-white uppercase sm:px-8">
        Arranged directly with your artist after they reply to your enquiry · This website does not take payments
      </div>
    </section>
  );
}
