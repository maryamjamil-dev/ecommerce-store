import React from "react";
import {
  Trash2,
  Minus,
  Plus,
} from "lucide-react";

export default function CartItem({
  product,
  quantity = 1,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  if (!product) {
    return null;
  }

  const {
    title,
    brand,
    price,
    oldPrice,
    image,
  } = product;

  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-gray-200 bg-white p-5 sm:flex-row sm:items-center">

      {/* Product Image */}
      <div className="flex h-28 w-full shrink-0 items-center justify-center rounded-xl bg-gray-50 p-4 sm:h-28 sm:w-28">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-contain"
        />
      </div>

      {/* Product Information */}
      <div className="min-w-0 flex-1">

        {/* Brand */}
        <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
          {brand}
        </p>

        {/* Title */}
        <h3 className="mt-1 text-base font-bold text-[#0B1F3A]">
          {title}
        </h3>

        {/* Price */}
        <div className="mt-2 flex items-center gap-2">
          <span className="text-lg font-black text-[#0B1F3A]">
            ${price.toFixed(2)}
          </span>

          {oldPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${oldPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={onDecrease}
          disabled={quantity <= 1}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#0B1F3A] transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
          aria-label="Decrease quantity"
        >
          <Minus size={16} />
        </button>

        <span className="w-6 text-center text-sm font-bold text-[#0B1F3A]">
          {quantity}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-[#0B1F3A] transition hover:bg-gray-50"
          aria-label="Increase quantity"
        >
          <Plus size={16} />
        </button>

      </div>

      {/* Item Total */}
      <div className="text-left sm:w-24 sm:text-right">
        <p className="text-xs text-gray-400">
          Total
        </p>

        <p className="mt-1 text-lg font-black text-[#0B1F3A]">
          ${(price * quantity).toFixed(2)}
        </p>
      </div>

      {/* Remove */}
      <button
        type="button"
        onClick={onRemove}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-red-100 text-red-500 transition hover:bg-red-50"
        aria-label="Remove item"
      >
        <Trash2 size={18} />
      </button>

    </div>
  );
}