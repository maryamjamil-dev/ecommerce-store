import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Addresses() {
  const { user } = useAuth();

  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "Home",
      name: user?.name || "Customer Name",
      phone: "+92 300 1234567",
      address: "123 Main Street",
      city: "Faisalabad",
      province: "Punjab",
      postalCode: "38000",
      isDefault: true,
    },
    {
      id: 2,
      type: "Office",
      name: user?.name || "Customer Name",
      phone: "+92 300 1234567",
      address: "45 Business Avenue",
      city: "Lahore",
      province: "Punjab",
      postalCode: "54000",
      isDefault: false,
    },
  ]);

  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    type: "Home",
    name: user?.name || "",
    phone: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddAddress = (e) => {
    e.preventDefault();

    const newAddress = {
      id: Date.now(),
      ...formData,
      isDefault: addresses.length === 0,
    };

    setAddresses((prev) => [...prev, newAddress]);

    setFormData({
      type: "Home",
      name: user?.name || "",
      phone: "",
      address: "",
      city: "",
      province: "",
      postalCode: "",
    });

    setShowForm(false);
  };

  const handleDelete = (id) => {
    setAddresses((prev) =>
      prev.filter((address) => address.id !== id)
    );
  };

  const handleSetDefault = (id) => {
    setAddresses((prev) =>
      prev.map((address) => ({
        ...address,
        isDefault: address.id === id,
      }))
    );
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
            Please sign in to view and manage your saved delivery
            addresses.
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

        {/* Back */}
        <Link
          to="/account"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] transition hover:text-[#14181F]"
        >
          <ArrowLeft size={17} />
          Back to Account
        </Link>

        {/* Header */}
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
            onClick={() => setShowForm(!showForm)}
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
          >
            {showForm ? <X size={17} /> : <Plus size={17} />}

            {showForm ? "Cancel" : "Add New Address"}
          </button>
        </div>

        {/* Add Address Form */}
        {showForm && (
          <section className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#14181F]">
              Add New Address
            </h2>

            <form
              onSubmit={handleAddAddress}
              className="mt-6 grid gap-5 sm:grid-cols-2"
            >
              {/* Address Type */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Address Type
                </label>

                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-sm text-[#14181F] outline-none transition focus:border-[#FFB020]"
                >
                  <option>Home</option>
                  <option>Office</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Full Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020]"
                />
              </div>

              {/* Phone */}
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
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020]"
                />
              </div>

              {/* Postal Code */}
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
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020]"
                />
              </div>

              {/* Address */}
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
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020]"
                />
              </div>

              {/* City */}
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
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020]"
                />
              </div>

              {/* Province */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#14181F]">
                  Province
                </label>

                <input
                  type="text"
                  name="province"
                  value={formData.province}
                  onChange={handleChange}
                  placeholder="Punjab"
                  required
                  className="w-full rounded-lg border border-[#D1D5DB] px-4 py-3 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020]"
                />
              </div>

              {/* Submit */}
              <div className="sm:col-span-2">
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#FFB020] px-5 py-3 text-sm font-bold text-[#0A0E14] transition hover:bg-[#e6a01c] sm:w-auto"
                >
                  <Plus size={17} />
                  Save Address
                </button>
              </div>
            </form>
          </section>
        )}

        {/* Address List */}
        {addresses.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {addresses.map((address) => (
              <article
                key={address.id}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A]">
                      <MapPin size={20} />
                    </div>

                    <div>
                      <h2 className="text-base font-bold text-[#14181F]">
                        {address.type}
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
                    className="rounded-lg p-2 text-[#9CA3AF] transition hover:bg-[#FFF6E7] hover:text-[#14181F]"
                    aria-label={`Edit ${address.type} address`}
                  >
                    <Pencil size={17} />
                  </button>
                </div>

                {/* Address Details */}
                <div className="mt-5 border-t border-[#E5E7EB] pt-5">
                  <p className="text-sm font-semibold text-[#14181F]">
                    {address.name}
                  </p>

                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    {address.address}
                    <br />
                    {address.city}, {address.province}{" "}
                    {address.postalCode}
                  </p>

                  <p className="mt-2 text-sm text-[#6B7280]">
                    {address.phone}
                  </p>
                </div>

                {/* Actions */}
                <div className="mt-5 flex items-center justify-between border-t border-[#E5E7EB] pt-4">
                  {!address.isDefault ? (
                    <button
                      type="button"
                      onClick={() => handleSetDefault(address.id)}
                      className="text-xs font-semibold text-[#B8791A] transition hover:text-[#14181F]"
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
                    onClick={() => handleDelete(address.id)}
                    className="flex items-center gap-1.5 text-xs font-semibold text-red-500 transition hover:text-red-700"
                  >
                    <Trash2 size={15} />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-dashed border-[#D1D5DB] bg-white px-6 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF6E7] text-[#B8791A]">
              <MapPin size={25} />
            </div>

            <h2 className="mt-4 text-lg font-bold text-[#14181F]">
              No saved addresses
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
              Add a delivery address to make your checkout process
              faster and easier.
            </p>

            <button
              type="button"
              onClick={() => setShowForm(true)}
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
