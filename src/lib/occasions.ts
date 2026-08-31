// Canonical list of gallery "occasion" tags — kept in one place so the
// admin upload dropdown, the gallery_items.occasion column, and the actual
// /occasions/* route slugs never drift apart. If you add a new occasion
// page under src/routes/occasions.*, add its slug here too.
export const OCCASION_SLUGS = [
  "baby-showers",
  "birthday-parties",
  "bridal-showers",
  "corporate-brand-events",
  "kwanjula",
  "tea-parties",
  "wedding-proposals",
] as const;

export type OccasionSlug = (typeof OCCASION_SLUGS)[number];

export const OCCASION_LABELS: Record<OccasionSlug, string> = {
  "baby-showers": "Baby Showers",
  "birthday-parties": "Birthday Parties",
  "bridal-showers": "Bridal Showers",
  "corporate-brand-events": "Corporate & Brand Events",
  kwanjula: "Kwanjula",
  "tea-parties": "Tea Parties",
  "wedding-proposals": "Wedding Proposals",
};

export function isOccasionSlug(value: string): value is OccasionSlug {
  return (OCCASION_SLUGS as readonly string[]).includes(value);
}

// The corporate-events route path has a literal "&" in it (a quirk of the
// existing file route), which is awkward as a DB/dropdown value — so the
// DB slug above stays clean and this maps to the real route path instead.
export const OCCASION_ROUTE_PATHS: Record<OccasionSlug, string> = {
  "baby-showers": "/occasions/baby-showers",
  "birthday-parties": "/occasions/birthday-parties",
  "bridal-showers": "/occasions/bridal-showers",
  "corporate-brand-events": "/occasions/corporate&brand-events",
  kwanjula: "/occasions/kwanjula",
  "tea-parties": "/occasions/tea-parties",
  "wedding-proposals": "/occasions/wedding-proposals",
};
