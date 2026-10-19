import React, { useEffect, useState } from "react";
import * as LucideIcons from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import CategoryCard from "../components/CategoryCard";

import Footer from "../components/Footer";
import Header from "../components/Header";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const GROUPS = [
  {
    name: "Communication and Computing",
    icon: "Smartphone",
    description: "Phones, laptops, tablets and everyday computing gear.",
    keywords: ["smartphone", "phone", "laptop", "tablet", "desktop", "computer", "calculator"],
  },
  {
    name: "Entertainment and Audio",
    icon: "Tv",
    description: "Screens, speakers, headphones and gaming.",
    keywords: ["television", "tv", "radio", "headphone", "speaker", "bluetooth", "video", "game", "gaming"],
  },
  {
    name: "Photography and Wearables",
    icon: "Camera",
    description: "Capture moments and stay connected on the move.",
    keywords: ["camera", "watch", "wearable"],
  },
  {
    name: "Home and Kitchen Appliances",
    icon: "Refrigerator",
    description: "Smart appliances that make home life easier.",
    keywords: ["microwave", "oven", "refrigerator", "fridge", "conditioner", "kettle", "appliance"],
  },
  {
    name: "Office Equipment",
    icon: "Printer",
    description: "Printers, scanners and tools for work.",
    keywords: ["printer", "scanner", "office"],
  },
];

const OTHER_GROUP = {
  name: "Other",
  icon: "Package",
  description: "More products from our store.",
  keywords: [],
};

// Category ke naam ke hisaab se icon
const ICON_KEYWORDS = [
  ["smartphone", "Smartphone"],
  ["phone", "Smartphone"],
  ["laptop", "Laptop"],
  ["tablet", "Tablet"],
  ["desktop", "Monitor"],
  ["calculator", "Calculator"],
  ["television", "Tv"],
  ["radio", "Radio"],
  ["headphone", "Headphones"],
  ["speaker", "Bluetooth"],
  ["game", "Gamepad2"],
  ["camera", "Camera"],
  ["watch", "Watch"],
  ["microwave", "Microwave"],
  ["refrigerator", "Refrigerator"],
  ["conditioner", "AirVent"],
  ["kettle", "CookingPot"],
  ["printer", "Printer"],
  ["scanner", "ScanLine"],
];

// "Smart Phones" / "smart-phones" / "Smartphones" sab ek jaisa ho jata hai
const clean = (value = "") =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "");

const findGroup = (category) => {
  // 1) database mein group set ho to wohi
  if (category.group) {
    const exact = GROUPS.find(
      (g) => clean(g.name) === clean(category.group)
    );
    return exact || { ...OTHER_GROUP, name: category.group };
  }

  // 2) naam ya slug mein keyword dhoondo
  const text = `${clean(category.name)} ${clean(category.slug)}`;
  const match = GROUPS.find((g) => g.keywords.some((k) => text.includes(k)));

  return match || OTHER_GROUP;
};

const getIcon = (category) => {
  if (LucideIcons[category.icon]) return LucideIcons[category.icon];

  const text = `${clean(category.name)} ${clean(category.slug)}`;
  const found = ICON_KEYWORDS.find(([key]) => text.includes(key));

  return LucideIcons[found?.[1]] || LucideIcons.Package;
};

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`${API_URL}/categories`, {
          credentials: "include",
          signal: controller.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.message || "Failed to load categories");
        }

        setCategories(data.categories || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Failed to load categories");
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    return () => controller.abort();
  }, []);

  // Categories ko groups mein baantna (order: GROUPS, phir extra groups, phir Other)
  const grouped = new Map();

  categories.forEach((category) => {
    const group = findGroup(category);

    if (!grouped.has(group.name)) {
      grouped.set(group.name, { group, items: [] });
    }

    grouped.get(group.name).items.push(category);
  });

  const orderedNames = [
    ...GROUPS.map((g) => g.name),
    ...[...grouped.keys()].filter(
      (name) => !GROUPS.some((g) => g.name === name) && name !== "Other"
    ),
    "Other",
  ];

  const visibleGroups = orderedNames
    .map((name) => grouped.get(name))
    .filter(Boolean);

  const groupId = (name) => `group-${clean(name)}`;

  return (
    <>
      <Header />
      <main className="voltora-body bg-white">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
          .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
          .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
        `}</style>

        {/* Breadcrumb */}
        <Breadcrumb items={[{ label: "Categories" }]} />

        {/* Page Header */}
        <section className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <p className="text-sm font-medium text-[#B8791A]">
              Shop by category
            </p>

            <h1 className="voltora-heading mt-2 text-3xl font-semibold text-[#14181F] sm:text-4xl">
              All categories
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6B7280] sm:text-base">
              Everything we carry, grouped by what it's for — electronics,
              appliances, entertainment gear, and everyday tech.
            </p>

            {/* Quick jump links */}
            {!loading && !error && visibleGroups.length > 1 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {visibleGroups.map(({ group }) => (
                  <a
                    key={group.name}
                    href={`#${groupId(group.name)}`}
                    className="rounded-full border border-[#E5E7EB] bg-white px-4 py-2 text-xs font-semibold text-[#14181F] transition hover:border-[#FFB020] hover:text-[#B8791A]"
                  >
                    {group.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Category Groups */}
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {loading && (
            <p className="py-10 text-center text-sm text-[#6B7280]">
              Loading categories...
            </p>
          )}

          {!loading && error && (
            <p className="py-10 text-center text-sm text-red-600">{error}</p>
          )}

          {!loading && !error && categories.length === 0 && (
            <p className="py-10 text-center text-sm text-[#6B7280]">
              No categories found.
            </p>
          )}

          {!loading && !error && categories.length > 0 && (
            <div className="space-y-8">
              {visibleGroups.map(({ group, items }) => {
                const GroupIcon =
                  LucideIcons[group.icon] || LucideIcons.Package;

                return (
                  <div
                    key={group.name}
                    id={groupId(group.name)}
                    className="scroll-mt-24 rounded-3xl border border-[#E5E7EB] bg-[#FAFAF8] p-5 sm:p-8"
                  >
                    {/* Group Heading */}
                    <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#0A0E14] text-[#FFB020]">
                          <GroupIcon size={24} />
                        </div>

                        <div>
                          <h2 className="voltora-heading text-xl font-semibold text-[#14181F] sm:text-2xl">
                            {group.name}
                          </h2>

                          <p className="mt-1 text-sm text-[#6B7280]">
                            {group.description}
                          </p>
                        </div>
                      </div>

                      <span className="inline-flex w-fit shrink-0 items-center rounded-full bg-[#FFF6E7] px-4 py-1.5 text-xs font-semibold text-[#B8791A]">
                        {items.length}{" "}
                        {items.length === 1 ? "category" : "categories"}
                      </span>
                    </div>

                    <div className="mb-7 h-px bg-gradient-to-r from-[#FFB020] via-[#E5E7EB] to-transparent" />

                    {/* Category Cards */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                      {items.map((category) => (
                        <CategoryCard
                          key={category._id || category.slug}
                          icon={getIcon(category)}
                          title={category.name}
                          description={category.description}
                          slug={category.slug}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}