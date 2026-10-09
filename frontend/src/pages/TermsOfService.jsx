import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  FileText,
  LockKeyhole,
  ShieldCheck,
  ShoppingBag,
  UserCheck,
  XCircle,
} from "lucide-react";

export default function TermsOfService() {
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
              Legal Information
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Terms of Service
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
              These Terms of Service explain the rules and conditions that
              apply when you browse, create an account, or purchase products
              through Voltora.
            </p>

            <p className="mt-6 text-sm text-gray-400">
              Last updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <ShoppingBag size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Shopping</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Product and order terms
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <UserCheck size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Accounts</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Responsible account use
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Security</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Safe website usage
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <FileText size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Policies</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Store rules and conditions
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_320px]">
          {/* Terms Content */}
          <div className="space-y-12">
            {/* 1 */}
            <section>
              <h2 className="text-2xl font-bold">
                1. Acceptance of Terms
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                By accessing or using the Voltora website, you agree to follow
                these Terms of Service and any applicable policies referenced
                on the website. If you do not agree with these terms, please
                do not use the website or its services.
              </p>
            </section>

            {/* 2 */}
            <section>
              <h2 className="text-2xl font-bold">
                2. Use of the Website
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                You may use Voltora for lawful purposes and in accordance with
                these terms. You agree not to misuse the website, interfere
                with its operation, or attempt to gain unauthorized access to
                systems or information.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Use the website only for lawful purposes.",
                  "Provide accurate information when creating an account or placing an order.",
                  "Do not attempt to disrupt or damage website functionality.",
                  "Do not access accounts or information that do not belong to you.",
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

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold">
                3. User Accounts
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Some features may require you to create an account. You are
                responsible for maintaining the confidentiality of your login
                information and for activity performed through your account.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
                    <LockKeyhole size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Keep your account secure
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Do not share your password with others. Contact support
                      if you believe your account has been accessed without
                      authorization.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold">
                4. Products and Product Information
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                We aim to display product names, descriptions, images,
                specifications, prices, and availability as accurately as
                reasonably possible. Product information may change without
                prior notice.
              </p>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Product images are provided for presentation purposes and may
                differ slightly from the actual product because of display
                settings, photography, or manufacturer packaging changes.
              </p>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold">
                5. Prices and Availability
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Prices, discounts, promotions, and product availability may
                change at any time. We may correct pricing or availability
                errors when discovered.
              </p>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If an order is affected by an obvious pricing or availability
                error, the order may need to be reviewed or cancelled, with
                appropriate communication to the customer.
              </p>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold">
                6. Orders and Payments
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Placing an order constitutes a request to purchase the selected
                products. An order may be subject to verification, product
                availability, payment authorization, and other applicable
                requirements.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Order details should be reviewed carefully before submission.",
                  "Customers are responsible for providing accurate delivery information.",
                  "Payment must be successfully authorized through the available payment method.",
                  "An order may be cancelled where necessary because of availability, payment, pricing, or other legitimate issues.",
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

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold">
                7. Shipping and Delivery
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Shipping and delivery are subject to the conditions described
                in our Shipping Policy. Delivery estimates may vary depending
                on location, product availability, courier operations, weather,
                and other circumstances.
              </p>

              <Link
                to="/shipping-policy"
                className="mt-5 inline-flex items-center font-semibold text-[#B8791A] hover:text-[#0A0E14]"
              >
                View Shipping Policy →
              </Link>
            </section>

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold">
                8. Returns and Refunds
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Returns and refunds are handled according to the applicable
                Return Policy. Eligibility may depend on the product
                condition, return period, reason for return, and other
                applicable requirements.
              </p>

              <Link
                to="/return-policy"
                className="mt-5 inline-flex items-center font-semibold text-[#B8791A] hover:text-[#0A0E14]"
              >
                View Return Policy →
              </Link>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold">
                9. Prohibited Activities
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                To help keep Voltora safe and reliable, users must not use the
                website for fraudulent, unlawful, abusive, or harmful
                activities.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Attempting unauthorized access to website systems.",
                  "Using another person's account without permission.",
                  "Submitting fraudulent orders or payment information.",
                  "Uploading malicious code or harmful content.",
                  "Interfering with the normal operation of the website.",
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

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold">
                10. Intellectual Property
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Unless otherwise stated, the website's original design,
                branding, text, graphics, interface elements, and other
                content may be protected by applicable intellectual property
                laws. You may not reproduce, distribute, or commercially
                exploit such content without appropriate permission.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold">
                11. Third-Party Services
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Voltora may use third-party services such as payment
                processors, delivery providers, analytics tools, hosting
                services, or other technology providers. Their own terms and
                privacy practices may also apply.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-2xl font-bold">
                12. Website Availability
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                We aim to keep the website available and functional, but we
                cannot guarantee uninterrupted access at all times. The
                website may occasionally be unavailable because of maintenance,
                technical problems, updates, or circumstances outside our
                control.
              </p>
            </section>

            {/* 13 */}
            <section>
              <h2 className="text-2xl font-bold">
                13. Limitation of Liability
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                To the extent permitted by applicable law, Voltora will not be
                responsible for losses resulting from unauthorized use,
                temporary website unavailability, third-party service
                interruptions, or circumstances beyond reasonable control.
              </p>
            </section>

            {/* 14 */}
            <section>
              <h2 className="text-2xl font-bold">
                14. Changes to These Terms
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                These Terms of Service may be updated when our services,
                website functionality, business practices, or legal
                requirements change. Updated terms will be published on this
                page with a revised update date.
              </p>
            </section>

            {/* 15 */}
            <section>
              <h2 className="text-2xl font-bold">
                15. Contact Us
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If you have questions about these Terms of Service, please
                contact the Voltora support team.
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
                className="block rounded-lg px-4 py-3 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#B8791A]"
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
                className="block rounded-lg bg-[#FFF6E7] px-4 py-3 text-sm font-semibold text-[#B8791A]"
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

