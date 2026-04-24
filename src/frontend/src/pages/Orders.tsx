import { EmptyState } from "@/components/EmptyState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import type { WooOrder } from "@/types";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Package,
  RefreshCw,
  ShoppingBag,
} from "lucide-react";
import { useState } from "react";

const PER_PAGE = 10;

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
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${config.className}`}
    >
      {config.label}
    </span>
  );
}

function OrderCard({ order, index }: { order: WooOrder; index: number }) {
  const navigate = useNavigate();
  const date = new Date(order.dateCreated).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
  const itemCount = order.lineItems.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <Card
      data-ocid={`orders.item.${index + 1}`}
      className="card-hover cursor-pointer border-border bg-card group"
      onClick={() =>
        navigate({ to: "/orders/$id", params: { id: String(order.id) } })
      }
    >
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          {/* Left: order icon + info */}
          <div className="flex items-start gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Package className="w-5 h-5 text-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-display font-semibold text-foreground text-sm">
                  Order #{order.id}
                </span>
                <StatusBadge status={order.status} />
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{date}</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {itemCount} {itemCount === 1 ? "item" : "items"}
              </p>
            </div>
          </div>

          {/* Right: total + CTA */}
          <div className="flex flex-col items-end gap-2 shrink-0">
            <span className="font-display font-bold text-foreground text-base">
              ${Number.parseFloat(order.total).toFixed(2)}
            </span>
            <Button
              size="sm"
              variant="ghost"
              data-ocid={`orders.view_button.${index + 1}`}
              className="text-primary hover:text-primary text-xs h-7 px-2 gap-1 group-hover:bg-primary/10"
              onClick={(e) => {
                e.stopPropagation();
                navigate({
                  to: "/orders/$id",
                  params: { id: String(order.id) },
                });
              }}
            >
              View Details
              <ArrowRight className="w-3 h-3" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function OrderSkeleton() {
  return (
    <Card className="border-border bg-card">
      <CardContent className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <Skeleton className="w-10 h-10 rounded-lg" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-7 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Orders() {
  const { user } = useAuth();
  const [page, setPage] = useState(1);
  const {
    data: allOrders = [],
    isLoading,
    isError,
    refetch,
  } = useOrders(user?.wooCustomerId ?? null);

  const sorted = [...allOrders].sort(
    (a, b) =>
      new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime(),
  );

  const totalPages = Math.ceil(sorted.length / PER_PAGE);
  const start = (page - 1) * PER_PAGE;
  const pageOrders = sorted.slice(start, start + PER_PAGE);

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                My Orders
              </h1>
              {!isLoading && !isError && (
                <p className="text-sm text-muted-foreground mt-1">
                  {allOrders.length}{" "}
                  {allOrders.length === 1 ? "order" : "orders"} total
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => void refetch()}
              data-ocid="orders.refresh_button"
              className="gap-2 text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="w-4 h-4" />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6">
        {/* Loading state */}
        {isLoading && (
          <div data-ocid="orders.loading_state" className="space-y-3">
            <OrderSkeleton />
            <OrderSkeleton />
            <OrderSkeleton />
          </div>
        )}

        {/* Error state */}
        {isError && !isLoading && (
          <div
            data-ocid="orders.error_state"
            className="flex flex-col items-center justify-center gap-4 py-16 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
              <AlertCircle className="w-8 h-8 text-destructive" />
            </div>
            <div className="space-y-1">
              <h3 className="font-display font-semibold text-lg text-foreground">
                Could not load orders
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Something went wrong while fetching your orders. Please try
                again.
              </p>
            </div>
            <Button
              data-ocid="orders.retry_button"
              onClick={() => void refetch()}
              className="btn-pride gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Retry
            </Button>
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !isError && allOrders.length === 0 && (
          <EmptyState
            data-ocid="orders.empty_state"
            icon={<ShoppingBag className="w-10 h-10" />}
            title="No orders yet"
            description="Your order history will appear here once you place your first order."
            ctaLabel="Start Shopping"
            ctaHref="/products"
          />
        )}

        {/* Orders list */}
        {!isLoading && !isError && pageOrders.length > 0 && (
          <div data-ocid="orders.list" className="space-y-3">
            {pageOrders.map((order, i) => (
              <OrderCard key={order.id} order={order} index={start + i} />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && !isError && totalPages > 1 && (
          <div className="flex items-center justify-between mt-6 pt-6 border-t border-border">
            <Button
              variant="outline"
              size="sm"
              data-ocid="orders.pagination_prev"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="gap-2"
            >
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Page {page} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              data-ocid="orders.pagination_next"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="gap-2"
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
