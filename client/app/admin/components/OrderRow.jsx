import Image from "next/image";
import Badge from "../ui/Badge";

const statusTone = (s) =>
  s === "processing"
    ? "blue"
    : s === "shipped"
    ? "yellow"
    : s === "delivered"
    ? "green"
    : s === "cancelled"
    ? "red"
    : "gray";

export default function OrderRow({ order, onSelect }) {
  return (
    <tr className="border-b hover:bg-gray-50">
      <td className="px-6 py-4">
        <div className="font-semibold">#{order._id.slice(-8)}</div>
      </td>

      <td className="px-6 py-4">
        <div className="font-medium">
          {order.address?.firstName} {order.address?.lastName}
        </div>
        <div className="text-xs text-gray-600">
          {order.address?.email}
        </div>
      </td>

      <td className="px-6 py-4">
        <div className="flex -space-x-2">
          {order.items.slice(0, 3).map((it, i) => (
            <div
              key={i}
              className="relative w-8 h-8 rounded-lg overflow-hidden border"
            >
              {it?.product?.images?.[0] && (
                <Image
                  src={it.product.images[0]}
                  alt=""
                  fill
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-600 mt-1">
          {order.items.length} item(s)
        </p>
      </td>

      <td className="px-6 py-4 font-semibold">
        ₹{order.totalAmount.toLocaleString()}
      </td>

      <td className="px-6 py-4">
        <Badge
          tone={
            order.paymentStatus === "paid"
              ? "green"
              : order.paymentStatus === "failed"
              ? "red"
              : "yellow"
          }
        >
          {order.paymentStatus}
        </Badge>
      </td>

      <td className="px-6 py-4">
        <Badge tone={statusTone(order.orderStatus)}>
          {order.orderStatus}
        </Badge>
      </td>

      <td className="px-6 py-4 text-right">
        <button
          onClick={() => onSelect(order)}
          className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
        >
          View
        </button>
      </td>
    </tr>
  );
}
