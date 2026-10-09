import React from "react";
import { Link } from "react-router-dom";
import {
  User,
  Mail,
  Package,
  MapPin,
  Heart,
  LogOut,
  ChevronRight,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Account() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return (
      <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-16">
        <div className="mx-auto max-w-lg rounded-2xl border border-[#E5E7EB] bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7] text-[#FFB020]">
            <User size={28} />
          </div>

          <h1 className="text-2xl font-bold text-[#14181F]">
            Please sign in
          </h1>

          <p className="mt-2 text-sm text-[#6B7280]">
            Sign in to view and manage your Voltora account.
          </p>

          <Link
            to="/login"
            className="mt-6 inline-flex rounded-lg bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
          >
            Sign in
          </Link>
        </div>
      </main>
    );
  }

  const accountLinks = [
    {
      title: "My Orders",
      description: "View your recent orders",
      icon: Package,
      path: "/orders",
    },
    {
      title: "Wishlist",
      description: "View your saved products",
      icon: Heart,
      path: "/wishlist",
    },
    {
      title: "Addresses",
      description: "Manage your delivery addresses",
      icon: MapPin,
      path: "/addresses",
    },
  ];

  return (
    <main className="min-h-[70vh] bg-[#FAFAF8] px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold text-[#B8791A]">
            My Account
          </p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-[#14181F]">
            Welcome, {user.name}
          </h1>

          <p className="mt-2 text-sm text-[#6B7280]">
            Manage your account, orders, wishlist, and addresses.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Profile Card */}
          <aside className="h-fit rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0A0E14] text-[#FFB020]">
                <User size={34} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-[#14181F]">
                {user.name}
              </h2>

              <div className="mt-2 flex items-center gap-2 text-sm text-[#6B7280]">
                <Mail size={15} />
                <span className="break-all">{user.email}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] px-4 py-3 text-sm font-semibold text-[#14181F] transition hover:border-[#FFB020] hover:bg-[#FFF6E7]"
            >
              <LogOut size={17} />
              Logout
            </button>
          </aside>

          {/* Account Options */}
          <section className="space-y-4">
            {accountLinks.map((item) => {
              const Icon = item.icon;

              return (
                <Link
                  key={item.title}
                  to={item.path}
                  className="group flex items-center gap-4 rounded-2xl border border-[#E5E7EB] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-[#FFB020] hover:shadow-md"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A] transition group-hover:bg-[#FFB020] group-hover:text-[#0A0E14]">
                    <Icon size={22} />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-[#14181F]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#6B7280]">
                      {item.description}
                    </p>
                  </div>

                  <ChevronRight
                    size={20}
                    className="text-[#9CA3AF] transition group-hover:translate-x-1 group-hover:text-[#14181F]"
                  />
                </Link>
              );
            })}
          </section>
        </div>
      </div>
    </main>
  );
}

