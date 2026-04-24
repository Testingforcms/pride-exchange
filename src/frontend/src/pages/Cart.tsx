import { createActor } from "@/backend";
import { EmptyState } from "@/components/EmptyState";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import type { Coupon } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Minus,
  Plus,
  ShoppingBag,
  ShoppingCart,
  Tag,
  Trash2,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

function calcDiscount(coupon: Coupon, subtotal: number): number {
  const amount = Number.parseFloat(coupon.amount || "0");
  if (coupon.discountType === "percent") {
    return (subtotal * amount) / 100;
  }
  return Math.min(amount, subtotal);
}

interface ProductImageProps {
  src?: string;
  alt: string;
}

function ProductImage({ src, alt }: ProductImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div className="relative w-[60px] h-[60px] rounded-lg overflow-hidden bg-muted flex-shrink-0">
      {!loaded && !error && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      {src && !error ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className={`w-full h-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-muted-foreground">
          <ShoppingBag size={20} />
        </div>
      )}
    </div>
  );
}

export default function Cart() {
  const navigate = useNavigate();
  const {
    items,
    itemCount,
    subtotal,
    coupon: appliedCoupon,
    updateQuantity,
    removeItem,
    applyCoupon,
    removeCoupon,
  } = useCart();
  const { isLoggedIn } = useAuth();
  const { actor } = useActor(createActor);

  const [couponCode, setCouponCode] = useState("");
  const [couponData, setCouponData] = useState<Coupon | null>(null);
  const [couponLoading, setCouponLoading] = useState(false);
  const [guestBannerDismissed, setGuestBannerDismissed] = useState(false);
  const bannerKey = "tpe_guest_banner_dismissed";

  useEffect(() => {
    const dismissed = sessionStorage.getItem(bannerKey);
    if (dismissed) setGuestBannerDismissed(true);
  }, []);

  // Pre-populate coupon input from applied coupon
  useEffect(() => {
    if (appliedCoupon?.code) {
      setCouponCode(appliedCoupon.code);
    }
  }, [appliedCoupon]);

  const inputRef = useRef<HTMLInputElement>(null);

  function handleDismissBanner() {
    setGuestBannerDismissed(true);
    sessionStorage.setItem(bannerKey, "1");
  }

  async function handleApplyCoupon() {
    const code = couponCode.trim();
    if (!code) return;

    setCouponLoading(true);
    try {
      if (!actor) throw new Error("Not connected");
      const result = await actor.validateCoupon(code);
      if (result.__kind__ === "err") {
        toast.error("Invalid coupon code. Please check and try again.");
        setCouponData(null);
        return;
      }
      const c = result.ok;
      // Check minimum amount
      if (c.minimumAmount && Number.parseFloat(c.minimumAmount) > subtotal) {
        toast.error(
          `This coupon requires a minimum order of $${Number.parseFloat(c.minimumAmount).toFixed(2)}.`,
        );
        return;
      }
      setCouponData(c);
      applyCoupon(code);
      toast.success(`Coupon "${code.toUpperCase()}" applied!`);
    } catch {
      toast.error("Failed to validate coupon. Please try again.");
    } finally {
      setCouponLoading(false);
    }
  }

  function handleRemoveCoupon() {
    setCouponData(null);
    removeCoupon();
    setCouponCode("");
    toast.info("Coupon removed.");
  }

  const discount = couponData ? calcDiscount(couponData, subtotal) : 0;
  const orderTotal = Math.max(0, subtotal - discount);

  function handleCheckout() {
    if (!isLoggedIn) {
      navigate({ to: "/login", search: { returnUrl: "/checkout" } });
    } else {
      navigate({ to: "/checkout" });
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <EmptyState
          data-ocid="cart.empty_state"
          icon={<ShoppingCart size={36} />}
          title="Your cart is empty"
          description="Looks like you haven't added anything yet. Start browsing and find something you love."
          ctaLabel="Browse Products"
          ctaHref="/products"
        />
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 sm:py-10">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3" data-ocid="cart.page">
        <ShoppingCart size={24} className="text-primary" />
        <h1 className="text-2xl font-display font-bold text-foreground">
          Your Cart
        </h1>
        <Badge variant="secondary" className="ml-1 text-xs">
          {itemCount} {itemCount === 1 ? "item" : "items"}
        </Badge>
      </div>

      {/* Guest banner */}
      <AnimatePresence>
        {!isLoggedIn && !guestBannerDismissed && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            data-ocid="cart.guest_banner"
            className="mb-5 flex items-start sm:items-center justify-between gap-3 px-4 py-3 rounded-lg bg-accent/10 border border-accent/30 text-sm text-foreground"
          >
            <p>
              <span className="font-semibold text-accent">Tip:</span> Log in to
              save your cart across devices and access exclusive member
              benefits.
            </p>
            <button
              type="button"
              aria-label="Dismiss"
              onClick={handleDismissBanner}
              data-ocid="cart.guest_banner.close_button"
              className="text-muted-foreground hover:text-foreground flex-shrink-0 transition-colors duration-200"
            >
              <X size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Cart items */}
        <div className="flex-1 min-w-0 space-y-3" data-ocid="cart.list">
          <AnimatePresence initial={false}>
            {items.map((item, index) => {
              const price = Number.parseFloat(
                item.product.salePrice || item.product.price || "0",
              );
              const lineTotal = price * item.quantity;
              const image = item.product.images?.[0];

              return (
                <motion.div
                  key={`${item.product.id}-${item.variationId ?? "base"}`}
                  layout
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 0,
                    x: 32,
                    height: 0,
                    marginTop: 0,
                    marginBottom: 0,
                  }}
                  transition={{ duration: 0.28, ease: "easeInOut" }}
                  data-ocid={`cart.item.${index + 1}`}
                  className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border shadow-sm"
                >
                  <ProductImage
                    src={image?.src}
                    alt={image?.alt ?? item.product.name}
                  />

                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold text-sm text-foreground truncate leading-snug"
                      title={item.product.name}
                    >
                      {item.product.name}
                    </p>

                    {item.selectedAttributes &&
                      Object.keys(item.selectedAttributes).length > 0 && (
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {Object.entries(item.selectedAttributes)
                            .map(([k, v]) => `${k}: ${v}`)
                            .join(" · ")}
                        </p>
                      )}

                    <p className="text-xs text-muted-foreground mt-0.5">
                      ${price.toFixed(2)} each
                    </p>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        type="button"
                        data-ocid={`cart.quantity_decrement.${index + 1}`}
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.variationId,
                          )
                        }
                        className="w-7 h-7 rounded-md border border-border bg-background text-foreground flex items-center justify-center hover:bg-muted transition-smooth disabled:opacity-40"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={12} />
                      </button>

                      <span
                        data-ocid={`cart.quantity_value.${index + 1}`}
                        className="w-8 text-center text-sm font-semibold text-foreground tabular-nums"
                      >
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        data-ocid={`cart.quantity_increment.${index + 1}`}
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.variationId,
                          )
                        }
                        className="w-7 h-7 rounded-md border border-border bg-background text-foreground flex items-center justify-center hover:bg-muted transition-smooth"
                      >
                        <Plus size={12} />
                      </button>

                      <span className="ml-auto text-sm font-bold text-foreground tabular-nums">
                        ${lineTotal.toFixed(2)}
                      </span>

                      <button
                        type="button"
                        data-ocid={`cart.delete_button.${index + 1}`}
                        aria-label={`Remove ${item.product.name}`}
                        onClick={() =>
                          removeItem(item.product.id, item.variationId)
                        }
                        className="w-7 h-7 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 flex items-center justify-center transition-smooth ml-1"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {/* Coupon section */}
          <div
            data-ocid="cart.coupon.section"
            className="mt-6 p-4 rounded-xl bg-card border border-border"
          >
            <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
              <Tag size={15} className="text-primary" />
              Coupon Code
            </div>

            {appliedCoupon?.code && couponData ? (
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-500/15 text-green-600 border-green-500/30 text-xs font-semibold px-3 py-1">
                    {appliedCoupon.code.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">
                    −${discount.toFixed(2)} discount
                  </span>
                </div>
                <button
                  type="button"
                  data-ocid="cart.coupon.remove_button"
                  onClick={handleRemoveCoupon}
                  className="text-xs text-destructive hover:underline transition-smooth"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="flex gap-2">
                <Input
                  ref={inputRef}
                  data-ocid="cart.coupon.input"
                  placeholder="Enter coupon code"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleApplyCoupon()}
                  className="flex-1 uppercase placeholder:normal-case text-sm"
                />
                <Button
                  data-ocid="cart.coupon.apply_button"
                  variant="outline"
                  className="px-4 text-sm font-semibold"
                  onClick={handleApplyCoupon}
                  disabled={couponLoading || !couponCode.trim()}
                >
                  {couponLoading ? (
                    <span className="flex items-center gap-1">
                      <span
                        className="w-3.5 h-3.5 rounded-full border-2 border-current border-t-transparent animate-spin"
                        aria-hidden
                      />
                      Applying…
                    </span>
                  ) : (
                    "Apply"
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Continue shopping */}
          <div className="pt-2">
            <Link
              to="/products"
              search={{
                search: undefined,
                category: undefined,
                orderby: undefined,
                page: undefined,
              }}
              data-ocid="cart.continue_shopping.link"
              className="text-sm text-primary hover:underline font-medium transition-smooth"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <div
          data-ocid="cart.order_summary"
          className="w-full lg:w-80 lg:sticky lg:top-24"
        >
          <div className="rounded-xl bg-card border border-border p-5 shadow-sm space-y-4">
            <h2 className="font-display font-bold text-base text-foreground">
              Order Summary
            </h2>

            <div className="space-y-2.5 text-sm">
              <div className="flex justify-between text-foreground">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium tabular-nums">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span className="font-medium tabular-nums">
                    −${discount.toFixed(2)}
                  </span>
                </div>
              )}

              <div className="flex justify-between text-foreground">
                <span className="text-muted-foreground">Est. Shipping</span>
                <span className="text-muted-foreground text-xs italic">
                  Calculated at checkout
                </span>
              </div>

              <div className="flex justify-between text-foreground">
                <span className="text-muted-foreground">Est. Tax</span>
                <span className="text-muted-foreground text-xs italic">
                  Calculated at checkout
                </span>
              </div>

              <div className="border-t border-border pt-2.5 flex justify-between text-foreground">
                <span className="font-bold text-base">Order Total</span>
                <span className="font-bold text-base tabular-nums text-primary">
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
            </div>

            <Button
              data-ocid="cart.checkout.primary_button"
              className="btn-pride w-full text-sm py-3 h-auto font-semibold"
              onClick={handleCheckout}
            >
              {isLoggedIn ? "Proceed to Checkout" : "Log in to Checkout"}
            </Button>

            {!isLoggedIn && (
              <p className="text-center text-xs text-muted-foreground">
                You'll be asked to log in before checkout.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
