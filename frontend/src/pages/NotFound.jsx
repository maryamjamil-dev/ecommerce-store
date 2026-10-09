import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-[75vh] bg-[#FAFAF8] px-4 py-16">
      <div className="mx-auto flex max-w-4xl items-center justify-center">
        <div className="w-full text-center">

          {/* 404 Number */}
          <div className="mb-6">
            <span className="text-8xl font-black tracking-tight text-[#FFB020] sm:text-9xl">
              404
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-3xl font-bold text-[#14181F] sm:text-4xl">
            Page Not Found
          </h1>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-[#6B7280]">
            Sorry, we couldn't find the page you're looking for. The page may
            have been moved, removed, or the URL might be incorrect.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

            {/* Back */}
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-5 text-sm font-semibold text-[#14181F] transition hover:border-[#FFB020] hover:bg-[#FFF6E7]"
            >
              <ArrowLeft size={17} />
              Go Back
            </button>

            {/* Home */}
            <Link
              to="/"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-5 text-sm font-semibold text-white transition hover:bg-[#171d29]"
            >
              <Home size={17} />
              Back to Home
            </Link>

            {/* Shop */}
            <Link
              to="/shop"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#FFB020] px-5 text-sm font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
            >
              <Search size={17} />
              Browse Products
            </Link>

          </div>

          {/* Helpful Links */}
          <div className="mt-10 border-t border-[#E5E7EB] pt-6">
            <p className="text-sm text-[#9CA3AF]">
              Looking for something specific?
            </p>

            <div className="mt-3 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-medium">
              <Link
                to="/categories"
                className="text-[#6B7280] transition hover:text-[#B8791A]"
              >
                Categories
              </Link>

              <Link
                to="/wishlist"
                className="text-[#6B7280] transition hover:text-[#B8791A]"
              >
                Wishlist
              </Link>

              <Link
                to="/contact"
                className="text-[#6B7280] transition hover:text-[#B8791A]"
              >
                Contact Us
              </Link>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}

