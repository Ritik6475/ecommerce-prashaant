"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderById } from "@/store/slices/orderDetailsSlice";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import { Package, Truck, CheckCircle, Clock, MapPin, Phone, Calendar, CreditCard, ArrowLeft } from "lucide-react";

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
      <div className="min-h-[60vh] flex flex-col items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
          <Package className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h2 className="text-xl font-semibold mb-3">Login Required</h2>
          <p className="text-gray-600 mb-6">Please login to view your order details</p>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Login
          </Link>
        </div>
      </div>
    );
  }

  if (loading || !order) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading order details...</p>
        </div>
      </div>
    );
  }

  const canCancel = order.orderStatus === "processing";
  
  // Determine current step in the order timeline
  const statusSteps = ["processing", "packed", "shipped", "delivered"];
  const currentStepIndex = statusSteps.indexOf(order.orderStatus);
  const isCompleted = (index) => index <= currentStepIndex;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      <div className="container-custom py-8">
        {/* Header with Back Button */}
        <div className="flex items-center mb-8">
          <Link href="/orders" className="mr-4 p-2 rounded-full hover:bg-gray-200 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold">Order Details</h1>
        </div>

        {/* Order Summary Card */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="font-semibold text-lg">{order._id.slice(-6).toUpperCase()}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Order Date</p>
              <p className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              order.orderStatus === "processing" ? "bg-blue-100 text-blue-800" :
              order.orderStatus === "packed" ? "bg-purple-100 text-purple-800" :
              order.orderStatus === "shipped" ? "bg-orange-100 text-orange-800" :
              order.orderStatus === "delivered" ? "bg-green-100 text-green-800" :
              "bg-gray-100 text-gray-800"
            }`}>
              {order.orderStatus === "processing" && <Clock className="w-4 h-4" />}
              {order.orderStatus === "packed" && <Package className="w-4 h-4" />}
              {order.orderStatus === "shipped" && <Truck className="w-4 h-4" />}
              {order.orderStatus === "delivered" && <CheckCircle className="w-4 h-4" />}
              <span>{order.orderStatus.toUpperCase()}</span>
            </div>
            
            <div className="text-lg font-bold">₹{order.totalAmount}</div>
          </div>
        </div>

        {/* Order Status Timeline */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-600" />
            Order Status
          </h2>

          <div className="relative">
            {/* Progress Line */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200"></div>
            <div 
              className="absolute top-5 left-0 h-0.5 bg-green-500 transition-all duration-500"
              style={{ width: `${(currentStepIndex / 3) * 100}%` }}
            ></div>
            
            <div className="flex justify-between relative">
              {["PLACED", "PACKED", "SHIPPED", "DELIVERED"].map((step, index) => (
                <div key={step} className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 font-bold z-10 transition-all ${
                      isCompleted(index)
                        ? "border-green-500 bg-green-500 text-white"
                        : "border-gray-300 bg-white text-gray-400"
                    }`}
                  >
                    {isCompleted(index) ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      index + 1
                    )}
                  </div>
                  <p className={`mt-3 text-sm font-medium ${
                    isCompleted(index) ? "text-gray-900" : "text-gray-500"
                  }`}>{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="font-semibold text-lg mb-6 flex items-center gap-2">
            <Package className="w-5 h-5 text-gray-600" />
            Items in Order ({order.items.length})
          </h2>

          <div className="space-y-4">
            {order.items.map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
                  <Image src={item.product?.images?.[0]} fill className="object-cover" alt={item.product?.name} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-lg">{item.product?.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Size: {item.size} {item.color && `• Color: ${item.color}`} • Qty: {item.quantity}
                  </p>
                  <p className="text-lg font-semibold mt-2 text-blue-600">₹{item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Delivery and Address */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-gray-600" />
              Delivery Address
            </h2>
            <div className="space-y-2">
              <p className="font-medium text-gray-900">{order.address.firstName} {order.address.lastName}</p>
              <p className="text-sm text-gray-600">{order.address.street}</p>
              <p className="text-sm text-gray-600">{order.address.city}, {order.address.state} - {order.address.postalCode}</p>
              <p className="text-sm text-gray-600">{order.address.country}</p>
              <div className="flex items-center gap-2 mt-3 pt-3 border-t">
                <Phone className="w-4 h-4 text-gray-500" />
                <p className="text-sm">{order.address.phone}</p>
              </div>
            </div>
          </div>

          {/* Payment Information */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-600" />
              Payment Information
            </h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payment Method</span>
                <span className="text-sm font-medium">Online Payment</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payment Status</span>
                <span className="text-sm font-medium text-green-600">Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Transaction ID</span>
                <span className="text-sm font-medium">{order._id.slice(-10).toUpperCase()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
          <h2 className="font-semibold text-lg mb-4">Price Summary</h2>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal ({order.items.length} items)</span>
              <span>₹{order.totalAmount}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Delivery Fee</span>
              <span className="text-green-600 font-medium">FREE</span>
            </div>
          </div>

          <div className="border-t pt-4 mt-4 flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span className="text-blue-600">₹{order.totalAmount}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {canCancel && (
            <button
              onClick={() => toast.success("Cancel API Connect Next")}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-medium transition-colors"
            >
              Cancel Order
            </button>
          )}
          <button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}