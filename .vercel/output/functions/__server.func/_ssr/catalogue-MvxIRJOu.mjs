import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { B as ArrowUpDown, I as ChevronRight, L as ChevronLeft, M as Circle, O as Ellipsis, R as ChevronDown, f as Plus, s as SlidersHorizontal, z as Check } from "../_libs/lucide-react.mjs";
import { r as useProducts } from "./useProducts-BtNG2CQt.mjs";
import { t as formatUGX } from "./products-aqe0UNe5.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { n as cn, r as useCart } from "./utils-CIaufAXp.mjs";
import { i as Slot } from "../_libs/@radix-ui/react-arrow+[...].mjs";
import { a as SheetTitle, i as SheetHeader, n as Sheet, o as SheetTrigger, r as SheetContent, t as Route } from "./catalogue-Cn4EZD84.mjs";
import { t as Checkbox } from "./checkbox-CGJQldXN.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { n as RadioGroupItem, t as RadioGroup } from "./radio-group-Owytr2q2.mjs";
import { t as Label } from "./label-BA0vr4PA.mjs";
import { t as hero_bouquet_default } from "./hero-bouquet-CYnx_bTr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalogue-MvxIRJOu.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var Pagination = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
	role: "navigation",
	"aria-label": "pagination",
	className: cn("mx-auto flex w-full justify-center", className),
	...props
});
Pagination.displayName = "Pagination";
var PaginationContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
	ref,
	className: cn("flex flex-row items-center gap-1", className),
	...props
}));
PaginationContent.displayName = "PaginationContent";
var PaginationItem = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
	ref,
	className: cn("", className),
	...props
}));
PaginationItem.displayName = "PaginationItem";
var PaginationLink = ({ className, isActive, size = "icon", ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
	"aria-current": isActive ? "page" : void 0,
	className: cn(buttonVariants({
		variant: isActive ? "outline" : "ghost",
		size
	}), className),
	...props
});
PaginationLink.displayName = "PaginationLink";
var PaginationPrevious = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"aria-label": "Go to previous page",
	size: "default",
	className: cn("gap-1 pl-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Previous" })]
});
PaginationPrevious.displayName = "PaginationPrevious";
var PaginationNext = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationLink, {
	"aria-label": "Go to next page",
	size: "default",
	className: cn("gap-1 pr-2.5", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Next" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "h-4 w-4" })]
});
PaginationNext.displayName = "PaginationNext";
var PaginationEllipsis = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
	"aria-hidden": true,
	className: cn("flex h-9 w-9 items-center justify-center", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "sr-only",
		children: "More pages"
	})]
});
PaginationEllipsis.displayName = "PaginationEllipsis";
var PRODUCTS_PER_PAGE = 8;
function getPageNumbers(currentPage, totalPages) {
	if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
	const sorted = [.../* @__PURE__ */ new Set([
		1,
		2,
		totalPages - 1,
		totalPages,
		currentPage - 1,
		currentPage,
		currentPage + 1
	])].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b);
	const result = [];
	sorted.forEach((page, idx) => {
		if (idx > 0 && page - sorted[idx - 1] > 1) result.push("ellipsis");
		result.push(page);
	});
	return result;
}
var OCCASIONS = [
	{
		id: "Birthday",
		label: "Birthday"
	},
	{
		id: "Anniversary",
		label: "Anniversary"
	},
	{
		id: "Get Well",
		label: "Get Well"
	},
	{
		id: "Congratulations",
		label: "Congratulations"
	},
	{
		id: "Just Because",
		label: "Just Because"
	}
];
var TYPES = [
	{
		id: "Roses",
		label: "Roses"
	},
	{
		id: "Mixed Bouquets",
		label: "Mixed Bouquets"
	},
	{
		id: "Baskets",
		label: "Baskets"
	},
	{
		id: "Add-ons",
		label: "Add-ons"
	}
];
function Catalogue() {
	const search = Route.useSearch();
	const navigate = useNavigate({ from: Route.fullPath });
	const { addToCart } = useCart();
	const { data: products, isFetching, isLoading } = useProducts();
	const isInitialProductsLoad = isFetching && products.length === 0;
	const initialType = search.type || "";
	const initialOccasion = search.occasion || "";
	const [selectedOccasions, setSelectedOccasions] = (0, import_react.useState)(initialOccasion ? [initialOccasion] : []);
	const [selectedTypes, setSelectedTypes] = (0, import_react.useState)(initialType ? [initialType] : []);
	const [priceRange, setPriceRange] = (0, import_react.useState)("all");
	const [sortBy, setSortBy] = (0, import_react.useState)(search.sort || "popular");
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	(0, import_react.useEffect)(() => {
		if (search.type) setSelectedTypes([search.type]);
		if (search.occasion) setSelectedOccasions([search.occasion]);
	}, [search.type, search.occasion]);
	const handleOccasionChange = (occasionId, checked) => {
		if (checked) setSelectedOccasions((prev) => [...prev, occasionId]);
		else setSelectedOccasions((prev) => prev.filter((id) => id !== occasionId));
	};
	const handleTypeChange = (typeId, checked) => {
		if (checked) setSelectedTypes((prev) => [...prev, typeId]);
		else setSelectedTypes((prev) => prev.filter((id) => id !== typeId));
	};
	const clearAllFilters = () => {
		setSelectedOccasions([]);
		setSelectedTypes([]);
		setPriceRange("all");
		setSortBy("popular");
		navigate({ search: {} });
	};
	const filteredProducts = (0, import_react.useMemo)(() => {
		return products.filter((p) => {
			if (selectedOccasions.length > 0) {
				if (!selectedOccasions.some((occ) => p.bestFor.toLowerCase().includes(occ.toLowerCase()))) return false;
			}
			if (selectedTypes.length > 0) {
				if (!selectedTypes.some((type) => p.category.toLowerCase().includes(type.toLowerCase()))) return false;
			}
			if (priceRange === "under-80") return p.price < 8e4;
			else if (priceRange === "80-150") return p.price >= 8e4 && p.price <= 15e4;
			else if (priceRange === "over-150") return p.price > 15e4;
			return true;
		}).sort((a, b) => {
			if (sortBy === "price-asc") return a.price - b.price;
			else if (sortBy === "price-desc") return b.price - a.price;
			return 0;
		});
	}, [
		products,
		selectedOccasions,
		selectedTypes,
		priceRange,
		sortBy
	]);
	(0, import_react.useEffect)(() => {
		setCurrentPage(1);
	}, [
		selectedOccasions,
		selectedTypes,
		priceRange,
		sortBy
	]);
	const totalPages = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
	const paginatedProducts = (0, import_react.useMemo)(() => {
		const start = (currentPage - 1) * PRODUCTS_PER_PAGE;
		return filteredProducts.slice(start, start + PRODUCTS_PER_PAGE);
	}, [filteredProducts, currentPage]);
	const pageNumbers = (0, import_react.useMemo)(() => getPageNumbers(currentPage, totalPages), [currentPage, totalPages]);
	const goToPage = (page) => {
		setCurrentPage(Math.min(Math.max(page, 1), totalPages));
		const gridElement = document.getElementById("catalogue-grid");
		if (gridElement) gridElement.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	const activeSortLabel = (0, import_react.useMemo)(() => {
		switch (sortBy) {
			case "price-asc": return "Price: Low to High";
			case "price-desc": return "Price: High to Low";
			default: return "Popularity";
		}
	}, [sortBy]);
	const handleQuickAdd = (product, e) => {
		e.preventDefault();
		e.stopPropagation();
		const today = /* @__PURE__ */ new Date();
		const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate() + 1).padStart(2, "0")}`;
		addToCart({
			product,
			quantity: 1,
			selectedSize: "12 Stems",
			sizePrice: product.price,
			selectedAddOns: [],
			isGift: false,
			deliveryLocation: "Kampala Central",
			deliveryDate: formattedDate
		});
		toast.success(`${product.name} added to cart!`, { description: "Default size (12 Stems) added. Open cart to customize options." });
	};
	const scrollToGrid = (e) => {
		e.preventDefault();
		const gridElement = document.getElementById("catalogue-grid");
		if (gridElement) gridElement.scrollIntoView({
			behavior: "smooth",
			block: "start"
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative overflow-hidden border-b border-border/60 text-white",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: hero_bouquet_default,
				alt: "Luxe hand-tied floral arrangements",
				loading: "eager",
				fetchPriority: "high",
				className: "absolute inset-0 h-full w-full object-cover"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-gradient-to-b from-[#5C1D24]/90 via-[#5C1D24]/78 to-[#5C1D24]/92" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative z-10 mx-auto max-w-7xl px-6 py-24 md:py-28",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "max-w-2xl text-left flex flex-col items-start space-y-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "inline-block bg-white/20 border border-white/20 text-white text-[10px] uppercase tracking-[1.5px] font-semibold px-4 py-1.5 rounded-full",
							children: "KAMPALA STUDIO · FRESH DAILY"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
							className: "font-serif text-5xl md:text-7xl text-white font-light leading-tight tracking-tight",
							children: [
								"Hand-Tied ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", { className: "hidden md:inline" }),
								" Arrangements"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-white/90 text-base md:text-lg leading-relaxed max-w-xl",
							children: "Each arrangement is designed and hand-tied in our Kampala studio using freshly cut, premium seasonal blooms. Choose a bouquet to customize sizes, add-ons, and local delivery."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-6 pt-4 w-full sm:w-auto",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: scrollToGrid,
								className: "rounded-full bg-white text-[#5C1D24] px-8 py-3.5 text-xs font-semibold uppercase tracking-[1.5px] shadow-lg hover:bg-white/95 hover:-translate-y-0.5 hover:scale-[1.03] transition-all duration-300 cursor-pointer w-full sm:w-auto text-center font-medium",
								children: "Explore Catalogue"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/contact",
								className: "text-xs font-semibold uppercase tracking-[1.5px] border-b border-white/40 hover:border-white py-1 text-white transition-all duration-300 w-full sm:w-auto text-center",
								children: "Request a Custom Quote"
							})]
						})
					]
				})
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mx-auto max-w-7xl px-6 py-6 md:py-12",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			id: "catalogue-grid",
			className: "scroll-mt-24 space-y-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-[76px] z-20 bg-background/95 backdrop-blur-md border-y border-border/40 py-4 px-2 flex flex-wrap items-center justify-between gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "hidden lg:flex items-center gap-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-foreground/80 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 focus:outline-none cursor-pointer",
										children: [
											"Occasion ",
											selectedOccasions.length > 0 && `(${selectedOccasions.length})`,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
									className: "p-4 bg-background border border-border/60 min-w-[220px] space-y-2.5 shadow-lg rounded-2xl z-40",
									children: OCCASIONS.map((occ) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											id: `occ-${occ.id}`,
											checked: selectedOccasions.includes(occ.id),
											onCheckedChange: (checked) => handleOccasionChange(occ.id, checked === true)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: `occ-${occ.id}`,
											className: "text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1",
											children: occ.label
										})]
									}, occ.id))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-foreground/80 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 focus:outline-none cursor-pointer",
										children: [
											"Type ",
											selectedTypes.length > 0 && `(${selectedTypes.length})`,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
									className: "p-4 bg-background border border-border/60 min-w-[200px] space-y-2.5 shadow-lg rounded-2xl z-40",
									children: TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
											id: `type-${type.id}`,
											checked: selectedTypes.includes(type.id),
											onCheckedChange: (checked) => handleTypeChange(type.id, checked === true)
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
											htmlFor: `type-${type.id}`,
											className: "text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1",
											children: type.label
										})]
									}, type.id))
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-foreground/80 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 focus:outline-none cursor-pointer",
										children: [
											"Price ",
											priceRange !== "all" && "•",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3.5 w-3.5 opacity-60" })
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuContent, {
									className: "p-4 bg-background border border-border/60 min-w-[220px] shadow-lg rounded-2xl z-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
										value: priceRange,
										onValueChange: setPriceRange,
										className: "space-y-2.5",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
													value: "all",
													id: "price-all"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "price-all",
													className: "text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1",
													children: "All Prices"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
													value: "under-80",
													id: "price-under-80"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "price-under-80",
													className: "text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1",
													children: "Under 80,000 UGX"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
													value: "80-150",
													id: "price-80-150"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "price-80-150",
													className: "text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1",
													children: "80,000 – 150,000 UGX"
												})]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center space-x-3 hover:bg-accent/30 p-1.5 rounded-lg cursor-pointer",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
													value: "over-150",
													id: "price-over-150"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: "price-over-150",
													className: "text-sm text-foreground/80 font-normal cursor-pointer select-none flex-1",
													children: "150,000 UGX +"
												})]
											})
										]
									})
								})] }),
								(selectedOccasions.length > 0 || selectedTypes.length > 0 || priceRange !== "all") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: clearAllFilters,
									className: "text-xs uppercase tracking-wider font-semibold text-primary underline underline-offset-4 hover:opacity-85 transition-opacity ml-2 cursor-pointer",
									children: "Clear all"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex items-center gap-3 lg:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Sheet, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTrigger, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-foreground/85 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 cursor-pointer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-3.5 w-3.5" }),
										"Filters",
										" ",
										(selectedOccasions.length > 0 || selectedTypes.length > 0 || priceRange !== "all") && "•"
									]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
								side: "left",
								className: "w-full max-w-xs bg-background p-6 overflow-y-auto",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHeader, {
									className: "pb-4 border-b border-border/60 mb-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, {
										className: "font-serif text-xl text-foreground text-left",
										children: "Filters"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-6",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4",
											children: "Occasion"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-3",
											children: OCCASIONS.map((occ) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center space-x-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													id: `m-occ-${occ.id}`,
													checked: selectedOccasions.includes(occ.id),
													onCheckedChange: (checked) => handleOccasionChange(occ.id, checked === true)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: `m-occ-${occ.id}`,
													className: "text-sm text-foreground/80 font-normal",
													children: occ.label
												})]
											}, occ.id))
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4",
											children: "Type"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "space-y-3",
											children: TYPES.map((type) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center space-x-3",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Checkbox, {
													id: `m-type-${type.id}`,
													checked: selectedTypes.includes(type.id),
													onCheckedChange: (checked) => handleTypeChange(type.id, checked === true)
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
													htmlFor: `m-type-${type.id}`,
													className: "text-sm text-foreground/80 font-normal",
													children: type.label
												})]
											}, type.id))
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "border-border/40" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "text-xs uppercase tracking-wider text-muted-foreground font-semibold mb-4",
											children: "Price (UGX)"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioGroup, {
											value: priceRange,
											onValueChange: setPriceRange,
											className: "space-y-3",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center space-x-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														value: "all",
														id: "m-price-all"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "m-price-all",
														className: "text-sm text-foreground/80 font-normal",
														children: "All Prices"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center space-x-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														value: "under-80",
														id: "m-price-under-80"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "m-price-under-80",
														className: "text-sm text-foreground/80 font-normal",
														children: "Under 80k"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center space-x-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														value: "80-150",
														id: "m-price-80-150"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "m-price-80-150",
														className: "text-sm text-foreground/80 font-normal",
														children: "80k – 150k"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center space-x-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RadioGroupItem, {
														value: "over-150",
														id: "m-price-over-150"
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
														htmlFor: "m-price-over-150",
														className: "text-sm text-foreground/80 font-normal",
														children: "150k +"
													})]
												})
											]
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: clearAllFilters,
											className: "w-full text-center py-2.5 rounded-full bg-primary text-xs uppercase tracking-widest text-white font-semibold hover:bg-primary/95 transition-colors cursor-pointer",
											children: "Clear All Filters"
										})
									]
								})]
							})] })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-4 flex-1 lg:flex-initial",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Showing ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: "0"
									}),
									" arrangements"
								] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
									"Showing",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "font-medium text-foreground",
										children: [
											(currentPage - 1) * PRODUCTS_PER_PAGE + 1,
											"–",
											Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)
										]
									}),
									" ",
									"of",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-medium text-foreground",
										children: filteredProducts.length
									}),
									" ",
									"arrangements"
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "hidden sm:inline text-xs text-muted-foreground",
									children: "Sort by:"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
									asChild: true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "flex items-center gap-1 text-xs uppercase tracking-wider font-semibold text-foreground/85 border border-border/80 rounded-full px-4 py-2 bg-background hover:bg-accent/40 focus:outline-none cursor-pointer",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpDown, { className: "h-3.5 w-3.5 mr-1" }),
											activeSortLabel,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { className: "h-3 w-3 opacity-60" })
										]
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
									align: "end",
									className: "bg-background border border-border/60 shadow-lg rounded-2xl z-40",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onClick: () => setSortBy("popular"),
											className: "text-xs font-normal cursor-pointer",
											children: "Popularity"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onClick: () => setSortBy("price-asc"),
											className: "text-xs font-normal cursor-pointer",
											children: "Price: Low to High"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
											onClick: () => setSortBy("price-desc"),
											className: "text-xs font-normal cursor-pointer",
											children: "Price: High to Low"
										})
									]
								})] })]
							})]
						})
					]
				}),
				isInitialProductsLoad ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6",
					children: Array.from({ length: 8 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "animate-pulse rounded-2xl border border-border/60 bg-card overflow-hidden",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "aspect-square bg-muted/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "p-4 space-y-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-2/3 rounded bg-muted/70" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-3 w-1/3 rounded bg-muted/70" })]
						})]
					}, i))
				}) : filteredProducts.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-20 border border-dashed border-border/80 rounded-2xl bg-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "mx-auto h-12 w-12 text-muted/30 stroke-[1]" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-serif text-xl text-foreground",
							children: "No arrangements found"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground max-w-sm mx-auto",
							children: "We couldn't find any bouquets matching your current filters. Try relaxing your parameters or clearing filters."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							onClick: clearAllFilters,
							className: "mt-6 rounded-full bg-primary px-6 py-2.5 text-[11px] uppercase tracking-[0.22em] text-white hover:bg-primary/95 cursor-pointer",
							children: "Clear all filters"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-x-6 gap-y-12 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
					children: paginatedProducts.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "group relative flex flex-col bg-card product-card-premium transition-all duration-300 shadow-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: `/product-detail`,
							search: { id: p.id },
							className: "block overflow-hidden relative aspect-[4/5] bg-muted cursor-pointer",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: p.image,
								alt: p.name,
								loading: "lazy",
								className: "object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "absolute top-4 left-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "bg-white/80 text-primary backdrop-blur-md text-[9px] uppercase tracking-[1.5px] font-semibold px-3 py-1 rounded-full shadow-xs",
									children: p.category
								})
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex-1 p-5 flex flex-col justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "space-y-1.5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: `/product-detail`,
									search: { id: p.id },
									className: "block hover:opacity-85 cursor-pointer",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "font-serif text-lg text-foreground truncate group-hover:text-primary transition-colors",
										children: p.name
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground line-clamp-2 leading-relaxed",
									children: p.description
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-5 pt-4 border-t border-border/40 flex items-center justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-semibold text-primary text-base",
									children: formatUGX(p.price)
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										to: `/product-detail`,
										search: { id: p.id },
										className: "p-2 text-muted-foreground hover:text-primary rounded-full border border-border/80 bg-background hover:bg-accent/20 transition-colors cursor-pointer",
										title: "View Details",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, { className: "h-4 w-4" })
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: (e) => handleQuickAdd(p, e),
										className: "p-2 rounded-full bg-primary text-white hover:bg-primary/95 transition-colors shadow-xs hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center",
										title: "Add to Cart",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "h-4 w-4 stroke-[2.5]" })
									})]
								})]
							})]
						})]
					}, p.id))
				}),
				totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					className: "pt-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(PaginationContent, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationPrevious, {
							href: "#",
							onClick: (e) => {
								e.preventDefault();
								if (currentPage > 1) goToPage(currentPage - 1);
							},
							"aria-disabled": currentPage === 1,
							className: `rounded-full ${currentPage === 1 ? "pointer-events-none opacity-40" : "cursor-pointer"}`
						}) }),
						pageNumbers.map((page, idx) => page === "ellipsis" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationEllipsis, {}) }, `ellipsis-${idx}`) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationLink, {
							href: "#",
							isActive: page === currentPage,
							onClick: (e) => {
								e.preventDefault();
								goToPage(page);
							},
							className: "cursor-pointer rounded-full",
							children: page
						}) }, page)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationItem, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaginationNext, {
							href: "#",
							onClick: (e) => {
								e.preventDefault();
								if (currentPage < totalPages) goToPage(currentPage + 1);
							},
							"aria-disabled": currentPage === totalPages,
							className: `rounded-full ${currentPage === totalPages ? "pointer-events-none opacity-40" : "cursor-pointer"}`
						}) })
					] })
				})
			]
		})
	})] });
}
//#endregion
export { Catalogue as component };
