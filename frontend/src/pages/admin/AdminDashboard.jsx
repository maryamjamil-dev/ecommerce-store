import React, { useEffect, useState } from "react";
import {
  DollarSign,
  ShoppingCart,
  Users,
  Package,
  ArrowUpRight,
  Clock3,
  CheckCircle2,
  Truck,
  TrendingUp,
  RefreshCw,
  Folder,
  XCircle,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/admin/stats";

const initialData = {
  overview: {
    totalUsers: 0,
    totalProducts: 0,
    totalCategories: 0,
    totalOrders: 0,
    totalSales: 0,
  },
  orders: {
    pending: 0,
    processing: 0,
    delivered: 0,
    cancelled: 0,
  },
  recentOrders: [],
};

const formatNumber = (value) =>
  Number(value || 0).toLocaleString("en-US");

const formatCurrency = (value) =>
  `$${Number(value || 0).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

function getStatusClasses(status) {
  switch (String(status || "").toLowerCase()) {
    case "delivered":
      return "bg-green-50 text-green-700";

    case "shipped":
      return "bg-blue-50 text-blue-700";

    case "processing":
      return "bg-indigo-50 text-indigo-700";

    case "cancelled":
      return "bg-red-50 text-red-700";

    default:
      return "bg-amber-50 text-amber-700";
  }
}

function getStatusIcon(status) {
  switch (String(status || "").toLowerCase()) {
    case "delivered":
      return <CheckCircle2 size={14} />;

    case "shipped":
      return <Truck size={14} />;

    case "processing":
      return <RefreshCw size={14} />;

    case "cancelled":
      return <XCircle size={14} />;

    default:
      return <Clock3 size={14} />;
  }
}

function StatCard({ title, value, icon: Icon, description }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>

          <h2 className="mt-3 break-words text-2xl font-bold tracking-tight text-[#0A0E14] sm:text-3xl">
            {value}
          </h2>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF5DF] text-[#B8791A]">
          <Icon size={21} />
        </div>
      </div>

      <div className="mt-4 flex items-center gap-1.5 text-xs text-gray-500">
        <ArrowUpRight size={15} className="text-[#B8791A]" />
        <span>{description}</span>
      </div>
    </div>
  );
}

function OrderStatusCard({ title, count, icon: Icon, color }) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
          {formatNumber(count)}
        </p>
      </div>

      <div className={`rounded-xl p-3 ${color}`}>
        <Icon size={20} />
      </div>
    </div>
  );
}

function EmptyState({ message }) {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
        <Package size={25} />
      </div>

      <p className="mt-4 text-sm font-semibold text-gray-700">
        No orders found
      </p>

      <p className="mt-1 text-sm text-gray-500">{message}</p>
    </div>
  );
}

export default function AdminDashboard() {
  const [dashboardData, setDashboardData] = useState(initialData);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchDashboardStats = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(API_URL, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
        },
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        if (response.status === 401) {
          throw new Error(
            "Please log in to your admin account again."
          );
        }

        if (response.status === 403) {
          throw new Error(
            "Access denied. Only administrators can view this dashboard."
          );
        }

        throw new Error(
          result.message || "Unable to load dashboard data."
        );
      }

      setDashboardData({
        overview: {
          ...initialData.overview,
          ...(result.data?.overview || {}),
        },
        orders: {
          ...initialData.orders,
          ...(result.data?.orders || {}),
        },
        recentOrders: Array.isArray(result.data?.recentOrders)
          ? result.data.recentOrders
          : [],
      });
    } catch (err) {
      console.error("Admin dashboard error:", err);
      setError(
        err.message ||
          "Unable to connect to the backend. Please check your server."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const overview = dashboardData.overview;
  const orders = dashboardData.orders;
  const recentOrders = dashboardData.recentOrders;

  const stats = [
    {
      title: "Total Revenue",
      value: formatCurrency(overview.totalSales),
      icon: DollarSign,
      description: "From delivered orders",
    },
    {
      title: "Total Orders",
      value: formatNumber(overview.totalOrders),
      icon: ShoppingCart,
      description: "All orders in your store",
    },
    {
      title: "Total Customers",
      value: formatNumber(overview.totalUsers),
      icon: Users,
      description: "Registered user accounts",
    },
    {
      title: "Total Products",
      value: formatNumber(overview.totalProducts),
      icon: Package,
      description: `${formatNumber(
        overview.totalCategories
      )} product categories`,
    },
  ];

  return (
    <div className="space-y-6 bg-[#FAFAF8]">
      {/* Page heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-[#B8791A]">
            Admin Panel
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0E14] sm:text-3xl">
            Dashboard
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Overview of your store performance and recent activity.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchDashboardStats(true)}
          disabled={loading || refreshing}
          className="inline-flex w-fit items-center justify-center gap-2 rounded-xl bg-[#0A0E14] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#202735] disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={16}
            className={
              refreshing || loading ? "animate-spin" : ""
            }
          />
          {refreshing ? "Refreshing..." : "Refresh Data"}
        </button>
      </div>

      {/* API error */}
      {error && (
        <div
          role="alert"
          className="flex flex-col gap-3 rounded-xl border border-red-200 bg-red-50 p-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div>
            <p className="font-semibold text-red-700">
              Dashboard data could not be loaded
            </p>
            <p className="mt-1 text-sm text-red-600">{error}</p>
          </div>

          <button
            type="button"
            onClick={() => fetchDashboardStats(true)}
            className="w-fit rounded-lg border border-red-200 bg-white px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Statistics */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-bold text-[#0A0E14]">
            Store Overview
          </h2>

          <span className="text-xs text-gray-500">
            {loading ? "Loading..." : "Live API data"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </section>

      {/* Order status */}
      <section>
        <div className="mb-4">
          <h2 className="text-base font-bold text-[#0A0E14]">
            Order Status
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Current order counts by status.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <OrderStatusCard
            title="Pending Orders"
            count={orders.pending}
            icon={Clock3}
            color="bg-amber-50 text-amber-700"
          />

          <OrderStatusCard
            title="Processing Orders"
            count={orders.processing}
            icon={RefreshCw}
            color="bg-indigo-50 text-indigo-700"
          />

          <OrderStatusCard
            title="Delivered Orders"
            count={orders.delivered}
            icon={CheckCircle2}
            color="bg-green-50 text-green-700"
          />

          <OrderStatusCard
            title="Cancelled Orders"
            count={orders.cancelled}
            icon={XCircle}
            color="bg-red-50 text-red-700"
          />
        </div>
      </section>

      {/* Recent orders */}
      <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-2 border-b border-gray-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-bold text-[#0A0E14]">
              Recent Orders
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              The five most recently created orders.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
            <TrendingUp size={16} />
            Latest activity
          </div>
        </div>

        {loading ? (
          <div className="p-10 text-center text-sm text-gray-500">
            Loading recent orders...
          </div>
        ) : recentOrders.length === 0 ? (
          <EmptyState message="New orders will appear here when customers place them." />
        ) : (
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[650px] text-left text-sm">
              <thead className="bg-[#FAFAF8] text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">
                    Order ID
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Date
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Amount
                  </th>
                  <th className="px-5 py-4 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {recentOrders.map((order) => {
                  const orderId =
                    order.orderNumber ||
                    order._id ||
                    order.id ||
                    "—";

                  const date = order.createdAt
                    ? new Date(order.createdAt).toLocaleDateString()
                    : "—";

                  return (
                    <tr
                      key={order._id || order.id || orderId}
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-5 py-4 font-semibold text-[#0A0E14]">
                        {String(orderId).startsWith("ORD-")
                          ? orderId
                          : `#${String(orderId).slice(-8)}`}
                      </td>

                      <td className="px-5 py-4 text-gray-500">
                        {date}
                      </td>

                      <td className="px-5 py-4 font-semibold text-[#0A0E14]">
                        {formatCurrency(order.totalAmount)}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusClasses(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          {order.status || "Pending"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Categories summary */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5DF] text-[#B8791A]">
            <Folder size={21} />
          </div>

          <div>
            <h2 className="font-bold text-[#0A0E14]">
              Product Categories
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Total categories in your database
            </p>
          </div>

          <span className="ml-auto text-2xl font-bold text-[#0A0E14]">
            {formatNumber(overview.totalCategories)}
          </span>
        </div>
      </section>
    </div>
  );
}
