"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Phone,
  CreditCard,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";

import { fetchOrderById } from "@/store/slices/orderDetailsSlice";

export default function OrderDetailsPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = useParams();

  const { order, loading } = useSelector((state) => state.orderDetails);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated && id) dispatch(fetchOrderById(id));
  }, [dispatch, id, isAuthenticated]);

  /* ---------------- STATES ---------------- */

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
          <Package className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h2 className="text-xl font-semibold mb-2">Login Required</h2>
          <p className="text-gray-600 mb-6">
            Please login to view your order details
          </p>
          <Link
            href="/login"
            className="px-6 py-3 bg-black text-white rounded-lg font-medium"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-b-2 border-black rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  /* ---------------- HELPERS ---------------- */

  const steps = ["processing", "packed", "shipped", "delivered"];
  const currentStep = steps.indexOf(order.orderStatus);

  const itemCount = order.items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const paymentStatusColor =
    order.paymentStatus === "paid"
      ? "text-green-600"
      : order.paymentStatus === "pending"
      ? "text-yellow-600"
      : "text-red-600";

  /* ---------------- UI ---------------- */

  return (
    <div className="bg-gray-50 min-h-screen pb-24 mt-4">
      <div className="max-w-6xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <button
            onClick={() => router.push("/orders")}
            className="p-2 rounded-full hover:bg-gray-200"
          >
            <ArrowLeft />
          </button>
          <h1 className="text-2xl font-semibold">Order Details</h1>
        </div>

        {/* Cancelled Banner */}
        {order.orderStatus === "cancelled" && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span className="font-medium">This order has been cancelled</span>
          </div>
        )}

        {/* Order Summary */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <div className="flex justify-between flex-wrap gap-4">
            <div>
              <p className="text-xs text-gray-500">Order ID</p>
              <p className="font-semibold text-lg">
                #{order._id.slice(-6).toUpperCase()}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-gray-500">Total Amount</p>
              <p className="text-2xl font-bold">₹{order.totalAmount}</p>
            </div>
          </div>
        </div>

        {/* Order Timeline */}
        {order.orderStatus !== "cancelled" && (
          <div className="bg-white rounded-xl border p-6 mb-6">
            <h2 className="font-semibold mb-6 flex items-center gap-2">
              <Package className="w-5 h-5" />
              Order Status
            </h2>

            <div className="flex justify-between relative">
              <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200" />
              <div
                className="absolute top-5 left-0 h-0.5 bg-black"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              />

              {["Placed", "Packed", "Shipped", "Delivered"].map((label, i) => (
                <div key={label} className="flex flex-col items-center z-10">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                      i <= currentStep
                        ? "bg-black text-white border-black"
                        : "bg-white text-gray-400 border-gray-300"
                    }`}
                  >
                    {i <= currentStep ? <CheckCircle size={18} /> : i + 1}
                  </div>
                  <span className="mt-2 text-sm">{label}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Items */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <h2 className="font-semibold mb-4">
            Items ({itemCount})
          </h2>

          <div className="space-y-4">
            {order.items.map((item, idx) => (
              <div
                key={idx}
                className="flex gap-4 p-4 bg-gray-50 rounded-lg"
              >
                <div className="relative w-20 h-20 rounded overflow-hidden">
                  <Image
                    src={item.product?.images?.[0]}
                    fill
                    className="object-cover"
                    alt={item.product?.name}
                  />
                </div>

                <div className="flex-1">
                  <p className="font-medium">{item.product?.name}</p>
                  <p className="text-xs text-gray-600">
                    Size: {item.size} • Qty: {item.quantity}
                    {item.color && ` • Color: ${item.color}`}
                  </p>
                  <p className="mt-1 font-semibold">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Address & Payment */}
        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* Address */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <MapPin size={18} /> Delivery Address
            </h2>
            <p className="font-medium">
              {order.address.firstName} {order.address.lastName}
            </p>
            <p className="text-sm text-gray-600">{order.address.street}</p>
            <p className="text-sm text-gray-600">
              {order.address.city}, {order.address.state} -{" "}
              {order.address.postalCode}
            </p>
            <p className="text-sm text-gray-600">{order.address.country}</p>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t">
              <Phone size={16} />
              <span className="text-sm">{order.address.phone}</span>
            </div>
          </div>

          {/* Payment */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="font-semibold mb-4 flex items-center gap-2">
              <CreditCard size={18} /> Payment Information
            </h2>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Method</span>
                <span className="font-medium capitalize">
                  {order.paymentMethod === "cod"
                    ? "Cash on Delivery"
                    : "Online Payment"}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className={`font-medium ${paymentStatusColor}`}>
                  {order.paymentStatus.toUpperCase()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Transaction ID</span>
                <span className="font-medium">
                  {order.razorpayPaymentId || "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-xl border p-6 mb-6">
          <h2 className="font-semibold mb-4">Price Summary</h2>

          <div className="flex justify-between text-sm">
            <span>Subtotal</span>
            <span>₹{order.totalAmount}</span>
          </div>

          <div className="flex justify-between text-sm mt-2">
            <span>Delivery</span>
            <span className="text-green-600">FREE</span>
          </div>

          <div className="border-t mt-4 pt-4 flex justify-between text-lg font-bold">
            <span>Total</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          {order.orderStatus === "processing" && (
            <button
              onClick={() => toast.success("Cancel API connect next")}
              className="flex-1 bg-red-600 text-white py-3 rounded-lg"
            >
              Cancel Order
            </button>
          )}
          <button className="flex-1 bg-black text-white py-3 rounded-lg">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  ); 
  }
