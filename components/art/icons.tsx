import type { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

function BaseIcon({ className = 'h-6 w-6', children, ...rest }: IconProps) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...rest}
    >
      {children}
    </svg>
  );
}

export function RotaryIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="6" y="6" width="12" height="10" rx="2" />
      <circle cx="12" cy="11" r="2.2" />
      <path d="M18 10h6v6h-6" />
      <path d="M21 16v9l-1.5 3.5L18 25v-9" />
      <path d="M6 12H3v6h3" />
    </BaseIcon>
  );
}

export function InkCapIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <ellipse cx="16" cy="11" rx="8" ry="3.5" fill="currentColor" fillOpacity="0.2" />
      <path d="M8 11l2 14c0 1.8 2.7 3 6 3s6-1.2 6-3l2-14" />
      <path d="M6 25h20" />
      <path d="M16 3c-1.5 2-2 3.5 0 4.5 2-1 1.5-2.5 0-4.5Z" fill="currentColor" />
    </BaseIcon>
  );
}

export function StencilIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M8 4h12l5 5v19H8V4Z" />
      <path d="M20 4v5h5" />
      <path d="M12 15h8M12 20h6" strokeDasharray="2.5 2.5" />
      <circle cx="16" cy="10.5" r="1.5" />
    </BaseIcon>
  );
}

export function WrapIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="5" y="9" width="14" height="14" rx="2" />
      <ellipse cx="19" cy="16" rx="3" ry="7" />
      <path d="M22 10h5v12h-5" />
      <path d="M9 13l4 6M13 13l2 3" opacity="0.65" />
    </BaseIcon>
  );
}

export function SoapIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M13 5h8M16 5v4" />
      <rect x="10" y="9" width="12" height="19" rx="3" />
      <circle cx="16" cy="18" r="2.8" />
      <circle cx="24.5" cy="9" r="1.2" fill="currentColor" />
    </BaseIcon>
  );
}

export function NoSunIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="16" cy="16" r="5.5" />
      <path d="M16 4v3M16 25v3M4 16h3M25 16h3M7.5 7.5l2 2M22.5 22.5l2 2M24.5 7.5l-2 2M9.5 22.5l-2 2" />
      <line x1="5" y1="27" x2="27" y2="5" strokeWidth="2.8" />
    </BaseIcon>
  );
}

export function IdCardIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="3" y="7" width="26" height="18" rx="2.5" />
      <circle cx="10.5" cy="14" r="2.6" />
      <path d="M6.8 21c.7-2 2.2-3 3.7-3s3 1 3.7 3" />
      <path d="M17.5 12.5h7.5M17.5 16.5h7.5M17.5 20.5h4.5" />
    </BaseIcon>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <rect x="4" y="7" width="24" height="20" rx="2" />
      <path d="M4 13h24M10 4v5M22 4v5" />
      <path d="M10 18h3v3h-3zM19 18h3v3h-3z" fill="currentColor" />
    </BaseIcon>
  );
}

export function TicketIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M4 9h24v5a2.5 2.5 0 0 0 0 5v5H4v-5a2.5 2.5 0 0 0 0-5V9Z" />
      <path d="M12 9v15" strokeDasharray="2.5 2.5" />
      <path d="M16.5 14.5h6M16.5 18.5h4" />
    </BaseIcon>
  );
}

export function MapPinIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <path d="M16 28s8.5-7.6 8.5-14.5a8.5 8.5 0 1 0-17 0C7.5 20.4 16 28 16 28Z" />
      <circle cx="16" cy="13.5" r="3" />
    </BaseIcon>
  );
}

export function ClockIcon(props: IconProps) {
  return (
    <BaseIcon {...props}>
      <circle cx="16" cy="16" r="11" />
      <path d="M16 9.5V16l4.5 3" />
    </BaseIcon>
  );
}
