import type { ReactNode } from "react";

export function Sheet({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`paithani-frame relative rounded-2xl ${className}`}>
      <span className="pointer-events-none absolute top-3 left-3 h-3.5 w-3.5 border-t-2 border-l-2 border-terracotta" />
      <span className="pointer-events-none absolute top-3 right-3 h-3.5 w-3.5 border-t-2 border-r-2 border-terracotta" />
      <span className="pointer-events-none absolute bottom-3 left-3 h-3.5 w-3.5 border-b-2 border-l-2 border-terracotta" />
      <span className="pointer-events-none absolute right-3 bottom-3 h-3.5 w-3.5 border-r-2 border-b-2 border-terracotta" />
      <div className="relative m-[3px] rounded-[0.9rem] border border-dashed border-haldi/80 bg-parchment">
        {children}
      </div>
    </div>
  );
}
