import React, { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShoppingCart,
  Eye,
  Pencil,
  ChevronLeft,
  ChevronRight,
  Clock3,
  CheckCircle2,
  Truck,
  XCircle,
  PackageCheck,
  X,
  RefreshCw,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

const ORDERS_PER_PAGE = 8;

const statusOptions = [
  "Pending",
  "Confirmed",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

function getStatusClasses(status) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-50 text-emerald-700";
    case "Shipped":
      return "bg-blue-50 text-blue-700";
    case "Confirmed":
    case "Processing":
      return "bg-[#FFF5DC] text-[#9A6500]";
    case "Cancelled":
      return "bg-red-50 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
}

function getStatusIcon(status) {
  switch (status) {
    case "Delivered":
      return <CheckCircle2 size={14} />;
    case "Shipped":
      return <Truck size={14} />;
    case "Processing":
    case "Confirmed":
      return <PackageCheck size={14} />;
    case "Cancelled":
      return <XCircle size={14} />;
    default:
      return <Clock3 size={14} />;
  }
}

function formatDate(date) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getCustomerName(order) {
  const customer = order.user || order.customer;

  if (typeof customer === "string") return customer;

  return (
    customer?.name ||
    customer?.fullName ||
    customer?.username ||
    order.shippingAddress?.fullName ||
    "Customer"
  );
}

function getCustomerEmail(order) {
  const customer = order.user || order.customer;

  if (typeof customer === "object" && customer !== null) {
    return customer.email || "No email";
  }

  return order.email || "No email";
}

function getOrderAmount(order) {
  const amount =
    order.totalAmount ??
    order.total ??
    order.grandTotal ??
    order.totalPrice;

  if (amount !== undefined && amount !== null) {
    return Number(amount) || 0;
  }

  return (order.items || []).reduce((total, item) => {
    const price = Number(item.price ?? item.product?.price ?? 0);
    const quantity = Number(item.quantity ?? 1);

    return total + price * quantity;
  }, 0);
}

function getPaymentStatus(order) {
  return order.paymentStatus || "Pending";
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/orders/admin/all`, {
        method: "GET",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to fetch orders");
      }

      setOrders(data.orders || []);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Search and filter
  const filteredOrders = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return orders.filter((order) => {
      const orderId = String(order.orderId || order._id || "").toLowerCase();
      const customer = getCustomerName(order).toLowerCase();
      const email = getCustomerEmail(order).toLowerCase();

      const matchesSearch =
        !search ||
        orderId.includes(search) ||
        customer.includes(search) ||
        email.includes(search);

      const matchesStatus =
        selectedStatus === "All" ||
        order.orderStatus === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, selectedStatus]);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredOrders.length / ORDERS_PER_PAGE)
  );

  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * ORDERS_PER_PAGE;

  const currentOrders = filteredOrders.slice(
    startIndex,
    startIndex + ORDERS_PER_PAGE
  );

  // Summary cards
  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) => order.orderStatus === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) =>
      order.orderStatus === "Processing" ||
      order.orderStatus === "Confirmed"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  // Update order status
  const handleUpdateStatus = async () => {
    if (!editingOrder || !editStatus) return;

    try {
      setUpdating(true);
      setError("");
      setSuccessMessage("");

      const orderId = editingOrder._id;

      const response = await fetch(
        `${API_URL}/orders/${orderId}/status`,
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            orderStatus: editStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Status update failed");
      }

      setOrders((previousOrders) =>
        previousOrders.map((order) =>
          order._id === orderId
            ? {
                ...order,
                ...data.order,
                orderStatus:
                  data.order?.orderStatus || editStatus,
              }
            : order
        )
      );

      setEditingOrder(null);
      setEditStatus("");
      setSuccessMessage("Order status updated successfully.");

      await fetchOrders();
    } catch (err) {
      setError(err.message || "Unable to update order");
    } finally {
      setUpdating(false);
    }
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setEditStatus(order.orderStatus || "Pending");
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-[#B8791A]">
            Admin Panel
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0E14] sm:text-3xl">
            Orders
          </h1>

          <p className="mt-1 text-sm text-[#6B7280]">
            Manage customer orders, payments, and delivery status.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          disabled={loading}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-semibold text-[#374151] transition hover:bg-gray-50 disabled:opacity-50"
        >
          <RefreshCw
            size={16}
            className={loading ? "animate-spin" : ""}
          />
          Refresh
        </button>
      </div>

      {/* Messages */}
      {error && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {successMessage && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <span>{successMessage}</span>
          <button
            type="button"
            onClick={() => setSuccessMessage("")}
            aria-label="Dismiss message"
          >
            <X size={17} />
          </button>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            title: "Total Orders",
            value: totalOrders,
            icon: <ShoppingCart size={21} />,
            style: "bg-[#FFF5DC] text-[#B8791A]",
          },
          {
            title: "Pending",
            value: pendingOrders,
            icon: <Clock3 size={21} />,
            style: "bg-gray-100 text-gray-600",
          },
          {
            title: "Processing",
            value: processingOrders,
            icon: <PackageCheck size={21} />,
            style: "bg-[#FFF5DC] text-[#B8791A]",
          },
          {
            title: "Delivered",
            value: deliveredOrders,
            icon: <CheckCircle2 size={21} />,
            style: "bg-emerald-50 text-emerald-600",
          },
        ].map((card) => (
          <div
            key={card.title}
            className="rounded-2xl border border-[#E5E7EB] bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-[#6B7280]">
                  {card.title}
                </p>

                <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                  {card.value}
                </p>
              </div>

              <div
                className={`flex h-11 w-11 items-center justify-center rounded-xl ${card.style}`}
              >
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search and Filter */}
      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              size={19}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by order ID, customer, or email..."
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] pl-11 pr-4 text-sm outline-none transition focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            />
          </div>

          <div className="w-full lg:w-56">
            <select
              value={selectedStatus}
              onChange={(event) => {
                setSelectedStatus(event.target.value);
                setCurrentPage(1);
              }}
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-4 text-sm text-[#374151] outline-none focus:border-[#B8791A]"
            >
              <option value="All">All Statuses</option>

              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Orders Table */}
      <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
        <div className="border-b border-[#E5E7EB] px-5 py-4">
          <h2 className="font-bold text-[#0A0E14]">
            Order List
          </h2>

          <p className="mt-1 text-xs text-[#9CA3AF]">
            Showing{" "}
            {filteredOrders.length === 0 ? 0 : startIndex + 1}
            {" - "}
            {Math.min(
              startIndex + ORDERS_PER_PAGE,
              filteredOrders.length
            )}{" "}
            of {filteredOrders.length} orders
          </p>
        </div>

        {loading ? (
          <div className="flex min-h-80 flex-col items-center justify-center gap-3 text-[#6B7280]">
            <RefreshCw size={25} className="animate-spin" />
            <p className="text-sm">Loading orders...</p>
          </div>
        ) : currentOrders.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6] text-[#9CA3AF]">
              <ShoppingCart size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#0A0E14]">
              No orders found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-[#6B7280]">
              There are no orders matching your search or status filter.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
                    {[
                      "Order",
                      "Customer",
                      "Items",
                      "Amount",
                      "Payment",
                      "Status",
                      "Date",
                      "Actions",
                    ].map((heading) => (
                      <th
                        key={heading}
                        className={`px-5 py-3 text-xs font-semibold uppercase tracking-wide text-[#6B7280] ${
                          heading === "Actions" ? "text-right" : "text-left"
                        }`}
                      >
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E5E7EB]">
                  {currentOrders.map((order) => {
                    const orderId = order.orderId || order._id;
                    const itemCount = (order.items || []).reduce(
                      (total, item) =>
                        total + Number(item.quantity || 1),
                      0
                    );

                    const paymentStatus = getPaymentStatus(order);
                    const status = order.orderStatus || "Pending";

                    return (
                      <tr
                        key={order._id}
                        className="transition hover:bg-[#FAFAF8]"
                      >
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-[#0A0E14]">
                            #{String(orderId).slice(-8)}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-medium text-[#0A0E14]">
                            {getCustomerName(order)}
                          </p>

                          <p className="mt-1 text-xs text-[#9CA3AF]">
                            {getCustomerEmail(order)}
                          </p>
                        </td>

                        <td className="px-5 py-4 text-sm text-[#374151]">
                          {itemCount} {itemCount === 1 ? "item" : "items"}
                        </td>

                        <td className="px-5 py-4">
                          <p className="text-sm font-bold text-[#0A0E14]">
                            ${getOrderAmount(order).toFixed(2)}
                          </p>
                        </td>

                        <td className="px-5 py-4">
                          <span className="text-sm font-semibold text-[#6B7280]">
                            {paymentStatus}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <span
                            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                              status
                            )}`}
                          >
                            {getStatusIcon(status)}
                            {status}
                          </span>
                        </td>

                        <td className="whitespace-nowrap px-5 py-4 text-sm text-[#6B7280]">
                          {formatDate(order.createdAt)}
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex justify-end gap-1.5">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(order)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#0A0E14]"
                              title="View order"
                              aria-label="View order"
                            >
                              <Eye size={17} />
                            </button>

                            <button
                              type="button"
                              onClick={() => handleEditOrder(order)}
                              className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#FFF5DC] hover:text-[#B8791A]"
                              title="Edit order status"
                              aria-label="Edit order status"
                            >
                              <Pencil size={17} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#6B7280]">
                Page {safeCurrentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) => Math.max(1, page - 1))
                  }
                  disabled={safeCurrentPage === 1}
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  Previous
                </button>

                <span className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#0A0E14] px-3 text-sm font-semibold text-white">
                  {safeCurrentPage}
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setCurrentPage((page) =>
                      Math.min(totalPages, page + 1)
                    )
                  }
                  disabled={safeCurrentPage === totalPages}
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium disabled:opacity-40"
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* View Order Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between border-b border-[#E5E7EB] pb-4">
              <div>
                <h2 className="text-lg font-bold text-[#0A0E14]">
                  Order Details
                </h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  Order #{String(
                    selectedOrder.orderId || selectedOrder._id
                  ).slice(-8)}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-xs text-gray-500">Customer</p>
                <p className="mt-1 text-sm font-semibold">
                  {getCustomerName(selectedOrder)}
                </p>
                <p className="text-sm text-gray-500">
                  {getCustomerEmail(selectedOrder)}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Order Status</p>
                <span
                  className={`mt-1 inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                    selectedOrder.orderStatus
                  )}`}
                >
                  {getStatusIcon(selectedOrder.orderStatus)}
                  {selectedOrder.orderStatus || "Pending"}
                </span>
              </div>

              <div>
                <p className="text-xs text-gray-500">Payment Method</p>
                <p className="mt-1 text-sm font-semibold">
                  {selectedOrder.paymentMethod || "—"}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">Payment Status</p>
                <p className="mt-1 text-sm font-semibold">
                  {getPaymentStatus(selectedOrder)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="font-bold text-[#0A0E14]">
                Ordered Items
              </h3>

              <div className="mt-3 divide-y divide-gray-100">
                {(selectedOrder.items || []).map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex items-center justify-between gap-3 py-3"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {item.product?.name ||
                          item.product?.title ||
                          item.name ||
                          "Product"}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        Quantity: {item.quantity || 1}
                      </p>
                    </div>

                    <p className="text-sm font-bold">
                      $
                      {(
                        Number(item.price ?? item.product?.price ?? 0) *
                        Number(item.quantity || 1)
                      ).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[#FAFAF8] p-4">
              <h3 className="font-bold text-sm">Shipping Address</h3>

              <p className="mt-2 text-sm text-gray-600">
                {selectedOrder.shippingAddress?.fullName || ""}
              </p>

              <p className="text-sm text-gray-600">
                {selectedOrder.shippingAddress?.phone || ""}
              </p>

              <p className="text-sm text-gray-600">
                {selectedOrder.shippingAddress?.address || ""}
              </p>

              <p className="text-sm text-gray-600">
                {[
                  selectedOrder.shippingAddress?.city,
                  selectedOrder.shippingAddress?.country,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>

            <div className="mt-5 flex justify-between border-t border-gray-200 pt-4">
              <span className="font-bold">Order Total</span>
              <span className="text-lg font-bold">
                ${getOrderAmount(selectedOrder).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Edit Status Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-[#0A0E14]">
                Update Order Status
              </h2>

              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <p className="mt-2 text-sm text-gray-500">
              Select a new status for this order.
            </p>

            <label className="mt-5 block text-sm font-semibold text-gray-700">
              Order Status
            </label>

            <select
              value={editStatus}
              onChange={(event) => setEditStatus(event.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-gray-200 bg-[#FAFAF8] px-3 text-sm outline-none focus:border-[#B8791A]"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setEditingOrder(null)}
                disabled={updating}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleUpdateStatus}
                disabled={
                  updating ||
                  editStatus === editingOrder.orderStatus
                }
                className="inline-flex items-center gap-2 rounded-xl bg-[#0A0E14] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#171d29] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {updating && (
                  <RefreshCw size={15} className="animate-spin" />
                )}
                {updating ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
