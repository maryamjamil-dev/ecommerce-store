import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Package,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react";

import  products from "../../data/products";

const PRODUCTS_PER_PAGE = 10;

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================
  // Categories
  // =========================================

  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(
        products
          .map((product) => product.category)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueCategories];
  }, []);

  // =========================================
  // Filter Products
  // =========================================

  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return products.filter((product) => {
      const matchesSearch =
        !search ||
        product.name?.toLowerCase().includes(search) ||
        product.brand?.toLowerCase().includes(search) ||
        String(product.id)
          .toLowerCase()
          .includes(search);

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  // =========================================
  // Pagination
  // =========================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredProducts.length / PRODUCTS_PER_PAGE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) * PRODUCTS_PER_PAGE;

  const endIndex =
    startIndex + PRODUCTS_PER_PAGE;

  const currentProducts =
    filteredProducts.slice(
      startIndex,
      endIndex
    );

  // =========================================
  // Handlers
  // =========================================

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(1, page - 1)
    );
  };

  const handleNextPage = () => {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1)
    );
  };

  const handleViewProduct = (product) => {
    console.log("View product:", product);
  };

  const handleEditProduct = (product) => {
    console.log("Edit product:", product);
  };

  const handleDeleteProduct = (product) => {
    console.log("Delete product:", product);
  };

  const handleAddProduct = () => {
    console.log("Add product");
  };

  // =========================================
  // Stats
  // =========================================

  const totalCategories = categories.length - 1;

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
            Products
          </h1>

          <p className="mt-1 text-sm text-[#6B7280]">
            Manage your store products and inventory.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddProduct}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1A2029]"
        >
          <Plus size={18} />

          Add Product
        </button>
      </div>

      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Categories */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Categories
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {totalCategories}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5DC] text-[#B8791A]">
              <SlidersHorizontal size={21} />
            </div>
          </div>
        </div>

        {/* Showing */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-sm font-medium text-[#6B7280]">
              Current Results
            </p>

            <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
              {filteredProducts.length}
            </p>

            <p className="mt-1 text-xs text-[#9CA3AF]">
              Products matching your filters
            </p>
          </div>
        </div>
      </div>

      {/* =====================================
          FILTERS
      ===================================== */}

      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}

          <div className="relative min-w-0 flex-1">
            <Search
              size={19}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by product name, brand, or ID..."
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] pl-11 pr-4 text-sm text-[#0A0E14] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            />
          </div>

          {/* Category */}

          <div className="w-full lg:w-60">
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-4 text-sm text-[#374151] outline-none transition focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                >
                  {category}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* =====================================
          PRODUCTS TABLE
      ===================================== */}

      <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
        {/* Table Header */}

        <div className="flex flex-col gap-2 border-b border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-[#0A0E14]">
              Product List
            </h2>

            <p className="mt-1 text-xs text-[#9CA3AF]">
              Showing{" "}
              {filteredProducts.length === 0
                ? 0
                : startIndex + 1}
              -
              {Math.min(
                endIndex,
                filteredProducts.length
              )}{" "}
              of {filteredProducts.length} products
            </p>
          </div>
        </div>

        {/* Empty State */}

        {currentProducts.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6] text-[#9CA3AF]">
              <Package size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#0A0E14]">
              No products found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-[#6B7280]">
              Try changing your search or category
              filter.
            </p>
          </div>
        ) : (
          <>
            {/* Responsive Table */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Product
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Category
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Brand
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Price
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Rating
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E5E7EB]">
                  {currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="transition hover:bg-[#FAFAF8]"
                    >
                      {/* Product */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 shrink-0 overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F7F7F5]">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.name}
                                className="h-full w-full object-contain p-1"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-[#9CA3AF]">
                                <Package size={19} />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0">
                            <p className="max-w-[260px] truncate text-sm font-semibold text-[#0A0E14]">
                              {product.name}
                            </p>

                            <p className="mt-1 text-xs text-[#9CA3AF]">
                              ID: {product.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}

                      <td className="px-5 py-4">
                        <span className="rounded-full bg-[#F3F4F6] px-3 py-1.5 text-xs font-medium text-[#4B5563]">
                          {product.category ||
                            "Uncategorized"}
                        </span>
                      </td>

                      {/* Brand */}

                      <td className="px-5 py-4 text-sm text-[#374151]">
                        {product.brand || "—"}
                      </td>

                      {/* Price */}

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-[#0A0E14]">
                          {product.price}
                        </p>

                        {product.oldPrice && (
                          <p className="mt-1 text-xs text-[#9CA3AF] line-through">
                            {product.oldPrice}
                          </p>
                        )}
                      </td>

                      {/* Rating */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-sm font-semibold text-[#0A0E14]">
                            {product.rating ?? "—"}
                          </span>

                          {product.reviews !==
                            undefined && (
                            <span className="text-xs text-[#9CA3AF]">
                              ({product.reviews})
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          {/* View */}

                          <button
                            type="button"
                            onClick={() =>
                              handleViewProduct(
                                product
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#0A0E14]"
                            title="View product"
                            aria-label={`View ${product.name}`}
                          >
                            <Eye size={17} />
                          </button>

                          {/* Edit */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEditProduct(
                                product
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#FFF5DC] hover:text-[#B8791A]"
                            title="Edit product"
                            aria-label={`Edit ${product.name}`}
                          >
                            <Pencil size={17} />
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteProduct(
                                product
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-red-50 hover:text-red-600"
                            title="Delete product"
                            aria-label={`Delete ${product.name}`}
                          >
                            <Trash2 size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* =================================
                PAGINATION
            ================================= */}

            <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#6B7280]">
                Page {safeCurrentPage} of{" "}
                {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={safeCurrentPage === 1}
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium text-[#374151] transition hover:bg-[#F7F7F5] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />

                  <span className="hidden sm:inline">
                    Previous
                  </span>
                </button>

                <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#0A0E14] px-3 text-sm font-semibold text-white">
                  {safeCurrentPage}
                </div>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={
                    safeCurrentPage === totalPages
                  }
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium text-[#374151] transition hover:bg-[#F7F7F5] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">
                    Next
                  </span>

                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

