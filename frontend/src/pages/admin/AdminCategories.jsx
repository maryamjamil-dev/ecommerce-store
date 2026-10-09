import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  FolderTree,
  Package,
} from "lucide-react";

import categories from "../../data/categories";
import products  from "../../data/products";

export default function AdminCategories() {
  const [searchTerm, setSearchTerm] = useState("");

  // =========================================
  // Filter Categories
  // =========================================

  const filteredCategories = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    if (!search) {
      return categories;
    }

    return categories.filter((category) => {
      const categoryName =
        typeof category === "string"
          ? category
          : category.name;

      return categoryName
        ?.toLowerCase()
        .includes(search);
    });
  }, [searchTerm]);

  // =========================================
  // Get Category Name
  // =========================================

  const getCategoryName = (category) => {
    if (typeof category === "string") {
      return category;
    }

    return category.name;
  };

  // =========================================
  // Get Category Image
  // =========================================

  const getCategoryImage = (category) => {
    if (typeof category === "string") {
      return null;
    }

    return category.image || category.icon || null;
  };

  // =========================================
  // Count Products
  // =========================================

  const getProductCount = (categoryName) => {
    return products.filter(
      (product) =>
        product.category?.toLowerCase() ===
        categoryName.toLowerCase()
    ).length;
  };

  // =========================================
  // Handlers
  // =========================================

  const handleAddCategory = () => {
    console.log("Add category");
  };

  const handleViewCategory = (category) => {
    console.log("View category:", category);
  };

  const handleEditCategory = (category) => {
    console.log("Edit category:", category);
  };

  const handleDeleteCategory = (category) => {
    console.log("Delete category:", category);
  };

  return (
    <div className="space-y-6">
      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#B8791A]">
            Admin Panel
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0E14] sm:text-3xl">
            Categories
          </h1>

          <p className="mt-1 text-sm text-[#6B7280]">
            Manage your store categories and product organization.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddCategory}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1A2029]"
        >
          <Plus size={18} />

          Add Category
        </button>
      </div>

      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Total Categories */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Total Categories
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {categories.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5DC] text-[#B8791A]">
              <FolderTree size={21} />
            </div>
          </div>
        </div>

        {/* Total Products */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Total Products
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {products.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5DC] text-[#B8791A]">
              <Package size={21} />
            </div>
          </div>
        </div>

        {/* Search Results */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">
              Current Results
            </p>

            <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
              {filteredCategories.length}
            </p>

            <p className="mt-1 text-xs text-[#9CA3AF]">
              Categories matching your search
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          SEARCH
      ===================================== */}

      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
        <div className="relative max-w-xl">
          <Search
            size={19}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
          />

          <input
            type="text"
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
            placeholder="Search categories..."
            className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] pl-11 pr-4 text-sm text-[#0A0E14] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
          />
        </div>
      </section>

      {/* =====================================
          CATEGORY LIST
      ===================================== */}

      <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
        {/* Section Header */}

        <div className="border-b border-[#E5E7EB] px-5 py-4">
          <h2 className="font-bold text-[#0A0E14]">
            Category List
          </h2>

          <p className="mt-1 text-xs text-[#9CA3AF]">
            Manage categories used throughout your store.
          </p>
        </div>

        {/* Empty State */}

        {filteredCategories.length === 0 ? (
          <div className="flex min-h-72 flex-col items-center justify-center px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6] text-[#9CA3AF]">
              <FolderTree size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#0A0E14]">
              No categories found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-[#6B7280]">
              Try searching with a different category name.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#E5E7EB]">
            {filteredCategories.map(
              (category, index) => {
                const categoryName =
                  getCategoryName(category);

                const categoryImage =
                  getCategoryImage(category);

                const productCount =
                  getProductCount(categoryName);

                return (
                  <div
                    key={`${categoryName}-${index}`}
                    className="flex flex-col gap-4 px-5 py-4 transition hover:bg-[#FAFAF8] sm:flex-row sm:items-center sm:justify-between"
                  >
                    {/* Category Information */}

                    <div className="flex min-w-0 items-center gap-4">
                      {/* Image */}

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F7F7F5]">
                        {categoryImage ? (
                          <img
                            src={categoryImage}
                            alt={categoryName}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <FolderTree
                            size={23}
                            className="text-[#B8791A]"
                          />
                        )}
                      </div>

                      {/* Name */}

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-semibold text-[#0A0E14]">
                          {categoryName}
                        </h3>

                        <div className="mt-1 flex items-center gap-2">
                          <span className="text-xs text-[#9CA3AF]">
                            Category #{index + 1}
                          </span>

                          <span className="text-[#D1D5DB]">
                            •
                          </span>

                          <span className="text-xs text-[#9CA3AF]">
                            {productCount}{" "}
                            {productCount === 1
                              ? "product"
                              : "products"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}

                    <div className="flex items-center gap-2 sm:shrink-0">
                      {/* View */}

                      <button
                        type="button"
                        onClick={() =>
                          handleViewCategory(
                            category
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#0A0E14]"
                        title="View category"
                        aria-label={`View ${categoryName}`}
                      >
                        <Eye size={17} />
                      </button>

                      {/* Edit */}

                      <button
                        type="button"
                        onClick={() =>
                          handleEditCategory(
                            category
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#FFF5DC] hover:text-[#B8791A]"
                        title="Edit category"
                        aria-label={`Edit ${categoryName}`}
                      >
                        <Pencil size={17} />
                      </button>

                      {/* Delete */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDeleteCategory(
                            category
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-red-50 hover:text-red-600"
                        title="Delete category"
                        aria-label={`Delete ${categoryName}`}
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        )}
      </section>
    </div>
  );
}

