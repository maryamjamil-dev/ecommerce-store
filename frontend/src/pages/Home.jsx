import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Gamepad2,
  Laptop,
  Play,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Watch,
  Star,
  Truck,
  BadgeCheck,
  Headphones,
  RefreshCw,
  Zap,
} from "lucide-react";

import { Link } from "react-router-dom";
import Header from "../components/Header"
import Footer from "../components/Footer"

import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

import products from "../data/products";
import heroImage1 from "../assets/images/banners/hero-electronics.png";
import heroImage2 from "../assets/images/banners/hero-electronics-2.png";
import heroImage3 from "../assets/images/banners/hero-electronics-3.png";

import Newletter from "../components/Newletter"
// Categories Data
const categories = [
  {
    title: "Smartphones",
    description: "Latest smartphones and mobile devices.",
    icon: Smartphone,
  },
  {
    title: "Laptops",
    description: "Powerful laptops for work and entertainment.",
    icon: Laptop,
  },
  {
    title: "Headphones",
    description: "Premium audio for music and calls.",
    icon: Headphones,
  },
  {
    title: "Smart Watches",
    description: "Smart watches for your connected lifestyle.",
    icon: Watch,
  },
  {
    title: "Cameras",
    description: "Capture every moment with modern cameras.",
    icon: Camera,
  },
  {
    title: "Gaming",
    description: "Gaming devices and accessories for everyone.",
    icon: Gamepad2,
  },
];

// Hero Slider Data - max 3 slides
const heroSlides = [
  {
    image: heroImage1,
    badge: "New Technology. Better Everyday.",
    heading: "Upgrade Your",
    highlight: "Everyday Tech",
    description:
      "Discover modern electronics, powerful devices, and smart technology designed to make your everyday life easier, faster, and better.",
  },
  {
    image: heroImage2,
    badge: "Limited Time Offer",
    heading: "Save Big On",
    highlight: "Top Gadgets",
    description:
      "Grab the latest smartphones, laptops, and audio gear at unbeatable prices before the deal runs out.",
  },
  {
    image: heroImage3,
    badge: "Just Arrived",
    heading: "Explore The",
    highlight: "Newest Arrivals",
    description:
      "Check out our freshest collection of electronics, built for performance, style, and everyday convenience.",
  },
];

const defaultReviews = [
  {
    id: 1,
    name: "Ahmed Hassan",
    initials: "AH",
    rating: 5,
    comment:
      "The headphones I ordered arrived quickly and the quality was exactly what I expected. The whole shopping experience was smooth.",
  },
  {
    id: 2,
    name: "Sarah Malik",
    initials: "SM",
    rating: 5,
    comment:
      "I found exactly what I needed at a great price. The product information was clear and the checkout process was very easy.",
  },
  {
    id: 3,
    name: "Usman Ali",
    initials: "UA",
    rating: 4,
    comment:
      "Voltora has a really clean selection of electronics. My new smartwatch looks great and works perfectly so far.",
  },
];


export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [visibleReviews, setVisibleReviews] = useState(3);
const [reviews, setReviews] = useState(() => {
  try {
    const savedReviews = localStorage.getItem("voltora-reviews");

    return savedReviews
      ? JSON.parse(savedReviews)
      : defaultReviews;
  } catch (error) {
    console.error("Failed to load reviews:", error);
    return defaultReviews;
  }
});

const [reviewName, setReviewName] = useState("");
const [reviewRating, setReviewRating] = useState(5);
const [reviewComment, setReviewComment] = useState("");

const [reviewError, setReviewError] = useState("");
const [reviewSuccess, setReviewSuccess] = useState("");

useEffect(() => {
  localStorage.setItem(
    "voltora-reviews",
    JSON.stringify(reviews)
  );
}, [reviews]);

