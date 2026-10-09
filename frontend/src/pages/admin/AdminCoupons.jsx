import React, { useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Eye,
  TicketPercent,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

const coupons = [
  {
    id: 1,
    code: "WELCOME10",
    type: "Percentage",
    discount: 10,
    minOrder: 50,
    usageLimit: 100,
    used: 42,
    status: "Active",
    expiry: "Oct 15, 2026",
  },
  {
    id: 2,
    code: "SAVE20",
    type: "Percentage",
    discount: 20,
    minOrder: 100,
    usageLimit: 200,
    used: 128,
    status: "Active",
    expiry: "Oct 30, 2026",
  },
  {
    id: 3,
    code: "TECH500",
    type: "Fixed",
    discount: 500,
    minOrder: 5000,
    usageLimit: 50,
    used: 50,
    status: "Expired",
    expiry: "Sep 10, 2026",
  },
  {
    id: 4,
    code: "NEWUSER15",
    type: "Percentage",
    discount: 15,
    minOrder: 75,
    usageLimit: 150,
    used: 37,
    status: "Active",
    expiry: "Nov 05, 2026",
  },
  {
    id: 5,
    code: "FLASH1000",
    type: "Fixed",
    discount: 1000,
    minOrder: 10000,
    usageLimit: 25,
    used: 8,
    status: "Scheduled",
    expiry: "Oct 01, 2026",
  },
  {
    id: 6,
    code: "SUMMER25",
    type: "Percentage",
    discount: 25,
    minOrder: 150,
    usageLimit: 100,
    used: 100,
    status: "Expired",
    expiry: "Sep 01, 2026",
  },
  {
    id: 7,
    code: "ELECTRO5",
    type: "Percentage",
    discount: 5,
    minOrder: 25,
    usageLimit: 500,
    used: 91,
    status: "Active",
    expiry: "Dec 15, 2026",
  },
  {
    id: 8,
    code: "DEAL200",
    type: "Fixed",
    discount: 200,
    minOrder: 3000,
    usageLimit: 75,
    used: 22,
    status: "Scheduled",
    expiry: "Oct 10, 2026",
  },
];

const statusOptions = ["All", "Active", "Scheduled", "Expired"];
const typeOptions = ["All", "Percentage", "Fixed"];

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-green-50 text-green-700 border-green-200",
    Scheduled: "bg-yellow-50 text-yellow-700 border-yellow-200",
    Expired: "bg-red-50 text-red-700 border-red-200",
  };

  const icons = {
    Active: CheckCircle2,
    Scheduled: Clock3,
    Expired: XCircle,
  };

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${styles[status]}`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

export default function AdminCoupons() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const couponsPerPage = 6;

  const filteredCoupons = useMemo(() => {
    return coupons.filter((coupon) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        coupon.code.toLowerCase().includes(search) ||
        coupon.type.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        coupon.status === statusFilter;

      const matchesType =
        typeFilter === "All" ||
        coupon.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [searchTerm, statusFilter, typeFilter]);

  const totalPages = Math.ceil(
    filteredCoupons.length / couponsPerPage
  );

  const startIndex = (currentPage - 1) * couponsPerPage;

  const currentCoupons = filteredCoupons.slice(
    startIndex,
    startIndex + couponsPerPage
  );

  const activeCount = coupons.filter(
    (coupon) => coupon.status === "Active"
  ).length;

  const scheduledCount = coupons.filter(
    (coupon) => coupon.status === "Scheduled"
  ).length;

  const expiredCount = coupons.filter(
    (coupon) => coupon.status === "Expired"
  ).length;

  const handleAddCoupon = () => {
    console.log("Add coupon");
  };

  const handleView = (coupon) => {
    console.log("View coupon:", coupon);
  };

  const handleEdit = (coupon) => {
    console.log("Edit coupon:", coupon);
  };

  const handleDelete = (coupon) => {
    console.log("Delete coupon:", coupon);
  };

  const handleFilterChange = (setter, value) => {
    setter(value);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A0E14]">
            Coupons
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create and manage discount coupons for your store.
          </p>
        </div>

        <button
          type="button"
          onClick={handleAddCoupon}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#0A0E14] px-5 py-2.5 text-sm font-semibold text-[#FFB020] transition hover:bg-[#14181F]"
        >
          <Plus size={18} />
          Add Coupon
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Coupons
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {coupons.length}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF5DF]">
              <TicketPercent
                size={21}
                className="text-[#B8791A]"
              />
            </div>
          </div>
        </div>

        {/* Active */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Active
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {activeCount}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle2
                size={21}
                className="text-green-600"
              />
            </div>
          </div>
        </div>

        {/* Scheduled */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Scheduled
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {scheduledCount}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-yellow-50">
              <Clock3
                size={21}
                className="text-yellow-600"
              />
            </div>
          </div>
        </div>

        {/* Expired */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Expired
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {expiredCount}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-red-50">
              <XCircle
                size={21}
                className="text-red-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* Search */}
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search coupon code..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) =>
              handleFilterChange(
                setStatusFilter,
                e.target.value
              )
            }
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
          >
            {statusOptions.map((status) => (
              <option key={status} value={status}>
                {status === "All"
                  ? "All Status"
                  : status}
              </option>
            ))}
          </select>

          {/* Type */}
          <select
            value={typeFilter}
            onChange={(e) =>
              handleFilterChange(
                setTypeFilter,
                e.target.value
              )
            }
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
          >
            {typeOptions.map((type) => (
              <option key={type} value={type}>
                {type === "All"
                  ? "All Types"
                  : type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Coupons Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Coupon
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Discount
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Min. Order
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Usage
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Expiry
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentCoupons.length > 0 ? (
                currentCoupons.map((coupon) => {
                  const usagePercentage =
                    coupon.usageLimit > 0
                      ? Math.round(
                          (coupon.used /
                            coupon.usageLimit) *
                            100
                        )
                      : 0;

                  return (
                    <tr
                      key={coupon.id}
                      className="border-b border-gray-100 transition hover:bg-gray-50"
                    >
                      {/* Coupon */}
                      <td className="px-5 py-4">
                        <div>
                          <p className="font-bold tracking-wide text-[#0A0E14]">
                            {coupon.code}
                          </p>

                          <p className="mt-1 text-xs text-gray-500">
                            {coupon.type} discount
                          </p>
                        </div>
                      </td>

                      {/* Discount */}
                      <td className="px-5 py-4">
                        <span className="font-semibold text-[#B8791A]">
                          {coupon.type === "Percentage"
                            ? `${coupon.discount}%`
                            : `Rs. ${coupon.discount.toLocaleString()}`}
                        </span>
                      </td>

                      {/* Minimum Order */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        Rs.{" "}
                        {coupon.minOrder.toLocaleString()}
                      </td>

                      {/* Usage */}
                      <td className="px-5 py-4">
                        <div className="w-36">
                          <div className="mb-1 flex items-center justify-between text-xs">
                            <span className="text-gray-500">
                              {coupon.used}/
                              {coupon.usageLimit}
                            </span>

                            <span className="font-semibold text-gray-700">
                              {usagePercentage}%
                            </span>
                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className="h-full rounded-full bg-[#FFB020]"
                              style={{
                                width: `${Math.min(
                                  usagePercentage,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </td>

                      {/* Expiry */}
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {coupon.expiry}
                      </td>

                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={coupon.status}
                        />
                      </td>

                      {/* Actions */}
                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              handleView(coupon)
                            }
                            title="View coupon"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-[#FFB020] hover:bg-[#FFF5DF] hover:text-[#B8791A]"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleEdit(coupon)
                            }
                            title="Edit coupon"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-[#FFB020] hover:bg-[#FFF5DF] hover:text-[#B8791A]"
                          >
                            <Pencil size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(coupon)
                            }
                            title="Delete coupon"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center"
                  >
                    <TicketPercent
                      size={36}
                      className="mx-auto text-gray-300"
                    />

                    <h3 className="mt-3 text-base font-semibold text-[#0A0E14]">
                      No coupons found
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-700">
                {Math.min(
                  startIndex + couponsPerPage,
                  filteredCoupons.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {filteredCoupons.length}
              </span>{" "}
              coupons
            </p>

            <div className="flex items-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.max(page - 1, 1)
                  )
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              ).map((page) => (
                <button
                  key={page}
                  type="button"
                  onClick={() => setCurrentPage(page)}
                  className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                    currentPage === page
                      ? "bg-[#0A0E14] text-[#FFB020]"
                      : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((page) =>
                    Math.min(page + 1, totalPages)
                  )
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}