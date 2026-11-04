import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";

export type Account = {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin";
};

type AuthValue = {
  user: Account | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<Account>;
  signup: (name: string, email: string, password: string) => Promise<Account>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthValue | null>(null);

async function post(path: string, body: Record<string, string>) {
  const response = await fetch(path, {
    method: "POST",
    headers: { "content-type": "application/json" },
    credentials: "same-origin",
    body: JSON.stringify(body),
  });
  const data = (await response.json().catch(() => ({}))) as { user?: Account; error?: string };
  if (!response.ok || !data.user) throw new Error(data.error || "server");
  return data.user;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Account | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    fetch("/api/auth/me", { credentials: "same-origin" })
      .then((response) => response.json())
      .then((data: { user?: Account | null }) => {
        if (active) setUser(data.user ?? null);
      })
      .catch(() => {
        if (active) setUser(null);
      })
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const value: AuthValue = {
    user,
    ready,
    login: async (email, password) => {
      const account = await post("/api/auth/login", { email, password });
      setUser(account);
      return account;
    },
    signup: async (name, email, password) => {
      const account = await post("/api/auth/signup", { name, email, password });
      setUser(account);
      return account;
    },
    logout: async () => {
      await fetch("/api/auth/logout", { method: "POST", credentials: "same-origin" });
      setUser(null);
    },
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider");
  return value;
}
