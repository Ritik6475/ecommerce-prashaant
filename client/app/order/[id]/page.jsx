"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "@/store/slices/orderDetailsSlice";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

export default function OrderDetailsPage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const { order, loading } = useSelector((state) => state.orderDetails);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchOrderById(id));
  }, [dispatch, id, isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <p className="text-gray-600 mb-4">Please Login to view your orders</p>
        <Link href="/login" className="bg-black text-white px-6 py-3 rounded-lg">
          Login
        </Link>
      </div>
    );
  }

  if (loading || !order) {
    return <div className="py-16 text-center">Loading order details...</div>;
  }

  const canCancel = order.orderStatus === "processing";

  return (
    <div className="container-custom py-10 pb-24">

      {/* Page Title */}
      <h1 className="text-2xl font-bold mb-6">Order Details</h1>

      {/* Order Status Timeline */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <h2 className="font-semibold mb-4">Order Status</h2>

        <div className="flex justify-between items-center text-sm font-medium">
          {["PLACED", "PACKED", "SHIPPED", "DELIVERED"].map((step, index) => (
            <div key={step} className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold ${
                  index <= ["processing","packed","shipped","delivered"].indexOf(order.orderStatus)
                    ? "border-green-600 text-green-600"
                    : "border-gray-300 text-gray-400"
                }`}
              >
                {index + 1}
              </div>
              <p className="mt-2">{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Items List */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <h2 className="font-semibold mb-4">Items in Order</h2>

        {order.items.map((item, i) => (
          <div key={i} className="flex gap-4 py-4 border-b last:border-none">
            <div className="relative w-20 h-24 rounded-lg overflow-hidden">
              <Image src={item.product?.images?.[0]} fill className="object-cover" alt="" />
            </div>
            <div className="flex-1">
              <p className="font-medium">{item.product?.name}</p>
              <p className="text-sm text-gray-600 mt-1">
                Size: {item.size} {item.color && `• Color: ${item.color}`} • Qty: {item.quantity}
              </p>
              <p className="text-sm font-semibold mt-1">₹{item.price}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Delivery and Address */}
      <div className="bg-white border rounded-xl p-6 mb-8">
  <h2 className="font-semibold mb-3 text-lg">Delivery Address</h2>
  <div className="text-sm leading-relaxed text-gray-700 space-y-1">
    <p className="font-medium text-gray-900">{order.address.firstName} {order.address.lastName}</p>
    <p>{order.address.street}</p>
    <p>{order.address.city}, {order.address.state} - {order.address.postalCode}</p>
    <p>{order.address.country}</p>
    <p className="pt-1">📞 {order.address.phone}</p>
  </div>
</div>

      {/* Price Summary */}
      <div className="bg-white border rounded-xl p-6 mb-8">
        <h2 className="font-semibold mb-4">Price Summary</h2>

        <div className="space-y-3 text-sm">
          <div className="flex justify-between"><span>Total MRP</span><span>₹{order.totalAmount}</span></div>
          <div className="flex justify-between"><span>Delivery Fee</span><span className="text-green-600 font-medium">FREE</span></div>
        </div>

        <div className="border-t pt-3 mt-4 flex justify-between text-lg font-bold">
          <span>Grand Total</span>
          <span>₹{order.totalAmount}</span>
        </div>
      </div>

      {/* Action Buttons */}
      {canCancel && (
        <button
          onClick={() => toast.success("Cancel API Connect Next")}
          className="block w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium"
        >
          Cancel Order
        </button>
      )}

    </div>
  );
}
