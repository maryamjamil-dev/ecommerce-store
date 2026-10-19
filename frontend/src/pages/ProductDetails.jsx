import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Minus,
  Plus,
  PackageCheck,
} from "lucide-react";

import { useCart } from "../context/CartContext";
import WishlistButton from "../components/WishlistButton";
import Rating from "../components/Rating";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProduct() {
      try {
        setLoading(true);
        setError("");
        setProduct(null);

        const response = await fetch(
          `${API_URL}/products/${encodeURIComponent(id)}`,
          { signal: controller.signal }
        );

        if (response.status === 404) {
          throw new Error("Product not found.");
        }

        if (!response.ok) {
          throw new Error("Unable to load product. Please try again.");
        }

        const data = await response.json();

        const item = data.product ?? data.data ?? data;

        if (!item || typeof item !== "object" || !item._id && !item.id) {
          throw new Error("Product data is invalid.");
        }

        const normalizedProduct = {
          ...item,
          id: item._id ?? item.id,
          title: item.title ?? item.name ?? "Untitled Product",
          brand: item.brand ?? "Unknown brand",
          category: item.category ?? "Electronics",
          price: Number(item.price ?? 0),
          oldPrice:
            item.oldPrice != null ? Number(item.oldPrice) : null,
          rating: Number(item.rating ?? 0),
          reviews: Number(item.reviews ?? item.numReviews ?? 0),
          discount: item.discount ?? "",
          image:
            item.image ??
            item.imageUrl ??
            item.images?.[0] ??
            "",
          description: item.description ?? "No description available.",
          stock: Number(item.stock ?? 0),
        };

        setProduct(normalizedProduct);
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Product details error:", err);
          setError(
            err.message ||
              "Something went wrong while loading the product."
          );
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    if (id) {
      fetchProduct();
    } else {
      setError("Product ID is missing.");
      setLoading(false);
    }

    return () => controller.abort();
  }, [id]);

  const fontStyles = (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
      .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
      .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
    `}</style>
  );

  if (loading) {
    return (
      <main className="voltora-body min-h-screen bg-[#FAFAF8]">
        {fontStyles}
        <section className="mx-auto max-w-7xl px-4 py-24 text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#E5E7EB] border-t-[#B8791A]" />
          <p className="mt-5 text-sm text-[#6B7280]">
            Loading product details...
          </p>
        </section>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="voltora-body min-h-screen bg-[#FAFAF8]">
        {fontStyles}
        <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6">
          <div className="rounded-2xl border border-[#E5E7EB] bg-white px-6 py-14">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7] text-[#B8791A]">
              <ShoppingBag size={28} />
            </div>

            <h1 className="voltora-heading mt-6 text-3xl font-semibold text-[#14181F]">
              {error.includes("not found")
                ? "Product not found"
                : "Unable to load product"}
            </h1>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#6B7280]">
              {error ||
                "The product you're looking for doesn't exist or may have been removed."}
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
            >
              <ArrowLeft size={16} />
              Back to shop
            </Link>
          </div>
        </section>
      </main>
    );
  }

  const {
    title,
    brand,
    price,
    oldPrice,
    rating,
    reviews,
    discount,
    image,
    description,
    category,
    stock,
  } = product;

  const stockAvailable = stock > 0;

  const handleDecrease = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const handleIncrease = () => {
    setQuantity((current) =>
      Math.min(stock, current + 1)
    );
  };

  const handleAddToCart = () => {
    if (!stockAvailable || quantity > stock) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  const handleBuyNow = () => {
    if (!stockAvailable || quantity > stock) return;

    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }

    navigate("/cart");
  };

  return (
    <main className="voltora-body min-h-screen bg-[#FAFAF8]">
      {fontStyles}

      {/* Breadcrumb / Back */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition hover:text-[#14181F]"
          >
            <ArrowLeft size={16} />
            Back to shop
          </Link>
        </div>
      </section>

      {/* Product Details */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Product Image */}
          <div>
            <div className="relative overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
              {discount && (
                <span className="absolute left-5 top-5 z-10 rounded-md bg-red-500 px-3 py-1.5 text-sm font-semibold text-white">
                  {discount}
                </span>
              )}

              <div className="absolute right-5 top-5 z-10">
                <WishlistButton product={product} />
              </div>

              <div className="flex min-h-[420px] items-center justify-center p-8 sm:min-h-[520px] sm:p-12">
                {image ? (
                  <img
                    src={image}
                    alt={title}
                    className="max-h-[480px] w-full object-contain"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="text-center text-sm text-[#9CA3AF]">
                    Product image unavailable
                  </div>
                )}
              </div>
            </div>

            {/* Product Benefits */}
            <div className="voltora-body mt-5 flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2.5">
                <Truck size={18} className="text-[#B8791A]" />
                <span className="text-sm text-[#14181F]">Fast delivery</span>
              </div>

              <span className="hidden h-4 w-px bg-[#E5E7EB] sm:block" />

              <div className="flex items-center gap-2.5">
                <ShieldCheck size={18} className="text-[#B8791A]" />
                <span className="text-sm text-[#14181F]">
                  Secure payment
                </span>
              </div>

              <span className="hidden h-4 w-px bg-[#E5E7EB] sm:block" />

              <div className="flex items-center gap-2.5">
                <PackageCheck size={18} className="text-[#B8791A]" />
                <span className="text-sm text-[#14181F]">
                  Quality checked
                </span>
              </div>
            </div>
          </div>

          {/* Product Information */}
          <div className="flex flex-col">
            <p className="text-sm font-medium text-[#9CA3AF]">{brand}</p>

            <h1 className="voltora-heading mt-3 text-3xl font-semibold leading-tight text-[#14181F] sm:text-4xl">
              {title}
            </h1>

            {/* Rating */}
            <div className="mt-5 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <Rating rating={rating} />
                <span className="text-sm font-semibold text-[#14181F]">
                  {rating.toFixed(1)}
                </span>
              </div>

              <span className="h-4 w-px bg-[#E5E7EB]" />

              <span className="text-sm text-[#6B7280]">
                {reviews} reviews
              </span>

              <span className="h-4 w-px bg-[#E5E7EB]" />

              <span className="text-sm text-[#6B7280]">{category}</span>
            </div>

            {/* Price */}
            <div className="mt-7 flex flex-wrap items-end gap-3">
              <span className="voltora-heading text-4xl font-semibold text-[#14181F]">
                ${price.toFixed(2)}
              </span>

              {oldPrice != null && oldPrice > price && (
                <span className="pb-1 text-lg text-[#9CA3AF] line-through">
                  ${oldPrice.toFixed(2)}
                </span>
              )}

              {discount && (
                <span className="mb-1 rounded-md bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-500">
                  {discount}
                </span>
              )}
            </div>

            {/* Stock */}
            <div className="mt-6 flex items-center gap-2">
              <span
                className={`flex h-2.5 w-2.5 rounded-full ${
                  stockAvailable ? "bg-green-500" : "bg-red-500"
                }`}
              />
              <span
                className={`text-sm font-semibold ${
                  stockAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {stockAvailable ? `${stock} available` : "Out of stock"}
              </span>

              {stockAvailable && (
                <span className="text-sm text-[#9CA3AF]">
                  • Ready to ship
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mt-7 border-t border-[#E5E7EB] pt-7">
              <h2 className="voltora-heading text-lg font-semibold text-[#14181F]">
                Product description
              </h2>

              <p className="mt-3 text-sm leading-7 text-[#6B7280]">
                {description}
              </p>
            </div>

            {/* Quantity + Add to Cart */}
            <div className="mt-7 border-t border-[#E5E7EB] pt-7">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div>
                  <p className="mb-2 text-xs font-medium text-[#9CA3AF]">
                    Quantity
                  </p>

                  <div className="flex h-12 items-center rounded-lg border border-[#E5E7EB] bg-white">
                    <button
                      type="button"
                      onClick={handleDecrease}
                      disabled={quantity <= 1}
                      className="flex h-full w-11 items-center justify-center text-[#14181F] transition hover:bg-[#F4F4F2] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Decrease quantity"
                    >
                      <Minus size={16} />
                    </button>

                    <span className="w-10 text-center text-sm font-semibold text-[#14181F]">
                      {quantity}
                    </span>

                    <button
                      type="button"
                      onClick={handleIncrease}
                      disabled={!stockAvailable || quantity >= stock}
                      className="flex h-full w-11 items-center justify-center text-[#14181F] transition hover:bg-[#F4F4F2] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Increase quantity"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
                  disabled={!stockAvailable}
                  className={`flex h-12 flex-1 items-center justify-center gap-2 rounded-full px-6 text-sm font-semibold transition ${
                    isAdded
                      ? "bg-[#0A0E14] text-white"
                      : "bg-[#FFB020] text-[#0A0E14] hover:bg-[#e6a01c]"
                  } disabled:cursor-not-allowed disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]`}
                >
                  <ShoppingBag size={17} />
                  {isAdded ? "Added ✓" : "Add to Cart"}
                </button>
              </div>

              <button
                type="button"
                onClick={handleBuyNow}
                disabled={!stockAvailable}
                className="mt-3 flex h-12 w-full items-center justify-center rounded-full bg-[#0A0E14] px-6 text-sm font-semibold text-white transition hover:bg-[#171d29] disabled:cursor-not-allowed disabled:bg-[#E5E7EB] disabled:text-[#9CA3AF]"
              >
                Buy Now
              </button>
            </div>

            {/* Shipping Information */}
            <div className="mt-7 rounded-xl border border-[#E5E7EB] bg-white">
              <div className="flex gap-4 border-b border-[#E5E7EB] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF6E7] text-[#B8791A]">
                  <Truck size={19} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14181F]">
                    Free shipping
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    Free shipping is available on orders over $50.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 border-b border-[#E5E7EB] p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF6E7] text-[#B8791A]">
                  <ShieldCheck size={19} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14181F]">
                    Secure checkout
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    Your checkout information is protected.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#FFF6E7] text-[#B8791A]">
                  <Check size={19} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#14181F]">
                    Easy returns
                  </h3>
                  <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                    Return eligible products according to our return policy.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Information Table */}
        <section className="mt-12 rounded-2xl border border-[#E5E7EB] bg-white p-6 sm:p-8">
          <h2 className="voltora-heading text-2xl font-semibold text-[#14181F]">
            Product information
          </h2>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl bg-[#FAFAF8] p-5">
              <p className="text-xs font-medium text-[#9CA3AF]">Brand</p>
              <p className="mt-2 text-sm font-semibold text-[#14181F]">
                {brand}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAFAF8] p-5">
              <p className="text-xs font-medium text-[#9CA3AF]">Category</p>
              <p className="mt-2 text-sm font-semibold text-[#14181F]">
                {category}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAFAF8] p-5">
              <p className="text-xs font-medium text-[#9CA3AF]">
                Availability
              </p>
              <p
                className={`mt-2 text-sm font-semibold ${
                  stockAvailable ? "text-green-600" : "text-red-600"
                }`}
              >
                {stockAvailable ? "In stock" : "Out of stock"}
              </p>
            </div>

            <div className="rounded-xl bg-[#FAFAF8] p-5">
              <p className="text-xs font-medium text-[#9CA3AF]">
                Customer rating
              </p>
              <p className="mt-2 text-sm font-semibold text-[#14181F]">
                {rating.toFixed(1)} / 5
              </p>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
