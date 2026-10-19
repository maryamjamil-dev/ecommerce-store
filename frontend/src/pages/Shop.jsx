import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Filter, X, Loader2, AlertCircle, RefreshCw } from "lucide-react";

import Breadcrumb from "../components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";
import FilterSidebar from "../components/FilterSidebar";
import SortDropdown from "../components/SortDropdown";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_BASE_URL = (
  import.meta.env.VITE_API_URL || "http://localhost:3000/api"
).replace(/\/+$/, "");

const PRODUCTS_PER_LOAD = 16;

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState("default");
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(PRODUCTS_PER_LOAD);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setApiError("");

    try {
      const response = await fetch(`${API_BASE_URL}/products`);

      let data;

      try {
        data = await response.json();
      } catch {
        throw new Error("Backend ne valid JSON response return nahi kiya.");
      }

      if (!response.ok) {
        throw new Error(
          data?.message ||
            `Products request failed. Status: ${response.status}`
        );
      }


      if (data?.success === false) {
        throw new Error(data.message || "Products fetch nahi ho sake.");
      }

      const productList = Array.isArray(data)
        ? data
        : data?.products;

      if (!Array.isArray(productList)) {
        throw new Error(
          "Backend response mein products array nahi mili."
        );
      }

      const normalizedProducts = productList.map((product) => ({
        ...product,

        id: product._id || product.id,

        title: product.title || product.name || "Untitled Product",
        category: product.category || "Other",
        brand: product.brand || "Other",

        price: Number(product.price) || 0,

        oldPrice:
          product.oldPrice !== undefined &&
          product.oldPrice !== null &&
          product.oldPrice !== ""
            ? Number(product.oldPrice)
            : null,

        rating: Number(product.rating) || 0,

        reviews: Number(product.reviews ?? product.numReviews) || 0,

        discount: product.discount || "",

        image:
          product.image ||
          product.imageUrl ||
          (Array.isArray(product.images) ? product.images[0] : "") ||
          "",

        description: product.description || "",
      }));

      setProducts(normalizedProducts);
      setVisibleProducts(PRODUCTS_PER_LOAD);
    } catch (error) {
      console.error("Fetch products error:", error);

      setApiError(
        error.message ||
          "Products load nahi hue. Backend server check karo."
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const categories = useMemo(
    () => [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ],
    [products]
  );

  const brands = useMemo(
    () => [
      ...new Set(
        products.map((product) => product.brand).filter(Boolean)
      ),
    ],
    [products]
  );

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const categoryMatch =
        !selectedCategory || product.category === selectedCategory;

      const minPriceMatch =
        minPrice === "" || product.price >= Number(minPrice);

      const maxPriceMatch =
        maxPrice === "" || product.price <= Number(maxPrice);

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

    result = [...result];

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.title.localeCompare(b.title));
    }

    return result;
  }, [
    products,
    selectedCategory,
    minPrice,
    maxPrice,
    selectedBrands,
    sortBy,
  ]);

  useEffect(() => {
    setVisibleProducts(PRODUCTS_PER_LOAD);
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

  const visibleProductList = filteredProducts.slice(
    0,
    visibleProducts
  );

  const handleLoadMore = () => {
    setVisibleProducts((previous) => previous + PRODUCTS_PER_LOAD);
  };

  const filterTagClass =
    "rounded-full bg-[#FFF6E7] px-3 py-1.5 text-xs font-semibold text-[#B8791A]";

  return (
    <>
      <Header />

      <main className="voltora-body min-h-screen bg-white">
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
          {isLoading ? (
            <div
              className="flex min-h-[350px] flex-col items-center justify-center gap-4"
              role="status"
            >
              <Loader2
                size={36}
                className="animate-spin text-[#B8791A]"
              />

              <p className="text-sm text-[#6B7280]">
                Loading products from Voltora...
              </p>
            </div>
          ) : apiError ? (
            <div className="flex min-h-[350px] items-center justify-center">
              <div className="max-w-md text-center">
                <AlertCircle
                  size={38}
                  className="mx-auto text-red-500"
                />

                <h2 className="voltora-heading mt-4 text-2xl font-semibold text-[#14181F]">
                  Products could not load
                </h2>

                <p className="mt-3 break-words text-sm leading-6 text-[#6B7280]">
                  {apiError}
                </p>

                <button
                  type="button"
                  onClick={fetchProducts}
                  className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
                >
                  <RefreshCw size={16} />
                  Try again
                </button>
              </div>
            </div>
          ) : products.length === 0 ? (
            <div className="flex min-h-[350px] items-center justify-center text-center">
              <div>
                <h2 className="voltora-heading text-2xl font-semibold text-[#14181F]">
                  No products available
                </h2>

                <p className="mt-3 text-sm text-[#6B7280]">
                  Backend se koi product return nahi hua.
                </p>

                <button
                  type="button"
                  onClick={fetchProducts}
                  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white"
                >
                  <RefreshCw size={16} />
                  Refresh products
                </button>
              </div>
            </div>
          ) : (
            <>
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
                {/* Desktop Filters */}
                <div className="hidden lg:block">
                  <FilterSidebar
                    categories={categories}
                    brands={brands}
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
                    minPrice !== "" ||
                    maxPrice !== "" ||
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

                      {minPrice !== "" && (
                        <span className={filterTagClass}>
                          Min: ${minPrice}
                        </span>
                      )}

                      {maxPrice !== "" && (
                        <span className={filterTagClass}>
                          Max: ${maxPrice}
                        </span>
                      )}

                      {selectedBrands.map((brand) => (
                        <span key={brand} className={filterTagClass}>
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

                  {/* Product Grid */}
                  {filteredProducts.length > 0 ? (
                    <>
                      <ProductGrid products={visibleProductList} />

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
                    <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-6 text-center">
                      <div>
                        <h2 className="voltora-heading text-2xl font-semibold text-[#14181F]">
                          No products found
                        </h2>

                        <p className="mt-3 text-sm text-[#6B7280]">
                          Filters change karke dobara try karo.
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

              {/* Mobile Filter Drawer */}
              {isMobileFilterOpen && (
                <div className="fixed inset-0 z-[100] lg:hidden">
                  <button
                    type="button"
                    aria-label="Close filter drawer"
                    className="absolute inset-0 h-full w-full bg-black/40"
                    onClick={() => setIsMobileFilterOpen(false)}
                  />

                  <div className="absolute right-0 top-0 h-full w-full max-w-sm overflow-y-auto bg-white p-5 shadow-2xl">
                    <div className="mb-5 flex items-center justify-between">
                      <h2 className="voltora-heading text-lg font-semibold text-[#14181F]">
                        Filters
                      </h2>

                      <button
                        type="button"
                        onClick={() => setIsMobileFilterOpen(false)}
                        aria-label="Close filters"
                        className="rounded-lg p-2 text-[#6B7280] transition hover:bg-[#F4F4F2]"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <FilterSidebar
                      categories={categories}
                      brands={brands}
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
                      onClick={() => setIsMobileFilterOpen(false)}
                      className="mt-5 w-full rounded-lg bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
                    >
                      Apply filters
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
