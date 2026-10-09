import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      return;
    }

    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="voltora-body bg-[#FAFAF8] py-16">
      {/* Fonts, shared with the rest of the Voltora account/checkout flow */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#0A0E14] px-6 py-10 text-center sm:px-10">
          {/* Icon */}
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#FFB020]">
            <Mail size={24} className="text-[#0A0E14]" />
          </div>

          {/* Heading */}
          <h2 className="voltora-heading mt-5 text-2xl font-semibold text-white sm:text-3xl">
            Stay updated with Voltora
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/60 sm:text-base">
            Subscribe to our newsletter and get the latest products,
            exclusive offers, and technology updates directly in your inbox.
          </p>

          {/* Success Message */}
          {isSubscribed ? (
            <div className="mx-auto mt-7 flex max-w-md items-center justify-center gap-2 rounded-lg bg-[#FFB020]/10 px-4 py-3 text-sm font-semibold text-[#FFB020]">
              <CheckCircle size={18} />
              You're successfully subscribed!
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="mx-auto mt-7 flex max-w-xl flex-col gap-3 sm:flex-row"
            >
              <div className="relative flex-1">
                <Mail
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="h-12 w-full rounded-lg border border-white/15 bg-white pl-11 pr-4 text-sm text-[#14181F] outline-none placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/25"
                />
              </div>

              <button
                type="submit"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#FFB020] px-6 text-sm font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
              >
                Subscribe
                <ArrowRight size={16} />
              </button>
            </form>
          )}

          {/* Small Text */}
          <p className="mt-5 text-xs text-white/40">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}