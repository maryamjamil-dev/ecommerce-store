import React from "react";

import { Mail, MapPin, Phone, ArrowRight, Zap } from "lucide-react";

import { FaFacebookF, FaInstagram, FaXTwitter, FaYoutube } from "react-icons/fa6";

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="voltora-body bg-[#0A0E14] text-white">
      {/* Fonts, shared with the rest of the Voltora account/checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Newsletter Section */}
      <section className="border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            {/* Newsletter Content */}
            <div>
              <h2 className="voltora-heading text-xl font-semibold sm:text-2xl">
                Get the latest from Voltora
              </h2>

              <p className="mt-1.5 max-w-xl text-sm leading-6 text-white/60">
                New products, exclusive deals, and restock alerts —
                straight to your inbox.
              </p>
            </div>

            {/* Newsletter Form */}
            <div className="flex w-full max-w-md">
              <input
                type="email"
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-l-lg border border-white/15 bg-white px-4 py-3 text-sm text-[#14181F] outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB020]"
              />

              <button
                type="button"
                className="flex items-center gap-2 rounded-r-lg bg-[#FFB020] px-5 py-3 text-sm font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Footer */}
      <div className="mx-auto max-w-7xl px-4 py-11 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFB020] text-[#0A0E14]">
                <Zap size={20} fill="currentColor" />
              </span>

              <span className="voltora-heading text-xl font-semibold tracking-tight">
                Voltora
              </span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-white/60">
              Modern electronics and smart technology designed for your
              everyday life.
            </p>

            {/* Social Icons */}
            <div className="mt-5 flex gap-3">
              <a
                href="#"
                aria-label="Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 transition hover:bg-[#FFB020] hover:text-[#0A0E14]"
              >
                <FaFacebookF size={15} />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 transition hover:bg-[#FFB020] hover:text-[#0A0E14]"
              >
                <FaInstagram size={16} />
              </a>

              <a
                href="#"
                aria-label="X"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 transition hover:bg-[#FFB020] hover:text-[#0A0E14]"
              >
                <FaXTwitter size={15} />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 transition hover:bg-[#FFB020] hover:text-[#0A0E14]"
              >
                <FaYoutube size={16} />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="voltora-heading text-sm font-semibold text-white">
              Shop
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <Link to="/shop" className="transition hover:text-[#FFB020]">
                  All products
                </Link>
              </li>

              <li>
                <Link to="/categories" className="transition hover:text-[#FFB020]">
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/shop" className="transition hover:text-[#FFB020]">
                  New arrivals
                </Link>
              </li>

              <li>
                <Link to="/shop" className="transition hover:text-[#FFB020]">
                  Best sellers
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h3 className="voltora-heading text-sm font-semibold text-white">
              Customer care
            </h3>

            <ul className="mt-4 space-y-2.5 text-sm text-white/60">
              <li>
                <Link to="/contact" className="transition hover:text-[#FFB020]">
                  Contact us
                </Link>
              </li>

              <li>
                <Link to="/faq" className="transition hover:text-[#FFB020]">
                  FAQ
                </Link>
              </li>

              <li>
                <Link
                  to="/shipping-policy"
                  className="transition hover:text-[#FFB020]"
                >
                  Shipping & delivery
                </Link>
              </li>

              <li>
                <Link
                  to="/return-policy"
                  className="transition hover:text-[#FFB020]"
                >
                  Returns & refunds
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="voltora-heading text-sm font-semibold text-white">
              Contact
            </h3>

            <div className="mt-4 space-y-3 text-sm text-white/60">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 shrink-0 text-[#FFB020]" size={18} />
                <span>Pakistan</span>
              </div>

              <div className="flex gap-3">
                <Phone className="mt-0.5 shrink-0 text-[#FFB020]" size={18} />
                <span>+92 XXX XXXXXXX</span>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-0.5 shrink-0 text-[#FFB020]" size={18} />
                <span>support@voltora.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-4 text-sm text-white/50 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <p>© 2026 Voltora. All rights reserved.</p>

          <div className="flex gap-5">
            <Link to="/privacy-policy" className="transition hover:text-[#FFB020]">
              Privacy policy
            </Link>

            <Link to="/terms" className="transition hover:text-[#FFB020]">
              Terms of service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}