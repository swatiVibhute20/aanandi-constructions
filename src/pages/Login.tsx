import { useState } from "react";
import type { FormEvent } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext.tsx";
import { Button } from "../components/Button.tsx";
import { Seo } from "../components/Seo.tsx";
import { Logo } from "../components/visual/Logo.tsx";
import { WarliPortrait } from "../components/visual/Warli.tsx";
import { useI18n } from "../i18n/LanguageContext.tsx";

export default function LoginPage() {
  const { t } = useI18n();
  const { user, ready, login, signup } = useAuth();
  const navigate = useNavigate();
  const signupMode = useLocation().pathname === "/signup";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  if (ready && user) {
    return <Navigate to={user.role === "admin" ? "/admin" : "/"} replace />;
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setBusy(true);
    try {
      const account = signupMode ? await signup(name, email, password) : await login(email, password);
      navigate(account.role === "admin" ? "/admin" : "/", { replace: true });
    } catch (caught) {
      const code = caught instanceof Error ? caught.message : "server";
      if (code === "invalid") setError(t.login.invalid);
      else if (code === "taken") setError(t.login.taken);
      else if (code === "bad") setError(t.login.bad);
      else setError(t.login.server);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Seo
        title={signupMode ? t.meta.signupTitle : t.meta.loginTitle}
        description={signupMode ? t.meta.signupDesc : t.meta.loginDesc}
        path={signupMode ? "/signup" : "/login"}
      />
      <div className="grid min-h-[70svh] lg:grid-cols-2">
        <div className="relative hidden overflow-hidden bg-terracotta text-parchment lg:block">
          <div className="blueprint-grid-light absolute inset-0 opacity-40" aria-hidden="true" />
          <div className="relative flex h-full flex-col justify-between p-10">
            <Logo variant="light" />
            <WarliPortrait className="mx-auto w-56" />
            <p className="font-accent text-3xl leading-relaxed">{t.hero.title}</p>
          </div>
        </div>
        <div className="mx-auto flex w-full max-w-md flex-col justify-center px-4 py-12 sm:px-6">
          <p className="font-accent text-xl leading-relaxed text-kumkum">{t.login.eyebrow}</p>
          <h1 className="font-heading text-4xl leading-[1.6] text-navy">
            {signupMode ? t.login.signupTitle : t.login.title}
          </h1>
          <p className="mt-3 leading-relaxed text-ink/85">{signupMode ? t.login.signupLead : t.login.lead}</p>
          <form onSubmit={onSubmit} className="mt-6 space-y-4">
            {signupMode ? (
              <label className="block">
                <span className="font-semibold">{t.login.name}</span>
                <input
                  className="field mt-1"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
            ) : null}
            <label className="block">
              <span className="font-semibold">{t.login.email}</span>
              <input
                className="field mt-1"
                type="email"
                name="email"
                autoComplete="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>
            <label className="block">
              <span className="font-semibold">{t.login.password}</span>
              <input
                className="field mt-1"
                type="password"
                name="password"
                autoComplete={signupMode ? "new-password" : "current-password"}
                minLength={8}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>
            <Button type="submit" className="w-full" disabled={busy || !ready}>
              {signupMode ? t.login.signupSubmit : t.login.submit}
            </Button>
          </form>
          {error ? (
            <p className="mt-4 rounded-2xl border border-haldi bg-haldi/20 px-4 py-3 leading-relaxed" role="alert">
              {error}
            </p>
          ) : null}
          <Link
            to={signupMode ? "/login" : "/signup"}
            className="mt-6 inline-flex min-h-12 items-center font-semibold text-kumkum"
          >
            {signupMode ? t.login.switchToLogin : t.login.switchToSignup}
          </Link>
          <Link to="/contact" className="inline-flex min-h-12 items-center font-semibold text-navy">
            {t.login.contact}
          </Link>
        </div>
      </div>
    </>
  );
}
