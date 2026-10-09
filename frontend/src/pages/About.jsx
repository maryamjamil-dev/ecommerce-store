import React from "react";
import { Zap, ShieldCheck, Truck, Headphones, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function About() {
  const features = [
    {
      icon: Zap,
      title: "Quality electronics",
      description:
        "We focus on bringing reliable and modern electronics together in one convenient place.",
    },
    {
      icon: ShieldCheck,
      title: "Secure shopping",
      description:
        "Our store is designed with a secure and user-friendly shopping experience in mind.",
    },
    {
      icon: Truck,
      title: "Reliable delivery",
      description:
        "We aim to make the delivery experience simple, convenient, and dependable.",
    },
    {
      icon: Headphones,
      title: "Customer support",
      description:
        "Our goal is to provide helpful support whenever customers need assistance.",
    },
  ];

  const categories = [
    "Smartphones",
    "Laptops",
    "Tablets",
    "Headphones",
    "Smartwatches",
    "Cameras",
    "Televisions",
    "Home Appliances",
  ];

  return (
    <>
    <Header/>
    <main className="voltora-body bg-[#FAFAF8]">
      {/* Fonts, shared with the rest of the Voltora account/checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Hero Section */}
      <section className="border-b border-[#E5E7EB] bg-[#0A0E14]">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="max-w-3xl">
            <p className="text-sm font-medium text-[#FFB020]">About Voltora</p>

            <h1 className="voltora-heading mt-4 text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
              Technology that fits
              <span className="text-[#FFB020]"> your everyday life.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              Voltora is a modern electronics store created to make
              discovering and shopping for everyday technology simple,
              convenient, and enjoyable.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB020] px-6 py-3.5 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
              >
                Explore products
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                Contact us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:px-8">
          <div>
            <p className="text-sm font-medium text-[#B8791A]">Our story</p>

            <h2 className="voltora-heading mt-3 text-3xl font-semibold text-[#14181F] sm:text-4xl">
              Making technology easier to discover
            </h2>

            <div className="mt-6 space-y-4 leading-7 text-[#6B7280]">
              <p>
                Voltora was created around a simple idea: shopping for
                electronics should feel clear, modern, and convenient.
              </p>

              <p>
                From personal devices and audio products to home and
                office equipment, our store brings different categories
                of technology together so customers can explore products
                in one place.
              </p>

              <p>
                We're focused on getting the everyday details right —
                accurate product information, straightforward checkout,
                and orders that arrive when we say they will.
              </p>
            </div>
          </div>

          {/* Visual Card */}
          <div className="relative">
            <div className="rounded-2xl bg-[#0A0E14] p-8 shadow-xl sm:p-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFB020]">
                <Zap size={26} className="text-[#0A0E14]" />
              </div>

              <h3 className="voltora-heading mt-8 text-2xl font-semibold text-white">
                Trusted by everyday shoppers
              </h3>

              <p className="mt-4 leading-7 text-white/60">
                Every order is packed, tracked, and backed by real people
                — from checkout to your doorstep.
              </p>

              <div className="mt-8 h-px bg-white/10" />

              <div className="mt-6 grid grid-cols-2 gap-6">
                <div>
                  <p className="voltora-heading text-3xl font-semibold text-[#FFB020]">
                    4.8<span className="text-lg">★</span>
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    Average customer rating
                  </p>
                </div>

                <div>
                  <p className="voltora-heading text-3xl font-semibold text-[#FFB020]">
                    50k+
                  </p>
                  <p className="mt-1 text-sm text-white/60">
                    Orders delivered
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="border-y border-[#E5E7EB] bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-medium text-[#B8791A]">Why Voltora</p>

            <h2 className="voltora-heading mt-3 text-3xl font-semibold text-[#14181F] sm:text-4xl">
              Designed around your shopping experience
            </h2>

            <p className="mt-4 leading-7 text-[#6B7280]">
              We focus on the things that make an online electronics
              store easy and enjoyable to use.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.title}
                  className="rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] p-6 transition hover:border-[#FFB020]/40 hover:shadow-md"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF6E7]">
                    <Icon size={21} className="text-[#B8791A]" />
                  </div>

                  <h3 className="voltora-heading mt-5 text-lg font-semibold text-[#14181F]">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div>
              <p className="text-sm font-medium text-[#B8791A]">
                What you can find
              </p>

              <h2 className="voltora-heading mt-3 text-3xl font-semibold text-[#14181F] sm:text-4xl">
                Technology for work, home, and everyday life
              </h2>

              <p className="mt-5 leading-7 text-[#6B7280]">
                Explore a growing range of electronics across different
                product categories.
              </p>

              <Link
                to="/categories"
                className="mt-7 inline-flex items-center gap-2 font-semibold text-[#B8791A] transition hover:text-[#0A0E14]"
              >
                View all categories
                <ArrowRight size={18} />
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {categories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-white p-4"
                >
                  <CheckCircle size={17} className="shrink-0 text-[#FFB020]" />
                  <span className="text-sm font-medium text-[#14181F]">
                    {category}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[#FFB020]">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="voltora-heading text-3xl font-semibold text-[#0A0E14] sm:text-4xl">
            Ready to explore Voltora?
          </h2>

          <p className="mx-auto mt-3 max-w-2xl leading-7 text-[#0A0E14]/70">
            Discover electronics selected for your everyday needs and
            find something that fits your lifestyle.
          </p>

          <Link
            to="/shop"
            className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#0A0E14] px-6 py-3.5 font-semibold text-white transition hover:bg-[#171d29]"
          >
            Start shopping
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
    <Footer/>
    </>
  );
}