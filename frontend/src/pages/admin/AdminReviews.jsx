import React, { useMemo, useState } from "react";
import {
  Search,
  Star,
  Eye,
  Trash2,
  CheckCircle2,
  Clock3,
  MessageSquare,
} from "lucide-react";

const reviews = [
  {
    id: 1,
    customer: "Ali Raza",
    email: "ali@example.com",
    product: "Premium Wireless Headphones",
    rating: 5,
    review:
      "Excellent sound quality and very comfortable for long use. Highly recommended.",
    status: "Approved",
    date: "Sep 20, 2026",
  },
  {
    id: 2,
    customer: "Sarah Khan",
    email: "sarah@example.com",
    product: "Smart Pro Watch",
    rating: 4,
    review:
      "The watch looks great and the battery timing is good. Overall a nice product.",
    status: "Pending",
    date: "Sep 19, 2026",
  },
  {
    id: 3,
    customer: "Hamza Ahmed",
    email: "hamza@example.com",
    product: "Digital Camera",
    rating: 5,
    review:
      "Amazing camera quality. The pictures are sharp and the controls are easy to use.",
    status: "Approved",
    date: "Sep 18, 2026",
  },
  {
    id: 4,
    customer: "Ayesha Malik",
    email: "ayesha@example.com",
    product: "Bluetooth Speaker",
    rating: 3,
    review:
      "Sound is good but I expected a little more battery life.",
    status: "Pending",
    date: "Sep 17, 2026",
  },
  {
    id: 5,
    customer: "Usman Tariq",
    email: "usman@example.com",
    product: "Gaming Console",
    rating: 5,
    review:
      "Great gaming experience and very fast performance.",
    status: "Approved",
    date: "Sep 16, 2026",
  },
  {
    id: 6,
    customer: "Hina Shah",
    email: "hina@example.com",
    product: "Smart Pro Watch",
    rating: 2,
    review:
      "The product works but I had some issues with the setup.",
    status: "Rejected",
    date: "Sep 15, 2026",
  },
  {
    id: 7,
    customer: "Bilal Hassan",
    email: "bilal@example.com",
    product: "Laptop Pro 15",
    rating: 4,
    review:
      "Good performance and build quality. Delivery was also quick.",
    status: "Approved",
    date: "Sep 14, 2026",
  },
  {
    id: 8,
    customer: "Maham Noor",
    email: "maham@example.com",
    product: "Wireless Keyboard",
    rating: 5,
    review:
      "Very smooth typing experience and premium design.",
    status: "Pending",
    date: "Sep 13, 2026",
  },
];

const statusOptions = ["All", "Approved", "Pending", "Rejected"];
const ratingOptions = ["All", "5", "4", "3", "2", "1"];

