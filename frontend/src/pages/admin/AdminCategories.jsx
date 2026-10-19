import React, { useEffect, useState } from "react";
import {
  Plus,
  Search,
  Eye,
  Pencil,
  Trash2,
  X,
  Image as ImageIcon,
  RefreshCw,
  Tag,
  Layers3,
  CheckCircle2,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/categories";

const emptyForm = {
  name: "",
  description: "",
  image: "",
  status: "Active",
};

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [viewCategory, setViewCategory] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  const getCategoryId = (category) => category?._id || category?.id;

  const getCategoryStatus = (category) =>
    category?.status ||
    (category?.isActive === false ? "Inactive" : "Active");

  const getCategoryImage = (category) =>
    category?.image || category?.imageUrl || "";

  const getCategoryDescription = (category) =>
    category?.description || category?.details || "";

  // Fetch categories
  const fetchCategories = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Failed to load categories.");
      }

      const categoryList = Array.isArray(result)
        ? result
        : Array.isArray(result.categories)
        ? result.categories
        : Array.isArray(result.data?.categories)
        ? result.data.categories
        : Array.isArray(result.data)
        ? result.data
        : [];

      setCategories(categoryList);
    } catch (err) {
      setError(
        err.message ||
          "Unable to fetch categories. Check your backend connection."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const showMessage = (message) => {
    setSuccess(message);
    setError("");
  };

  const openAddModal = () => {
    setFormData(emptyForm);
    setSelectedCategory(null);
    setIsEditing(false);
    setIsModalOpen(true);
    setError("");
    setSuccess("");
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name || "",
      description: getCategoryDescription(category),
      image: getCategoryImage(category),
      status: getCategoryStatus(category),
    });

    setIsEditing(true);
    setIsModalOpen(true);
    setError("");
    setSuccess("");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCategory(null);
    setFormData(emptyForm);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  // Add or update category
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter a category name.");
      return;
    }

    setSaving(true);
    setError("");
    setSuccess("");

    const payload = {
      name: formData.name.trim(),
      description: formData.description.trim(),
      image: formData.image.trim(),
      status: formData.status,
    };

    const categoryId = selectedCategory
      ? getCategoryId(selectedCategory)
      : null;

    if (isEditing && !categoryId) {
      setError("Category ID is missing. Cannot update this category.");
      setSaving(false);
      return;
    }

    try {
      const response = await fetch(
        isEditing ? `${API_URL}/${categoryId}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          result.message ||
            `Failed to ${isEditing ? "update" : "add"} category.`
        );
      }

      closeModal();
      await fetchCategories();

      showMessage(
        isEditing
          ? "Category updated successfully."
          : "Category added successfully."
      );
    } catch (err) {
      setError(err.message || "Something went wrong while saving.");
    } finally {
      setSaving(false);
    }
  };

  // Delete category
  const handleDelete = async (category) => {
    const categoryId = getCategoryId(category);

    if (!categoryId) {
      setError("Category ID is missing. Cannot delete this category.");
      return;
    }

    if (
      !window.confirm(
        `Are you sure you want to delete "${category.name}"?`
      )
    ) {
      return;
    }

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${categoryId}`, {
        method: "DELETE",
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Failed to delete category.");
      }

      setCategories((previous) =>
        previous.filter((item) => getCategoryId(item) !== categoryId)
      );

      showMessage("Category deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete category.");
    }
  };

  const filteredCategories = categories.filter((category) => {
    const search = searchTerm.toLowerCase();

    return (
      (category.name || "").toLowerCase().includes(search) ||
      getCategoryDescription(category).toLowerCase().includes(search) ||
      getCategoryStatus(category).toLowerCase().includes(search)
    );
  });

  const activeCount = categories.filter(
    (category) => getCategoryStatus(category).toLowerCase() === "active"
  ).length;

  const inactiveCount = categories.length - activeCount;

  const inputClass =
    "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#14181F] outline-none transition placeholder:text-gray-400 focus:border-[#B8791A] focus:ring-2 focus:ring-[#B8791A]/20";

  const primaryButton =
    "inline-flex items-center justify-center gap-2 rounded-xl bg-[#B8791A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#9C6415] disabled:cursor-not-allowed disabled:opacity-60";

  const secondaryButton =
    "inline-flex items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm font-semibold text-[#14181F] transition hover:border-[#B8791A] hover:text-[#B8791A]";

  const cardClass =
    "rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-6";

  const labelClass = "mb-2 block text-sm font-semibold text-[#14181F]";

  return (
    <main className="min-h-screen bg-white px-4 py-8 text-[#14181F] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="rounded-lg bg-[#B8791A]/10 p-2 text-[#B8791A]">
                <Layers3 size={20} />
              </span>
              <p className="text-sm font-semibold tracking-wider text-[#B8791A]">
                ADMIN PANEL
              </p>
            </div>

            <h1 className="text-3xl font-bold tracking-tight text-[#14181F] sm:text-4xl">
              Manage Categories
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
              Organize your store categories and manage the products
              displayed on your website.
            </p>
          </div>

           <button
                    type="button"
                    onClick={openAddModal}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-2.5 text-sm font-semibold text-[#FFB020] transition hover:bg-[#14181F]"
                  >
                    <Plus size={18} />
                    Add Category
                  </button>
        </div>

        {/* Notifications */}
        {error && (
          <div
            role="alert"
            className="mb-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
          >
            <X size={18} className="mt-0.5 shrink-0" />
            <p>{error}</p>
            <button
              type="button"
              onClick={() => setError("")}
              className="ml-auto"
              aria-label="Dismiss error"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700"
          >
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <p>{success}</p>
            <button
              type="button"
              onClick={() => setSuccess("")}
              className="ml-auto"
              aria-label="Dismiss success message"
            >
              <X size={17} />
            </button>
          </div>
        )}

        {/* Statistics */}
        <div className="mb-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Categories
                </p>
                <p className="mt-3 text-3xl font-bold text-[#14181F]">
                  {categories.length}
                </p>
              </div>
              <div className="rounded-xl bg-[#B8791A]/10 p-3 text-[#B8791A]">
                <Tag size={23} />
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Active Categories
                </p>
                <p className="mt-3 text-3xl font-bold text-[#14181F]">
                  {activeCount}
                </p>
              </div>
              <div className="rounded-xl bg-green-50 p-3 text-green-600">
                <CheckCircle2 size={23} />
              </div>
            </div>
          </div>

          <div className={cardClass}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  Inactive Categories
                </p>
                <p className="mt-3 text-3xl font-bold text-[#14181F]">
                  {inactiveCount}
                </p>
              </div>
              <div className="rounded-xl bg-gray-100 p-3 text-gray-600">
                <Layers3 size={23} />
              </div>
            </div>
          </div>
        </div>

        {/* Categories Table */}
        <section className={cardClass}>
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-[#14181F]">
                All Categories
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                View and manage your store categories.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  placeholder="Search categories..."
                  className={`${inputClass} pl-10 sm:w-64`}
                />
              </div>

              <button
                type="button"
                onClick={fetchCategories}
                disabled={loading}
                className={secondaryButton}
              >
                <RefreshCw
                  size={17}
                  className={loading ? "animate-spin" : ""}
                />
                Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="flex min-h-56 flex-col items-center justify-center gap-3">
              <RefreshCw
                size={28}
                className="animate-spin text-[#B8791A]"
              />
              <p className="text-sm text-gray-500">
                Loading categories...
              </p>
            </div>
          ) : filteredCategories.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
              <div className="mb-4 rounded-2xl bg-[#B8791A]/10 p-4 text-[#B8791A]">
                <ImageIcon size={30} />
              </div>

              <h3 className="text-lg font-bold text-[#14181F]">
                {searchTerm
                  ? "No matching categories"
                  : "No categories yet"}
              </h3>

              <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500">
                {searchTerm
                  ? "Try a different search term."
                  : "Add your first category to organize your store products."}
              </p>

              {!searchTerm && (
                <button
                  type="button"
                  onClick={openAddModal}
                  className={`${primaryButton} mt-5`}
                >
                  <Plus size={17} />
                  Add Category
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] text-left text-sm">
                <thead className="bg-[#F9FAFB] text-xs uppercase tracking-wider text-gray-500">
                  <tr>
                    <th className="rounded-l-xl px-4 py-4 font-semibold">
                      Category
                    </th>
                    <th className="px-4 py-4 font-semibold">
                      Description
                    </th>
                    <th className="px-4 py-4 font-semibold">Status</th>
                    <th className="rounded-r-xl px-4 py-4 text-right font-semibold">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E5E7EB]">
                  {filteredCategories.map((category) => {
                    const status = getCategoryStatus(category);
                    const image = getCategoryImage(category);

                    return (
                      <tr
                        key={getCategoryId(category) || category.name}
                        className="transition hover:bg-[#B8791A]/5"
                      >
                        <td className="px-4 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-[#E5E7EB] bg-[#F9FAFB]">
                              {image ? (
                                <img
                                  src={image}
                                  alt={category.name || "Category"}
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <ImageIcon
                                  size={21}
                                  className="text-[#B8791A]"
                                />
                              )}
                            </div>

                            <div>
                              <p className="font-semibold text-[#14181F]">
                                {category.name || "Unnamed Category"}
                              </p>
                              <p className="mt-1 text-xs text-gray-400">
                                ID:{" "}
                                {getCategoryId(category)
                                  ? String(getCategoryId(category)).slice(-8)
                                  : "N/A"}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="max-w-xs px-4 py-4">
                          <p className="line-clamp-2 leading-6 text-gray-500">
                            {getCategoryDescription(category) ||
                              "No description provided"}
                          </p>
                        </td>

                        <td className="px-4 py-4">
                          <span
                            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                              status.toLowerCase() === "active"
                                ? "bg-green-50 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            <span
                              className={`h-1.5 w-1.5 rounded-full ${
                                status.toLowerCase() === "active"
                                  ? "bg-green-500"
                                  : "bg-gray-400"
                              }`}
                            />
                            {status}
                          </span>
                        </td>

                        <td className="px-4 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              type="button"
                              onClick={() => setViewCategory(category)}
                              title="View category"
                              aria-label="View category"
                              className="rounded-lg border border-[#E5E7EB] p-2.5 text-gray-500 transition hover:border-[#B8791A] hover:bg-[#B8791A]/10 hover:text-[#B8791A]"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() => openEditModal(category)}
                              title="Edit category"
                              aria-label="Edit category"
                              className="rounded-lg border border-[#E5E7EB] p-2.5 text-[#B8791A] transition hover:border-[#B8791A] hover:bg-[#B8791A]/10"
                            >
                              <Pencil size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDelete(category)}
                              title="Delete category"
                              aria-label="Delete category"
                              className="rounded-lg border border-[#E5E7EB] p-2.5 text-red-500 transition hover:border-red-200 hover:bg-red-50"
                            >
                              <Trash2 size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {!loading && filteredCategories.length > 0 && (
            <div className="mt-5 border-t border-[#E5E7EB] pt-4 text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-[#14181F]">
                {filteredCategories.length}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-[#14181F]">
                {categories.length}
              </span>{" "}
              categories
            </div>
          )}
        </section>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl"
          >
            <div className="flex items-start justify-between border-b border-[#E5E7EB] p-6">
              <div>
                <p className="mb-2 text-xs font-bold tracking-wider text-[#B8791A]">
                  CATEGORY MANAGEMENT
                </p>
                <h2
                  id="category-modal-title"
                  className="text-xl font-bold text-[#14181F]"
                >
                  {isEditing ? "Edit Category" : "Add New Category"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the category details below.
                </p>
              </div>

              <button
                type="button"
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#14181F]"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 p-6">
              <div>
                <label htmlFor="category-name" className={labelClass}>
                  Category Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="category-name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g. Smartphones"
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category-description"
                  className={labelClass}
                >
                  Description
                </label>
                <textarea
                  id="category-description"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Write a short category description..."
                  rows={3}
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div>
                <label htmlFor="category-image" className={labelClass}>
                  Image URL
                </label>
                <input
                  id="category-image"
                  name="image"
                  type="text"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/category.jpg"
                  className={inputClass}
                />

                {formData.image.trim() && (
                  <div className="mt-3 flex items-center gap-3 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                    <img
                      src={formData.image}
                      alt="Category preview"
                      className="h-14 w-14 rounded-lg object-cover"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <p className="break-all text-xs text-gray-500">
                      Image preview
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label htmlFor="category-status" className={labelClass}>
                  Status
                </label>
                <select
                  id="category-status"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className={inputClass}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-[#E5E7EB] pt-5 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeModal}
                  className={secondaryButton}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className={primaryButton}
                >
                  {saving ? (
                    <>
                      <RefreshCw size={17} className="animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={17} />
                      {isEditing ? "Update Category" : "Save Category"}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Category Modal */}
      {viewCategory && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setViewCategory(null);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="view-category-title"
            className="my-auto w-full max-w-md overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-[#E5E7EB] p-5">
              <h2
                id="view-category-title"
                className="text-lg font-bold text-[#14181F]"
              >
                Category Details
              </h2>
              <button
                type="button"
                onClick={() => setViewCategory(null)}
                aria-label="Close details"
                className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-[#14181F]"
              >
                <X size={20} />
              </button>
            </div>

            <div className="p-6">
              <div className="mb-5 flex h-40 items-center justify-center overflow-hidden rounded-xl bg-[#F9FAFB]">
                {getCategoryImage(viewCategory) ? (
                  <img
                    src={getCategoryImage(viewCategory)}
                    alt={viewCategory.name || "Category"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageIcon size={42} className="text-[#B8791A]" />
                )}
              </div>

              <p className="text-xs font-semibold uppercase tracking-wider text-[#B8791A]">
                Category Name
              </p>
              <h3 className="mt-1 text-xl font-bold text-[#14181F]">
                {viewCategory.name || "Unnamed Category"}
              </h3>

              <p className="mt-5 text-xs font-semibold uppercase tracking-wider text-[#B8791A]">
                Description
              </p>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-gray-500">
                {getCategoryDescription(viewCategory) ||
                  "No description provided."}
              </p>

              <div className="mt-5 flex items-center justify-between border-t border-[#E5E7EB] pt-5">
                <span className="text-sm font-medium text-gray-500">
                  Status
                </span>
                <span
                  className={`rounded-full px-3 py-1.5 text-xs font-semibold ${
                    getCategoryStatus(viewCategory).toLowerCase() === "active"
                      ? "bg-green-50 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {getCategoryStatus(viewCategory)}
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  const category = viewCategory;
                  setViewCategory(null);
                  openEditModal(category);
                }}
                className={`${primaryButton} mt-6 w-full`}
              >
                <Pencil size={17} />
                Edit Category
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
