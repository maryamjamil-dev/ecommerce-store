import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  LoaderCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

// Apne backend ke port ke mutabiq URL change karein.
const API_URL = "http://localhost:3000/api/addresses";

const initialForm = {
  type: "Home",
  fullName: "",
  phone: "",
  address: "",
  city: "",
  province: "",
  postalCode: "",
  country: "Pakistan",
};

export default function Addresses() {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const request = useCallback(async (path = "", options = {}) => {
    const response = await fetch(`${API_URL}${path}`, {
      ...options,
      credentials: "include",
      headers: {
        ...(options.body ? { "Content-Type": "application/json" } : {}),
        ...options.headers,
      },
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong.");
    }

    return data;
  }, []);

  const loadAddresses = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const data = await request();
      setAddresses(data.addresses || []);
    } catch (err) {
      setError(err.message || "Failed to load addresses.");
    } finally {
      setLoading(false);
    }
  }, [request]);

  useEffect(() => {
    if (user) {
      loadAddresses();
    } else {
      setAddresses([]);
      setLoading(false);
    }
  }, [user, loadAddresses]);

  const resetForm = () => {
    setFormData({
      ...initialForm,
      fullName: user?.name || "",
    });
    setEditingId(null);
    setShowForm(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (address) => {
    setError("");
    setSuccess("");
    setEditingId(address._id);

    setFormData({
      type: address.type || "Home",
      fullName: address.fullName || "",
      phone: address.phone || "",
      address: address.address || "",
      city: address.city || "",
      province: address.province || "",
      postalCode: address.postalCode || "",
      country: address.country || "Pakistan",
    });

    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      // Sirf woh fields send karein jo backend schema support karta hai.
      const payload = {
        fullName: formData.fullName.trim(),
        phone: formData.phone.trim(),
        address: formData.address.trim(),
        city: formData.city.trim(),
        postalCode: formData.postalCode.trim(),
        country: formData.country.trim(),
      };

      let data;

      if (editingId) {
        data = await request(`/${editingId}`, {
          method: "PUT",
          body: JSON.stringify(payload),
        });
      } else {
        data = await request("", {
          method: "POST",
          body: JSON.stringify({
            ...payload,
            isDefault: addresses.length === 0,
          }),
        });
      }

      await loadAddresses();
      resetForm();
      setSuccess(data.message || "Address saved successfully.");
    } catch (err) {
      setError(err.message || "Unable to save address.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this address?")) {
      return;
    }

    setActionId(id);
    setError("");
    setSuccess("");

    try {
      const data = await request(`/${id}`, {
        method: "DELETE",
      });

      await loadAddresses();
      setSuccess(data.message || "Address deleted successfully.");
    } catch (err) {
      setError(err.message || "Unable to delete address.");
    } finally {
      setActionId(null);
    }
  };

  const handleSetDefault = async (address) => {
    setActionId(address._id);
    setError("");
    setSuccess("");

    try {
      const data = await request(`/${address._id}`, {
        method: "PUT",
        body: JSON.stringify({ isDefault: true }),
      });

      await loadAddresses();
      setSuccess(data.message || "Default address updated.");
    } catch (err) {
      setError(err.message || "Unable to update default address.");
    } finally {
      setActionId(null);
    }
  };

  if (!user) {
    return (
      <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7] text-[#FFB020]">
            <MapPin size={28} />
          </div>

          <h1 className="text-2xl font-bold text-[#14181F]">
            Sign in to manage addresses
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Please sign in to view and manage your saved delivery addresses.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-lg bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <Link
          to="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] transition hover:text-[#14181F]"
        >
          <ArrowLeft size={17} />
          Back to Account
        </Link>

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#B8791A]">
              My Account
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#14181F]">
              My Addresses
            </h1>

            <p className="mt-2 text-sm text-[#6B7280]">
              Manage your saved delivery addresses.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setError("");
              setSuccess("");

              if (showForm) {
                resetForm();
              } else {
                setFormData({
                  ...initialForm,
                  fullName: user?.name || "",
                });
                setEditingId(null);
                setShowForm(true);
              }
            }}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
          >
            {showForm ? <X size={17} /> : <Plus size={17} />}
            {showForm ? "Cancel" : "Add New Address"}
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
          >
            {error}
          </div>
        )}

        {success && (
          <div
            role="status"
            className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
          >
            {success}
          </div>
        )}

        {showForm && (
          <section className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#14181F]">
              {editingId ? "Edit Address" : "Add New Address"}
            </h2>

            <form
              onSubmit={handleSubmit}
              className="mt-6 grid gap-5 sm:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Address Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-sm text-[#14181F] outline-none focus:border-[#FFB020]"
                >
                  <option>Home</option>
                  <option>Office</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Full Name
                </label>

                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  autoComplete="name"
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none focus:border-[#FFB020]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Phone Number
                </label>

                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  autoComplete="tel"
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none focus:border-[#FFB020]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Postal Code
                </label>

                <input
                  type="text"
                  name="postalCode"
                  value={formData.postalCode}
                  onChange={handleChange}
                  placeholder="38000"
                  autoComplete="postal-code"
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none focus:border-[#FFB020]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Street Address
                </label>

                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="House number, street name"
                  autoComplete="street-address"
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none focus:border-[#FFB020]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  City
                </label>

                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Faisalabad"
                  autoComplete="address-level2"
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none focus:border-[#FFB020]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Province / State
                </label>

                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="Punjab"
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none focus:border-[#FFB020]"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Country
                </label>

                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Pakistan"
                  autoComplete="country-name"
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm outline-none focus:border-[#FFB020]"
                />
              </div>

              <div className="sm:col-span-2">
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFB020] px-5 py-3 text-sm font-bold text-[#0A0E14] transition hover:bg-[#e6a01c] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {saving ? (
                    <LoaderCircle className="animate-spin" size={17} />
                  ) : editingId ? (
                    <Check size={17} />
                  ) : (
                    <Plus size={17} />
                  )}

                  {saving
                    ? "Saving..."
                    : editingId
                      ? "Update Address"
                      : "Save Address"}
                </button>
              </div>
            </form>
          </section>
        )}

        {loading ? (
          <div className="flex items-center justify-center gap-3 rounded-2xl border border-[#E5E7EB] bg-white py-16 text-sm text-[#6B7280]">
            <LoaderCircle className="animate-spin" size={20} />
            Loading your addresses...
          </div>
        ) : addresses.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {addresses.map((address) => (
              <article
                key={address._id}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A]">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-[#14181F]">
                        {address.type || "Delivery"}
                      </h2>

                      {address.isDefault && (
                        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-[#B8791A]">
                          <Check size={12} />
                          Default address
                        </span>
                      )}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleEdit(address)}
                    aria-label={`Edit ${address.type || "delivery"} address`}
                    className="rounded-lg p-2 text-[#9CA3AF] transition hover:bg-[#FFF6E7] hover:text-[#14181F]"
                  >
                    <Pencil size={17} />
                  </button>
                </div>

                <div className="mt-5 border-t border-[#E5E7EB] pt-5">
                  <p className="text-sm font-semibold text-[#14181F]">
                    {address.fullName}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    {address.address}
                    <br />
                    {address.city}
                    {address.province ? `, ${address.province}` : ""}
                    {address.postalCode ? ` ${address.postalCode}` : ""}
                    <br />
                    {address.country}
                  </p>

                  <p className="mt-2 text-sm text-[#6B7280]">
                    {address.phone}
                  </p>
                </div>

                <div className="mt-5 flex items-center justify-between gap-3 border-t border-[#E5E7EB] pt-4">
                  {!address.isDefault ? (
                    <button
                      type="button"
                      disabled={actionId === address._id}
                      onClick={() => handleSetDefault(address)}
                      className="text-xs font-semibold text-[#B8791A] transition hover:text-[#14181F] disabled:opacity-50"
                    >
                      Set as default
                    </button>
                  ) : (
                    <span className="text-xs font-medium text-[#9CA3AF]">
                      Your default address
                    </span>
                  )}

                  <button
                    type="button"
                    disabled={actionId === address._id}
                    onClick={() => handleDelete(address._id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-500 transition hover:text-red-700 disabled:opacity-50"
                  >
                    {actionId === address._id ? (
                      <LoaderCircle className="animate-spin" size={15} />
                    ) : (
                      <Trash2 size={15} />
                    )}
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#D1D5DB] bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF6E7] text-[#B8791A]">
              <MapPin size={25} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-[#14181F]">
              No saved addresses
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
              Add a delivery address to make your checkout process faster and
              easier.
            </p>

            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...initialForm,
                  fullName: user?.name || "",
                });
                setEditingId(null);
                setShowForm(true);
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
            >
              <Plus size={17} />
              Add Address
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
