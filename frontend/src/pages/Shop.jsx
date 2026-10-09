import React, { useEffect, useMemo, useState } from "react";
import { Filter, X } from "lucide-react";

import Breadcrumb from "../components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";
import FilterSidebar from "../components/FilterSidebar";
import SortDropdown from "../components/SortDropdown";
import Header from "../components/Header";
import Footer from "../components/Footer";

import products from "../data/products";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Load More
  const [visibleProducts, setVisibleProducts] = useState(16);

  const productsPerLoad = 16;

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch =
        !selectedCategory || product.category === selectedCategory;

      const minPriceMatch =
        !minPrice || product.price >= Number(minPrice);

      const maxPriceMatch =
        !maxPrice || product.price <= Number(maxPrice);

      const brandMatch =
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand);

      return (
        categoryMatch &&
        minPriceMatch &&
        maxPriceMatch &&
        brandMatch
      );
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sortBy === "name") {
      result.sort((a, b) =>
        a.title.localeCompare(b.title)
      );
    }

    return result;
  }, [
    selectedCategory,
    minPrice,
    maxPrice,
    selectedBrands,
    sortBy,
  ]);

  // Reset visible products whenever filters or sorting change
  useEffect(() => {
    setVisibleProducts(productsPerLoad);
  }, [
    selectedCategory,
    minPrice,
    maxPrice,
    selectedBrands,
    sortBy,
  ]);

  const clearFilters = () => {
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    setSelectedBrands([]);
  };

  // Products currently visible on the page
  const visibleProductList = filteredProducts.slice(
    0,
    visibleProducts
  );

  // Load 16 more products
  const handleLoadMore = () => {
    setVisibleProducts(
      (prev) => prev + productsPerLoad
    );
  };

  const filterTagClass =
    "rounded-full bg-[#FFF6E7] px-3 py-1.5 text-xs font-semibold text-[#B8791A]";

  return (
    <>
    <Header/>
    <main className="voltora-body bg-white">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .voltora-heading {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }

        .voltora-body {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        }
      `}</style>

      <Breadcrumb items={[{ label: "Shop" }]} />

      {/* Shop Header */}
      <section className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="voltora-heading text-3xl font-semibold text-[#14181F] sm:text-4xl">
            Shop electronics
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
            Smartphones, laptops, cameras, audio devices, home
            appliances, and more from our complete electronics
            collection.
          </p>
        </div>
      </section>

      {/* Shop Content */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {/* Mobile Filter Button */}
        <div className="mb-6 lg:hidden">
          <button
            type="button"
            onClick={() => setIsMobileFilterOpen(true)}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
          >
            <Filter size={17} />
            Filters
          </button>
        </div>

        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          {/* Desktop Filter */}
          <div className="hidden lg:block">
            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              clearFilters={clearFilters}
            />
          </div>

          {/* Products Area */}
          <div>
            {/* Top Bar */}
            <div className="mb-6 flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-[#6B7280]">
                Showing{" "}
                <span className="font-semibold text-[#14181F]">
                  {visibleProductList.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#14181F]">
                  {filteredProducts.length}
                </span>{" "}
                products
              </p>

              <SortDropdown
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            {/* Active Filters */}
            {(selectedCategory ||
              minPrice ||
              maxPrice ||
              selectedBrands.length > 0) && (
              <div className="mb-6 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-[#6B7280]">
                  Active filters:
                </span>

                {selectedCategory && (
                  <span className={filterTagClass}>
                    {selectedCategory}
                  </span>
                )}

                {minPrice && (
                  <span className={filterTagClass}>
                    Min: ${minPrice}
                  </span>
                )}

                {maxPrice && (
                  <span className={filterTagClass}>
                    Max: ${maxPrice}
                  </span>
                )}

                {selectedBrands.map((brand) => (
                  <span
                    key={brand}
                    className={filterTagClass}
                  >
                    {brand}
                  </span>
                ))}

                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-xs font-semibold text-red-500 hover:text-red-600"
                >
                  Clear
                </button>
              </div>
            )}

            {/* Products */}
            {filteredProducts.length > 0 ? (
              <>
                <ProductGrid products={visibleProductList} />

                {/* Load More */}
                {visibleProducts < filteredProducts.length && (
                  <div className="mt-10 flex justify-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      className="rounded-lg border border-[#0A0E14] bg-white px-7 py-3 text-sm font-semibold text-[#0A0E14] transition hover:bg-[#0A0E14] hover:text-[#FFB020]"
                    >
                      More Products
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex min-h-[400px] items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-6 text-center">
                <div>
                  <h2 className="voltora-heading text-2xl font-semibold text-[#14181F]">
                    No products found
                  </h2>

                  <p className="mt-3 text-sm text-[#6B7280]">
                    Try changing your filters to find more products.
                  </p>

                  <button
                    type="button"
                    onClick={clearFilters}
                    className="mt-5 rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
                  >
                    Clear filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setIsMobileFilterOpen(false)}
          />

          <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">
            <div className="mb-5 flex items-center justify-between">
              <h2 className="voltora-heading text-lg font-semibold text-[#14181F]">
                Filters
              </h2>

              <button
                type="button"
                onClick={() =>
                  setIsMobileFilterOpen(false)
                }
                className="rounded-lg p-2 text-[#6B7280] transition hover:bg-[#F4F4F2]"
              >
                <X size={20} />
              </button>
            </div>

            <FilterSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              minPrice={minPrice}
              setMinPrice={setMinPrice}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              selectedBrands={selectedBrands}
              setSelectedBrands={setSelectedBrands}
              clearFilters={clearFilters}
            />

            <button
              type="button"
              onClick={() =>
                setIsMobileFilterOpen(false)
              }
              className="mt-5 w-full rounded-lg bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
            >
              Apply filters
            </button>
          </div>
        </div>
      )}
    </main>
    <Footer/>
    </>
  );
}

