import { TrendingUp, ShoppingCart, Truck, CheckCircle } from "lucide-react";
import StatCard from "../ui/StatCard";

export default function StatsGrid({ stats }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        icon={TrendingUp}
        label="Total Revenue"
        value={`₹${(stats?.revenue || 0).toLocaleString()}`}
      />
      <StatCard
        icon={ShoppingCart}
        label="Total Orders"
        value={stats?.totalOrders || 0}
      />
      <StatCard
        icon={Truck}
        label="Shipped"
        value={stats?.byStatus?.shipped || 0}
      />
      <StatCard
        icon={CheckCircle}
        label="Delivered"
        value={stats?.byStatus?.delivered || 0}
      />
    </div>
  );
}
