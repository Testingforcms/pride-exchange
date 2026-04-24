import { EmptyState } from "@/components/EmptyState";
import { LoadingGrid } from "@/components/LoadingGrid";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import type { ProductFilters } from "@/types";
import {
  Link,
  useNavigate,
  useParams,
  useSearch,
} from "@tanstack/react-router";
import { ChevronRight, Package, Tag } from "lucide-react";
import { motion } from "motion/react";

const SORT_OPTIONS = [
  { value: "date", label: "Latest" },
  { value: "popularity", label: "Popular" },
  { value: "price", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
] as const;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];
type CategoryDetailSearch = {
  orderby: string | undefined;
  page: number | undefined;
};

const PER_PAGE = 10;

export default function CategoryDetail() {
  const { slug } = useParams({ from: "/categories/$slug" });
  const search = useSearch({
    from: "/categories/$slug",
  }) as CategoryDetailSearch;
  const navigate = useNavigate({ from: "/categories/$slug" });

  const currentPage = search.page ?? 1;
  const currentSort = (search.orderby as SortValue | undefined) ?? "date";

  const { data: categories, isLoading: catsLoading } = useCategories();
  const category = categories?.find((c) => c.slug === slug);

  const filters: ProductFilters = {
    category: category ? String(category.id) : undefined,
    orderBy: currentSort as ProductFilters["orderBy"],
    page: currentPage,
    perPage: PER_PAGE,
  };

  const {
    data: products,
    isLoading: prodsLoading,
    isError,
  } = useProducts(filters);

  function updateSearch(patch: { orderby?: string; page?: number }) {
    const next: CategoryDetailSearch = {
      orderby: patch.orderby ?? search.orderby,
      page: patch.page ?? 1,
    };
    void navigate({ search: next });
  }

  const isLoading = catsLoading || prodsLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Breadcrumb + category header */}
      <div className="bg-card border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          {/* Breadcrumb */}
          <nav
            className="flex items-center gap-1.5 text-xs text-muted-foreground mb-3"
            data-ocid="category_detail.breadcrumb"
          >
            <Link
              to="/"
              data-ocid="category_detail.breadcrumb_home"
              className="hover:text-foreground transition-smooth"
            >
              Home
            </Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            <Link
              to="/categories"
              data-ocid="category_detail.breadcrumb_categories"
              className="hover:text-foreground transition-smooth"
            >
              Categories
            </Link>
            <ChevronRight className="h-3 w-3 flex-shrink-0" />
            {catsLoading ? (
              <Skeleton className="h-3 w-20" />
            ) : (
              <span className="text-foreground font-medium truncate">
                {category?.name ?? slug}
              </span>
            )}
          </nav>

          {/* Category info */}
          {catsLoading ? (
            <div className="space-y-2">
              <Skeleton className="h-6 w-40" />
              <Skeleton className="h-4 w-64" />
            </div>
          ) : category ? (
            <div className="flex items-start gap-3">
              {category.image?.src && (
                <img
                  src={category.image.src}
                  alt={category.image.alt || category.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0 border border-border/50"
                />
              )}
              <div className="min-w-0">
                <h1 className="text-xl font-display font-bold text-foreground">
                  {category.name}
                </h1>
                {category.description && (
                  <p
                    className="text-sm text-muted-foreground mt-0.5 line-clamp-2"
                    // biome-ignore lint/security/noDangerouslySetInnerHtml: WooCommerce HTML description
                    dangerouslySetInnerHTML={{ __html: category.description }}
                  />
                )}
                <p className="text-xs text-muted-foreground mt-1">
                  {category.count} product{category.count !== 1 ? "s" : ""}
                </p>
              </div>
            </div>
          ) : (
            <h1 className="text-xl font-display font-bold text-foreground capitalize">
              {slug.replace(/-/g, " ")}
            </h1>
          )}
        </div>
      </div>

      {/* Sort bar */}
      <div className="bg-background border-b border-border/30 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2 overflow-x-auto scrollbar-hide">
          <span className="text-xs text-muted-foreground flex-shrink-0 font-medium">
            Sort:
          </span>
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateSearch({ orderby: opt.value })}
              data-ocid={`category_detail.sort.${opt.value}`}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                currentSort === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Product grid */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        {isLoading ? (
          <LoadingGrid count={PER_PAGE} cols={4} />
        ) : isError ? (
          <EmptyState
            icon={<Package className="h-8 w-8" />}
            title="Failed to load products"
            description="We couldn't load products for this category. Please try again."
            ctaLabel="Retry"
            onCta={() => window.location.reload()}
          />
        ) : !products || products.length === 0 ? (
          <EmptyState
            data-ocid="category_detail.empty_state"
            icon={<Tag className="h-8 w-8" />}
            title="No products in this category"
            description="Check back soon — new items are added regularly."
            ctaLabel="Browse all products"
            ctaHref="/products"
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            data-ocid="category_detail.product_list"
          >
            {products.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </motion.div>
        )}

        {/* Pagination */}
        {!isLoading && products && products.length > 0 && (
          <div
            className="flex items-center justify-center gap-3 mt-8"
            data-ocid="category_detail.pagination"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateSearch({ page: Math.max(1, currentPage - 1) })
              }
              disabled={currentPage <= 1}
              data-ocid="category_detail.pagination_prev"
            >
              ← Previous
            </Button>
            <span className="text-sm text-muted-foreground px-2">
              Page {currentPage}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => updateSearch({ page: currentPage + 1 })}
              disabled={products.length < PER_PAGE}
              data-ocid="category_detail.pagination_next"
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
