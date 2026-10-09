import React from "react";
import { NavLink } from "react-router-dom";

import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Star,
  TicketPercent,
  Settings,
  X,
  Zap,
} from "lucide-react";

const menuItems = [
  {
    name: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    path: "/admin/products",
    icon: Package,
  },
  {
    name: "Categories",
    path: "/admin/categories",
    icon: FolderTree,
  },
  {
    name: "Orders",
    path: "/admin/orders",
    icon: ShoppingCart,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: Users,
  },
  {
    name: "Reviews",
    path: "/admin/reviews",
    icon: Star,
  },
  {
    name: "Coupons",
    path: "/admin/coupons",
    icon: TicketPercent,
  },
  {
    name: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar({
  isOpen,
  onClose,
}) {
  return (
    <>

      {isOpen && (
        <button
          type="button"
          aria-label="Close admin sidebar"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
        />
      )}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50
          flex w-64 flex-col
          border-r border-[#252B34]
          bg-[#0A0E14]
          transition-transform duration-300
          lg:translate-x-0
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-[#252B34] px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFB020] text-[#0A0E14]">
              <Zap
                size={21}
                strokeWidth={2.5}
              />
            </div>

            <div>
              <p className="text-base font-bold text-white">
                Voltora
              </p>

              <p className="text-xs text-[#9CA3AF]">
                Admin Panel
              </p>
            </div>
          </div>

          {/* Mobile Close */}
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-[#9CA3AF] transition hover:bg-[#1B222C] hover:text-white lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>


        <nav className="flex-1 overflow-y-auto px-3 py-5">
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#6B7280]">
            Main Menu
          </p>

          <div className="space-y-1">
            {menuItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === "/admin"}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `
                    flex items-center gap-3
                    rounded-xl px-3 py-3
                    text-sm font-medium
                    transition
                    ${
                      isActive
                        ? "bg-[#FFB020] text-[#0A0E14]"
                        : "text-[#B8BEC8] hover:bg-[#171D25] hover:text-white"
                    }
                    `
                  }
                >
                  <Icon
                    size={19}
                    strokeWidth={2}
                  />

                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </nav>


        <div className="shrink-0 border-t border-[#252B34] p-4">
          <div className="rounded-xl border border-[#2A3039] bg-[#151A21] p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB020] font-bold text-[#0A0E14]">
                A
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-semibold text-white">
                  Admin
                </p>

                <p className="truncate text-xs text-[#8D95A2]">
                  Administrator
                </p>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-[#9CA3AF]">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />

              <span>System Online</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

