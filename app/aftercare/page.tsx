import type { Metadata } from 'next';
import { AftercareCard } from '../../components/aftercare-card';
import { PageHead } from '../../components/page-head';
import { absoluteUrl } from '../../lib/paths';

export const metadata: Metadata = {
  title: 'Aftercare',
  description:
    'Printable day-by-day tattoo aftercare guide from Midnight Needle Tattoo — washing, balm, flaking, sun protection and when to call a doctor.',
  alternates: { canonical: absoluteUrl('/aftercare/') },
};

export default function AftercarePage() {
  return (
    <>
      <PageHead eyebrow="Healing guide · Printable" title="Tattoo Aftercare" motif="night-peony" hideInPrint>
        <p>
          A good tattoo is half what happens in the chair and half how you treat it over the next
          four weeks. Use your browser’s print view to print a clean black-and-white copy of the
          card below.
        </p>
      </PageHead>

      <AftercareCard />
    </>
  );
}
