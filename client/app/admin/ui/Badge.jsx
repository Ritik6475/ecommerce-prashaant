import clsx from "clsx"

export default function Badge({ children, tone = "gray", size = "sm" }) {
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

  return (
    <span className={clsx("rounded-full font-medium", sizeMap[size], toneMap[tone])}>
      {children}
    </span>
  )
}
