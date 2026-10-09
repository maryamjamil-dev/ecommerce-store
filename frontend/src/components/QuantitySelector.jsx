import React, { useState } from "react";
import { Minus, Plus } from "lucide-react";

export default function QuantitySelector({
  initialQuantity = 1,
  min = 1,
  max = 10,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(min, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => Math.min(max, current + 1));
  };

  return (
    <div className="inline-flex items-center overflow-hidden rounded-xl border border-gray-200 bg-white">
      {/* Decrease */}
      <button
        type="button"
        onClick={decreaseQuantity}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
        className="flex h-11 w-11 items-center justify-center text-[#0B1F3A] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        <Minus size={17} />
      </button>

      {/* Quantity */}
      <div className="flex h-11 min-w-12 items-center justify-center border-x border-gray-200 px-3 text-sm font-bold text-[#0B1F3A]">
        {quantity}
      </div>

      {/* Increase */}
      <button
        type="button"
        onClick={increaseQuantity}
        disabled={quantity >= max}
        aria-label="Increase quantity"
        className="flex h-11 w-11 items-center justify-center text-[#0B1F3A] transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:text-gray-300"
      >
        <Plus size={17} />
      </button>
    </div>
  );
}