import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Lock,
  Truck,
  MapPin,
  ShoppingBag,
} from "lucide-react";

import { useCart } from "../context/CartContext";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_FEE = 10;

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, subtotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
  });

  const deliveryCharge = useMemo(
    () => (Number(subtotal) >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE),
    [subtotal]
  );

  const finalTotal = Number(subtotal) + deliveryCharge;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (isSubmitting) return;

    if (!cartItems.length) {
      setError("Your cart is empty.");
      return;
    }

    if (paymentMethod !== "cod") {
      setError(
        "Online card payments are not available yet. Please select Cash on Delivery."
      );
      return;
    }

    const fullName =
      `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

    const shippingAddress = {
      fullName,
      phone: formData.phone.trim(),
      address: formData.address.trim(),
      city: formData.city.trim(),
      postalCode: formData.postalCode.trim(),
      country: formData.country.trim(),
    };

    const requiredFields = [
      shippingAddress.fullName,
      shippingAddress.phone,
      shippingAddress.address,
      shippingAddress.city,
      shippingAddress.country,
    ];

    if (requiredFields.some((field) => !field)) {
      setError("Please complete all required shipping fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          shippingAddress,
          paymentMethod: "COD",
        }),
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.success || !result.order) {
        throw new Error(
          result.message ||
            `Unable to place order (${response.status}). Please try again.`
        );
      }

      const savedOrder = result.order;

      clearCart();

      navigate("/order-success", {
        state: {
          order: savedOrder,
        },
        replace: true,
      });
    } catch (err) {
      setError(
        err.message ||
          "Something went wrong while placing your order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#0B1F3A] focus:ring-2 focus:ring-[#0B1F3A]/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#14181F]";

  const fontStyles = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

      .voltora-heading {
        font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
      }

      .voltora-body {
        font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
      }
    `}</style>
  );

  if (!cartItems.length) {
    return (
      <main className="voltora-body min-h-screen bg-[#FAFAF8]">
        {fontStyles}

        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#0B1F3A] shadow-sm">
            <ShoppingBag size={28} />
          </div>

          <h1 className="voltora-heading mt-6 text-3xl font-semibold text-[#14181F]">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B7280]">
            Add some products to your cart before proceeding to checkout.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#17365D]"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="voltora-body min-h-screen bg-[#FAFAF8]">
      {fontStyles}

      {/* Page heading */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition hover:text-[#0B1F3A]"
          >
            <ArrowLeft size={16} />
            Back to cart
          </Link>

          <h1 className="voltora-heading mt-4 text-3xl font-semibold text-[#14181F] sm:text-4xl">
            Checkout
          </h1>

          <p className="mt-2 text-sm text-[#6B7280]">
            Complete your information to place your order.
          </p>
        </div>
      </section>

      <form
        onSubmit={handleSubmit}
        className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8"
      >
        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Contact and shipping */}
            <section className="rounded-xl border border-[#E5E7EB] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF0F8] text-[#0B1F3A]">
                  <MapPin size={19} />
                </div>

                <div>
                  <h2 className="voltora-heading text-lg font-semibold text-[#14181F]">
                    Contact & shipping information
                  </h2>

                  <p className="text-xs text-[#6B7280]">
                    Where should we deliver your order?
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {[
                  ["firstName", "First name", "Enter first name", "text"],
                  ["lastName", "Last name", "Enter last name", "text"],
                  ["email", "Email address", "you@example.com", "email"],
                  ["phone", "Phone number", "+92 300 1234567", "tel"],
                ].map(([name, label, placeholder, type]) => (
                  <div key={name}>
                    <label htmlFor={name} className={labelClass}>
                      {label}
                    </label>

                    <input
                      id={name}
                      type={type}
                      name={name}
                      value={formData[name]}
                      onChange={handleChange}
                      required
                      autoComplete={
                        name === "firstName"
                          ? "given-name"
                          : name === "lastName"
                            ? "family-name"
                            : name === "email"
                              ? "email"
                              : "tel"
                      }
                      placeholder={placeholder}
                      className={inputClass}
                    />
                  </div>
                ))}

                <div className="sm:col-span-2">
                  <label htmlFor="address" className={labelClass}>
                    Address
                  </label>

                  <input
                    id="address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    autoComplete="street-address"
                    placeholder="House / street / area"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="city" className={labelClass}>
                    City
                  </label>

                  <input
                    id="city"
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    autoComplete="address-level2"
                    placeholder="Enter city"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="postalCode" className={labelClass}>
                    Postal code
                  </label>

                  <input
                    id="postalCode"
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    autoComplete="postal-code"
                    placeholder="Enter postal code"
                    className={inputClass}
                  />
                </div>

                <div className="sm:col-span-2">
                  <label htmlFor="country" className={labelClass}>
                    Country
                  </label>

                  <select
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    autoComplete="country-name"
                    className={inputClass}
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex items-start gap-3 rounded-lg bg-[#F5F7FA] p-4">
                <Truck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#0B1F3A]"
                />

                <div>
                  <p className="text-sm font-semibold text-[#14181F]">
                    Delivery charges
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    Orders of $100 or more qualify for free delivery.
                    Other orders have a $10 shipping fee.
                  </p>
                </div>
              </div>
            </section>

            {/* Payment method */}
            <section className="rounded-xl border border-[#E5E7EB] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#EAF0F8] text-[#0B1F3A]">
                  <CreditCard size={19} />
                </div>

                <div>
                  <h2 className="voltora-heading text-lg font-semibold text-[#14181F]">
                    Payment method
                  </h2>

                  <p className="text-xs text-[#6B7280]">
                    Choose how you want to pay.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-lg border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-[#0B1F3A] bg-[#EAF0F8]"
                      : "border-[#E5E7EB] hover:border-[#B8C4D4]"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#14181F]">
                    Credit / debit card
                  </p>

                  <p className="mt-1 text-xs text-[#6B7280]">
                    Coming soon — payment gateway required
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-lg border p-4 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-[#0B1F3A] bg-[#EAF0F8]"
                      : "border-[#E5E7EB] hover:border-[#B8C4D4]"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#14181F]">
                    Cash on delivery
                  </p>

                  <p className="mt-1 text-xs text-[#6B7280]">
                    Pay when your order arrives
                  </p>
                </button>
              </div>

              {paymentMethod === "card" && (
                <p className="mt-4 rounded-lg bg-amber-50 p-4 text-sm text-amber-800">
                  Online card payments are not configured yet. Select Cash on
                  Delivery to place your order. Do not enter real card details
                  into this demo checkout.
                </p>
              )}

              <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#F5F7FA] p-4 text-xs text-[#6B7280]">
                <Lock size={16} className="shrink-0 text-[#0B1F3A]" />
                Cash on Delivery orders are submitted to the store backend for
                confirmation.
              </div>
            </section>
          </div>

          {/* Order summary */}
          <aside className="h-fit rounded-xl border border-[#E5E7EB] bg-white p-6 lg:sticky lg:top-24">
            <h2 className="voltora-heading text-xl font-semibold text-[#14181F]">
              Order summary
            </h2>

            <div className="mt-6 max-h-80 space-y-4 overflow-y-auto border-b border-[#E5E7EB] pb-6">
              {cartItems.map((item, index) => {
                const product = item.product ?? item;
                const productId = product._id ?? product.id ?? index;
                const quantity = item.quantity ?? 1;

                return (
                  <div key={productId} className="flex gap-3">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#F5F7FA] p-2">
                      <img
                        src={product.image}
                        alt={product.title ?? product.name ?? "Product"}
                        className="h-full w-full object-contain"
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="line-clamp-2 text-sm font-medium text-[#14181F]">
                        {product.title ?? product.name ?? "Product"}
                      </p>

                      <p className="mt-1 text-xs text-[#6B7280]">
                        Qty: {quantity}
                      </p>
                    </div>

                    <p className="text-sm font-semibold text-[#14181F]">
                      $
                      {(
                        Number(product.price ?? 0) * quantity
                      ).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 space-y-4 border-b border-[#E5E7EB] pb-6">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Subtotal</span>
                <span className="font-semibold text-[#14181F]">
                  ${Number(subtotal).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="flex items-center gap-2 text-[#6B7280]">
                  <Truck size={15} />
                  Delivery
                </span>

                <span
                  className={`font-semibold ${
                    deliveryCharge === 0
                      ? "text-green-600"
                      : "text-[#14181F]"
                  }`}
                >
                  {deliveryCharge === 0
                    ? "Free"
                    : `$${deliveryCharge.toFixed(2)}`}
                </span>
              </div>

              {Number(subtotal) >= FREE_SHIPPING_THRESHOLD && (
                <div className="rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
                  🎉 Free delivery applied to your order.
                </div>
              )}
            </div>

            <div className="flex items-center justify-between py-5">
              <span className="font-semibold text-[#14181F]">Estimated total</span>

              <span className="voltora-heading text-2xl font-semibold text-[#14181F]">
                ${finalTotal.toFixed(2)}
              </span>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-4 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#17365D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Lock size={16} />
              {isSubmitting ? "Placing order..." : "Place order"}
            </button>

            <div className="mt-5 flex items-center gap-3 rounded-lg bg-[#F5F7FA] p-4">
              <Truck size={19} className="shrink-0 text-[#0B1F3A]" />

              <div>
                <p className="text-xs font-semibold text-[#14181F]">
                  Secure & reliable delivery
                </p>

                <p className="mt-1 text-[11px] text-[#6B7280]">
                  Your order will be prepared after confirmation.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </form>
    </main>
  );
}