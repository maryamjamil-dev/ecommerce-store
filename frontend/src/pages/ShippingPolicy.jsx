 
import React from "react";
import {
  Truck,
  Clock,
  MapPin,
  Package,
  ShieldCheck,
  HelpCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ShippingPolicy() {
  return (
    <main className="bg-[#FAFAF8]">
      {/* Hero */}
      <section className="border-b border-[#E5E7EB] bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
          <div className="max-w-3xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFB020]">
              <Truck
                size={28}
                className="text-[#0A0E14]"
              />
            </div>

            <p className="mt-5 text-sm font-bold uppercase tracking-wider text-[#FFB020]">
              Store Policy
            </p>

            <h1 className="mt-3 text-4xl font-bold text-white sm:text-5xl">
              Shipping Policy
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[#9CA3AF] sm:text-lg">
              Learn how Voltora handles order processing, delivery,
              shipping times, and delivery-related issues.
            </p>

            <p className="mt-4 text-sm text-[#6B7280]">
              Last updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* Quick Information */}
      <section className="border-b border-[#E5E7EB] bg-white py-8">
        <div className="mx-auto grid max-w-5xl gap-4 px-4 sm:px-6 md:grid-cols-3 lg:px-8">
          <div className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7]">
              <Clock
                size={21}
                className="text-[#FFB020]"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-[#14181F]">
                Processing
              </p>

              <p className="mt-1 text-xs text-[#6B7280]">
                Orders are prepared for shipment
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7]">
              <Truck
                size={21}
                className="text-[#FFB020]"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-[#14181F]">
                Delivery
              </p>

              <p className="mt-1 text-xs text-[#6B7280]">
                Delivery timing depends on destination
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] p-5">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7]">
              <MapPin
                size={21}
                className="text-[#FFB020]"
              />
            </div>

            <div>
              <p className="text-sm font-bold text-[#14181F]">
                Delivery Area
              </p>

              <p className="mt-1 text-xs text-[#6B7280]">
                Available destinations may vary
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-14 sm:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_280px] lg:px-8">
          {/* Policy Content */}
          <article className="rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8 lg:p-10">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-bold text-[#14181F]">
                1. Shipping Overview
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Voltora aims to provide a simple and reliable delivery
                experience. Orders are processed after they are placed,
                prepared for shipment, and delivered to the address
                provided during checkout.
              </p>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Shipping availability, delivery times, and applicable
                charges may vary depending on the destination and the
                products included in an order.
              </p>
            </section>

            {/* Processing */}
            <section className="mt-10 border-t border-[#E5E7EB] pt-10">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7]">
                  <Package
                    size={20}
                    className="text-[#FFB020]"
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-bold text-[#14181F]">
                    2. Order Processing
                  </h2>

                  <p className="mt-4 leading-7 text-[#6B7280]">
                    After you place an order, the order information is
                    reviewed and the products are prepared for
                    shipment.
                  </p>

                  <ul className="mt-5 space-y-3">
                    <li className="flex gap-3 text-sm leading-6 text-[#6B7280]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB020]" />
                      Orders are processed during normal business
                      operations.
                    </li>

                    <li className="flex gap-3 text-sm leading-6 text-[#6B7280]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB020]" />
                      Processing time may vary depending on product
                      availability.
                    </li>

                    <li className="flex gap-3 text-sm leading-6 text-[#6B7280]">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#FFB020]" />
                      Customers should provide accurate delivery
                      information during checkout.
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Delivery Time */}
            <section className="mt-10 border-t border-[#E5E7EB] pt-10">
              <h2 className="text-2xl font-bold text-[#14181F]">
                3. Delivery Times
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Delivery times depend on the customer's location,
                shipping service, product availability, and other
                delivery conditions.
              </p>

              <div className="mt-6 overflow-hidden rounded-xl border border-[#E5E7EB]">
                <div className="grid grid-cols-2 bg-[#FAFAF8] px-4 py-3 text-sm font-bold text-[#14181F] sm:px-5">
                  <span>Stage</span>
                  <span>Information</span>
                </div>

                <div className="grid grid-cols-2 border-t border-[#E5E7EB] px-4 py-4 text-sm sm:px-5">
                  <span className="font-medium text-[#14181F]">
                    Processing
                  </span>

                  <span className="text-[#6B7280]">
                    Depends on product availability
                  </span>
                </div>

                <div className="grid grid-cols-2 border-t border-[#E5E7EB] px-4 py-4 text-sm sm:px-5">
                  <span className="font-medium text-[#14181F]">
                    Shipping
                  </span>

                  <span className="text-[#6B7280]">
                    Depends on destination
                  </span>
                </div>

                <div className="grid grid-cols-2 border-t border-[#E5E7EB] px-4 py-4 text-sm sm:px-5">
                  <span className="font-medium text-[#14181F]">
                    Final Delivery
                  </span>

                  <span className="text-[#6B7280]">
                    Depends on the delivery service
                  </span>
                </div>
              </div>
            </section>

            {/* Shipping Charges */}
            <section className="mt-10 border-t border-[#E5E7EB] pt-10">
              <h2 className="text-2xl font-bold text-[#14181F]">
                4. Shipping Charges
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Any applicable shipping charges will be displayed
                during the checkout process before an order is
                completed.
              </p>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Shipping charges may vary depending on the delivery
                destination, order details, and shipping method
                available for the order.
              </p>
            </section>

            {/* Delivery Address */}
            <section className="mt-10 border-t border-[#E5E7EB] pt-10">
              <h2 className="text-2xl font-bold text-[#14181F]">
                5. Delivery Address
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Customers are responsible for providing a complete
                and accurate delivery address. Incorrect or incomplete
                information may result in delivery delays.
              </p>

              <div className="mt-5 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] p-5">
                <div className="flex gap-3">
                  <MapPin
                    size={20}
                    className="mt-0.5 shrink-0 text-[#FFB020]"
                  />

                  <p className="text-sm leading-6 text-[#6B7280]">
                    Please check your name, phone number, street
                    address, city, and postal code carefully before
                    placing your order.
                  </p>
                </div>
              </div>
            </section>

            {/* Delayed Orders */}
            <section className="mt-10 border-t border-[#E5E7EB] pt-10">
              <h2 className="text-2xl font-bold text-[#14181F]">
                6. Delayed or Missing Orders
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Delivery delays can sometimes occur because of
                operational issues, weather conditions, transportation
                delays, incorrect addresses, or other circumstances
                outside the store's direct control.
              </p>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If your order has not arrived within the expected
                delivery period, please contact our support team with
                your order information so the issue can be reviewed.
              </p>
            </section>

            {/* Damaged Package */}
            <section className="mt-10 border-t border-[#E5E7EB] pt-10">
              <h2 className="text-2xl font-bold text-[#14181F]">
                7. Damaged Packages
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If a package appears damaged when it arrives, inspect
                the package and contact customer support as soon as
                possible with relevant order details and supporting
                information.
              </p>
            </section>

            {/* Contact */}
            <section className="mt-10 border-t border-[#E5E7EB] pt-10">
              <h2 className="text-2xl font-bold text-[#14181F]">
                8. Need Help?
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If you have questions about shipping, delivery, or
                your order, our support team can help.
              </p>

              <Link
                to="/contact"
                className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#FFB020] px-5 py-3 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
              >
                Contact Support
              </Link>
            </section>
          </article>

          {/* Sidebar */}
          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <ShieldCheck
                  size={21}
                  className="text-[#FFB020]"
                />

                <h3 className="font-bold text-[#14181F]">
                  Helpful Links
                </h3>
              </div>

              <div className="mt-4 space-y-1">
                <Link
                  to="/return-policy"
                  className="block rounded-lg px-3 py-2 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#B8791A]"
                >
                  Return Policy
                </Link>

                <Link
                  to="/privacy-policy"
                  className="block rounded-lg px-3 py-2 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#B8791A]"
                >
                  Privacy Policy
                </Link>

                <Link
                  to="/terms"
                  className="block rounded-lg px-3 py-2 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#B8791A]"
                >
                  Terms of Service
                </Link>

                <Link
                  to="/faq"
                  className="block rounded-lg px-3 py-2 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#B8791A]"
                >
                  FAQ
                </Link>
              </div>
            </div>

            <div className="rounded-2xl bg-[#0A0E14] p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFB020]">
                <HelpCircle
                  size={20}
                  className="text-[#0A0E14]"
                />
              </div>

              <h3 className="mt-4 font-bold text-white">
                Have a question?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#9CA3AF]">
                Check our FAQ or contact our support team for more
                information.
              </p>

              <Link
                to="/faq"
                className="mt-4 inline-block text-sm font-semibold text-[#FFB020] transition hover:text-white"
              >
                View FAQ →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

