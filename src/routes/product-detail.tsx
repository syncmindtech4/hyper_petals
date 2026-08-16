// import { createFileRoute, Link } from "@tanstack/react-router";
// import { useState, useMemo, useEffect } from "react";
// import { z } from "zod";
// import { Star, Truck, Calendar, RefreshCw, MessageSquare, ShoppingBag, ChevronLeft, ChevronRight, Check } from "lucide-react";
// import { defaultProducts, Product, formatUGX } from "@/lib/products";
// import { useProducts } from "@/hooks/useProducts";
// import { useCart, AddOn } from "@/hooks/use-cart";
// import { waLink } from "@/lib/site";
// import { toast } from "sonner";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";

// const productSearchSchema = z.object({
//   id: z.string().catch("wine-blush-dozen"),
// });

// export const Route = createFileRoute("/product-detail")({
//   validateSearch: (search) => productSearchSchema.parse(search),
//   component: ProductDetail,
//   head: ({ match }) => {
//     const product = defaultProducts.find((p) => p.id === match.search.id) || defaultProducts[0];
//     return {
//       meta: [
//         { title: `${product.name} — Hyper Petals Decor` },
//         { name: "description", content: product.description },
//       ],
//     };
//   },
// });

// const ADDONS_LIST: AddOn[] = [
//   { name: "Chocolate box", price: 35000 },
//   { name: "Teddy bear", price: 45000 },
//   { name: "Slice cake", price: 40000 },
// ];

// const LOCATIONS = [
//   { name: "Kampala Central", fee: 5000 },
//   { name: "Muyenga", fee: 10000 },
//   { name: "Kololo", fee: 8000 },
//   { name: "Nakasero", fee: 8000 },
//   { name: "Bugolobi", fee: 10000 },
//   { name: "Entebbe", fee: 30000 },
//   { name: "Naalya", fee: 15000 },
//   { name: "Lubowa", fee: 20000 },
// ];

// function ProductDetail() {
//   const { id } = Route.useSearch();
//   const { addToCart } = useCart();
//   const { data: products } = useProducts();

//   // Find product
//   const product = useMemo(() => {
//     return products.find((p) => p.id === id) || products[0];
//   }, [products, id]);

//   // Scroll to top on product change
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "smooth" });
//   }, [id]);

//   // Image Gallery State
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   // Custom gallery images (using other assets to simulate angles)
//   const galleryImages = useMemo(() => {
//     // Generate 3 pseudo-angles based on product image and other assets
//     const images = [product.image];
//     // Add two related assets to display a beautiful thumbnail grid
//     if (product.id.includes("roses") || product.id.includes("dozen")) {
//       images.push(products[0]?.image ?? product.image, products[1]?.image ?? product.image);
//     } else {
//       images.push(products[2]?.image ?? product.image, products[4]?.image ?? product.image);
//     }
//     return images;
//   }, [product, products]);

//   // Reset active image index when product changes
//   useEffect(() => {
//     setActiveImageIndex(0);
//   }, [product]);

//   // Form State
//   const [selectedSize, setSelectedSize] = useState<string>("12 Stems");
//   const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
//   const [isGift, setIsGift] = useState(false);
//   const [recipientName, setRecipientName] = useState("");
//   const [recipientPhone, setRecipientPhone] = useState("");
//   const [deliveryLocation, setDeliveryLocation] = useState("Kampala Central");
//   const [deliveryDate, setDeliveryDate] = useState("");
//   const [giftMessage, setGiftMessage] = useState("");
//   const [quantity, setQuantity] = useState(1);

//   // Set default delivery date to tomorrow
//   useEffect(() => {
//     const tomorrow = new Date();
//     tomorrow.setDate(tomorrow.getDate() + 1);
//     const yyyy = tomorrow.getFullYear();
//     const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
//     const dd = String(tomorrow.getDate()).padStart(2, "0");
//     setDeliveryDate(`${yyyy}-${mm}-${dd}`);
//   }, []);

//   // Pricing calculations
//   const sizePrice = useMemo(() => {
//     const base = product.price;
//     if (selectedSize === "6 Stems") {
//       // E.g. for wine-blush (110k) -> 65k
//       if (product.id === "wine-blush-dozen") return 65000;
//       return Math.round((base * 0.6) / 5000) * 5000;
//     }
//     if (selectedSize === "24 Stems") {
//       // E.g. for wine-blush (110k) -> 190k
//       if (product.id === "wine-blush-dozen") return 190000;
//       return Math.round((base * 1.73) / 5000) * 5000;
//     }
//     // "12 Stems"
//     return base;
//   }, [product, selectedSize]);

//   const addOnsTotal = useMemo(() => {
//     return selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
//   }, [selectedAddOns]);

//   const totalPrice = useMemo(() => {
//     return (sizePrice + addOnsTotal) * quantity;
//   }, [sizePrice, addOnsTotal, quantity]);

//   // Recommendations
//   const recommended = useMemo(() => {
//     return products.filter((p) => p.id !== product.id).slice(0, 3);
//   }, [products, product]);

//   const handleAddOnToggle = (addOn: AddOn, checked: boolean) => {
//     if (checked) {
//       setSelectedAddOns((prev) => [...prev, addOn]);
//     } else {
//       setSelectedAddOns((prev) => prev.filter((a) => a.name !== addOn.name));
//     }
//   };

//   const handleAddToCart = () => {
//     if (isGift && (!recipientName.trim() || !recipientPhone.trim())) {
//       toast.error("Please fill in the recipient's details");
//       return;
//     }
//     if (!deliveryDate) {
//       toast.error("Please select a delivery date");
//       return;
//     }

