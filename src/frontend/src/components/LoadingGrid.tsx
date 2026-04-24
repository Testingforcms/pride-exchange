import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface LoadingGridProps {
  count?: number;
  className?: string;
  cols?: 2 | 3 | 4;
}

export function LoadingGrid({
  count = 6,
  className,
  cols = 2,
}: LoadingGridProps) {
  const colClass =
    cols === 2
      ? "grid-cols-2"
      : cols === 3
        ? "grid-cols-2 sm:grid-cols-3"
        : "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4";

  return (
    <div className={cn(`grid gap-3 ${colClass}`, className)}>
      {Array.from({ length: count }, (_, i) => (
        <div
          // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items have no identity
          key={i}
          className="flex flex-col gap-2 rounded-xl overflow-hidden bg-card border border-border/50"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-8 w-full mt-1" />
          </div>
        </div>
      ))}
    </div>
  );
}
