import { BOOK_STATUS_LABEL, type BookStatus } from '../content/artists';

/**
 * Book status in one ink: a lit red dot for open books, a hollow ring for the
 * waitlist and a struck-through label for closed books. Meaning is in the text,
 * the mark only reinforces it.
 */
export function BookStatusTag({ status, className = '' }: { status: BookStatus; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-label text-[0.7rem] tracking-[0.18em] uppercase ${className}`}
    >
      <span
        aria-hidden="true"
        className={`inline-block h-2.5 w-2.5 shrink-0 rounded-full ${
          status === 'open'
            ? 'bg-wall-accent shadow-[0_0_10px_2px_rgb(255_74_64/0.6)]'
            : status === 'waitlist'
              ? 'border-2 border-current'
              : 'bg-current opacity-40'
        }`}
      />
      <span className={status === 'closed' ? 'line-through decoration-1 opacity-70' : ''}>
        {BOOK_STATUS_LABEL[status]}
      </span>
    </span>
  );
}