//     addToCart({
//       product,
//       quantity,
//       selectedSize,
//       sizePrice,
//       selectedAddOns,
//       isGift,
//       giftDetails: isGift ? { recipientName, recipientPhone } : undefined,
//       deliveryLocation,
//       deliveryDate,
//       giftMessage: giftMessage.trim() || undefined,
//     });

//     toast.success(`${product.name} added to cart!`, {
//       description: `Size: ${selectedSize}. Open cart to check out.`,
//     });
//   };

//   const handleWhatsAppOrder = () => {
//     if (isGift && (!recipientName.trim() || !recipientPhone.trim())) {
//       toast.error("Please fill in the recipient's details");
//       return;
//     }
//     if (!deliveryDate) {
//       toast.error("Please select a delivery date");
//       return;
//     }

//     const addOnsText = selectedAddOns.length > 0
//       ? `\n- *Add-ons*: ${selectedAddOns.map(a => `${a.name} (+${formatUGX(a.price)})`).join(', ')}`
//       : "";

//     const giftText = isGift
//       ? `\n- *Recipient Name*: ${recipientName}\n- *Recipient Phone*: ${recipientPhone}`
//       : "";

//     const msgText = giftMessage.trim()
//       ? `\n- *Card Note*: "${giftMessage.trim()}"`
//       : "";

//     const message = `Hello Hyper Petals Decor! I'd like to place an order:
// - *Product*: ${product.name}
// - *Size*: ${selectedSize} (Price: ${formatUGX(sizePrice)})
// - *Quantity*: ${quantity}${addOnsText}${giftText}
// - *Delivery Location*: ${deliveryLocation}
// - *Delivery Date*: ${deliveryDate}${msgText}
// *Total*: ${formatUGX(totalPrice)}`;

//     window.open(waLink(message), "_blank");
//   };

//   return (
//     <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
//       {/* Breadcrumbs */}
//       <nav className="flex mb-8 text-xs text-muted-foreground uppercase tracking-widest gap-2">
//         <Link to="/" className="hover:text-primary transition-colors">Home</Link>
//         <span>/</span>
//         <Link to="/catalogue" className="hover:text-primary transition-colors">Bouquets</Link>
//         <span>/</span>
//         <span className="text-foreground/80 font-medium truncate">{product.category.split(' · ')[0]}</span>
//         <span>/</span>
//         <span className="text-primary font-semibold truncate">{product.name}</span>
//       </nav>

//       {/* Main Grid */}
//       <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
//         {/* Left Column: Image Gallery */}
//         <div className="lg:col-span-7 space-y-4">
//           <div className="relative aspect-[4/5] w-full overflow-hidden rounded-sm bg-card border border-border/40">
//             <img
//               src={galleryImages[activeImageIndex]}
//               alt={`${product.name} detail view`}
//               className="object-cover w-full h-full transition-all duration-300"
//             />
//           </div>

//           {/* Thumbnail row */}
//           <div className="flex gap-4">
//             {galleryImages.map((img, idx) => (
//               <button
//                 key={idx}
//                 type="button"
//                 onClick={() => setActiveImageIndex(idx)}
//                 className={`relative h-20 w-18 overflow-hidden rounded-sm border bg-card transition-all ${activeImageIndex === idx ? "border-primary ring-1 ring-primary" : "border-border/60 hover:border-primary/50"
//                   }`}
//               >
//                 <img
//                   src={img}
//                   alt={`Thumbnail ${idx + 1}`}
//                   className="object-cover w-full h-full"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Right Column: Order Form */}
//         <div className="lg:col-span-5 space-y-6">
//           <div>
//             <span className="text-[10px] uppercase tracking-widest font-semibold text-primary/95 border border-primary/20 rounded-full px-2.5 py-0.5 bg-primary/5">
//               {product.category}
//             </span>
//             <h1 className="mt-3 font-serif text-3xl md:text-4xl text-foreground">
//               {product.name}
//             </h1>

//             {/* Reviews / Star rating */}
//             <div className="mt-3 flex items-center gap-2">
//               <div className="flex items-center text-amber-500">
//                 {[...Array(5)].map((_, i) => (
//                   <Star key={i} className="h-4 w-4 fill-current" />
//                 ))}
//               </div>
//               <span className="text-sm font-semibold text-foreground">4.9</span>
//               <span className="text-xs text-muted-foreground">(24 reviews)</span>
//             </div>

//             <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
//               {product.description}
//             </p>
//           </div>

//           <hr className="border-border/60" />

//           {/* Form */}
//           <div className="space-y-5">
//             {/* Size Selector */}
//             <div>
//               <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3.5 block">
//                 Select Arrangement Size
//               </Label>
//               <div className="grid grid-cols-3 gap-3">
//                 {[
//                   { size: "6 Stems", label: "6 Stems", desc: "Classic" },
//                   { size: "12 Stems", label: "12 Stems", desc: "Signature" },
//                   { size: "24 Stems", label: "24 Stems", desc: "Luxe Premium" },
//                 ].map((opt) => {
//                   const price = opt.size === "6 Stems"
//                     ? (product.id === "wine-blush-dozen" ? 65000 : Math.round((product.price * 0.6) / 5000) * 5000)
//                     : opt.size === "24 Stems"
//                       ? (product.id === "wine-blush-dozen" ? 190000 : Math.round((product.price * 1.73) / 5000) * 5000)
//                       : product.price;

