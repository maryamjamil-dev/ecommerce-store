import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Package,
  RefreshCcw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

export default function ReturnPolicy() {
  return (
    <main className="bg-[#FAFAF8] text-[#14181F]">
      {/* Hero */}
      <section className="bg-[#0A0E14] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <Link
            to="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#FFB020] transition hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          <div className="max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-[#FFB020]">
              Customer Support
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Return Policy
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
              We want you to feel confident when shopping with Voltora.
              This policy explains when products can be returned and how the
              return process works.
            </p>

            <p className="mt-6 text-sm text-gray-400">
              Last updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* Quick Information */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <Clock3 size={22} />
            </div>
            <div>
              <h3 className="font-semibold">Return Window</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Within 7 days
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <Package size={22} />
            </div>
            <div>
              <h3 className="font-semibold">Product Condition</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Unused and complete
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <RefreshCcw size={22} />
            </div>
            <div>
              <h3 className="font-semibold">Refunds</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                After inspection
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3 className="font-semibold">Support</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                We're here to help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Policy Content */}
          <div className="space-y-12">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold">
                1. Return Eligibility
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Eligible products may be returned within 7 days of delivery.
                To qualify for a return, the item should be unused, in its
                original condition, and include the original packaging,
                accessories, manuals, and other included items.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "The product must be unused or in its original condition.",
                  "Original packaging and accessories should be included.",
                  "Proof of purchase or order information may be required.",
                  "The return request should be submitted within the return window.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2
                      size={20}
                      className="mt-0.5 shrink-0 text-[#FFB020]"
                    />
                    <p className="text-sm leading-6 text-[#6B7280]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold">
                2. Items That May Not Be Eligible
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Certain products may not be eligible for return because of
                their nature, condition, or usage. Products that have been
                damaged after delivery or modified by the customer may also
                be excluded.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Products damaged due to misuse or accidental damage.",
                  "Products missing important accessories or original packaging.",
                  "Products that have been modified or altered.",
                  "Items returned after the applicable return period.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <XCircle
                      size={20}
                      className="mt-0.5 shrink-0 text-gray-400"
                    />
                    <p className="text-sm leading-6 text-[#6B7280]">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold">
                3. How to Request a Return
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If you need to return an eligible product, contact Voltora
                support with your order information and the reason for the
                return.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF6E7] font-bold text-[#B8791A]">
                    1
                  </div>
                  <h3 className="font-semibold">Contact Us</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Contact support with your order details.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF6E7] font-bold text-[#B8791A]">
                    2
                  </div>
                  <h3 className="font-semibold">Get Approval</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Our team reviews your return request.
                  </p>
                </div>

                <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
                  <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#FFF6E7] font-bold text-[#B8791A]">
                    3
                  </div>
                  <h3 className="font-semibold">Send Product</h3>
                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Follow the return instructions provided by support.
                  </p>
                </div>
              </div>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold">
                4. Refund Process
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Returned products may be inspected after they are received.
                Once the return is approved, the applicable refund will be
                processed according to the original payment method and
                applicable business rules.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <h3 className="font-semibold">Please note</h3>
                <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                  Refund timing can depend on the payment method and financial
                  institution. Shipping charges may be treated separately
                  depending on the reason for the return.
                </p>
              </div>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold">
                5. Damaged or Incorrect Products
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If you receive a damaged, defective, or incorrect product,
                contact Voltora support as soon as possible. Please provide
                your order information and clear details or photos of the
                issue when requested.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold">
                6. Exchanges
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Product exchanges may depend on product availability and the
                reason for the exchange. If an exchange is not available, an
                eligible return may instead be processed according to this
                policy.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold">
                7. Need Help?
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If you have questions about a return, our support team can
                help you understand the applicable process for your order.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center justify-center rounded-xl bg-[#FFB020] px-6 py-3 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
              >
                Contact Support
              </Link>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-[#E5E7EB] bg-white p-6 lg:sticky lg:top-24">
            <h3 className="text-lg font-bold">Customer Policies</h3>

            <div className="mt-5 space-y-2">
              <Link
                to="/shipping-policy"
                className="block rounded-lg px-4 py-3 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#B8791A]"
              >
                Shipping Policy
              </Link>

              <Link
                to="/return-policy"
                className="block rounded-lg bg-[#FFF6E7] px-4 py-3 text-sm font-semibold text-[#B8791A]"
              >
                Return Policy
              </Link>

              <Link
                to="/privacy-policy"
                className="block rounded-lg px-4 py-3 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#B8791A]"
              >
                Privacy Policy
              </Link>

              <Link
                to="/terms"
                className="block rounded-lg px-4 py-3 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#B8791A]"
              >
                Terms of Service
              </Link>

              <Link
                to="/faq"
                className="block rounded-lg px-4 py-3 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#B8791A]"
              >
                FAQ
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

