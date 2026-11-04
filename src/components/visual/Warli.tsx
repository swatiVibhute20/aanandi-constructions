type WarliProps = {
  className?: string;
  stroke?: string;
};

function Dancer({ x, ink, raised = true }: { x: number; ink: string; raised?: boolean }) {
  const armY = raised ? 22 : 48;
  return (
    <g>
      <circle cx={x} cy="24" r="5" fill={ink} stroke="none" />
      <path d={`M${x} 29 V58 M${x} 40 L${x - 14} ${armY} M${x} 40 L${x + 14} ${armY} M${x} 58 L${x - 12} 82 M${x} 58 L${x + 12} 82`} />
    </g>
  );
}

export function WarliFrieze({ className = "", stroke = "#FBF3E0" }: WarliProps) {
  return (
    <svg viewBox="0 0 980 100" className={className} fill={stroke} aria-hidden="true">
      <g fill="none" stroke={stroke} strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M8 88 H972" />
        <Dancer x={70} ink={stroke} />
        <Dancer x={118} ink={stroke} raised={false} />
        <path d="M168 88 V62 M168 70 L156 78 M168 70 L180 78" />
        <path d="M150 62 H186 L168 40 Z M158 48 H178 L168 32 Z" />
        <path d="M230 88 V52 H300 V88 M248 88 V68 H268 V88 M278 60 H290 V70 H278 Z" />
        <path d="M214 52 H316 L265 28 Z" />
        <circle cx="250" cy="74" r="3.2" fill={stroke} stroke="none" />
        <path d="M250 77 V84 M250 79 L246 82 M250 79 L254 82" />
        <path d="M360 70 C390 58 430 58 452 72 C430 80 390 82 360 70 Z" />
        <circle cx="456" cy="66" r="7" />
        <path d="M450 60 L446 50 M462 60 L470 50 M456 66 L470 72" />
        <path d="M378 72 V88 M408 74 V88 M432 74 V88 M400 66 V52" />
        <path d="M560 78 a16 16 0 1 0 0.1 0 M640 82 a10 10 0 1 0 0.1 0" />
        <path d="M572 66 H648 V78 H612 L600 58 H584 Z" />
        <circle cx="598" cy="48" r="4" fill={stroke} stroke="none" />
        <path d="M598 52 V62 M598 56 L592 60 M598 56 L604 58" />
        <path d="M700 48 H860 L830 34 H730 Z" />
        <path d="M724 48 V88 M760 48 V88 M804 48 V88 M844 48 V88" />
        <circle cx="780" cy="70" r="3.2" fill={stroke} stroke="none" />
        <path d="M780 73 V82 M780 76 L775 80 M780 76 L785 79" />
        <circle cx="930" cy="28" r="8" />
        <path d="M930 12 V18 M930 38 V44 M914 28 H920 M940 28 H946 M918 16 L922 20 M942 36 L938 32 M918 40 L922 36 M942 20 L938 24" />
      </g>
    </svg>
  );
}

export function WarliPortrait({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 260" className={className} aria-hidden="true">
      <rect x="8" y="8" width="204" height="244" fill="#B5532F" />
      <g fill="none" stroke="#FBF3E0" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="110" cy="78" r="16" />
        <path d="M110 94 V150" />
        <path d="M110 112 L78 132 M110 112 L142 128" />
        <path d="M110 150 L86 196 M110 150 L134 196" />
        <path d="M70 210 H150" />
        <path d="M48 48 H36 V36 M172 48 H184 V36 M48 214 H36 V226 M172 214 H184 V226" />
        <path d="M64 168 H40 V196 H64" />
        <path d="M156 120 L176 108 L188 132 L168 140 Z" />
        <circle cx="176" cy="92" r="10" />
        <path d="M176 82 V102 M166 92 H186" />
      </g>
      <circle cx="110" cy="78" r="3" fill="#FBF3E0" />
    </svg>
  );
}
