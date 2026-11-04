import { Menu, Phone, User, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.tsx";
import { site } from "../config/site.ts";
import { useI18n } from "../i18n/LanguageContext.tsx";
import type { Lang } from "../types.ts";
import { Logo } from "./visual/Logo.tsx";

const links = [
  ["/", "home"],
  ["/about", "about"],
  ["/services", "services"],
  ["/projects", "projects"],
  ["/reviews", "reviews"],
  ["/contact", "contact"],
] as const;

function AccountButton() {
  const { t } = useI18n();
  const { user, logout } = useAuth();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const item =
    "flex min-h-11 w-full items-center rounded-xl px-3 text-left text-sm font-semibold text-navy hover:bg-parchment-deep";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        className="flex flex-col items-center text-navy"
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={user ? user.name : t.nav.login}
        onClick={() => setOpen((value) => !value)}
      >
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-navy bg-parchment">
          <User className="h-5 w-5" aria-hidden="true" />
        </span>
        {user ? (
          <span className="mt-0.5 line-clamp-2 w-[4.75rem] text-center text-[11px] font-semibold leading-tight">
            {user.name}
          </span>
        ) : null}
      </button>
      {open ? (
        <div
          role="menu"
          className="absolute end-0 top-full z-50 mt-2 w-44 rounded-2xl border border-navy/10 bg-parchment p-2 shadow-[0_12px_30px_-18px_rgba(20,33,61,0.8)]"
        >
          {user ? (
            <>
              {user.role === "admin" ? (
                <NavLink to="/admin" role="menuitem" className={item} onClick={() => setOpen(false)}>
                  {t.nav.admin}
                </NavLink>
              ) : null}
              <button
                type="button"
                role="menuitem"
                className={item}
                onClick={() => {
                  setOpen(false);
                  void logout();
                }}
              >
                {t.nav.logout}
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" role="menuitem" className={item} onClick={() => setOpen(false)}>
                {t.login.submit}
              </NavLink>
              <NavLink to="/signup" role="menuitem" className={item} onClick={() => setOpen(false)}>
                {t.login.signupSubmit}
              </NavLink>
            </>
          )}
        </div>
      ) : null}
    </div>
  );
}

function LanguageToggle({ compact = false }: { compact?: boolean }) {
  const { lang, setLang, t } = useI18n();
  const item = (code: Lang, label: string) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      className={`min-h-11 min-w-11 px-2.5 text-sm font-semibold touch-manipulation ${
        lang === code ? "bg-navy text-parchment" : "text-navy"
      }`}
    >
      {label}
    </button>
  );
  return (
    <div
      role="group"
      aria-label={t.lang.label}
      className={`inline-flex overflow-hidden rounded-full border-2 border-navy ${compact ? "" : ""}`}
    >
      {item("mr", compact ? "म" : t.lang.mr)}
      {item("en", "EN")}
    </div>
  );
}

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const itemClass = ({ isActive }: { isActive: boolean }) =>
    `rounded-full px-3 py-2 text-base font-semibold ${isActive ? "bg-navy text-parchment" : "text-navy hover:bg-parchment-deep"}`;

  return (
    <header className="sticky top-0 z-40 border-b border-navy/10 bg-parchment/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2 sm:px-6">
        <NavLink to="/" className="min-w-0 shrink" onClick={() => setOpen(false)} aria-label={site.name}>
          <Logo />
        </NavLink>
        <nav className="ms-auto hidden items-center gap-1 lg:flex" aria-label={t.nav.menu}>
          {links.map(([to, key]) => (
            <NavLink key={to} to={to} className={itemClass} end={to === "/"}>
              {t.nav[key]}
            </NavLink>
          ))}
        </nav>
        <div className="ms-auto flex items-center gap-2 lg:ms-3">
          <span className="hidden sm:inline-flex">
            <LanguageToggle />
          </span>
          <span className="sm:hidden">
            <LanguageToggle compact />
          </span>
          <a
            href={`tel:${site.phoneTel}`}
            className="hidden min-h-11 items-center gap-2 rounded-full bg-kumkum px-4 text-sm font-semibold text-parchment shadow-[inset_0_0_0_2px_#E9A914] min-[420px]:inline-flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {t.nav.call}
          </a>
          <AccountButton />
          <button
            type="button"
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-parchment text-navy lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            <span className="sr-only">{open ? t.nav.close : t.nav.menu}</span>
          </button>
        </div>
      </div>
      {open
        ? createPortal(
            <div
              id="mobile-menu"
              className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-parchment px-6 py-4 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <Logo />
                <button
                  type="button"
                  className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-navy bg-parchment text-navy"
                  onClick={() => setOpen(false)}
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                  <span className="sr-only">{t.nav.close}</span>
                </button>
              </div>
              <nav className="mt-8 flex flex-col gap-2" aria-label={t.nav.menu}>
                {links.map(([to, key]) => (
                  <NavLink
                    key={to}
                    to={to}
                    end={to === "/"}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `rounded-2xl px-3 py-3 font-heading text-3xl leading-relaxed ${isActive ? "bg-navy text-parchment" : "text-navy"}`
                    }
                  >
                    {t.nav[key]}
                  </NavLink>
                ))}
              </nav>
              <a
                href={`tel:${site.phoneTel}`}
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-kumkum text-lg font-semibold text-parchment shadow-[inset_0_0_0_2px_#E9A914]"
              >
                <Phone className="h-5 w-5 shrink-0" aria-hidden="true" />
                {t.nav.call}
              </a>
            </div>,
            document.body,
          )
        : null}
    </header>
  );
}
