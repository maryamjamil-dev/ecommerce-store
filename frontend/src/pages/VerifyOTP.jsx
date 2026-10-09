import React, {
  useEffect,
  useRef,
  useState,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Loader2,
  Mail,
  ShieldCheck,
  Zap,
} from "lucide-react";
import {
  Link,
  useLocation,
  useNavigate,
} from "react-router-dom";

export default function VerifyOTP() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email || "";
  const purpose = location.state?.purpose || "signup";
  const name = location.state?.name || "";

  const [otp, setOtp] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] =
    useState("");

  const [isVerifying, setIsVerifying] =
    useState(false);

  const [isResending, setIsResending] =
    useState(false);

  const [secondsLeft, setSecondsLeft] =
    useState(60);

  const inputRefs = useRef([]);

  /*
   * FRONTEND DEMO OTP
   *
   * IMPORTANT:
   * This is only for frontend testing.
   *
   * Later the backend will:
   * - generate a secure OTP
   * - store a hashed OTP
   * - send OTP by email
   * - expire the OTP
   * - limit attempts
   *
   * Demo OTP:
   * 123456
   */

  const DEMO_OTP = "123456";

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (secondsLeft <= 0) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((current) =>
        current > 0 ? current - 1 : 0
      );
    }, 1000);

    return () => clearInterval(timer);
  }, [secondsLeft]);

  const handleChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, "");

    if (!cleanValue) {
      setOtp((current) => {
        const updated = [...current];
        updated[index] = "";
        return updated;
      });

      setError("");
      return;
    }

    const digit = cleanValue[0];

    setOtp((current) => {
      const updated = [...current];
      updated[index] = digit;
      return updated;
    });

    setError("");

    if (index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        setOtp((current) => {
          const updated = [...current];
          updated[index] = "";
          return updated;
        });

        return;
      }

      if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pastedText = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);

    if (!pastedText) {
      return;
    }

    const newOtp = [
      "",
      "",
      "",
      "",
      "",
      "",
    ];

    pastedText.split("").forEach((digit, index) => {
      newOtp[index] = digit;
    });

    setOtp(newOtp);
    setError("");

    const nextIndex = Math.min(
      pastedText.length,
      5
    );

    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async (e) => {
    e.preventDefault();

    setError("");
    setSuccessMessage("");

    const enteredOTP = otp.join("");

    if (enteredOTP.length !== 6) {
      setError("Please enter the complete 6-digit OTP.");
      return;
    }

    setIsVerifying(true);

    try {
      /*
       * FRONTEND DEMO
       *
       * Later:
       *
       * POST /api/auth/verify-otp
       *
       * {
       *   email,
       *   otp,
       *   purpose
       * }
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      if (enteredOTP !== DEMO_OTP) {
        setError(
          "Invalid OTP. Please check the code and try again."
        );

        return;
      }

      setSuccessMessage(
        purpose === "signup"
          ? "Your account has been verified successfully."
          : "OTP verified successfully."
      );

      await new Promise((resolve) =>
        setTimeout(resolve, 700)
      );

      navigate("/", {
        replace: true,
        state: {
          authenticated: true,
          email,
          name,
          purpose,
        },
      });
    } catch (error) {
      console.error("OTP verification error:", error);

      setError(
        "Unable to verify OTP. Please try again."
      );
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendOTP = async () => {
    if (secondsLeft > 0 || isResending) {
      return;
    }

    setError("");
    setSuccessMessage("");
    setIsResending(true);

    try {
      /*
       * Later:
       *
       * POST /api/auth/resend-otp
       *
       * {
       *   email,
       *   purpose
       * }
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 800)
      );

      setSecondsLeft(60);

      setOtp([
        "",
        "",
        "",
        "",
        "",
        "",
      ]);

      inputRefs.current[0]?.focus();

      setSuccessMessage(
        "A new verification code has been sent."
      );
    } catch (error) {
      console.error("Resend OTP error:", error);

      setError(
        "Unable to resend OTP. Please try again."
      );
    } finally {
      setIsResending(false);
    }
  };

  const handleBack = () => {
    if (purpose === "login") {
      navigate("/login");
    } else {
      navigate("/register");
    }
  };

  const maskedEmail = email
    ? email.replace(
        /^(.{2})(.*)(@.*)$/,
        (_, firstTwo, middle, domain) =>
          `${firstTwo}${"*".repeat(
            Math.min(Math.max(middle.length, 3), 6)
          )}${domain}`
      )
    : "your email address";

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
          0% {
            offset-distance: 0%;
            opacity: 0;
          }

          8% {
            opacity: 1;
          }

          92% {
            opacity: 1;
          }

          100% {
            offset-distance: 100%;
            opacity: 0;
          }
        }

        @keyframes voltora-glow {
          0%,
          78% {
            opacity: 0.25;
            filter: drop-shadow(
              0 0 0 rgba(255, 176, 32, 0)
            );
          }

          88%,
          100% {
            opacity: 1;
            filter: drop-shadow(
              0 0 10px rgba(255, 176, 32, 0.85)
            );
          }
        }

        .voltora-trace-dot {
          offset-path: path(
            "M4,70 L90,70 L120,30 L170,30 L200,70 L396,70"
          );
          offset-rotate: 0deg;
          animation: voltora-pulse 3.2s ease-in-out infinite;
        }

        .voltora-bulb {
          animation: voltora-glow 3.2s ease-in-out infinite;
          transform-origin: center;
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
        {/* LEFT SIDE */}
        <div className="relative hidden overflow-hidden bg-[#0A0E14] p-10 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
              backgroundSize: "36px 36px",
            }}
          />

          <Link
            to="/"
            className="relative inline-flex items-center gap-2.5"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#FFB020] text-[#0A0E14]">
              <Zap size={18} fill="currentColor" />
            </div>

            <span className="voltora-heading text-xl font-semibold tracking-tight">
              Voltora
            </span>
          </Link>

          <div className="relative max-w-md">
            <h1 className="voltora-heading text-4xl font-semibold leading-[1.15] xl:text-5xl">
              Secure your account.
            </h1>

            <p className="voltora-body mt-5 text-[15px] leading-7 text-white/60">
              One more step and your Voltora account
              will be ready to go.
            </p>

            <div className="relative mt-12 h-28 w-full max-w-sm">
              <svg
                viewBox="0 0 400 100"
                className="h-full w-full"
                fill="none"
              >
                <path
                  d="M4,70 L90,70 L120,30 L170,30 L200,70 L396,70"
                  stroke="rgba(255,255,255,0.14)"
                  strokeWidth="2"
                />

                <circle
                  cx="4"
                  cy="70"
                  r="4"
                  fill="rgba(255,255,255,0.3)"
                />

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
            <span>Secure verification</span>

            <span className="hidden h-3 w-px bg-white/15 xl:block" />

            <span>Protected account</span>

            <span className="hidden h-3 w-px bg-white/15 xl:block" />

            <span>Trusted shopping</span>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex items-center justify-center px-5 py-12 sm:px-8 lg:px-12">
          <div className="w-full max-w-md">
            {/* MOBILE LOGO */}
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

            {/* BACK */}
            <button
              type="button"
              onClick={handleBack}
              className="voltora-body mb-7 flex items-center gap-2 text-sm font-medium text-[#6B7280] transition hover:text-[#0A0E14]"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {/* ICON */}
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0A0E14] text-white">
              <Mail size={21} />
            </div>

            {/* HEADING */}
            <div className="mt-6">
              <h2 className="voltora-heading text-[28px] font-semibold text-[#14181F]">
                Verify your email
              </h2>

              <p className="voltora-body mt-2 text-sm leading-6 text-[#6B7280]">
                We sent a 6-digit verification code to
              </p>

              <p className="voltora-body mt-1 text-sm font-semibold text-[#14181F]">
                {maskedEmail}
              </p>
            </div>

            {/* SUCCESS */}
            {successMessage && (
              <div
                role="status"
                className="mt-6 flex items-start gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
              >
                <CheckCircle2
                  size={18}
                  className="mt-0.5 shrink-0"
                />

                <span>{successMessage}</span>
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div
                role="alert"
                className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* OTP FORM */}
            <form
              onSubmit={handleVerify}
              className="voltora-body mt-8"
            >
              <label className="block text-sm font-medium text-[#14181F]">
                Verification code
              </label>

              <div
                className="mt-3 grid grid-cols-6 gap-2.5 sm:gap-3"
                onPaste={handlePaste}
              >
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(element) => {
                      inputRefs.current[index] =
                        element;
                    }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={
                      index === 0
                        ? "one-time-code"
                        : "off"
                    }
                    maxLength={1}
                    value={digit}
                    onChange={(e) =>
                      handleChange(
                        index,
                        e.target.value
                      )
                    }
                    onKeyDown={(e) =>
                      handleKeyDown(index, e)
                    }
                    aria-label={`OTP digit ${
                      index + 1
                    }`}
                    className="h-14 w-full rounded-xl border border-[#E5E7EB] bg-white text-center text-xl font-semibold text-[#14181F] outline-none transition focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/25"
                  />
                ))}
              </div>

              {/* VERIFY */}
              <button
                type="submit"
                disabled={isVerifying}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29] focus:outline-none focus:ring-2 focus:ring-[#0A0E14]/30 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isVerifying ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify OTP
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* RESEND */}
            <div className="mt-6 text-center">
              <p className="voltora-body text-sm text-[#6B7280]">
                Didn't receive the code?
              </p>

              <button
                type="button"
                onClick={handleResendOTP}
                disabled={
                  secondsLeft > 0 || isResending
                }
                className="mt-2 text-sm font-semibold text-[#B8791A] transition hover:text-[#0A0E14] disabled:cursor-not-allowed disabled:text-[#9CA3AF]"
              >
                {isResending
                  ? "Sending new code..."
                  : secondsLeft > 0
                  ? `Resend code in ${secondsLeft}s`
                  : "Resend code"}
              </button>
            </div>

            {/* DEMO NOTE */}
            <div className="mt-7 rounded-xl border border-[#E5E7EB] bg-white p-4">
              <p className="voltora-body text-xs leading-5 text-[#6B7280]">
                <span className="font-semibold text-[#14181F]">
                  Frontend demo:
                </span>{" "}
                Use OTP{" "}
                <span className="font-semibold text-[#B8791A]">
                  123456
                </span>{" "}
                to test the verification flow.
              </p>
            </div>

            {/* SECURITY */}
            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#9CA3AF]">
              <ShieldCheck
                size={15}
                className="text-[#B8791A]"
              />

              <span>
                Your verification is handled securely.
              </span>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}