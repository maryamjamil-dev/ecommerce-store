import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, ShoppingBag, Trash2 } from "lucide-react";

import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <>
    <Header/>
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Fonts, shared with the rest of the Voltora account/checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* Page Header */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <Link
            to="/shop"
            className="voltora-body inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition hover:text-[#14181F]"
          >
            <ArrowLeft size={16} />
            Continue shopping
          </Link>

          <div className="mt-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <div className="flex items-center gap-2.5">
                <Heart size={24} className="text-[#B8791A]" fill="currentColor" />
                <h1 className="voltora-heading text-3xl font-semibold text-[#14181F] sm:text-4xl">
                  Your wishlist
                </h1>
              </div>

              <p className="voltora-body mt-2 text-sm text-[#6B7280]">
                The gear you're keeping an eye on — saved for whenever
                you're ready.
              </p>
            </div>

            {wishlistItems.length > 0 && (
              <button
                type="button"
                onClick={clearWishlist}
                className="voltora-body inline-flex items-center gap-2 self-start rounded-lg border border-red-100 px-4 py-2.5 text-sm font-semibold text-red-500 transition hover:bg-red-50 sm:self-auto"
              >
                <Trash2 size={16} />
                Clear wishlist
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Wishlist Products */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        {wishlistItems.length === 0 ? (
          /* Empty Wishlist */
          <div className="rounded-xl border border-[#E5E7EB] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7] text-[#B8791A]">
              <Heart size={26} />
            </div>

            <h2 className="voltora-heading mt-6 text-2xl font-semibold text-[#14181F]">
              Your wishlist is empty
            </h2>

            <p className="voltora-body mx-auto mt-2 max-w-md text-sm leading-6 text-[#6B7280]">
              Nothing saved yet. Browse the shop and tap the heart on
              anything worth coming back to.
            </p>

            <Link
              to="/shop"
              className="voltora-body mt-7 inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
            >
              <ShoppingBag size={17} />
              Browse products
            </Link>
          </div>
        ) : (
          <>
            {/* Wishlist Count */}
            <div className="mb-6">
              <h2 className="voltora-heading text-xl font-semibold text-[#14181F]">
                Saved products
              </h2>

              <p className="voltora-body mt-1 text-sm text-[#6B7280]">
                {wishlistItems.length}{" "}
                {wishlistItems.length === 1 ? "product" : "products"} saved
              </p>
            </div>

            {/* Products Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {wishlistItems.map((product) => (
                <article
                  key={product.id}
                  className="group overflow-hidden rounded-xl border border-[#E5E7EB] bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#FFB020]/40 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative bg-[#FAFAF8]">
                    {product.discount && (
                      <span className="voltora-body absolute left-3 top-3 z-10 rounded-full bg-[#0A0E14] px-3 py-1.5 text-xs font-semibold text-white">
                        {product.discount}
                      </span>
                    )}

                    {/* Remove */}
                    <button
                      type="button"
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-red-100 bg-white text-red-500 shadow-sm transition hover:bg-red-50"
                      aria-label="Remove from wishlist"
                    >
                      <Heart size={18} fill="currentColor" />
                    </button>

                    <Link to={`/product/${product.id}`}>
                      <div className="flex h-64 items-center justify-center p-6">
                        <img
                          src={product.image}
                          alt={product.title}
                          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                    </Link>
                  </div>

                  {/* Product Info */}
                  <div className="voltora-body p-5">
                    <p className="text-xs font-medium text-[#9CA3AF]">
                      {product.brand}
                    </p>

                    <Link to={`/product/${product.id}`}>
                      <h3 className="voltora-heading mt-1.5 min-h-[48px] text-base font-semibold leading-6 text-[#14181F] hover:text-[#B8791A]">
                        {product.title}
                      </h3>
                    </Link>

                    {/* Rating */}
                    <div className="mt-3 flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-[#14181F]">
                        <span className="text-[#FFB020]">★</span>{" "}
                        {product.rating}
                      </span>

                      <span className="text-xs text-[#9CA3AF]">
                        ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="mt-4 flex items-end gap-2">
                      <span className="voltora-heading text-xl font-semibold text-[#14181F]">
                        ${product.price.toFixed(2)}
                      </span>

                      {product.oldPrice && (
                        <span className="pb-0.5 text-sm text-[#9CA3AF] line-through">
                          ${product.oldPrice.toFixed(2)}
                        </span>
                      )}
                    </div>

                    {/* Add To Cart */}
                    <button
                      type="button"
                      onClick={() => handleAddToCart(product)}
                      className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
                    >
                      <ShoppingBag size={17} />
                      Add to cart
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
    <Footer/>
    </>
  );
}