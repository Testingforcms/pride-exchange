import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { useWishlist } from "@/context/WishlistContext";
import { useProduct } from "@/hooks/useProduct";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

function WishlistProductCard({
  productId,
  index,
  onRemove,
}: {
  productId: number;
  index: number;
  onRemove: (id: number) => void;
}) {
  const { data: product, isLoading } = useProduct(productId);
  const [removing, setRemoving] = useState(false);

  function handleRemove(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setRemoving(true);
    setTimeout(() => onRemove(productId), 300);
  }

  if (isLoading) {
    return (
      <div className="rounded-xl overflow-hidden bg-card border border-border/50">
        <Skeleton className="aspect-square w-full" />
        <div className="p-3 space-y-2">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-8 w-full" />
        </div>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div
      data-ocid={`wishlist.item.${index + 1}`}
      className={`transition-all duration-300 ${removing ? "opacity-0 scale-95" : "opacity-100 scale-100"}`}
    >
      <div className="relative">
        <button
          type="button"
          onClick={handleRemove}
          aria-label="Remove from wishlist"
          data-ocid={`wishlist.delete_button.${index + 1}`}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-card/90 backdrop-blur-sm shadow-sm text-primary hover:bg-destructive hover:text-destructive-foreground transition-smooth"
        >
          <Heart className="h-4 w-4 fill-primary" />
        </button>
        <ProductCard product={product} index={index} />
      </div>
    </div>
  );
}

export default function Wishlist() {
  const { wishlistIds, removeFromWishlist } = useWishlist();
  const [visibleIds, setVisibleIds] = useState<number[]>([]);

  useEffect(() => {
    setVisibleIds(wishlistIds);
  }, [wishlistIds]);

  const itemCount = visibleIds.length;

  return (
    <div className="py-6 space-y-6">
      {/* Page header */}
      <div className="flex items-center justify-between">
        <div>
          <h1
            className="text-2xl font-display font-bold text-foreground"
            data-ocid="wishlist.page"
          >
            My Wishlist
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {itemCount === 0
              ? "No saved items yet"
              : `${itemCount} item${itemCount !== 1 ? "s" : ""} saved`}
          </p>
        </div>
        <Link
          to="/products"
          search={{
            search: undefined,
            category: undefined,
            orderby: undefined,
            page: undefined,
          }}
          data-ocid="wishlist.discover_link"
          className="text-sm text-primary font-medium hover:underline flex items-center gap-1"
        >
          <ShoppingBag className="h-4 w-4" />
          Shop
        </Link>
      </div>

      {/* Empty state */}
      {itemCount === 0 && (
        <EmptyState
          icon={<Heart className="h-8 w-8" />}
          title="Your wishlist is empty"
          description="Save items you love and come back to them anytime."
          ctaLabel="Discover Products"
          ctaHref="/products"
        />
      )}

      {/* Product grid */}
      {itemCount > 0 && (
        <div
          data-ocid="wishlist.list"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4"
        >
          {visibleIds.map((id, idx) => (
            <WishlistProductCard
              key={id}
              productId={id}
              index={idx}
              onRemove={removeFromWishlist}
            />
          ))}
        </div>
      )}
    </div>
  );
}
