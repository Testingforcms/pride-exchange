import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  ctaLabel?: string;
  onCta?: () => void;
  ctaHref?: string;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  ctaLabel,
  onCta,
  ctaHref,
  className,
}: EmptyStateProps) {
  return (
    <div
      data-ocid="empty_state"
      className={cn(
        "flex flex-col items-center justify-center gap-4 py-16 px-6 text-center",
        className,
      )}
    >
      {icon && (
        <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
          {icon}
        </div>
      )}
      <div className="space-y-1">
        <h3 className="font-display font-semibold text-lg text-foreground">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-xs">
            {description}
          </p>
        )}
      </div>
      {ctaLabel &&
        (onCta || ctaHref) &&
        (ctaHref ? (
          <a href={ctaHref}>
            <Button
              className="btn-pride"
              data-ocid="empty_state.primary_button"
            >
              {ctaLabel}
            </Button>
          </a>
        ) : (
          <Button
            onClick={onCta}
            className="btn-pride"
            data-ocid="empty_state.primary_button"
          >
            {ctaLabel}
          </Button>
        ))}
    </div>
  );
}
