import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  CheckCircle2,
  Package,
  Truck,
  MapPin,
  ShoppingBag,
  AlertCircle,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function OrderSuccess() {
  const location = useLocation();

  const [order, setOrder] = useState(location.state?.order ?? null);
  const [loading, setLoading] = useState(!location.state?.order);
  const [error, setError] = useState("");

  useEffect(() => {
    if (location.state?.order) {
      setOrder(location.state.order);
      setLoading(false);
      return;
    }

    let cancelled = false;

    const fetchLatestOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`${API_URL}/orders/my-orders`, {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json().catch(() => ({}));

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to retrieve your order."
          );
        }

        const latestOrder = result.orders?.[0];

        if (!latestOrder) {
          throw new Error("No orders were found for your account.");
        }

        if (!cancelled) {
          setOrder(latestOrder);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err.message || "Unable to retrieve order information."
          );
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    fetchLatestOrder();

    return () => {
      cancelled = true;
    };
  }, [location.state]);

  if (loading) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#FAFAF8] px-4">
        <p className="text-sm text-[#6B7280]">
          Loading your order information...
        </p>
      </main>
    );
  }

  if (!order) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-[#FAFAF8] px-4 py-12">
        <section className="w-full max-w-2xl rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <AlertCircle className="mx-auto text-amber-600" size={44} />

          <h1 className="mt-5 text-2xl font-bold text-[#14181F]">
            Order information unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#6B7280]">
            {error ||
              "We could not find your order. Please check your orders page."}
          </p>

          <Link
            to="/orders"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0b1726]"
          >
            View My Orders
          </Link>
        </section>
      </main>
    );
  }

  const shippingAddress = order.shippingAddress || {};
  const orderId = order._id || order.id || order.orderNumber || "N/A";
  const items = order.items || [];
  const subtotal = Number(order.subtotal ?? 0);
  const shippingFee = Number(order.shippingFee ?? 0);
  const totalAmount = Number(
    order.totalAmount ?? subtotal + shippingFee
  );

  return (
    <main className="min-h-[60vh] bg-[#FAFAF8] px-4 py-12 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <section className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-10">
          <div className="text-center">
            <CheckCircle2
              className="mx-auto text-green-600"
              size={58}
            />

            <p className="mt-5 text-sm font-semibold uppercase tracking-wider text-green-700">
              Order placed successfully
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#14181F]">
              Thank you for your order!
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#6B7280]">
              Your order has been received. You can review its details below.
            </p>
          </div>

          <div className="mt-8 rounded-xl bg-[#F5F7FA] p-5">
            <div className="flex items-start gap-3">
              <Package className="mt-1 shrink-0 text-[#14181F]" size={22} />

              <div className="min-w-0">
                <p className="text-xs text-[#6B7280]">Order ID</p>
                <p className="mt-1 break-all font-semibold text-[#14181F]">
                  {orderId}
                </p>

                <p className="mt-3 text-xs text-[#6B7280]">
                  Order status
                </p>
                <p className="mt-1 font-semibold text-[#14181F]">
                  {order.orderStatus || order.status || "Pending"}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <h2 className="text-lg font-bold text-[#14181F]">
              Order summary
            </h2>

            <div className="mt-4 divide-y divide-[#E5E7EB]">
              {items.map((item, index) => (
                <div
                  key={item.product?._id || item.product || index}
                  className="flex items-center gap-4 py-4"
                >
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-[#F5F7FA] p-2">
                    {item.image && (
                      <img
                        src={item.image}
                        alt={item.name || "Product"}
                        className="h-full w-full object-contain"
                      />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-[#14181F]">
                      {item.name || item.product?.name || "Product"}
                    </p>

                    <p className="mt-1 text-xs text-[#6B7280]">
                      Quantity: {item.quantity}
                    </p>
                  </div>

                  <p className="text-sm font-semibold text-[#14181F]">
                    $
                    {(
                      Number(item.price || 0) *
                      Number(item.quantity || 1)
                    ).toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 space-y-3 border-t border-[#E5E7EB] pt-5">
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#6B7280]">Shipping</span>
                <span>
                  {shippingFee === 0
                    ? "Free"
                    : `$${shippingFee.toFixed(2)}`}
                </span>
              </div>

              <div className="flex justify-between border-t border-[#E5E7EB] pt-4">
                <span className="font-bold text-[#14181F]">Total</span>
                <span className="text-xl font-bold text-[#14181F]">
                  ${totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-xl border border-[#E5E7EB] p-5">
            <div className="flex items-center gap-3">
              <MapPin className="shrink-0 text-[#14181F]" size={21} />
              <h2 className="font-bold text-[#14181F]">
                Shipping address
              </h2>
            </div>

            <p className="mt-4 text-sm font-semibold text-[#14181F]">
              {shippingAddress.fullName || "Customer"}
            </p>

            <p className="mt-1 text-sm text-[#6B7280]">
              {shippingAddress.address}
            </p>

            <p className="text-sm text-[#6B7280]">
              {[shippingAddress.city, shippingAddress.postalCode]
                .filter(Boolean)
                .join(", ")}
            </p>

            <p className="text-sm text-[#6B7280]">
              {shippingAddress.country}
            </p>

            <p className="mt-2 text-sm text-[#6B7280]">
              {shippingAddress.phone}
            </p>
          </div>

          <div className="mt-5 rounded-xl border border-[#E5E7EB] p-5">
            <div className="flex items-center gap-3">
              <Truck className="shrink-0 text-[#14181F]" size={21} />
              <h2 className="font-bold text-[#14181F]">
                Payment information
              </h2>
            </div>

            <p className="mt-3 text-sm text-[#6B7280]">
              Method: {order.paymentMethod || "COD"}
            </p>

            <p className="mt-1 text-sm text-[#6B7280]">
              Payment status: {order.paymentStatus || "Pending"}
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/orders"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0a1829]"
            >
              <Package size={17} />
              View My Orders
            </Link>

            <Link
              to="/shop"
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-[#D1D5DB] px-5 py-3 text-sm font-semibold text-[#14181F] transition hover:bg-[#F5F7FA]"
            >
              <ShoppingBag size={17} />
              Continue Shopping
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
