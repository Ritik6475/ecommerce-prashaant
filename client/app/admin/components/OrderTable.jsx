import OrderRow from "./OrderRow"

export default function OrdersTable({ orders, loading, onSelect }) {
  if (loading) return <p className="p-6 text-center">Loading…</p>
  if (!orders.length) return <p className="p-6 text-center">No orders found</p>

  return (
    <table className="w-full text-sm">
      <tbody>
        {orders.map((o) => (
          <OrderRow key={o._id} order={o} onSelect={onSelect} />
        ))}
      </tbody>
    </table>
  )
}
