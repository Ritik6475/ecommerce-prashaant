"use client";

import { Search } from "lucide-react";

export default function FiltersBar({ filters, setFilters }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-4">
      <p className="font-semibold text-sm">Search & Filter</p>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="flex items-center gap-3 bg-gray-50 border rounded-lg px-4 py-3">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            className="bg-transparent outline-none w-full text-sm"
            placeholder="Search orders..."
            value={filters.q}
            onChange={(e) =>
              setFilters((f) => ({ ...f, q: e.target.value }))
            }
          />
        </div>

        <select
          className="bg-gray-50 border rounded-lg px-4 py-3 text-sm"
          value={filters.status}
          onChange={(e) =>
            setFilters((f) => ({ ...f, status: e.target.value }))
          }
        >
          <option value="">All Order Status</option>
          <option value="processing">Processing</option>
          <option value="shipped">Shipped</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          className="bg-gray-50 border rounded-lg px-4 py-3 text-sm"
          value={filters.paymentStatus}
          onChange={(e) =>
            setFilters((f) => ({ ...f, paymentStatus: e.target.value }))
          }
        >
          <option value="">All Payment Status</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="failed">Failed</option>
        </select>
      </div>
    </div>
  );
}
