"use client"

import { useEffect, useState, useCallback } from "react"
import api from "@/lib/axios"

export function useAdminOrders(secretOk) {
  const [orders, setOrders] = useState([])
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    pages: 1,
    limit: 12,
    total: 0,
  })

  const [filters, setFilters] = useState({
    q: "",
    status: "",
    paymentStatus: "",
  })

  /* ------------------ FETCH ORDERS ------------------ */
  const fetchOrders = useCallback(
    async (page = 1) => {
      setLoading(true)
      try {
        const { data } = await api.get("/admin/orders", {
          params: {
            ...filters,
            page,
            limit: pagination.limit,
          },
        })

        setOrders(data.items || [])
        setPagination(
          data.pagination || {
            page,
            pages: 1,
            limit: pagination.limit,
            total: 0,
          }
        )
      } finally {
        setLoading(false)
      }
    },
    [filters, pagination.limit]
  )

  /* ------------------ FETCH STATS ------------------ */
  const fetchStats = useCallback(async () => {
    const { data } = await api.get("/admin/stats")
    setStats(data)
  }, [])

  /* ------------------ UPDATE ORDER STATUS ------------------ */
  const updateStatus = async (orderId, patch) => {
    const { data } = await api.put(
      `/admin/orders/${orderId}/status`,
      patch
    )

    // ✅ Optimistic local update
    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? data.order : o
      )
    )

    await fetchStats()
  }

  /* ------------------ CANCEL ORDER ------------------ */
  const cancelOrder = async (orderId) => {
    const { data } = await api.put(
      `/admin/orders/${orderId}/cancel`
    )

    setOrders((prev) =>
      prev.map((o) =>
        o._id === orderId ? data.order : o
      )
    )

    await fetchStats()
  }

  /* ------------------ INITIAL LOAD ------------------ */
  useEffect(() => {
    if (!secretOk) return
    fetchOrders(1)
    fetchStats()
  }, [secretOk, fetchOrders, fetchStats])

  return {
    orders,
    stats,
    loading,
    pagination,
    filters,
    setFilters,
    fetchOrders,
    fetchStats,
    updateStatus,
    cancelOrder,
  }
}
