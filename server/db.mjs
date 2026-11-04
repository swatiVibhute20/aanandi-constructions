import { createClient } from "@libsql/client";
import { randomBytes, randomUUID, scryptSync, timingSafeEqual } from "node:crypto";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

function loadEnvFile() {
  const path = join(process.cwd(), ".env");
  if (!existsSync(path)) return;
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const split = trimmed.indexOf("=");
    if (split < 1) continue;
    const key = trimmed.slice(0, split).trim();
    const value = trimmed.slice(split + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile();

const databaseUrl = (process.env.TURSO_DATABASE_URL || "").trim();
const authToken = (process.env.TURSO_AUTH_TOKEN || "").trim();

if (process.env.RENDER === "true" && !databaseUrl) {
  throw new Error("Set TURSO_DATABASE_URL and TURSO_AUTH_TOKEN on Render.");
}
if (databaseUrl && !authToken) {
  throw new Error("Set TURSO_AUTH_TOKEN with TURSO_DATABASE_URL.");
}

const client = databaseUrl
  ? createClient({ url: databaseUrl, authToken })
  : createClient({ url: "file:data/aanandi.sqlite" });

if (!databaseUrl) mkdirSync(join(process.cwd(), "data"), { recursive: true });

function hashPassword(password) {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

export function verifyPassword(password, stored) {
  const [salt, hash] = String(stored).split(":");
  if (!salt || !hash) return false;
  const next = scryptSync(password, salt, 32);
  const prev = Buffer.from(hash, "hex");
  return next.length === prev.length && timingSafeEqual(next, prev);
}

function publicUser(row) {
  if (!row) return null;
  return { id: String(row.id), name: String(row.name), email: String(row.email), role: String(row.role) };
}

function isUnique(error) {
  return String(error).includes("UNIQUE");
}

async function seedAdmin() {
  const email = (process.env.ADMIN_EMAIL || "").trim().toLowerCase();
  const password = process.env.ADMIN_PASSWORD || "";
  const name = (process.env.ADMIN_NAME || "Rajvardhan Ingawale").trim();
  if (!email || password.length < 8) return;
  const existing = await client.execute({ sql: "SELECT id FROM users WHERE email = ?", args: [email] });
  if (existing.rows[0]) return;
  await client.execute({
    sql: "INSERT INTO users (id, name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, 'admin', ?)",
    args: [randomUUID(), name, email, hashPassword(password), new Date().toISOString()],
  });
  console.log(`Admin account ready: ${email}`);
}

async function bootstrap() {
  try {
    await client.execute("PRAGMA foreign_keys = ON");
  } catch (error) {
    console.error(error);
  }
  const tables = [
    `CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE COLLATE NOCASE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK (role IN ('user', 'admin')),
      created_at TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      created_at TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS enquiries (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      place TEXT NOT NULL,
      service_id TEXT NOT NULL,
      message TEXT NOT NULL,
      lang TEXT NOT NULL CHECK (lang IN ('mr', 'en')),
      estimate_json TEXT,
      created_at TEXT NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS reviews (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      place TEXT NOT NULL,
      category TEXT NOT NULL CHECK (category IN ('residential', 'industrial', 'agricultural')),
      quote TEXT NOT NULL,
      created_at TEXT NOT NULL
    )`,
  ];
  for (const sql of tables) await client.execute(sql);
  await seedAdmin();
}

export const ready = bootstrap();

export async function createUser({ name, email, password }) {
  await ready;
  const id = randomUUID();
  try {
    await client.execute({
      sql: "INSERT INTO users (id, name, email, password_hash, role, created_at) VALUES (?, ?, ?, ?, 'user', ?)",
      args: [id, name, email, hashPassword(password), new Date().toISOString()],
    });
  } catch (error) {
    if (isUnique(error)) throw new Error("taken");
    throw error;
  }
  const found = await client.execute({
    sql: "SELECT id, name, email, role FROM users WHERE id = ?",
    args: [id],
  });
  return publicUser(found.rows[0]);
}

export async function findUserByEmail(email) {
  await ready;
  const found = await client.execute({
    sql: "SELECT id, name, email, role, password_hash FROM users WHERE email = ?",
    args: [email],
  });
  return found.rows[0] ?? null;
}

export async function createSession(userId) {
  await ready;
  const token = randomBytes(32).toString("hex");
  await client.execute({
    sql: "INSERT INTO sessions (token, user_id, created_at) VALUES (?, ?, ?)",
    args: [token, userId, new Date().toISOString()],
  });
  return token;
}

export async function deleteSession(token) {
  await ready;
  if (!token) return;
  await client.execute({ sql: "DELETE FROM sessions WHERE token = ?", args: [token] });
}

export async function userBySession(token) {
  await ready;
  if (!token) return null;
  const found = await client.execute({
    sql: `SELECT users.id, users.name, users.email, users.role
      FROM sessions
      JOIN users ON users.id = sessions.user_id
      WHERE sessions.token = ?`,
    args: [token],
  });
  return publicUser(found.rows[0]);
}

export async function listUsers() {
  await ready;
  const found = await client.execute(
    "SELECT id, name, email, role FROM users ORDER BY created_at",
  );
  return found.rows.map((row) => publicUser(row));
}

function enquiryFromRow(row) {
  let estimate;
  if (row.estimate_json) {
    try {
      estimate = JSON.parse(String(row.estimate_json));
    } catch {
      estimate = undefined;
    }
  }
  return {
    id: String(row.id),
    name: String(row.name),
    phone: String(row.phone),
    place: String(row.place),
    serviceId: String(row.service_id),
    message: String(row.message),
    lang: row.lang === "en" ? "en" : "mr",
    createdAt: String(row.created_at),
    ...(estimate ? { estimate } : {}),
  };
}

export async function createEnquiry(input) {
  await ready;
  const id = randomUUID();
  const createdAt = new Date().toISOString();
  await client.execute({
    sql: `INSERT INTO enquiries
      (id, name, phone, place, service_id, message, lang, estimate_json, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      id,
      input.name,
      input.phone,
      input.place,
      input.serviceId,
      input.message,
      input.lang,
      input.estimate ? JSON.stringify(input.estimate) : null,
      createdAt,
    ],
  });
  return { id, createdAt };
}

export async function listEnquiries() {
  await ready;
  const found = await client.execute(
    `SELECT id, name, phone, place, service_id, message, lang, estimate_json, created_at
     FROM enquiries ORDER BY created_at DESC`,
  );
  return found.rows.map((row) => enquiryFromRow(row));
}

function reviewFromRow(row) {
  return {
    id: String(row.id),
    name: String(row.name),
    place: String(row.place),
    category: String(row.category),
    quote: String(row.quote),
    createdAt: String(row.created_at),
  };
}

export async function createReview(input) {
  await ready;
  const row = {
    id: randomUUID(),
    name: input.name,
    place: input.place,
    category: input.category,
    quote: input.quote,
    createdAt: new Date().toISOString(),
  };
  await client.execute({
    sql: "INSERT INTO reviews (id, name, place, category, quote, created_at) VALUES (?, ?, ?, ?, ?, ?)",
    args: [row.id, row.name, row.place, row.category, row.quote, row.createdAt],
  });
  return row;
}

export async function listReviews() {
  await ready;
  const found = await client.execute(
    "SELECT id, name, place, category, quote, created_at FROM reviews ORDER BY created_at DESC",
  );
  return found.rows.map((row) => reviewFromRow(row));
}
