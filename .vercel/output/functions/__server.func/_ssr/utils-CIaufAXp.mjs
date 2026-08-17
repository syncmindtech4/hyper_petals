import { i as __toESM } from "../_runtime.mjs";
import { v as require_jsx_runtime, y as require_react } from "../_libs/@clerk/react+[...].mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-CIaufAXp.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = /* @__PURE__ */ __toESM(require_jsx_runtime());
var CartContext = (0, import_react.createContext)(void 0);
function CartProvider({ children }) {
	const [items, setItems] = (0, import_react.useState)([]);
	const [isCartOpen, setIsCartOpen] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const savedCart = localStorage.getItem("hyper_petals_cart") ?? localStorage.getItem("luxe_floral_cart");
			if (savedCart) setItems(JSON.parse(savedCart));
			localStorage.removeItem("luxe_floral_cart");
		} catch (e) {
			console.error("Failed to load cart state:", e);
		}
	}, []);
	const persistCart = (newItems) => {
		try {
			localStorage.setItem("hyper_petals_cart", JSON.stringify(newItems));
		} catch (e) {
			console.error("Failed to save cart state:", e);
		}
	};
	const saveCart = (newItems) => {
		setItems(newItems);
		persistCart(newItems);
	};
	const addToCart = (newItem) => {
		setItems((prevItems) => {
			const existingIndex = prevItems.findIndex((item) => item.product.id === newItem.product.id && item.selectedSize === newItem.selectedSize && item.deliveryDate === newItem.deliveryDate && item.deliveryLocation === newItem.deliveryLocation && JSON.stringify(item.selectedAddOns.map((a) => a.name).sort()) === JSON.stringify(newItem.selectedAddOns.map((a) => a.name).sort()) && item.giftMessage === newItem.giftMessage && item.isGift === newItem.isGift && item.giftDetails?.recipientName === newItem.giftDetails?.recipientName && item.giftDetails?.recipientPhone === newItem.giftDetails?.recipientPhone && JSON.stringify(item.customizations ?? null) === JSON.stringify(newItem.customizations ?? null));
			const nextItems = existingIndex > -1 ? prevItems.map((item, i) => i === existingIndex ? {
				...item,
				quantity: item.quantity + newItem.quantity
			} : item) : [...prevItems, {
				...newItem,
				cartItemId: `${newItem.product.id}-${newItem.selectedSize}-${newItem.deliveryDate}-${JSON.stringify(newItem.selectedAddOns.map((a) => a.name).sort())}-${Date.now()}`
			}];
			persistCart(nextItems);
			return nextItems;
		});
		setIsCartOpen(true);
	};
	const removeFromCart = (cartItemId) => {
		setItems((prevItems) => {
			const nextItems = prevItems.filter((item) => item.cartItemId !== cartItemId);
			persistCart(nextItems);
			return nextItems;
		});
	};
	const updateQuantity = (cartItemId, quantity) => {
		if (quantity <= 0) {
			removeFromCart(cartItemId);
			return;
		}
		setItems((prevItems) => {
			const nextItems = prevItems.map((item) => item.cartItemId === cartItemId ? {
				...item,
				quantity
			} : item);
			persistCart(nextItems);
			return nextItems;
		});
	};
	const clearCart = () => {
		saveCart([]);
	};
	const cartCount = items.reduce((acc, item) => acc + item.quantity, 0);
	const cartTotal = items.reduce((acc, item) => {
		const addOnsTotal = item.selectedAddOns.reduce((sum, addOn) => sum + addOn.price, 0);
		return acc + (item.sizePrice + addOnsTotal) * item.quantity;
	}, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartContext.Provider, {
		value: {
			items,
			addToCart,
			removeFromCart,
			updateQuantity,
			clearCart,
			cartCount,
			cartTotal,
			isCartOpen,
			setIsCartOpen
		},
		children
	});
}
function useCart() {
	const context = (0, import_react.useContext)(CartContext);
	if (!context) throw new Error("useCart must be used within a CartProvider");
	return context;
}
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
//#endregion
export { cn as n, useCart as r, CartProvider as t };
