import blush from "@/assets/product-blush-roses.jpg";
import burgundy from "@/assets/product-burgundy.jpg";
import ivory from "@/assets/product-ivory.jpg";
import garden from "@/assets/product-garden.jpg";

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  bestFor: string;
};

export const products: Product[] = [
  {
    id: "blush-rose",
    name: "Blush Rose Bouquet",
    category: "Signature Bouquet",
    price: 45000,
    image: blush,
    description:
      "A gathering of soft pink garden roses, hand-tied and finished in cream ribbon. Romantic, tender, and quietly luxurious.",
    bestFor: "Anniversaries · Birthdays · Just because",
  },
  {
    id: "burgundy-noir",
    name: "Burgundy Noir",
    category: "Statement Arrangement",
    price: 62000,
    image: burgundy,
    description:
      "Velvet burgundy roses set against deep foliage. A moody, editorial arrangement for those who love drama with their romance.",
    bestFor: "Milestones · Gifting · Editorial styling",
  },
  {
    id: "ivory-bridal",
    name: "Ivory Bridal Cluster",
    category: "Bridal",
    price: 85000,
    image: ivory,
    description:
      "Cream garden roses with soft foliage in a rounded, timeless silhouette. Made to walk down the aisle.",
    bestFor: "Weddings · Elopements · Bridal shoots",
  },
  {
    id: "garden-pastel",
    name: "Garden Pastel",
    category: "Signature Bouquet",
    price: 52000,
    image: garden,
    description:
      "A wild, garden-picked gathering of pastel roses, ranunculus and trailing greenery. Soft, unstructured, endlessly pretty.",
    bestFor: "Housewarmings · Thank-yous · Sunday tables",
  },
];

export const formatNaira = (n: number) =>
  new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN", maximumFractionDigits: 0 }).format(n);
