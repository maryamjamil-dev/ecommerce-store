import React, { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Camera,
  Save,
  ShoppingBag,
  Heart,
  LogOut,
  ShieldCheck,
  ShieldAlert,
  LoaderCircle,
} from "lucide-react";

import Footer from "../components/Footer";

const API_URL = "http://localhost:3000/api/profile";
const LOGOUT_API = "http://localhost:3000/api/auth/logout";

const getInitials = (name = "") =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase() || "U";

export default function Profile() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(true);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPassword, setSavingPassword] = useState(false);

  const [profile, setProfile] = useState({
    username: "",
    email: "",
  });
  const [isEmailVerified, setIsEmailVerified] = useState(false);

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const inputClass =
    "w-full rounded-lg border border-[#E5E7EB] bg-white py-3 pl-11 pr-4 text-sm text-[#14181F] outline-none transition focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/25";

  const labelClass = "mb-2 block text-sm font-medium text-[#14181F]";

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => setMessage(""), 4000);
  };

  const request = async (path, method = "GET", body) => {
    const response = await fetch(`${API_URL}${path}`, {
      method,
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(body ? { "Content-Type": "application/json" } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });

    const result = await response.json().catch(() => ({}));

    if (response.status === 401) {
      navigate("/login");
      throw new Error(result.message || "Please login first.");
    }

    if (!response.ok) {
      throw new Error(result.message || "Request failed.");
    }

    return result;
  };

  const loadProfile = useCallback(async () => {
    setLoading(true);

    try {
      const result = await request("");
      const user = result.data || {};

      setProfile({
        username: user.username || "",
        email: user.email || "",
      });
      setIsEmailVerified(Boolean(user.isEmailVerified));
    } catch (error) {
      showMessage(error.message || "Could not load profile.", "error");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswords((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();

    const username = profile.username.trim();
    const email = profile.email.trim();

    if (username.length < 3 || username.length > 30) {
      showMessage("Username must be between 3 and 30 characters.", "error");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showMessage("Please enter a valid email address.", "error");
      return;
    }

    setSavingProfile(true);

    try {
      const result = await request("", "PATCH", { username, email });
      const user = result.data || {};

      setProfile({
        username: user.username || username,
        email: user.email || email,
      });
      setIsEmailVerified(Boolean(user.isEmailVerified));

      showMessage("Profile information updated successfully.");
    } catch (error) {
      showMessage(error.message || "Could not update profile.", "error");
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (
      !passwords.currentPassword ||
      !passwords.newPassword ||
      !passwords.confirmPassword
    ) {
      showMessage("Please fill in all password fields.", "error");
      return;
    }

    if (passwords.newPassword.length < 8) {
      showMessage("New password must be at least 8 characters.", "error");
      return;
    }

    if (passwords.newPassword !== passwords.confirmPassword) {
      showMessage("New passwords do not match.", "error");
      return;
    }

    setSavingPassword(true);

    try {
      await request("/change-password", "PATCH", {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword,
      });

      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });

      showMessage("Password updated successfully.");
    } catch (error) {
      showMessage(error.message || "Could not update password.", "error");
    } finally {
      setSavingPassword(false);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(LOGOUT_API, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout request failed:", error);
    }

    navigate("/login");
  };

  return (
    <div className="voltora-body min-h-screen bg-[#FAFAF8] text-[#14181F]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .voltora-heading { font-family: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif; }
        .voltora-body { font-family: 'Inter', ui-sans-serif, system-ui, sans-serif; }
      `}</style>

      {/* HEADER */}
      <header className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="voltora-heading text-xl font-semibold tracking-tight text-[#14181F]"
          >
            Voltora
          </Link>

          <div className="flex items-center gap-4">
            <Link
              to="/shop"
              className="hidden text-sm font-medium text-[#6B7280] transition hover:text-[#B8791A] sm:block"
            >
              Continue shopping
            </Link>

            <Link
              to="/cart"
              className="flex items-center gap-2 text-sm font-medium text-[#6B7280] transition hover:text-[#B8791A]"
            >
              <ShoppingBag size={18} />
              <span className="hidden sm:inline">Cart</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* PAGE HEADER */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-[#B8791A]">Account</p>

          <h1 className="voltora-heading text-3xl font-semibold tracking-tight text-[#14181F] sm:text-4xl">
            My profile
          </h1>

          <p className="mt-2 text-[#6B7280]">
            Manage your personal information, security and account
            settings.
          </p>
        </div>

        {/* SUCCESS / ERROR MESSAGE */}
        {message && (
          <div
            className={`mb-6 rounded-lg border px-5 py-4 text-sm font-medium ${
              messageType === "error"
                ? "border-red-200 bg-red-50 text-red-700"
                : "border-green-200 bg-green-50 text-green-700"
            }`}
          >
            {message}
          </div>
        )}

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-[#6B7280]">
            <LoaderCircle className="animate-spin" size={21} />
            Loading profile...
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {/* PROFILE CARD */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm">
                {/* Avatar */}
                <div className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="flex h-28 w-28 items-center justify-center rounded-full bg-[#0A0E14] text-4xl font-semibold text-white">
                      {getInitials(profile.username)}
                    </div>

                    <button
                      type="button"
                      className="absolute bottom-0 right-0 flex h-10 w-10 items-center justify-center rounded-full border-4 border-white bg-[#FFB020] text-[#0A0E14] transition hover:bg-[#e6a01c]"
                      aria-label="Change profile photo"
                    >
                      <Camera size={18} />
                    </button>
                  </div>

                  <h2 className="voltora-heading mt-5 break-all text-xl font-semibold text-[#14181F]">
                    {profile.username}
                  </h2>

                  <p className="mt-1 break-all text-sm text-[#6B7280]">
                    {profile.email}
                  </p>

                  {isEmailVerified ? (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-xs font-semibold text-green-700">
                      <ShieldCheck size={15} />
                      Verified account
                    </div>
                  ) : (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2 text-xs font-semibold text-yellow-700">
                      <ShieldAlert size={15} />
                      Email not verified
                    </div>
                  )}
                </div>

                {/* Quick Links */}
                <div className="mt-8 space-y-2 border-t border-[#E5E7EB] pt-6">
                  <Link
                    to="/orders"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#14181F] transition hover:bg-[#FAFAF8] hover:text-[#B8791A]"
                  >
                    <ShoppingBag size={18} />
                    My orders
                  </Link>

                  <Link
                    to="/wishlist"
                    className="flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium text-[#14181F] transition hover:bg-[#FAFAF8] hover:text-[#B8791A]"
                  >
                    <Heart size={18} />
                    My wishlist
                  </Link>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT CONTENT */}
            <div className="space-y-6 lg:col-span-2">
              {/* PROFILE INFORMATION */}
              <section className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6">
                  <h2 className="voltora-heading text-xl font-semibold text-[#14181F]">
                    Personal information
                  </h2>

                  <p className="mt-1 text-sm text-[#6B7280]">
                    Update your username and email address.
                  </p>
                </div>

                <form onSubmit={handleProfileSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="username" className={labelClass}>
                        Username
                      </label>

                      <div className="relative">
                        <User
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                        />
                        <input
                          id="username"
                          name="username"
                          type="text"
                          value={profile.username}
                          onChange={handleProfileChange}
                          className={inputClass}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className={labelClass}>
                        Email address
                      </label>

                      <div className="relative">
                        <Mail
                          size={17}
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                        />
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                          className={inputClass}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Save */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={savingProfile}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29] disabled:opacity-60"
                    >
                      {savingProfile ? (
                        <LoaderCircle size={17} className="animate-spin" />
                      ) : (
                        <Save size={17} />
                      )}
                      {savingProfile ? "Saving..." : "Save changes"}
                    </button>
                  </div>
                </form>
              </section>

              {/* CHANGE PASSWORD */}
              <section className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF6E7] text-[#B8791A]">
                    <Lock size={19} />
                  </div>

                  <div>
                    <h2 className="voltora-heading text-xl font-semibold text-[#14181F]">
                      Change password
                    </h2>

                    <p className="text-sm text-[#6B7280]">
                      Keep your account secure with a strong password.
                    </p>
                  </div>
                </div>

                <form onSubmit={handlePasswordSubmit} className="space-y-5">
                  {/* Current Password */}
                  <div>
                    <label htmlFor="currentPassword" className={labelClass}>
                      Current password
                    </label>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                      />

                      <input
                        id="currentPassword"
                        name="currentPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwords.currentPassword}
                        onChange={handlePasswordChange}
                        className={`${inputClass} pr-12`}
                        placeholder="Enter current password"
                        autoComplete="current-password"
                      />

                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] transition hover:text-[#14181F]"
                        aria-label="Toggle password visibility"
                      >
                        {showPassword ? (
                          <EyeOff size={17} />
                        ) : (
                          <Eye size={17} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <label htmlFor="newPassword" className={labelClass}>
                      New password
                    </label>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                      />

                      <input
                        id="newPassword"
                        name="newPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwords.newPassword}
                        onChange={handlePasswordChange}
                        className={inputClass}
                        placeholder="Enter new password"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label htmlFor="confirmPassword" className={labelClass}>
                      Confirm new password
                    </label>

                    <div className="relative">
                      <Lock
                        size={17}
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                      />

                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showPassword ? "text" : "password"}
                        value={passwords.confirmPassword}
                        onChange={handlePasswordChange}
                        className={inputClass}
                        placeholder="Confirm new password"
                        autoComplete="new-password"
                      />
                    </div>
                  </div>

                  {/* Requirements */}
                  <div className="rounded-lg bg-[#FAFAF8] p-4">
                    <p className="mb-2 text-sm font-semibold text-[#14181F]">
                      Password requirements
                    </p>

                    <ul className="space-y-1 text-xs text-[#6B7280]">
                      <li>• At least 8 characters</li>
                      <li>• Use a combination of letters and numbers</li>
                      <li>• Avoid using easily guessed passwords</li>
                    </ul>
                  </div>

                  {/* Update Password */}
                  <div className="flex justify-end pt-2">
                    <button
                      type="submit"
                      disabled={savingPassword}
                      className="inline-flex items-center gap-2 rounded-lg bg-[#FFB020] px-6 py-3 text-sm font-semibold text-[#0A0E14] transition hover:bg-[#e6a01c] disabled:opacity-60"
                    >
                      {savingPassword ? (
                        <LoaderCircle size={17} className="animate-spin" />
                      ) : (
                        <Lock size={17} />
                      )}
                      {savingPassword ? "Updating..." : "Update password"}
                    </button>
                  </div>
                </form>
              </section>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}