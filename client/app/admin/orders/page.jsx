"use client"

import { useState } from "react"
import { useAdminAuth } from "../hooks/useAdminAuth"
import { useAdminOrders } from "../hooks/useAdminOrders"
import { useIsMobile } from "../hooks/useIsMobile"

import AdminGate from "../components/AdminGate"
import AdminHeader from "../components/AdminHeader"
import StatsGrid from "../components/StatsGrid"
import FiltersBar from "../components/FilterBars"
import OrdersTable from "../components/OrderTable"
import OrderModal from "../components/OrderModal"

export default function AdminPage() {
  
  const { secretOk, verify, logout } = useAdminAuth()
  const ordersState = useAdminOrders(secretOk)
  const isMobile = useIsMobile()
  const [selected, setSelected] = useState(null)

  // 🔐 Auth gate (safe now)
  if (!secretOk) {
    return <AdminGate onVerify={verify} />
  }

  // 📱 Mobile block (safe now)
  if (isMobile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6 text-center">
        <div className="max-w-md space-y-3">
          <h2 className="text-xl font-semibold">Admin Dashboard</h2>
          <p className="text-gray-600 text-sm">
            Admin panel is only accessible on desktop devices for security
            and better usability.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 mt-10">
      <AdminHeader onLogout={logout} />

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        <StatsGrid stats={ordersState.stats} />

        <FiltersBar
          filters={ordersState.filters}
          setFilters={ordersState.setFilters}
        />

        <OrdersTable
          orders={ordersState.orders}
          loading={ordersState.loading}
          onSelect={setSelected}
        />
      </div>

      {selected && (
        <OrderModal
  order={selected}
  onClose={() => setSelected(null)}
  onShip={() =>
    ordersState.updateStatus(selected._id, {
      orderStatus: "shipped",
    })
  }
  onDeliver={() =>
    ordersState.updateStatus(selected._id, {
      orderStatus: "delivered",
    })
  }
  onCancel={() =>
    ordersState.cancelOrder(selected._id)
  }
/>

      )}
    </div>
  )
}
