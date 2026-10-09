import React, { useEffect, useRef, useState } from "react";
import {
  Menu,
  Search,
  Bell,
  User,
  ChevronDown,
  UserCircle,
  Settings,
  LogOut,
  ShieldCheck,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

export default function AdminHeader({ onMenuClick }) {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const profileRef = useRef(null);

  // -----------------------------------------
  // CLOSE DROPDOWN WHEN CLICKING OUTSIDE
  // -----------------------------------------

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  // -----------------------------------------
  // HANDLE LOGOUT
  // -----------------------------------------

  const handleLogout = () => {
    setIsProfileOpen(false);

    // Later we will connect this with AuthContext/backend
    console.log("Admin logout");

    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white">
      <div className="flex h-20 items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">

        {/* =========================================
            LEFT SIDE
        ========================================= */}

        <div className="flex min-w-0 items-center gap-3">

          {/* Mobile Menu */}
          <button
            type="button"
            onClick={onMenuClick}
            className="rounded-xl p-2 text-[#374151] transition hover:bg-[#F3F4F6] lg:hidden"
            aria-label="Open admin sidebar"
          >
            <Menu size={22} />
          </button>

          {/* Page Title */}
          <div className="hidden sm:block">
            <p className="text-xs font-medium text-[#9CA3AF]">
              Voltora Admin
            </p>

            <h2 className="text-lg font-bold text-[#0A0E14]">
              Dashboard
            </h2>
          </div>
        </div>

        {/* =========================================
            RIGHT SIDE
        ========================================= */}

        <div className="flex items-center gap-3">

          {/* =====================================
              SEARCH
          ===================================== */}

          <div className="relative hidden md:block">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />

            <input
              type="text"
              placeholder="Search..."
              className="h-11 w-64 rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] pl-10 pr-4 text-sm text-[#0A0E14] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20 lg:w-72"
            />
          </div>

          {/* =====================================
              NOTIFICATIONS
          ===================================== */}

          <button
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white text-[#374151] transition hover:bg-[#F7F7F5]"
            aria-label="Notifications"
          >
            <Bell size={19} />

            {/* Notification dot */}
            <span className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full border-2 border-white bg-[#FFB020]" />
          </button>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-[#E5E7EB] sm:block" />

          {/* =====================================
              ADMIN PROFILE
          ===================================== */}

          <div
            ref={profileRef}
            className="relative"
          >
            {/* Profile Button */}

            <button
              type="button"
              onClick={() =>
                setIsProfileOpen((current) => !current)
              }
              className={`flex items-center gap-2.5 rounded-xl p-1.5 transition ${
                isProfileOpen
                  ? "bg-[#F7F7F5]"
                  : "hover:bg-[#F7F7F5]"
              }`}
              aria-expanded={isProfileOpen}
              aria-haspopup="menu"
            >
              {/* Avatar */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A0E14] text-[#FFB020]">
                <User size={18} />
              </div>

              {/* Admin Information */}
              <div className="hidden text-left sm:block">
                <p className="text-sm font-semibold text-[#0A0E14]">
                  Admin
                </p>

                <p className="text-xs text-[#9CA3AF]">
                  Administrator
                </p>
              </div>

              {/* Chevron */}
              <ChevronDown
                size={17}
                className={`hidden text-[#6B7280] transition-transform sm:block ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {/* =====================================
                ADMIN DROPDOWN
            ===================================== */}

            {isProfileOpen && (
              <div
                className="absolute right-0 top-full z-50 mt-3 w-72 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-lg"
                role="menu"
              >
                {/* Dropdown Header */}

                <div className="border-b border-[#E5E7EB] bg-[#FAFAF8] px-4 py-4">
                  <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#0A0E14] text-[#FFB020]">
                      <User size={19} />
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-[#0A0E14]">
                        Admin
                      </p>

                      <p className="truncate text-xs text-[#6B7280]">
                        admin@voltora.com
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dropdown Items */}

                <div className="p-2">

                  {/* Profile */}

                  <Link
                    to="/admin/profile"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#374151] transition hover:bg-[#F7F7F5] hover:text-[#0A0E14]"
                    role="menuitem"
                  >
                    <UserCircle
                      size={18}
                      className="text-[#6B7280]"
                    />

                    <div>
                      <p className="font-medium">
                        My Profile
                      </p>

                      <p className="text-xs text-[#9CA3AF]">
                        View your admin profile
                      </p>
                    </div>
                  </Link>

                  {/* Settings */}

                  <Link
                    to="/admin/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#374151] transition hover:bg-[#F7F7F5] hover:text-[#0A0E14]"
                    role="menuitem"
                  >
                    <Settings
                      size={18}
                      className="text-[#6B7280]"
                    />

                    <div>
                      <p className="font-medium">
                        Settings
                      </p>

                      <p className="text-xs text-[#9CA3AF]">
                        Manage store settings
                      </p>
                    </div>
                  </Link>

                  {/* Security */}

                  <Link
                    to="/admin/settings"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm text-[#374151] transition hover:bg-[#F7F7F5] hover:text-[#0A0E14]"
                    role="menuitem"
                  >
                    <ShieldCheck
                      size={18}
                      className="text-[#6B7280]"
                    />

                    <div>
                      <p className="font-medium">
                        Security
                      </p>

                      <p className="text-xs text-[#9CA3AF]">
                        Account & security
                      </p>
                    </div>
                  </Link>
                </div>

                {/* Logout */}

                <div className="border-t border-[#E5E7EB] p-2">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-red-600 transition hover:bg-red-50"
                    role="menuitem"
                  >
                    <LogOut size={18} />

                    <span>
                      Logout
                    </span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}