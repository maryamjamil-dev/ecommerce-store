import React, { useState } from "react";

import {
  Heart,
  ShoppingBag,
  User,
  Menu,
  X,
  Zap,
  ChevronDown,
  ArrowRight,
} from "lucide-react";

import { Link, NavLink } from "react-router-dom";

import categories from "../data/categories";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useAuth } from "../context/AuthContext";
import SearchBar from "../components/SearchBar";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();

  // AuthContext
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Shop", path: "/shop" },
    { name: "Categories", path: "/categories", dropdown: true },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  const categoryGroups = Object.values(
    categories.reduce((groups, category) => {
      if (!groups[category.group]) {
        groups[category.group] = {
          title: category.group,
          items: [],
        };
      }

      groups[category.group].items.push(category);

      return groups;
    }, {})
  );

  // Logout handler
  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="voltora-body sticky top-0 z-50 border-b border-[#E5E7EB] bg-white/95 backdrop-blur-md">
      {/* Fonts, shared with the rest of the Voltora account/checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .voltora-heading {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }

        .voltora-body {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        }
      `}</style>

      {/* Top announcement bar */}
      <div className="bg-[#0A0E14] px-4 py-2 text-center text-xs font-medium text-white">
        Free shipping on orders over $50
      </div>

      {/* Main header */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0A0E14] text-[#FFB020]">
              <Zap
                size={20}
                strokeWidth={2.5}
                fill="currentColor"
              />
            </div>

            <div>
              <span className="voltora-heading block text-xl font-semibold tracking-tight text-[#14181F]">
                Voltora
              </span>

              <span className="hidden text-[10px] font-medium text-[#9CA3AF] sm:block">
                Upgrade everyday
              </span>
            </div>
          </Link>

          {/* Search */}
          <div className="hidden max-w-xl flex-1 md:block">
            <SearchBar />
          </div>

          {/* Desktop actions */}
          <div className="hidden items-center gap-2 md:flex">
            {/* Wishlist */}
            <Link
              to="/wishlist"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#14181F] transition hover:bg-[#F4F4F2]"
              aria-label="Wishlist"
            >
              <Heart size={20} />

              {wishlistCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFB020] px-1 text-[10px] font-bold text-[#0A0E14]">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <Link
              to="/cart"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#14181F] transition hover:bg-[#F4F4F2]"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#FFB020] px-1 text-[10px] font-bold text-[#0A0E14]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* ================= AUTH ================= */}
            {isAuthenticated ? (
              <div className="relative group">
                {/* Account */}
                <Link
                  to="/account"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#14181F] transition hover:bg-[#FFF6E7]"
                >
                  <User size={18} />

                  <span className="max-w-[120px] truncate">
                    {user?.name || "Account"}
                  </span>

                  <ChevronDown
                    size={15}
                    className="transition-transform group-hover:rotate-180"
                  />
                </Link>

                {/* Account dropdown */}
                <div className="invisible absolute right-0 top-full w-48 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-2 shadow-xl">
                    {/* User info */}
                    <div className="border-b border-[#E5E7EB] px-3 py-2.5">
                      <p className="truncate text-sm font-semibold text-[#14181F]">
                        {user?.name || "User"}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-[#9CA3AF]">
                        {user?.email || ""}
                      </p>
                    </div>

                    {/* My Account */}
                    <Link
                      to="/account"
                      className="mt-1 block rounded-lg px-3 py-2.5 text-sm font-medium text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#14181F]"
                    >
                      My Account
                    </Link>

                    {/* Orders */}
                    <Link
                      to="/orders"
                      className="block rounded-lg px-3 py-2.5 text-sm font-medium text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#14181F]"
                    >
                      My Orders
                    </Link>

                    {/* Logout */}
                    <button
                      type="button"
                      onClick={handleLogout}
                      className="mt-1 w-full rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Login */}
                <Link
                  to="/login"
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#14181F] transition hover:bg-[#FFF6E7]"
                >
                  <User size={18} />
                  Login
                </Link>

                {/* Sign Up */}
                <Link
                  to="/register"
                  className="flex items-center justify-center rounded-lg bg-[#0A0E14] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#171d29]"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1 md:hidden">
            {/* Mobile Wishlist */}
            <Link
              to="/wishlist"
              className="relative rounded-lg p-2.5 text-[#14181F] transition hover:bg-[#FFF6E7]"
              aria-label="Wishlist"
            >
              <Heart size={20} />

              {wishlistCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFB020] px-1 text-[9px] font-bold text-[#0A0E14]">
                  {wishlistCount > 99 ? "99+" : wishlistCount}
                </span>
              )}
            </Link>

            {/* Mobile Cart */}
            <Link
              to="/cart"
              className="relative rounded-lg p-2.5 text-[#14181F] transition hover:bg-[#FFF6E7]"
              aria-label="Shopping cart"
            >
              <ShoppingBag size={20} />

              {cartCount > 0 && (
                <span className="absolute right-0 top-0 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FFB020] px-1 text-[9px] font-bold text-[#0A0E14]">
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu */}
            <button
              type="button"
              onClick={() =>
                setIsMobileMenuOpen(!isMobileMenuOpen)
              }
              className="rounded-lg p-2.5 text-[#14181F] transition hover:bg-[#FFF6E7]"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>
        </div>

        {/* Desktop navigation */}
        <nav
          className="relative hidden border-t border-[#E5E7EB] md:block"
          onMouseLeave={() => setShowCategories(false)}
        >
          <div className="flex h-14 items-center gap-8">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.name}
                  onMouseEnter={() => setShowCategories(true)}
                  className="h-full"
                >
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      `flex h-full items-center gap-1 border-b-2 py-4 text-sm font-semibold transition ${
                        isActive || showCategories
                          ? "border-[#FFB020] text-[#14181F]"
                          : "border-transparent text-[#6B7280] hover:text-[#14181F]"
                      }`
                    }
                  >
                    {link.name}

                    <ChevronDown
                      size={15}
                      className={`transition-transform ${
                        showCategories
                          ? "rotate-180"
                          : ""
                      }`}
                    />
                  </NavLink>
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className={({ isActive }) =>
                    `flex items-center gap-1 border-b-2 py-4 text-sm font-semibold transition ${
                      isActive
                        ? "border-[#FFB020] text-[#14181F]"
                        : "border-transparent text-[#6B7280] hover:text-[#14181F]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )
            )}

            {/* Trust message */}
            <div className="ml-auto flex items-center gap-2 text-xs font-semibold text-[#6B7280]">
              <span className="h-2 w-2 rounded-full bg-[#FFB020]" />
              Secure &amp; trusted shopping
            </div>
          </div>

          {/* Categories mega menu */}
          {showCategories && (
            <div
              className="absolute left-0 right-0 top-full z-50 w-full rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-2xl"
              onMouseEnter={() => setShowCategories(true)}
            >
              <div className="flex gap-8">
                {/* Left sidebar */}
                <div className="w-56 shrink-0 border-r border-[#E5E7EB] pr-8">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF6E7] text-2xl">
                    🛒
                  </div>

                  <h4 className="voltora-heading mb-2 text-sm font-semibold text-[#14181F]">
                    Shop by category
                  </h4>

                  <p className="mb-5 text-xs leading-5 text-[#6B7280]">
                    Browse our full range of electronics,
                    appliances, and everyday tech essentials.
                  </p>

                  <Link
                    to="/categories"
                    onClick={() => setShowCategories(false)}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A0E14] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#171d29]"
                  >
                    View all categories
                    <ArrowRight size={14} />
                  </Link>
                </div>

                {/* Category columns */}
                <div className="grid flex-1 grid-cols-5 gap-6">
                  {categoryGroups.map((group) => (
                    <div key={group.title}>
                      <h4 className="mb-3 border-b border-[#FFB020]/40 pb-2 text-xs font-semibold text-[#14181F]">
                        {group.title}
                      </h4>

                      <ul className="space-y-2">
                        {group.items.map((item) => (
                          <li key={item.slug}>
                            <Link
                              to={`/categories/${item.slug}`}
                              onClick={() =>
                                setShowCategories(false)
                              }
                              className="block rounded-md px-1 py-1 text-sm text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#14181F]"
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </nav>

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="border-t border-[#E5E7EB] py-4 md:hidden">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.name}
                  to={link.path}
                  onClick={() =>
                    setIsMobileMenuOpen(false)
                  }
                  className={({ isActive }) =>
                    `rounded-lg px-4 py-3 text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#FFF6E7] text-[#14181F]"
                        : "text-[#6B7280] hover:bg-[#F4F4F2]"
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}

              {/* Mobile Wishlist */}
              <Link
                to="/wishlist"
                onClick={() =>
                  setIsMobileMenuOpen(false)
                }
                className="flex items-center justify-between rounded-lg px-4 py-3 text-sm font-semibold text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#14181F]"
              >
                <span className="flex items-center gap-3">
                  <Heart size={18} />
                  Wishlist
                </span>

                {wishlistCount > 0 && (
                  <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#FFB020] px-1.5 text-xs font-bold text-[#0A0E14]">
                    {wishlistCount > 99
                      ? "99+"
                      : wishlistCount}
                  </span>
                )}
              </Link>

              {/* ================= MOBILE AUTH ================= */}
              {isAuthenticated ? (
                <>
                  {/* Mobile Account */}
                  <Link
                    to="/account"
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#14181F]"
                  >
                    <User size={18} />

                    <span>
                      {user?.name || "My Account"}
                    </span>
                  </Link>

                  {/* Mobile Orders */}
                  <Link
                    to="/orders"
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#14181F]"
                  >
                    <ShoppingBag size={18} />

                    My Orders
                  </Link>

                  {/* Mobile Logout */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <User size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  {/* Mobile Login */}
                  <Link
                    to="/login"
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-semibold text-[#6B7280] transition hover:bg-[#FFF6E7] hover:text-[#14181F]"
                  >
                    <User size={18} />
                    Login
                  </Link>

                  {/* Mobile Sign Up */}
                  <Link
                    to="/register"
                    onClick={() =>
                      setIsMobileMenuOpen(false)
                    }
                    className="mt-1 flex items-center justify-center rounded-lg bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
                  >
                    Sign up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}

