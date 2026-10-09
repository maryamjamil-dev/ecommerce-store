
import React, { useState } from "react";
import { Search, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    const query = searchQuery.trim();

    if (!query) {
      return;
    }

    console.log("Searching for:", query);

    navigate(`/search?search=${encodeURIComponent(query)}`);
  };

  const clearSearch = () => {
    setSearchQuery("");
  };

  return (
    <form
      onSubmit={handleSearch}
      className="voltora-body mx-auto w-full max-w-2xl"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

        .voltora-body {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        }
      `}</style>

      <div className="relative">
        {/* Search Icon */}
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
        />

        {/* Input */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for smartphones, laptops, headphones..."
          className="h-12 w-full rounded-lg border border-[#E5E7EB] bg-white pl-11 pr-12 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/25"
        />

        {/* Clear Button */}
        {searchQuery && (
          <button
            type="button"
            onClick={clearSearch}
            aria-label="Clear search"
            className="absolute right-11 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-md text-[#9CA3AF] transition hover:bg-[#F4F4F2] hover:text-[#14181F]"
          >
            <X size={16} />
          </button>
        )}

        {/* Search Button */}
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-md bg-[#0A0E14] text-[#FFB020] transition hover:bg-[#171d29]"
        >
          <Search size={17} />
        </button>
      </div>
    </form>
  );
}

