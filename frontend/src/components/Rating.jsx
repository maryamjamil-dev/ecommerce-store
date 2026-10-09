import React from "react";
import { Star } from "lucide-react";

export default function Rating({ rating = 0, reviews = 0, showReviews = true }) {
  return (
    <div className="flex items-center gap-2">
      {/* Stars */}
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={14}
            fill={star <= Math.round(rating) ? "currentColor" : "none"}
            className={
              star <= Math.round(rating)
                ? "text-[#FFB020]"
                : "text-[#E5E7EB]"
            }
          />
        ))}
      </div>

      {/* Rating Number */}
      <span className="text-xs font-semibold text-[#14181F]">{rating}</span>

      {/* Reviews */}
      {showReviews && (
        <span className="text-xs text-[#9CA3AF]">({reviews})</span>
      )}
    </div>
  );
}