import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "../components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const fontStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
  .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
  .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
`;

export default function CategoryProducts() {
  const { category: slug } = useParams();

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategory = async () => {
      try {
        setLoading(true);
        setNotFound(false);
        setError("");

        const res = await fetch(
          `${API_URL}/categories/slug/${encodeURIComponent(slug)}`,
          { credentials: "include", signal: controller.signal }
        );

        if (res.status === 404) {
          setSelectedCategory(null);
          setCategoryProducts([]);
          setNotFound(true);
          return;
        }

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load category");
        }

        setSelectedCategory(data.category);
        setCategoryProducts(data.products || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load category");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCategory();

    return () => controller.abort();
  }, [slug]);

  // Loading
  if (loading) {
    return (
      <>
        <Header />
        <main className="voltora-body bg-white">
          <style>{fontStyles}</style>
          <section className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center px-4 py-16">
            <p className="text-sm text-[#6B7280]">Loading category...</p>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // Server / network error
  if (error) {
    return (
      <>
        <Header />
        <main className="voltora-body bg-white">
          <style>{fontStyles}</style>
          <Breadcrumb
            items={[
              { label: "Categories", path: "/categories" },
              { label: "Error" },
            ]}
          />
          <section className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="voltora-heading text-3xl font-semibold text-[#14181F]">
                Something went wrong
              </h1>
              <p className="mt-3 text-sm text-red-600">{error}</p>
            </div>
          </section>
        </main>
        <Footer />
      </>
    );
  }

  // If category does not exist
  if (notFound || !selectedCategory) {
    return (
      <>
        <Header />

        <main className="voltora-body bg-white">
          <style>{fontStyles}</style>

          <Breadcrumb
            items={[
              { label: "Categories", path: "/categories" },
              { label: "Category not found" },
            ]}
          />

          <section className="mx-auto flex min-h-[500px] max-w-7xl items-center justify-center px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="voltora-heading text-3xl font-semibold text-[#14181F]">
                Category not found
              </h1>

              <p className="mt-3 text-sm text-[#6B7280]">
                The category you're looking for doesn't exist.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="voltora-body bg-white">
        <style>{fontStyles}</style>

        {/* Breadcrumb */}
        <Breadcrumb
          items={[
            { label: "Categories", path: "/categories" },
            { label: selectedCategory.name },
          ]}
        />

        {/* Category Header */}
        <section className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-[#B8791A]">
              {selectedCategory.group}
            </p>

            <h1 className="voltora-heading mt-2 text-3xl font-semibold text-[#14181F] sm:text-4xl">
              {selectedCategory.name}
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
              {selectedCategory.description}
            </p>
          </div>
        </section>

        {/* Products */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {categoryProducts.length === 0 ? (
            <div className="flex min-h-[350px] items-center justify-center rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-6 text-center">
              <div>
                <h2 className="voltora-heading text-2xl font-semibold text-[#14181F]">
                  No products found
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#6B7280]">
                  There are currently no products available in this category.
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <p className="text-sm text-[#6B7280]">
                  Showing{" "}
                  <span className="font-semibold text-[#14181F]">
                    {categoryProducts.length}
                  </span>{" "}
                  products in {selectedCategory.name}
                </p>
              </div>

              <ProductGrid products={categoryProducts} />
            </>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}