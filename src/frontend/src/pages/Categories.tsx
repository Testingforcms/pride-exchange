import { EmptyState } from "@/components/EmptyState";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { Link } from "@tanstack/react-router";
import { Grid2X2, Tag } from "lucide-react";
import { motion } from "motion/react";

function CategorySkeleton() {
  return (
    <div className="rounded-xl overflow-hidden bg-card border border-border/50">
      <Skeleton className="aspect-square w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </div>
  );
}

export default function Categories() {
  const { data: categories, isLoading, isError } = useCategories();

  return (
    <div className="min-h-screen bg-background">
      {/* Page header */}
      <div className="bg-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <div className="flex items-center gap-2">
            <Grid2X2 className="h-5 w-5 text-primary" />
            <h1 className="text-xl font-display font-bold text-foreground">
              Browse Categories
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Explore our curated collection of pride merchandise
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {Array.from({ length: 8 }, (_, i) => (
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items have no identity
              <CategorySkeleton key={i} />
            ))}
          </div>
        ) : isError ? (
          <EmptyState
            icon={<Tag className="h-8 w-8" />}
            title="Failed to load categories"
            description="We couldn't fetch categories right now. Please try again."
            ctaLabel="Retry"
            onCta={() => window.location.reload()}
          />
        ) : !categories || categories.length === 0 ? (
          <EmptyState
            data-ocid="categories.empty_state"
            icon={<Tag className="h-8 w-8" />}
            title="No categories available"
            description="Check back soon for new collections."
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            data-ocid="categories.list"
          >
            {categories.map((cat, i) => (
              <motion.div
                key={cat.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05, ease: "easeOut" }}
              >
                <Link
                  to="/categories/$slug"
                  params={{ slug: cat.slug }}
                  search={{ orderby: undefined, page: undefined }}
                  data-ocid={`categories.item.${i + 1}`}
                  className="block group"
                >
                  <div className="relative rounded-xl overflow-hidden bg-card border border-border/50 card-hover shadow-sm">
                    {/* Category image */}
                    <div className="relative aspect-square bg-muted overflow-hidden">
                      {cat.image?.src ? (
                        <img
                          src={cat.image.src}
                          alt={cat.image.alt || cat.name}
                          loading="lazy"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      ) : (
                        <div className="w-full h-full gradient-pride opacity-70 flex items-center justify-center">
                          <span className="text-4xl">🏳️‍🌈</span>
                        </div>
                      )}

                      {/* Product count badge */}
                      <div className="absolute top-2 right-2">
                        <span className="badge-pride text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-sm">
                          {cat.count} items
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="p-3">
                      <h3 className="font-semibold text-sm text-foreground line-clamp-2 group-hover:text-primary transition-smooth">
                        {cat.name}
                      </h3>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cat.count} product{cat.count !== 1 ? "s" : ""}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
