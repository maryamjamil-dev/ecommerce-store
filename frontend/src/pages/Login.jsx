import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Zap,
  Loader2,
  AlertCircle,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [socialLoading, setSocialLoading] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));

    setErrors((current) => ({
      ...current,
      [name]: "",
    }));

    setLoginError("");
  };

  const validateForm = () => {
    const newErrors = {};
    const email = formData.email.trim();
    const password = formData.password;

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const email = formData.email.trim().toLowerCase();

      const result = await login(email, formData.password);

      if (!result?.success) {
        setLoginError(
          result?.message || "Invalid email or password."
        );
        return;
      }

      navigate("/");
    } catch (error) {
      console.error(
        "Login error:",
        error.response?.data || error
      );

      setLoginError(
        error.response?.data?.message ||
        "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    setLoginError(
      `${provider} sign-in is not connected yet.`
    );
  };

  const isBusy = isLoading || Boolean(socialLoading);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .voltora-heading {
          font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
        }

        .voltora-body {
          font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
        }

        @keyframes voltora-pulse {
          0% { offset-distance: 0%; opacity: 0; }
          8% { opacity: 1; }
          92% { opacity: 1; }
          100% { offset-distance: 100%; opacity: 0; }
        }

        @keyframes voltora-glow {
          0%, 78% { opacity: 0.25; }
          88%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(255,176,32,.85));
          }
        }

        .voltora-trace-dot {
          offset-path: path("M4,70 L90,70 L120,30 L170,30 L200,70 L396,70");
          offset-rotate: 0deg;
          animation: voltora-pulse 3.2s ease-in-out infinite;
        }

        .voltora-bulb {
          animation: voltora-glow 3.2s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .voltora-trace-dot,
          .voltora-bulb {
            animation: none;
            opacity: 1;
          }
        }
      `}</style>

      <section className="mx-auto grid min-h-screen max-w-7xl lg:grid-cols-2">
        {/* LEFT PANEL */}
        <div className="relative hidden overflow-hidden bg-[#0A0E14] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <Link to="/" className="relative inline-flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFB020] text-[#0A0E14]">
              <Zap size={18} fill="currentColor" />
            </div>
            <span className="voltora-heading text-xl font-semibold">
              Voltora
            </span>
          </Link>

          <div className="relative max-w-md">
            <h1 className="voltora-heading text-4xl font-semibold leading-tight xl:text-5xl">
              Power up your account.
            </h1>

            <p className="voltora-body mt-5 text-[15px] leading-7 text-white/60">
              Sign in to track your orders, pick up your wishlist,
              and manage your shopping experience.
            </p>

            <div className="relative mt-12 h-28 w-full max-w-sm">
              <svg viewBox="0 0 400 100" className="h-full w-full" fill="none">
                <path
                  d="M4,70 L90,70 L120,30 L170,30 L200,70 L396,70"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="2"
                />
                <circle cx="4" cy="70" r="4" fill="rgba(255,255,255,0.3)" />
                <circle
                  cx="396"
                  cy="70"
                  r="9"
                  className="voltora-bulb"
                  fill="#FFB020"
                />
              </svg>

              <div className="voltora-trace-dot absolute left-0 top-0 h-2.5 w-2.5 rounded-full bg-[#FFB020]" />
            </div>
          </div>

          <div className="voltora-body relative flex flex-wrap items-center gap-4 text-xs text-white/40 xl:gap-6">
            <span>Free shipping over $50</span>
            <span className="hidden h-3 w-px bg-white/15 xl:block" />
            <span>2-year warranty on all gear</span>
            <span className="hidden h-3 w-px bg-white/15 xl:block" />
            <span>30-day returns</span>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-10 flex items-center justify-center gap-2.5 lg:hidden"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#0A0E14] text-white">
                <Zap size={18} fill="currentColor" />
              </div>
              <span className="voltora-heading text-xl font-semibold text-[#0A0E14]">
                Voltora
              </span>
            </Link>

            <div className="text-center lg:text-left">
              <h2 className="voltora-heading text-[28px] font-semibold text-[#14181F]">
                Welcome back
              </h2>
              <p className="voltora-body mt-2 text-sm leading-6 text-[#6B7280]">
                Sign in to shop the latest tech and pick up right
                where you left off.
              </p>
            </div>

            {loginError && (
              <div
                role="alert"
                className="mt-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="voltora-body mt-8 space-y-4"
            >
              {/* EMAIL */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-[#14181F]"
                >
                  Email address
                </label>

                <div className="relative">
                  <Mail
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@example.com"
                    aria-invalid={Boolean(errors.email)}
                    className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:ring-2 ${
                      errors.email
                        ? "border-red-400 focus:ring-red-400/20"
                        : "border-[#E5E7EB] focus:border-[#FFB020] focus:ring-[#FFB020]/25"
                    }`}
                  />
                </div>

                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* PASSWORD */}
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#14181F]"
                  >
                    Password
                  </label>
                  <Link
                    to="/forgotpassword"
                    className="text-sm font-semibold text-[#B8791A] hover:text-[#0A0E14]"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <div className="relative">
                  <Lock
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                  />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    aria-invalid={Boolean(errors.password)}
                    className={`w-full rounded-lg border bg-white py-3 pl-10 pr-11 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:ring-2 ${
                      errors.password
                        ? "border-red-400 focus:ring-red-400/20"
                        : "border-[#E5E7EB] focus:border-[#FFB020] focus:ring-[#FFB020]/25"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#9CA3AF] hover:bg-[#F4F4F2] hover:text-[#14181F]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                {errors.password && (
                  <p className="mt-1.5 text-xs text-red-600">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* REMEMBER */}
              <label className="flex cursor-pointer items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-[#D1D5DB] text-[#FFB020] focus:ring-[#FFB020]/40"
                />
                <span className="text-sm text-[#6B7280]">
                  Keep me signed in
                </span>
              </label>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isBusy}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29] focus:outline-none focus:ring-2 focus:ring-[#0A0E14]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="relative my-7">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#FAFAF8] px-4 text-[#9CA3AF]">
                  Or continue with
                </span>
              </div>
            </div>

            {/* SOCIAL LOGIN - UI ONLY */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                disabled={isBusy}
                className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#D1D5DB] bg-white px-4 py-3 text-sm font-medium text-[#14181F] hover:bg-[#F4F4F2] disabled:opacity-60"
              >
                <span className="font-bold text-[#4285F4]">G</span>
                Continue with Google
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin("Apple")}
                disabled={isBusy}
                className="flex w-full items-center justify-center gap-2.5 rounded-full border border-[#D1D5DB] bg-white px-4 py-3 text-sm font-medium text-[#14181F] hover:bg-[#F4F4F2] disabled:opacity-60"
              >
                <span className="text-base font-semibold">●</span>
                Continue with Apple
              </button>
            </div>

            <p className="voltora-body mt-7 text-center text-sm text-[#6B7280]">
              New to Voltora?{" "}
              <Link
                to="/register"
                className="font-semibold text-[#0A0E14] hover:text-[#B8791A]"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}