import React from "react";
import { PackageOpen, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function EmptyState({
  title = "Nothing here yet",
  description = "There is no content to display right now.",
  buttonText = "Continue Shopping",
  buttonLink = "/shop",
}) {
  return (
    <div className="flex min-h-[360px] items-center justify-center rounded-2xl border border-gray-200 bg-white px-6 py-12">
      <div className="mx-auto max-w-md text-center">
        {/* Icon */}
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-[#0B1F3A]">
          <PackageOpen size={36} strokeWidth={1.7} />
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-black text-[#0B1F3A]">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-gray-500">
          {description}
        </p>

        {/* Button */}
        <Link
          to={buttonLink}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-5 py-3 text-sm font-bold text-white transition hover:bg-blue-900"
        >
          {buttonText}
          <ArrowRight size={17} />
        </Link>
      </div>
    </div>
  );
}