"use client"

import { useEffect, useState } from "react"
import api from "@/lib/axios"

import Image from "next/image"
import {
  ChevronDown,
  Loader2,
  Search,
  X,
  CheckCircle,
  Truck,
  Ban,
  LogOut,
  TrendingUp,
  ShoppingCart,
  Zap,
} from "lucide-react"
import clsx from "clsx"

const Badge = ({ children, tone = "gray", size = "sm" }) => {
  const sizeMap = {
    sm: "px-2.5 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
  }
  const toneMap = {
    gray: "bg-gray-100 text-gray-700",
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    yellow: "bg-amber-100 text-amber-700",
    red: "bg-red-100 text-red-700",
  }
  return <span className={clsx("rounded-full font-medium inline-block", sizeMap[size], toneMap[tone])}>{children}</span>
}

const statusTone = (s) =>
  s === "processing"
    ? "blue"
    : s === "shipped"
      ? "yellow"
      : s === "delivered"
        ? "green"
        : s === "cancelled"
          ? "red"
          : "gray"

const StatCard = ({ icon: Icon, label, value, trend }) => (
  <div className="group relative rounded-xl bg-white p-5 border border-gray-200 hover:shadow-md hover:border-gray-300 transition-all duration-300">
    <div className="flex items-start justify-between mb-3">
      <div className="p-2 rounded-lg bg-gray-50 shadow-sm">
        <Icon className="w-5 h-5 text-blue-600" />
      </div>
      {trend && <span className="text-xs font-semibold text-emerald-600">↑ {trend}%</span>}
    </div>
    <p className="text-xs text-gray-600 font-medium mb-1">{label}</p>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
  </div>
)

