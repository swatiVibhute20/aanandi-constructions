import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { FloatingActions } from "./FloatingActions.tsx";
import { Footer } from "./Footer.tsx";
import { Navbar } from "./Navbar.tsx";
import { PaperGrain } from "./visual/PaperGrain.tsx";

export function Layout() {
  const { pathname, hash } = useLocation();
  const { t } = useI18n();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }
    const id = decodeURIComponent(hash.slice(1));
    const frame = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ block: "start" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, hash]);

  return (
    <div className="flex min-h-svh flex-col">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[90] focus:rounded-full focus:bg-kumkum focus:px-4 focus:py-2 focus:text-parchment"
      >
        {t.common.skip}
      </a>
      <Navbar />
      <main id="content" className="flex-1 pb-28">
        <Outlet />
      </main>
      <Footer />
      <FloatingActions />
      <PaperGrain />
    </div>
  );
}
