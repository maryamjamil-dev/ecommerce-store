import React from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ChevronRight,
  ShoppingBag,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Orders() {
  const { user } = useAuth();

  // Demo orders for frontend
  const orders = [
    {
      id: "VLT-1001",
      date: "September 20, 2026",
      status: "Delivered",
      items: 2,
      total: 218.98,
    },
    {
      id: "VLT-1002",
      date: "September 18, 2026",
      status: "Shipped",
      items: 1,
      total: 129.99,
    },
    {
      id: "VLT-1003",
      date: "September 15, 2026",
      status: "Processing",
      items: 3,
      total: 349.97,
    },
  ];

  if (!user) {
    return (
      <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7] text-[#FFB020]">
            <Package size={28} />
          </div>

          <h1 className="text-2xl font-bold text-[#14181F]">
            Sign in to view your orders
          </h1>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Please sign in to view your order history and track your
            purchases.
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
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#B8791A]">
            My Account
          </p>

          <div className="mt-1 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-[#14181F]">
                My Orders
              </h1>

              <p className="mt-2 text-sm text-[#6B7280]">
                View your order history and track your purchases.
              </p>
            </div>

            <Link
              to="/shop"
              className="hidden items-center gap-2 rounded-lg bg-[#0A0E14] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#171d29] sm:flex"
            >
              <ShoppingBag size={17} />
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Orders */}
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6"
            >
              {/* Order Top */}
              <div className="flex flex-col gap-4 border-b border-[#E5E7EB] pb-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A]">
                    <Package size={22} />
                  </div>

                  <div>
                    <p className="text-sm font-bold text-[#14181F]">
                      Order #{order.id}
                    </p>

                    <p className="mt-1 text-xs text-[#6B7280]">
                      Placed on {order.date}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <span
                  className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${
                    order.status === "Delivered"
                      ? "bg-green-50 text-green-700"
                      : order.status === "Shipped"
                      ? "bg-blue-50 text-blue-700"
                      : "bg-[#FFF6E7] text-[#B8791A]"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              {/* Order Bottom */}
              <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-8">
                  <div>
                    <p className="text-xs text-[#9CA3AF]">
                      Items
                    </p>

                    <p className="mt-1 text-sm font-semibold text-[#14181F]">
                      {order.items}{" "}
                      {order.items === 1 ? "item" : "items"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[#9CA3AF]">
                      Total
                    </p>

                    <p className="mt-1 text-sm font-bold text-[#14181F]">
                      ${order.total.toFixed(2)}
                    </p>
                  </div>
                </div>

                <Link
                  to={`/order-details/${order.id}`}
                  className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-sm font-semibold text-[#14181F] transition hover:border-[#FFB020] hover:bg-[#FFF6E7]"
                >
                  View Details
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Shopping Button */}
        <div className="mt-6 sm:hidden">
          <Link
            to="/shop"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
          >
            <ShoppingBag size={17} />
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}

