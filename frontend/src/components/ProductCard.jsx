import React, { useState } from "react";
import { ShoppingBag, Star, Heart } from "lucide-react";

import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

export default function ProductCard({ product }) {
  const [isAdded, setIsAdded] = useState(false);

  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  if (!product) {
    return null;
  }

  const {
    id,
    title,
    brand,
    price,
    oldPrice,
    rating,
    reviews,
    discount,
    image,
    description,
  } = product;

  const isWishlisted = isInWishlist(id);

  const handleAddToCart = () => {
    addToCart(product);

    setIsAdded(true);

    setTimeout(() => {
      setIsAdded(false);
    }, 1500);
  };

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <article className="voltora-body group relative flex h-full flex-col rounded-lg border border-[#E5E7EB] bg-white transition-shadow duration-200 hover:shadow-md">
      {/* Fonts, shared with the rest of the Voltora account/checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Product image */}
      <div className="relative p-5">
        {discount && (
          <span className="absolute left-3 top-3 z-10 rounded-md bg-red-500 px-2 py-1 text-[11px] font-semibold text-white">
            {discount}
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          onClick={handleWishlist}
          className={`absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full border transition-colors ${
            isWishlisted
              ? "border-red-200 bg-red-50 text-red-500"
              : "border-[#E5E7EB] bg-white text-[#9CA3AF] hover:text-red-500"
          }`}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={15} fill={isWishlisted ? "currentColor" : "none"} />
        </button>

        <Link to={`/product/${id}`}>
          <div className="flex h-56 items-center justify-center">
            <img
              src={image}
              alt={title}
              className="h-full w-full object-contain"
            />
          </div>
        </Link>
      </div>

      {/* Product info */}
      <div className="flex flex-1 flex-col px-5 pb-5">
        <p className="text-xs text-[#9CA3AF]">{brand}</p>

        <Link to={`/product/${id}`}>
          <h3 className="mt-1 line-clamp-2 min-h-[40px] text-sm font-medium leading-5 text-[#14181F] transition-colors hover:text-[#B8791A]">
            {title}
          </h3>
        </Link>

        {/* Rating */}
        <div className="mt-1.5 flex items-center gap-1.5">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={13}
                fill={index < Math.round(rating) ? "#FFB020" : "none"}
                className={
                  index < Math.round(rating)
                    ? "text-[#FFB020]"
                    : "text-[#E5E7EB]"
                }
              />
            ))}
          </div>

          <span className="text-xs text-[#6B7280] transition-colors hover:text-[#14181F]">
            ({reviews})
          </span>
        </div>

        {/* Price */}
        <div className="mt-2 flex items-baseline gap-2">
          <span className="voltora-heading text-lg font-semibold text-[#14181F]">
            ${price.toFixed(2)}
          </span>

          {oldPrice && (
            <span className="text-xs text-[#9CA3AF] line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>

        {description && (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-[#6B7280]">
            {description}
          </p>
        )}

        {/* Add to cart */}
        <button
          type="button"
          onClick={handleAddToCart}
          className={`mt-3 flex w-full items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
            isAdded
              ? "bg-[#0A0E14] text-white"
              : "bg-[#FFB020] text-[#0A0E14] hover:bg-[#e6a01c]"
          }`}
        >
          <ShoppingBag size={16} />
          {isAdded ? "Added ✓" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}