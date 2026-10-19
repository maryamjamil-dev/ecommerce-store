import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Star,
  Eye,
  Trash2,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  RefreshCw,
  LoaderCircle,
  X,
} from "lucide-react";

const API_URL = "http://localhost:3000/api/admin/reviews";
const REVIEWS_PER_PAGE = 6;
const ratingOptions = ["All", "5", "4", "3", "2", "1"];

// Backend review -> UI format
const normalizeReview = (r) => ({
  id: r._id || r.id || "",
  customer: r.user?.username || "Deleted user",
  email: r.user?.email || "",
  product: r.product?.name || r.product?.title || "Deleted product",
  rating: Number(r.rating) || 0,
  review: r.comment || "",
  date: r.createdAt
    ? new Date(r.createdAt).toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
    : "-",
});

function RatingStars({ rating }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={15}
          className={
            star <= rating ? "fill-[#FFB020] text-[#FFB020]" : "text-gray-300"
          }
        />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedReview, setSelectedReview] = useState(null);

  const fetchReviews = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(API_URL, {
        credentials: "include",
        headers: { Accept: "application/json" },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Could not load reviews.");
      }

      const list = Array.isArray(result)
        ? result
        : result.reviews || result.data || [];

      setReviews(list.map(normalizeReview));
    } catch (err) {
      setReviews([]);
      setError(err.message || "Backend unavailable.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  const filteredReviews = useMemo(() => {
    const search = searchTerm.toLowerCase().trim();

    return reviews.filter((review) => {
      const matchesSearch =
        !search ||
        review.customer.toLowerCase().includes(search) ||
        review.email.toLowerCase().includes(search) ||
        review.product.toLowerCase().includes(search) ||
        review.review.toLowerCase().includes(search);

      const matchesRating =
        ratingFilter === "All" || review.rating === Number(ratingFilter);

      return matchesSearch && matchesRating;
    });
  }, [reviews, searchTerm, ratingFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredReviews.length / REVIEWS_PER_PAGE)
  );
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * REVIEWS_PER_PAGE;
  const currentReviews = filteredReviews.slice(
    startIndex,
    startIndex + REVIEWS_PER_PAGE
  );

  const fiveStarCount = reviews.filter((r) => r.rating === 5).length;
  const lowRatingCount = reviews.filter((r) => r.rating <= 2).length;
  const averageRating = reviews.length
    ? reviews.reduce((total, r) => total + r.rating, 0) / reviews.length
    : 0;

  const handleDelete = async (review) => {
    if (!window.confirm(`Delete review by "${review.customer}"?`)) return;

    setError("");
    setSuccess("");

    try {
      const response = await fetch(`${API_URL}/${review.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const result = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(result.message || "Could not delete review.");
      }

      setSuccess("Review deleted successfully.");
      await fetchReviews();
    } catch (err) {
      setError(err.message || "Unable to delete review.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A0E14]">Reviews</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage customer reviews and ratings.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5">
          <MessageSquare size={18} className="text-[#B8791A]" />
          <span className="text-sm font-semibold text-[#0A0E14]">
            {reviews.length} Reviews
          </span>
        </div>
      </div>

      {/* Notifications */}
      {error && (
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Reviews"
          value={reviews.length}
          icon={<MessageSquare size={21} className="text-[#B8791A]" />}
          bg="bg-[#FFF5DF]"
        />
        <StatCard
          title="5-Star Reviews"
          value={fiveStarCount}
          icon={<ThumbsUp size={21} className="text-green-600" />}
          bg="bg-green-50"
        />
        <StatCard
          title="Low Ratings (1-2)"
          value={lowRatingCount}
          icon={<ThumbsDown size={21} className="text-red-500" />}
          bg="bg-red-50"
        />

        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Average Rating</p>
              <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">
                {averageRating.toFixed(1)}
              </h2>
              <div className="mt-1">
                <RatingStars rating={Math.round(averageRating)} />
              </div>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFF5DF]">
              <Star size={21} className="fill-[#FFB020] text-[#FFB020]" />
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row">
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

          <select
            value={ratingFilter}
            onChange={(e) => {
              setRatingFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-700 outline-none focus:border-[#FFB020] focus:ring-2 focus:ring-[#FFB020]/20"
          >
            {ratingOptions.map((rating) => (
              <option key={rating} value={rating}>
                {rating === "All" ? "All Ratings" : `${rating} Stars`}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Reviews Table */}
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
          <h2 className="font-bold text-[#0A0E14]">Review List</h2>
          <button
            type="button"
            onClick={fetchReviews}
            disabled={loading}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw size={15} />
            Refresh
          </button>
        </div>

        {loading ? (
          <div className="flex min-h-64 items-center justify-center gap-3 text-sm text-gray-500">
            <LoaderCircle className="animate-spin" size={21} />
            Loading reviews...
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px]">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50">
                  {["Customer", "Product", "Rating", "Review", "Date"].map(
                    (h) => (
                      <th
                        key={h}
                        className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500"
                      >
                        {h}
                      </th>
                    )
                  )}
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
                      <td className="px-5 py-4">
                        <p className="font-semibold text-[#0A0E14]">
                          {review.customer}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {review.email}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[190px] truncate text-sm font-medium text-[#0A0E14]">
                          {review.product}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2">
                          <RatingStars rating={review.rating} />
                          <span className="text-xs font-semibold text-gray-500">
                            {review.rating}.0
                          </span>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-[280px] truncate text-sm text-gray-600">
                          {review.review}
                        </p>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-500">
                        {review.date}
                      </td>

                      <td className="px-5 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setSelectedReview(review)}
                            title="View review"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:border-[#FFB020] hover:bg-[#FFF5DF] hover:text-[#B8791A]"
                          >
                            <Eye size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() => handleDelete(review)}
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
                    <td colSpan="6" className="px-5 py-12 text-center">
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
        )}

        {/* Pagination */}
        {!loading && totalPages > 1 && (
          <div className="flex flex-col gap-3 border-t border-gray-200 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {startIndex + 1}
              </span>{" "}
              to{" "}
              <span className="font-semibold text-gray-700">
                {Math.min(startIndex + REVIEWS_PER_PAGE, filteredReviews.length)}
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
                disabled={safePage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Previous
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`h-9 min-w-9 rounded-lg px-3 text-sm font-semibold transition ${
                      safePage === page
                        ? "bg-[#0A0E14] text-[#FFB020]"
                        : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={safePage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* View modal */}
      {selectedReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-[#0A0E14]">
                Review Details
              </h2>
              <button
                onClick={() => setSelectedReview(null)}
                aria-label="Close details"
              >
                <X size={21} />
              </button>
            </div>

            <div className="mt-5 space-y-4 text-sm">
              <div>
                <p className="text-gray-500">Customer</p>
                <p className="font-semibold text-[#0A0E14]">
                  {selectedReview.customer}
                </p>
                <p className="text-xs text-gray-500">{selectedReview.email}</p>
              </div>

              <div>
                <p className="text-gray-500">Product</p>
                <p className="font-semibold text-[#0A0E14]">
                  {selectedReview.product}
                </p>
              </div>

              <div>
                <p className="mb-1 text-gray-500">Rating</p>
                <RatingStars rating={selectedReview.rating} />
              </div>

              <div>
                <p className="text-gray-500">Review</p>
                <p className="mt-1 whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-3 text-gray-700">
                  {selectedReview.review}
                </p>
              </div>

              <div>
                <p className="text-gray-500">Date</p>
                <p className="font-semibold text-[#0A0E14]">
                  {selectedReview.date}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedReview(null)}
              className="mt-6 w-full rounded-xl bg-[#0A0E14] px-4 py-3 text-sm font-semibold text-white"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StatCard({ title, value, icon, bg }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <h2 className="mt-2 text-2xl font-bold text-[#0A0E14]">{value}</h2>
        </div>
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-lg ${bg}`}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}