//                   return (
//                     <button
//                       key={opt.size}
//                       type="button"
//                       onClick={() => setSelectedSize(opt.size)}
//                       className={`flex flex-col items-center justify-center p-3 rounded-sm border transition-all text-center ${selectedSize === opt.size
//                           ? "border-primary bg-primary/5 ring-1 ring-primary"
//                           : "border-border/60 hover:border-primary/40 bg-card"
//                         }`}
//                     >
//                       <span className="text-xs font-semibold text-foreground">{opt.label}</span>
//                       <span className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</span>
//                       <span className="text-[11px] font-medium text-primary mt-1.5">{formatUGX(price)}</span>
//                     </button>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Add-ons */}
//             <div>
//               <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3.5 block">
//                 Add Premium Gift Accents (Optional)
//               </Label>
//               <div className="space-y-2.5">
//                 {ADDONS_LIST.map((addOn) => (
//                   <div key={addOn.name} className="flex items-center justify-between border border-border/40 p-3 rounded-sm bg-card hover:bg-accent/10 transition-colors">
//                     <div className="flex items-center space-x-3">
//                       <Checkbox
//                         id={`addon-${addOn.name}`}
//                         checked={selectedAddOns.some((a) => a.name === addOn.name)}
//                         onCheckedChange={(checked) =>
//                           handleAddOnToggle(addOn, checked === true)
//                         }
//                       />
//                       <Label
//                         htmlFor={`addon-${addOn.name}`}
//                         className="text-xs md:text-sm text-foreground/90 font-normal cursor-pointer select-none"
//                       >
//                         {addOn.name}
//                       </Label>
//                     </div>
//                     <span className="text-xs font-semibold text-primary">+{formatUGX(addOn.price)}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Gift Options */}
//             <div className="border border-border/40 p-4 rounded-sm bg-card space-y-4">
//               <div className="flex items-center space-x-3">
//                 <Checkbox
//                   id="is-gift"
//                   checked={isGift}
//                   onCheckedChange={(checked) => setIsGift(checked === true)}
//                 />
//                 <Label
//                   htmlFor="is-gift"
//                   className="text-xs md:text-sm font-medium text-foreground cursor-pointer select-none"
//                 >
//                   This is a gift for someone else
//                 </Label>
//               </div>

//               {isGift && (
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
//                   <div className="space-y-1.5">
//                     <Label htmlFor="recipient-name" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
//                       Recipient Name
//                     </Label>
//                     <Input
//                       id="recipient-name"
//                       placeholder="e.g. Sarah Namayanja"
//                       value={recipientName}
//                       onChange={(e) => setRecipientName(e.target.value)}
//                       className="text-xs bg-background"
//                     />
//                   </div>
//                   <div className="space-y-1.5">
//                     <Label htmlFor="recipient-phone" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
//                       Recipient Phone
//                     </Label>
//                     <Input
//                       id="recipient-phone"
//                       placeholder="e.g. 0772 123 456"
//                       value={recipientPhone}
//                       onChange={(e) => setRecipientPhone(e.target.value)}
//                       className="text-xs bg-background"
//                     />
//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Delivery Details */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <div className="space-y-1.5">
//                 <Label htmlFor="delivery-location" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
//                   Delivery Area (Kampala)
//                 </Label>
//                 <Select value={deliveryLocation} onValueChange={setDeliveryLocation}>
//                   <SelectTrigger id="delivery-location" className="text-xs bg-card border-border/60">
//                     <SelectValue placeholder="Select Area" />
//                   </SelectTrigger>
//                   <SelectContent className="bg-background border-border/60">
//                     {LOCATIONS.map((loc) => (
//                       <SelectItem key={loc.name} value={loc.name} className="text-xs">
//                         {loc.name} (+{formatUGX(loc.fee)})
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="space-y-1.5">
//                 <Label htmlFor="delivery-date" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
//                   Delivery Date
//                 </Label>
//                 <div className="relative">
//                   <Input
//                     id="delivery-date"
//                     type="date"
//                     value={deliveryDate}
//                     onChange={(e) => setDeliveryDate(e.target.value)}
//                     className="text-xs bg-card border-border/60 block w-full pl-3 pr-10 py-2.5"
//                   />
//                 </div>
//               </div>
//             </div>

//             {/* Gift Message */}
//             <div className="space-y-1.5">
//               <Label htmlFor="gift-message" className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold">
//                 Gift Card Message (Optional)
//               </Label>
//               <Textarea
//                 id="gift-message"
//                 placeholder="Write a sweet message to be handwritten on our luxury gift card..."
//                 value={giftMessage}
//                 onChange={(e) => setGiftMessage(e.target.value)}
//                 className="text-xs min-h-[80px] bg-card border-border/60 leading-relaxed resize-none"
//               />
//             </div>

//             {/* Quantity and CTA Actions */}
//             <div className="pt-2 space-y-3">
//               <div className="flex gap-4">
//                 {/* Quantity selector */}
//                 <div className="flex items-center border border-border/80 rounded-sm bg-card">
//                   <button
//                     type="button"
//                     onClick={() => setQuantity(q => Math.max(1, q - 1))}
//                     className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     -
//                   </button>
//                   <span className="px-3 text-sm font-semibold text-foreground">{quantity}</span>
//                   <button
//                     type="button"
//                     onClick={() => setQuantity(q => q + 1)}
//                     className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
//                   >
//                     +
//                   </button>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={handleAddToCart}
//                   className="flex-1 flex items-center justify-center gap-2 rounded-sm bg-primary py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-foreground hover:bg-primary/95 transition-colors shadow-xs"
//                 >
//                   <ShoppingBag className="h-4 w-4" />
//                   Add to Cart
//                 </button>
//               </div>

//               <button
//                 type="button"
//                 onClick={handleWhatsAppOrder}
//                 className="w-full flex items-center justify-center gap-2 rounded-sm border border-emerald-600/80 bg-emerald-500/5 hover:bg-emerald-500/10 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-emerald-700 transition-colors"
//               >
//                 <MessageSquare className="h-4 w-4" />
//                 Order via WhatsApp
//               </button>
//             </div>
//           </div>