export default function AdminPage() {
  const [secretOk, setSecretOk] = useState(false)
  const [secretInput, setSecretInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [filters, setFilters] = useState({ q: "", status: "", paymentStatus: "" })
  const [selected, setSelected] = useState(null)
  const [saving, setSaving] = useState(false)
  const [stats, setStats] = useState(null)

  useEffect(() => {
    const s = localStorage.getItem("adminSecret")
    if (s) setSecretOk(true)
  }, [])

  const fetchOrders = async (page = 1) => {
    setLoading(true)
    try {
      const params = { page, limit: 12 }
      if (filters.q) params.q = filters.q
      if (filters.status) params.status = filters.status
      if (filters.paymentStatus) params.paymentStatus = filters.paymentStatus

      const { data } = await api.get("/admin/orders", { params })
      setOrders(data.items || [])
      setPagination(data.pagination || { page: 1, pages: 1, total: 0 })
    } finally {
      setLoading(false)
    }
  }

  const fetchStats = async () => {
    try {
      const { data } = await api.get("/admin/stats")
      setStats(data)
    } catch {}
  }

  useEffect(() => {
    if (secretOk) {
      fetchOrders(1)
      fetchStats()
    }
  }, [secretOk, filters])

  const verifySecret = async () => {
    try {
      await api.get("/admin/verify-secret", {
        headers: { "x-admin-secret": secretInput.trim() },
      })
      localStorage.setItem("adminSecret", secretInput.trim())
      setSecretOk(true)
    } catch {
      alert("Invalid Admin Secret")
      localStorage.removeItem("adminSecret")
    }
  }

  const onClearSecret = () => {
    localStorage.removeItem("adminSecret")
    setSecretOk(false)
    setOrders([])
  }

  const updateStatus = async (orderId, patch) => {
    setSaving(true)
    try {
      await api.put(`/admin/orders/${orderId}/status`, patch)
      await Promise.all([fetchOrders(pagination.page), fetchStats()])
    } finally {
      setSaving(false)
    }
  }

  const cancelOrder = async (orderId) => {
    setSaving(true)
    try {
      await api.put(`/admin/orders/${orderId}/cancel`)
      await Promise.all([fetchOrders(pagination.page), fetchStats()])
    } finally {
      setSaving(false)
    }
  }

  if (!secretOk) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white border border-gray-200 shadow-lg p-8 space-y-6">
            <div className="space-y-3">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Access</h1>
              <p className="text-sm text-gray-600">Enter your admin secret to unlock the dashboard</p>
            </div>

            <div className="space-y-3">
              <input
                type="password"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 text-gray-900 placeholder-gray-400 outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter admin secret"
                value={secretInput}
                onChange={(e) => setSecretInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && verifySecret()}
              />
              <button
                onClick={verifySecret}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg py-3 font-semibold shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
              >
                Unlock Dashboard
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">Admin Portal • Secure Access</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="sticky top-0 z-40 border-b border-gray-200 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-md">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">Orders Dashboard</h1>
            </div>
            <p className="text-sm text-gray-600">Manage orders and fulfillment in real-time</p>
          </div>
          <button
            onClick={onClearSecret}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm font-medium">Exit</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            icon={TrendingUp}
            label="Total Revenue"
            value={`₹${(stats?.revenue || 0).toLocaleString()}`}
            trend={12}
          />
          <StatCard icon={ShoppingCart} label="Total Orders" value={stats?.totalOrders ?? 0} trend={8} />
          <StatCard icon={Truck} label="Shipped" value={stats?.byStatus?.shipped ?? 0} />
          <StatCard icon={CheckCircle} label="Delivered" value={stats?.byStatus?.delivered ?? 0} />
        </div>

        <div className="rounded-xl bg-white border border-gray-200 p-6 shadow-sm">
          <div className="space-y-4">
            <p className="font-semibold text-gray-900 text-sm">Search & Filter</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 hover:border-gray-300 transition-all">
                <Search className="w-5 h-5 text-gray-400" />
                <input
                  placeholder="Search orders, customers..."
                  className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500 text-sm"
                  value={filters.q}
                  onChange={(e) => setFilters((f) => ({ ...f, q: e.target.value }))}
                />
              </div>

              <select
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm cursor-pointer hover:border-gray-300 transition-all"
                value={filters.status}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
              >
                <option value="">All Order Status</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                className="bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 text-sm cursor-pointer hover:border-gray-300 transition-all"
                value={filters.paymentStatus}
                onChange={(e) => setFilters((f) => ({ ...f, paymentStatus: e.target.value }))}
              >
                <option value="">All Payment Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="failed">Failed</option>
              </select>
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white border border-gray-200 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Order ID</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Customer</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Items</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Amount</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Payment</th>
                  <th className="text-left px-6 py-4 font-semibold text-gray-900">Status</th>
                  <th className="text-right px-6 py-4 font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="flex items-center justify-center gap-2 text-gray-600">
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Loading orders…</span>
                      </div>
                    </td>
                  </tr>
                )}
                {!loading && orders.length === 0 && (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No orders found
                    </td>
                  </tr>
                )}
                {!loading &&
                  orders.map((o) => (
                    <tr
                      key={o._id}
                      className="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-150 group"
                    >
                      <td className="px-6 py-4">
                        <div className="font-semibold text-gray-900 text-sm">#{o._id.slice(-8)}</div>
                        <div className="text-xs text-gray-600">{new Date(o.createdAt).toLocaleDateString()}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 text-sm">
                          {o?.address?.firstName} {o?.address?.lastName}
                        </div>
                        <div className="text-xs text-gray-600">{o?.address?.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex -space-x-2">
                          {o.items.slice(0, 3).map((it, idx) => (
                            <div
                              key={idx}
                              className="relative w-8 h-8 rounded-lg overflow-hidden border-2 border-white bg-gray-100 shadow-md"
                            >
                              {it?.product?.images?.[0] && (
                                <Image
                                  src={it.product.images[0] || "/placeholder.svg"}
                                  alt=""
                                  fill
                                  className="object-cover"
                                />
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="text-xs text-gray-600 mt-1.5">{o.items.length} item(s)</div>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-900">₹{o.totalAmount.toLocaleString()}</td>
                      <td className="px-6 py-4">
                        <Badge
                          tone={o.paymentStatus === "paid" ? "green" : o.paymentStatus === "failed" ? "red" : "yellow"}
                          size="sm"
                        >
                          {o.paymentStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge tone={statusTone(o.orderStatus)} size="sm">
                          {o.orderStatus}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => setSelected(o)}
                            className="px-3 py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors text-sm font-medium"
                          >
                            View
                          </button>
                          <div className="relative group/dropdown">
                            <button className="px-3 py-2 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-100 transition-colors inline-flex items-center gap-1.5 text-sm font-medium">
                              Update <ChevronDown className="w-4 h-4" />
                            </button>
                            <div className="hidden group-hover/dropdown:block absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg min-w-56 z-10">
                              <button
                                onClick={() => updateStatus(o._id, { orderStatus: "processing" })}
                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm first:rounded-t-lg transition-colors"
                              >
                                Mark Processing
                              </button>
                              <button
                                onClick={() => updateStatus(o._id, { orderStatus: "shipped" })}
                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                              >
                                Mark Shipped
                              </button>
                              <button
                                onClick={() => updateStatus(o._id, { orderStatus: "delivered" })}
                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                              >
                                Mark Delivered
                              </button>
                              <button
                                onClick={() => cancelOrder(o._id)}
                                className="block w-full text-left px-4 py-2.5 hover:bg-red-50 text-red-600 text-sm transition-colors"
                              >
                                Cancel Order
                              </button>
                              <div className="border-t border-gray-200"></div>
                              <button
                                onClick={() => updateStatus(o._id, { paymentStatus: "paid" })}
                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                              >
                                Payment: Paid
                              </button>
                              <button
                                onClick={() => updateStatus(o._id, { paymentStatus: "pending" })}
                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm transition-colors"
                              >
                                Payment: Pending
                              </button>
                              <button
                                onClick={() => updateStatus(o._id, { paymentStatus: "failed" })}
                                className="block w-full text-left px-4 py-2.5 hover:bg-gray-50 text-gray-700 text-sm rounded-b-lg transition-colors"
                              >
                                Payment: Failed
                              </button>
                            </div>
                          </div>
                          {saving && <Loader2 className="w-4 h-4 animate-spin text-gray-400" />}
                        </div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 border-t border-gray-200 bg-gray-50">
            <div className="text-sm text-gray-600">
              Page <span className="font-semibold text-gray-900">{pagination.page}</span> of{" "}
              <span className="font-semibold text-gray-900">{pagination.pages}</span> •{" "}
              <span className="font-semibold text-gray-900">{pagination.total}</span> orders
            </div>
            <div className="flex gap-2">
              <button
                disabled={pagination.page <= 1}
                onClick={() => fetchOrders(pagination.page - 1)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                  pagination.page <= 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                Previous
              </button>
              <button
                disabled={pagination.page >= pagination.pages}
                onClick={() => fetchOrders(pagination.page + 1)}
                className={clsx(
                  "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                  pagination.page >= pagination.pages
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200",
                )}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {selected && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-xl shadow-xl relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <button
              className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-lg transition-colors z-10"
              onClick={() => setSelected(null)}
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="p-8 space-y-6">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Order #{selected._id.slice(-8)}</h2>
                  <p className="text-sm text-gray-600 mt-1">{new Date(selected.createdAt).toLocaleString()}</p>
                </div>
                <div className="flex gap-2">
                  <Badge tone={statusTone(selected.orderStatus)} size="md">
                    {selected.orderStatus}
                  </Badge>
                  <Badge
                    tone={
                      selected.paymentStatus === "paid"
                        ? "green"
                        : selected.paymentStatus === "failed"
                          ? "red"
                          : "yellow"
                    }
                    size="md"
                  >
                    {selected.paymentStatus}
                  </Badge>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-lg bg-gray-50 border border-gray-200 p-5">
                  <p className="font-semibold text-gray-900 mb-4">Customer</p>
                  <div className="space-y-2 text-sm">
                    <p className="text-gray-900 font-medium">
                      {selected?.address?.firstName} {selected?.address?.lastName}
                    </p>
                    <p className="text-gray-600">{selected?.address?.email}</p>
                    <p className="text-gray-600">{selected?.address?.phone}</p>
                    <p className="text-gray-600 pt-2">
                      {selected?.address?.street}
                      <br />
                      {selected?.address?.city}, {selected?.address?.state} {selected?.address?.postalCode}
                    </p>
                  </div>
                </div>

                <div className="rounded-lg bg-gray-50 border border-gray-200 p-5">
                  <p className="font-semibold text-gray-900 mb-4">Order Summary</p>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items</span>
                      <span className="font-medium text-gray-900">{selected.items.length}</span>
                    </div>
                    <div className="pt-2 border-t border-gray-200"></div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="text-lg font-bold text-gray-900">₹{selected.totalAmount.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-semibold text-gray-900">Items in Order</p>
                {selected.items.map((it, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0 border border-gray-200">
                      {it?.product?.images?.[0] && (
                        <Image src={it.product.images[0] || "/placeholder.svg"} alt="" fill className="object-cover" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 text-sm">{it?.product?.name || "Product"}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        Size: <span className="font-medium">{it.size || "-"}</span> • Qty:{" "}
                        <span className="font-medium">{it.quantity}</span>
                      </p>
                    </div>
                    <p className="font-semibold text-gray-900 text-sm flex-shrink-0">₹{it.price.toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    updateStatus(selected._id, { orderStatus: "shipped" })
                    setSelected(null)
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-all font-medium text-sm border border-amber-200"
                >
                  <Truck className="w-4 h-4" /> Mark Shipped
                </button>
                <button
                  onClick={() => {
                    updateStatus(selected._id, { orderStatus: "delivered" })
                    setSelected(null)
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 transition-all font-medium text-sm border border-emerald-200"
                >
                  <CheckCircle className="w-4 h-4" /> Mark Delivered
                </button>
                <button
                  onClick={() => {
                    cancelOrder(selected._id)
                    setSelected(null)
                  }}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-red-50 text-red-700 hover:bg-red-100 transition-all font-medium text-sm border border-red-200"
                >
                  <Ban className="w-4 h-4" /> Cancel Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
