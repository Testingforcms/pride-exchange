import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

interface WishlistContextValue {
  wishlistIds: number[];
  isInWishlist: (productId: number) => boolean;
  addToWishlist: (productId: number) => void;
  removeFromWishlist: (productId: number) => void;
  toggleWishlist: (productId: number) => void;
  isLoading: boolean;
}

const WishlistContext = createContext<WishlistContextValue | null>(null);
const WISHLIST_KEY = "tpe_wishlist";

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [wishlistIds, setWishlistIds] = useState<number[]>(() => {
    try {
      const stored = localStorage.getItem(WISHLIST_KEY);
      return stored ? (JSON.parse(stored) as number[]) : [];
    } catch {
      return [];
    }
  });
  const [isLoading] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_KEY, JSON.stringify(wishlistIds));
    } catch {
      // ignore
    }
  }, [wishlistIds]);

  // When user logs out, keep local wishlist
  useEffect(() => {
    if (!isLoggedIn) {
      try {
        const stored = localStorage.getItem(WISHLIST_KEY);
        if (stored) {
          setWishlistIds(JSON.parse(stored) as number[]);
        }
      } catch {
        // ignore
      }
    }
  }, [isLoggedIn]);

  const isInWishlist = useCallback(
    (productId: number) => wishlistIds.includes(productId),
    [wishlistIds],
  );

  const addToWishlist = useCallback((productId: number) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev : [...prev, productId],
    );
  }, []);

  const removeFromWishlist = useCallback((productId: number) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  }, []);

  const toggleWishlist = useCallback(
    (productId: number) => {
      if (wishlistIds.includes(productId)) {
        removeFromWishlist(productId);
      } else {
        addToWishlist(productId);
      }
    },
    [wishlistIds, addToWishlist, removeFromWishlist],
  );

  return (
    <WishlistContext.Provider
      value={{
        wishlistIds,
        isInWishlist,
        addToWishlist,
        removeFromWishlist,
        toggleWishlist,
        isLoading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}
