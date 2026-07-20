import garden_rose from "@/assets/bouquet_garden_roses.jpeg";
import luxe from "@/assets/bouquet_006.jpeg";
import bridal from "@/assets/bouquet_bridal.jpeg";
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
    id: "garden-rose",
    name: "Garden Rose Bouquet",
    category: "Signature Bouquet",
    price: 45000,
    image: garden_rose,
    description:
      "A gathering of soft pink garden roses, hand-tied and finished in cream ribbon. Romantic, tender, and quietly luxurious.",
    bestFor: "Anniversaries · Birthdays · Just because",
  },
  {
    id: "luxe-pack",
    name: "Luxe Pack",
    category: "Statement Arrangement",
    price: 62000,
    image: luxe,
    description:
      "Velvet burgundy roses set against deep foliage. A moody, editorial arrangement for those who love drama with their romance.",
    bestFor: "Milestones · Gifting · Editorial styling",
  },
  {
    id: "ivory-bridal",
    name: "Ivory Bridal Cluster",
    category: "Bridal Bouquet",
    price: 85000,
    image: bridal,
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

export const formatUGX = (n: number) =>
  new Intl.NumberFormat("en-UG", {
    style: "currency",
    currency: "UGX",
    maximumFractionDigits: 0,
  }).format(n);
