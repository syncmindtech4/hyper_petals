import { Product } from "@/lib/products";

export const FLOWER_TYPES = [
  "Peonies",
  "Baby's Breath",
  "Roses",
  "Mixed/Assorted",
  "Exotic",
] as const;
export type FlowerType = (typeof FLOWER_TYPES)[number];

export const STYLES = ["Plain", "Mixed"] as const;
export type BouquetStyle = (typeof STYLES)[number];

export const OCCASIONS = ["Bridal", "Everyday", "Anniversary", "Sympathy"] as const;
export type Occasion = (typeof OCCASIONS)[number];

export const ARRANGEMENT_STYLES = ["Arranged", "One by One", "With Fillers/Greenery"] as const;
export type ArrangementStyle = (typeof ARRANGEMENT_STYLES)[number];

export interface BouquetCustomization {
  flowerType: FlowerType | null;
  style: BouquetStyle | null;
  colors: string[];
  occasion: Occasion | null;
  arrangementStyle: ArrangementStyle | null;
}

export const EMPTY_CUSTOMIZATION: BouquetCustomization = {
  flowerType: null,
  style: null,
  colors: [],
  occasion: null,
  arrangementStyle: null,
};

// Color options per flower type. Peonies values are placeholders pending
// confirmation from the client — swap them out once real stock colors are known.
export const flowerColorMap: Record<FlowerType, string[]> = {
  "Baby's Breath": ["Red", "Pink", "White"],
  Roses: ["Red", "Orange", "Peach", "Yellow", "White", "Pink"],
  Exotic: ["Pink", "Orange", "White", "Green", "Yellow", "Magenta"],
  "Mixed/Assorted": ["Multicolor"],
  Peonies: ["Red", "Pink", "White"], // PLACEHOLDER — confirm actual Peonies color stock
};

// Mixed/Assorted is multicolor by definition, so it always locks to "Mixed" style.
export function stylesAvailableFor(flowerType: FlowerType): BouquetStyle[] {
  if (flowerType === "Mixed/Assorted") return ["Mixed"];
  return ["Plain", "Mixed"];
}

// Color select mode follows Style: Plain = pick one, Mixed = pick multiple.
export function colorSelectionMode(style: BouquetStyle | null): "single" | "multi" {
  return style === "Mixed" ? "multi" : "single";
}

export function colorOptionsFor(flowerType: FlowerType | null): string[] {
  if (!flowerType) return [];
  return flowerColorMap[flowerType];
}

export function isCustomizationComplete(c: BouquetCustomization): boolean {
  return Boolean(
    c.flowerType && c.style && c.colors.length > 0 && c.occasion && c.arrangementStyle,
  );
}

export function missingCustomizationFields(c: BouquetCustomization): string[] {
  const missing: string[] = [];
  if (!c.flowerType) missing.push("flower type");
  if (!c.style) missing.push("style");
  if (c.colors.length === 0) missing.push("color");
  if (!c.occasion) missing.push("occasion");
  if (!c.arrangementStyle) missing.push("arrangement style");
  return missing;
}

export function customizationSummary(c: BouquetCustomization): string {
  if (!c.flowerType) return "";
  const colorPart = c.colors.length > 0 ? c.colors.join(" & ") : null;
  const namePart = [c.style, c.flowerType].filter(Boolean).join(" ");
  const parts = [
    colorPart ? `${namePart} — ${colorPart}` : namePart,
    c.occasion,
    c.arrangementStyle,
  ].filter(Boolean);
  return parts.join(", ");
}

// Products whose category text doesn't read as a floral bouquet (e.g. baskets,
// candles, vases) skip the flower customization filters. Everything else on
// this site is a hand-tied bouquet, so this defaults to "customizable".
const NON_BOUQUET_CATEGORY_KEYWORDS = [
  "basket",
  "candle",
  "vase",
  "chocolate",
  "gift box",
  "hamper",
];

export function isCustomizableBouquet(product: Pick<Product, "category">): boolean {
  const category = product.category.toLowerCase();
  return !NON_BOUQUET_CATEGORY_KEYWORDS.some((keyword) => category.includes(keyword));
}
