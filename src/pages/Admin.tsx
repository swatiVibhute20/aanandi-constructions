import { use, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.tsx";
import type { Account } from "../auth/AuthContext.tsx";
import { Seo } from "../components/Seo.tsx";
import { useI18n } from "../i18n/LanguageContext.tsx";
import { getProjects, getServices, readEnquiries } from "../lib/api.ts";
import { formatNumber } from "../lib/format.ts";
import type { StoredEnquiry } from "../types.ts";

const adminData = Promise.all([getProjects(), getServices()]);
const tabs = ["overview", "enquiries", "projects", "rates"] as const;
type Tab = (typeof tabs)[number];

export default function AdminPage() {
  const { t, lang } = useI18n();
  const { user, ready } = useAuth();
  const [projects, services] = use(adminData);
  const [tab, setTab] = useState<Tab>("overview");
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    if (user?.role !== "admin") return;
    let active = true;
    readEnquiries().then((rows) => {
      if (active) setEnquiries(rows);
    });
    return () => {
      active = false;
    };
  }, [user, tab]);

  useEffect(() => {
    if (user?.role !== "admin") return;
    let active = true;
    fetch("/api/admin/users", { credentials: "same-origin" })
      .then((response) => response.json())
      .then((data: { users?: Account[] }) => {
        if (active) setAccounts(data.users ?? []);
      })
      .catch(() => {
        if (active) setAccounts([]);
      });
    return () => {
      active = false;
    };
  }, [user]);

  if (!ready) {
    return (
      <div className="grid min-h-[40vh] place-items-center px-4">
        <p className="font-accent text-2xl leading-relaxed text-navy">{t.common.loading}</p>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return (
      <>
        <Seo title={t.meta.adminTitle} description={t.meta.adminDesc} path="/admin" />
        <div className="mx-auto max-w-lg px-4 py-16">
          <h1 className="font-heading text-4xl leading-[1.6] text-navy">{t.admin.title}</h1>
          <p className="mt-3 leading-relaxed">{t.admin.denied}</p>
          <Link to="/login" className="mt-6 inline-flex min-h-12 items-center font-semibold text-kumkum">
            {t.login.submit}
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <Seo title={t.meta.adminTitle} description={t.meta.adminDesc} path="/admin" />
      <div className="border-b border-haldi bg-haldi/25 px-4 py-3 text-center leading-relaxed text-navy">
        {t.admin.lead}
      </div>
      <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[220px_1fr]">
        <nav aria-label={t.admin.navLabel} className="flex gap-2 overflow-x-auto lg:flex-col">
          {tabs.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={tab === item}
              onClick={() => setTab(item)}
              className={`min-h-12 shrink-0 rounded-2xl px-4 text-left font-semibold ${
                tab === item ? "bg-navy text-parchment" : "bg-parchment-deep text-navy"
              }`}
            >
              {t.admin.tabs[item]}
            </button>
          ))}
        </nav>
        <section>
          <p className="font-accent text-xl leading-relaxed text-kumkum">{t.admin.eyebrow}</p>
          <h1 className="font-heading text-4xl leading-[1.6] text-navy">{t.admin.tabs[tab]}</h1>
          {tab === "overview" ? (
            <>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <Stat label={t.admin.stats.enquiries} value={formatNumber(enquiries.length, lang)} />
                <Stat label={t.admin.stats.projects} value={formatNumber(projects.length, lang)} />
                <Stat label={t.admin.stats.services} value={formatNumber(services.length, lang)} />
              </div>
              <h2 className="mt-8 font-heading text-2xl leading-relaxed text-navy">{t.admin.accounts}</h2>
              <ul className="mt-3 space-y-3">
                {accounts.map((account) => (
                  <li key={account.id} className="rounded-2xl border border-navy/10 bg-parchment p-4">
                    <p className="font-heading text-xl leading-relaxed text-navy">{account.name}</p>
                    <p className="text-sm text-ink/70">
                      {account.email} · {account.role === "admin" ? t.admin.roleAdmin : t.admin.roleUser}
                    </p>
                  </li>
                ))}
              </ul>
            </>
          ) : null}
          {tab === "enquiries" ? (
            <div className="mt-6">
              <p className="leading-relaxed text-ink/80">{t.admin.localNote}</p>
              {enquiries.length === 0 ? <p className="mt-4">{t.admin.empty}</p> : null}
              <ul className="mt-4 space-y-3">
                {enquiries.map((row) => (
                  <li key={row.id} className="rounded-2xl border border-navy/10 bg-parchment p-4">
                    <p className="font-heading text-xl leading-relaxed text-navy">{row.name}</p>
                    <p className="text-sm text-ink/70">
                      {row.place} · {row.phone} · {row.serviceId}
                    </p>
                    <p className="mt-2 leading-relaxed">{row.message}</p>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {tab === "projects" || tab === "rates" ? (
            <div className="mt-6 rounded-3xl border border-dashed border-navy/30 bg-parchment-deep p-8">
              <p className="font-heading text-2xl leading-relaxed text-navy">{t.admin.title}</p>
              <p className="mt-2 leading-relaxed">{t.admin.soon}</p>
            </div>
          ) : null}
        </section>
      </div>
    </>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <article className="rounded-2xl bg-navy p-5 text-parchment">
      <p className="font-heading text-4xl leading-relaxed text-haldi">{value}</p>
      <p className="mt-1 leading-relaxed">{label}</p>
    </article>
  );
}
