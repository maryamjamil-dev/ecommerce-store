import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Clock3,
} from "lucide-react";

export default function OrderDetails() {
  const { id } = useParams();

  // Demo order data
  const order = {
    id: id || "VLT-1001",
    date: "September 20, 2026",
    status: "Delivered",
    paymentMethod: "Cash on Delivery",

    shippingAddress: {
      name: "Customer Name",
      address: "123 Main Street",
      city: "Faisalabad",
      country: "Pakistan",
    },

    items: [
      {
        id: 1,
        name: "Premium Wireless Headphones",
        category: "Headphones",
        price: 89.99,
        quantity: 1,
        image: "/images/products/headphone.png",
      },
      {
        id: 2,
        name: "Smart Pro Watch",
        category: "Smartwatch",
        price: 129.99,
        quantity: 1,
        image: "/images/products/watch.png",
      },
    ],

    shipping: 0,
  };

  const subtotal = order.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal + order.shipping;

  return (
    <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Back */}
        <Link
          to="/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-[#6B7280] transition hover:text-[#14181F]"
        >
          <ArrowLeft size={17} />
          Back to Orders
        </Link>

        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#B8791A]">
              Order Details
            </p>

            <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#14181F]">
              Order #{order.id}
            </h1>

            <p className="mt-2 text-sm text-[#6B7280]">
              Placed on {order.date}
            </p>
          </div>

          <span className="flex w-fit items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700">
            <CheckCircle2 size={17} />
            {order.status}
          </span>
        </div>

        {/* Order Progress */}
        <section className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#14181F]">
            Order Status
          </h2>

          <div className="mt-6 grid grid-cols-3 gap-3">
            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB020] text-[#0A0E14]">
                <CheckCircle2 size={20} />
              </div>

              <p className="mt-2 text-xs font-semibold text-[#14181F]">
                Order Placed
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB020] text-[#0A0E14]">
                <Truck size={20} />
              </div>

              <p className="mt-2 text-xs font-semibold text-[#14181F]">
                Shipped
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB020] text-[#0A0E14]">
                <CheckCircle2 size={20} />
              </div>

              <p className="mt-2 text-xs font-semibold text-[#14181F]">
                Delivered
              </p>
            </div>
          </div>

          <div className="mt-4 h-1 rounded-full bg-[#E5E7EB]">
            <div className="h-1 w-full rounded-full bg-[#FFB020]" />
          </div>
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">

          {/* Left */}
          <div className="space-y-6">

            {/* Products */}
            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Package size={19} className="text-[#B8791A]" />

                <h2 className="text-base font-bold text-[#14181F]">
                  Ordered Items
                </h2>
              </div>

              <div className="mt-5 divide-y divide-[#E5E7EB]">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 py-5 first:pt-0 last:pb-0"
                  >
                    {/* Product Image */}
                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#F4F4F2]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-contain p-2"
                      />
                    </div>

                    {/* Product Info */}
                    <div className="flex flex-1 flex-col justify-center">
                      <h3 className="text-sm font-bold text-[#14181F]">
                        {item.name}
                      </h3>

                      <p className="mt-1 text-xs text-[#6B7280]">
                        {item.category}
                      </p>

                      <p className="mt-2 text-xs text-[#9CA3AF]">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="flex flex-col items-end justify-center">
                      <p className="text-sm font-bold text-[#14181F]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>

                      <p className="mt-1 text-xs text-[#9CA3AF]">
                        ${item.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Shipping Address */}
            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <MapPin size={19} className="text-[#B8791A]" />

                <h2 className="text-base font-bold text-[#14181F]">
                  Shipping Address
                </h2>
              </div>

              <div className="mt-4 rounded-xl bg-[#FAFAF8] p-4">
                <p className="text-sm font-semibold text-[#14181F]">
                  {order.shippingAddress.name}
                </p>

                <p className="mt-1 text-sm text-[#6B7280]">
                  {order.shippingAddress.address}
                </p>

                <p className="text-sm text-[#6B7280]">
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.country}
                </p>
              </div>
            </section>
          </div>

          {/* Right */}
          <aside className="h-fit space-y-6">

            {/* Order Summary */}
            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-[#14181F]">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between text-[#6B7280]">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between text-[#6B7280]">
                  <span>Shipping</span>

                  <span>
                    {order.shipping === 0
                      ? "Free"
                      : `$${order.shipping.toFixed(2)}`}
                  </span>
                </div>

                <div className="border-t border-[#E5E7EB] pt-4">
                  <div className="flex justify-between">
                    <span className="font-bold text-[#14181F]">
                      Total
                    </span>

                    <span className="text-lg font-bold text-[#14181F]">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock3 size={18} className="text-[#B8791A]" />

                <h2 className="text-base font-bold text-[#14181F]">
                  Payment
                </h2>
              </div>

              <p className="mt-3 text-sm text-[#6B7280]">
                {order.paymentMethod}
              </p>
            </section>

            {/* Continue Shopping */}
            <Link
              to="/shop"
              className="flex w-full items-center justify-center rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}



