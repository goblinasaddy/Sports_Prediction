import type { SVGProps } from 'react';

export const TennisBallIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={props.strokeWidth || "1.5"}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M19.07,4.93A10,10,0,0,0,4.93,19.07" />
    <path d="M4.93,4.93A10,10,0,0,1,19.07,19.07" />
  </svg>
);
