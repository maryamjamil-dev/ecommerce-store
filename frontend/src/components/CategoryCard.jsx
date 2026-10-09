import React from "react";
import { Link } from "react-router-dom";

export default function CategoryCard({ icon: Icon, title, description, slug }) {
  return (
    <Link
      to={`/categories/${slug}`}
      className="voltora-body group block rounded-xl border border-[#E5E7EB] bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#FFB020]/50 hover:shadow-lg"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A] transition-all duration-300 group-hover:bg-[#0A0E14] group-hover:text-[#FFB020]">
        <Icon size={26} strokeWidth={1.8} />
      </div>

      <h3 className="voltora-heading mt-5 text-lg font-semibold text-[#14181F]">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#6B7280]">{description}</p>

      <div className="mt-5 h-1 w-8 rounded-full bg-[#FFB020] transition-all duration-300 group-hover:w-16" />
    </Link>
  );
}