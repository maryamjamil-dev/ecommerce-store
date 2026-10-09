import React from "react";
import { Link } from "react-router-dom";
import { CheckCircle, ShoppingBag, ArrowRight, Truck } from "lucide-react";

export default function OrderConfirmation() {
  return (
    <main className="voltora-body min-h-screen bg-[#FAFAF8]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          {/* Success Icon */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7] text-[#B8791A]">
            <CheckCircle size={36} />
          </div>

          <p className="mt-6 text-sm font-medium text-[#B8791A]">
            Order confirmed
          </p>

          <h1 className="voltora-heading mt-2 text-3xl font-semibold text-[#14181F] sm:text-4xl">
            Thanks for your order.
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#6B7280]">
            We've got it and we're getting it ready. You'll hear from us
            as soon as it's on its way.
          </p>

          {/* Order Number */}
          <div className="mx-auto mt-8 max-w-md rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] p-5">
            <p className="text-xs font-medium text-[#9CA3AF]">
              Order number
            </p>

            <p className="voltora-heading mt-2 text-xl font-semibold tracking-wide text-[#14181F]">
              #VLT-2026-001
            </p>
          </div>

          {/* Delivery Info */}
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF6E7] text-[#B8791A]">
                <Truck size={19} />
              </div>

              <h3 className="voltora-heading mt-4 text-sm font-semibold text-[#14181F]">
                Delivery
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                Your order will be prepared and shipped soon.
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-5 text-left">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFF6E7] text-[#B8791A]">
                <ShoppingBag size={19} />
              </div>

              <h3 className="voltora-heading mt-4 text-sm font-semibold text-[#14181F]">
                Order status
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                Your order is currently being processed.
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
            >
              Continue shopping
              <ArrowRight size={16} />
            </Link>

            <Link
              to="/"
              className="inline-flex items-center justify-center rounded-lg border border-[#E5E7EB] px-6 py-3 text-sm font-semibold text-[#14181F] transition hover:bg-[#F4F4F2]"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}