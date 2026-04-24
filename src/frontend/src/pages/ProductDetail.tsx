import { EmptyState } from "@/components/EmptyState";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { useProduct } from "@/hooks/useProduct";
import { useProducts } from "@/hooks/useProducts";
import { useToast } from "@/hooks/useToast";
import { cn } from "@/lib/utils";
import type { Product } from "@/types";
import { Link, useParams } from "@tanstack/react-router";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  Minus,
  Package,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

// --- Image Gallery ---
interface GalleryProps {
  images: Product["images"];
  productName: string;
}

function ImageGallery({ images, productName }: GalleryProps) {
  const [activeIdx, setActiveIdx] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const safeImages = images?.length ? images : [];

  function selectImage(idx: number) {
    if (idx === activeIdx) return;
    setTransitioning(true);
    setImgLoaded(false);
    setTimeout(() => {
      setActiveIdx(idx);
      setTransitioning(false);
    }, 150);
    // scroll thumb into view
    const thumb = thumbsRef.current?.children[idx] as HTMLElement | undefined;
    thumb?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
  }

  const mainSrc = safeImages[activeIdx]?.src;
  const mainAlt = safeImages[activeIdx]?.alt || productName;

  return (
    <div className="flex flex-col gap-3 w-full" data-ocid="product.gallery">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden bg-muted aspect-square w-full shadow-md">
        {!imgLoaded && <Skeleton className="absolute inset-0 rounded-2xl" />}
        {mainSrc ? (
          <img
            key={activeIdx}
            src={mainSrc}
            alt={mainAlt}
            loading="lazy"
            onLoad={() => setImgLoaded(true)}
            className={cn(
              "w-full h-full object-cover transition-opacity duration-300",
              transitioning || !imgLoaded ? "opacity-0" : "opacity-100",
            )}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl bg-muted text-muted-foreground">
            🏳️‍🌈
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {safeImages.length > 1 && (
        <div
          ref={thumbsRef}
          className="flex gap-2 overflow-x-auto pb-1 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
          data-ocid="product.gallery_thumbnails"
        >
          {safeImages.map((img, i) => (
            <button
              key={img.id ?? i}
              type="button"
              onClick={() => selectImage(i)}
              aria-label={`View image ${i + 1}`}
              data-ocid={`product.gallery_thumb.${i + 1}`}
              className={cn(
                "flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-smooth",
                i === activeIdx
                  ? "border-primary shadow-md scale-105"
                  : "border-border opacity-60 hover:opacity-90 hover:border-primary/50",
              )}
            >
              <img
                src={img.src}
                alt={img.alt || `${productName} ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// --- Description accordion ---
interface DescriptionAccordionProps {
  html: string;
  label: string;
}

function DescriptionAccordion({ html, label }: DescriptionAccordionProps) {
  const [open, setOpen] = useState(false);
  // Safely extract text — strip HTML tags
  const textOnly = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!textOnly) return null;

  return (
    <div
      className="border border-border rounded-xl overflow-hidden"
      data-ocid="product.description_accordion"
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-4 py-3 bg-card hover:bg-muted/50 transition-colors text-left"
        data-ocid="product.description_toggle"
        aria-expanded={open}
      >
        <span className="font-semibold text-sm text-foreground">{label}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="px-4 py-3 bg-background text-sm text-foreground/80 leading-relaxed border-t border-border">
          <div
            // biome-ignore lint/security/noDangerouslySetInnerHtml: WooCommerce content is trusted
            dangerouslySetInnerHTML={{ __html: html }}
            className="prose-sm max-w-none"
          />
        </div>
      )}
    </div>
  );
}

// --- Variation selectors ---
interface VariationsProps {
  attributes: Product["attributes"];
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

function VariationSelectors({
  attributes,
  selected,
  onChange,
}: VariationsProps) {
  if (!attributes?.length) return null;
  return (
    <div className="flex flex-col gap-3" data-ocid="product.variations">
      {attributes.map((attr) => (
        <div key={attr.id ?? attr.name} className="flex flex-col gap-1.5">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            {attr.name}
            {selected[attr.name] && (
              <span className="ml-2 text-foreground normal-case font-normal">
                — {selected[attr.name]}
              </span>
            )}
          </span>
          <div className="flex flex-wrap gap-2">
            {attr.options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => onChange(attr.name, option)}
                data-ocid="product.variation_option"
                className={cn(
                  "px-3 py-1.5 rounded-lg border text-sm font-medium transition-smooth",
                  selected[attr.name] === option
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border bg-card text-foreground hover:border-primary/50",
                )}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// --- Quantity selector ---
interface QtyProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (v: number) => void;
}

function QuantitySelector({ value, min = 1, max = 99, onChange }: QtyProps) {
  return (
    <div
      className="flex items-center gap-2 border border-border rounded-xl overflow-hidden bg-card"
      data-ocid="product.quantity_selector"
    >
      <button
        type="button"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        data-ocid="product.quantity_decrease"
        className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span
        className="w-10 text-center font-semibold text-foreground select-none"
        data-ocid="product.quantity_value"
      >
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        data-ocid="product.quantity_increase"
        className="flex items-center justify-center w-10 h-10 text-muted-foreground hover:text-foreground transition-colors disabled:opacity-40"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

// --- Related products ---
interface RelatedProps {
  categoryId?: number;
  currentProductId: number;
}

function RelatedProducts({ categoryId, currentProductId }: RelatedProps) {
  const { data: products, isLoading } = useProducts({
    category: categoryId?.toString(),
    perPage: 8,
  });

  const related =
    products?.filter((p) => p.id !== currentProductId).slice(0, 6) ?? [];

  if (!isLoading && !related.length) return null;

  return (
    <section className="mt-10" data-ocid="product.related_section">
      <h2 className="text-xl font-display font-bold text-foreground mb-4">
        You may also like
      </h2>
      {isLoading ? (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 4 }).map((_, i) => (
            // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
            <div key={i} className="flex-shrink-0 w-44">
              <Skeleton className="aspect-square w-full rounded-xl" />
              <Skeleton className="h-4 mt-2 rounded" />
              <Skeleton className="h-3 mt-1 w-16 rounded" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 overflow-x-auto">
          {related.map((p, i) => (
            <ProductCard key={p.id} product={p} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}

// --- Loading skeleton ---
function ProductDetailSkeleton() {
  return (
    <div
      className="max-w-5xl mx-auto px-4 py-6"
      data-ocid="product.loading_state"
    >
      <Skeleton className="h-4 w-48 mb-5 rounded" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Skeleton className="aspect-square w-full rounded-2xl" />
          <div className="flex gap-2 mt-3">
            {Array.from({ length: 4 }).map((_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton list
              <Skeleton key={i} className="w-16 h-16 rounded-xl" />
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <Skeleton className="h-8 w-3/4 rounded" />
          <Skeleton className="h-6 w-24 rounded" />
          <Skeleton className="h-4 w-full rounded" />
          <Skeleton className="h-4 w-5/6 rounded" />
          <Skeleton className="h-4 w-4/6 rounded" />
          <div className="flex gap-3 mt-4">
            <Skeleton className="h-12 flex-1 rounded-xl" />
            <Skeleton className="h-12 w-12 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Main Page ---
export default function ProductDetail() {
  const { slug } = useParams({ from: "/products/$slug" });
  const { data: product, isLoading, isError } = useProduct(slug);
  const { addItem } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const { showToast } = useToast();

  const [quantity, setQuantity] = useState(1);
  const [selectedAttrs, setSelectedAttrs] = useState<Record<string, string>>(
    {},
  );
  const [adding, setAdding] = useState(false);

  // Initialize attribute selection with first option
  useEffect(() => {
    if (product?.attributes?.length) {
      const defaults: Record<string, string> = {};
      for (const attr of product.attributes) {
        if (attr.options?.[0]) defaults[attr.name] = attr.options[0];
      }
      setSelectedAttrs(defaults);
    }
  }, [product]);

  if (isLoading) return <ProductDetailSkeleton />;

  if (isError || !product) {
    return (
      <div
        className="max-w-5xl mx-auto px-4 py-12"
        data-ocid="product.error_state"
      >
        <EmptyState
          icon={<Package className="h-8 w-8" />}
          title="Product not found"
          description="This product may have been removed or the link is incorrect."
          ctaLabel="Browse Products"
          ctaHref="/products"
        />
      </div>
    );
  }

  // product is guaranteed non-null here — guarded above by the early return
  const safeProduct = product;

  const isSale =
    !!safeProduct.salePrice &&
    safeProduct.salePrice !== "" &&
    safeProduct.salePrice !== safeProduct.regularPrice;
  const displayPrice = isSale ? safeProduct.salePrice : safeProduct.price;
  const hasStock = safeProduct.stockStatus !== "outofstock";
  const inWishlist = isInWishlist(safeProduct.id);
  const primaryCategory = safeProduct.categories?.[0];

  function handleAttrChange(name: string, value: string) {
    setSelectedAttrs((prev) => ({ ...prev, [name]: value }));
  }

  function handleAddToCart() {
    if (!hasStock) return;
    setAdding(true);
    addItem(safeProduct, quantity, undefined, selectedAttrs);
    showToast(`${safeProduct.name} added to cart!`, "success");
    setTimeout(() => setAdding(false), 700);
  }

  function handleWishlist() {
    toggleWishlist(safeProduct.id);
    showToast(
      inWishlist ? "Removed from wishlist" : "Added to wishlist",
      inWishlist ? "info" : "success",
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 pb-16" data-ocid="product.page">
      {/* Breadcrumb + Back */}
      <div className="flex items-center justify-between mb-5 flex-wrap gap-2">
        <nav
          className="flex items-center gap-1.5 text-xs text-muted-foreground flex-wrap"
          aria-label="Breadcrumb"
          data-ocid="product.breadcrumb"
        >
          <Link to="/" className="hover:text-foreground transition-colors">
            Home
          </Link>
          <span className="opacity-40">/</span>
          {primaryCategory ? (
            <>
              <Link
                to="/categories/$slug"
                params={{ slug: primaryCategory.slug }}
                search={{ orderby: undefined, page: undefined }}
                className="hover:text-foreground transition-colors"
              >
                {primaryCategory.name}
              </Link>
              <span className="opacity-40">/</span>
            </>
          ) : (
            <>
              <Link
                to="/products"
                search={{
                  search: undefined,
                  category: undefined,
                  orderby: undefined,
                  page: undefined,
                }}
                className="hover:text-foreground transition-colors"
              >
                Products
              </Link>
              <span className="opacity-40">/</span>
            </>
          )}
          <span className="text-foreground font-medium line-clamp-1 max-w-[180px]">
            {safeProduct.name}
          </span>
        </nav>
        <Link
          to="/products"
          search={{
            search: undefined,
            category: undefined,
            orderby: undefined,
            page: undefined,
          }}
          data-ocid="product.back_link"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
        >
          ← Back to Products
        </Link>
      </div>

      {/* Main layout: gallery + info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Gallery */}
        <div>
          <ImageGallery
            images={safeProduct.images}
            productName={safeProduct.name}
          />
        </div>

        {/* Product info */}
        <div className="flex flex-col gap-4" data-ocid="product.info_section">
          {/* Name */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              {isSale && (
                <span
                  className="badge-pride text-xs"
                  data-ocid="product.sale_badge"
                >
                  Sale
                </span>
              )}
              <Badge
                variant="outline"
                data-ocid="product.stock_badge"
                className={cn(
                  "text-xs font-semibold",
                  hasStock
                    ? "border-green-500/40 text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/30"
                    : "border-border text-muted-foreground bg-muted",
                )}
              >
                {hasStock ? "In Stock" : "Out of Stock"}
              </Badge>
            </div>
            <h1
              className="font-display font-bold text-2xl sm:text-3xl text-foreground leading-tight"
              data-ocid="product.title"
            >
              {safeProduct.name}
            </h1>
          </div>

          {/* Price */}
          <div
            className="flex items-baseline gap-2.5"
            data-ocid="product.price"
          >
            <span className="text-2xl font-bold text-foreground">
              ${displayPrice}
            </span>
            {isSale && safeProduct.regularPrice && (
              <span className="text-base text-muted-foreground line-through">
                ${safeProduct.regularPrice}
              </span>
            )}
          </div>

          {/* Short description */}
          {safeProduct.shortDescription && (
            <div
              className="text-sm text-foreground/75 leading-relaxed [&_ul]:list-disc [&_ul]:pl-4 [&_p]:mb-1"
              data-ocid="product.short_description"
              // biome-ignore lint/security/noDangerouslySetInnerHtml: WooCommerce content is trusted
              dangerouslySetInnerHTML={{ __html: safeProduct.shortDescription }}
            />
          )}

          <div className="h-px bg-border" />

          {/* Variation selectors */}
          {safeProduct.attributes?.length > 0 && (
            <VariationSelectors
              attributes={safeProduct.attributes}
              selected={selectedAttrs}
              onChange={handleAttrChange}
            />
          )}

          {/* Quantity + Add to cart */}
          <div
            className="flex items-center gap-3 flex-wrap"
            data-ocid="product.add_to_cart_section"
          >
            <QuantitySelector
              value={quantity}
              min={1}
              max={99}
              onChange={setQuantity}
            />

            <Button
              type="button"
              onClick={handleAddToCart}
              disabled={!hasStock || adding}
              data-ocid="product.add_to_cart_button"
              className={cn(
                "btn-pride flex-1 min-w-[140px] h-12 text-base gap-2 flex items-center justify-center",
                !hasStock && "opacity-50 cursor-not-allowed",
              )}
            >
              <ShoppingCart className="h-5 w-5" />
              {adding ? "Added!" : hasStock ? "Add to Cart" : "Out of Stock"}
            </Button>

            {/* Wishlist */}
            <button
              type="button"
              onClick={handleWishlist}
              aria-label={
                inWishlist ? "Remove from wishlist" : "Add to wishlist"
              }
              data-ocid="product.wishlist_button"
              className={cn(
                "flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-xl border-2 transition-smooth",
                inWishlist
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-primary",
              )}
            >
              <Heart className={cn("h-5 w-5", inWishlist && "fill-primary")} />
            </button>
          </div>

          <div className="h-px bg-border" />

          {/* Full description accordion */}
          {safeProduct.description && (
            <DescriptionAccordion
              html={safeProduct.description}
              label="Product Description"
            />
          )}
        </div>
      </div>

      {/* Related products */}
      {primaryCategory && (
        <RelatedProducts
          categoryId={primaryCategory.id}
          currentProductId={safeProduct.id}
        />
      )}
    </div>
  );
}
