"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/store/slices/orderSlice";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Search } from "lucide-react";

export default function OrdersPage() {
  const dispatch = useDispatch();
  const { orders, loading } = useSelector((state) => state.order);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const router = useRouter();
  
  // State for filters
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  
  // State for search
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchOrders());
  }, [isAuthenticated, dispatch]);

  // Filter orders based on selected filters
  const filteredOrders = orders?.filter(order => {
    let statusMatch = true;
    let timeMatch = true;
    
    if (statusFilter !== "all") {
      statusMatch = order.orderStatus === statusFilter;
    }
    
    if (timeFilter !== "all") {
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      
      if (timeFilter === "last30") {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(now.getDate() - 30);
        timeMatch = orderDate >= thirtyDaysAgo;
      } else if (timeFilter === "last90") {
        const ninetyDaysAgo = new Date();
        ninetyDaysAgo.setDate(now.getDate() - 90);
        timeMatch = orderDate >= ninetyDaysAgo;
      } else if (timeFilter === "2024") {
        timeMatch = orderDate.getFullYear() === 2024;
      } else if (timeFilter === "2023") {
        timeMatch = orderDate.getFullYear() === 2023;
      }
    }
    
    // Filter by search query if provided
    let searchMatch = true;
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      searchMatch = order.items.some(item => 
        item.product.name.toLowerCase().includes(query) ||
        order._id.toLowerCase().includes(query)
      );
    }
    
    return statusMatch && timeMatch && searchMatch;
  }) || [];

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

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

  // Get status color based on order status
  const getStatusColor = (status) => {
    switch (status) {
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search Bar - Perfectly Aligned */}
      <header className="bg-white border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center justify-between py-4">
            {/* Logo/Brand Area */}
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
            </div>
            
            {/* Search Bar - Centered and Perfectly Aligned */}
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 p-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
            
            {/* Right Side Space for Balance */}
            <div className="w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container-custom py-6">
        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-base">Filters</h3>
              </div>
              
              {/* Order Status Filter */}
              <div className="p-4 border-b border-gray-200">
                <h4 className="font-medium text-sm mb-3 text-gray-700">ORDER STATUS</h4>
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between p-2.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setShowStatusDropdown(!showStatusDropdown)}
                  >
                    <span className="capitalize">
                      {statusFilter === "all" ? "All Status" : statusFilter}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showStatusDropdown ? "rotate-180" : ""}`} />
                  </button>
                  {showStatusDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${statusFilter === "all" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setStatusFilter("all");
                          setShowStatusDropdown(false);
                        }}
                      >
                        All Status
                      </div>
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${statusFilter === "processing" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setStatusFilter("processing");
                          setShowStatusDropdown(false);
                        }}
                      >
                        Processing
                      </div>
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${statusFilter === "shipped" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setStatusFilter("shipped");
                          setShowStatusDropdown(false);
                        }}
                      >
                        On the way
                      </div>
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${statusFilter === "delivered" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setStatusFilter("delivered");
                          setShowStatusDropdown(false);
                        }}
                      >
                        Delivered
                      </div>
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${statusFilter === "cancelled" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setStatusFilter("cancelled");
                          setShowStatusDropdown(false);
                        }}
                      >
                        Cancelled
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Order Time Filter */}
              <div className="p-4">
                <h4 className="font-medium text-sm mb-3 text-gray-700">ORDER TIME</h4>
                <div className="relative">
                  <button
                    className="w-full flex items-center justify-between p-2.5 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors text-sm"
                    onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                  >
                    <span>
                      {timeFilter === "all" ? "All Time" : 
                       timeFilter === "last30" ? "Last 30 days" :
                       timeFilter === "last90" ? "Last 90 days" :
                       timeFilter}
                    </span>
                    <ChevronDown className={`w-4 h-4 transition-transform ${showTimeDropdown ? "rotate-180" : ""}`} />
                  </button>
                  {showTimeDropdown && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg">
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${timeFilter === "all" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setTimeFilter("all");
                          setShowTimeDropdown(false);
                        }}
                      >
                        All Time
                      </div>
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${timeFilter === "last30" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setTimeFilter("last30");
                          setShowTimeDropdown(false);
                        }}
                      >
                        Last 30 days
                      </div>
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${timeFilter === "last90" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setTimeFilter("last90");
                          setShowTimeDropdown(false);
                        }}
                      >
                        Last 90 days
                      </div>
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${timeFilter === "2024" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setTimeFilter("2024");
                          setShowTimeDropdown(false);
                        }}
                      >
                        2024
                      </div>
                      <div
                        className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${timeFilter === "2023" ? "bg-gray-100" : ""}`}
                        onClick={() => {
                          setTimeFilter("2023");
                          setShowTimeDropdown(false);
                        }}
                      >
                        2023
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex-1">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No orders found with the selected filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-5">
                      {/* Order Header */}
                      <div className="flex justify-between items-center mb-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">Order ID: {order._id.slice(-6).toUpperCase()}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">{new Date(order.createdAt).toLocaleDateString()}</p>
                        </div>
                      </div>

                      {/* Order Items */}
                      <div className="flex gap-4 mb-4">
                        <div className="relative w-20 h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={order.items[0].product.images[0]}
                            alt={order.items[0].product.name}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-medium text-base mb-1 text-gray-900">{order.items[0].product.name}</h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {order.items.length > 1
                              ? `+ ${order.items.length - 1} more item(s)`
                              : `${order.items[0].size} • Qty: ${order.items[0].quantity} • color: ${order.items[0].color} `}
                          </p>
                          
                          {/* Status Badge */}
                          <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus.toUpperCase()}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-base font-medium text-gray-900">₹{order.totalAmount}</p>
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="flex justify-end pt-4 border-t border-gray-200">
                        <Link href={`/order/${order._id}`} className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors">
                          View Order Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}