import React, { useMemo, useState } from "react";
import {
  Search,
  Users,
  Eye,
  Pencil,
  Trash2,
  ShieldCheck,
  UserCheck,
  UserX,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

// =========================================
// Demo Users
// Backend connect hone ke baad ye data
// API / database se ayega.
// =========================================

const users = [
  {
    id: "USR-1001",
    name: "Ali Raza",
    email: "ali@example.com",
    role: "Customer",
    status: "Active",
    orders: 8,
    joined: "Sep 12, 2026",
  },
  {
    id: "USR-1002",
    name: "Sara Ahmed",
    email: "sara@example.com",
    role: "Customer",
    status: "Active",
    orders: 12,
    joined: "Sep 10, 2026",
  },
  {
    id: "USR-1003",
    name: "Hamza Khan",
    email: "hamza@example.com",
    role: "Customer",
    status: "Active",
    orders: 5,
    joined: "Sep 08, 2026",
  },
  {
    id: "USR-1004",
    name: "Ayesha Malik",
    email: "ayesha@example.com",
    role: "Customer",
    status: "Inactive",
    orders: 3,
    joined: "Sep 05, 2026",
  },
  {
    id: "USR-1005",
    name: "Usman Tariq",
    email: "usman@example.com",
    role: "Customer",
    status: "Active",
    orders: 15,
    joined: "Sep 02, 2026",
  },
  {
    id: "USR-1006",
    name: "Maha Noor",
    email: "maha@example.com",
    role: "Customer",
    status: "Active",
    orders: 7,
    joined: "Aug 29, 2026",
  },
  {
    id: "USR-1007",
    name: "Bilal Ahmed",
    email: "bilal@example.com",
    role: "Customer",
    status: "Active",
    orders: 10,
    joined: "Aug 26, 2026",
  },
  {
    id: "USR-1008",
    name: "Hira Shah",
    email: "hira@example.com",
    role: "Customer",
    status: "Inactive",
    orders: 2,
    joined: "Aug 23, 2026",
  },
  {
    id: "USR-1009",
    name: "Danish Ali",
    email: "danish@example.com",
    role: "Customer",
    status: "Active",
    orders: 9,
    joined: "Aug 20, 2026",
  },
  {
    id: "USR-1010",
    name: "Zainab Iqbal",
    email: "zainab@example.com",
    role: "Customer",
    status: "Active",
    orders: 6,
    joined: "Aug 18, 2026",
  },
  {
    id: "USR-1011",
    name: "Admin User",
    email: "admin@voltora.com",
    role: "Admin",
    status: "Active",
    orders: 0,
    joined: "Aug 10, 2026",
  },
  {
    id: "USR-1012",
    name: "Ahmed Hassan",
    email: "ahmed@example.com",
    role: "Customer",
    status: "Active",
    orders: 4,
    joined: "Aug 07, 2026",
  },
];

const USERS_PER_PAGE = 8;

const roleOptions = [
  "All",
  "Customer",
  "Admin",
];

const statusOptions = [
  "All",
  "Active",
  "Inactive",
];

// =========================================
// Component
// =========================================

export default function AdminUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] =
    useState("All");
  const [selectedStatus, setSelectedStatus] =
    useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  // =========================================
  // Filter Users
  // =========================================

  const filteredUsers = useMemo(() => {
    const search = searchTerm
      .toLowerCase()
      .trim();

    return users.filter((user) => {
      const matchesSearch =
        !search ||
        user.name
          .toLowerCase()
          .includes(search) ||
        user.email
          .toLowerCase()
          .includes(search) ||
        user.id
          .toLowerCase()
          .includes(search);

      const matchesRole =
        selectedRole === "All" ||
        user.role === selectedRole;

      const matchesStatus =
        selectedStatus === "All" ||
        user.status === selectedStatus;

      return (
        matchesSearch &&
        matchesRole &&
        matchesStatus
      );
    });
  }, [
    searchTerm,
    selectedRole,
    selectedStatus,
  ]);

  // =========================================
  // Pagination
  // =========================================

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredUsers.length / USERS_PER_PAGE
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const startIndex =
    (safeCurrentPage - 1) *
    USERS_PER_PAGE;

  const endIndex =
    startIndex + USERS_PER_PAGE;

  const currentUsers = filteredUsers.slice(
    startIndex,
    endIndex
  );

  // =========================================
  // Stats
  // =========================================

  const totalUsers = users.length;

  const activeUsers = users.filter(
    (user) => user.status === "Active"
  ).length;

  const adminUsers = users.filter(
    (user) => user.role === "Admin"
  ).length;

  const inactiveUsers = users.filter(
    (user) => user.status === "Inactive"
  ).length;

  // =========================================
  // Handlers
  // =========================================

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleRoleChange = (event) => {
    setSelectedRole(event.target.value);
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

  const handleViewUser = (user) => {
    console.log("View user:", user);
  };

  const handleEditUser = (user) => {
    console.log("Edit user:", user);
  };

  const handleDeleteUser = (user) => {
    console.log("Delete user:", user);
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
          Users
        </h1>

        <p className="mt-1 text-sm text-[#6B7280]">
          Manage customer accounts, roles, and user
          status.
        </p>
      </div>

      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total Users */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Total Users
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {totalUsers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5DC] text-[#B8791A]">
              <Users size={21} />
            </div>
          </div>
        </div>

        {/* Active Users */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Active Users
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {activeUsers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <UserCheck size={21} />
            </div>
          </div>
        </div>

        {/* Admin Users */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Admin Users
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {adminUsers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#FFF5DC] text-[#B8791A]">
              <ShieldCheck size={21} />
            </div>
          </div>
        </div>

        {/* Inactive */}

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#6B7280]">
                Inactive Users
              </p>

              <p className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {inactiveUsers}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 text-gray-600">
              <UserX size={21} />
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
              placeholder="Search by name, email, or user ID..."
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] pl-11 pr-4 text-sm text-[#0A0E14] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            />
          </div>

          {/* Role */}

          <div className="w-full lg:w-48">
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-4 text-sm text-[#374151] outline-none transition focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            >
              {roleOptions.map((role) => (
                <option
                  key={role}
                  value={role}
                >
                  {role === "All"
                    ? "All Roles"
                    : role}
                </option>
              ))}
            </select>
          </div>

          {/* Status */}

          <div className="w-full lg:w-48">
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
          USERS TABLE
      ===================================== */}

      <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
        {/* Table Header */}

        <div className="flex flex-col gap-2 border-b border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-bold text-[#0A0E14]">
              User List
            </h2>

            <p className="mt-1 text-xs text-[#9CA3AF]">
              Showing{" "}
              {filteredUsers.length === 0
                ? 0
                : startIndex + 1}
              -
              {Math.min(
                endIndex,
                filteredUsers.length
              )}{" "}
              of {filteredUsers.length} users
            </p>
          </div>
        </div>

        {/* Empty State */}

        {currentUsers.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6] text-[#9CA3AF]">
              <Users size={25} />
            </div>

            <h3 className="mt-4 text-base font-bold text-[#0A0E14]">
              No users found
            </h3>

            <p className="mt-1 max-w-sm text-sm text-[#6B7280]">
              Try changing your search or filter
              options.
            </p>
          </div>
        ) : (
          <>
            {/* Responsive Table */}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      User
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Role
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Orders
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Status
                    </th>

                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Joined
                    </th>

                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E5E7EB]">
                  {currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-[#FAFAF8]"
                    >
                      {/* User */}

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {/* Avatar */}

                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A0E14] text-sm font-bold text-[#FFB020]">
                            {user.name
                              .split(" ")
                              .map(
                                (word) =>
                                  word[0]
                              )
                              .join("")
                              .slice(0, 2)
                              .toUpperCase()}
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-[#0A0E14]">
                              {user.name}
                            </p>

                            <p className="mt-1 truncate text-xs text-[#9CA3AF]">
                              {user.email}
                            </p>

                            <p className="mt-1 text-[11px] text-[#B0B5BD]">
                              {user.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Role */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            user.role === "Admin"
                              ? "bg-[#FFF5DC] text-[#9A6500]"
                              : "bg-[#F3F4F6] text-[#4B5563]"
                          }`}
                        >
                          {user.role ===
                            "Admin" && (
                            <ShieldCheck
                              size={13}
                            />
                          )}

                          {user.role}
                        </span>
                      </td>

                      {/* Orders */}

                      <td className="px-5 py-4">
                        <span className="text-sm font-semibold text-[#0A0E14]">
                          {user.orders}
                        </span>
                      </td>

                      {/* Status */}

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                            user.status ===
                            "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      {/* Joined */}

                      <td className="px-5 py-4">
                        <span className="whitespace-nowrap text-sm text-[#6B7280]">
                          {user.joined}
                        </span>
                      </td>

                      {/* Actions */}

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          {/* View */}

                          <button
                            type="button"
                            onClick={() =>
                              handleViewUser(
                                user
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#0A0E14]"
                            title="View user"
                            aria-label={`View ${user.name}`}
                          >
                            <Eye size={17} />
                          </button>

                          {/* Edit */}

                          <button
                            type="button"
                            onClick={() =>
                              handleEditUser(
                                user
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#FFF5DC] hover:text-[#B8791A]"
                            title="Edit user"
                            aria-label={`Edit ${user.name}`}
                          >
                            <Pencil size={17} />
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDeleteUser(
                                user
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-red-50 hover:text-red-600"
                            title="Delete user"
                            aria-label={`Delete ${user.name}`}
                          >
                            <Trash2 size={17} />
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

