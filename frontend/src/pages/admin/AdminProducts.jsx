import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  Package,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  Star,
  RefreshCw,
  LoaderCircle,
  X,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/admin/products";
const CATEGORIES_URL = "http://localhost:3000/api/categories";
const PRODUCTS_PER_PAGE = 8;
const LOW_STOCK = 5;

const EMPTY_FORM = {
  title: "",
  category: "",
  brand: "",
  price: "",
  oldPrice: "",
  discount: "",
  stock: "",
  image: "",
  description: "",
};

const inputClass =
  "h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20";

const getStockStatus = (p) => {
  if (p.stock <= 0) return "Out of Stock";
  if (p.stock <= LOW_STOCK) return "Low Stock";
  return "In Stock";
};

const normalizeProduct = (p) => ({
  id: p._id || p.id || "",
  title: p.title || "Untitled",
  category: p.category || "",
  brand: p.brand || "",
  price: Number(p.price) || 0,
  oldPrice: p.oldPrice ?? null,
  discount: p.discount || "",
  stock: Number(p.stock) || 0,
  image: p.image || "",
  description: p.description || "",
  rating: Number(p.rating) || 0,
  reviews: Number(p.reviews) || 0,
});

async function request(url, method = "GET", body) {
  const response = await fetch(url, {
    method,
    credentials: "include",
    headers: {
      Accept: "application/json",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const result = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(result.message || "Request failed.");
  }

  return result;
}

function StockBadge({ status }) {
  const styles = {
    "In Stock": "bg-green-50 text-green-700 border-green-200",
    "Low Stock": "bg-yellow-50 text-yellow-700 border-yellow-200",
    "Out of Stock": "bg-red-50 text-red-700 border-red-200",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [stockFilter, setStockFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await request(API_URL);
      const list = Array.isArray(result)
        ? result
        : result.products || result.data || [];
      setProducts(list.map(normalizeProduct));
    } catch (err) {
      setProducts([]);
      setError(err.message || "Backend unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await request(CATEGORIES_URL);
      const list = Array.isArray(result)
        ? result
        : result.categories || result.data || [];
      setCategories(
        list.map((c) => (typeof c === "string" ? c : c.name)).filter(Boolean)
      );
    } catch {
      setCategories([]);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, [fetchProducts, fetchCategories]);

  const categoryOptions = useMemo(
    () =>
      [...new Set([...categories, ...products.map((p) => p.category)])]
        .filter(Boolean)
        .sort(),
    [categories, products]
  );

  const filteredProducts = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return products.filter((p) => {
      const matchesSearch =
        !search ||
        p.title.toLowerCase().includes(search) ||
        p.brand.toLowerCase().includes(search) ||
        p.category.toLowerCase().includes(search);

      const matchesCategory =
        categoryFilter === "All" || p.category === categoryFilter;

      const matchesStock =
        stockFilter === "All" || getStockStatus(p) === stockFilter;

      return matchesSearch && matchesCategory && matchesStock;
    });
  }, [products, searchTerm, categoryFilter, stockFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  const inStockCount = products.filter((p) => p.stock > LOW_STOCK).length;
  const lowStockCount = products.filter(
    (p) => p.stock > 0 && p.stock <= LOW_STOCK
  ).length;
  const outOfStockCount = products.filter((p) => p.stock <= 0).length;

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setSelectedProduct(null);
    setError("");
    setModal("add");
  };

  const openEditModal = (product) => {
    setSelectedProduct(product);
    setForm({
      title: product.title,
      category: product.category,
      brand: product.brand,
      price: String(product.price),
      oldPrice: product.oldPrice !== null ? String(product.oldPrice) : "",
      discount: product.discount,
      stock: String(product.stock),
      image: product.image,
      description: product.description,
    });
    setError("");
    setModal("edit");
  };

  const openViewModal = (product) => {
    setSelectedProduct(product);
    setModal("view");
  };

  const closeModal = () => {
    if (saving) return;
    setModal("");
    setSelectedProduct(null);
    setForm(EMPTY_FORM);
    setError("");
  };

  const updateForm = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const price = Number(form.price);
    const stock = form.stock === "" ? 0 : Number(form.stock);
    const oldPrice = form.oldPrice === "" ? "" : Number(form.oldPrice);

    if (!form.title.trim()) return setError("Product title is required.");
    if (!form.category) return setError("Please select a category.");
    if (!form.brand.trim()) return setError("Brand is required.");
    if (form.price === "" || !Number.isFinite(price) || price < 0)
      return setError("Price must be 0 or more.");
    if (oldPrice !== "" && (!Number.isFinite(oldPrice) || oldPrice < 0))
      return setError("Old price must be 0 or more.");
    if (!Number.isInteger(stock) || stock < 0)
      return setError("Stock must be a whole number, 0 or more.");
    if (!form.image.trim()) return setError("Image URL is required.");
    if (!form.description.trim()) return setError("Description is required.");

    const isEditing = modal === "edit";

    setSaving(true);

    try {
      await request(
        isEditing ? `${API_URL}/${selectedProduct.id}` : API_URL,
        isEditing ? "PUT" : "POST",
        {
          title: form.title.trim(),
          category: form.category,
          brand: form.brand.trim(),
          price,
          oldPrice,
          discount: form.discount.trim(),
          stock,
          image: form.image.trim(),
          description: form.description.trim(),
        }
      );

      setModal("");
      setSelectedProduct(null);
      setForm(EMPTY_FORM);
      setSuccess(
        isEditing
          ? "Product updated successfully."
          : "Product added successfully."
      );
      await fetchProducts();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm(`Delete "${product.title}"?`)) return;

    setError("");
    setSuccess("");

    try {
      await request(`${API_URL}/${product.id}`, "DELETE");
      setSuccess("Product deleted successfully.");
      await fetchProducts();
    } catch (err) {
      setError(err.message || "Unable to delete product.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A0E14]">Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Add and manage products in your electronics store.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-2.5 text-sm font-semibold text-[#FFB020] transition hover:bg-[#14181F]"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Notifications */}
      {error && !modal && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={() => setError("")} aria-label="Dismiss error">
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <span>{success}</span>
          <button onClick={() => setSuccess("")} aria-label="Dismiss message">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Products"
          value={products.length}
          bg="bg-[#FFF5DF]"
          icon={<Package size={21} className="text-[#B8791A]" />}
        />
        <StatCard
          title="In Stock"
          value={inStockCount}
          bg="bg-green-50"
          icon={<CheckCircle2 size={21} className="text-green-600" />}
        />
        <StatCard
          title="Low Stock"
          value={lowStockCount}
          bg="bg-yellow-50"
          icon={<AlertTriangle size={21} className="text-yellow-600" />}
        />
        <StatCard
          title="Out of Stock"
          value={outOfStockCount}
          bg="bg-red-50"
          icon={<XCircle size={21} className="text-red-500" />}
        />
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by title, brand or category..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => handleFilterChange(setCategoryFilter, e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
          >
            <option value="All">All Categories</option>
            {categoryOptions.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <select
            value={stockFilter}
            onChange={(e) => handleFilterChange(setStockFilter, e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
          >
            <option value="All">All Stock</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="font-bold text-[#0A0E14]">Product List</h2>
          <button
            type="button"
            onClick={fetchProducts}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-gray-500">
            <LoaderCircle className="animate-spin" size={21} />
            Loading products...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Product", "Category", "Price", "Stock", "Status"].map((h) => (
                    <th
                      key={h}
                      className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                    >
                      {h}
                    </th>
                  ))}
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentProducts.length > 0 ? (
                  currentProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-gray-200 bg-[#F7F7F5]">
                            {product.image ? (
                              <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <Package size={20} className="text-[#B8791A]" />
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="max-w-[240px] truncate font-semibold text-[#0A0E14]">
                              {product.title}
                            </p>
                            <p className="mt-0.5 text-xs text-gray-500">
                              {product.brand}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {product.category}
                      </td>

                      <td className="whitespace-nowrap px-5 py-4">
                        <p className="text-sm font-semibold text-[#B8791A]">
                          Rs. {product.price.toLocaleString()}
                        </p>
                        {product.oldPrice !== null &&
                          product.oldPrice > product.price && (
                            <p className="text-xs text-gray-400 line-through">
                              Rs. {product.oldPrice.toLocaleString()}
                            </p>
                          )}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-[#0A0E14]">
                        {product.stock}
                      </td>

                      <td className="px-5 py-4">
                        <StockBadge status={getStockStatus(product)} />
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <IconButton
                            title="View product"
                            onClick={() => openViewModal(product)}
                          >
                            <Eye size={16} />
                          </IconButton>
                          <IconButton
                            title="Edit product"
                            onClick={() => openEditModal(product)}
                          >
                            <Pencil size={16} />
                          </IconButton>
                          <button
                            type="button"
                            onClick={() => handleDelete(product)}
                            title="Delete product"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-5 py-12 text-center">
                      <Package size={36} className="mx-auto text-gray-300" />
                      <h3 className="mt-3 text-base font-semibold text-[#0A0E14]">
                        No products found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add a product or try changing your filters.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">{startIndex + 1}</span>{" "}
              to{" "}
              <span className="font-semibold text-gray-700">
                {Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {filteredProducts.length}
              </span>{" "}
              products
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                    safePage === page
                      ? "bg-[#0A0E14] text-[#FFB020]"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit modal */}
      {(modal === "add" || modal === "edit") && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0A0E14]">
                  {modal === "edit" ? "Edit Product" : "Add Product"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the product details below.
                </p>
              </div>
              <button onClick={closeModal} aria-label="Close modal">
                <X size={21} />
              </button>
            </div>

            {error && (
              <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Field label="Product Title">
                <input
                  value={form.title}
                  onChange={(e) => updateForm("title", e.target.value)}
                  placeholder="e.g. Wireless Headphones"
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Category">
                  <select
                    value={form.category}
                    onChange={(e) => updateForm("category", e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Select category</option>
                    {categoryOptions.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label="Brand">
                  <input
                    value={form.brand}
                    onChange={(e) => updateForm("brand", e.target.value)}
                    placeholder="e.g. Sony"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Price (Rs.)">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={form.price}
                    onChange={(e) => updateForm("price", e.target.value)}
                    placeholder="15000"
                    className={inputClass}
                  />
                </Field>

                <Field label="Old Price (optional)">
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={form.oldPrice}
                    onChange={(e) => updateForm("oldPrice", e.target.value)}
                    placeholder="18000"
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Discount Label (optional)">
                  <input
                    value={form.discount}
                    onChange={(e) => updateForm("discount", e.target.value)}
                    placeholder="Auto if old price is set"
                    className={inputClass}
                  />
                </Field>

                <Field label="Stock">
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={form.stock}
                    onChange={(e) => updateForm("stock", e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </Field>
              </div>

              <Field label="Image URL">
                <input
                  value={form.image}
                  onChange={(e) => updateForm("image", e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className={inputClass}
                />
              </Field>

              {form.image.trim() && (
                <img
                  src={form.image.trim()}
                  alt="Preview"
                  className="h-28 w-full rounded-xl bg-gray-50 object-contain"
                  onError={(e) => (e.currentTarget.style.display = "none")}
                  onLoad={(e) => (e.currentTarget.style.display = "block")}
                />
              )}

              <Field label="Description">
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  placeholder="Describe this product..."
                  className="w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 py-3 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                />
              </Field>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0A0E14] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving && <LoaderCircle size={16} className="animate-spin" />}
                  {saving
                    ? "Saving..."
                    : modal === "edit"
                      ? "Save Changes"
                      : "Add Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View modal */}
      {modal === "view" && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4">
          <div className="my-auto w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0A0E14]">Product Details</h2>
              <button onClick={closeModal} aria-label="Close details">
                <X size={21} />
              </button>
            </div>

            {selectedProduct.image && (
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="mt-5 h-40 w-full rounded-xl bg-gray-50 object-contain"
              />
            )}

            <dl className="mt-5 space-y-3 text-sm">
              <DetailRow label="Title" value={selectedProduct.title} />
              <DetailRow label="Category" value={selectedProduct.category} />
              <DetailRow label="Brand" value={selectedProduct.brand} />
              <DetailRow
                label="Price"
                value={`Rs. ${selectedProduct.price.toLocaleString()}`}
              />
              <DetailRow
                label="Old Price"
                value={
                  selectedProduct.oldPrice !== null
                    ? `Rs. ${selectedProduct.oldPrice.toLocaleString()}`
                    : "-"
                }
              />
              <DetailRow label="Discount" value={selectedProduct.discount || "-"} />
              <DetailRow label="Stock" value={selectedProduct.stock} />
              <DetailRow
                label="Rating"
                value={
                  <span className="inline-flex items-center gap-1">
                    <Star size={14} className="fill-[#FFB020] text-[#FFB020]" />
                    {selectedProduct.rating.toFixed(1)} ({selectedProduct.reviews}{" "}
                    reviews)
                  </span>
                }
              />
              <DetailRow
                label="Description"
                value={selectedProduct.description || "No description provided."}
              />
            </dl>

            <button
              onClick={closeModal}
              className="mt-6 w-full rounded-xl bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, bg }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">{value}</h2>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${bg}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function IconButton({ children, title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      aria-label={title}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-[#FFB020] hover:bg-[#FFF5DF] hover:text-[#B8791A]"
    >
      {children}
    </button>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-[#0A0E14]">
        {label}
      </span>
      {children}
    </label>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-gray-100 pb-2">
      <dt className="text-gray-500">{label}</dt>
      <dd className="break-words text-right font-semibold text-[#0A0E14]">
        {value}
      </dd>
    </div>
  );
}