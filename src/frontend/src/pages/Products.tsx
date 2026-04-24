import { EmptyState } from "@/components/EmptyState";
import { LoadingGrid } from "@/components/LoadingGrid";
import { ProductCard } from "@/components/ProductCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import type { ProductFilters } from "@/types";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Package, RefreshCw, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

const SORT_OPTIONS = [
  { value: "date", label: "Latest" },
  { value: "popularity", label: "Popular" },
  { value: "price", label: "Price ↑" },
  { value: "price-desc", label: "Price ↓" },
] as const;

const PER_PAGE = 10;

type SortValue = (typeof SORT_OPTIONS)[number]["value"];

type ProductsSearch = {
  search: string | undefined;
  category: string | undefined;
  orderby: string | undefined;
  page: number | undefined;
};

export default function Products() {
  const search = useSearch({ from: "/products" }) as ProductsSearch;
  const navigate = useNavigate({ from: "/products" });

  const searchQuery = search.search;
  const categoryParam = search.category;
  const currentPage = search.page ?? 1;
  const currentSort = (search.orderby as SortValue | undefined) ?? "date";

  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);
  const [showFilters, setShowFilters] = useState(false);

  const { data: categories } = useCategories();

  const filters: ProductFilters = {
    search: searchQuery,
    category: categoryParam,
    orderBy: currentSort as ProductFilters["orderBy"],
    page: currentPage,
    perPage: PER_PAGE,
    minPrice: priceRange[0] > 0 ? priceRange[0] : undefined,
    maxPrice: priceRange[1] < 500 ? priceRange[1] : undefined,
  };

  const { data: products, isLoading, isError } = useProducts(filters);

  function updateSearch(
    patch: Partial<{
      search: string;
      category: string;
      orderby: string;
      page: number;
    }>,
  ) {
    const next: ProductsSearch = {
      search: "search" in patch ? patch.search : searchQuery,
      category: "category" in patch ? patch.category : categoryParam,
      orderby: "orderby" in patch ? patch.orderby : search.orderby,
      page: patch.page ?? 1,
    };
    void navigate({ search: next });
  }

  function clearFilters() {
    setPriceRange([0, 500]);
    const cleared: ProductsSearch = {
      search: undefined,
      category: undefined,
      orderby: undefined,
      page: undefined,
    };
    void navigate({ search: cleared });
  }

  const hasActiveFilters =
    !!searchQuery ||
    !!categoryParam ||
    priceRange[0] > 0 ||
    priceRange[1] < 500;

  const selectedCategory = categories?.find(
    (c) => String(c.id) === categoryParam,
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Sticky filter/sort bar */}
      <div className="bg-card border-b border-border/50 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 py-3">
          {/* Sort pills + filter toggle */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              type="button"
              onClick={() => setShowFilters((v) => !v)}
              data-ocid="products.filter_toggle"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-border text-sm font-medium text-foreground bg-background hover:bg-muted transition-smooth flex-shrink-0"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 rounded-full bg-primary" />
              )}
            </button>

            <div className="w-px h-5 bg-border flex-shrink-0" />

            {SORT_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => updateSearch({ orderby: opt.value })}
                data-ocid={`products.sort.${opt.value}`}
                className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-medium transition-smooth ${
                  currentSort === opt.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {opt.label}
              </button>
            ))}

            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                data-ocid="products.clear_filters"
                className="flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium text-destructive bg-destructive/10 hover:bg-destructive/20 transition-smooth"
              >
                <X className="h-3 w-3" /> Clear
              </button>
            )}
          </div>

          {/* Expanded filter panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="pt-3 pb-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Category select */}
                  <div className="space-y-1.5">
                    <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Category
                    </span>
                    <Select
                      value={categoryParam ?? "all"}
                      onValueChange={(val) =>
                        updateSearch({
                          category: val === "all" ? undefined : val,
                        })
                      }
                    >
                      <SelectTrigger
                        data-ocid="products.category_select"
                        className="h-9 text-sm"
                      >
                        <SelectValue placeholder="All categories" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All categories</SelectItem>
                        {categories?.map((cat) => (
                          <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name} ({cat.count})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price range */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                        Price range
                      </span>
                      <span className="text-xs text-foreground font-medium">
                        ${priceRange[0]} – ${priceRange[1]}
                        {priceRange[1] >= 500 ? "+" : ""}
                      </span>
                    </div>
                    <Slider
                      data-ocid="products.price_slider"
                      min={0}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={(v) =>
                        setPriceRange(v as [number, number])
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 py-5">
        {/* Search result header */}
        {searchQuery && (
          <div className="mb-4 flex items-center justify-between gap-2">
            <div>
              <p className="text-sm text-muted-foreground">
                Results for{" "}
                <span className="font-semibold text-foreground">
                  "{searchQuery}"
                </span>
              </p>
              {!isLoading && products && (
                <p className="text-xs text-muted-foreground mt-0.5">
                  {products.length === PER_PAGE
                    ? `${PER_PAGE}+ products found`
                    : `${products.length} product${products.length !== 1 ? "s" : ""} found`}
                </p>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => updateSearch({ search: undefined })}
              data-ocid="products.clear_search"
              className="text-xs text-muted-foreground"
            >
              <X className="h-3.5 w-3.5 mr-1" /> Clear
            </Button>
          </div>
        )}

        {/* Active category badge */}
        {selectedCategory && !searchQuery && (
          <div className="mb-4 flex items-center gap-2">
            <Badge variant="secondary" className="text-sm py-1 px-3">
              {selectedCategory.name}
            </Badge>
            <button
              type="button"
              onClick={() => updateSearch({ category: undefined })}
              data-ocid="products.remove_category_filter"
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}

        {/* Mobile pull-to-refresh hint */}
        <p className="text-center text-xs text-muted-foreground mb-4 sm:hidden">
          <RefreshCw className="inline h-3 w-3 mr-1" />
          Pull down to refresh
        </p>

        {/* Product grid */}
        {isLoading ? (
          <LoadingGrid count={PER_PAGE} cols={4} />
        ) : isError ? (
          <EmptyState
            icon={<Package className="h-8 w-8" />}
            title="Failed to load products"
            description="We couldn't fetch products right now. Please try again."
            ctaLabel="Retry"
            onCta={() => window.location.reload()}
          />
        ) : !products || products.length === 0 ? (
          <EmptyState
            data-ocid="products.empty_state"
            icon={<Package className="h-8 w-8" />}
            title="No products found"
            description={
              hasActiveFilters
                ? "Try adjusting your filters or search terms."
                : "No products are available right now."
            }
            ctaLabel={hasActiveFilters ? "Clear filters" : undefined}
            onCta={hasActiveFilters ? clearFilters : undefined}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3"
            data-ocid="products.list"
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
            data-ocid="products.pagination"
          >
            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                updateSearch({ page: Math.max(1, currentPage - 1) })
              }
              disabled={currentPage <= 1}
              data-ocid="products.pagination_prev"
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
              data-ocid="products.pagination_next"
            >
              Next →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
