"use client";

import Image from "next/image";
import { X, Truck, CheckCircle, Ban } from "lucide-react";
import Badge from "../ui/Badge";

const statusTone = (s) =>
  s === "processing"
    ? "blue"
    : s === "shipped"
    ? "yellow"
    : s === "delivered"
    ? "green"
    : s === "cancelled"
    ? "red"
    : "gray";

export default function OrderModal({
  order,
  onClose,
  onShip,
  onDeliver,
  onCancel,
}) {
  if (!order) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl relative max-h-[90vh] overflow-y-auto animate-in zoom-in-95">
        
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 p-2 rounded-lg hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Order #{order._id.slice(-8)}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="flex gap-2">
              <Badge tone={statusTone(order.orderStatus)} size="md">
                {order.orderStatus}
              </Badge>
              <Badge
                tone={
                  order.paymentStatus === "paid"
                    ? "green"
                    : order.paymentStatus === "failed"
                    ? "red"
                    : "yellow"
                }
                size="md"
              >
                {order.paymentStatus}
              </Badge>
            </div>
          </div>

          {/* Info blocks */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Customer */}
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-4">Customer</p>
              <div className="space-y-2 text-sm">
                <p className="font-medium">
                  {order.address?.firstName} {order.address?.lastName}
                </p>
                <p className="text-gray-600">{order.address?.email}</p>
                <p className="text-gray-600">{order.address?.phone}</p>
                <p className="text-gray-600 pt-2">
                  {order.address?.street}
                  <br />
                  {order.address?.city}, {order.address?.state}{" "}
                  {order.address?.postalCode}
                </p>
              </div>
            </div>

            {/* Summary */}
            <div className="rounded-lg bg-gray-50 border border-gray-200 p-5">
              <p className="font-semibold text-gray-900 mb-4">Order Summary</p>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Items</span>
                  <span className="font-medium">{order.items.length}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="text-lg font-bold">
                    ₹{order.totalAmount.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Items */}
          <div className="space-y-3">
            <p className="font-semibold text-gray-900">Items in Order</p>

            {order.items.map((it, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg bg-white hover:bg-gray-50"
              >
                <div className="relative w-16 h-16 rounded-lg overflow-hidden border bg-gray-100">
                  {it?.product?.images?.[0] && (
                    <Image
                      src={it.product.images[0]}
                      alt=""
                      fill
                      className="object-cover"
                    />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {it.product?.name || "Product"}
                  </p>
                  <p className="text-xs text-gray-600 mt-1">
                    Size: <span className="font-medium">{it.size || "-"}</span>{" "}
                    • Qty:{" "}
                    <span className="font-medium">{it.quantity}</span>
                  </p>
                
                  <p className="text-xs text-gray-600 mt-1">
                    color :
                    <span className="font-medium">{it.color}</span>
                  </p>
                
                </div>

                <p className="font-semibold text-sm">
                  ₹{it.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onShip}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-sm font-medium"
            >
              <Truck className="w-4 h-4" />
              Mark Shipped
            </button>

            <button
              onClick={onDeliver}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              Mark Delivered
            </button>

            <button
              onClick={onCancel}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 text-sm font-medium"
            >
              <Ban className="w-4 h-4" />
              Cancel Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