//           <hr className="border-border/60" />

//           {/* Trust Badges */}
//           <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
//             <div className="flex flex-col items-center justify-center p-2 border border-border/40 rounded-sm bg-card/60">
//               <Truck className="h-4 w-4 text-primary mb-1.5" />
//               <span className="text-[10px] font-semibold text-foreground">Same-day delivery</span>
//               <span className="text-[9px] text-muted-foreground mt-0.5">Order by 2pm</span>
//             </div>
//             <div className="flex flex-col items-center justify-center p-2 border border-border/40 rounded-sm bg-card/60">
//               <div className="flex gap-1 items-center mb-1.5">
//                 <span className="text-[9px] font-bold text-[#FFCC00] bg-black px-1 py-0.5 rounded-sm">MoMo</span>
//                 <span className="text-[9px] font-bold text-red-600 bg-white border border-red-500 px-1 py-0.5 rounded-sm">Airtel</span>
//               </div>
//               <span className="text-[10px] font-semibold text-foreground">Mobile Money</span>
//               <span className="text-[9px] text-muted-foreground mt-0.5">Secure payment</span>
//             </div>
//             <div className="flex flex-col items-center justify-center p-2 border border-border/40 rounded-sm bg-card/60">
//               <RefreshCw className="h-4 w-4 text-primary mb-1.5" />
//               <span className="text-[10px] font-semibold text-foreground">Free rescheduling</span>
//               <span className="text-[9px] text-muted-foreground mt-0.5">Up to 24h prior</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Recommended Carousel */}
//       <section className="mt-20 border-t border-border/60 pt-16">
//         <h2 className="font-serif text-3xl text-foreground text-center mb-10">
//           You May Also Like
//         </h2>
//         <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
//           {recommended.map((p) => (
//             <div
//               key={p.id}
//               className="group relative flex flex-col bg-card border border-border/40 rounded-sm overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card)]"
//             >
//               <Link
//                 to={`/product-detail`}
//                 search={{ id: p.id }}
//                 className="block overflow-hidden relative aspect-[4/5] bg-muted"
//               >
//                 <img
//                   src={p.image}
//                   alt={p.name}
//                   loading="lazy"
//                   className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
//                 />
//               </Link>
//               <div className="p-5 flex-1 flex flex-col justify-between">
//                 <div>
//                   <Link to={`/product-detail`} search={{ id: p.id }} className="block hover:opacity-85">
//                     <h3 className="font-serif text-base text-foreground truncate group-hover:text-primary transition-colors">
//                       {p.name}
//                     </h3>
//                   </Link>
//                   <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
//                     {p.description}
//                   </p>
//                 </div>
//                 <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
//                   <span className="font-semibold text-primary text-sm">
//                     {formatUGX(p.price)}
//                   </span>
//                   <Link
//                     to={`/product-detail`}
//                     search={{ id: p.id }}
//                     className="text-[10px] uppercase tracking-wider font-semibold text-primary hover:opacity-75"
//                   >
//                     Customize & Order →
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>
//     </div>
//   );
// }

import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { z } from "zod";
<<<<<<< HEAD
import {
  Star,
  Truck,
  Calendar,
  RefreshCw,
  MessageSquare,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
  Check,
} from "lucide-react";
=======
import { Star, Truck, Calendar, RefreshCw, MessageSquare, ShoppingBag } from "lucide-react";
>>>>>>> f6858ec5fd00cdef039523b985ba989a45a5a45e
import { Product, formatUGX } from "@/lib/products";
import { useProducts } from "@/hooks/useProducts";
import { useCart, AddOn } from "@/hooks/use-cart";
import { waLink } from "@/lib/site";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BouquetCustomizer } from "@/components/bouquet-customizer";
import {
  EMPTY_CUSTOMIZATION,
  customizationSummary,
  isCustomizableBouquet,
  isCustomizationComplete,
  missingCustomizationFields,
} from "@/lib/bouquet-customization";

const productSearchSchema = z.object({
  id: z.string().catch("wine-blush-dozen"),
});

export const Route = createFileRoute("/product-detail")({
  validateSearch: (search) => productSearchSchema.parse(search),
  component: ProductDetail,
  head: () => {
    // Product data comes from the DB and isn't available synchronously here,
    // so head() uses a generic fallback; the page itself sets document title
    // dynamically once the product loads (see the useEffect below).
    return {
      meta: [
        { title: "Shop Bouquets — Hyper Petals Decor" },
        {
          name: "description",
          content:
            "Handcrafted bouquets and floral arrangements, delivered same-day across Kampala.",
        },
      ],
    };
  },
});

const ADDONS_LIST: AddOn[] = [
  { name: "Chocolate box", price: 35000 },
  { name: "Teddy bear", price: 45000 },
  { name: "Slice cake", price: 40000 },
];

const LOCATIONS = [
  { name: "Kampala Central", fee: 5000 },
  { name: "Muyenga", fee: 10000 },
  { name: "Kololo", fee: 8000 },
  { name: "Nakasero", fee: 8000 },
  { name: "Bugolobi", fee: 10000 },
  { name: "Entebbe", fee: 30000 },
  { name: "Naalya", fee: 15000 },
  { name: "Lubowa", fee: 20000 },
];

const OTHER_LOCATION = "Other";

