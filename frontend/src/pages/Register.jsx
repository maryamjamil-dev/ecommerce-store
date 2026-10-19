import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  ArrowRight,
  Zap,
  Loader2,
  AlertCircle,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { useAuth } from "../context/AuthContext";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [registerError, setRegisterError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

    setRegisterError("");
    setSuccessMessage("");
  };

  const getPasswordChecks = (password) => ({
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  });

  const passwordChecks = getPasswordChecks(formData.password);

  const passwordStrengthCount =
    Object.values(passwordChecks).filter(Boolean).length;

  const validateForm = () => {
    const newErrors = {};
    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;
    const confirmPassword = formData.confirmPassword;

    if (!name) {
      newErrors.name = "Full name is required.";
    } else if (name.length < 3) {
      newErrors.name = "Name must contain at least 3 characters.";
    } else if (name.length > 30) {
      newErrors.name = "Name cannot exceed 30 characters.";
    }

    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters.";
    } else if (!passwordChecks.uppercase) {
      newErrors.password =
        "Password must contain at least one uppercase letter.";
    } else if (!passwordChecks.lowercase) {
      newErrors.password =
        "Password must contain at least one lowercase letter.";
    } else if (!passwordChecks.number) {
      newErrors.password =
        "Password must contain at least one number.";
    } else if (!passwordChecks.special) {
      newErrors.password =
        "Password must contain at least one special character.";
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms =
        "Please agree to the Terms of Service and Privacy Policy.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setRegisterError("");
    setSuccessMessage("");

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const name = formData.name.trim();
      const email = formData.email.trim().toLowerCase();

      const result = await register({
        name,
        email,
        password: formData.password,
      });

      if (!result?.success) {
        setRegisterError(
          result?.message || "Unable to create your account."
        );
        return;
      }

      setSuccessMessage(
        "Account created! Redirecting to email verification..."
      );

      navigate("/verify-otp", {
        replace: true,
        state: {
          name,
          email,
          purpose: "signup",
        },
      });
    } catch (error) {
      console.error("Registration error:", error);

      setRegisterError(
        error.response?.data?.message ||
          error.message ||
          "Unable to create your account. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setRegisterError(
      "Google sign-up is not configured yet."
    );
  };

  const handleAppleSignup = () => {
    setRegisterError(
      "Apple sign-up is not configured yet."
    );
  };

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
          0%, 78% {
            opacity: 0.25;
            filter: drop-shadow(0 0 0 rgba(255,176,32,0));
          }
          88%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 10px rgba(255,176,32,0.85));
          }
        }

        .voltora-trace-dot {
          offset-path: path("M4,70 L90,70 L120,30 L170,30 L200,70 L396,70");
          offset-rotate: 0deg;
          animation: voltora-pulse 3.2s ease-in-out infinite;
        }

        .voltora-bulb {
          animation: voltora-glow 3.2s ease-in-out infinite;
          transform-origin: center;
        }

        @media (prefers-reduced-motion: reduce) {
          .voltora-trace-dot, .voltora-bulb {
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
            <span className="voltora-heading text-xl font-semibold tracking-tight">
              Voltora
            </span>
          </Link>

          <div className="relative max-w-md">
            <h1 className="voltora-heading text-4xl font-semibold leading-[1.15] xl:text-5xl">
              Join the Voltora community.
            </h1>

            <p className="voltora-body mt-5 text-[15px] leading-7 text-white/60">
              Create your account to save your favorite tech,
              track orders, manage your wishlist, and enjoy a
              smoother shopping experience.
            </p>

            <div className="relative mt-12 h-28 w-full max-w-sm">
              <svg
                viewBox="0 0 400 100"
                className="h-full w-full"
                fill="none"
                aria-hidden="true"
              >
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
        <div className="flex items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-8 flex items-center justify-center gap-2.5 lg:hidden"
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
                Create your account
              </h2>
              <p className="voltora-body mt-2 text-sm leading-6 text-[#6B7280]">
                Join Voltora and make your next tech purchase easier.
              </p>
            </div>

            {registerError && (
              <div
                role="alert"
                className="mt-5 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                <AlertCircle size={18} className="mt-0.5 shrink-0" />
                <span>{registerError}</span>
              </div>
            )}

            {successMessage && (
              <div
                role="status"
                className="mt-5 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                <span>{successMessage}</span>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              noValidate
              className="voltora-body mt-7 space-y-4"
            >
              {/* NAME */}
              <div>
                <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-[#14181F]">
                  Full name
                </label>
                <div className="relative">
                  <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Enter your full name"
                    aria-invalid={Boolean(errors.name)}
                    className={`w-full rounded-lg border bg-white py-3 pl-10 pr-4 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:ring-2 ${
                      errors.name
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-[#E5E7EB] focus:border-[#FFB020] focus:ring-[#FFB020]/25"
                    }`}
                  />
                </div>
                {errors.name && <p className="mt-1.5 text-xs text-red-600">{errors.name}</p>}
              </div>

              {/* EMAIL */}
              <div>
                <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#14181F]">
                  Email address
                </label>
                <div className="relative">
                  <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
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
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-[#E5E7EB] focus:border-[#FFB020] focus:ring-[#FFB020]/25"
                    }`}
                  />
                </div>
                {errors.email && <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>}
              </div>

              {/* PASSWORD */}
              <div>
                <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#14181F]">
                  Password
                </label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="Create a strong password"
                    aria-invalid={Boolean(errors.password)}
                    className={`w-full rounded-lg border bg-white py-3 pl-10 pr-11 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:ring-2 ${
                      errors.password
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-[#E5E7EB] focus:border-[#FFB020] focus:ring-[#FFB020]/25"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((current) => !current)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#9CA3AF] transition hover:bg-[#F4F4F2] hover:text-[#14181F]"
                  >
                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>

                {formData.password && (
                  <div className="mt-3">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-xs font-medium text-[#6B7280]">Password strength</span>
                      <span className={`text-xs font-semibold ${
                        passwordStrengthCount <= 2
                          ? "text-red-600"
                          : passwordStrengthCount <= 4
                          ? "text-[#B8791A]"
                          : "text-green-600"
                      }`}>
                        {passwordStrengthCount <= 2 ? "Weak" : passwordStrengthCount <= 4 ? "Good" : "Strong"}
                      </span>
                    </div>

                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((item) => (
                        <div
                          key={item}
                          className={`h-1 flex-1 rounded-full ${
                            item <= passwordStrengthCount
                              ? passwordStrengthCount <= 2
                                ? "bg-red-400"
                                : passwordStrengthCount <= 4
                                ? "bg-[#FFB020]"
                                : "bg-green-500"
                              : "bg-[#E5E7EB]"
                          }`}
                        />
                      ))}
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-1.5 text-[11px]">
                      <PasswordRequirement valid={passwordChecks.length} text="8+ characters" />
                      <PasswordRequirement valid={passwordChecks.uppercase} text="Uppercase letter" />
                      <PasswordRequirement valid={passwordChecks.lowercase} text="Lowercase letter" />
                      <PasswordRequirement valid={passwordChecks.number} text="Number" />
                      <PasswordRequirement valid={passwordChecks.special} text="Special character" />
                    </div>
                  </div>
                )}

                {errors.password && <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>}
              </div>

              {/* CONFIRM PASSWORD */}
              <div>
                <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-[#14181F]">
                  Confirm password
                </label>
                <div className="relative">
                  <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    placeholder="Re-enter your password"
                    aria-invalid={Boolean(errors.confirmPassword)}
                    className={`w-full rounded-lg border bg-white py-3 pl-10 pr-11 text-sm text-[#14181F] outline-none transition placeholder:text-[#9CA3AF] focus:ring-2 ${
                      errors.confirmPassword
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-[#E5E7EB] focus:border-[#FFB020] focus:ring-[#FFB020]/25"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((current) => !current)}
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                    className="absolute right-2.5 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-md text-[#9CA3AF] transition hover:bg-[#F4F4F2] hover:text-[#14181F]"
                  >
                    {showConfirmPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword}</p>}
              </div>

              {/* TERMS */}
              <div className="pt-1">
                <label className="flex cursor-pointer items-start gap-2.5">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#D1D5DB] text-[#FFB020] focus:ring-[#FFB020]/40"
                  />
                  <span className="text-xs leading-5 text-[#6B7280]">
                    I agree to the{" "}
                    <Link to="/terms" className="font-semibold text-[#14181F] hover:text-[#B8791A]">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link to="/privacy-policy" className="font-semibold text-[#14181F] hover:text-[#B8791A]">
                      Privacy Policy
                    </Link>.
                  </span>
                </label>
                {errors.agreeToTerms && <p className="mt-1.5 text-xs text-red-600">{errors.agreeToTerms}</p>}
              </div>

              {/* SUBMIT */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29] focus:outline-none focus:ring-2 focus:ring-[#0A0E14]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create account
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* DIVIDER */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E5E7EB]" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-[#FAFAF8] px-4 text-[#9CA3AF]">Or sign up with</span>
              </div>
            </div>

            {/* SOCIAL SIGNUP */}
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={handleGoogleSignup}
                disabled={isLoading}
                className="flex min-w-0 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-[#D1D5DB] bg-white px-4 py-3 text-sm font-medium text-[#14181F] transition hover:bg-[#F4F4F2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" className="shrink-0" aria-hidden="true">
                  <path fill="#4285F4" d="M21.35 12.27c0-.71-.06-1.39-.18-2.05H12v3.88h5.23a4.47 4.47 0 0 1-1.94 2.94v2.44h3.14c1.84-1.69 2.92-4.18 2.92-7.21z" />
                  <path fill="#34A853" d="M12 21.5c2.63 0 4.84-.87 6.45-2.36l-3.14-2.44c-.87.58-1.98.93-3.31.93-2.55 0-4.71-1.72-5.49-4.03H3.27v2.52A9.74 9.74 0 0 0 12 21.5z" />
                  <path fill="#FBBC05" d="M6.51 13.6A5.85 5.85 0 0 1 6.2 12c0-.56.1-1.1.31-1.6V7.88H3.27A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.12l3.24-2.52z" />
                  <path fill="#EA4335" d="M12 6.38c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.49 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.73 5.38l3.24 2.52c.78-2.31 2.94-4.02 5.49-4.02z" />
                </svg>
                <span className="whitespace-nowrap">Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={handleAppleSignup}
                disabled={isLoading}
                className="flex min-w-0 w-full items-center justify-center gap-2.5 whitespace-nowrap rounded-full border border-[#D1D5DB] bg-white px-4 py-3 text-sm font-medium text-[#14181F] transition hover:bg-[#F4F4F2] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-black" aria-hidden="true">
                  <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.79 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.53 4.09zM12.03 7.25C11.88 5.02 13.69 3.18 15.75 3c.28 2.58-2.34 4.5-3.72 4.25z" />
                </svg>
                <span className="whitespace-nowrap">Continue with Apple</span>
              </button>
            </div>

            {/* SECURITY */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#9CA3AF]">
              <ShieldCheck size={15} className="text-[#B8791A]" />
              <span>Your account information is handled securely.</span>
            </div>

            {/* LOGIN */}
            <p className="voltora-body mt-5 text-center text-sm text-[#6B7280]">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-[#0A0E14] hover:text-[#B8791A]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}

function PasswordRequirement({ valid, text }) {
  return (
    <div className={`flex items-center gap-1.5 ${valid ? "text-green-600" : "text-[#9CA3AF]"}`}>
      <CheckCircle2 size={12} className={valid ? "text-green-500" : "text-[#D1D5DB]"} />
      <span>{text}</span>
    </div>
  );
}
