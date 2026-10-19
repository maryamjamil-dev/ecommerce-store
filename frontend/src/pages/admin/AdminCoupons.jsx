import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  TicketPercent,
  CheckCircle2,
  Clock3,
  XCircle,
  Ban,
  Power,
  RefreshCw,
  LoaderCircle,
  X,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/coupons";
const COUPONS_PER_PAGE = 6;

const statusOptions = ["All", "Active", "Inactive", "Expired", "Used Up"];
const typeOptions = ["All", "Percentage", "Fixed"];

const EMPTY_FORM = {
  code: "",
  description: "",
  discountType: "percentage",
  discountValue: "",
  minOrderAmount: "",
  maxDiscount: "",
  usageLimit: "",
  expiresAt: "",
};

const formatDate = (value) =>
  value
    ? new Date(value).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "No expiry";

const getStatus = (c) => {
  if (!c.isActive) return "Inactive";
  if (c.expiresAt && new Date(c.expiresAt) <= new Date()) return "Expired";
  if (
    c.usageLimit !== null &&
    c.usageLimit !== undefined &&
    c.usedCount >= c.usageLimit
  )
    return "Used Up";
  return "Active";
};

// Backend coupon -> UI format
const normalizeCoupon = (c) => ({
  id: c._id || c.id || "",
  code: c.code || "",
  description: c.description || "",
  discountType: c.discountType,
  type: c.discountType === "fixed" ? "Fixed" : "Percentage",
  discount: Number(c.discountValue) || 0,
  minOrder: Number(c.minOrderAmount) || 0,
  maxDiscount: c.maxDiscount ?? null,
  usageLimit: c.usageLimit ?? null,
  used: c.usedCount || 0,
  isActive: c.isActive !== false,
  expiresAt: c.expiresAt || null,
  expiry: formatDate(c.expiresAt),
  status: getStatus(c),
});

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-50 text-green-700 border-green-200",
    Inactive: "bg-gray-100 text-gray-600 border-gray-200",
    Expired: "bg-red-50 text-red-700 border-red-200",
    "Used Up": "bg-yellow-50 text-yellow-700 border-yellow-200",
  };

  const icons = {
    Active: CheckCircle2,
    Inactive: Ban,
    Expired: XCircle,
    "Used Up": Clock3,
  };

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState("");
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);

  const fetchCoupons = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not load coupons.");
      }

      const list = Array.isArray(result)
        ? result
        : result.coupons || result.data || [];

      setCoupons(list.map(normalizeCoupon));
    } catch (err) {
      setCoupons([]);
      setError(err.message || "Backend unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons();
  }, [fetchCoupons]);

  const filteredCoupons = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return coupons.filter((coupon) => {
      const matchesSearch =
        !search ||
        coupon.code.toLowerCase().includes(search) ||
        coupon.type.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || coupon.status === statusFilter;

      const matchesType = typeFilter === "All" || coupon.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [coupons, searchTerm, statusFilter, typeFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredCoupons.length / COUPONS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * COUPONS_PER_PAGE;
  const currentCoupons = filteredCoupons.slice(
    startIndex,
    startIndex + COUPONS_PER_PAGE
  );

  const activeCount = coupons.filter((c) => c.status === "Active").length;
  const inactiveCount = coupons.filter((c) => c.status === "Inactive").length;
  const expiredCount = coupons.filter((c) => c.status === "Expired").length;

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  // Modals
  const openAddModal = () => {
    setForm(EMPTY_FORM);
    setSelectedCoupon(null);
    setError("");
    setModal("add");
  };

  const openEditModal = (coupon) => {
    setSelectedCoupon(coupon);
    setForm({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType || "percentage",
      discountValue: String(coupon.discount),
      minOrderAmount: coupon.minOrder ? String(coupon.minOrder) : "",
      maxDiscount: coupon.maxDiscount !== null ? String(coupon.maxDiscount) : "",
      usageLimit: coupon.usageLimit !== null ? String(coupon.usageLimit) : "",
      expiresAt: coupon.expiresAt
        ? new Date(coupon.expiresAt).toISOString().slice(0, 10)
        : "",
    });
    setError("");
    setModal("edit");
  };

  const openViewModal = (coupon) => {
    setSelectedCoupon(coupon);
    setModal("view");
  };

  const closeModal = () => {
    if (saving) return;
    setModal("");
    setSelectedCoupon(null);
    setForm(EMPTY_FORM);
    setError("");
  };

  const updateForm = (field, value) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  // Create / Update
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const discountValue = Number(form.discountValue);

    if (!form.code.trim()) {
      setError("Coupon code is required.");
      return;
    }

    if (!Number.isFinite(discountValue) || discountValue <= 0) {
      setError("Discount value must be greater than zero.");
      return;
    }

    if (form.discountType === "percentage" && discountValue > 100) {
      setError("Percentage cannot exceed 100.");
      return;
    }

    if (
      form.usageLimit !== "" &&
      (!Number.isInteger(Number(form.usageLimit)) || Number(form.usageLimit) < 1)
    ) {
      setError("Usage limit must be a whole number of 1 or more.");
      return;
    }

    const isEditing = modal === "edit";

    const body = {
      code: form.code.trim().toUpperCase(),
      description: form.description.trim(),
      discountType: form.discountType,
      discountValue,
      minOrderAmount: form.minOrderAmount === "" ? 0 : Number(form.minOrderAmount),
      maxDiscount:
        form.discountType === "percentage" && form.maxDiscount !== ""
          ? Number(form.maxDiscount)
          : null,
      usageLimit: form.usageLimit === "" ? null : Number(form.usageLimit),
      expiresAt: form.expiresAt
        ? new Date(`${form.expiresAt}T23:59:59`).toISOString()
        : null,
    };

    setSaving(true);

    try {
      const response = await fetch(
        isEditing ? `${API_URL}/${selectedCoupon.id}` : API_URL,
        {
          method: isEditing ? "PUT" : "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not save coupon.");
      }

      setModal("");
      setSelectedCoupon(null);
      setForm(EMPTY_FORM);
      setSuccess(
        isEditing
          ? "Coupon updated successfully."
          : "Coupon created successfully."
      );
      await fetchCoupons();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  // Active / Inactive toggle
  const handleToggle = async (coupon) => {
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${coupon.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not update coupon.");
      }

      setSuccess(
        coupon.isActive ? "Coupon deactivated." : "Coupon activated."
      );
      await fetchCoupons();
    } catch (err) {
      setError(err.message || "Unable to update coupon.");
    }
  };

  // Delete
  const handleDelete = async (coupon) => {
    if (!window.confirm(`Delete coupon "${coupon.code}"?`)) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${coupon.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Could not delete coupon.");
      }

      setSuccess("Coupon deleted successfully.");
      await fetchCoupons();
    } catch (err) {
      setError(err.message || "Unable to delete coupon.");
    }
  };

  const formatDiscount = (coupon) =>
    coupon.type === "Percentage"
      ? `${coupon.discount}%`
      : `Rs. ${coupon.discount.toLocaleString()}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A0E14]">Coupons</h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage discount coupons for your store.
          </p>
        </div>

        <button
          type="button"
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-2.5 text-sm font-semibold text-[#FFB020] transition hover:bg-[#14181F]"
        >
          <Plus size={18} />
          Add Coupon
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Coupons"
          value={coupons.length}
          bg="bg-[#FFF5DF]"
          icon={<TicketPercent size={21} className="text-[#B8791A]" />}
        />
        <StatCard
          title="Active"
          value={activeCount}
          bg="bg-green-50"
          icon={<CheckCircle2 size={21} className="text-green-600" />}
        />
        <StatCard
          title="Inactive"
          value={inactiveCount}
          bg="bg-gray-100"
          icon={<Ban size={21} className="text-gray-500" />}
        />
        <StatCard
          title="Expired"
          value={expiredCount}
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
              placeholder="Search coupon code..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => handleFilterChange(setStatusFilter, e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === "All" ? "All Status" : status}
              </option>
            ))}
          </select>

          <select
            value={typeFilter}
            onChange={(e) => handleFilterChange(setTypeFilter, e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
          >
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type === "All" ? "All Types" : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="font-bold text-[#0A0E14]">Coupon List</h2>
          <button
            type="button"
            onClick={fetchCoupons}
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
            Loading coupons...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1050px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Coupon", "Discount", "Min. Order", "Usage", "Expiry", "Status"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        {h}
                      </th>
                    )
                  )}
                  <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {currentCoupons.length > 0 ? (
                  currentCoupons.map((coupon) => {
                    const hasLimit = coupon.usageLimit !== null;
                    const usagePercentage = hasLimit
                      ? Math.round((coupon.used / coupon.usageLimit) * 100)
                      : 0;

                    return (
                      <tr
                        key={coupon.id}
                        className="border-b border-gray-100 transition hover:bg-gray-50"
                      >
                        <td className="px-5 py-4">
                          <p className="font-bold tracking-wide text-[#0A0E14]">
                            {coupon.code}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">
                            {coupon.type} discount
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="font-semibold text-[#B8791A]">
                            {formatDiscount(coupon)}
                          </span>
                        </td>

                        <td className="px-5 py-4 text-sm text-gray-600">
                          Rs. {coupon.minOrder.toLocaleString()}
                        </td>

                        <td className="px-5 py-4">
                          <div className="w-36">
                            {hasLimit ? (
                              <>
                                <div className="mb-1 flex items-center justify-between text-xs">
                                  <span className="text-gray-500">
                                    {coupon.used}/{coupon.usageLimit}
                                  </span>
                                  <span className="font-semibold text-gray-700">
                                    {usagePercentage}%
                                  </span>
                                </div>
                                <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                                  <div
                                    className="h-full rounded-full bg-[#FFB020]"
                                    style={{
                                      width: `${Math.min(usagePercentage, 100)}%`,
                                    }}
                                  />
                                </div>
                              </>
                            ) : (
                              <span className="text-xs text-gray-500">
                                {coupon.used} used (no limit)
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                          {coupon.expiry}
                        </td>

                        <td className="px-5 py-4">
                          <StatusBadge status={coupon.status} />
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-2">
                            <IconButton
                              title="View coupon"
                              onClick={() => openViewModal(coupon)}
                            >
                              <Eye size={16} />
                            </IconButton>

                            <IconButton
                              title="Edit coupon"
                              onClick={() => openEditModal(coupon)}
                            >
                              <Pencil size={16} />
                            </IconButton>

                            <IconButton
                              title={coupon.isActive ? "Deactivate" : "Activate"}
                              onClick={() => handleToggle(coupon)}
                            >
                              <Power size={16} />
                            </IconButton>

                            <button
                              type="button"
                              onClick={() => handleDelete(coupon)}
                              title="Delete coupon"
                              className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="7" className="px-5 py-12 text-center">
                      <TicketPercent
                        size={36}
                        className="mx-auto text-gray-300"
                      />
                      <h3 className="mt-3 text-base font-semibold text-[#0A0E14]">
                        No coupons found
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add a coupon or try changing your filters.
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
                {Math.min(startIndex + COUPONS_PER_PAGE, filteredCoupons.length)}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {filteredCoupons.length}
              </span>{" "}
              coupons
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
                  {modal === "edit" ? "Edit Coupon" : "Add Coupon"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the coupon details below.
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
              <Field label="Coupon Code">
                <input
                  value={form.code}
                  onChange={(e) => updateForm("code", e.target.value.toUpperCase())}
                  placeholder="e.g. WELCOME10"
                  className={inputClass}
                />
              </Field>

              <Field label="Description (optional)">
                <input
                  value={form.description}
                  onChange={(e) => updateForm("description", e.target.value)}
                  placeholder="e.g. 10% off for new customers"
                  className={inputClass}
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Discount Type">
                  <select
                    value={form.discountType}
                    onChange={(e) => updateForm("discountType", e.target.value)}
                    className={inputClass}
                  >
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed (Rs.)</option>
                  </select>
                </Field>

                <Field
                  label={
                    form.discountType === "percentage"
                      ? "Discount Value (%)"
                      : "Discount Value (Rs.)"
                  }
                >
                  <input
                    type="number"
                    min="0"
                    step="any"
                    value={form.discountValue}
                    onChange={(e) => updateForm("discountValue", e.target.value)}
                    placeholder={form.discountType === "percentage" ? "10" : "500"}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Min. Order Amount (Rs.)">
                  <input
                    type="number"
                    min="0"
                    value={form.minOrderAmount}
                    onChange={(e) => updateForm("minOrderAmount", e.target.value)}
                    placeholder="0"
                    className={inputClass}
                  />
                </Field>

                {form.discountType === "percentage" && (
                  <Field label="Max Discount (Rs.)">
                    <input
                      type="number"
                      min="0"
                      value={form.maxDiscount}
                      onChange={(e) => updateForm("maxDiscount", e.target.value)}
                      placeholder="No cap"
                      className={inputClass}
                    />
                  </Field>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Usage Limit">
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={form.usageLimit}
                    onChange={(e) => updateForm("usageLimit", e.target.value)}
                    placeholder="Unlimited"
                    className={inputClass}
                  />
                </Field>

                <Field label="Expiry Date">
                  <input
                    type="date"
                    value={form.expiresAt}
                    onChange={(e) => updateForm("expiresAt", e.target.value)}
                    className={inputClass}
                  />
                </Field>
              </div>

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
                      : "Add Coupon"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View modal */}
      {modal === "view" && selectedCoupon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0A0E14]">Coupon Details</h2>
              <button onClick={closeModal} aria-label="Close details">
                <X size={21} />
              </button>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <DetailRow label="Code" value={selectedCoupon.code} />
              <DetailRow
                label="Description"
                value={selectedCoupon.description || "-"}
              />
              <DetailRow label="Type" value={selectedCoupon.type} />
              <DetailRow label="Discount" value={formatDiscount(selectedCoupon)} />
              <DetailRow
                label="Min. Order"
                value={`Rs. ${selectedCoupon.minOrder.toLocaleString()}`}
              />
              <DetailRow
                label="Max Discount"
                value={
                  selectedCoupon.maxDiscount !== null
                    ? `Rs. ${selectedCoupon.maxDiscount.toLocaleString()}`
                    : "No cap"
                }
              />
              <DetailRow
                label="Usage"
                value={`${selectedCoupon.used} / ${
                  selectedCoupon.usageLimit ?? "Unlimited"
                }`}
              />
              <DetailRow label="Expiry" value={selectedCoupon.expiry} />
              <DetailRow label="Status" value={selectedCoupon.status} />
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

const inputClass =
  "h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20";

function StatCard({ title, value, icon, bg }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">{value}</h2>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${bg}`}
        >
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