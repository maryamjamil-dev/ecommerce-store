import React from "react";
import { ArrowUpDown } from "lucide-react";

export default function SortDropdown({
  sortBy,
  setSortBy,
}) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown
        size={17}
        className="text-gray-500"
      />

      <span className="hidden text-sm text-gray-500 sm:block">
        Sort by:
      </span>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm font-semibold text-[#0B1F3A] outline-none transition focus:border-[#0B1F3A]"
      >
        <option value="default">Featured</option>
        <option value="price-low">
          Price: Low to High
        </option>
        <option value="price-high">
          Price: High to Low
        </option>
        <option value="rating">
          Highest Rated
        </option>
        <option value="name">
          Name: A to Z
        </option>
      </select>
    </div>
  );
}