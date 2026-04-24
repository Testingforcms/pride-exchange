import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrder } from "@/hooks/useOrder";
import type { Address, WooOrder } from "@/types";
import { Link, useParams, useSearch } from "@tanstack/react-router";
import {
  CheckCircle,
  MapPin,
  Package,
  ShoppingBag,
  XCircle,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ── Status badge ─────────────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  pending: "bg-muted text-muted-foreground",
  processing: "bg-secondary/20 text-secondary",
  "on-hold": "bg-accent/20 text-accent",
  completed: "bg-primary/20 text-primary",
  cancelled: "bg-destructive/20 text-destructive-foreground",
  refunded: "bg-muted text-muted-foreground",
  failed: "bg-destructive/20 text-destructive-foreground",
};

function OrderStatusBadge({ status }: { status: string }) {
  const style = STATUS_STYLES[status] ?? "bg-muted text-muted-foreground";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize ${style}`}
    >
      {status}
    </span>
  );
}

// ── Address block ─────────────────────────────────────────────────────────────
function AddressBlock({ label, addr }: { label: string; addr: Address }) {
  return (
    <div className="space-y-1">
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-1">
        <MapPin className="w-3 h-3" /> {label}
      </p>
      <p className="text-sm text-foreground font-medium">
        {addr.firstName} {addr.lastName}
      </p>
      <p className="text-sm text-muted-foreground">{addr.address1}</p>
      <p className="text-sm text-muted-foreground">
        {addr.city}, {addr.state} {addr.postcode}
      </p>
      <p className="text-sm text-muted-foreground">{addr.country}</p>
      {addr.email && (
        <p className="text-sm text-muted-foreground">{addr.email}</p>
      )}
      {addr.phone && (
        <p className="text-sm text-muted-foreground">{addr.phone}</p>
      )}
    </div>
  );
}

// ── Skeleton loader ───────────────────────────────────────────────────────────
function ConfirmationSkeleton() {
  return (
    <div
      className="max-w-2xl mx-auto px-4 py-8 space-y-6"
      data-ocid="order_confirmation.loading_state"
    >
      <div className="text-center space-y-3">
        <Skeleton className="w-16 h-16 rounded-full mx-auto" />
        <Skeleton className="h-7 w-56 mx-auto" />
        <Skeleton className="h-4 w-80 mx-auto" />
      </div>
      <Skeleton className="h-40 w-full rounded-xl" />
      <Skeleton className="h-32 w-full rounded-xl" />
    </div>
  );
}

// ── Error state ───────────────────────────────────────────────────────────────
function ErrorState({ orderId }: { orderId: string }) {
  return (
    <div
      className="max-w-2xl mx-auto px-4 py-16 text-center space-y-4"
      data-ocid="order_confirmation.error_state"
    >
      <div className="text-5xl">📦</div>
      <h2 className="text-xl font-display font-bold text-foreground">
        Order #{orderId} not found
      </h2>
      <p className="text-sm text-muted-foreground">
        We couldn't load your order details. Your order may still be processing.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          asChild
          variant="outline"
          data-ocid="order_confirmation.view_orders_button"
        >
          <Link to="/orders">View All Orders</Link>
        </Button>
        <Button asChild data-ocid="order_confirmation.continue_shopping_button">
          <Link
            to="/products"
            search={{
              search: undefined,
              category: undefined,
              orderby: undefined,
              page: undefined,
            }}
          >
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}

// ── Stripe Pending State — polls backend until session is complete or expired ──
type StripePollingStatus = "polling" | "complete" | "expired" | "error";

function StripePendingView({ sessionId }: { sessionId: string }) {
  const [status, setStatus] = useState<StripePollingStatus>("polling");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!sessionId) {
      setStatus("error");
      setErrorMsg("Missing Stripe session ID.");
      return;
    }

    async function poll() {
      try {
        const { createActor } = await import("@/backend");
        const { HttpAgent } = await import("@icp-sdk/core/agent");
        const envJson = (await fetch("/env.json").then((r) => r.json())) as {
          CANISTER_ID_BACKEND?: string;
          DFX_NETWORK?: string;
        };
        const canisterId = envJson.CANISTER_ID_BACKEND ?? "";
        const isLocal = envJson.DFX_NETWORK !== "ic";
        const agent = HttpAgent.createSync({
          host: isLocal ? "http://localhost:4943" : "https://ic0.app",
        });
        if (isLocal) await agent.fetchRootKey();
        const noopUpload = async (_f: unknown) => new Uint8Array();
        const noopDownload = async (_f: unknown) =>
          ({
            directURL: "",
            getBytes: async () => new Uint8Array(),
            getDirectURL: () => "",
          }) as never;
        const actor = createActor(canisterId, noopUpload, noopDownload, {
          agent,
        });
        const result = await actor.getStripeSessionStatus(sessionId);

        if (result.__kind__ === "completed") {
          setStatus("complete");
          if (intervalRef.current) clearInterval(intervalRef.current);
        } else if (result.__kind__ === "failed") {
          setStatus("expired");
          setErrorMsg(result.failed.error);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      } catch (e) {
        setStatus("error");
        setErrorMsg(e instanceof Error ? e.message : "Unknown error");
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    }

    void poll();
    intervalRef.current = setInterval(() => void poll(), 3000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sessionId]);

  if (status === "polling") {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6"
        data-ocid="order_confirmation.stripe_polling"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10">
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Confirming your payment…
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Please wait while we confirm your Stripe payment. This usually takes
            a few seconds.
          </p>
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            variant="outline"
            data-ocid="order_confirmation.view_orders_button"
          >
            <Link to="/orders">View My Orders</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (status === "complete") {
    return (
      <div
        className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6"
        data-ocid="order_confirmation.stripe_complete"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center space-y-4"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-display font-bold text-foreground">
            Payment confirmed!
          </h1>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Your payment was successful and your order is being processed.
            You'll receive updates by email.
          </p>
        </motion.div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            asChild
            variant="outline"
            data-ocid="order_confirmation.view_orders_button"
          >
            <Link to="/orders">View My Orders</Link>
          </Button>
          <Button
            asChild
            className="btn-pride"
            data-ocid="order_confirmation.continue_shopping_button"
          >
            <Link
              to="/products"
              search={{
                search: undefined,
                category: undefined,
                orderby: undefined,
                page: undefined,
              }}
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  // expired or error
  return (
    <div
      className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6"
      data-ocid="order_confirmation.stripe_failed"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive">
          <XCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Payment {status === "expired" ? "expired" : "failed"}
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          {errorMsg ||
            "Your payment session has expired or failed. Please try again."}
        </p>
      </motion.div>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          asChild
          className="btn-pride"
          data-ocid="order_confirmation.try_again_button"
        >
          <Link to="/checkout">Try Again</Link>
        </Button>
        <Button
          asChild
          variant="outline"
          data-ocid="order_confirmation.continue_shopping_button"
        >
          <Link
            to="/products"
            search={{
              search: undefined,
              category: undefined,
              orderby: undefined,
              page: undefined,
            }}
          >
            Continue Shopping
          </Link>
        </Button>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────────────────────
export default function OrderConfirmation() {
  const { id } = useParams({ from: "/order-confirmation/$id" });
  // Stripe redirect appends ?session_id=xxx to the URL
  const search = useSearch({ from: "/order-confirmation/$id" });
  const sessionId = (search as Record<string, string>).session_id ?? "";

  const isStripePending = id === "stripe-pending";

  const orderId = isStripePending ? null : Number.parseInt(id, 10);

  const {
    data: order,
    isLoading,
    isError,
  } = useOrder(isStripePending ? null : orderId);

  // Stripe pending: show polling UI
  if (isStripePending) {
    return <StripePendingView sessionId={sessionId} />;
  }

  if (isLoading) return <ConfirmationSkeleton />;
  if (isError || (!order && !isLoading)) {
    return <ErrorState orderId={id} />;
  }

  return (
    <div
      className="max-w-2xl mx-auto px-4 py-8 space-y-6"
      data-ocid="order_confirmation.page"
    >
      {/* Success hero */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="text-center space-y-3"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
          <CheckCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-display font-bold text-foreground">
          Thank you for your order!
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          Your order is being processed. You'll receive updates by email.
        </p>
        <div className="inline-flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/60 px-3 py-1.5 rounded-full">
          <Package className="w-3.5 h-3.5" />
          Estimated delivery: 5–10 business days
        </div>
      </motion.div>

      {order && (
        <>
          {/* Order meta */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.35 }}
            className="bg-card border border-border rounded-xl p-5 space-y-4"
            data-ocid="order_confirmation.order_card"
          >
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <p className="text-xs text-muted-foreground">Order</p>
                <p className="font-display font-bold text-foreground text-lg">
                  #{order.id}
                </p>
              </div>
              <OrderStatusBadge status={order.status} />
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-xs text-muted-foreground">Payment</p>
                <p className="font-medium text-foreground capitalize">
                  {order.paymentMethod || "—"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Date</p>
                <p className="font-medium text-foreground">
                  {order.dateCreated
                    ? new Date(order.dateCreated).toLocaleDateString()
                    : "—"}
                </p>
              </div>
            </div>

            <Separator />

            {/* Line items */}
            <div className="space-y-2">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                Items
              </p>
              {order.lineItems.map((li, idx) => (
                <div
                  key={`${li.productId}-${idx}`}
                  className="flex justify-between items-center gap-2"
                  data-ocid={`order_confirmation.item.${idx + 1}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">
                      {li.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      ×{li.quantity}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-foreground flex-shrink-0">
                    ${Number.parseFloat(li.total).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <Separator />

            <div className="flex justify-between items-center">
              <span className="font-semibold text-foreground">Total</span>
              <span className="text-lg font-bold text-primary">
                ${Number.parseFloat(order.total).toFixed(2)}
              </span>
            </div>
          </motion.div>

          {/* Addresses */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.35 }}
            className="bg-card border border-border rounded-xl p-5 grid grid-cols-1 sm:grid-cols-2 gap-6"
            data-ocid="order_confirmation.addresses"
          >
            {order.billing && (
              <AddressBlock label="Billing Address" addr={order.billing} />
            )}
            {order.shipping && (
              <AddressBlock label="Shipping Address" addr={order.shipping} />
            )}
          </motion.div>

          {/* Actions */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Button
              asChild
              variant="outline"
              className="flex-1"
              data-ocid="order_confirmation.view_order_button"
            >
              <Link to="/orders/$id" params={{ id: String(order.id) }}>
                <Package className="w-4 h-4 mr-2" />
                View Order Details
              </Link>
            </Button>
            <Button
              asChild
              className="flex-1 btn-pride"
              data-ocid="order_confirmation.continue_shopping_button"
            >
              <Link
                to="/products"
                search={{
                  search: undefined,
                  category: undefined,
                  orderby: undefined,
                  page: undefined,
                }}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
          </motion.div>
        </>
      )}
    </div>
  );
}
