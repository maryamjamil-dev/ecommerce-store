import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Package,
  Truck,
  MapPin,
  CheckCircle2,
  Clock3,
  LoaderCircle,
  AlertCircle,
  ShoppingBag,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";


const formatPrice = (amount = 0) => `$${Number(amount).toFixed(2)}`;

const formatDate = (date) => {
  if (!date) return "Date unavailable";

  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const getStatusStep = (status = "") => {
  const normalized = status.toLowerCase();

  if (normalized === "cancelled") return -1;
  if (normalized === "pending") return 0;
  if (normalized === "confirmed") return 1;
  if (normalized === "processing") return 1;
  if (normalized === "shipped") return 2;
  if (normalized === "delivered") return 3;

  return 0;
};

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");
        setOrder(null);

        const response = await fetch(
          `${API_URL}/orders/${encodeURIComponent(id)}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          }
        );

        const data = await response.json();

        if (!response.ok || data.success === false) {
          throw new Error(data.message || "Unable to load order details.");
        }

        const fetchedOrder = data.order || data.data;

        if (!fetchedOrder) {
          throw new Error("Order details were not found.");
        }

        setOrder(fetchedOrder);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(
            err.message || "Something went wrong while loading this order."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    if (id) {
      fetchOrder();
    } else {
      setError("Order ID is missing.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [id]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#FAFAF8] px-4">
        <div className="text-center">
          <LoaderCircle
            size={36}
            className="mx-auto animate-spin text-[#0A0E14]"
          />
          <p className="mt-4 text-sm text-gray-600">Loading order details...</p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#FAFAF8] px-4 py-10">
        <div className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-8 text-center">
          <AlertCircle size={42} className="mx-auto text-red-500" />

          <h1 className="mt-4 text-xl font-bold text-[#0A0E14]">
            Unable to load order
          </h1>

          <p className="mt-2 text-sm text-gray-600">
            {error || "The requested order could not be found."}
          </p>

          <Link
            to="/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white hover:bg-[#1C2430]"
          >
            <ArrowLeft size={16} />
            Back to Orders
          </Link>
        </div>
      </main>
    );
  }

  const orderId = order._id || order.id || id;
  const status = order.orderStatus || order.status || "Pending";
  const paymentMethod = order.paymentMethod || "Not specified";
  const paymentStatus = order.paymentStatus || "Pending";

  const shippingAddress = order.shippingAddress || {};
  const items = order.items || order.orderItems || [];

  const subtotal = Number(
    order.subtotal ??
      items.reduce((sum, item) => {
        const price = Number(item.price ?? item.product?.price ?? 0);
        const quantity = Number(item.quantity ?? 1);

        return sum + price * quantity;
      }, 0)
  );

  const shipping = Number(order.shippingCost ?? order.shipping ?? 0);

  const total = Number(order.totalAmount ?? order.total ?? subtotal + shipping);

  const currentStep = getStatusStep(status);

  const progressSteps = [
    { label: "Order Placed", icon: CheckCircle2 },
    { label: "Processing", icon: Package },
    { label: "Shipped", icon: Truck },
    { label: "Delivered", icon: CheckCircle2 },
  ];

  const isCancelled = currentStep === -1;

  return (
    <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          to="/orders"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-gray-600 transition hover:text-[#B8791A]"
        >
          <ArrowLeft size={17} />
          Back to Orders
        </Link>

        {/* Order Header */}
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-[#B8791A]">
              Order Details
            </p>

            <h1 className="mt-1 break-all text-2xl font-bold tracking-tight text-[#0A0E14] sm:text-3xl">
              Order #{orderId}
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Placed on {formatDate(order.createdAt || order.date)}
            </p>
          </div>

          <span
            className={`flex w-fit items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
              isCancelled
                ? "bg-red-50 text-red-700"
                : currentStep === 3
                ? "bg-green-50 text-green-700"
                : "bg-amber-50 text-[#B8791A]"
            }`}
          >
            {isCancelled ? (
              <AlertCircle size={17} />
            ) : (
              <CheckCircle2 size={17} />
            )}
            {status}
          </span>
        </div>

        {/* Order Progress */}
        <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-[#0A0E14]">Order Progress</h2>

          {isCancelled ? (
            <p className="mt-4 rounded-lg bg-red-50 p-4 text-sm font-medium text-red-700">
              This order has been cancelled.
            </p>
          ) : (
            <>
              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {progressSteps.map((step, index) => {
                  const StepIcon = step.icon;
                  const completed = index <= currentStep;

                  return (
                    <div key={step.label} className="text-center">
                      <div
                        className={`mx-auto flex h-10 w-10 items-center justify-center rounded-full ${
                          completed
                            ? "bg-[#0A0E14] text-white"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <StepIcon size={19} />
                      </div>

                      <p
                        className={`mt-2 text-xs font-semibold ${
                          completed ? "text-[#0A0E14]" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-gray-100">
                <div
                  className="h-full rounded-full bg-[#B8791A] transition-all"
                  style={{
                    width: `${(currentStep / 3) * 100}%`,
                  }}
                />
              </div>
            </>
          )}
        </section>

        <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
          {/* Left Column */}
          <div className="space-y-6">
            {/* Ordered Items */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2">
                <Package size={20} className="text-[#B8791A]" />
                <h2 className="text-base font-bold text-[#0A0E14]">
                  Ordered Items ({items.length})
                </h2>
              </div>

              {items.length === 0 ? (
                <p className="mt-5 text-sm text-gray-500">
                  No items were found for this order.
                </p>
              ) : (
                <div className="mt-5 divide-y divide-gray-100">
                  {items.map((item, index) => {
                    const product = item.product || {};
                    const name =
                      item.name || product.name || product.title || "Product";
                    const category = item.category || product.category || "";
                    const price = Number(item.price ?? product.price ?? 0);
                    const quantity = Number(item.quantity ?? 1);
                    const image =
                      item.image || product.image || product.images?.[0] || "";

                    return (
                      <div
                        key={item._id || item.id || index}
                        className="flex gap-3 py-5 first:pt-0 last:pb-0 sm:gap-4"
                      >
                        <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-50 sm:h-24 sm:w-24">
                          {image ? (
                            <img
                              src={image}
                              alt={name}
                              className="h-full w-full object-contain p-2"
                              onError={(event) => {
                                event.currentTarget.style.display = "none";
                              }}
                            />
                          ) : (
                            <ShoppingBag size={28} className="text-gray-300" />
                          )}
                        </div>

                        <div className="flex min-w-0 flex-1 flex-col justify-center">
                          <h3 className="text-sm font-bold text-[#0A0E14]">
                            {name}
                          </h3>

                          {category && (
                            <p className="mt-1 text-xs text-gray-500">
                              {typeof category === "object"
                                ? category.name || ""
                                : category}
                            </p>
                          )}

                          <p className="mt-2 text-xs text-gray-500">
                            Quantity: {quantity}
                          </p>
                        </div>

                        <div className="flex shrink-0 flex-col items-end justify-center">
                          <p className="text-sm font-bold text-[#0A0E14]">
                            {formatPrice(price * quantity)}
                          </p>

                          <p className="mt-1 text-xs text-gray-400">
                            {formatPrice(price)} each
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Shipping Address */}
            <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
              <div className="flex items-center gap-2">
                <MapPin size={20} className="text-[#B8791A]" />
                <h2 className="text-base font-bold text-[#0A0E14]">
                  Shipping Address
                </h2>
              </div>

              <div className="mt-4 rounded-xl bg-[#FAFAF8] p-4">
                <p className="text-sm font-semibold text-[#0A0E14]">
                  {shippingAddress.fullName ||
                    shippingAddress.name ||
                    "Name unavailable"}
                </p>

                <p className="mt-1 text-sm text-gray-600">
                  {shippingAddress.address || "Address unavailable"}
                </p>

                {shippingAddress.phone && (
                  <p className="mt-1 text-sm text-gray-600">
                    Phone: {shippingAddress.phone}
                  </p>
                )}

                <p className="text-sm text-gray-600">
                  {[shippingAddress.city, shippingAddress.country]
                    .filter(Boolean)
                    .join(", ")}
                </p>
              </div>
            </section>
          </div>

          {/* Right Column */}
          <aside className="h-fit space-y-6">
            {/* Order Summary */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <h2 className="text-base font-bold text-[#0A0E14]">
                Order Summary
              </h2>

              <div className="mt-5 space-y-3 text-sm">
                <div className="flex justify-between gap-3 text-gray-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between gap-3 text-gray-600">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>

                <div className="border-t border-gray-100 pt-4">
                  <div className="flex justify-between gap-3">
                    <span className="font-bold text-[#0A0E14]">Total</span>
                    <span className="text-lg font-bold text-[#0A0E14]">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-2">
                <Clock3 size={19} className="text-[#B8791A]" />
                <h2 className="text-base font-bold text-[#0A0E14]">Payment</h2>
              </div>

              <p className="mt-3 text-sm text-gray-600">
                {paymentMethod === "COD" ? "Cash on Delivery" : paymentMethod}
              </p>

              <p className="mt-2 text-xs text-gray-500">
                Payment status: {paymentStatus}
              </p>
            </section>

            <Link
              to="/shop"
              className="flex w-full items-center justify-center rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#1C2430]"
            >
              Continue Shopping
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}