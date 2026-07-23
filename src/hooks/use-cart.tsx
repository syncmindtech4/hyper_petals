import React, { createContext, useContext, useState, useEffect } from "react";
import { Product } from "@/lib/products";

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
  sizePrice: number;     // Price corresponding to selected size
  selectedAddOns: AddOn[];
  isGift: boolean;
  giftDetails?: GiftDetails;
  deliveryLocation: string;
  deliveryDate: string;
  giftMessage?: string;
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

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("luxe_floral_cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (e) {
      console.error("Failed to load cart state:", e);
    }
  }, []);

  // Save cart to localStorage when it changes
  const saveCart = (newItems: CartItem[]) => {
    setItems(newItems);
    try {
      localStorage.setItem("luxe_floral_cart", JSON.stringify(newItems));
    } catch (e) {
      console.error("Failed to save cart state:", e);
    }
  };

  const addToCart = (newItem: Omit<CartItem, "cartItemId">) => {
    const cartItemId = `${newItem.product.id}-${newItem.selectedSize}-${newItem.deliveryDate}-${JSON.stringify(
      newItem.selectedAddOns.map((a) => a.name).sort()
    )}-${Date.now()}`;
    
    // Check if an identical configuration already exists to merge quantity
    const existingIndex = items.findIndex(
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
        item.giftDetails?.recipientPhone === newItem.giftDetails?.recipientPhone
    );

    if (existingIndex > -1) {
      const updatedItems = [...items];
      updatedItems[existingIndex].quantity += newItem.quantity;
      saveCart(updatedItems);
    } else {
      saveCart([...items, { ...newItem, cartItemId }]);
    }
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    saveCart(items.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    saveCart(
      items.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity } : item
      )
    );
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