function ProductDetail() {
  const { id } = Route.useSearch();
  const { addToCart } = useCart();
  const { data: products, isLoading } = useProducts();

  // Find product
  const product = useMemo(() => {
    return products.find((p) => p.id === id) || products[0];
  }, [products, id]);

  // Scroll to top on product change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  // Set document title once the real product loads (head() can't do this
  // synchronously since product data comes from the DB).
<<<<<<< HEAD
  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Hyper Petals Decor`;
    }
  }, [product]);

  // Image Gallery State
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Custom gallery images (using other assets to simulate angles)
  const galleryImages = useMemo(() => {
    if (!product) return [];
    // Generate 3 pseudo-angles based on product image and other assets
    const images = [product.image];
    // Add two related assets to display a beautiful thumbnail grid
    if (product.id.includes("roses") || product.id.includes("dozen")) {
      images.push(products[0]?.image ?? product.image, products[1]?.image ?? product.image);
    } else {
      images.push(products[2]?.image ?? product.image, products[4]?.image ?? product.image);
    }
    return images;
  }, [product, products]);

  // Reset active image index when product changes
=======
>>>>>>> f6858ec5fd00cdef039523b985ba989a45a5a45e
  useEffect(() => {
    if (product) {
      document.title = `${product.name} — Hyper Petals Decor`;
    }
  }, [product]);

  // Form State
  const [selectedSize, setSelectedSize] = useState<string>("12 Stems");
  const [selectedAddOns, setSelectedAddOns] = useState<AddOn[]>([]);
  const [isGift, setIsGift] = useState(false);
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [deliveryLocation, setDeliveryLocation] = useState("Kampala Central");
  const [customLocation, setCustomLocation] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [giftMessage, setGiftMessage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [customization, setCustomization] = useState(EMPTY_CUSTOMIZATION);

  // Reset customization selections when switching products
  useEffect(() => {
    setCustomization(EMPTY_CUSTOMIZATION);
  }, [id]);

  // Set default delivery date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yyyy = tomorrow.getFullYear();
    const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    const dd = String(tomorrow.getDate()).padStart(2, "0");
    setDeliveryDate(`${yyyy}-${mm}-${dd}`);
  }, []);

  // Pricing calculations
  const sizePrice = useMemo(() => {
    if (!product) return 0;
    const base = product.price;
    if (selectedSize === "6 Stems") {
      // E.g. for wine-blush (110k) -> 65k
      if (product.id === "wine-blush-dozen") return 65000;
      return Math.round((base * 0.6) / 5000) * 5000;
    }
    if (selectedSize === "24 Stems") {
      // E.g. for wine-blush (110k) -> 190k
      if (product.id === "wine-blush-dozen") return 190000;
      return Math.round((base * 1.73) / 5000) * 5000;
    }
    // "12 Stems"
    return base;
  }, [product, selectedSize]);

  const addOnsTotal = useMemo(() => {
    return selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
  }, [selectedAddOns]);

  const totalPrice = useMemo(() => {
    return (sizePrice + addOnsTotal) * quantity;
  }, [sizePrice, addOnsTotal, quantity]);

  // Recommendations
  const recommended = useMemo(() => {
    if (!product) return [];
    return products.filter((p) => p.id !== product.id).slice(0, 3);
  }, [products, product]);

  const requiresCustomization = isCustomizableBouquet(product);
  const customizationValid = !requiresCustomization || isCustomizationComplete(customization);
  const customizationMissing = requiresCustomization
    ? missingCustomizationFields(customization)
    : [];

  const effectiveDeliveryLocation =
    deliveryLocation === OTHER_LOCATION ? customLocation.trim() : deliveryLocation;

  const handleAddOnToggle = (addOn: AddOn, checked: boolean) => {
    if (checked) {
      setSelectedAddOns((prev) => [...prev, addOn]);
    } else {
      setSelectedAddOns((prev) => prev.filter((a) => a.name !== addOn.name));
    }
  };

  const handleAddToCart = () => {
    if (requiresCustomization && !customizationValid) {
      toast.error("Please finish customizing your bouquet", {
        description: `Still needed: ${customizationMissing.join(", ")}`,
      });
      return;
    }
    if (isGift && (!recipientName.trim() || !recipientPhone.trim())) {
      toast.error("Please fill in the recipient's details");
      return;
    }
    if (deliveryLocation === OTHER_LOCATION && !customLocation.trim()) {
      toast.error("Please type in your delivery location");
      return;
    }
    if (!deliveryDate) {
      toast.error("Please select a delivery date");
      return;
    }

    addToCart({
      product,
      quantity,
      selectedSize,
      sizePrice,
      selectedAddOns,
      isGift,
      giftDetails: isGift ? { recipientName, recipientPhone } : undefined,
      deliveryLocation: effectiveDeliveryLocation,
      deliveryDate,
      giftMessage: giftMessage.trim() || undefined,
      customizations: requiresCustomization ? customization : undefined,
    });

    toast.success(`${product.name} added to cart!`, {
      description: `Size: ${selectedSize}. Open cart to check out.`,
    });
  };

  const handleWhatsAppOrder = () => {
    if (requiresCustomization && !customizationValid) {
      toast.error("Please finish customizing your bouquet", {
        description: `Still needed: ${customizationMissing.join(", ")}`,
      });
      return;
    }
    if (isGift && (!recipientName.trim() || !recipientPhone.trim())) {
      toast.error("Please fill in the recipient's details");
      return;
    }
    if (deliveryLocation === OTHER_LOCATION && !customLocation.trim()) {
      toast.error("Please type in your delivery location");
      return;
    }
    if (!deliveryDate) {
      toast.error("Please select a delivery date");
      return;
    }

    const addOnsText =
      selectedAddOns.length > 0
        ? `\n- *Add-ons*: ${selectedAddOns.map((a) => `${a.name} (+${formatUGX(a.price)})`).join(", ")}`
        : "";

    const giftText = isGift
      ? `\n- *Recipient Name*: ${recipientName}\n- *Recipient Phone*: ${recipientPhone}`
      : "";

    const msgText = giftMessage.trim() ? `\n- *Card Note*: "${giftMessage.trim()}"` : "";
<<<<<<< HEAD
=======

    const customizationText = requiresCustomization
      ? `\n- *Customization*: ${customizationSummary(customization)}`
      : "";
>>>>>>> f6858ec5fd00cdef039523b985ba989a45a5a45e

    const message = `Hello Hyper Petals Decor! I'd like to place an order:
- *Product*: ${product.name}
- *Size*: ${selectedSize} (Price: ${formatUGX(sizePrice)})
- *Quantity*: ${quantity}${customizationText}${addOnsText}${giftText}
- *Delivery Location*: ${effectiveDeliveryLocation}
- *Delivery Date*: ${deliveryDate}${msgText}
*Total*: ${formatUGX(totalPrice)}`;

    window.open(waLink(message), "_blank");
  };

  if (!product) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-24 text-center">
        {isLoading ? (
          <p className="text-sm text-muted-foreground">Loading product...</p>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">We couldn't find that product.</p>
            <Link to="/catalogue" className="mt-4 inline-block text-sm text-primary underline">
              Browse the catalogue
            </Link>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 md:py-16">
      {/* Breadcrumbs */}
      <nav className="flex mb-8 text-xs text-muted-foreground uppercase tracking-widest gap-2">
        <Link to="/" className="hover:text-primary transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link to="/catalogue" className="hover:text-primary transition-colors">
          Bouquets
        </Link>
        <span>/</span>
        <span className="text-foreground/80 font-medium truncate">
          {product.category.split(" · ")[0]}
        </span>
        <span>/</span>
        <span className="text-primary font-semibold truncate">{product.name}</span>
      </nav>

      {/* Main Grid */}
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: Image + Delivery / Checkout Actions */}
        <div className="lg:col-span-7 space-y-6">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-card border border-border/40">
            <img
              src={product.image}
              alt={`${product.name} detail view`}
              className="object-cover w-full h-full transition-all duration-300"
            />
          </div>

<<<<<<< HEAD
          {/* Thumbnail row */}
          <div className="flex gap-4">
            {galleryImages.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative h-20 w-18 overflow-hidden rounded-sm border bg-card transition-all ${
                  activeImageIndex === idx
                    ? "border-primary ring-1 ring-primary"
                    : "border-border/60 hover:border-primary/50"
                }`}
