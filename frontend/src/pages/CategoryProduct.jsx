import React from "react";
import { useParams } from "react-router-dom";

import Breadcrumb from "../components/Breadcrumb";
import ProductGrid from "../components/ProductGrid";

import categories from "../data/categories";
import products from "../data/products";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function CategoryProducts() {
  const { category } = useParams();

  // Find the exact category using its slug
  const selectedCategory = categories.find((item) => item.slug === category);

  // If category does not exist
  if (!selectedCategory) {
    return (
      <>
        <Header/>

        <main className="voltora-body bg-white">
          <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
            .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
            .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
          `}</style>

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

  const categoryProducts = products.filter(
    (product) => product.category === selectedCategory.name
  );

  return (
    <>
    

      <main className="voltora-body bg-white">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
          .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
          .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        `}</style>

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

      <Footer/>
    </>
  );
}