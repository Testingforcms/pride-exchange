import type { CartItem, CouponLine, Product } from "@/types";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type React from "react";

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  subtotal: number;
  coupon: CouponLine | null;
  addItem: (
    product: Product,
    quantity?: number,
    variationId?: number,
    selectedAttributes?: Record<string, string>,
  ) => void;
  removeItem: (productId: number, variationId?: number) => void;
  updateQuantity: (
    productId: number,
    quantity: number,
    variationId?: number,
  ) => void;
  applyCoupon: (code: string) => void;
  removeCoupon: () => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);

const CART_KEY = "tpe_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem(CART_KEY);
      return stored ? (JSON.parse(stored) as CartItem[]) : [];
    } catch {
      return [];
    }
  });
  const [coupon, setCoupon] = useState<CouponLine | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(CART_KEY, JSON.stringify(items));
    } catch {
      // ignore
    }
  }, [items]);

  const addItem = useCallback(
    (
      product: Product,
      quantity = 1,
      variationId?: number,
      selectedAttributes?: Record<string, string>,
    ) => {
      setItems((prev) => {
        const existing = prev.find(
          (i) => i.product.id === product.id && i.variationId === variationId,
        );
        if (existing) {
          return prev.map((i) =>
            i.product.id === product.id && i.variationId === variationId
              ? { ...i, quantity: i.quantity + quantity }
              : i,
          );
        }
        return [
          ...prev,
          { product, quantity, variationId, selectedAttributes },
        ];
      });
    },
    [],
  );

  const removeItem = useCallback((productId: number, variationId?: number) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.product.id === productId && i.variationId === variationId),
      ),
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: number, quantity: number, variationId?: number) => {
      if (quantity <= 0) {
        removeItem(productId, variationId);
        return;
      }
      setItems((prev) =>
        prev.map((i) =>
          i.product.id === productId && i.variationId === variationId
            ? { ...i, quantity }
            : i,
        ),
      );
    },
    [removeItem],
  );

  const applyCoupon = useCallback((code: string) => {
    setCoupon({ code });
  }, []);

  const removeCoupon = useCallback(() => {
    setCoupon(null);
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
    setCoupon(null);
  }, []);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => {
    const price = Number.parseFloat(
      i.product.salePrice || i.product.price || "0",
    );
    return sum + price * i.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        itemCount,
        subtotal,
        coupon,
        addItem,
        removeItem,
        updateQuantity,
        applyCoupon,
        removeCoupon,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
