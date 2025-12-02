"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders } from "@/store/slices/orderSlice";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Search, Menu, X } from "lucide-react";

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
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  
  // State for search
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isAuthenticated) dispatch(fetchOrders());
  }, [isAuthenticated, dispatch]);

  // Filter orders based on selected filters
  const filteredOrders = orders?.filter(order => {
    const statusMatch = statusFilter === "all" || order.orderStatus === statusFilter;
    
    let timeMatch = true;
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
    const searchMatch = !searchQuery.trim() || order.items.some(item => 
      item.product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order._id.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    return statusMatch && timeMatch && searchMatch;
  }) || [];

  // Handle search submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Get status color based on order status
  const getStatusColor = (status) => {
    const colors = {
      processing: "bg-blue-100 text-blue-800",
      shipped: "bg-purple-100 text-purple-800",
      delivered: "bg-green-100 text-green-800",
      cancelled: "bg-red-100 text-red-800"
    };
    return colors[status] || "bg-gray-100 text-gray-800";
  };

  // Get image URL with fallback
  const getImageUrl = (product) => {
    return product?.images?.[0] || "/placeholder-product.png";
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
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
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-2xl font-bold mb-3">No Orders Yet</h1>
        <p className="text-gray-600 mb-6">Start shopping to place an order</p>
        <Link href="/products" className="bg-black text-white px-6 py-3 rounded-lg">
          Shop Now
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header with Search Bar */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            {/* Logo/Brand Area */}
            <div className="flex items-center">
              <button 
                className="md:hidden mr-2 p-2 rounded-md hover:bg-gray-100"
                onClick={() => setShowMobileFilters(!showMobileFilters)}
              >
                {showMobileFilters ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
              <h1 className="text-xl font-bold text-gray-900">My Orders</h1>
            </div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-2 sm:mx-4 md:mx-8">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search for products, brands and more"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-3 py-2.5 pr-10 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
            <div className="w-8 md:w-32"></div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="px-2 sm:px-4 md:px-6 lg:px-8 py-6">
        <div className="flex gap-4 md:gap-6">
          {/* Filters Sidebar - Responsive */}
          <div className={`${showMobileFilters ? 'block' : 'hidden'} md:block w-full md:w-64 flex-shrink-0 absolute md:relative top-0 left-0 h-full md:h-auto z-30 bg-white md:bg-transparent`}>
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-full md:h-auto">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-base">Filters</h3>
                <button 
                  className="md:hidden p-1 rounded-md hover:bg-gray-100"
                  onClick={() => setShowMobileFilters(false)}
                >
                  <X className="w-5 h-5" />
                </button>
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
                      {["all", "processing", "shipped", "delivered", "cancelled"].map(status => (
                        <div
                          key={status}
                          className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${statusFilter === status ? "bg-gray-100" : ""}`}
                          onClick={() => {
                            setStatusFilter(status);
                            setShowStatusDropdown(false);
                          }}
                        >
                          {status === "all" ? "All Status" : 
                           status === "shipped" ? "On the way" : 
                           status.charAt(0).toUpperCase() + status.slice(1)}
                        </div>
                      ))}
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
                      {["all", "last30", "last90", "2024", "2023"].map(time => (
                        <div
                          key={time}
                          className={`px-3 py-2 hover:bg-gray-50 cursor-pointer text-sm ${timeFilter === time ? "bg-gray-100" : ""}`}
                          onClick={() => {
                            setTimeFilter(time);
                            setShowTimeDropdown(false);
                          }}
                        >
                          {time === "all" ? "All Time" : 
                           time === "last30" ? "Last 30 days" :
                           time === "last90" ? "Last 90 days" :
                           time}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Orders List */}
          <div className="flex-1 min-w-0">
            {filteredOrders.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
                <p className="text-gray-500">No orders found with the selected filters.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredOrders.map(order => (
                  <div key={order._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                    <div className="p-3 sm:p-4 md:p-5">
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
                      <div className="flex gap-3 sm:gap-4 mb-4">
                        <div className="relative w-16 h-20 sm:w-20 sm:h-24 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <Image
                            src={getImageUrl(order.items[0]?.product)}
                            alt={order.items[0]?.product?.name || "Product"}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 64px, 80px"
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm sm:text-base mb-1 text-gray-900 truncate">{order.items[0]?.product?.name || "Product"}</h3>
                          <p className="text-xs sm:text-sm text-gray-600 mb-2">
                            {order.items.length > 1
                              ? `+ ${order.items.length - 1} more item(s)`
                              : `${order.items[0]?.size || ''} • Qty: ${order.items[0]?.quantity || 1} • color: ${order.items[0]?.color || ''} `}
                          </p>
                          
                          {/* Status Badge */}
                          <div className={`inline-block px-2 sm:px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                            {order.orderStatus?.toUpperCase() || "UNKNOWN"}
                          </div>
                        </div>

                        <div className="text-right">
                          <p className="text-sm sm:text-base font-medium text-gray-900">₹{order.totalAmount}</p>
                        </div>
                      </div>

                      {/* Order Actions */}
                      <div className="flex justify-end pt-3 sm:pt-4 border-t border-gray-200">
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

