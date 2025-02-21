import { JSX } from "react";
import { SvgComponent } from "@/types-def";

export const ArrowDown: SvgComponent = (props): JSX.Element => {
  return (
    <svg
      width="8"
      height="6"
      viewBox="0 0 8 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M0.5 1.25L4 4.75L7.5 1.25"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