=======
          {/* Delivery Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label
                htmlFor="delivery-location"
                className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
>>>>>>> f6858ec5fd00cdef039523b985ba989a45a5a45e
              >
                Delivery Area (Kampala)
              </Label>
              <Select value={deliveryLocation} onValueChange={setDeliveryLocation}>
                <SelectTrigger id="delivery-location" className="text-xs bg-card border-border/60">
                  <SelectValue placeholder="Select Area" />
                </SelectTrigger>
                <SelectContent className="bg-background border-border/60">
                  {LOCATIONS.map((loc) => (
                    <SelectItem key={loc.name} value={loc.name} className="text-xs">
                      {loc.name} (+{formatUGX(loc.fee)})
                    </SelectItem>
                  ))}
                  <SelectItem value={OTHER_LOCATION} className="text-xs">
                    Other (type in your location)
                  </SelectItem>
                </SelectContent>
              </Select>
              {deliveryLocation === OTHER_LOCATION && (
                <Input
                  placeholder="Enter your delivery location"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  className="text-xs bg-card border-border/60 mt-2"
                />
              )}
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="delivery-date"
                className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
              >
                Delivery Date
              </Label>
              <div className="relative">
                <Input
                  id="delivery-date"
                  type="date"
                  value={deliveryDate}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="text-xs bg-card border-border/60 block w-full pl-3 pr-10 py-2.5"
                />
              </div>
            </div>
          </div>

          {/* Gift Message */}
          <div className="space-y-1.5">
            <Label
              htmlFor="gift-message"
              className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
            >
              Gift Card Message (Optional)
            </Label>
            <Textarea
              id="gift-message"
              placeholder="Write a sweet message to be handwritten on our luxury gift card..."
              value={giftMessage}
              onChange={(e) => setGiftMessage(e.target.value)}
              className="text-xs min-h-[80px] bg-card border-border/60 leading-relaxed resize-none"
            />
          </div>

          {/* Quantity and CTA Actions */}
          <div className="pt-2 space-y-3">
            {requiresCustomization && (
              <div className="text-xs">
                {customizationValid ? (
                  <p className="text-foreground">
                    <span className="font-semibold">Selected:</span>{" "}
                    {customizationSummary(customization)}
                  </p>
                ) : (
                  <p className="text-amber-700">Please select: {customizationMissing.join(", ")}</p>
                )}
              </div>
            )}

            <div className="flex gap-4">
              {/* Quantity selector */}
              <div className="flex items-center border border-border/80 rounded-sm bg-card">
                <button
                  type="button"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  -
                </button>
                <span className="px-3 text-sm font-semibold text-foreground">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity((q) => q + 1)}
                  className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                disabled={requiresCustomization && !customizationValid}
                className="flex-1 flex items-center justify-center gap-2 rounded-sm bg-primary py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-foreground hover:bg-primary/95 transition-colors shadow-xs disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-primary"
              >
                <ShoppingBag className="h-4 w-4" />
                Add to Cart
              </button>
            </div>

            <button
              type="button"
              onClick={handleWhatsAppOrder}
              className="w-full flex items-center justify-center gap-2 rounded-sm border border-emerald-600/80 bg-emerald-500/5 hover:bg-emerald-500/10 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-emerald-700 transition-colors"
            >
              <MessageSquare className="h-4 w-4" />
              Order via WhatsApp
            </button>
          </div>

          <hr className="border-border/60" />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
            <div className="flex flex-col items-center justify-center p-2 border border-border/40 rounded-lg bg-card/60">
              <Truck className="h-4 w-4 text-primary mb-1.5" />
              <span className="text-[10px] font-semibold text-foreground">Same-day delivery</span>
              <span className="text-[9px] text-muted-foreground mt-0.5">Order by 2pm</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-border/40 rounded-lg bg-card/60">
              <div className="flex gap-1 items-center mb-1.5">
                <span className="text-[9px] font-bold text-[#FFCC00] bg-black px-1 py-0.5 rounded-sm">
                  MoMo
                </span>
                <span className="text-[9px] font-bold text-red-600 bg-white border border-red-500 px-1 py-0.5 rounded-sm">
                  Airtel
                </span>
              </div>
              <span className="text-[10px] font-semibold text-foreground">Mobile Money</span>
              <span className="text-[9px] text-muted-foreground mt-0.5">Secure payment</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-border/40 rounded-lg bg-card/60">
              <RefreshCw className="h-4 w-4 text-primary mb-1.5" />
              <span className="text-[10px] font-semibold text-foreground">Free rescheduling</span>
              <span className="text-[9px] text-muted-foreground mt-0.5">Up to 24h prior</span>
            </div>
          </div>
        </div>

        {/* Right Column: Order Form */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <span className="text-[10px] uppercase tracking-widest font-semibold text-primary/95 border border-primary/20 rounded-full px-2.5 py-0.5 bg-primary/5">
              {product.category}
            </span>
            <h1 className="mt-3 font-serif text-3xl md:text-4xl text-foreground">{product.name}</h1>

            {/* Reviews / Star rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold text-foreground">4.9</span>
              <span className="text-xs text-muted-foreground">(24 reviews)</span>
            </div>

            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <hr className="border-border/60" />

          {/* Form */}
          <div className="space-y-5">
            {/* Size Selector */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3.5 block">
                Select Arrangement Size
              </Label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { size: "6 Stems", label: "6 Stems", desc: "Classic" },
                  { size: "12 Stems", label: "12 Stems", desc: "Signature" },
                  { size: "24 Stems", label: "24 Stems", desc: "Luxe Premium" },
                ].map((opt) => {
                  const price =
                    opt.size === "6 Stems"
                      ? product.id === "wine-blush-dozen"
                        ? 65000
                        : Math.round((product.price * 0.6) / 5000) * 5000
                      : opt.size === "24 Stems"
                        ? product.id === "wine-blush-dozen"
                          ? 190000
                          : Math.round((product.price * 1.73) / 5000) * 5000
                        : product.price;

                  return (
                    <button
                      key={opt.size}
                      type="button"
                      onClick={() => setSelectedSize(opt.size)}
<<<<<<< HEAD
                      className={`flex flex-col items-center justify-center p-3 rounded-sm border transition-all text-center ${
=======
                      className={`flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-center ${
>>>>>>> f6858ec5fd00cdef039523b985ba989a45a5a45e
                        selectedSize === opt.size
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border/60 hover:border-primary/40 bg-card"
                      }`}
                    >
                      <span className="text-xs font-semibold text-foreground">{opt.label}</span>
                      <span className="text-[10px] text-muted-foreground mt-0.5">{opt.desc}</span>
                      <span className="text-[11px] font-medium text-primary mt-1.5">
                        {formatUGX(price)}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Bouquet Customization Filters */}
            {requiresCustomization && (
              <div className="space-y-4">
                <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold block">
                  Customize Your Bouquet
                </Label>
                <BouquetCustomizer value={customization} onChange={setCustomization} />
              </div>
            )}

            {/* Add-ons */}
            <div>
              <Label className="text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-3.5 block">
                Add Premium Gift Accents (Optional)
              </Label>
              <div className="space-y-2.5">
                {ADDONS_LIST.map((addOn) => (
                  <div
                    key={addOn.name}
<<<<<<< HEAD
                    className="flex items-center justify-between border border-border/40 p-3 rounded-sm bg-card hover:bg-accent/10 transition-colors"
=======
                    className="flex items-center justify-between border border-border/40 p-3 rounded-lg bg-card hover:bg-accent/10 transition-colors"
>>>>>>> f6858ec5fd00cdef039523b985ba989a45a5a45e
                  >
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`addon-${addOn.name}`}
                        checked={selectedAddOns.some((a) => a.name === addOn.name)}
                        onCheckedChange={(checked) => handleAddOnToggle(addOn, checked === true)}
<<<<<<< HEAD
=======
                        className="rounded-lg"
>>>>>>> f6858ec5fd00cdef039523b985ba989a45a5a45e
                      />
                      <Label
                        htmlFor={`addon-${addOn.name}`}
                        className="text-xs md:text-sm text-foreground/90 font-normal cursor-pointer select-none"
                      >
                        {addOn.name}
                      </Label>
                    </div>
                    <span className="text-xs font-semibold text-primary">
                      +{formatUGX(addOn.price)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gift Options */}
            <div className="border border-border/40 p-4 rounded-lg bg-card space-y-4">
              <div className="flex items-center space-x-3">
                <Checkbox
                  id="is-gift"
                  checked={isGift}
                  onCheckedChange={(checked) => setIsGift(checked === true)}
                  className="rounded-lg"
                />
                <Label
                  htmlFor="is-gift"
                  className="text-xs md:text-sm font-medium text-foreground cursor-pointer select-none"
                >
                  This is a gift for someone else
                </Label>
              </div>

              {isGift && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="recipient-name"
                      className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                    >
                      Recipient Name
                    </Label>
                    <Input
                      id="recipient-name"
                      placeholder="e.g. Sarah Namayanja"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="text-xs bg-background"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="recipient-phone"
                      className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                    >
                      Recipient Phone
                    </Label>
                    <Input
                      id="recipient-phone"
                      placeholder="e.g. 0772 123 456"
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      className="text-xs bg-background"
                    />
                  </div>
                </div>
              )}
            </div>
<<<<<<< HEAD

            {/* Delivery Details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label
                  htmlFor="delivery-location"
                  className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                >
                  Delivery Area (Kampala)
                </Label>
                <Select value={deliveryLocation} onValueChange={setDeliveryLocation}>
                  <SelectTrigger
                    id="delivery-location"
                    className="text-xs bg-card border-border/60"
                  >
                    <SelectValue placeholder="Select Area" />
                  </SelectTrigger>
                  <SelectContent className="bg-background border-border/60">
                    {LOCATIONS.map((loc) => (
                      <SelectItem key={loc.name} value={loc.name} className="text-xs">
                        {loc.name} (+{formatUGX(loc.fee)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label
                  htmlFor="delivery-date"
                  className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
                >
                  Delivery Date
                </Label>
                <div className="relative">
                  <Input
                    id="delivery-date"
                    type="date"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    className="text-xs bg-card border-border/60 block w-full pl-3 pr-10 py-2.5"
                  />
                </div>
              </div>
            </div>

            {/* Gift Message */}
            <div className="space-y-1.5">
              <Label
                htmlFor="gift-message"
                className="text-[11px] uppercase tracking-wider text-muted-foreground font-semibold"
              >
                Gift Card Message (Optional)
              </Label>
              <Textarea
                id="gift-message"
                placeholder="Write a sweet message to be handwritten on our luxury gift card..."
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="text-xs min-h-[80px] bg-card border-border/60 leading-relaxed resize-none"
              />
            </div>

            {/* Quantity and CTA Actions */}
            <div className="pt-2 space-y-3">
              <div className="flex gap-4">
                {/* Quantity selector */}
                <div className="flex items-center border border-border/80 rounded-sm bg-card">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 text-sm font-semibold text-foreground">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    className="px-3 py-2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  className="flex-1 flex items-center justify-center gap-2 rounded-sm bg-primary py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-primary-foreground hover:bg-primary/95 transition-colors shadow-xs"
                >
                  <ShoppingBag className="h-4 w-4" />
                  Add to Cart
                </button>
              </div>

              <button
                type="button"
                onClick={handleWhatsAppOrder}
                className="w-full flex items-center justify-center gap-2 rounded-sm border border-emerald-600/80 bg-emerald-500/5 hover:bg-emerald-500/10 py-3 text-[11px] uppercase tracking-[0.22em] font-semibold text-emerald-700 transition-colors"
              >
                <MessageSquare className="h-4 w-4" />
                Order via WhatsApp
              </button>
            </div>
          </div>

          <hr className="border-border/60" />

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-2.5 pt-1 text-center">
            <div className="flex flex-col items-center justify-center p-2 border border-border/40 rounded-sm bg-card/60">
              <Truck className="h-4 w-4 text-primary mb-1.5" />
              <span className="text-[10px] font-semibold text-foreground">Same-day delivery</span>
              <span className="text-[9px] text-muted-foreground mt-0.5">Order by 2pm</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-border/40 rounded-sm bg-card/60">
              <div className="flex gap-1 items-center mb-1.5">
                <span className="text-[9px] font-bold text-[#FFCC00] bg-black px-1 py-0.5 rounded-sm">
                  MoMo
                </span>
                <span className="text-[9px] font-bold text-red-600 bg-white border border-red-500 px-1 py-0.5 rounded-sm">
                  Airtel
                </span>
              </div>
              <span className="text-[10px] font-semibold text-foreground">Mobile Money</span>
              <span className="text-[9px] text-muted-foreground mt-0.5">Secure payment</span>
            </div>
            <div className="flex flex-col items-center justify-center p-2 border border-border/40 rounded-sm bg-card/60">
              <RefreshCw className="h-4 w-4 text-primary mb-1.5" />
              <span className="text-[10px] font-semibold text-foreground">Free rescheduling</span>
              <span className="text-[9px] text-muted-foreground mt-0.5">Up to 24h prior</span>
            </div>
=======
>>>>>>> f6858ec5fd00cdef039523b985ba989a45a5a45e
          </div>
        </div>
      </div>

      {/* Recommended Carousel */}
      <section className="mt-20 border-t border-border/60 pt-16">
        <h2 className="font-serif text-3xl text-foreground text-center mb-10">You May Also Like</h2>
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {recommended.map((p) => (
            <div
              key={p.id}
              className="group relative flex flex-col bg-card border border-border/40 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[var(--shadow-card)]"
            >
              <Link
                to={`/product-detail`}
                search={{ id: p.id }}
                className="block overflow-hidden relative aspect-[4/5] bg-muted"
              >
                <img
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                  className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </Link>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <Link
                    to={`/product-detail`}
                    search={{ id: p.id }}
                    className="block hover:opacity-85"
                  >
                    <h3 className="font-serif text-base text-foreground truncate group-hover:text-primary transition-colors">
                      {p.name}
                    </h3>
                  </Link>
                  <p className="mt-1 text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center justify-between">
                  <span className="font-semibold text-primary text-sm">{formatUGX(p.price)}</span>
                  <Link
                    to={`/product-detail`}
                    search={{ id: p.id }}
                    className="text-[10px] uppercase tracking-wider font-semibold text-primary hover:opacity-75"
                  >
                    Customize & Order →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
