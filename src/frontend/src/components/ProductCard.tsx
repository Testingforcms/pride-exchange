import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Link } from "@tanstack/react-router";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
  index?: number;
  className?: string;
}

export function ProductCard({
  product,
  index = 0,
  className,
}: ProductCardProps) {
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();
  const [imgError, setImgError] = useState(false);
  const [adding, setAdding] = useState(false);

  const inWishlist = isInWishlist(product.id);
  const isSale =
    !!product.salePrice &&
    product.salePrice !== "" &&
    product.salePrice !== product.regularPrice;
  const displayPrice = isSale ? product.salePrice : product.price;
  const imageUrl = product.images?.[0]?.src;
  const hasStock = product.stockStatus !== "outofstock";

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (!hasStock) return;
    setAdding(true);
    addItem(product, 1);
    showToast(`${product.name} added to cart`, "success");
    setTimeout(() => setAdding(false), 600);
  }

  function handleWishlist(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
    showToast(
      inWishlist ? "Removed from wishlist" : "Added to wishlist",
      inWishlist ? "info" : "success",
    );
  }

  return (
    <Link
      to="/products/$slug"
      params={{ slug: product.slug }}
      data-ocid={`product.item.${index + 1}`}
      className={cn("block group", className)}
    >
      <div className="relative rounded-xl overflow-hidden bg-card border border-border/50 card-hover shadow-card flex flex-col">
        {/* Product Image */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={product.images?.[0]?.alt || product.name}
              loading="lazy"
              onError={() => setImgError(true)}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground text-4xl">
              🏳️‍🌈
            </div>
          )}

          {/* Badges row */}
          <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
            {isSale && (
              <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase">
                Sale
              </span>
            )}
            {!hasStock && (
              <span className="bg-muted text-muted-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-md uppercase">
                Sold out
              </span>
            )}
          </div>

          {/* Wishlist button */}
          <button
            type="button"
            onClick={handleWishlist}
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
            data-ocid={`product.wishlist_button.${index + 1}`}
            className={cn(
              "absolute top-2 right-2 p-1.5 rounded-full bg-card/90 backdrop-blur-sm shadow-xs transition-smooth",
              inWishlist
                ? "text-primary"
                : "text-muted-foreground hover:text-primary",
            )}
          >
            <Heart className={cn("h-4 w-4", inWishlist && "fill-primary")} />
          </button>
        </div>

        {/* Info */}
        <div className="p-3 flex flex-col gap-1.5 flex-1">
          <h3 className="font-semibold text-sm text-foreground line-clamp-2 min-h-[2.5rem]">
            {product.name}
          </h3>

          {/* Price */}
          <div className="flex items-center gap-1.5">
            <span className="font-bold text-foreground text-base">
              ${displayPrice}
            </span>
            {isSale && product.regularPrice && (
              <span className="text-xs text-muted-foreground line-through">
                ${product.regularPrice}
              </span>
            )}
          </div>

          {/* Add to cart */}
          <Button
            type="button"
            onClick={handleAddToCart}
            disabled={!hasStock || adding}
            data-ocid={`product.add_to_cart_button.${index + 1}`}
            className={cn(
              "btn-pride w-full h-8 text-xs mt-auto",
              !hasStock && "opacity-50 cursor-not-allowed",
            )}
          >
            {adding ? (
              <span className="flex items-center gap-1.5">
                <ShoppingCart className="h-3.5 w-3.5" /> Added!
              </span>
            ) : hasStock ? (
              <span className="flex items-center gap-1.5">
                <ShoppingCart className="h-3.5 w-3.5" /> Add to Cart
              </span>
            ) : (
              "Out of Stock"
            )}
          </Button>
        </div>
      </div>
    </Link>
  );
}