function StatusBadge({ status }) {
  const styles = {
    Approved:
      "bg-green-50 text-green-700 border-green-200",
    Pending:
      "bg-yellow-50 text-yellow-700 border-yellow-200",
    Rejected:
      "bg-red-50 text-red-700 border-red-200",
  };

  const icons = {
    Approved: CheckCircle2,
    Pending: Clock3,
    Rejected: Trash2,
  };

  const Icon = icons[status];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold ${
        styles[status]
      }`}
    >
      <Icon size={13} />
      {status}
    </span>
  );
}

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          className={
            star <= rating
              ? "fill-[#FFB020] text-[#FFB020]"
              : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const reviewsPerPage = 6;

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        review.customer.toLowerCase().includes(search) ||
        review.email.toLowerCase().includes(search) ||
        review.product.toLowerCase().includes(search) ||
        review.review.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" ||
        review.status === statusFilter;

      const matchesRating =
        ratingFilter === "All" ||
        review.rating === Number(ratingFilter);

      return matchesSearch && matchesStatus && matchesRating;
    });
  }, [searchTerm, statusFilter, ratingFilter]);

  const totalPages = Math.ceil(
    filteredReviews.length / reviewsPerPage
  );

  const startIndex = (currentPage - 1) * reviewsPerPage;

  const currentReviews = filteredReviews.slice(
    startIndex,
    startIndex + reviewsPerPage
  );

  const approvedCount = reviews.filter(
    (review) => review.status === "Approved"
  ).length;

  const pendingCount = reviews.filter(
    (review) => review.status === "Pending"
  ).length;

  const rejectedCount = reviews.filter(
    (review) => review.status === "Rejected"
  ).length;

  const averageRating =
    reviews.reduce((total, review) => total + review.rating, 0) /
    reviews.length;

  const handleView = (review) => {
    console.log("View review:", review);
  };

  const handleApprove = (review) => {
    console.log("Approve review:", review);
  };

  const handleDelete = (review) => {
    console.log("Delete review:", review);
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
            Reviews
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage customer reviews and ratings.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5">
          <MessageSquare
            size={18}
            className="text-[#B8791A]"
          />

          <span className="text-sm font-semibold text-[#0A0E14]">
            {reviews.length} Reviews
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Total Reviews
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {reviews.length}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF5DF]">
              <MessageSquare
                size={21}
                className="text-[#B8791A]"
              />
            </div>
          </div>
        </div>

        {/* Approved */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Approved
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {approvedCount}
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

        {/* Pending */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Pending
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {pendingCount}
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

        {/* Average Rating */}
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">
                Average Rating
              </p>

              <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {averageRating.toFixed(1)}
              </h2>

              <div className="mt-1">
                <RatingStars
                  rating={Math.round(averageRating)}
                />
              </div>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF5DF]">
              <Star
                size={21}
                className="fill-[#FFB020] text-[#FFB020]"
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
              placeholder="Search customer, product or review..."
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

          {/* Rating */}
          <select
            value={ratingFilter}
            onChange={(e) =>
              handleFilterChange(
                setRatingFilter,
                e.target.value
              )
            }
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
          >
            {ratingOptions.map((rating) => (
              <option key={rating} value={rating}>
                {rating === "All"
                  ? "All Ratings"
                  : `${rating} Stars`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Customer
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Product
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Rating
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Review
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Date
                </th>

                <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {currentReviews.length > 0 ? (
                currentReviews.map((review) => (
                  <tr
                    key={review.id}
                    className="border-b border-gray-100 transition hover:bg-gray-50"
                  >
                    {/* Customer */}
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-[#0A0E14]">
                          {review.customer}
                        </p>

                        <p className="mt-1 text-xs text-gray-500">
                          {review.email}
                        </p>
                      </div>
                    </td>

                    {/* Product */}
                    <td className="px-5 py-4">
                      <p className="max-w-[190px] truncate text-sm font-medium text-[#0A0E14]">
                        {review.product}
                      </p>
                    </td>

                    {/* Rating */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <RatingStars
                          rating={review.rating}
                        />

                        <span className="text-xs font-semibold text-gray-500">
                          {review.rating}.0
                        </span>
                      </div>
                    </td>

                    {/* Review */}
                    <td className="px-5 py-4">
                      <p className="max-w-[280px] truncate text-sm text-gray-600">
                        {review.review}
                      </p>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <StatusBadge status={review.status} />
                    </td>

                    {/* Date */}
                    <td className="px-5 py-4 text-sm text-gray-500">
                      {review.date}
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleView(review)}
                          title="View review"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-[#FFB020] hover:bg-[#FFF5DF] hover:text-[#B8791A]"
                        >
                          <Eye size={16} />
                        </button>

                        {review.status === "Pending" && (
                          <button
                            type="button"
                            onClick={() =>
                              handleApprove(review)
                            }
                            title="Approve review"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-green-200 text-green-600 transition hover:bg-green-50"
                          >
                            <CheckCircle2 size={16} />
                          </button>
                        )}

                        <button
                          type="button"
                          onClick={() =>
                            handleDelete(review)
                          }
                          title="Delete review"
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-500 transition hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-5 py-12 text-center"
                  >
                    <MessageSquare
                      size={36}
                      className="mx-auto text-gray-300"
                    />

                    <h3 className="mt-3 text-base font-semibold text-[#0A0E14]">
                      No reviews found
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
                  startIndex + reviewsPerPage,
                  filteredReviews.length
                )}
              </span>{" "}
              of{" "}
              <span className="font-semibold text-gray-700">
                {filteredReviews.length}
              </span>{" "}
              reviews
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