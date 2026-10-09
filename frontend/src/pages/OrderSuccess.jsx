import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle,
  Package,
  Truck,
  ShoppingBag,
  ArrowRight,
  MapPin,
} from "lucide-react";

export default function OrderSuccess() {
  const location = useLocation();

  // Checkout se order data aaye to use karega
  const order = location.state?.order;

  const orderNumber =
    order?.orderNumber ||
    `VLT-${Math.floor(100000 + Math.random() * 900000)}`;

  const total = order?.total || 0;

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#0A0E14]">

      {/* ================= HEADER ================= */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

          <Link
            to="/"
            className="text-2xl font-bold tracking-tight text-[#0B1F3A]"
          >
            Voltora
          </Link>

          <Link
            to="/shop"
            className="flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#B8791A]"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

        </div>
      </header>

      {/* ================= MAIN ================= */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">

        {/* SUCCESS MESSAGE */}
        <div className="text-center">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
            <CheckCircle
              size={46}
              className="text-green-600"
            />
          </div>

          <p className="mt-6 text-sm font-semibold uppercase tracking-wider text-[#B8791A]">
            Order Confirmed
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#0B1F3A] sm:text-4xl">
            Thank You For Your Order!
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            Your order has been successfully placed. We have received your
            order and will start processing it shortly.
          </p>

        </div>

        {/* ================= ORDER NUMBER ================= */}
        <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 text-center shadow-sm">

          <p className="text-sm text-gray-500">
            Your Order Number
          </p>

          <p className="mt-2 text-xl font-bold tracking-wide text-[#0B1F3A]">
            {orderNumber}
          </p>

          {total > 0 && (
            <p className="mt-2 text-sm text-gray-500">
              Order Total:{" "}
              <span className="font-semibold text-[#0B1F3A]">
                ${Number(total).toFixed(2)}
              </span>
            </p>
          )}

        </div>

        {/* ================= ORDER STEPS ================= */}
        <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">

          <h2 className="text-xl font-bold text-[#0B1F3A]">
            What happens next?
          </h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-3">

            {/* Step 1 */}
            <div className="relative text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#0B1F3A] text-white">
                <CheckCircle size={25} />
              </div>

              <h3 className="mt-4 font-semibold text-[#0B1F3A]">
                Order Confirmed
              </h3>

              <p className="mt-2 text-sm leading-5 text-gray-500">
                Your order has been received successfully.
              </p>

            </div>

            {/* Step 2 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFB020] text-[#0A0E14]">
                <Package size={25} />
              </div>

              <h3 className="mt-4 font-semibold text-[#0B1F3A]">
                Preparing Order
              </h3>

              <p className="mt-2 text-sm leading-5 text-gray-500">
                Our team will prepare your products for shipment.
              </p>

            </div>

            {/* Step 3 */}
            <div className="text-center">

              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-[#0B1F3A]">
                <Truck size={25} />
              </div>

              <h3 className="mt-4 font-semibold text-[#0B1F3A]">
                On The Way
              </h3>

              <p className="mt-2 text-sm leading-5 text-gray-500">
                Your order will be delivered to your address.
              </p>

            </div>

          </div>

        </div>

        {/* ================= DELIVERY INFORMATION ================= */}
        <div className="mt-6 grid gap-6 md:grid-cols-2">

          {/* Delivery */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B1F3A] text-white">
                <MapPin size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#0B1F3A]">
                  Delivery Address
                </h2>

                <p className="text-xs text-gray-500">
                  Shipping information
                </p>
              </div>

            </div>

            {order?.shippingAddress ? (
              <div className="mt-5 space-y-1 text-sm text-gray-600">
                <p className="font-semibold text-[#0B1F3A]">
                  {order.shippingAddress.firstName}{" "}
                  {order.shippingAddress.lastName}
                </p>

                <p>{order.shippingAddress.address}</p>

                <p>
                  {order.shippingAddress.city}
                  {order.shippingAddress.postalCode &&
                    `, ${order.shippingAddress.postalCode}`}
                </p>

                <p>{order.shippingAddress.country}</p>

                {order.shippingAddress.phone && (
                  <p>{order.shippingAddress.phone}</p>
                )}
              </div>
            ) : (
              <p className="mt-5 text-sm text-gray-500">
                Your delivery address has been received and will be used for
                shipping.
              </p>
            )}

          </div>

          {/* Payment */}
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFB020] text-[#0A0E14]">
                <Package size={20} />
              </div>

              <div>
                <h2 className="font-bold text-[#0B1F3A]">
                  Payment Information
                </h2>

                <p className="text-xs text-gray-500">
                  Payment method
                </p>
              </div>

            </div>

            <div className="mt-5 space-y-3 text-sm">

              <div className="flex justify-between gap-4">
                <span className="text-gray-500">
                  Payment Method
                </span>

                <span className="font-semibold capitalize text-[#0B1F3A]">
                  {order?.paymentMethod || "Cash on Delivery"}
                </span>
              </div>

              {total > 0 && (
                <div className="flex justify-between gap-4 border-t border-gray-100 pt-3">
                  <span className="text-gray-500">
                    Total Paid
                  </span>

                  <span className="font-bold text-[#B8791A]">
                    ${Number(total).toFixed(2)}
                  </span>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* ================= BUTTONS ================= */}
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">

          <Link
            to="/orders"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#0B1F3A] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#142E50]"
          >
            View My Orders
            <ArrowRight size={18} />
          </Link>

          <Link
            to="/shop"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-6 py-3.5 text-sm font-semibold text-[#0B1F3A] transition hover:border-[#B8791A] hover:text-[#B8791A]"
          >
            <ShoppingBag size={18} />
            Continue Shopping
          </Link>

        </div>

        {/* ================= SUPPORT ================= */}
        <div className="mt-8 text-center">

          <p className="text-sm text-gray-500">
            Need help with your order?
          </p>

          <Link
            to="/contact"
            className="mt-1 inline-block text-sm font-semibold text-[#B8791A] hover:underline"
          >
            Contact Voltora Support
          </Link>

        </div>

      </main>

      {/* ================= FOOTER ================= */}
      <footer className="mt-8 bg-[#0B1F3A] py-6 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Voltora. All rights reserved.
      </footer>

    </div>
  );
}