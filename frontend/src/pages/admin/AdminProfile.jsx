import React, { useState } from "react";
import {
  User,
  Mail,
  Phone,
  ShieldCheck,
  Camera,
  Lock,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

export default function AdminProfile() {
  // -----------------------------------------
  // PROFILE DATA
  // -----------------------------------------

  const [profile, setProfile] = useState({
    name: "Admin",
    email: "admin@voltora.com",
    phone: "+92 300 1234567",
    role: "Administrator",
  });

  // -----------------------------------------
  // PASSWORD DATA
  // -----------------------------------------

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // -----------------------------------------
  // PASSWORD VISIBILITY
  // -----------------------------------------

  const [showCurrentPassword, setShowCurrentPassword] =
    useState(false);

  const [showNewPassword, setShowNewPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  // -----------------------------------------
  // SUCCESS MESSAGE
  // -----------------------------------------

  const [successMessage, setSuccessMessage] = useState("");

  // -----------------------------------------
  // PROFILE CHANGE
  // -----------------------------------------

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfile((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // -----------------------------------------
  // PASSWORD CHANGE
  // -----------------------------------------

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  // -----------------------------------------
  // SAVE PROFILE
  // -----------------------------------------

  const handleProfileSubmit = (e) => {
    e.preventDefault();

    console.log("Updated admin profile:", profile);

    setSuccessMessage("Profile information updated successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // -----------------------------------------
  // CHANGE PASSWORD
  // -----------------------------------------

  const handlePasswordSubmit = (e) => {
    e.preventDefault();

    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setSuccessMessage("Please complete all password fields.");
      return;
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      setSuccessMessage("New passwords do not match.");
      return;
    }

    if (passwordData.newPassword.length < 8) {
      setSuccessMessage(
        "Password must be at least 8 characters."
      );
      return;
    }

    console.log("Password change requested.");

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    setSuccessMessage("Password updated successfully.");

    setTimeout(() => {
      setSuccessMessage("");
    }, 3000);
  };

  // -----------------------------------------
  // INPUT CLASS
  // -----------------------------------------

  const inputClass =
    "w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#0A0E14] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20";

  const labelClass =
    "mb-2 block text-sm font-medium text-[#374151]";

  // -----------------------------------------
  // PASSWORD INPUT
  // -----------------------------------------

  const PasswordInput = ({
    label,
    name,
    value,
    onChange,
    placeholder,
    showPassword,
    onToggle,
  }) => {
    return (
      <div>
        <label className={labelClass}>{label}</label>

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`${inputClass} pr-12`}
          />

          <button
            type="button"
            onClick={onToggle}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#0A0E14]"
            aria-label={
              showPassword
                ? "Hide password"
                : "Show password"
            }
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-w-0">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="mb-8">
        <p className="text-sm font-medium text-[#B8791A]">
          Account
        </p>

        <h1 className="mt-1 text-2xl font-bold text-[#0A0E14] sm:text-3xl">
          My Profile
        </h1>

        <p className="mt-2 text-sm text-[#6B7280]">
          Manage your administrator profile and account
          security.
        </p>
      </div>

      {/* =========================================
          SUCCESS MESSAGE
      ========================================= */}

      {successMessage && (
        <div className="mb-6 flex items-center gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          <ShieldCheck size={18} />

          <span>{successMessage}</span>
        </div>
      )}

      {/* =========================================
          PROFILE OVERVIEW
      ========================================= */}

      <section className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white p-6">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="relative">

              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#0A0E14] text-[#FFB020]">
                <User size={32} />
              </div>

              {/* Camera Button */}
              <button
                type="button"
                className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-[#FFB020] text-[#0A0E14] transition hover:bg-[#E69B00]"
                aria-label="Change profile picture"
                title="Change profile picture"
              >
                <Camera size={14} />
              </button>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[#0A0E14]">
                {profile.name}
              </h2>

              <p className="mt-1 text-sm text-[#6B7280]">
                {profile.email}
              </p>

              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-[#FFF6E7] px-3 py-1 text-xs font-semibold text-[#B8791A]">
                <ShieldCheck size={13} />
                Administrator
              </div>
            </div>
          </div>

          {/* Account Status */}
          <div className="rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-5 py-4">
            <p className="text-xs font-medium text-[#9CA3AF]">
              Account status
            </p>

            <div className="mt-2 flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-green-500" />

              <span className="text-sm font-semibold text-[#14181F]">
                Active
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          PROFILE INFORMATION
      ========================================= */}

      <section className="mb-6 rounded-2xl border border-[#E5E7EB] bg-white">

        {/* Section Header */}
        <div className="border-b border-[#E5E7EB] px-6 py-5">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A]">
              <User size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0A0E14]">
                Profile information
              </h2>

              <p className="mt-0.5 text-xs text-[#6B7280]">
                Update your personal administrator information.
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleProfileSubmit}
          className="p-6"
        >
          <div className="grid gap-5 sm:grid-cols-2">

            {/* Name */}
            <div>
              <label className={labelClass}>
                Full name
              </label>

              <div className="relative">
                <User
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleProfileChange}
                  required
                  className={`${inputClass} pl-10`}
                  placeholder="Enter your name"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className={labelClass}>
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleProfileChange}
                  required
                  className={`${inputClass} pl-10`}
                  placeholder="admin@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className={labelClass}>
                Phone number
              </label>

              <div className="relative">
                <Phone
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />

                <input
                  type="tel"
                  name="phone"
                  value={profile.phone}
                  onChange={handleProfileChange}
                  className={`${inputClass} pl-10`}
                  placeholder="+92 300 1234567"
                />
              </div>
            </div>

            {/* Role */}
            <div>
              <label className={labelClass}>
                Role
              </label>

              <div className="relative">
                <ShieldCheck
                  size={17}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
                />

                <input
                  type="text"
                  value={profile.role}
                  disabled
                  className={`${inputClass} cursor-not-allowed bg-[#F7F7F5] pl-10 text-[#6B7280]`}
                />
              </div>
            </div>
          </div>

          {/* Save */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29] focus:outline-none focus:ring-2 focus:ring-[#0A0E14]/20"
            >
              <Save size={17} />
              Save changes
            </button>
          </div>
        </form>
      </section>

      {/* =========================================
          CHANGE PASSWORD
      ========================================= */}

      <section className="rounded-2xl border border-[#E5E7EB] bg-white">

        {/* Header */}
        <div className="border-b border-[#E5E7EB] px-6 py-5">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF6E7] text-[#B8791A]">
              <Lock size={19} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-[#0A0E14]">
                Change password
              </h2>

              <p className="mt-0.5 text-xs text-[#6B7280]">
                Keep your administrator account secure.
              </p>
            </div>
          </div>
        </div>

        {/* Password Form */}
        <form
          onSubmit={handlePasswordSubmit}
          className="p-6"
        >
          <div className="grid gap-5">

            {/* Current Password */}
            <PasswordInput
              label="Current password"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handlePasswordChange}
              placeholder="Enter current password"
              showPassword={showCurrentPassword}
              onToggle={() =>
                setShowCurrentPassword(
                  (current) => !current
                )
              }
            />

            <div className="grid gap-5 sm:grid-cols-2">

              {/* New Password */}
              <PasswordInput
                label="New password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                placeholder="Enter new password"
                showPassword={showNewPassword}
                onToggle={() =>
                  setShowNewPassword(
                    (current) => !current
                  )
                }
              />

              {/* Confirm Password */}
              <PasswordInput
                label="Confirm new password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm new password"
                showPassword={showConfirmPassword}
                onToggle={() =>
                  setShowConfirmPassword(
                    (current) => !current
                  )
                }
              />
            </div>
          </div>

          {/* Password Requirements */}
          <div className="mt-5 rounded-xl bg-[#FAFAF8] p-4">
            <p className="text-xs font-semibold text-[#374151]">
              Password requirements
            </p>

            <ul className="mt-2 space-y-1 text-xs text-[#6B7280]">
              <li>• At least 8 characters</li>
              <li>• Use a combination of letters and numbers</li>
              <li>• Avoid using easily guessed passwords</li>
            </ul>
          </div>

          {/* Save Password */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-xl bg-[#0A0E14] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#171d29] focus:outline-none focus:ring-2 focus:ring-[#0A0E14]/20"
            >
              <Lock size={17} />
              Update password
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}