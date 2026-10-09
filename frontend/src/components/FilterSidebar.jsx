import React from "react";

export default function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  selectedBrands,
  setSelectedBrands,
  clearFilters,
}) {
  const brands = [
    "Apple",
    "Samsung",
    "Sony",
    "Canon",
    "Dell",
    "HP",
    "Lenovo",
    "JBL",
    "LG",
    "Philips",
  ];

  const handleBrandChange = (brand) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((item) => item !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  const inputClass =
    "w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-sm text-[#14181F] outline-none transition focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/25";

  return (
    <aside className="voltora-body rounded-xl border border-[#E5E7EB] bg-white p-5">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
        <h2 className="voltora-heading text-lg font-semibold text-[#14181F]">
          Filters
        </h2>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-semibold text-[#B8791A] transition hover:text-[#14181F]"
        >
          Clear all
        </button>
      </div>

      {/* Category */}
      <div className="border-b border-[#E5E7EB] py-5">
        <h3 className="mb-4 text-sm font-semibold text-[#14181F]">
          Category
        </h3>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className={inputClass}
        >
          <option value="">All categories</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div className="border-b border-[#E5E7EB] py-5">
        <h3 className="mb-4 text-sm font-semibold text-[#14181F]">
          Price range
        </h3>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="mb-1 block text-xs text-[#6B7280]">
              Min price
            </label>

            <input
              type="number"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              placeholder="0"
              className={inputClass}
            />
          </div>

          <div>
            <label className="mb-1 block text-xs text-[#6B7280]">
              Max price
            </label>

            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              placeholder="2000"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Brand */}
      <div className="py-5">
        <h3 className="mb-4 text-sm font-semibold text-[#14181F]">Brand</h3>

        <div className="space-y-3">
          {brands.map((brand) => (
            <label
              key={brand}
              className="flex cursor-pointer items-center gap-3 text-sm text-[#6B7280]"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
                className="h-4 w-4 rounded border-[#D1D5DB] accent-[#FFB020]"
              />

              <span>{brand}</span>
            </label>
          ))}
        </div>
      </div>
    </aside>
  );
}