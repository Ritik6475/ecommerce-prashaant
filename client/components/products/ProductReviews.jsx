"use client";

import { Star } from "lucide-react";

const reviews = [
  {
    id: 1,
    name: "Rohit Sharma",
    rating: 5,
    date: "2 days ago",
    title: "Excellent quality",
    comment:
      "Fabric quality is amazing and fitting is perfect. Totally worth the price.",
  },
  {
    id: 2,
    name: "Ananya Verma",
    rating: 4,
    date: "1 week ago",
    title: "Good but size runs small",
    comment:
      "Loved the design and color. Just order one size bigger for comfort.",
  },
  {
    id: 3,
    name: "Amit Patel",
    rating: 5,
    date: "2 weeks ago",
    title: "Highly recommended",
    comment:
      "Looks premium and feels comfortable. Delivery was also very fast.",
  },
];

export default function ProductReviews() {
  const averageRating = 4.7;
  const totalReviews = reviews.length;

  return (
    <section className="pt-8 border-t mt-10">

      {/* ---------- HEADER ---------- */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Ratings & Reviews</h2>
        <button className="text-sm underline text-gray-600 hover:text-black">
          Write a Review
        </button>
      </div>

      {/* ---------- SUMMARY ---------- */}
      <div className="flex items-center gap-6 mb-8">
        <div className="flex items-center gap-2">
          <span className="text-4xl font-bold">{averageRating}</span>
          <div className="flex flex-col">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.round(averageRating)
                      ? "text-yellow-500 fill-yellow-500"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              {totalReviews} reviews
            </span>
          </div>
        </div>

        {/* Rating bars */}
        <div className="flex-1 max-w-sm space-y-1">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="flex items-center gap-2 text-sm">
              <span className="w-6">{star}</span>
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div
                  className="h-2 bg-yellow-500 rounded"
                  style={{ width: `${star * 15}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- REVIEWS LIST ---------- */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium">{review.name}</p>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < review.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <span className="text-xs text-gray-500">{review.date}</span>
            </div>

            <p className="font-medium text-sm mb-1">{review.title}</p>
            <p className="text-sm text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>

      {/* ---------- VIEW ALL ---------- */}
      <div className="mt-6 text-center">
        <button className="px-6 py-2 border rounded-md text-sm hover:bg-black hover:text-white transition">
          View All Reviews
        </button>
      </div>
    </section>
  );
}
