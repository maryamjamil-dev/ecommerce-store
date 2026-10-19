import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ShoppingBag,
  ShieldCheck,
  Truck,
} from "lucide-react";

import CartItem from "../components/CartItem";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Cart() {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartCount,
    subtotal,
    shipping,
    total,
  } = useCart();

  const getProductId = (product) =>
    String(product?._id ?? product?.id ?? "");

  const formatPrice = (amount) =>
    `$${Number(amount || 0).toFixed(2)}`;

  return (
    <>
      <Header />

      <main className="voltora-body min-h-screen bg-[#FAFAF8]">
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
              className="voltora-body mb-4 inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition hover:text-[#14181F]"
            >
              <ArrowLeft size={16} />
              Continue shopping
            </Link>

            <h1 className="voltora-heading text-3xl font-semibold text-[#14181F] sm:text-4xl">
              Your cart
            </h1>

            <p className="voltora-body mt-2 text-sm text-[#6B7280]">
              Review your gear before checkout.
            </p>
          </div>
        </section>

        {/* Cart Content */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          {cartItems.length === 0 ? (
            /* Empty Cart */
            <div className="rounded-xl border border-[#E5E7EB] bg-white px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF6E7] text-[#B8791A]">
                <ShoppingBag size={24} />
              </div>

              <h2 className="voltora-heading mt-5 text-2xl font-semibold text-[#14181F]">
                Your cart is empty
              </h2>

              <p className="voltora-body mx-auto mt-2 max-w-md text-sm text-[#6B7280]">
                Nothing here yet — browse the shop and find something
                worth plugging in.
              </p>

              <Link
                to="/shop"
                className="voltora-body mt-6 inline-flex items-center justify-center rounded-lg bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29]"
              >
                Start shopping
              </Link>
            </div>
          ) : (
            /* Cart With Products */
            <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
              {/* Cart Items */}
              <div>
                <div className="mb-5 flex items-center justify-between">
                  <h2 className="voltora-heading text-xl font-semibold text-[#14181F]">
                    Items
                  </h2>

                  <span className="voltora-body text-sm text-[#6B7280]">
                    {cartCount} {cartCount === 1 ? "item" : "items"}
                  </span>
                </div>

                <div className="space-y-4">
                  {cartItems.map((item) => {
                    const productId = getProductId(item.product);

                    return (
                      <CartItem
                        key={productId}
                        product={item.product}
                        quantity={item.quantity}
                        onIncrease={() => increaseQuantity(productId)}
                        onDecrease={() => decreaseQuantity(productId)}
                        onRemove={() => removeFromCart(productId)}
                      />
                    );
                  })}
                </div>

                {/* Shopping Benefits */}
                <div className="voltora-body mt-8 flex flex-col gap-4 rounded-xl border border-[#E5E7EB] bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2.5">
                    <Truck size={18} className="text-[#B8791A]" />
                    <span className="text-sm text-[#14181F]">
                      Free shipping over $100
                    </span>
                  </div>

                  <span className="hidden h-4 w-px bg-[#E5E7EB] sm:block" />

                  <div className="flex items-center gap-2.5">
                    <ShieldCheck size={18} className="text-[#B8791A]" />
                    <span className="text-sm text-[#14181F]">
                      Secure checkout
                    </span>
                  </div>

                  <span className="hidden h-4 w-px bg-[#E5E7EB] sm:block" />

                  <div className="flex items-center gap-2.5">
                    <ShoppingBag size={18} className="text-[#B8791A]" />
                    <span className="text-sm text-[#14181F]">
                      Quality-checked products
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <aside className="h-fit rounded-xl border border-[#E5E7EB] bg-white p-6 lg:sticky lg:top-24">
                <h2 className="voltora-heading text-xl font-semibold text-[#14181F]">
                  Order summary
                </h2>

                <div className="voltora-body mt-6 space-y-4 border-b border-[#E5E7EB] pb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Subtotal</span>
                    <span className="font-semibold text-[#14181F]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span className="text-[#6B7280]">Shipping</span>
                    <span className="font-semibold text-[#14181F]">
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-5">
                  <span className="voltora-body text-base font-semibold text-[#14181F]">
                    Total
                  </span>

                  <span className="voltora-heading text-2xl font-semibold text-[#14181F]">
                    {formatPrice(total)}
                  </span>
                </div>

                {/* Checkout */}
                <Link
                  to="/checkout"
                  className="voltora-body flex w-full items-center justify-center rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29] focus:outline-none focus:ring-2 focus:ring-[#0A0E14]/30 focus:ring-offset-2"
                >
                  Proceed to checkout
                </Link>

                <Link
                  to="/shop"
                  className="voltora-body mt-3 flex w-full items-center justify-center rounded-lg border border-[#E5E7EB] px-5 py-3 text-sm font-semibold text-[#14181F] transition hover:bg-[#F4F4F2]"
                >
                  Continue shopping
                </Link>

                <p className="voltora-body mt-5 text-center text-xs leading-5 text-[#9CA3AF]">
                  {shipping === 0 && subtotal > 0
                    ? "Your order qualifies for free shipping."
                    : "Shipping is calculated according to your order subtotal."}
                </p>
              </aside>
            </div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
