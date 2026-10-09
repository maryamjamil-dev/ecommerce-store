import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Mail, CheckCircle } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email.trim()) {
      alert("Please enter your email address.");
      return;
    }

    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12">
      <div className="mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
          {/* Back to Login */}
          <Link
            to="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition hover:text-[#0A0E14]"
          >
            <ArrowLeft size={17} />
            Back to Login
          </Link>

          {!submitted ? (
            <>
              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF6E7]">
                <Mail
                  size={26}
                  className="text-[#FFB020]"
                />
              </div>

              {/* Heading */}
              <h1 className="text-2xl font-bold text-[#14181F]">
                Forgot Password?
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                Enter the email address associated with your
                account and we'll send you instructions to
                reset your password.
              </p>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="mt-7 space-y-5"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-[#14181F]"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#D1D5DB] bg-white py-3 pl-11 pr-4 text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#FFB020] px-5 py-3 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c]"
                >
                  Send Reset Instructions
                </button>
              </form>

              {/* Login Link */}
              <p className="mt-6 text-center text-sm text-[#6B7280]">
                Remember your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#B8791A] hover:text-[#0A0E14]"
                >
                  Sign in
                </Link>
              </p>
            </>
          ) : (
            /* Success State */
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7]">
                <CheckCircle
                  size={32}
                  className="text-[#FFB020]"
                />
              </div>

              <h1 className="text-2xl font-bold text-[#14181F]">
                Check Your Email
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                If an account exists for{" "}
                <span className="font-semibold text-[#14181F]">
                  {email}
                </span>
                , you will receive password reset
                instructions.
              </p>

              <Link
                to="/login"
                className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-[#0A0E14] px-5 py-3 font-semibold text-white transition hover:bg-[#171d29]"
              >
                Back to Login
              </Link>

              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setEmail("");
                }}
                className="mt-4 text-sm font-semibold text-[#B8791A] hover:text-[#0A0E14]"
              >
                Try another email
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
