"use client";

import { LogOut, Zap } from "lucide-react";

export default function AdminHeader({ onLogout }) {
  return (
    <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Orders Dashboard</h1>
            <p className="text-sm text-gray-600">
              Manage orders and fulfillment
            </p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100"
        >
          <LogOut className="w-4 h-4" />
          Exit
        </button>
      </div>
    </div>
  );
}
