import React from "react";
import { Heart } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";

export default function WishlistButton({ product }) {
  const {
    toggleWishlist,
    isInWishlist,
  } = useWishlist();

  if (!product) {
    return null;
  }

  const isWishlisted = isInWishlist(product.id);

  const handleWishlist = () => {
    toggleWishlist(product);
  };

  return (
    <button
      type="button"
      onClick={handleWishlist}
      className={`flex h-11 w-11 items-center justify-center rounded-full border transition-all duration-200 ${
        isWishlisted
          ? "border-red-200 bg-red-50 text-red-500"
          : "border-gray-200 bg-white text-gray-600 hover:border-red-200 hover:text-red-500"
      }`}
      aria-label={
        isWishlisted
          ? "Remove from wishlist"
          : "Add to wishlist"
      }
    >
      <Heart
        size={20}
        fill={isWishlisted ? "currentColor" : "none"}
      />
    </button>
  );
}