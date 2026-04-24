import { EmptyState } from "@/components/EmptyState";
import { LoadingGrid } from "@/components/LoadingGrid";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/context/AuthContext";
import { useCategories } from "@/hooks/useCategories";
import { useProducts } from "@/hooks/useProducts";
import type { Category } from "@/types";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ChevronRight,
  RefreshCw,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { motion } from "motion/react";

// ─── Animation Variants ─────────────────────────────────────────────────────

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.6 } },
};

const slideUp = {
  hidden: { opacity: 0, y: 32 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const slideLeft = {
  hidden: { opacity: 0, x: 24 },
  show: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.45, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

// ─── Section Header ──────────────────────────────────────────────────────────

function SectionHeader({
  title,
  to,
  linkLabel = "See All",
  ocid,
}: {
  title: string;
  to: "/products" | "/categories";
  linkLabel?: string;
  ocid: string;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-xl font-display font-bold text-foreground">
        {title}
      </h2>
      <Link
        to={to}
        {...(to === "/products"
          ? {
              search: {
                search: undefined,
                category: undefined,
                orderby: undefined,
                page: undefined,
              },
            }
          : {})}
        data-ocid={ocid}
        className="flex items-center gap-0.5 text-sm font-medium text-primary hover:underline transition-smooth"
      >
        {linkLabel}
        <ChevronRight className="h-4 w-4" />
      </Link>
    </div>
  );
}

// ─── Error Retry ─────────────────────────────────────────────────────────────

function SectionError({
  onRetry,
  label,
}: { onRetry: () => void; label: string }) {
  return (
    <div
      data-ocid={`${label}.error_state`}
      className="flex flex-col items-center justify-center gap-3 py-10 text-center"
    >
      <AlertCircle className="h-8 w-8 text-destructive opacity-70" />
      <p className="text-sm text-muted-foreground">
        Failed to load. Please try again.
      </p>
      <Button
        variant="outline"
        size="sm"
        onClick={onRetry}
        data-ocid={`${label}.retry_button`}
        className="flex items-center gap-2"
      >
        <RefreshCw className="h-3.5 w-3.5" /> Retry
      </Button>
    </div>
  );
}

// ─── Hero Banner ─────────────────────────────────────────────────────────────

function HeroBanner() {
  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      animate="show"
      data-ocid="hero.section"
      className="relative overflow-hidden rounded-2xl gradient-pride shadow-lg mx-4 mt-4"
    >
      {/* Decorative circles */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10 pointer-events-none" />

      <div className="relative z-10 px-6 py-12 sm:py-16 flex flex-col items-start gap-5 max-w-lg">
        <div className="flex flex-wrap gap-2">
          {["🏳️‍🌈", "🏳️‍⚧️", "✊"].map((emoji, i) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: static decorative emojis
              key={i}
              className="text-2xl select-none"
            >
              {emoji}
            </span>
          ))}
        </div>
        <div>
          <h1 className="text-3xl sm:text-5xl font-display font-bold text-white leading-tight">
            Shop with Pride
          </h1>
          <p className="mt-2 text-white/80 text-base sm:text-lg max-w-sm">
            Celebrate who you are. Discover pride apparel, accessories, and
            more.
          </p>
        </div>
        <Link
          to="/products"
          search={{
            search: undefined,
            category: undefined,
            orderby: undefined,
            page: undefined,
          }}
          data-ocid="hero.shop_now_button"
        >
          <Button
            size="lg"
            className="bg-white text-primary font-bold hover:bg-white/90 transition-smooth active:scale-95 shadow-md"
          >
            <ShoppingBag className="h-5 w-5 mr-2" />
            Shop Now
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}

// ─── Featured Products (horizontal scroll on mobile) ──────────────────────

function FeaturedProducts() {
  const { data, isLoading, isError, refetch } = useProducts({
    orderBy: "popularity",
    perPage: 6,
  });

  return (
    <motion.section
      variants={slideUp}
      custom={0}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      data-ocid="featured.section"
      className="px-4"
    >
      <SectionHeader
        title="Featured Products"
        to="/products"
        ocid="featured.see_all_link"
      />

      {isLoading && <LoadingGrid count={4} cols={4} />}
      {isError && <SectionError onRetry={refetch} label="featured" />}

      {!isLoading && !isError && data && data.length === 0 && (
        <div data-ocid="featured.empty_state">
          <EmptyState
            icon={<ShoppingBag className="h-8 w-8" />}
            title="No featured products"
            description="Check back soon for our featured picks."
          />
        </div>
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <>
          {/* Mobile: horizontal scroll */}
          <div
            data-ocid="featured.list"
            className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 snap-x snap-mandatory scrollbar-none sm:hidden"
          >
            {data.map((product, i) => (
              <div key={product.id} className="flex-none w-44 snap-start">
                <ProductCard product={product} index={i} />
              </div>
            ))}
          </div>
          {/* Desktop: 4-col grid */}
          <div className="hidden sm:grid sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {data.map((product, i) => (
              <motion.div
                key={product.id}
                variants={slideUp}
                custom={i}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <ProductCard product={product} index={i} />
              </motion.div>
            ))}
          </div>
        </>
      )}
    </motion.section>
  );
}

