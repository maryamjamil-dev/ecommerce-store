import React, { useMemo, useState } from "react";
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
} from "lucide-react";



const orders = [
  {
    id: "#ORD-1001",
    customer: "Ali Raza",
    email: "ali@example.com",
    items: 3,
    amount: "$289.97",
    payment: "Paid",
    status: "Delivered",
    date: "Sep 28, 2026",
  },
  {
    id: "#ORD-1002",
    customer: "Sara Ahmed",
    email: "sara@example.com",
    items: 2,
    amount: "$159.98",
    payment: "Paid",
    status: "Shipped",
    date: "Sep 28, 2026",
  },
  {
    id: "#ORD-1003",
    customer: "Hamza Khan",
    email: "hamza@example.com",
    items: 1,
    amount: "$129.99",
    payment: "Paid",
    status: "Processing",
    date: "Sep 27, 2026",
  },
  {
    id: "#ORD-1004",
    customer: "Ayesha Malik",
    email: "ayesha@example.com",
    items: 4,
    amount: "$549.96",
    payment: "Pending",
    status: "Pending",
    date: "Sep 27, 2026",
  },
  {
    id: "#ORD-1005",
    customer: "Usman Tariq",
    email: "usman@example.com",
    items: 2,
    amount: "$219.98",
    payment: "Paid",
    status: "Delivered",
    date: "Sep 26, 2026",
  },
  {
    id: "#ORD-1006",
    customer: "Maha Noor",
    email: "maha@example.com",
    items: 1,
    amount: "$89.99",
    payment: "Paid",
    status: "Shipped",
    date: "Sep 26, 2026",
  },
  {
    id: "#ORD-1007",
    customer: "Bilal Ahmed",
    email: "bilal@example.com",
    items: 5,
    amount: "$799.95",
    payment: "Paid",
    status: "Processing",
    date: "Sep 25, 2026",
  },
  {
    id: "#ORD-1008",
    customer: "Hira Shah",
    email: "hira@example.com",
    items: 2,
    amount: "$249.98",
    payment: "Refunded",
    status: "Cancelled",
    date: "Sep 25, 2026",
  },
  {
    id: "#ORD-1009",
    customer: "Danish Ali",
    email: "danish@example.com",
    items: 3,
    amount: "$399.97",
    payment: "Paid",
    status: "Delivered",
    date: "Sep 24, 2026",
  },
  {
    id: "#ORD-1010",
    customer: "Zainab Iqbal",
    email: "zainab@example.com",
    items: 1,
    amount: "$349.99",
    payment: "Paid",
    status: "Shipped",
    date: "Sep 24, 2026",
  },
  {
    id: "#ORD-1011",
    customer: "Ahmed Hassan",
    email: "ahmed@example.com",
    items: 2,
    amount: "$179.98",
    payment: "Pending",
    status: "Pending",
    date: "Sep 23, 2026",
  },
  {
    id: "#ORD-1012",
    customer: "Maryam Khan",
    email: "maryam@example.com",
    items: 3,
    amount: "$429.97",
    payment: "Paid",
    status: "Delivered",
    date: "Sep 23, 2026",
  },
];

const ORDERS_PER_PAGE = 8;

const statusOptions = [
  "All",
  "Pending",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
];

// =========================================
// Status Helpers
// =========================================

function getStatusClasses(status) {
  switch (status) {
    case "Delivered":
      return "bg-emerald-50 text-emerald-700";

    case "Shipped":
      return "bg-blue-50 text-blue-700";

    case "Processing":
      return "bg-[#FFF5DC] text-[#9A6500]";

    case "Pending":
      return "bg-gray-100 text-gray-700";

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
      return <PackageCheck size={14} />;

    case "Pending":
      return <Clock3 size={14} />;

    case "Cancelled":
      return <XCircle size={14} />;

    default:
      return <Clock3 size={14} />;
  }
}

function getPaymentClasses(payment) {
  switch (payment) {
    case "Paid":
      return "text-emerald-600";

    case "Pending":
      return "text-[#B8791A]";

    case "Refunded":
      return "text-red-600";

    default:
      return "text-[#6B7280]";
  }
}

// =========================================
// Component
// =========================================

