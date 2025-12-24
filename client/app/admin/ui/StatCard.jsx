export default function StatCard({ icon: Icon, label, value, trend }) {
  return (
    <div className="rounded-xl bg-white p-5 border border-gray-200 hover:shadow-md transition">
      <div className="flex justify-between mb-3">
        <div className="p-2 bg-gray-50 rounded-lg">
          <Icon className="w-5 h-5 text-blue-600" />
        </div>
        {trend && <span className="text-xs text-emerald-600">↑ {trend}%</span>}
      </div>
      <p className="text-xs text-gray-600">{label}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
