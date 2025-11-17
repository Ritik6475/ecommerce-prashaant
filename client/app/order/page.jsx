"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/store/slices/orderSlice";
import Link from "next/link";
import Image from "next/image";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchOrders());
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-3">Your Orders</h1>
        <p className="text-gray-600 mb-6">Login to view your orders</p>
        <Link href="/login" className="bg-black text-white px-6 py-3 rounded-lg">
          Login
        </Link>
      </div>
    );
  }

  if (loading) return <div className="py-16 text-center text-gray-500">Loading orders...</div>;

  if (!orders || orders.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-bold mb-3">No Orders Yet</h1>
        <p className="text-gray-600 mb-6">Start shopping to place an order</p>
        <Link href="/products" className="bg-black text-white px-6 py-3 rounded-lg">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom py-10 pb-24">
      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-6">
        {orders.map(order => (
          <Link href={`/order/${order._id}`} key={order._id}>
            <div className="p-5 border rounded-xl bg-white hover:shadow-md transition-all cursor-pointer">

              {/* Top Row */}
              <div className="flex justify-between text-sm text-gray-600 mb-4">
                <span>Order ID: {order._id.slice(-6).toUpperCase()}</span>
                <span>{new Date(order.createdAt).toLocaleDateString()}</span>
              </div>

              {/* Main Product Display */}
              <div className="flex gap-5">
                <div className="relative w-20 h-24 rounded-md overflow-hidden">
                  <Image
                    src={order.items[0].product.images[0]}
                    alt=""
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-lg">{order.items[0].product.name}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {order.items.length > 1
                      ? `+ ${order.items.length - 1} more item(s)`
                      : `${order.items[0].size} • Qty: ${order.items[0].quantity}`}
                  </p>

                  {/* Status Badge */}
                  <span
                    className={`mt-2 inline-block px-3 py-1 rounded-full text-xs font-medium ${
                      order.orderStatus === "processing"
                        ? "bg-blue-100 text-blue-600"
                        : order.orderStatus === "shipped"
                        ? "bg-purple-100 text-purple-600"
                        : order.orderStatus === "delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.orderStatus.toUpperCase()}
                  </span>
                </div>

                <div className="text-right font-semibold text-lg">
                  ₹{order.totalAmount}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
