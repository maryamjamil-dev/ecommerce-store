import React from "react";
import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ items = [] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="voltora-body border-b border-[#E5E7EB] bg-[#FAFAF8]"
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm">
          {/* Home */}
          <li className="flex items-center">
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 text-[#6B7280] transition hover:text-[#14181F]"
            >
              <Home size={16} />
              <span>Home</span>
            </Link>
          </li>

          {/* Other Items */}
          {items.map((item, index) => {
            const isLast = index === items.length - 1;

            return (
              <React.Fragment key={`${item.label}-${index}`}>
                <li className="text-[#D1D5DB]">
                  <ChevronRight size={16} />
                </li>

                <li>
                  {isLast ? (
                    <span className="font-semibold text-[#14181F]">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      to={item.path}
                      className="text-[#6B7280] transition hover:text-[#14181F]"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}