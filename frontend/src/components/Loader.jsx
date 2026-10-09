import React from "react";
import { LoaderCircle } from "lucide-react";

export default function Loader({
  size = 32,
  text = "Loading...",
}) {
  return (
    <div className="flex min-h-[240px] w-full flex-col items-center justify-center">
      {/* Spinner */}
      <LoaderCircle
        size={size}
        className="animate-spin text-[#0B1F3A]"
      />

      {/* Loading Text */}
      {text && (
        <p className="mt-4 text-sm font-medium text-gray-500">
          {text}
        </p>
      )}
    </div>
  );
}