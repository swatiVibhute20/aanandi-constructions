import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Link } from "react-router-dom";

const variants = {
  primary:
    "bg-kumkum text-parchment shadow-[inset_0_0_0_2px_#E9A914] hover:bg-kumkum-dark",
  secondary:
    "border-2 border-navy bg-transparent text-navy hover:bg-navy hover:text-parchment",
  light:
    "border-2 border-parchment bg-transparent text-parchment hover:bg-parchment hover:text-navy",
};

type ButtonProps = {
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  to?: string;
  href?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  children,
  variant = "primary",
  className = "",
  to,
  href,
  type = "button",
  ...rest
}: ButtonProps) {
  const cls = `inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-center text-base font-semibold touch-manipulation transition-colors ${variants[variant]} ${className}`;
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    );
  }
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={cls}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type={type} className={cls} {...rest}>
      {children}
    </button>
  );
}
