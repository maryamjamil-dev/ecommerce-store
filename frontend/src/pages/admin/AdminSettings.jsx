import React, { useCallback, useEffect, useState } from "react";
import {
  Store,
  User,
  Bell,
  ShoppingCart,
  ShieldCheck,
  Save,
  Mail,
  Phone,
  MapPin,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  LoaderCircle,
  X,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/admin/settings";

const tabs = [
  { id: "store", label: "Store", icon: Store },
  { id: "profile", label: "Admin Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "security", label: "Security", icon: ShieldCheck },
];

const inputClass =
  "w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20";

const DEFAULTS = {
  store: {
    storeName: "",
    email: "",
    phone: "",
    address: "",
    currency: "PKR",
    timezone: "Asia/Karachi",
  },
  notifications: {
    newOrders: true,
    newUsers: true,
    newReviews: true,
    lowStock: true,
    emailNotifications: false,
  },
  orders: {
    autoConfirmOrders: true,
    allowGuestCheckout: true,
    allowOrderCancellation: true,
    minimumOrderAmount: "0",
  },
  security: { twoFactorAuth: false, loginAlerts: true },
};

const EMPTY_PASSWORDS = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const toState = (s = {}) => ({
  store: { ...DEFAULTS.store, ...(s.store || {}) },
  notifications: { ...DEFAULTS.notifications, ...(s.notifications || {}) },
  orders: {
    ...DEFAULTS.orders,
    ...(s.orders || {}),
    minimumOrderAmount: String(s.orders?.minimumOrderAmount ?? 0),
  },
  security: { ...DEFAULTS.security, ...(s.security || {}) },
});

async function request(path, method, body) {
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

  if (!response.ok) {
    throw new Error(result.message || "Request failed.");
  }

  return result;
}

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("store");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const [settings, setSettings] = useState(toState());
  const [profile, setProfile] = useState({ username: "", email: "" });
  const [passwords, setPasswords] = useState(EMPTY_PASSWORDS);
  const [showPassword, setShowPassword] = useState(false);

  const loadSettings = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const result = await request("", "GET");
      setSettings(toState(result.settings));
      setProfile({
        username: result.admin?.username || "",
        email: result.admin?.email || "",
      });
    } catch (err) {
      setError(err.message || "Backend unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSettings();
  }, [loadSettings]);

  const showSuccess = (text) => {
    setMessage(text);
    setTimeout(() => setMessage(""), 3000);
  };

  const changeTab = (id) => {
    setActiveTab(id);
    setError("");
  };

  const updateSection = (section, field, value) =>
    setSettings((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));

  const handleInput = (section) => (e) =>
    updateSection(section, e.target.name, e.target.value);

  const saveSection = async (section) => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const data = { ...settings[section] };

      if (section === "orders") {
        data.minimumOrderAmount = Number(data.minimumOrderAmount) || 0;
      }

      const result = await request("", "PUT", { [section]: data });
      setSettings(toState(result.settings));
      showSuccess("Settings saved successfully.");
    } catch (err) {
      setError(err.message || "Could not save settings.");
    } finally {
      setSaving(false);
    }
  };

  const saveProfile = async () => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const result = await request("/profile", "PUT", profile);
      setProfile({
        username: result.admin.username,
        email: result.admin.email,
      });
      showSuccess("Profile updated successfully.");
    } catch (err) {
      setError(err.message || "Could not update profile.");
    } finally {
      setSaving(false);
    }
  };

  const savePassword = async () => {
    setSaving(true);
    setError("");
    setMessage("");

    try {
      await request("/password", "PUT", passwords);
      setPasswords(EMPTY_PASSWORDS);
      showSuccess("Password changed successfully.");
    } catch (err) {
      setError(err.message || "Could not change password.");
    } finally {
      setSaving(false);
    }
  };

  const initial = (profile.username || "A").charAt(0).toUpperCase();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0A0E14]">Settings</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage your store, account, notifications, orders and security
          settings.
        </p>
      </div>

      {/* Notifications */}
      {message && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      {error && (
        <div className="flex items-start justify-between gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={() => setError("")} aria-label="Dismiss error">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[240px_1fr]">
        {/* Sidebar */}
        <aside className="h-fit rounded-xl border border-gray-200 bg-white p-2">
          <div className="space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => changeTab(tab.id)}
                  className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-left text-sm font-semibold transition ${
                    isActive
                      ? "bg-[#0A0E14] text-[#FFB020]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#0A0E14]"
                  }`}
                >
                  <Icon size={18} />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </aside>

        {/* Content */}
        <section className="rounded-xl border border-gray-200 bg-white">
          {loading ? (
            <div className="flex min-h-80 items-center justify-center gap-3 text-sm text-gray-500">
              <LoaderCircle className="animate-spin" size={21} />
              Loading settings...
            </div>
          ) : (
            <>
              {/* STORE */}
              {activeTab === "store" && (
                <Panel
                  title="Store Settings"
                  description="Update your store information and regional preferences."
                >
                  <div className="space-y-6 p-5 sm:p-6">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <TextField
                        label="Store Name"
                        name="storeName"
                        icon={Store}
                        value={settings.store.storeName}
                        onChange={handleInput("store")}
                      />
                      <TextField
                        label="Store Email"
                        name="email"
                        type="email"
                        icon={Mail}
                        value={settings.store.email}
                        onChange={handleInput("store")}
                      />
                      <TextField
                        label="Phone Number"
                        name="phone"
                        icon={Phone}
                        value={settings.store.phone}
                        onChange={handleInput("store")}
                      />
                      <TextField
                        label="Address"
                        name="address"
                        icon={MapPin}
                        value={settings.store.address}
                        onChange={handleInput("store")}
                      />

                      <SelectField
                        label="Currency"
                        name="currency"
                        value={settings.store.currency}
                        onChange={handleInput("store")}
                        options={[
                          ["PKR", "Pakistani Rupee (PKR)"],
                          ["USD", "US Dollar (USD)"],
                          ["EUR", "Euro (EUR)"],
                          ["GBP", "British Pound (GBP)"],
                        ]}
                      />
                      <SelectField
                        label="Timezone"
                        name="timezone"
                        value={settings.store.timezone}
                        onChange={handleInput("store")}
                        options={[
                          ["Asia/Karachi", "Asia/Karachi"],
                          ["UTC", "UTC"],
                          ["Asia/Dubai", "Asia/Dubai"],
                          ["Asia/Kolkata", "Asia/Kolkata"],
                        ]}
                      />
                    </div>

                    <SaveButton
                      saving={saving}
                      onClick={() => saveSection("store")}
                    />
                  </div>
                </Panel>
              )}

              {/* PROFILE */}
              {activeTab === "profile" && (
                <Panel
                  title="Admin Profile"
                  description="Manage your administrator account information."
                >
                  <div className="space-y-6 p-5 sm:p-6">
                    <div className="flex items-center gap-4">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0A0E14] text-xl font-bold text-[#FFB020]">
                        {initial}
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#0A0E14]">
                          {profile.username || "Administrator"}
                        </h3>
                        <p className="text-sm text-gray-500">
                          Store Administrator
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <TextField
                        label="Full Name"
                        name="username"
                        icon={User}
                        value={profile.username}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, username: e.target.value }))
                        }
                      />
                      <TextField
                        label="Email Address"
                        name="email"
                        type="email"
                        icon={Mail}
                        value={profile.email}
                        onChange={(e) =>
                          setProfile((p) => ({ ...p, email: e.target.value }))
                        }
                      />
                    </div>

                    <SaveButton saving={saving} onClick={saveProfile} />
                  </div>
                </Panel>
              )}

              {/* NOTIFICATIONS */}
              {activeTab === "notifications" && (
                <Panel
                  title="Notification Settings"
                  description="Choose which notifications you want to receive."
                >
                  <div className="divide-y divide-gray-100">
                    {[
                      ["newOrders", "New Orders", "Receive notifications when a new order is placed."],
                      ["newUsers", "New Users", "Receive notifications when a new customer registers."],
                      ["newReviews", "New Reviews", "Receive notifications when customers submit reviews."],
                      ["lowStock", "Low Stock Alerts", "Get notified when product stock is running low."],
                      ["emailNotifications", "Email Notifications", "Receive important admin notifications by email."],
                    ].map(([key, title, description]) => (
                      <SettingRow
                        key={key}
                        title={title}
                        description={description}
                        checked={settings.notifications[key]}
                        onChange={(v) => updateSection("notifications", key, v)}
                      />
                    ))}
                  </div>

                  <div className="border-t border-gray-200 p-5 sm:p-6">
                    <SaveButton
                      saving={saving}
                      onClick={() => saveSection("notifications")}
                    />
                  </div>
                </Panel>
              )}

              {/* ORDERS */}
              {activeTab === "orders" && (
                <Panel
                  title="Order Settings"
                  description="Configure how orders are handled in your store."
                >
                  <div className="divide-y divide-gray-100">
                    {[
                      ["autoConfirmOrders", "Auto Confirm Orders", "Automatically confirm new orders after checkout."],
                      ["allowGuestCheckout", "Allow Guest Checkout", "Allow customers to place orders without creating an account."],
                      ["allowOrderCancellation", "Allow Order Cancellation", "Allow customers to cancel eligible orders."],
                    ].map(([key, title, description]) => (
                      <SettingRow
                        key={key}
                        title={title}
                        description={description}
                        checked={settings.orders[key]}
                        onChange={(v) => updateSection("orders", key, v)}
                      />
                    ))}
                  </div>

                  <div className="p-5 sm:p-6">
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Minimum Order Amount
                    </label>

                    <div className="mb-6 flex max-w-sm items-center">
                      <span className="rounded-l-lg border border-r-0 border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-500">
                        Rs.
                      </span>
                      <input
                        type="number"
                        min="0"
                        name="minimumOrderAmount"
                        value={settings.orders.minimumOrderAmount}
                        onChange={handleInput("orders")}
                        className="w-full rounded-r-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                      />
                    </div>

                    <SaveButton
                      saving={saving}
                      onClick={() => saveSection("orders")}
                    />
                  </div>
                </Panel>
              )}

              {/* SECURITY */}
              {activeTab === "security" && (
                <Panel
                  title="Security Settings"
                  description="Protect your administrator account and store."
                >
                  <div className="divide-y divide-gray-100">
                    <SettingRow
                      title="Two-Factor Authentication"
                      description="Add an extra security layer to your administrator account."
                      checked={settings.security.twoFactorAuth}
                      onChange={(v) => updateSection("security", "twoFactorAuth", v)}
                    />
                    <SettingRow
                      title="Login Alerts"
                      description="Receive an alert whenever your admin account is accessed."
                      checked={settings.security.loginAlerts}
                      onChange={(v) => updateSection("security", "loginAlerts", v)}
                    />
                  </div>

                  <div className="border-t border-gray-200 p-5 sm:p-6">
                    <SaveButton
                      saving={saving}
                      label="Save Security Settings"
                      onClick={() => saveSection("security")}
                    />
                  </div>

                  <div className="border-t border-gray-200 p-5 sm:p-6">
                    <h3 className="mb-4 text-base font-bold text-[#0A0E14]">
                      Change Password
                    </h3>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                      <PasswordInput
                        label="Current Password"
                        value={passwords.currentPassword}
                        onChange={(e) =>
                          setPasswords((p) => ({
                            ...p,
                            currentPassword: e.target.value,
                          }))
                        }
                        showPassword={showPassword}
                        onToggle={() => setShowPassword((s) => !s)}
                      />
                      <PasswordInput
                        label="New Password"
                        value={passwords.newPassword}
                        onChange={(e) =>
                          setPasswords((p) => ({
                            ...p,
                            newPassword: e.target.value,
                          }))
                        }
                        showPassword={showPassword}
                        onToggle={() => setShowPassword((s) => !s)}
                      />
                    </div>

                    <div className="mt-5 md:max-w-[calc(50%-10px)]">
                      <PasswordInput
                        label="Confirm New Password"
                        value={passwords.confirmPassword}
                        onChange={(e) =>
                          setPasswords((p) => ({
                            ...p,
                            confirmPassword: e.target.value,
                          }))
                        }
                        showPassword={showPassword}
                        onToggle={() => setShowPassword((s) => !s)}
                      />
                    </div>

                    <div className="mt-6">
                      <SaveButton
                        saving={saving}
                        label="Change Password"
                        onClick={savePassword}
                      />
                    </div>
                  </div>
                </Panel>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

/* --------------------------------
   Reusable components
--------------------------------- */

function Panel({ title, description, children }) {
  return (
    <div>
      <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-bold text-[#0A0E14]">{title}</h2>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      {children}
    </div>
  );
}

function TextField({ label, icon: Icon, type = "text", ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <div className="relative">
        <Icon
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input type={type} className={inputClass} {...props} />
      </div>
    </div>
  );
}

function SelectField({ label, options, ...props }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>
      <select
        className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
        {...props}
      >
        {options.map(([value, text]) => (
          <option key={value} value={value}>
            {text}
          </option>
        ))}
      </select>
    </div>
  );
}

function SettingRow({ title, description, checked, onChange }) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6">
      <div>
        <h3 className="text-sm font-semibold text-[#0A0E14]">{title}</h3>
        <p className="mt-1 max-w-xl text-sm text-gray-500">{description}</p>
      </div>
      <ToggleButton checked={checked} onChange={onChange} />
    </div>
  );
}

function ToggleButton({ checked, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-[#0A0E14]" : "bg-gray-300"
      }`}
      aria-label="Toggle setting"
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          checked ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}

function SaveButton({ onClick, saving, label = "Save Changes" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={saving}
      className="inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-2.5 text-sm font-semibold text-[#FFB020] transition hover:bg-[#14181F] disabled:opacity-60"
    >
      {saving ? (
        <LoaderCircle size={17} className="animate-spin" />
      ) : (
        <Save size={17} />
      )}
      {saving ? "Saving..." : label}
    </button>
  );
}

function PasswordInput({ label, value, onChange, showPassword, onToggle }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-gray-700">
        {label}
      </label>

      <div className="relative">
        <Lock
          size={17}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
          placeholder={label}
          autoComplete="off"
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-11 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
        />
        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
        </button>
      </div>
    </div>
  );
}