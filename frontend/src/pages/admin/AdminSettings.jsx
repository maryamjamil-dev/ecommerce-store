import React, { useState } from "react";
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
} from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("store");

  const [storeSettings, setStoreSettings] = useState({
    storeName: "Voltora",
    email: "admin@voltora.com",
    phone: "+92 300 1234567",
    address: "Faisalabad, Punjab, Pakistan",
    currency: "PKR",
    timezone: "Asia/Karachi",
  });

  const [profileSettings, setProfileSettings] = useState({
    name: "Admin",
    email: "admin@voltora.com",
    phone: "+92 300 1234567",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    newOrders: true,
    newUsers: true,
    newReviews: true,
    lowStock: true,
    emailNotifications: false,
  });

  const [orderSettings, setOrderSettings] = useState({
    autoConfirmOrders: true,
    allowGuestCheckout: true,
    allowOrderCancellation: true,
    minimumOrderAmount: "1000",
  });

  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [message, setMessage] = useState("");

  const tabs = [
    {
      id: "store",
      label: "Store",
      icon: Store,
    },
    {
      id: "profile",
      label: "Admin Profile",
      icon: User,
    },
    {
      id: "notifications",
      label: "Notifications",
      icon: Bell,
    },
    {
      id: "orders",
      label: "Orders",
      icon: ShoppingCart,
    },
    {
      id: "security",
      label: "Security",
      icon: ShieldCheck,
    },
  ];

  const handleStoreChange = (e) => {
    const { name, value } = e.target;

    setStoreSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;

    setProfileSettings((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    console.log("Settings saved:", {
      storeSettings,
      profileSettings,
      notificationSettings,
      orderSettings,
      securitySettings,
    });

    setMessage("Settings saved successfully.");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const Toggle = ({ checked, onChange }) => {
    return (
      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${
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
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#0A0E14]">
          Settings
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your store, account, notifications, orders and
          security settings.
        </p>
      </div>

      {/* Success Message */}
      {message && (
        <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
          <CheckCircle2 size={18} />
          {message}
        </div>
      )}

      {/* Settings Layout */}
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
                  onClick={() => setActiveTab(tab.id)}
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
          {/* STORE SETTINGS */}
          {activeTab === "store" && (
            <div>
              <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-bold text-[#0A0E14]">
                  Store Settings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Update your store information and regional
                  preferences.
                </p>
              </div>

              <div className="space-y-6 p-5 sm:p-6">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Store Name
                    </label>

                    <div className="relative">
                      <Store
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="storeName"
                        value={storeSettings.storeName}
                        onChange={handleStoreChange}
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Store Email
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={storeSettings.email}
                        onChange={handleStoreChange}
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="phone"
                        value={storeSettings.phone}
                        onChange={handleStoreChange}
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Address
                    </label>

                    <div className="relative">
                      <MapPin
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="address"
                        value={storeSettings.address}
                        onChange={handleStoreChange}
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Currency
                    </label>

                    <select
                      name="currency"
                      value={storeSettings.currency}
                      onChange={handleStoreChange}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                    >
                      <option value="PKR">
                        Pakistani Rupee (PKR)
                      </option>
                      <option value="USD">
                        US Dollar (USD)
                      </option>
                      <option value="EUR">
                        Euro (EUR)
                      </option>
                      <option value="GBP">
                        British Pound (GBP)
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Timezone
                    </label>

                    <select
                      name="timezone"
                      value={storeSettings.timezone}
                      onChange={handleStoreChange}
                      className="w-full rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                    >
                      <option value="Asia/Karachi">
                        Asia/Karachi
                      </option>
                      <option value="UTC">UTC</option>
                      <option value="Asia/Dubai">
                        Asia/Dubai
                      </option>
                      <option value="Asia/Kolkata">
                        Asia/Kolkata
                      </option>
                    </select>
                  </div>
                </div>

                <SaveButton onClick={handleSave} />
              </div>
            </div>
          )}

          {/* PROFILE SETTINGS */}
          {activeTab === "profile" && (
            <div>
              <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-bold text-[#0A0E14]">
                  Admin Profile
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Manage your administrator account information.
                </p>
              </div>

              <div className="space-y-6 p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0A0E14] text-xl font-bold text-[#FFB020]">
                    A
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#0A0E14]">
                      Administrator
                    </h3>

                    <p className="text-sm text-gray-500">
                      Store Administrator
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Full Name
                    </label>

                    <div className="relative">
                      <User
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="name"
                        value={profileSettings.name}
                        onChange={handleProfileChange}
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Email Address
                    </label>

                    <div className="relative">
                      <Mail
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="email"
                        name="email"
                        value={profileSettings.email}
                        onChange={handleProfileChange}
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-gray-700">
                      Phone Number
                    </label>

                    <div className="relative">
                      <Phone
                        size={17}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                      />

                      <input
                        type="text"
                        name="phone"
                        value={profileSettings.phone}
                        onChange={handleProfileChange}
                        className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                      />
                    </div>
                  </div>
                </div>

                <SaveButton onClick={handleSave} />
              </div>
            </div>
          )}

          {/* NOTIFICATION SETTINGS */}
          {activeTab === "notifications" && (
            <div>
              <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-bold text-[#0A0E14]">
                  Notification Settings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Choose which notifications you want to receive.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                <SettingRow
                  title="New Orders"
                  description="Receive notifications when a new order is placed."
                  checked={notificationSettings.newOrders}
                  onChange={(value) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      newOrders: value,
                    }))
                  }
                />

                <SettingRow
                  title="New Users"
                  description="Receive notifications when a new customer registers."
                  checked={notificationSettings.newUsers}
                  onChange={(value) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      newUsers: value,
                    }))
                  }
                />

                <SettingRow
                  title="New Reviews"
                  description="Receive notifications when customers submit reviews."
                  checked={notificationSettings.newReviews}
                  onChange={(value) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      newReviews: value,
                    }))
                  }
                />

                <SettingRow
                  title="Low Stock Alerts"
                  description="Get notified when product stock is running low."
                  checked={notificationSettings.lowStock}
                  onChange={(value) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      lowStock: value,
                    }))
                  }
                />

                <SettingRow
                  title="Email Notifications"
                  description="Receive important admin notifications by email."
                  checked={
                    notificationSettings.emailNotifications
                  }
                  onChange={(value) =>
                    setNotificationSettings((prev) => ({
                      ...prev,
                      emailNotifications: value,
                    }))
                  }
                />
              </div>

              <div className="border-t border-gray-200 p-5 sm:p-6">
                <SaveButton onClick={handleSave} />
              </div>
            </div>
          )}

          {/* ORDER SETTINGS */}
          {activeTab === "orders" && (
            <div>
              <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-bold text-[#0A0E14]">
                  Order Settings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Configure how orders are handled in your store.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                <SettingRow
                  title="Auto Confirm Orders"
                  description="Automatically confirm new orders after checkout."
                  checked={orderSettings.autoConfirmOrders}
                  onChange={(value) =>
                    setOrderSettings((prev) => ({
                      ...prev,
                      autoConfirmOrders: value,
                    }))
                  }
                />

                <SettingRow
                  title="Allow Guest Checkout"
                  description="Allow customers to place orders without creating an account."
                  checked={orderSettings.allowGuestCheckout}
                  onChange={(value) =>
                    setOrderSettings((prev) => ({
                      ...prev,
                      allowGuestCheckout: value,
                    }))
                  }
                />

                <SettingRow
                  title="Allow Order Cancellation"
                  description="Allow customers to cancel eligible orders."
                  checked={
                    orderSettings.allowOrderCancellation
                  }
                  onChange={(value) =>
                    setOrderSettings((prev) => ({
                      ...prev,
                      allowOrderCancellation: value,
                    }))
                  }
                />
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
                    value={orderSettings.minimumOrderAmount}
                    onChange={(e) =>
                      setOrderSettings((prev) => ({
                        ...prev,
                        minimumOrderAmount: e.target.value,
                      }))
                    }
                    className="w-full rounded-r-lg border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
                  />
                </div>

                <SaveButton onClick={handleSave} />
              </div>
            </div>
          )}

          {/* SECURITY SETTINGS */}
          {activeTab === "security" && (
            <div>
              <div className="border-b border-gray-200 px-5 py-5 sm:px-6">
                <h2 className="text-lg font-bold text-[#0A0E14]">
                  Security Settings
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Protect your administrator account and store.
                </p>
              </div>

              <div className="divide-y divide-gray-100">
                <SettingRow
                  title="Two-Factor Authentication"
                  description="Add an extra security layer to your administrator account."
                  checked={securitySettings.twoFactorAuth}
                  onChange={(value) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      twoFactorAuth: value,
                    }))
                  }
                />

                <SettingRow
                  title="Login Alerts"
                  description="Receive an alert whenever your admin account is accessed."
                  checked={securitySettings.loginAlerts}
                  onChange={(value) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      loginAlerts: value,
                    }))
                  }
                />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="mb-4 text-base font-bold text-[#0A0E14]">
                  Change Password
                </h3>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <PasswordInput
                    label="Current Password"
                    showPassword={showPassword}
                    onToggle={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />

                  <PasswordInput
                    label="New Password"
                    showPassword={showPassword}
                    onToggle={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />
                </div>

                <div className="mt-5">
                  <PasswordInput
                    label="Confirm New Password"
                    showPassword={showPassword}
                    onToggle={() =>
                      setShowPassword((prev) => !prev)
                    }
                  />
                </div>

                <div className="mt-6">
                  <SaveButton onClick={handleSave} />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

/* --------------------------------
   Setting Row
--------------------------------- */

function SettingRow({
  title,
  description,
  checked,
  onChange,
}) {
  return (
    <div className="flex items-center justify-between gap-5 px-5 py-5 sm:px-6">
      <div>
        <h3 className="text-sm font-semibold text-[#0A0E14]">
          {title}
        </h3>

        <p className="mt-1 max-w-xl text-sm text-gray-500">
          {description}
        </p>
      </div>

      <ToggleButton
        checked={checked}
        onChange={onChange}
      />
    </div>
  );
}

/* --------------------------------
   Toggle Button
--------------------------------- */

function ToggleButton({ checked, onChange }) {
  return (
    <button
      type="button"
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

/* --------------------------------
   Save Button
--------------------------------- */

function SaveButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-2.5 text-sm font-semibold text-[#FFB020] transition hover:bg-[#14181F]"
    >
      <Save size={17} />
      Save Changes
    </button>
  );
}

/* --------------------------------
   Password Input
--------------------------------- */

function PasswordInput({
  label,
  showPassword,
  onToggle,
}) {
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
          placeholder={label}
          className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-11 text-sm outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700"
          aria-label={
            showPassword
              ? "Hide password"
              : "Show password"
          }
        >
          {showPassword ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      </div>
    </div>
  );
}