const handleReviewSubmit = (e) => {
  e.preventDefault();

  setReviewError("");
  setReviewSuccess("");

  const name = reviewName.trim();
  const comment = reviewComment.trim();

  if (!name) {
    setReviewError("Please enter your name.");
    return;
  }

  if (name.length < 2) {
    setReviewError("Name must contain at least 2 characters.");
    return;
  }

  if (!comment) {
    setReviewError("Please write your review.");
    return;
  }

  if (comment.length < 10) {
    setReviewError(
      "Your review must contain at least 10 characters."
    );
    return;
  }

  const newReview = {
    id: Date.now(),
    name,
    initials: name
      .split(/\s+/)
      .map((word) => word.charAt(0))
      .join("")
      .slice(0, 2)
      .toUpperCase(),
    rating: reviewRating,
    comment,
  };

  setReviews((previousReviews) => [
    newReview,
    ...previousReviews,
  ]);

  setReviewName("");
  setReviewRating(5);
  setReviewComment("");

  setReviewSuccess(
    "Thank you! Your review has been added successfully."
  );

  setTimeout(() => {
    setReviewSuccess("");
  }, 3000);
};


  // Auto-advance the slider every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);

  const goToPrev = () =>
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);

  const goToNext = () =>
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);

  const slide = heroSlides[currentSlide];

  return (
    <>
    <Header/>
   
    <main className="voltora-body bg-white">
      {/* Fonts, shared with the rest of the Voltora account/checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* ==================== HERO SECTION (IMAGE SLIDER) ==================== */}
      <section className="relative overflow-hidden">
        {/* Background Image Slides */}
        {heroSlides.map((s, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <img
              src={s.image}
              alt={s.heading}
              className="h-full w-full object-cover"
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-[#0A0E14]/75" />
          </div>
        ))}

        {/* Hero Content */}
        <div className="relative mx-auto flex min-h-[600px] max-w-5xl flex-col items-center justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
          {/* Badge */}
          <span className="inline-flex items-center rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
            {slide.badge}
          </span>

          {/* Heading */}
          <h1 className="voltora-heading mt-6 text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            {slide.heading}
            <span className="block text-[#FFB020]">{slide.highlight}</span>
          </h1>

          {/* Description */}
          <p className="mt-6 max-w-lg text-base leading-7 text-white/70 sm:text-lg">
            {slide.description}
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB020] px-6 py-3.5 text-sm font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
            >
              Shop now
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/categories"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
            >
              <Play size={16} />
              Explore categories
            </Link>
          </div>

          {/* Trust Points */}
          <div className="mt-10 flex flex-wrap justify-center gap-x-8 gap-y-4 border-t border-white/15 pt-6">
            <div>
              <p className="voltora-heading text-xl font-semibold text-[#FFB020]">
                100+
              </p>
              <p className="mt-1 text-xs text-white/60">Products</p>
            </div>

            <div>
              <p className="voltora-heading text-xl font-semibold text-[#FFB020]">
                24/7
              </p>
              <p className="mt-1 text-xs text-white/60">Support</p>
            </div>

            <div>
              <p className="voltora-heading text-xl font-semibold text-[#FFB020]">
                Secure
              </p>
              <p className="mt-1 text-xs text-white/60">Shopping</p>
            </div>
          </div>
        </div>

        {/* Prev / Next Arrows */}
        <button
          type="button"
          onClick={goToPrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur transition hover:bg-white/25 sm:left-6"
        >
          <ChevronLeft size={22} />
        </button>

        <button
          type="button"
          onClick={goToNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white backdrop-blur transition hover:bg-white/25 sm:right-6"
        >
          <ChevronRight size={22} />
        </button>

        {/* Dot Indicators */}
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              className={`h-2 rounded-full transition-all ${
                index === currentSlide
                  ? "w-8 bg-[#FFB020]"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
            />
          ))}
        </div>
      </section>

      {/* ==================== TRUST BAR ==================== */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-6 sm:px-6 lg:grid-cols-4 lg:px-8">
          <div className="flex items-center gap-3">
            <Truck size={20} className="shrink-0 text-[#B8791A]" />
            <div>
              <p className="text-sm font-semibold text-[#14181F]">
                Free shipping
              </p>
              <p className="text-xs text-[#6B7280]">On orders over $50</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="shrink-0 text-[#B8791A]" />
            <div>
              <p className="text-sm font-semibold text-[#14181F]">
                2-year warranty
              </p>
              <p className="text-xs text-[#6B7280]">On all gear</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <RotateCcw size={20} className="shrink-0 text-[#B8791A]" />
            <div>
              <p className="text-sm font-semibold text-[#14181F]">
                30-day returns
              </p>
              <p className="text-xs text-[#6B7280]">No questions asked</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Headphones size={20} className="shrink-0 text-[#B8791A]" />
            <div>
              <p className="text-sm font-semibold text-[#14181F]">
                Real support
              </p>
              <p className="text-xs text-[#6B7280]">Here when you need it</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== CATEGORIES SECTION ==================== */}
      <section className="border-t border-[#E5E7EB] bg-[#FAFAF8]">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-[#B8791A]">
                Shop by category
              </p>

              <h2 className="voltora-heading mt-2 text-3xl font-semibold text-[#14181F] sm:text-4xl">
                Find your perfect tech
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base">
                Explore our collection of modern electronics and find the
                technology that fits your everyday needs.
              </p>
            </div>

            <Link
              to="/categories"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#14181F] transition hover:text-[#B8791A]"
            >
              View all categories
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Category Cards */}
          <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard
                key={category.title}
                icon={category.icon}
                title={category.title}
                description={category.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DEAL BANNER ==================== */}
      <section className="bg-[#FFB020]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-6 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <div>
            <p className="voltora-heading text-xl font-semibold text-[#0A0E14] sm:text-2xl">
              Deal of the day — up to 30% off audio gear
            </p>
            <p className="mt-1 text-sm text-[#0A0E14]/70">
              Today only. While stock lasts.
            </p>
          </div>

          <Link
            to="/shop"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
          >
            Shop the deal
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ==================== FEATURED PRODUCTS ==================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-medium text-[#B8791A]">
                Featured products
              </p>

              <h2 className="voltora-heading mt-2 text-3xl font-semibold text-[#14181F] sm:text-4xl">
                Popular tech picks
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base">
                Explore some of our most popular electronics and upgrade
                your everyday technology.
              </p>
            </div>

            <Link
              to="/shop"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#14181F] transition hover:text-[#B8791A]"
            >
              View all products
              <ArrowRight size={16} />
            </Link>
          </div>

          {/* Product Cards */}
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {products.slice(0, 5).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
{/* ==================== NEW ARRIVALS ==================== */}
<section className="border-t border-[#E5E7EB] bg-[#FAFAF8]">
  <div className="mx-auto max-w-[1500px] px-4 py-16 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-medium text-[#B8791A]">
          New arrivals
        </p>

        <h2 className="voltora-heading mt-2 text-3xl font-semibold text-[#14181F] sm:text-4xl">
          Fresh tech, just added
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base">
          Discover the latest additions to our electronics collection,
          selected for modern performance, design, and everyday use.
        </p>
      </div>

      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#14181F] transition hover:text-[#B8791A]"
      >
        View all products
        <ArrowRight size={16} />
      </Link>
    </div>

    {/* New Arrival Products */}
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {products.slice(5, 10).map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>

  </div>
</section>
{/* ==================== WHY CHOOSE VOLTORA ==================== */}
<section className="border-t border-[#E5E7EB] bg-white">
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium text-[#B8791A]">
        Why choose Voltora
      </p>

      <h2 className="voltora-heading mt-2 text-3xl font-semibold text-[#14181F] sm:text-4xl">
        Shopping made simple
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#6B7280] sm:text-base">
        We focus on making every part of your electronics shopping
        experience simple, reliable, and convenient.
      </p>
    </div>

    {/* Features */}
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

      {/* Feature 1 */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-6 transition hover:-translate-y-1 hover:border-[#FFB020]">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A]">
          <BadgeCheck size={24} />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-[#14181F]">
          Quality Products
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          Explore carefully selected electronics designed for everyday
          performance and reliability.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-6 transition hover:-translate-y-1 hover:border-[#FFB020]">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A]">
          <Truck size={24} />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-[#14181F]">
          Fast Delivery
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          Get your favorite tech delivered conveniently with a simple
          and straightforward ordering experience.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-6 transition hover:-translate-y-1 hover:border-[#FFB020]">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A]">
          <RefreshCw size={24} />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-[#14181F]">
          Easy Returns
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          A clear return process gives you more confidence when
          choosing your next electronic device.
        </p>
      </div>

      {/* Feature 4 */}
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-6 transition hover:-translate-y-1 hover:border-[#FFB020]">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A]">
          <Headphones size={24} />
        </div>

        <h3 className="mt-5 text-lg font-semibold text-[#14181F]">
          Helpful Support
        </h3>

        <p className="mt-2 text-sm leading-6 text-[#6B7280]">
          Have a question? Our support experience is designed to help
          you find the information you need.
        </p>
      </div>

    </div>
  </div>
</section>

{/* ==================== PROMOTIONAL BANNER ==================== */}
<section className="bg-[#0A0E14]">
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
    <div className="relative overflow-hidden rounded-3xl bg-[#171d29]">

      {/* Decorative Elements */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#FFB020]/10 blur-3xl" />
      <div className="absolute -bottom-24 left-1/3 h-72 w-72 rounded-full bg-[#FFB020]/10 blur-3xl" />

      <div className="relative grid items-center gap-10 px-6 py-12 sm:px-10 lg:grid-cols-2 lg:px-14 lg:py-16">

        {/* Content */}
        <div>
          <span className="inline-flex rounded-full bg-[#FFB020]/10 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#FFB020]">
            Upgrade your setup
          </span>

          <h2 className="voltora-heading mt-5 max-w-xl text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
            Better technology.
            <span className="block text-[#FFB020]">
              Better everyday.
            </span>
          </h2>

          <p className="mt-5 max-w-lg text-sm leading-7 text-white/60 sm:text-base">
            From powerful laptops and smartphones to immersive audio and
            smart devices, discover technology built around the way you live.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#FFB020] px-6 py-3.5 text-sm font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
            >
              Shop electronics
              <ArrowRight size={17} />
            </Link>

            <Link
              to="/categories"
              className="inline-flex items-center justify-center rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/30 hover:bg-white/5"
            >
              Explore categories
            </Link>
          </div>
        </div>

        {/* Visual Product Blocks */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">

          <div className="grid grid-cols-2 gap-4">

            {/* Card 1 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFB020] text-[#0A0E14]">
                <Smartphone size={24} />
              </div>

              <p className="mt-5 text-sm font-semibold text-white">
                Smart Devices
              </p>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Stay connected everywhere.
              </p>
            </div>

            {/* Card 2 */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFB020] text-[#0A0E14]">
                <Laptop size={24} />
              </div>

              <p className="mt-5 text-sm font-semibold text-white">
                Powerful Computing
              </p>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Work, create, and perform.
              </p>
            </div>

            {/* Card 3 */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFB020] text-[#0A0E14]">
                <Headphones size={24} />
              </div>

              <p className="mt-5 text-sm font-semibold text-white">
                Immersive Audio
              </p>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Sound that fits your lifestyle.
              </p>
            </div>

            {/* Card 4 */}
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FFB020] text-[#0A0E14]">
                <Watch size={24} />
              </div>

              <p className="mt-5 text-sm font-semibold text-white">
                Smart Wearables
              </p>

              <p className="mt-1 text-xs leading-5 text-white/50">
                Technology on the move.
              </p>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</section>

{/* ==================== TOP BRANDS ==================== */}
<section className="border-t border-[#E5E7EB] bg-[#FAFAF8]">
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="text-sm font-medium text-[#B8791A]">
          Trusted brands
        </p>

        <h2 className="voltora-heading mt-2 text-3xl font-semibold text-[#14181F] sm:text-4xl">
          Shop your favorite brands
        </h2>

        <p className="mt-3 max-w-xl text-sm leading-6 text-[#6B7280] sm:text-base">
          Explore electronics from some of the most recognized brands
          across our product collection.
        </p>
      </div>

      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-sm font-semibold text-[#14181F] transition hover:text-[#B8791A]"
      >
        Browse all products
        <ArrowRight size={16} />
      </Link>
    </div>

    {/* Brand Cards */}
    <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      {[
        "Sony",
        "Samsung",
        "Apple",
        "Canon",
        "Dell",
        "HP",
        "Lenovo",
        "JBL",
        "LG",
        "Panasonic",
        "Philips",
        "Microsoft",
      ].map((brand) => (
        <Link
          key={brand}
          to={`/shop?brand=${encodeURIComponent(brand)}`}
          className="group flex min-h-[100px] items-center justify-center rounded-2xl border border-[#E5E7EB] bg-white px-4 py-6 text-center transition duration-300 hover:-translate-y-1 hover:border-[#FFB020] hover:shadow-sm"
        >
          <span className="text-base font-semibold text-[#14181F] transition group-hover:text-[#B8791A] sm:text-lg">
            {brand}
          </span>
        </Link>
      ))}
    </div>

  </div>
</section>

{/* ==================== CUSTOMER REVIEWS ==================== */}
<section className="border-t border-[#E5E7EB] bg-white">
  <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">

    {/* Section Header */}
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-medium text-[#B8791A]">
        Customer reviews
      </p>

      <h2 className="voltora-heading mt-2 text-3xl font-semibold text-[#14181F] sm:text-4xl">
        What our customers say
      </h2>

      <p className="mt-3 text-sm leading-6 text-[#6B7280] sm:text-base">
        Real feedback from customers who shop with Voltora.
      </p>
    </div>

    {/* Reviews Grid */}
    {reviews.length > 0 && (
      <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {reviews.slice(0, visibleReviews).map((review) => (
          <div
            key={review.id}
            className="group rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-6 transition duration-300 hover:-translate-y-1 hover:border-[#FFB020] hover:shadow-md"
          >
            {/* Stars */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={17}
                  className={
                    star <= review.rating
                      ? "text-[#FFB020]"
                      : "text-[#D1D5DB]"
                  }
                  fill={
                    star <= review.rating
                      ? "currentColor"
                      : "none"
                  }
                />
              ))}
            </div>

            {/* Review Text */}
            <p className="mt-5 min-h-[96px] text-sm leading-7 text-[#6B7280]">
              "{review.comment}"
            </p>

            {/* Customer */}
            <div className="mt-6 flex items-center gap-3 border-t border-[#E5E7EB] pt-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#FFF6E7] text-sm font-bold text-[#B8791A]">
                {review.initials}
              </div>

              <div>
                <p className="text-sm font-semibold text-[#14181F]">
                  {review.name}
                </p>

                <div className="mt-1 flex items-center gap-1">
                  <BadgeCheck
                    size={13}
                    className="text-[#B8791A]"
                  />

                  <span className="text-xs text-[#9CA3AF]">
                    Verified Customer
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
{/* Load More Reviews */}
{reviews.length > visibleReviews && (
  <div className="mt-8 flex justify-center">
    <button
      type="button"
      onClick={() => setVisibleReviews((prev) => prev + 3)}
      className="rounded-lg border border-[#0A0E14] bg-white px-6 py-3 text-sm font-semibold text-[#0A0E14] transition hover:bg-[#0A0E14] hover:text-[#FFB020]"
    >
      More Reviews
    </button>
  </div>
)}
    {/* Add Review */}
    <div className="mx-auto mt-14 max-w-3xl">
      <div className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-6 sm:p-8">

        {/* Form Header */}
        <div className="mb-7">
          <p className="text-sm font-medium text-[#B8791A]">
            Share your experience
          </p>

          <h3 className="mt-1 text-2xl font-semibold text-[#14181F]">
            Leave a review
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#6B7280]">
            Your feedback helps other customers make better
            shopping decisions.
          </p>
        </div>

        <form
          onSubmit={handleReviewSubmit}
          className="space-y-6"
        >

          {/* Name */}
          <div>
            <label
              htmlFor="review-name"
              className="mb-2 block text-sm font-medium text-[#14181F]"
            >
              Your name
            </label>

            <input
              id="review-name"
              type="text"
              value={reviewName}
              onChange={(e) => {
                setReviewName(e.target.value);
                setReviewError("");
              }}
              placeholder="Enter your name"
              className="h-12 w-full rounded-lg border border-[#D1D5DB] bg-white px-4 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/25"
            />
          </div>

          {/* Rating */}
          <div>
            <label className="mb-3 block text-sm font-medium text-[#14181F]">
              Your rating
            </label>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => {
                    setReviewRating(star);
                    setReviewError("");
                  }}
                  aria-label={`Give ${star} star rating`}
                  className="rounded-md p-1 transition hover:scale-110"
                >
                  <Star
                    size={28}
                    className={
                      star <= reviewRating
                        ? "text-[#FFB020]"
                        : "text-[#D1D5DB]"
                    }
                    fill={
                      star <= reviewRating
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              ))}

              <span className="ml-2 text-sm font-medium text-[#6B7280]">
                {reviewRating}/5
              </span>
            </div>
          </div>

          {/* Comment */}
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label
                htmlFor="review-comment"
                className="text-sm font-medium text-[#14181F]"
              >
                Your review
              </label>

              <span className="text-xs text-[#9CA3AF]">
                {reviewComment.length}/500
              </span>
            </div>

            <textarea
              id="review-comment"
              value={reviewComment}
              onChange={(e) => {
                if (e.target.value.length <= 500) {
                  setReviewComment(e.target.value);
                  setReviewError("");
                }
              }}
              placeholder="Tell us about your shopping experience..."
              rows={5}
              className="w-full resize-none rounded-lg border border-[#D1D5DB] bg-white px-4 py-3 text-sm leading-6 text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/25"
            />
          </div>

          {/* Error */}
          {reviewError && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {reviewError}
            </div>
          )}

          {/* Success */}
          {reviewSuccess && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {reviewSuccess}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#0A0E14] px-6 text-sm font-semibold text-[#FFB020] transition hover:bg-[#171d29] sm:w-auto"
          >
            Submit Review
          </button>

        </form>
      </div>
    </div>

    {/* Rating Summary */}
    <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">

      <div className="flex items-center gap-2">
        <span className="text-2xl font-semibold text-[#14181F]">
          4.8
        </span>

        <div className="flex items-center gap-1 text-[#FFB020]">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={17}
              fill="currentColor"
            />
          ))}
        </div>
      </div>

      <span className="hidden text-[#D1D5DB] sm:block">
        |
      </span>

      <p className="text-sm text-[#6B7280]">
        Based on customer product reviews
      </p>

    </div>

  </div>
</section>

{/* ==================== FINAL CTA ==================== */}
<section className="py-20 bg-[#FAFAF8]">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative overflow-hidden rounded-3xl bg-[#0A0E14] px-6 py-14 sm:px-10 lg:px-16">

      {/* Decorative Elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-[#FFB020]/10 blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 rounded-full bg-[#FFB020]/10 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">

        {/* CTA Content */}
        <div>
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFB020]/10 text-[#FFB020] text-sm font-semibold mb-5">
            <Zap size={16} />
            Upgrade Your Everyday Tech
          </span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Ready to Upgrade
            <span className="block text-[#FFB020]">
              Your Tech?
            </span>
          </h2>

          <p className="mt-5 max-w-xl text-gray-400 text-base sm:text-lg leading-relaxed">
            Discover reliable electronics, modern gadgets, and everyday
            technology designed to make your life easier.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">

            <Link
              to="/shop"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#FFB020] text-[#0A0E14] font-semibold hover:bg-[#e6a01c] transition-all duration-300"
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/categories"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl border border-gray-700 text-white font-semibold hover:bg-[#171d29] transition-all duration-300"
            >
              Explore Categories
            </Link>

          </div>
        </div>

        {/* CTA Features */}
        <div className="grid grid-cols-2 gap-4">

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <Truck className="text-[#FFB020] mb-4" size={28} />

            <h3 className="text-white font-semibold">
              Fast Delivery
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Get your favorite tech delivered quickly.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <ShieldCheck className="text-[#FFB020] mb-4" size={28} />

            <h3 className="text-white font-semibold">
              Quality Products
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Shop reliable products from trusted brands.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <RefreshCw className="text-[#FFB020] mb-4" size={28} />

            <h3 className="text-white font-semibold">
              Easy Returns
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              Simple and convenient return experience.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <Headphones className="text-[#FFB020] mb-4" size={28} />

            <h3 className="text-white font-semibold">
              Helpful Support
            </h3>

            <p className="mt-2 text-sm text-gray-400">
              We're here when you need assistance.
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</section>




      <Newletter/>

    </main>
    <Footer/>
     </>
  );
}