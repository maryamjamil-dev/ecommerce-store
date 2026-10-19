import React, { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  ChevronRight,
  ShoppingBag,
  LoaderCircle,
  RefreshCw,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Date unavailable";
  }

  return parsedDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getStatusStyle = (status) => {
  const styles = {
    Delivered: "bg-green-50 text-green-700",
    Shipped: "bg-blue-50 text-blue-700",
    Processing: "bg-purple-50 text-purple-700",
    Confirmed: "bg-cyan-50 text-cyan-700",
    Pending: "bg-[#FFF6E7] text-[#B8791A]",
    Cancelled: "bg-red-50 text-red-700",
  };

  return styles[status] || "bg-gray-100 text-gray-700";
};

const getOrderLabel = (order, orderId) =>
  order.orderNumber || String(orderId).slice(-8).toUpperCase();

export default function Orders() {
  const { user, loading: authLoading } = useAuth();

  const userId = user?.id || user?._id;

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrders = useCallback(async (signal) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/orders/my-orders`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        signal,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to load orders.");
      }

      const fetchedOrders = Array.isArray(data)
        ? data
        : data.orders || data.data || [];

      setOrders(fetchedOrders);
    } catch (err) {
      if (err.name === "AbortError") return;

      setError(
        err.message || "Something went wrong while loading your orders."
      );
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (authLoading) return;

    if (!userId) {
      setOrders([]);
      setLoading(false);
      return;
    }

    const controller = new AbortController();
    fetchOrders(controller.signal);

    return () => controller.abort();
  }, [userId, authLoading, fetchOrders]);

  if (authLoading) {
    return (
      <>
        <Header />
        <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-16">
          <div className="mx-auto max-w-lg py-16 text-center">
            <LoaderCircle
              size={34}
              className="mx-auto animate-spin text-[#0B1F3A]"
            />
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <Header />
        <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-16">
          <div className="mx-auto max-w-lg rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7] text-[#B8791A]">
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
              className="mt-6 inline-flex rounded-lg bg-[#0B1F3A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#16375F]"
            >
              Sign in
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />

      <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          {/* Page Header */}
          <div className="mb-8">
            <p className="text-sm font-semibold text-[#B8791A]">My Account</p>

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
                className="hidden items-center gap-2 rounded-lg bg-[#0A0E14] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#081421] sm:flex"
              >
                <ShoppingBag size={17} />
                Continue Shopping
              </Link>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="rounded-2xl border border-[#E5E7EB] bg-white px-6 py-16 text-center">
              <LoaderCircle
                size={34}
                className="mx-auto animate-spin text-[#0B1F3A]"
              />
              <p className="mt-4 text-sm text-[#6B7280]">
                Loading your orders...
              </p>
            </div>
          )}

          {/* Error */}
          {!loading && error && (
            <div className="rounded-2xl border border-red-200 bg-white p-8 text-center">
              <Package size={32} className="mx-auto text-red-500" />

              <h2 className="mt-4 text-lg font-bold text-[#14181F]">
                Unable to load orders
              </h2>

              <p className="mt-2 text-sm text-red-600">{error}</p>

              <button
                type="button"
                onClick={() => fetchOrders()}
                className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#0B1F3A] px-5 py-3 text-sm font-semibold text-white hover:bg-[#16375F]"
              >
                <RefreshCw size={16} />
                Try Again
              </button>
            </div>
          )}

          {/* Empty Orders */}
          {!loading && !error && orders.length === 0 && (
            <div className="rounded-2xl border border-[#E5E7EB] bg-white px-6 py-16 text-center shadow-sm">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7] text-[#B8791A]">
                <ShoppingBag size={28} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-[#14181F]">
                No orders yet
              </h2>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
                You haven't placed any orders yet. Explore our products and
                place your first order.
              </p>

              <Link
                to="/shop"
                className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white hover:bg-[#04080c]"
              >
                <ShoppingBag size={17} />
                Start Shopping
              </Link>
            </div>
          )}

          {/* Real Orders */}
          {!loading && !error && orders.length > 0 && (
            <div className="space-y-4">
              {orders.map((order) => {
                const orderId = order._id || order.id;
                const items = order.items || [];

                const itemCount = items.reduce(
                  (total, item) => total + Number(item.quantity || 1),
                  0
                );

                const status = order.orderStatus || order.status || "Pending";

                const total = Number(order.totalAmount ?? order.total ?? 0);

                const previewItems = items.slice(0, 4);
                const hiddenCount = items.length - previewItems.length;

                return (
                  <div
                    key={orderId}
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
                            Order #{getOrderLabel(order, orderId)}
                          </p>

                          <p className="mt-1 text-xs text-[#6B7280]">
                            Placed on{" "}
                            {formatDate(order.createdAt || order.date)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusStyle(
                          status
                        )}`}
                      >
                        {status}
                      </span>
                    </div>

                    {/* Product Preview */}
                    {previewItems.length > 0 && (
                      <div className="flex items-center gap-2 border-b border-[#E5E7EB] py-4">
                        {previewItems.map((item, index) => (
                          <div
                            key={`${orderId}-${index}`}
                            className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-[#E5E7EB] bg-[#FAFAF8] p-1"
                            title={item.name}
                          >
                            {item.image ? (
                              <img
                                src={item.image}
                                alt={item.name}
                                className="h-full w-full object-contain"
                              />
                            ) : (
                              <Package size={18} className="text-[#9CA3AF]" />
                            )}
                          </div>
                        ))}

                        {hiddenCount > 0 && (
                          <span className="text-xs font-semibold text-[#6B7280]">
                            +{hiddenCount} more
                          </span>
                        )}
                      </div>
                    )}

                    {/* Order Bottom */}
                    <div className="flex flex-col gap-4 pt-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex gap-8">
                        <div>
                          <p className="text-xs text-[#9CA3AF]">Items</p>

                          <p className="mt-1 text-sm font-semibold text-[#14181F]">
                            {itemCount} {itemCount === 1 ? "item" : "items"}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#9CA3AF]">Total</p>

                          <p className="mt-1 text-sm font-bold text-[#14181F]">
                            ${total.toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <Link
                        to={`/order-details/${orderId}`}
                        className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#D1D5DB] px-4 py-2.5 text-sm font-semibold text-[#14181F] transition hover:border-[#0B1F3A] hover:bg-blue-50"
                      >
                        View Details
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Mobile Shopping Button */}
          <div className="mt-6 sm:hidden">
            <Link
              to="/shop"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#16375F]"
            >
              <ShoppingBag size={17} />
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}