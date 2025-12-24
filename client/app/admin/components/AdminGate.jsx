"use client";

import { useState } from "react";
import { ShoppingCart } from "lucide-react";

export default function AdminGate({ onVerify }) {
  const [secretInput, setSecretInput] = useState("");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white border border-gray-200 shadow-lg p-8 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
              <ShoppingCart className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Access</h1>
            <p className="text-sm text-gray-600">
              Enter your admin secret to unlock the dashboard
            </p>
          </div>

          <input
            type="password"
            className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3"
            placeholder="Enter admin secret"
            value={secretInput}
            onChange={(e) => setSecretInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onVerify(secretInput)}
          />

          <button
            onClick={() => onVerify(secretInput)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold"
          >
            Unlock Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
