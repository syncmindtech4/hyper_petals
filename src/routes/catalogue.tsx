import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { z } from "zod";
import { SlidersHorizontal, ArrowUpDown, ChevronDown, Check, ShoppingCart, Plus } from "lucide-react";
import { Product, formatUGX } from "@/lib/products";
import { useProducts } from "@/hooks/useProducts";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import heroImage from "@/assets/hero-bouquet.jpg";

const catalogueSearchSchema = z.object({
  type: z.string().optional(),
  occasion: z.string().optional(),
  sort: z.string().optional(),
});

export const Route = createFileRoute("/catalogue")({
  validateSearch: (search) => catalogueSearchSchema.parse(search),
  component: Catalogue,
  head: () => ({
    meta: [
      { title: "Shop Premium Bouquets — Luxe Floral Designs & Events" },
      {
        name: "description",
        content: "Browse our signature hand-tied arrangements, roses, gift baskets, and custom floral packages in Kampala.",
      },
    ],
  }),
});

const OCCASIONS = [
  { id: "Birthday", label: "Birthday" },
  { id: "Anniversary", label: "Anniversary" },
  { id: "Get Well", label: "Get Well" },
  { id: "Congratulations", label: "Congratulations" },
  { id: "Just Because", label: "Just Because" },
];

const TYPES = [
  { id: "Roses", label: "Roses" },
  { id: "Mixed Bouquets", label: "Mixed Bouquets" },
  { id: "Baskets", label: "Baskets" },
  { id: "Add-ons", label: "Add-ons" },
];

