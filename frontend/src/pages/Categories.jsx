import React from "react";
import Breadcrumb from "../components/Breadcrumb";
import CategoryCard from "../components/CategoryCard";

import categories from "../data/categories";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Categories() {
  return (
    <>
    <Header/>
    <main className="voltora-body bg-white">
      {/* Fonts, shared with the rest of the Voltora account/checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Breadcrumb */}
      <Breadcrumb items={[{ label: "Categories" }]} />

      {/* Page Header */}
      <section className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <h1 className="voltora-heading text-3xl font-semibold text-[#14181F] sm:text-4xl">
            All categories
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
            Everything we carry, grouped by what it's for — electronics,
            appliances, entertainment gear, and everyday tech.
          </p>
        </div>
      </section>

      {/* Category Groups */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="space-y-14">
          {[
            "Communication and Computing",
            "Entertainment and Audio",
            "Photography and Wearables",
            "Home and Kitchen Appliances",
            "Office Equipment",
          ].map((groupName) => {
            const groupCategories = categories.filter(
              (category) => category.group === groupName
            );

            return (
              <div key={groupName}>
                {/* Group Heading */}
                <div className="mb-6">
                  <h2 className="voltora-heading text-2xl font-semibold text-[#14181F]">
                    {groupName}
                  </h2>

                  <div className="mt-3 h-1 w-12 rounded-full bg-[#FFB020]" />
                </div>

                {/* Category Cards */}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {groupCategories.map((category) => (
                    <CategoryCard
                      key={category.slug}
                      icon={category.icon}
                      title={category.name}
                      description={category.description}
                      slug={category.slug}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}