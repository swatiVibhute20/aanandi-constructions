import { useId } from "react";

const tones = {
  kumkum: "#A4161A",
  haldi: "#E9A914",
  cream: "#FBF3E0",
  navy: "#14213D",
} as const;

export function PaithaniBorder({
  tone = "kumkum",
  className = "",
}: {
  tone?: keyof typeof tones;
  className?: string;
}) {
  const color = tones[tone];
  const rawId = useId().replace(/:/g, "");
  const patternId = `paithani-${rawId}`;
  return (
    <svg
      className={`block h-4 w-full ${className}`}
      viewBox="0 0 1200 16"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <pattern id={patternId} width="58" height="16" patternUnits="userSpaceOnUse">
          <circle cx="6" cy="8" r="1.35" fill={color} />
          <path d="M16 8 L22 3.1 L28 8 L22 12.9 Z" fill="none" stroke={color} strokeWidth="1.1" />
          <circle cx="22" cy="8" r="1.15" fill={color} />
          <path
            d="M36 8c0-2.8 2-4.6 4.4-4.6 1.4 0 2.3.6 3 1.6.7-1 1.6-1.6 3-1.6 2.4 0 4.4 1.8 4.4 4.6S48.8 12.6 46.4 12.6c-1.4 0-2.3-.6-3-1.6-.7 1-1.6 1.6-3 1.6C38 12.6 36 10.8 36 8z"
            fill={color}
          />
          <circle cx="43.4" cy="8" r="1.05" fill="#FBF3E0" />
        </pattern>
      </defs>
      <rect width="1200" height="16" fill={`url(#${patternId})`} />
    </svg>
  );
}