function Catalogue() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: Route.fullPath });
  const { addToCart } = useCart();
  const { data: products } = useProducts();

  // Search parameters state mapping
  const initialType = search.type || "";
  const initialOccasion = search.occasion || "";

  // Selected filters
  const [selectedOccasions, setSelectedOccasions] = useState<string[]>(
    initialOccasion ? [initialOccasion] : []
  );
  const [selectedTypes, setSelectedTypes] = useState<string[]>(
    initialType ? [initialType] : []
  );
  const [priceRange, setPriceRange] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>(search.sort || "popular");

  // Sync state if search params change
  useEffect(() => {
    if (search.type) {
      setSelectedTypes([search.type]);
    }
    if (search.occasion) {
      setSelectedOccasions([search.occasion]);
    }
  }, [search.type, search.occasion]);

  const handleOccasionChange = (occasionId: string, checked: boolean) => {
    if (checked) {
      setSelectedOccasions((prev) => [...prev, occasionId]);
    } else {
      setSelectedOccasions((prev) => prev.filter((id) => id !== occasionId));
    }
  };

  const handleTypeChange = (typeId: string, checked: boolean) => {
    if (checked) {
      setSelectedTypes((prev) => [...prev, typeId]);
    } else {
      setSelectedTypes((prev) => prev.filter((id) => id !== typeId));
    }
  };

  const clearAllFilters = () => {
    setSelectedOccasions([]);
    setSelectedTypes([]);
    setPriceRange("all");
    setSortBy("popular");
    navigate({ search: {} });
  };

  // Filter and Sort logic
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Occasions Filter (matches inside bestFor text)
        if (selectedOccasions.length > 0) {
          const match = selectedOccasions.some((occ) =>
            p.bestFor.toLowerCase().includes(occ.toLowerCase())
          );
          if (!match) return false;
        }

        // Type Filter (matches inside category name)
        if (selectedTypes.length > 0) {
          const match = selectedTypes.some((type) =>
            p.category.toLowerCase().includes(type.toLowerCase())
          );
          if (!match) return false;
        }

        // Price Filter
        if (priceRange === "under-80") {
          return p.price < 80000;
        } else if (priceRange === "80-150") {
          return p.price >= 80000 && p.price <= 150000;
        } else if (priceRange === "over-150") {
          return p.price > 150000;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-asc") {
          return a.price - b.price;
        } else if (sortBy === "price-desc") {
          return b.price - a.price;
        }
        // "popular" (use natural order of array as default popularity score)
        return 0;
      });
  }, [products, selectedOccasions, selectedTypes, priceRange, sortBy]);

  const activeSortLabel = useMemo(() => {
    switch (sortBy) {
      case "price-asc":
        return "Price: Low to High";
      case "price-desc":
        return "Price: High to Low";
      default:
        return "Popularity";
    }
  }, [sortBy]);

  const handleQuickAdd = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Add default configuration: 12 stems (or default price), no addons, default date
    const today = new Date();
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate() + 1).padStart(2, "0")}`; // Default to tomorrow
    
    addToCart({
      product,
      quantity: 1,
      selectedSize: "12 Stems",
      sizePrice: product.price,
      selectedAddOns: [],
      isGift: false,
      deliveryLocation: "Kampala Central",
      deliveryDate: formattedDate,
    });
    
    toast.success(`${product.name} added to cart!`, {
      description: "Default size (12 Stems) added. Open cart to customize options.",
    });
  };

  const scrollToGrid = (e: React.MouseEvent) => {
    e.preventDefault();
    const gridElement = document.getElementById("catalogue-grid");
    if (gridElement) {
      gridElement.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-6 md:py-12">
      {/* Full-bleed overlay glass blur Hero Section */}
      <div className="relative w-full rounded-[24px] min-h-[70vh] md:min-h-[80vh] flex items-center justify-start p-8 md:p-16 mb-12 overflow-hidden bg-muted">
        {/* Background Image */}
        <img
          src={heroImage}
          alt="Luxe hand-tied floral arrangements"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Maroonish glass blur overlay */}
        <div className="absolute inset-0 bg-[rgba(92,29,36,0.65)] backdrop-blur-[8px]" />
        
        {/* Text content on top */}
        <div className="relative z-10 max-w-2xl text-left flex flex-col items-start space-y-6 text-white">
          <span className="inline-block bg-white/20 border border-white/20 text-white text-[10px] uppercase tracking-[1.5px] font-semibold px-4 py-1.5 rounded-full">
            KAMPALA STUDIO · FRESH DAILY
          </span>
          <h1 className="font-serif text-5xl md:text-7xl text-white font-light leading-tight tracking-tight">
            Hand-Tied <br className="hidden md:inline" /> Arrangements
          </h1>
          <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-xl">
            Each arrangement is designed and hand-tied in our Kampala studio using freshly cut, 
            premium seasonal blooms. Choose a bouquet to customize sizes, add-ons, and local delivery.
          </p>
          <div className="flex flex-wrap items-center gap-6 pt-4 w-full sm:w-auto">
            <button
              onClick={scrollToGrid}
              className="rounded-full bg-white text-[#5C1D24] px-8 py-3.5 text-xs font-semibold uppercase tracking-[1.5px] shadow-lg hover:bg-white/95 hover:-translate-y-0.5 hover:scale-[1.03] transition-all duration-300 cursor-pointer w-full sm:w-auto text-center font-medium"
            >
              Explore Catalogue
            </button>
            <Link
              to="/contact"
              className="text-xs font-semibold uppercase tracking-[1.5px] border-b border-white/40 hover:border-white py-1 text-white transition-all duration-300 w-full sm:w-auto text-center"
            >
              Request a Custom Quote
            </Link>
          </div>
        </div>
      </div>

      {/* Catalogue Grid and Sticky Filter Bar */}
      <div id="catalogue-grid" className="scroll-mt-24 space-y-8">
        
        {/* Sticky Horizontal Filter Bar */}
        <div className="sticky top-[76px] z-20 bg-background/95 backdrop-blur-md border-y border-border/40 py-4 px-2 flex flex-wrap items-center justify-between gap-4">
          
          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-4">
            
            {/* Occasion Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-foreground/80 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 focus:outline-none cursor-pointer">
                  Occasion {selectedOccasions.length > 0 && `(${selectedOccasions.length})`}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4 bg-background border border-border/60 min-w-[220px] space-y-2.5 shadow-lg rounded-2xl z-40">
                {OCCASIONS.map((occ) => (
                  <div key={occ.id} className="flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer">
                    <Checkbox
                      id={`occ-${occ.id}`}
                      checked={selectedOccasions.includes(occ.id)}
                      onCheckedChange={(checked) =>
                        handleOccasionChange(occ.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`occ-${occ.id}`}
                      className="text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1"
                    >
                      {occ.label}
                    </Label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Type Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-foreground/80 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 focus:outline-none cursor-pointer">
                  Type {selectedTypes.length > 0 && `(${selectedTypes.length})`}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4 bg-background border border-border/60 min-w-[200px] space-y-2.5 shadow-lg rounded-2xl z-40">
                {TYPES.map((type) => (
                  <div key={type.id} className="flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer">
                    <Checkbox
                      id={`type-${type.id}`}
                      checked={selectedTypes.includes(type.id)}
                      onCheckedChange={(checked) =>
                        handleTypeChange(type.id, checked === true)
                      }
                    />
                    <Label
                      htmlFor={`type-${type.id}`}
                      className="text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1"
                    >
                      {type.label}
                    </Label>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Price Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-foreground/80 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 focus:outline-none cursor-pointer">
                  Price {priceRange !== "all" && "•"}
                  <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="p-4 bg-background border border-border/60 min-w-[220px] shadow-lg rounded-2xl z-40">
                <RadioGroup value={priceRange} onValueChange={setPriceRange} className="space-y-2.5">
                  <div className="flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer">
                    <RadioGroupItem value="all" id="price-all" />
                    <Label htmlFor="price-all" className="text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1">
                      All Prices
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer">
                    <RadioGroupItem value="under-80" id="price-under-80" />
                    <Label htmlFor="price-under-80" className="text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1">
                      Under 80,000 UGX
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer">
                    <RadioGroupItem value="80-150" id="price-80-150" />
                    <Label htmlFor="price-80-150" className="text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1">
                      80,000 – 150,000 UGX
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer">
                    <RadioGroupItem value="over-150" id="price-over-150" />
                    <Label htmlFor="price-over-150" className="text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1">
                      150,000 UGX +
                    </Label>
                  </div>
                </RadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Clear All Button */}
            {(selectedOccasions.length > 0 || selectedTypes.length > 0 || priceRange !== "all") && (
              <button
                onClick={clearAllFilters}
                className="text-xs uppercase tracking-wider font-semibold text-primary underline underline-offset-4 hover:opacity-85 transition-opacity ml-2 cursor-pointer"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Mobile Filter Sheet Drawer Trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <button className="flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-foreground/85 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 cursor-pointer">
                  <SlidersHorizontal className="h-3.5 w-3.5" />
                  Filters {(selectedOccasions.length > 0 || selectedTypes.length > 0 || priceRange !== "all") && "•"}
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full max-w-xs bg-background p-6 overflow-y-auto">
                <SheetHeader className="pb-4 border-b border-border/60 mb-5">
                  <SheetTitle className="font-serif text-xl text-foreground text-left">Filters</SheetTitle>
                </SheetHeader>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Occasion</h4>
                    <div className="space-y-3">
                      {OCCASIONS.map((occ) => (
                        <div key={occ.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={`m-occ-${occ.id}`}
                            checked={selectedOccasions.includes(occ.id)}
                            onCheckedChange={(checked) => handleOccasionChange(occ.id, checked === true)}
                          />
                          <Label htmlFor={`m-occ-${occ.id}`} className="text-sm text-foreground/80 font-normal">{occ.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr className="border-border/40" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Type</h4>
                    <div className="space-y-3">
                      {TYPES.map((type) => (
                        <div key={type.id} className="flex items-center space-x-3">
                          <Checkbox
                            id={`m-type-${type.id}`}
                            checked={selectedTypes.includes(type.id)}
                            onCheckedChange={(checked) => handleTypeChange(type.id, checked === true)}
                          />
                          <Label htmlFor={`m-type-${type.id}`} className="text-sm text-foreground/80 font-normal">{type.label}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                  <hr className="border-border/40" />
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4">Price (UGX)</h4>
                    <RadioGroup value={priceRange} onValueChange={setPriceRange} className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="all" id="m-price-all" />
                        <Label htmlFor="m-price-all" className="text-sm text-foreground/80 font-normal">All Prices</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="under-80" id="m-price-under-80" />
                        <Label htmlFor="m-price-under-80" className="text-sm text-foreground/80 font-normal">Under 80k</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="80-150" id="m-price-80-150" />
                        <Label htmlFor="m-price-80-150" className="text-sm text-foreground/80 font-normal">80k – 150k</Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="over-150" id="m-price-over-150" />
                        <Label htmlFor="m-price-over-150" className="text-sm text-foreground/80 font-normal">150k +</Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <button
                    onClick={clearAllFilters}
                    className="w-full text-center py-2.5 rounded-full bg-primary text-xs uppercase tracking-widest text-white font-semibold hover:bg-primary/95 transition-colors cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Results Count & Sort Dropdown */}
          <div className="flex items-center justify-between gap-4 flex-1 lg:flex-initial">
            <p className="text-xs text-muted-foreground">
              Showing <span className="font-medium text-foreground">{filteredProducts.length}</span> arrangements
            </p>

            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-muted-foreground">Sort by:</span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-foreground/85 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 focus:outline-none cursor-pointer">
                    <ArrowUpDown className="h-3.5 w-3.5 mr-1" />
                    {activeSortLabel}
                    <ChevronDown className="h-3 w-3 opacity-60" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-background border border-border/60 shadow-lg rounded-2xl z-40">
                  <DropdownMenuItem onClick={() => setSortBy("popular")} className="text-xs font-normal cursor-pointer">
                    Popularity
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-asc")} className="text-xs font-normal cursor-pointer">
                    Price: Low to High
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSortBy("price-desc")} className="text-xs font-normal cursor-pointer">
                    Price: High to Low
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Product Grid Area */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-border/80 rounded-2xl bg-card">
            <SlidersHorizontal className="mx-auto h-12 w-12 text-muted/30 stroke-[1]" />
            <h3 className="mt-4 font-serif text-xl text-foreground">No arrangements found</h3>
            <p className="mt-2 text-sm text-muted-foreground max-w-sm mx-auto">
              We couldn't find any bouquets matching your current filters. Try relaxing your parameters or clearing filters.
            </p>
            <button
              onClick={clearAllFilters}
              className="mt-6 rounded-full bg-primary px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-white hover:bg-primary/95 cursor-pointer"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((p) => (
              <div
                key={p.id}
                className="group relative flex flex-col bg-card product-card-premium transition-all duration-300 shadow-sm"
              >
                {/* Image Frame */}
                <Link to={`/product-detail`} search={{ id: p.id }} className="block overflow-hidden relative aspect-[4/5] bg-muted cursor-pointer">
                  <img
                    src={p.image}
                    alt={p.name}
                    loading="lazy"
                    className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Category Pill Floating in Top-Left */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-white/80 text-primary backdrop-blur-md text-[9px] uppercase tracking-[1.5px] font-semibold px-3 py-1 rounded-full shadow-xs">
                      {p.category}
                    </span>
                  </div>
                </Link>

                {/* Details Content */}
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <Link to={`/product-detail`} search={{ id: p.id }} className="block hover:opacity-85 cursor-pointer">
                      <h3 className="font-serif text-lg text-foreground truncate group-hover:text-primary transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                      {p.description}
                    </p>
                  </div>

                  {/* Pricing and Sleek Circular Actions */}
                  <div className="mt-5 pt-4 border-t border-border/40 flex items-center justify-between">
                    <span className="font-semibold text-primary text-base">
                      {formatUGX(p.price)}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/product-detail`}
                        search={{ id: p.id }}
                        className="p-2 text-muted-foreground hover:text-primary rounded-full border border-border/80 bg-background hover:bg-accent/20 transition-colors cursor-pointer"
                        title="View Details"
                      >
                        <SlidersHorizontal className="h-4 w-4" />
                      </Link>
                      <button
                        onClick={(e) => handleQuickAdd(p, e)}
                        className="p-2 rounded-full bg-primary text-white hover:bg-primary/95 transition-colors shadow-xs hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center"
                        title="Add to Cart"
                      >
                        <Plus className="h-4 w-4 stroke-[2.5]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
