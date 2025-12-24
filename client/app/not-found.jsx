"use client";

import Link from "next/link";
import { Construction, ArrowLeft, PhoneCall } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-100 via-neutral-50 to-neutral-200 px-4">
      <div className="relative max-w-md w-full">

        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-2xl blur opacity-20"></div>

        {/* Card */}
        <div className="relative bg-white/90 backdrop-blur-xl rounded-2xl border shadow-xl p-8 text-center">

          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-100 to-orange-100 flex items-center justify-center">
            <Construction className="text-orange-600 w-8 h-8" />
          </div>

          {/* Title */}
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">
            Page Not Available
          </h1>

          {/* Description */}
          <p className="text-gray-600 text-sm leading-relaxed mb-6">
            This page is currently under development, temporarily disabled,
            or the link you followed is not active yet.
          </p>

          {/* Support Section */}
          <div className="bg-gray-50 border rounded-xl p-4 mb-6">
            <div className="flex items-center justify-center gap-2 mb-2">
              <PhoneCall className="w-4 h-4 text-gray-700" />
              <p className="text-sm font-medium text-gray-800">
                Need help with an order or pricing?
              </p>
            </div>

            <div className="space-y-1 text-sm text-gray-700">
              <a
                href="tel:8435541370"
                className="block font-medium hover:text-black transition"
              >
                📞 84355 41370
              </a>
              <a
                href="tel:+919098063480"
                className="block font-medium hover:text-black transition"
              >
                📞 +91 90980 63480
              </a>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-center">
            <Link
              href="/"
              className="px-5 py-2.5 bg-black text-white rounded-lg font-medium hover:bg-gray-900 transition"
            >
              Go Home
            </Link>

            <button
              onClick={() => window.history.back()}
              className="px-5 py-2.5 border rounded-lg font-medium flex items-center gap-2 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>

          {/* Footer note */}
          <p className="mt-6 text-xs text-gray-400">
            Thank you for your patience — we’re building something great ✨
          </p>
        </div>
      </div>
    </div>
  );
}
