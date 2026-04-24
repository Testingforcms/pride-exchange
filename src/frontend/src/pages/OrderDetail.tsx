import { createActor } from "@/backend";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useOrder } from "@/hooks/useOrder";
import type { Address, WooOrder } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  Home,
  Loader2,
  MapPin,
  Package,
  PackageCheck,
  RefreshCw,
  Truck,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  pending: {
    label: "Pending",
    className:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
  },
  processing: {
    label: "Processing",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800",
  },
  "on-hold": {
    label: "On Hold",
    className:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300 border-orange-200 dark:border-orange-800",
  },
  completed: {
    label: "Completed",
    className:
      "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-200 dark:border-green-800",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-muted text-muted-foreground border-border",
  },
  refunded: {
    label: "Refunded",
    className:
      "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800",
  },
  failed: {
    label: "Failed",
    className:
      "bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-200 dark:border-red-800",
  },
};

function StatusBadge({ status }: { status: string }) {
  const config = STATUS_CONFIG[status] ?? {
    label: status,
    className: "bg-muted text-muted-foreground border-border",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${config.className}`}
    >
      {config.label}
    </span>
  );
}

// --- Status Timeline ---
interface TimelineStep {
  key: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TIMELINE_STEPS: TimelineStep[] = [
  { key: "placed", label: "Order Placed", icon: Package },
  { key: "processing", label: "Processing", icon: Loader2 },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: PackageCheck },
];

function getTimelineProgress(status: string): number {
  const map: Record<string, number> = {
    pending: 1,
    "on-hold": 1,
    processing: 2,
    completed: 4,
    cancelled: -1,
    refunded: -1,
    failed: -1,
  };
  return map[status] ?? 1;
}

function StatusTimeline({ status }: { status: string }) {
  const isCancelled =
    status === "cancelled" || status === "refunded" || status === "failed";
  const progress = getTimelineProgress(status);

  if (isCancelled) {
    return (
      <div className="flex items-center gap-3 py-4">
        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
          <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <p className="font-semibold text-foreground capitalize">{status}</p>
          <p className="text-xs text-muted-foreground">
            This order has been {status}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Connecting line */}
      <div
        className="absolute top-5 left-5 h-0.5 bg-border"
        style={{ right: "1.25rem" }}
      />
      <div
        className="absolute top-5 left-5 h-0.5 bg-primary transition-all duration-700"
        style={{
          width: `calc(${Math.min(((progress - 1) / (TIMELINE_STEPS.length - 1)) * 100, 100)}% - 0.5rem)`,
        }}
      />

      <div className="relative flex justify-between">
        {TIMELINE_STEPS.map((step, idx) => {
          const stepNum = idx + 1;
          const isDone = stepNum < progress;
          const isCurrent = stepNum === progress;
          const isPending = stepNum > progress;

          return (
            <div
              key={step.key}
              className="flex flex-col items-center gap-2 flex-1"
            >
              <div
                data-ocid={`order_detail.timeline_step.${stepNum}`}
                className={[
                  "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 relative",
                  isDone
                    ? "bg-primary border-primary"
                    : isCurrent
                      ? "bg-primary border-primary ring-4 ring-primary/20"
                      : "bg-background border-border",
                ].join(" ")}
              >
                {isDone ? (
                  <CheckCircle2 className="w-5 h-5 text-primary-foreground" />
                ) : isCurrent ? (
                  <step.icon
                    className={[
                      "w-4 h-4 text-primary-foreground",
                      isCurrent && step.key === "processing"
                        ? "animate-spin"
                        : "",
                    ].join(" ")}
                  />
                ) : (
                  <step.icon className="w-4 h-4 text-muted-foreground" />
                )}
                {isCurrent && (
                  <span className="absolute inset-0 rounded-full animate-ping bg-primary/30" />
                )}
              </div>
              <span
                className={[
                  "text-xs font-medium text-center leading-tight",
                  isPending ? "text-muted-foreground" : "text-foreground",
                ].join(" ")}
              >
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- Address Card ---
function AddressCard({ title, address }: { title: string; address: Address }) {
  const hasAddress =
    address.address1 || address.city || address.firstName || address.lastName;
  if (!hasAddress) return null;

  return (
    <Card className="border-border bg-card">
      <CardHeader className="pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-semibold text-muted-foreground flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="text-sm text-foreground space-y-0.5">
          <p className="font-medium">
            {address.firstName} {address.lastName}
          </p>
          {address.address1 && (
            <p className="text-muted-foreground">{address.address1}</p>
          )}
          {address.address2 && (
            <p className="text-muted-foreground">{address.address2}</p>
          )}
          <p className="text-muted-foreground">
            {[address.city, address.state, address.postcode]
              .filter(Boolean)
              .join(", ")}
          </p>
          {address.country && (
            <p className="text-muted-foreground">{address.country}</p>
          )}
          {address.phone && (
            <p className="text-muted-foreground mt-1">{address.phone}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

// --- Payment Method ---
function PaymentMethodDisplay({ method }: { method: string }) {
  const isStripe =
    method.toLowerCase().includes("stripe") || method === "stripe";
  const isPayPal =
    method.toLowerCase().includes("paypal") ||
    method === "ppcp-gateway" ||
    method === "paypal";

  return (
    <div className="flex items-center gap-3">
      <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
        <CreditCard className="w-5 h-5 text-muted-foreground" />
      </div>
      <div>
        <p className="text-sm font-medium text-foreground">
          {isStripe ? "Stripe" : isPayPal ? "PayPal" : method || "Unknown"}
        </p>
        <p className="text-xs text-muted-foreground">
          {isStripe
            ? "Credit / Debit Card"
            : isPayPal
              ? "PayPal Account"
              : "Payment method"}
        </p>
      </div>
    </div>
  );
}

// --- Order Detail Skeleton ---
function DetailSkeleton() {
  return (
    <div
      data-ocid="order_detail.loading_state"
      className="space-y-4 animate-pulse"
    >
      <Skeleton className="h-6 w-48" />
      <Skeleton className="h-4 w-32" />
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <div className="grid grid-cols-2 gap-4">
        <Skeleton className="h-32 rounded-xl" />
        <Skeleton className="h-32 rounded-xl" />
      </div>
    </div>
  );
}

// --- Main Page ---
export default function OrderDetail() {
  const { id } = useParams({ from: "/orders/$id" });
  const navigate = useNavigate();
  const qc = useQueryClient();
  const orderId = Number.parseInt(id, 10);
  const { actor } = useActor(createActor);

  const {
    data: order,
    isLoading,
    isError,
    refetch,
  } = useOrder(Number.isNaN(orderId) ? null : orderId);

  const [isCancelling, setIsCancelling] = useState(false);

  const canCancel =
    order && (order.status === "pending" || order.status === "processing");

  async function handleCancel() {
    if (!order || !actor) return;
    setIsCancelling(true);
    try {
      const result = await actor.cancelOrder(BigInt(order.id));
      if (result.__kind__ === "err") throw new Error(result.err);
      await qc.invalidateQueries({ queryKey: ["order", order.id] });
      await qc.invalidateQueries({ queryKey: ["orders"] });
      toast.success("Order cancelled successfully");
    } catch {
      toast.error("Failed to cancel order. Please try again.");
    } finally {
      setIsCancelling(false);
    }
  }

  const date = order
    ? new Date(order.dateCreated).toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const subtotal = order
    ? order.lineItems.reduce((s, i) => s + Number.parseFloat(i.total), 0)
    : 0;

  return (
    <div className="min-h-screen bg-background">
      {/* Header bar */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            data-ocid="order_detail.back_button"
            onClick={() => navigate({ to: "/orders" })}
            className="gap-1.5 text-muted-foreground hover:text-foreground -ml-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back to Orders</span>
          </Button>

          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground ml-auto"
          >
            <button
              type="button"
              onClick={() => navigate({ to: "/" })}
              className="hover:text-foreground transition-colors flex items-center gap-1"
            >
              <Home className="w-3 h-3" />
              Home
            </button>
            <ChevronRight className="w-3 h-3" />
            <button
              type="button"
              onClick={() => navigate({ to: "/orders" })}
              className="hover:text-foreground transition-colors"
            >
              My Orders
            </button>
            <ChevronRight className="w-3 h-3" />
            <span className="text-foreground font-medium">
              {order ? `Order #${order.id}` : "Loading…"}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 space-y-5">
        {isLoading && <DetailSkeleton />}

        {isError && !isLoading && (
          <div
            data-ocid="order_detail.error_state"
            className="flex flex-col items-center justify-center gap-4 py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-lg text-foreground">
                Could not load order
              </h3>
              <p className="text-sm text-muted-foreground">
                Failed to fetch order details. Please try again.
              </p>
            </div>
            <Button
              data-ocid="order_detail.retry_button"
              onClick={() => void refetch()}
              className="btn-pride gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        )}

        {!isLoading && !isError && !order && (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Order not found.</p>
            <Button
              variant="link"
              onClick={() => navigate({ to: "/orders" })}
              className="mt-2 text-primary"
            >
              Back to orders
            </Button>
          </div>
        )}

        {order && (
          <>
            {/* Order header */}
            <Card
              data-ocid="order_detail.header"
              className="border-border bg-card"
            >
              <CardContent className="p-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h1 className="font-display font-bold text-xl text-foreground">
                        Order #{order.id}
                      </h1>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-muted-foreground">Order Total</p>
                    <p className="font-display font-bold text-2xl text-foreground">
                      ${Number.parseFloat(order.total).toFixed(2)}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Status timeline */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Order Status
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <StatusTimeline status={order.status} />
              </CardContent>
            </Card>

            {/* Items table */}
            <Card
              data-ocid="order_detail.items_section"
              className="border-border bg-card"
            >
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  {order.lineItems.length}{" "}
                  {order.lineItems.length === 1 ? "Item" : "Items"}
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-0">
                <div className="divide-y divide-border">
                  {order.lineItems.map((item, idx) => (
                    <div
                      key={`${item.productId}-${idx}`}
                      data-ocid={`order_detail.item.${idx + 1}`}
                      className="flex items-center gap-3 py-3"
                    >
                      {/* Product thumbnail placeholder */}
                      <div className="w-14 h-14 rounded-lg bg-muted shrink-0 flex items-center justify-center overflow-hidden">
                        <Package className="w-6 h-6 text-muted-foreground" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">
                          {item.name}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          Qty: {item.quantity} × $
                          {Number.parseFloat(item.price).toFixed(2)}
                        </p>
                      </div>
                      <p className="text-sm font-semibold text-foreground shrink-0">
                        ${Number.parseFloat(item.total).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>

              {/* Order totals */}
              <div className="px-5 py-4 border-t border-border space-y-2">
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {Number.parseFloat(order.total) < subtotal && (
                  <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                    <span>Discount</span>
                    <span>
                      −${(subtotal - Number.parseFloat(order.total)).toFixed(2)}
                    </span>
                  </div>
                )}
                <Separator className="my-2" />
                <div className="flex justify-between font-display font-bold text-foreground text-base">
                  <span>Total</span>
                  <span>${Number.parseFloat(order.total).toFixed(2)}</span>
                </div>
              </div>
            </Card>

            {/* Addresses */}
            <div
              data-ocid="order_detail.addresses_section"
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              <AddressCard title="Billing Address" address={order.billing} />
              <AddressCard title="Shipping Address" address={order.shipping} />
            </div>

            {/* Payment method */}
            <Card
              data-ocid="order_detail.payment_section"
              className="border-border bg-card"
            >
              <CardHeader className="pb-2 pt-4 px-5">
                <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                  Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent className="px-5 pb-5">
                <PaymentMethodDisplay method={order.paymentMethod} />
              </CardContent>
            </Card>

            {/* Cancel order */}
            {canCancel && (
              <div data-ocid="order_detail.cancel_section" className="pb-6">
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      data-ocid="order_detail.cancel_button"
                      className="w-full border-destructive text-destructive hover:bg-destructive/10 gap-2"
                      disabled={isCancelling}
                    >
                      {isCancelling ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <XCircle className="w-4 h-4" />
                      )}
                      Cancel Order
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent data-ocid="order_detail.dialog">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Cancel this order?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Order #{order.id} will be cancelled. This action cannot
                        be undone. If you've already been charged, a refund may
                        take 3–5 business days.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-ocid="order_detail.cancel_button.confirm_cancel">
                        Keep Order
                      </AlertDialogCancel>
                      <AlertDialogAction
                        data-ocid="order_detail.confirm_button"
                        onClick={() => void handleCancel()}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Yes, Cancel Order
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
