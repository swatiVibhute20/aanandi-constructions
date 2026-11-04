type LogoProps = {
  variant?: "default" | "light";
  className?: string;
};

const art = {
  default: {
    mark: "/logo-mark.png",
    name: "/logo-name.png",
    tag: "/logo-tag.png",
  },
  light: {
    mark: "/logo-mark-light.png",
    name: "/logo-name-light.png",
    tag: "/logo-tag-light.png",
  },
} as const;

export function Logo({ variant = "default", className = "" }: LogoProps) {
  const src = art[variant];
  return (
    <span className={`inline-flex flex-col items-center ${className}`} aria-hidden="true">
      <img src={src.mark} alt="" className="h-10 w-auto object-contain lg:h-11" />
      <img src={src.name} alt="" className="mt-1 h-[15px] w-auto object-contain sm:h-[17px] lg:h-4" />
      <img src={src.tag} alt="" className="mt-0.5 h-3.5 w-auto object-contain sm:h-4 lg:h-[17px]" />
    </span>
  );
}