export default function AdminOrders() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] =
    useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================
  // Filter Orders
  // =========================================

  const filteredOrders = useMemo(() => {
    const search = searchTerm
      .toLowerCase()
      .trim();

    return orders.filter((order) => {
      const matchesSearch =
        !search ||
        order.id.toLowerCase().includes(search) ||
        order.customer
          .toLowerCase()
          .includes(search) ||
        order.email.toLowerCase().includes(search);

      const matchesStatus =
        selectedStatus === "All" ||
        order.status === selectedStatus;

      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, selectedStatus]);

  // =========================================
  // Pagination
  // =========================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredOrders.length / ORDERS_PER_PAGE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    ORDERS_PER_PAGE;

  const endIndex =
    startIndex + ORDERS_PER_PAGE;

  const currentOrders = filteredOrders.slice(
    startIndex,
    endIndex
  );

  // =========================================
  // Stats
  // =========================================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.status === "Pending"
  ).length;

  const processingOrders = orders.filter(
    (order) =>
      order.status === "Processing"
  ).length;

  const deliveredOrders = orders.filter(
    (order) =>
      order.status === "Delivered"
  ).length;

  // =========================================
  // Handlers
  // =========================================

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleStatusChange = (event) => {
    setSelectedStatus(event.target.value);
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((page) =>
      Math.max(1, page - 1)
    );
  };

  const handleNextPage = () => {
    setCurrentPage((page) =>
      Math.min(totalPages, page + 1)
    );
  };

  const handleViewOrder = (order) => {
    console.log("View order:", order);
  };

  const handleEditOrder = (order) => {
    console.log("Edit order:", order);
  };

  return (
    <div className="space-y-6">
      {/* =====================================
          PAGE HEADER
      ===================================== */}

      <div>
        <p className="text-sm font-medium text-[#B8791A]">
          Admin Panel
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0E14] sm:text-3xl">
          Orders
        </h1>

        <p className="mt-1 text-sm text-[#6B7280]">
          Manage customer orders, payments, and
          delivery status.
        </p>
      </div>

      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Orders */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Total Orders
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {totalOrders}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5DC] text-[#B8791A]">
              <ShoppingCart size={21} />
            </div>
          </div>
        </div>

        {/* Pending */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Pending
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {pendingOrders}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <Clock3 size={21} />
            </div>
          </div>
        </div>

        {/* Processing */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Processing
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {processingOrders}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5DC] text-[#B8791A]">
              <PackageCheck size={21} />
            </div>
          </div>
        </div>

        {/* Delivered */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Delivered
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {deliveredOrders}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <CheckCircle2 size={21} />
            </div>
          </div>
        </div>
      </div>

      {/* =====================================
          FILTERS
      ===================================== */}

      <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          {/* Search */}

          <div className="relative min-w-0 flex-1">
            <Search
              size={19}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9CA3AF]"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search by order ID, customer, or email..."
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] pl-11 pr-4 text-sm text-[#0A0E14] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            />
          </div>

          {/* Status */}

          <div className="w-full lg:w-56">
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-4 text-sm text-[#374151] outline-none transition focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            >
              {statusOptions.map((status) => (
                <option
                  key={status}
                  value={status}
                >
                  {status === "All"
                    ? "All Statuses"
                    : status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* =====================================
          ORDERS TABLE
      ===================================== */}

      <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
        {/* Header */}

        <div className="flex flex-col gap-2 border-b border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-[#0A0E14]">
              Order List
            </h2>

            <p className="mt-1 text-xs text-[#9CA3AF]">
              Showing{" "}
              {filteredOrders.length === 0
                ? 0
                : startIndex + 1}
              -
              {Math.min(
                endIndex,
                filteredOrders.length
              )}{" "}
              of {filteredOrders.length} orders
            </p>
          </div>
        </div>

        {/* Empty State */}

        {currentOrders.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6] text-[#9CA3AF]">
              <ShoppingCart size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#0A0E14]">
              No orders found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-[#6B7280]">
              Try changing your search or status
              filter.
            </p>
          </div>
        ) : (
          <>
            {/* Responsive Table */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1050px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Order
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Customer
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Items
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Amount
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Payment
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Date
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E5E7EB]">
                  {currentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition hover:bg-[#FAFAF8]"
                    >
                      {/* Order */}

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-[#0A0E14]">
                          {order.id}
                        </p>
                      </td>

                      {/* Customer */}

                      <td className="px-5 py-4">
                        <div>
                          <p className="text-sm font-medium text-[#0A0E14]">
                            {order.customer}
                          </p>

                          <p className="mt-1 text-xs text-[#9CA3AF]">
                            {order.email}
                          </p>
                        </div>
                      </td>

                      {/* Items */}

                      <td className="px-5 py-4">
                        <span className="text-sm text-[#374151]">
                          {order.items}{" "}
                          {order.items === 1
                            ? "item"
                            : "items"}
                        </span>
                      </td>

                      {/* Amount */}

                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-[#0A0E14]">
                          {order.amount}
                        </p>
                      </td>

                      {/* Payment */}

                      <td className="px-5 py-4">
                        <span
                          className={`text-sm font-semibold ${getPaymentClasses(
                            order.payment
                          )}`}
                        >
                          {order.payment}
                        </span>
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClasses(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(
                            order.status
                          )}

                          {order.status}
                        </span>
                      </td>

                      {/* Date */}

                      <td className="px-5 py-4">
                        <span className="whitespace-nowrap text-sm text-[#6B7280]">
                          {order.date}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          {/* View */}

                          <button
                            type="button"
                            onClick={() =>
                              handleViewOrder(
                                order
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#0A0E14]"
                            title="View order"
                            aria-label={`View ${order.id}`}
                          >
                            <Eye size={17} />
                          </button>

                          {/* Edit */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEditOrder(
                                order
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#FFF5DC] hover:text-[#B8791A]"
                            title="Edit order"
                            aria-label={`Edit ${order.id}`}
                          >
                            <Pencil size={17} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* =================================
                PAGINATION
            ================================= */}

            <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#6B7280]">
                Page {safeCurrentPage} of{" "}
                {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePreviousPage}
                  disabled={safeCurrentPage === 1}
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium text-[#374151] transition hover:bg-[#F7F7F5] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />

                  <span className="hidden sm:inline">
                    Previous
                  </span>
                </button>

                <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#0A0E14] px-3 text-sm font-semibold text-white">
                  {safeCurrentPage}
                </div>

                <button
                  type="button"
                  onClick={handleNextPage}
                  disabled={
                    safeCurrentPage === totalPages
                  }
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium text-[#374151] transition hover:bg-[#F7F7F5] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">
                    Next
                  </span>

                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>
    </div>
  );
}

