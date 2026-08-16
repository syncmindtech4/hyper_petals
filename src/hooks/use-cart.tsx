import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/products";
import { BouquetCustomization } from "@/lib/bouquet-customization";

export interface AddOn {
  name: string;
  price: number;
}

export interface GiftDetails {
  recipientName: string;
  recipientPhone: string;
}

export interface CartItem {
  cartItemId: string; // Unique ID for this specific configured item in cart
  product: Product;
  quantity: number;
  selectedSize: string; // e.g. "6 Stems" | "12 Stems" | "24 Stems"
  sizePrice: number; // Price corresponding to selected size
  selectedAddOns: AddOn[];
  isGift: boolean;
  giftDetails?: GiftDetails;
  deliveryLocation: string;
  deliveryDate: string;
  giftMessage?: string;
  customizations?: BouquetCustomization;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "cartItemId">) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount. Falls back to the old pre-rebrand
  // key so carts saved before the "luxe_floral_cart" -> "hyper_petals_cart"
  // rename aren't silently dropped.
  useEffect(() => {
    try {
      const savedCart =
        localStorage.getItem("hyper_petals_cart") ?? localStorage.getItem("luxe_floral_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
      localStorage.removeItem("luxe_floral_cart");
    } catch (e) {
      console.error("Failed to load cart state:", e);
    }
  }, []);

  // Persist cart to localStorage (state update happens separately, see addToCart/etc.)
  const persistCart = (newItems: CartItem[]) => {
    try {
      localStorage.setItem("hyper_petals_cart", JSON.stringify(newItems));
    } catch (e) {
      console.error("Failed to save cart state:", e);
    }
  };

  // Kept for callers that just want to set+persist a whole new list (e.g. clearCart).
  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    persistCart(newItems);
  };

  const addToCart = (newItem: Omit<CartItem, "cartItemId">) => {
    // Use the functional setState form so two rapid addToCart calls (e.g. a fast
    // double-click) each see the latest items instead of racing on a stale closure.
    setItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) =>
          item.product.id === newItem.product.id &&
          item.selectedSize === newItem.selectedSize &&
          item.deliveryDate === newItem.deliveryDate &&
          item.deliveryLocation === newItem.deliveryLocation &&
          JSON.stringify(item.selectedAddOns.map((a) => a.name).sort()) ===
            JSON.stringify(newItem.selectedAddOns.map((a) => a.name).sort()) &&
          item.giftMessage === newItem.giftMessage &&
          item.isGift === newItem.isGift &&
          item.giftDetails?.recipientName === newItem.giftDetails?.recipientName &&
          item.giftDetails?.recipientPhone === newItem.giftDetails?.recipientPhone &&
          JSON.stringify(item.customizations ?? null) ===
            JSON.stringify(newItem.customizations ?? null),
      );

      const nextItems =
        existingIndex > -1
          ? prevItems.map((item, i) =>
              i === existingIndex ? { ...item, quantity: item.quantity + newItem.quantity } : item,
            )
          : [
              ...prevItems,
              {
                ...newItem,
                cartItemId: `${newItem.product.id}-${newItem.selectedSize}-${newItem.deliveryDate}-${JSON.stringify(
                  newItem.selectedAddOns.map((a) => a.name).sort(),
                )}-${Date.now()}`,
              },
            ];

      persistCart(nextItems);
      return nextItems;
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setItems((prevItems) => {
      const nextItems = prevItems.filter((item) => item.cartItemId !== cartItemId);
      persistCart(nextItems);
      return nextItems;
    });
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setItems((prevItems) => {
      const nextItems = prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item,
      );
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

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