// ─── New Arrivals (2/3/4 col grid) ───────────────────────────────────────────

function NewArrivals() {
  const { data, isLoading, isError, refetch } = useProducts({
    orderBy: "date",
    perPage: 8,
  });

  return (
    <motion.section
      variants={slideUp}
      custom={1}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      data-ocid="new_arrivals.section"
      className="px-4 bg-muted/30 py-6 rounded-2xl mx-4"
    >
      <SectionHeader
        title="New Arrivals"
        to="/products"
        ocid="new_arrivals.see_all_link"
      />

      {isLoading && <LoadingGrid count={8} cols={4} />}
      {isError && <SectionError onRetry={refetch} label="new_arrivals" />}

      {!isLoading && !isError && data && data.length === 0 && (
        <EmptyState
          icon={<ShoppingBag className="h-8 w-8" />}
          title="No new arrivals yet"
          description="Check back soon for the latest products."
        />
      )}

      {!isLoading && !isError && data && data.length > 0 && (
        <div
          data-ocid="new_arrivals.list"
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4"
        >
          {data.map((product, i) => (
            <motion.div
              key={product.id}
              variants={slideUp}
              custom={i}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              <ProductCard product={product} index={i} />
            </motion.div>
          ))}
        </div>
      )}
    </motion.section>
  );
}

// ─── Category Tile ────────────────────────────────────────────────────────────

function CategoryTile({ cat, index }: { cat: Category; index: number }) {
  return (
    <motion.div
      variants={slideLeft}
      custom={index}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
    >
      <Link
        to="/categories/$slug"
        params={{ slug: cat.slug }}
        search={{ orderby: undefined, page: undefined }}
        data-ocid={`categories.item.${index + 1}`}
        className="flex flex-col items-center gap-2 group"
      >
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-card border border-border/50 shadow-sm card-hover flex items-center justify-center">
          {cat.image ? (
            <img
              src={cat.image.src}
              alt={cat.image.alt || cat.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <Tag className="h-7 w-7 text-muted-foreground" />
          )}
        </div>
        <div className="text-center">
          <p className="text-xs sm:text-sm font-semibold text-foreground line-clamp-1 max-w-[80px]">
            {cat.name}
          </p>
          <p className="text-[10px] text-muted-foreground">{cat.count} items</p>
        </div>
      </Link>
    </motion.div>
  );
}

function CategoryRow() {
  const { data, isLoading, isError, refetch } = useCategories();
  const categories = data?.slice(0, 6) ?? [];

  return (
    <motion.section
      variants={slideUp}
      custom={2}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      data-ocid="categories.section"
      className="px-4"
    >
      <SectionHeader
        title="Shop by Category"
        to="/categories"
        ocid="categories.see_all_link"
      />

      {isLoading && (
        <div className="flex gap-4 overflow-x-auto pb-2">
          {Array.from({ length: 6 }, (_, i) => (
            <div
              // biome-ignore lint/suspicious/noArrayIndexKey: skeleton items
              key={i}
              className="flex-none flex flex-col items-center gap-2"
            >
              <Skeleton className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl" />
              <Skeleton className="h-3 w-12" />
            </div>
          ))}
        </div>
      )}

      {isError && <SectionError onRetry={refetch} label="categories" />}

      {!isLoading && !isError && categories.length === 0 && (
        <EmptyState
          icon={<Tag className="h-8 w-8" />}
          title="No categories found"
          description="Categories will appear here once available."
        />
      )}

      {!isLoading && !isError && categories.length > 0 && (
        <div
          data-ocid="categories.list"
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-none"
        >
          {categories.map((cat, i) => (
            <CategoryTile key={cat.id} cat={cat} index={i} />
          ))}
        </div>
      )}
    </motion.section>
  );
}

// ─── Promo Banner (unauthenticated only) ─────────────────────────────────────

function PromoBanner() {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) return null;

  return (
    <motion.section
      variants={fadeIn}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      data-ocid="promo.section"
      className="mx-4"
    >
      <div className="relative overflow-hidden rounded-2xl bg-accent/10 border border-accent/25 px-6 py-8 flex flex-col sm:flex-row items-center gap-5 sm:justify-between">
        {/* Decorative element */}
        <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-accent/15 pointer-events-none" />

        <div className="relative z-10 text-center sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent mb-1">
            Join the Community
          </p>
          <h3 className="text-xl sm:text-2xl font-display font-bold text-foreground">
            Unlock Orders, Wishlist & More
          </h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-sm">
            Create a free account to track your orders, save favourites, and get
            exclusive updates.
          </p>
        </div>
        <Link
          to="/register"
          data-ocid="promo.create_account_button"
          className="relative z-10 flex-none"
        >
          <Button size="lg" className="btn-pride shadow-md">
            Create Account
          </Button>
        </Link>
      </div>
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function Home() {
  return (
    <div data-ocid="home.page" className="flex flex-col gap-8 pb-8">
      <HeroBanner />
      <FeaturedProducts />
      <CategoryRow />
      <NewArrivals />
      <PromoBanner />
    </div>
  );
}
