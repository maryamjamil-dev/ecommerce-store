import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Lock, CheckCircle } from "lucide-react";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export default function ResetPassword() {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/auth/reset-password/${token}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-[#D1D5DB] bg-white py-3 pl-11 pr-4 text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20";

  return (
    <main className="min-h-screen bg-[#FAFAF8] px-4 py-12">
      <div className="mx-auto flex min-h-[75vh] max-w-md items-center justify-center">
        <div className="w-full rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
          {!success ? (
            <>
              <Link
                to="/login"
                className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#6B7280] transition hover:text-[#0A0E14]"
              >
                <ArrowLeft size={17} />
                Back to Login
              </Link>

              {/* Icon */}
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF6E7]">
                <Lock size={26} className="text-[#FFB020]" />
              </div>

              <h1 className="text-2xl font-bold text-[#14181F]">
                Set New Password
              </h1>

              <p className="mt-2 text-sm leading-6 text-[#6B7280]">
                Enter your new password below. Make sure it is at least 6
                characters long.
              </p>

              <form
                onSubmit={handleSubmit}
                noValidate
                className="mt-7 space-y-5"
              >
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-[#14181F]"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                    />
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-[#14181F]"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock
                      size={19}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                    />
                    <input
                      id="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm new password"
                      className={inputClass}
                    />
                  </div>
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-xl bg-[#FFB020] px-5 py-3 font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Resetting..." : "Reset Password"}
                </button>
              </form>

              {error.toLowerCase().includes("expired") && (
                <p className="mt-6 text-center text-sm text-[#6B7280]">
                  <Link
                    to="/forgot-password"
                    className="font-semibold text-[#B8791A] hover:text-[#0A0E14]"
                  >
                    Request a new reset link
                  </Link>
                </p>
              )}
            </>
          ) : (
            /* Success State */
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#FFF6E7]">
                <CheckCircle size={32} className="text-[#FFB020]" />
              </div>

              <h1 className="text-2xl font-bold text-[#14181F]">
                Password Reset
              </h1>

              <p className="mt-3 text-sm leading-6 text-[#6B7280]">
                Your password has been changed successfully. You can now sign
                in with your new password.
              </p>

              <Link
                to="/login"
                className="mt-7 inline-flex w-full items-center justify-center rounded-xl bg-[#0A0E14] px-5 py-3 font-semibold text-white transition hover:bg-[#171d29]"
              >
                Go to Login
              </Link>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}