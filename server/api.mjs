import {
  createEnquiry,
  createReview,
  createSession,
  createUser,
  deleteSession,
  findUserByEmail,
  listEnquiries,
  listReviews,
  listUsers,
  ready,
  userBySession,
  verifyPassword,
} from "./db.mjs";

const COOKIE = "aanandi_session";

function send(res, status, body, headers = {}) {
  res.statusCode = status;
  res.setHeader("content-type", "application/json; charset=utf-8");
  for (const [key, value] of Object.entries(headers)) res.setHeader(key, value);
  res.end(JSON.stringify(body));
}

function readCookie(req, name) {
  const header = req.headers.cookie || "";
  for (const part of header.split(";")) {
    const split = part.indexOf("=");
    if (split < 1) continue;
    if (part.slice(0, split).trim() === name) return decodeURIComponent(part.slice(split + 1).trim());
  }
  return "";
}

function cookie(token, req, clear = false) {
  const secure = req.headers["x-forwarded-proto"] === "https" ? "; Secure" : "";
  const value = clear ? "" : token;
  const maxAge = clear ? 0 : 60 * 60 * 24 * 14;
  return `${COOKIE}=${value}; HttpOnly; Path=/; SameSite=Lax; Max-Age=${maxAge}${secure}`;
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 20_000) {
        reject(new Error("large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => {
      if (chunks.length === 0) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(new Error("json"));
      }
    });
    req.on("error", reject);
  });
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 120;
}

function cleanText(value, min, max) {
  const text = String(value || "").trim().replace(/\s+/g, " ");
  if (text.length < min || text.length > max) return "";
  return text;
}

function cleanPhone(value) {
  let digits = String(value || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return /^[6-9]\d{9}$/.test(digits) ? digits : "";
}

function cleanId(value) {
  const text = String(value || "").trim();
  return /^[a-z0-9-]{1,40}$/.test(text) ? text : "";
}

function cleanEstimate(value) {
  if (!value || typeof value !== "object") return null;
  const workId = cleanId(value.workId);
  const tier = value.tier;
  const quantity = Number(value.quantity);
  const min = Number(value.min);
  const max = Number(value.max);
  if (!workId) return null;
  if (tier !== "basic" && tier !== "standard" && tier !== "premium") return null;
  if (![quantity, min, max].every((item) => Number.isFinite(item) && item >= 0 && item < 1e12)) return null;
  return { workId, tier, quantity, min, max };
}

function account(row) {
  if (!row) return null;
  return { id: row.id, name: row.name, email: row.email, role: row.role };
}

async function sessionUser(req) {
  return account(await userBySession(readCookie(req, COOKIE)));
}

export async function handleApi(req, res) {
  await ready;
  const url = new URL(req.url || "/", "http://127.0.0.1");
  const path = url.pathname;
  const method = req.method || "GET";

  if (method === "GET" && path === "/api/auth/me") {
    send(res, 200, { user: await sessionUser(req) });
    return;
  }

  if (method === "POST" && path === "/api/auth/logout") {
    await deleteSession(readCookie(req, COOKIE));
    send(res, 200, { user: null }, { "set-cookie": cookie("", req, true) });
    return;
  }

  if (method === "GET" && path === "/api/admin/users") {
    const user = await sessionUser(req);
    if (!user || user.role !== "admin") {
      send(res, 403, { error: "forbidden" });
      return;
    }
    send(res, 200, { users: await listUsers() });
    return;
  }

  if (method === "GET" && path === "/api/admin/enquiries") {
    const user = await sessionUser(req);
    if (!user || user.role !== "admin") {
      send(res, 403, { error: "forbidden" });
      return;
    }
    send(res, 200, { enquiries: await listEnquiries() });
    return;
  }

  if (method === "GET" && path === "/api/reviews") {
    send(res, 200, { reviews: await listReviews() });
    return;
  }

  if (method === "POST" && (path === "/api/enquiries" || path === "/api/reviews")) {
    let body;
    try {
      body = await readJson(req);
    } catch {
      send(res, 400, { error: "invalid" });
      return;
    }

    if (path === "/api/enquiries") {
      const name = cleanText(body.name, 2, 80);
      const phone = cleanPhone(body.phone);
      const place = cleanText(body.place, 2, 80);
      const serviceId = cleanId(body.serviceId);
      const message = cleanText(body.message, 8, 2000);
      const lang = body.lang === "en" ? "en" : body.lang === "mr" ? "mr" : "";
      if (!name || !phone || !place || !serviceId || !message || !lang) {
        send(res, 400, { error: "invalid" });
        return;
      }
      const saved = await createEnquiry({
        name,
        phone,
        place,
        serviceId,
        message,
        lang,
        estimate: cleanEstimate(body.estimate),
      });
      send(res, 201, { ok: true, id: saved.id });
      return;
    }

    const name = cleanText(body.name, 2, 80);
    const place = cleanText(body.place, 2, 80);
    const quote = cleanText(body.quote, 8, 2000);
    const category = ["residential", "industrial", "agricultural"].includes(body.category) ? body.category : "";
    if (!name || !place || !quote || !category) {
      send(res, 400, { error: "invalid" });
      return;
    }
    send(res, 201, { review: await createReview({ name, place, quote, category }) });
    return;
  }

  if (method !== "POST" || (path !== "/api/auth/login" && path !== "/api/auth/signup")) {
    send(res, 404, { error: "server" });
    return;
  }

  let body;
  try {
    body = await readJson(req);
  } catch {
    send(res, 400, { error: "invalid" });
    return;
  }

  const email = String(body.email || "").trim().toLowerCase();
  const password = String(body.password || "");

  if (path === "/api/auth/signup") {
    const name = cleanText(body.name, 2, 80);
    if (!name || !validEmail(email) || password.length < 8 || password.length > 72) {
      send(res, 400, { error: "invalid" });
      return;
    }
    try {
      const user = await createUser({ name, email, password });
      const token = await createSession(user.id);
      send(res, 201, { user }, { "set-cookie": cookie(token, req) });
    } catch (error) {
      if (error instanceof Error && error.message === "taken") {
        send(res, 409, { error: "taken" });
        return;
      }
      throw error;
    }
    return;
  }

  if (!validEmail(email) || password.length < 8 || password.length > 72) {
    send(res, 401, { error: "bad" });
    return;
  }
  const row = await findUserByEmail(email);
  if (!row || !verifyPassword(password, row.password_hash)) {
    send(res, 401, { error: "bad" });
    return;
  }
  const token = await createSession(row.id);
  send(res, 200, { user: account(row) }, { "set-cookie": cookie(token, req) });
}
