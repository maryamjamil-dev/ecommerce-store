import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Cookie,
  Database,
  LockKeyhole,
  Mail,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function PrivacyPolicy() {
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
              Your Privacy Matters
            </p>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Privacy Policy
            </h1>

            <p className="mt-5 text-base leading-7 text-gray-300 sm:text-lg">
              This Privacy Policy explains what information Voltora may
              collect, how it may be used, and the steps we take to protect
              customer information.
            </p>

            <p className="mt-6 text-sm text-gray-400">
              Last updated: September 2026
            </p>
          </div>
        </div>
      </section>

      {/* Privacy Highlights */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-6 py-10 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <Database size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Data Collection</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Only relevant information
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <LockKeyhole size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Data Protection</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Security is a priority
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <UserRound size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Your Choices</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Control your information
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
              <ShieldCheck size={22} />
            </div>

            <div>
              <h3 className="font-semibold">Privacy First</h3>
              <p className="mt-1 text-sm text-[#6B7280]">
                Responsible data handling
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
                1. Information We Collect
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                When you use Voltora, we may collect information that you
                provide directly and information generated when you interact
                with our website.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Name and contact information.",
                  "Email address and account information.",
                  "Shipping and billing information when placing an order.",
                  "Order history and transaction-related information.",
                  "Information you provide when contacting customer support.",
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
                2. How We Use Your Information
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Information may be used to provide and improve Voltora
                services, process orders, communicate with customers, and
                maintain the security of the website.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  {
                    title: "Process Orders",
                    text: "To process purchases, payments, shipping, and order-related requests.",
                  },
                  {
                    title: "Customer Support",
                    text: "To respond to questions, complaints, and support requests.",
                  },
                  {
                    title: "Improve Services",
                    text: "To understand how customers use the website and improve the experience.",
                  },
                  {
                    title: "Security",
                    text: "To help detect unauthorized activity, fraud, and security issues.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[#E5E7EB] bg-white p-6"
                  >
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      {item.text}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 3 */}
            <section>
              <h2 className="text-2xl font-bold">
                3. Account Information
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If you create an account, you are responsible for keeping
                your account credentials secure. You should notify Voltora if
                you believe that your account has been accessed without your
                permission.
              </p>
            </section>

            {/* 4 */}
            <section>
              <h2 className="text-2xl font-bold">
                4. Payment Information
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Payment information may be processed through payment
                providers used by the store. Voltora should not store
                sensitive payment details such as complete card numbers unless
                a secure payment system specifically supports such storage.
              </p>

              <div className="mt-6 rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="flex items-start gap-4">
                  <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
                    <LockKeyhole size={22} />
                  </div>

                  <div>
                    <h3 className="font-semibold">
                      Secure payment processing
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                      Actual payment security depends on the payment provider
                      and the production security infrastructure connected to
                      the website.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* 5 */}
            <section>
              <h2 className="text-2xl font-bold">
                5. Cookies and Similar Technologies
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Voltora may use cookies or similar technologies to remember
                preferences, maintain sessions, understand website usage, and
                improve functionality.
              </p>

              <div className="mt-6 flex items-start gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-6">
                <div className="rounded-xl bg-[#FFF6E7] p-3 text-[#B8791A]">
                  <Cookie size={22} />
                </div>

                <div>
                  <h3 className="font-semibold">Cookie preferences</h3>

                  <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                    Your browser may provide controls for managing or
                    restricting cookies. Some website features may not work
                    correctly if certain cookies are disabled.
                  </p>
                </div>
              </div>
            </section>

            {/* 6 */}
            <section>
              <h2 className="text-2xl font-bold">
                6. Information Sharing
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Customer information should only be shared when reasonably
                necessary to provide services, process orders, maintain the
                website, comply with legal requirements, or protect the
                security of Voltora and its users.
              </p>
            </section>

            {/* 7 */}
            <section>
              <h2 className="text-2xl font-bold">
                7. Data Security
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                We take reasonable measures to protect information from
                unauthorized access, alteration, disclosure, or destruction.
                However, no online system can be guaranteed to be completely
                secure.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Use secure authentication practices.",
                  "Limit access to information to authorized systems or personnel.",
                  "Use appropriate security controls for production systems.",
                  "Monitor and address security issues when identified.",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <ShieldCheck
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

            {/* 8 */}
            <section>
              <h2 className="text-2xl font-bold">
                8. Data Retention
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Information may be retained for as long as reasonably
                necessary to provide services, maintain transaction records,
                resolve disputes, meet legal obligations, and protect the
                security of the website.
              </p>
            </section>

            {/* 9 */}
            <section>
              <h2 className="text-2xl font-bold">
                9. Your Privacy Choices
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Depending on the applicable laws and the features available on
                the website, you may have choices regarding your personal
                information.
              </p>

              <div className="mt-6 space-y-3">
                {[
                  "Request information about the data associated with your account.",
                  "Ask for inaccurate information to be corrected.",
                  "Request deletion where legally applicable.",
                  "Manage certain communication preferences.",
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

            {/* 10 */}
            <section>
              <h2 className="text-2xl font-bold">
                10. Children's Privacy
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                Voltora is not intended to knowingly collect personal
                information from children where prohibited by applicable
                law. If you believe that a child has provided personal
                information to us, please contact support so the situation
                can be reviewed.
              </p>
            </section>

            {/* 11 */}
            <section>
              <h2 className="text-2xl font-bold">
                11. Changes to This Policy
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                This Privacy Policy may be updated from time to time as the
                website, services, or legal requirements change. The updated
                version will be published on this page with a revised
                effective or update date.
              </p>
            </section>

            {/* 12 */}
            <section>
              <h2 className="text-2xl font-bold">
                12. Contact Us
              </h2>

              <p className="mt-4 leading-7 text-[#6B7280]">
                If you have questions about this Privacy Policy or how your
                information is handled, contact the Voltora support team.
              </p>

              <div className="mt-6 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-[#FFB020] px-6 py-3 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
                >
                  <Mail size={18} />
                  Contact Support
                </Link>

                <a
                  href="mailto:support@voltora.com"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#D1D5DB] bg-white px-6 py-3 font-semibold text-[#14181F] transition hover:border-[#FFB020] hover:text-[#B8791A]"
                >
                  Email Us
                </a>
              </div>
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
                className="block rounded-lg bg-[#FFF6E7] px-4 py-3 text-sm font-semibold text-[#B8791A]"
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

