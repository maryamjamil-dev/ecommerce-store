import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  RefreshCw,
  LoaderCircle,
  X,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/admin/users";
const USERS_PER_PAGE = 8;

const roleOptions = ["All", "Customer", "Admin"];
const statusOptions = ["All", "Verified", "Unverified"];

const normalizeUser = (u) => ({
  id: u._id || u.id || "",
  name: u.username || "Unnamed",
  email: u.email || "",
  role: u.role === "admin" ? "Admin" : "Customer",
  status: u.isEmailVerified ? "Verified" : "Unverified",
  joined: u.createdAt
    ? new Date(u.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "-",
});

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const [modal, setModal] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editRole, setEditRole] = useState("Customer");

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not load users.");
      }

      const list = Array.isArray(result)
        ? result
        : result.users || result.data || [];

      setUsers(list.map(normalizeUser));
    } catch (err) {
      setUsers([]);
      setError(err.message || "Backend unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const filteredUsers = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return users.filter((user) => {
      const matchesSearch =
        !search ||
        user.name.toLowerCase().includes(search) ||
        user.email.toLowerCase().includes(search) ||
        user.id.toLowerCase().includes(search);

      const matchesRole = selectedRole === "All" || user.role === selectedRole;
      const matchesStatus =
        selectedStatus === "All" || user.status === selectedStatus;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchTerm, selectedRole, selectedStatus]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / USERS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (safeCurrentPage - 1) * USERS_PER_PAGE;
  const endIndex = startIndex + USERS_PER_PAGE;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const totalUsers = users.length;
  const verifiedUsers = users.filter((u) => u.status === "Verified").length;
  const adminUsers = users.filter((u) => u.role === "Admin").length;
  const unverifiedUsers = users.filter((u) => u.status === "Unverified").length;

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };
  const handleRoleChange = (e) => {
    setSelectedRole(e.target.value);
    setCurrentPage(1);
  };
  const handleStatusChange = (e) => {
    setSelectedStatus(e.target.value);
    setCurrentPage(1);
  };

  const openViewModal = (user) => {
    setSelectedUser(user);
    setModal("view");
  };

  const openEditModal = (user) => {
    setSelectedUser(user);
    setEditRole(user.role);
    setError("");
    setModal("edit");
  };

  const closeModal = () => {
    if (saving) return;
    setModal("");
    setSelectedUser(null);
    setError("");
  };

  const handleSaveEdit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${selectedUser.id}`, {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          role: editRole === "Admin" ? "admin" : "user",
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not update user.");
      }

      setModal("");
      setSelectedUser(null);
      setSuccess("User role updated successfully.");
      await fetchUsers();
    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteUser = async (user) => {
    if (!window.confirm(`Are you sure you want to delete "${user.name}"?`)) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${user.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Could not delete user.");
      }

      setSuccess("User deleted successfully.");
      await fetchUsers();
    } catch (err) {
      setError(err.message || "Unable to delete user.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-[#B8791A]">Admin Panel</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-[#0A0E14] sm:text-3xl">
          Users
        </h1>
        <p className="mt-1 text-sm text-[#6B7280]">
          Manage customer accounts, roles, and verification status.
        </p>
      </div>

      {/* Notifications */}
      {error && !modal && (
        <div className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          <span>{error}</span>
          <button onClick={() => setError("")} aria-label="Dismiss error">
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 p-4 text-sm text-green-700">
          <span>{success}</span>
          <button onClick={() => setSuccess("")} aria-label="Dismiss message">
            <X size={18} />
          </button>
        </div>
      )}

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Total Users" value={totalUsers} icon={<Users size={21} />} />
        <StatCard
          title="Verified Users"
          value={verifiedUsers}
          icon={<UserCheck size={21} />}
          tone="green"
        />
        <StatCard title="Admin Users" value={adminUsers} icon={<ShieldCheck size={21} />} />
        <StatCard
          title="Unverified Users"
          value={unverifiedUsers}
          icon={<UserX size={21} />}
          tone="gray"
        />
      </div>

      {/* Filters */}
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
              onChange={handleSearchChange}
              placeholder="Search by name, email, or user ID..."
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] pl-11 pr-4 text-sm text-[#0A0E14] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            />
          </div>

          <div className="w-full lg:w-48">
            <select
              value={selectedRole}
              onChange={handleRoleChange}
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-4 text-sm text-[#374151] outline-none transition focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role === "All" ? "All Roles" : role}
                </option>
              ))}
            </select>
          </div>

          <div className="w-full lg:w-48">
            <select
              value={selectedStatus}
              onChange={handleStatusChange}
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-4 text-sm text-[#374151] outline-none transition focus:border-[#B8791A] focus:ring-2 focus:ring-[#FFB020]/20"
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status === "All" ? "All Statuses" : status}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* Users table */}
      <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
        <div className="flex items-center justify-between gap-2 border-b border-[#E5E7EB] px-5 py-4">
          <div>
            <h2 className="font-bold text-[#0A0E14]">User List</h2>
            <p className="mt-1 text-xs text-[#9CA3AF]">
              Showing {filteredUsers.length === 0 ? 0 : startIndex + 1}-
              {Math.min(endIndex, filteredUsers.length)} of {filteredUsers.length} users
            </p>
          </div>

          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-80 items-center justify-center gap-3 text-sm text-[#6B7280]">
            <LoaderCircle className="animate-spin" size={21} />
            Loading users...
          </div>
        ) : currentUsers.length === 0 ? (
          <div className="flex min-h-80 flex-col items-center justify-center px-5 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F3F4F6] text-[#9CA3AF]">
              <Users size={25} />
            </div>
            <h3 className="mt-4 text-base font-bold text-[#0A0E14]">No users found</h3>
            <p className="mt-1 max-w-sm text-sm text-[#6B7280]">
              Try changing your search or filter options.
            </p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAF8]">
                    {["User", "Role", "Status", "Joined"].map((h) => (
                      <th
                        key={h}
                        className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[#6B7280]"
                      >
                        {h}
                      </th>
                    ))}
                    <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wide text-[#6B7280]">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-[#E5E7EB]">
                  {currentUsers.map((user) => (
                    <tr key={user.id} className="transition hover:bg-[#FAFAF8]">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#0A0E14] text-sm font-bold text-[#FFB020]">
                            {user.name
                              .split(" ")
                              .map((word) => word[0])
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
                            <p className="mt-1 text-[11px] text-[#B0B5BD]">{user.id}</p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                            user.role === "Admin"
                              ? "bg-[#FFF5DC] text-[#9A6500]"
                              : "bg-[#F3F4F6] text-[#4B5563]"
                          }`}
                        >
                          {user.role === "Admin" && <ShieldCheck size={13} />}
                          {user.role}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center rounded-full px-3 py-1.5 text-xs font-semibold ${
                            user.status === "Verified"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-gray-100 text-gray-600"
                          }`}
                        >
                          {user.status}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span className="whitespace-nowrap text-sm text-[#6B7280]">
                          {user.joined}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openViewModal(user)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#F3F4F6] hover:text-[#0A0E14]"
                            title="View user"
                            aria-label={`View ${user.name}`}
                          >
                            <Eye size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => openEditModal(user)}
                            className="flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-[#FFF5DC] hover:text-[#B8791A]"
                            title="Edit role"
                            aria-label={`Edit ${user.name}`}
                          >
                            <Pencil size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteUser(user)}
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

            {/* Pagination */}
            <div className="flex flex-col gap-3 border-t border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#6B7280]">
                Page {safeCurrentPage} of {totalPages}
              </p>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={safeCurrentPage === 1}
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium text-[#374151] transition hover:bg-[#F7F7F5] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">Previous</span>
                </button>

                <div className="flex h-9 min-w-9 items-center justify-center rounded-lg bg-[#0A0E14] px-3 text-sm font-semibold text-white">
                  {safeCurrentPage}
                </div>

                <button
                  type="button"
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={safeCurrentPage === totalPages}
                  className="flex h-9 items-center gap-1 rounded-lg border border-[#E5E7EB] px-3 text-sm font-medium text-[#374151] transition hover:bg-[#F7F7F5] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <span className="hidden sm:inline">Next</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        )}
      </section>

      {/* View modal */}
      {modal === "view" && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0A0E14]">User Details</h2>
              <button onClick={closeModal} aria-label="Close details">
                <X size={21} />
              </button>
            </div>

            <dl className="mt-5 space-y-3 text-sm">
              <DetailRow label="Username" value={selectedUser.name} />
              <DetailRow label="Email" value={selectedUser.email} />
              <DetailRow label="User ID" value={selectedUser.id} />
              <DetailRow label="Role" value={selectedUser.role} />
              <DetailRow label="Status" value={selectedUser.status} />
              <DetailRow label="Joined" value={selectedUser.joined} />
            </dl>

            <button
              onClick={closeModal}
              className="mt-6 w-full rounded-xl bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Edit role modal */}
      {modal === "edit" && selectedUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-[#0A0E14]">Edit Role</h2>
                <p className="mt-1 text-sm text-[#6B7280]">
                  {selectedUser.name} ({selectedUser.email})
                </p>
              </div>
              <button onClick={closeModal} aria-label="Close modal">
                <X size={21} />
              </button>
            </div>

            {error && (
              <p className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p>
            )}

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <label className="block">
                <span className="mb-1.5 block text-sm font-semibold text-[#0A0E14]">
                  Role
                </span>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#FAFAF8] px-4 text-sm outline-none focus:border-[#B8791A]"
                >
                  <option value="Customer">Customer</option>
                  <option value="Admin">Admin</option>
                </select>
              </label>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  disabled={saving}
                  className="rounded-xl border border-[#E5E7EB] px-4 py-2.5 text-sm font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center gap-2 rounded-xl bg-[#0A0E14] px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-60"
                >
                  {saving && <LoaderCircle size={16} className="animate-spin" />}
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, tone = "amber" }) {
  const tones = {
    amber: "bg-[#FFF5DC] text-[#B8791A]",
    green: "bg-emerald-50 text-emerald-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-[#6B7280]">{title}</p>
          <p className="mt-2 text-2xl font-bold text-[#0A0E14]">{value}</p>
        </div>
        <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${tones[tone]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4 border-b border-[#F3F4F6] pb-2">
      <dt className="text-[#6B7280]">{label}</dt>
      <dd className="break-all text-right font-semibold text-[#0A0E14]">{value}</dd>
    </div>
  );
}