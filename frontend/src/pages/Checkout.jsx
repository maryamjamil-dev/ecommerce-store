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

export default function Checkout() {
  const navigate = useNavigate();

  const { cartItems, subtotal, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "Pakistan",
    cardNumber: "",
    expiry: "",
    cvv: "",
  });

  // -----------------------------------------
  // DELIVERY CHARGE CALCULATION
  // -----------------------------------------

  const deliveryCharge = useMemo(() => {
    // Free delivery for orders $100 or more
    if (subtotal >= 100) {
      return 0;
    }

    const city = formData.city.trim().toLowerCase();

    // No city entered yet
    if (!city) {
      return 0;
    }

    // City based delivery charges
    const cityCharges = {
      faisalabad: 5,
      lahore: 7,
      islamabad: 8,
      rawalpindi: 8,
      karachi: 10,
      multan: 8,
      peshawar: 10,
      quetta: 12,
    };

    // Return city-specific charge
    if (cityCharges[city]) {
      return cityCharges[city];
    }

    // Other cities
    return 12;
  }, [formData.city, subtotal]);

  // -----------------------------------------
  // FINAL TOTAL
  // -----------------------------------------

  const finalTotal = subtotal + deliveryCharge;

  // -----------------------------------------
  // HANDLE FORM INPUT
  // -----------------------------------------

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // -----------------------------------------
  // HANDLE ORDER SUBMIT
  // -----------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    // Create order data
    const orderData = {
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
      },

      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        postalCode: formData.postalCode,
        country: formData.country,
        phone: formData.phone,
      },

      paymentMethod,

      items: cartItems,

      subtotal,
      deliveryCharge,
      total: finalTotal,

      // Frontend demo order number
      orderNumber: `VLT-${Math.floor(
        100000 + Math.random() * 900000
      )}`,
    };

    console.log("Order Data:", orderData);

    // Clear cart after successful order
    clearCart();

    // Send order data to OrderSuccess page
    navigate("/order-success", {
      state: {
        order: orderData,
      },
    });
  };

  // -----------------------------------------
  // FONTS
  // -----------------------------------------

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

  // -----------------------------------------
  // INPUT STYLES
  // -----------------------------------------

  const inputClass =
    "w-full rounded-lg border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/25";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#14181F]";

  // -----------------------------------------
  // EMPTY CART
  // -----------------------------------------

  if (cartItems.length === 0) {
    return (
      <main className="voltora-body min-h-screen bg-[#FAFAF8]">
        {fontStyles}

        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-[#B8791A] shadow-sm">
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
            className="mt-7 inline-flex items-center justify-center rounded-lg bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
          >
            Continue shopping
          </Link>
        </section>
      </main>
    );
  }

  // -----------------------------------------
  // CHECKOUT
  // -----------------------------------------

  return (
    <main className="voltora-body min-h-screen bg-[#FAFAF8]">
      {fontStyles}

      {/* Page Header */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition hover:text-[#14181F]"
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

          {/* =========================================
              LEFT SIDE
          ========================================= */}

          <div className="space-y-6">

            {/* Contact & Shipping */}
            <section className="rounded-xl border border-[#E5E7EB] bg-white p-6">

              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF6E7] text-[#B8791A]">
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

                {/* First Name */}
                <div>
                  <label className={labelClass}>
                    First name
                  </label>

                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    placeholder="Enter first name"
                    className={inputClass}
                  />
                </div>

                {/* Last Name */}
                <div>
                  <label className={labelClass}>
                    Last name
                  </label>

                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    placeholder="Enter last name"
                    className={inputClass}
                  />
                </div>

                {/* Email */}
                <div>
                  <label className={labelClass}>
                    Email address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="you@example.com"
                    className={inputClass}
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className={labelClass}>
                    Phone number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+92 300 1234567"
                    className={inputClass}
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Address
                  </label>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    placeholder="House / street / area"
                    className={inputClass}
                  />
                </div>

                {/* City */}
                <div>
                  <label className={labelClass}>
                    City
                  </label>

                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    required
                    placeholder="Enter city"
                    className={inputClass}
                  />

                  {/* Delivery Charge Message */}
                  {formData.city.trim() && (
                    <p className="mt-2 text-xs text-[#6B7280]">
                      {deliveryCharge === 0 ? (
                        <span className="font-medium text-green-600">
                          🎉 You qualify for free delivery.
                        </span>
                      ) : (
                        <>
                          Delivery to{" "}
                          <span className="font-medium text-[#14181F]">
                            {formData.city}
                          </span>{" "}
                          is{" "}
                          <span className="font-semibold text-[#B8791A]">
                            ${deliveryCharge.toFixed(2)}
                          </span>
                          .
                        </>
                      )}
                    </p>
                  )}
                </div>

                {/* Postal Code */}
                <div>
                  <label className={labelClass}>
                    Postal code
                  </label>

                  <input
                    type="text"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                    placeholder="Enter postal code"
                    className={inputClass}
                  />
                </div>

                {/* Country */}
                <div className="sm:col-span-2">
                  <label className={labelClass}>
                    Country
                  </label>

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="Pakistan">
                      Pakistan
                    </option>

                    <option value="United States">
                      United States
                    </option>

                    <option value="United Kingdom">
                      United Kingdom
                    </option>

                    <option value="United Arab Emirates">
                      United Arab Emirates
                    </option>
                  </select>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="mt-6 flex items-start gap-3 rounded-lg bg-[#FAFAF8] p-4">

                <Truck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#B8791A]"
                />

                <div>
                  <p className="text-sm font-semibold text-[#14181F]">
                    Delivery charges
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    Delivery charges are calculated based on your city.
                    Orders of $100 or more qualify for free delivery.
                  </p>
                </div>

              </div>
            </section>

            {/* =========================================
                PAYMENT
            ========================================= */}

            <section className="rounded-xl border border-[#E5E7EB] bg-white p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF6E7] text-[#B8791A]">
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

              {/* Payment Options */}
              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {/* Card */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("card")}
                  className={`rounded-lg border p-4 text-left transition ${
                    paymentMethod === "card"
                      ? "border-[#FFB020] bg-[#FFF6E7]"
                      : "border-[#E5E7EB] hover:border-[#D1D5DB]"
                  }`}
                >
                  <p className="text-sm font-semibold text-[#14181F]">
                    Credit / debit card
                  </p>

                  <p className="mt-1 text-xs text-[#6B7280]">
                    Pay securely by card
                  </p>
                </button>

                {/* COD */}
                <button
                  type="button"
                  onClick={() => setPaymentMethod("cod")}
                  className={`rounded-lg border p-4 text-left transition ${
                    paymentMethod === "cod"
                      ? "border-[#FFB020] bg-[#FFF6E7]"
                      : "border-[#E5E7EB] hover:border-[#D1D5DB]"
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

              {/* Card Details */}
              {paymentMethod === "card" && (
                <div className="mt-6 grid gap-5">

                  {/* Card Number */}
                  <div>
                    <label className={labelClass}>
                      Card number
                    </label>

                    <input
                      type="text"
                      name="cardNumber"
                      value={formData.cardNumber}
                      onChange={handleChange}
                      required
                      placeholder="1234 5678 9012 3456"
                      className={inputClass}
                    />
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">

                    {/* Expiry */}
                    <div>
                      <label className={labelClass}>
                        Expiry date
                      </label>

                      <input
                        type="text"
                        name="expiry"
                        value={formData.expiry}
                        onChange={handleChange}
                        required
                        placeholder="MM / YY"
                        className={inputClass}
                      />
                    </div>

                    {/* CVV */}
                    <div>
                      <label className={labelClass}>
                        CVV
                      </label>

                      <input
                        type="password"
                        name="cvv"
                        value={formData.cvv}
                        onChange={handleChange}
                        required
                        placeholder="123"
                        maxLength="4"
                        className={inputClass}
                      />
                    </div>

                  </div>
                </div>
              )}

              {/* Security Message */}
              <div className="mt-5 flex items-center gap-2 rounded-lg bg-[#FAFAF8] p-4 text-xs text-[#6B7280]">

                <Lock
                  size={16}
                  className="shrink-0 text-[#B8791A]"
                />

                Your payment information is protected with secure
                checkout.

              </div>

            </section>
          </div>

          {/* =========================================
              RIGHT SIDE - ORDER SUMMARY
          ========================================= */}

          <aside className="h-fit rounded-xl border border-[#E5E7EB] bg-white p-6 lg:sticky lg:top-24">

            <h2 className="voltora-heading text-xl font-semibold text-[#14181F]">
              Order summary
            </h2>

            {/* Products */}
            <div className="mt-6 max-h-80 space-y-4 overflow-y-auto border-b border-[#E5E7EB] pb-6">

              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3"
                >

                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#FAFAF8] p-2">

                    <img
                      src={item.product.image}
                      alt={item.product.title}
                      className="h-full w-full object-contain"
                    />

                  </div>

                  <div className="min-w-0 flex-1">

                    <p className="line-clamp-2 text-sm font-medium text-[#14181F]">
                      {item.product.title}
                    </p>

                    <p className="mt-1 text-xs text-[#6B7280]">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <p className="text-sm font-semibold text-[#14181F]">
                    $
                    {(
                      item.product.price * item.quantity
                    ).toFixed(2)}
                  </p>

                </div>
              ))}

            </div>

            {/* PRICE SUMMARY */}
            <div className="mt-6 space-y-4 border-b border-[#E5E7EB] pb-6">

              {/* Subtotal */}
              <div className="flex justify-between text-sm">

                <span className="text-[#6B7280]">
                  Subtotal
                </span>

                <span className="font-semibold text-[#14181F]">
                  ${subtotal.toFixed(2)}
                </span>

              </div>

              {/* Delivery */}
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

              {/* Free Delivery Message */}
              {subtotal >= 100 && (
                <div className="rounded-lg bg-green-50 px-3 py-2 text-xs font-medium text-green-700">
                  🎉 Free delivery applied to your order.
                </div>
              )}

            </div>

            {/* TOTAL */}
            <div className="flex items-center justify-between py-5">

              <span className="font-semibold text-[#14181F]">
                Total
              </span>

              <span className="voltora-heading text-2xl font-semibold text-[#14181F]">
                ${finalTotal.toFixed(2)}
              </span>

            </div>

            {/* PLACE ORDER */}
            <button
              type="submit"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29] focus:outline-none focus:ring-2 focus:ring-[#0A0E14]/30 focus:ring-offset-2"
            >
              <Lock size={16} />
              Place order
            </button>

            {/* Delivery Info */}
            <div className="mt-5 flex items-center gap-3 rounded-lg bg-[#FAFAF8] p-4">

              <Truck
                size={19}
                className="shrink-0 text-[#B8791A]"
              />

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