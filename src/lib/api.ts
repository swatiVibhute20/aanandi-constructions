import { counters, founder, reasons, serviceAreas, steps } from "../data/content.ts";
import { estimatorWorks } from "../data/estimatorRates.ts";
import { projects } from "../data/projects.ts";
import { services } from "../data/services.ts";
import { testimonials } from "../data/testimonials.ts";
import type { EnquiryInput, StoredEnquiry, StoredReview } from "../types.ts";

/**
 * Page copy, projects and services stay in the repo.
 * Accounts, enquiries and visitor reviews go through /api into Turso.
 */

let servicesP: Promise<typeof services> | undefined;
let projectsP: Promise<typeof projects> | undefined;
let testimonialsP: Promise<typeof testimonials> | undefined;
let worksP: Promise<typeof estimatorWorks> | undefined;

export function getServices() {
  servicesP ??= Promise.resolve(services);
  return servicesP;
}

export function getProjects() {
  projectsP ??= Promise.resolve(projects);
  return projectsP;
}

export function getFeaturedProjects() {
  return getProjects().then((rows) => rows.filter((row) => row.featured));
}

export function getTestimonials() {
  testimonialsP ??= Promise.resolve(testimonials);
  return testimonialsP;
}

export function getEstimatorWorks() {
  worksP ??= Promise.resolve(estimatorWorks);
  return worksP;
}

export function getCounters() {
  return Promise.resolve(counters);
}

export function getReasons() {
  return Promise.resolve(reasons);
}

export function getFounder() {
  return Promise.resolve(founder);
}

export function getSteps() {
  return Promise.resolve(steps);
}

export function getServiceAreas() {
  return Promise.resolve(serviceAreas);
}

export async function submitEnquiry(input: EnquiryInput): Promise<{ ok: true; id: string }> {
  const response = await fetch("/api/enquiries", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error("send");
  const data = (await response.json()) as { id?: string };
  if (!data.id) throw new Error("send");
  return { ok: true, id: data.id };
}

export async function readEnquiries(): Promise<StoredEnquiry[]> {
  const response = await fetch("/api/admin/enquiries", { credentials: "same-origin" });
  if (!response.ok) return [];
  const data = (await response.json()) as { enquiries?: StoredEnquiry[] };
  return Array.isArray(data.enquiries) ? data.enquiries : [];
}

function isReview(row: StoredReview) {
  return (
    row &&
    typeof row.id === "string" &&
    typeof row.quote === "string" &&
    (row.category === "residential" || row.category === "industrial" || row.category === "agricultural")
  );
}

export async function readReviews(): Promise<StoredReview[]> {
  const response = await fetch("/api/reviews");
  if (!response.ok) return [];
  const data = (await response.json()) as { reviews?: StoredReview[] };
  return Array.isArray(data.reviews) ? data.reviews.filter(isReview) : [];
}

export async function submitReview(input: Omit<StoredReview, "id" | "createdAt">): Promise<StoredReview> {
  const response = await fetch("/api/reviews", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!response.ok) throw new Error("send");
  const data = (await response.json()) as { review?: StoredReview };
  if (!data.review || !isReview(data.review)) throw new Error("send");
  return data.review;
}
