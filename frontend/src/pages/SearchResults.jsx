import React, { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowLeft, Search, SlidersHorizontal } from "lucide-react";

import ProductCard from "../components/ProductCard";
import products from "../data/products";

export default function SearchResults() {
  const [searchParams] = useSearchParams();

  const searchQuery = searchParams.get("search") || "";

  const filteredProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return [];
    }

    return products.filter((product) => {
      const searchableText = [
        product.name,
        product.category,
        product.brand,
        product.description,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return searchableText.includes(query);
    });
  }, [searchQuery]);

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#14181F]">
      {/* Hero */}
      <section className="bg-[#0A0E14] text-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-16">
          <Link
            to="/shop"
            className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-[#FFB020] transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Shop
          </Link>

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-[#FFB020]">
                Product Search
              </p>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                Search Results
              </h1>

              <p className="mt-4 max-w-2xl text-gray-300">
                Find products that match your search and explore the latest
                electronics available at Voltora.
              </p>
            </div>

            <div className="flex h-12 items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 text-sm text-gray-300">
              <Search size={18} className="text-[#FFB020]" />

              <span className="max-w-[220px] truncate">
                {searchQuery || "No search entered"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8 lg:py-16">
        {/* Top Bar */}
        <div className="mb-8 flex flex-col gap-4 border-b border-[#E5E7EB] pb-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            {searchQuery ? (
              <>
                <h2 className="text-xl font-bold">
                  Results for "{searchQuery}"
                </h2>

                <p className="mt-1 text-sm text-[#6B7280]">
                  {filteredProducts.length}{" "}
                  {filteredProducts.length === 1 ? "product" : "products"} found
                </p>
              </>
            ) : (
              <>
                <h2 className="text-xl font-bold">
                  Search for a product
                </h2>

                <p className="mt-1 text-sm text-[#6B7280]">
                  Enter a product, brand, or category in the search bar.
                </p>
              </>
            )}
          </div>

          <Link
            to="/shop"
            className="inline-flex w-fit items-center gap-2 rounded-xl border border-[#D1D5DB] bg-white px-4 py-2.5 text-sm font-semibold transition hover:border-[#FFB020] hover:text-[#B8791A]"
          >
            <SlidersHorizontal size={17} />
            Browse All Products
          </Link>
        </div>

        {/* No Search */}
        {!searchQuery && (
          <div className="rounded-3xl border border-[#E5E7EB] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF6E7] text-[#B8791A]">
              <Search size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              What are you looking for?
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B7280]">
              Search for smartphones, laptops, headphones, cameras,
              smartwatches, and other electronics.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center justify-center rounded-xl bg-[#FFB020] px-6 py-3 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
            >
              Explore Shop
            </Link>
          </div>
        )}

        {/* Products */}
        {searchQuery && filteredProducts.length > 0 && (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* No Results */}
        {searchQuery && filteredProducts.length === 0 && (
          <div className="rounded-3xl border border-[#E5E7EB] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF6E7] text-[#B8791A]">
              <Search size={28} />
            </div>

            <h2 className="mt-6 text-2xl font-bold">
              No products found
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#6B7280]">
              We couldn't find any products matching{" "}
              <span className="font-semibold text-[#14181F]">
                "{searchQuery}"
              </span>
              . Try another product name, category, or brand.
            </p>

            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center rounded-xl bg-[#FFB020] px-6 py-3 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
              >
                Browse Shop
              </Link>

              <Link
                to="/categories"
                className="inline-flex items-center justify-center rounded-xl border border-[#D1D5DB] bg-white px-6 py-3 font-semibold transition hover:border-[#FFB020] hover:text-[#B8791A]"
              >
                View Categories
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}

