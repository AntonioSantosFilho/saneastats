"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { CHART_COLORS } from "@/lib/chart-colors"

interface ChartProps {
  data: { name: string; value: number }[]
  title: string
}

export function CategoryChart({ data, title }: ChartProps) {
  const filteredData = data.filter((item) => {
    const isTime = /^\d{2}:\d{2}$/.test(item.name)
    return !isTime
  })

  const top8 = filteredData.slice(0, 8)
  const total = top8.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={top8} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
              {top8.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 60, 90, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number, name: string) => [`${value} (${((value / total) * 100).toFixed(1)}%)`, name]}
              labelFormatter={(label) => `Valor: ${label}`}
            />
            <Legend
              formatter={(value) => (
                <span style={{ color: "#fff" }}>{value.length > 20 ? value.slice(0, 20) + "..." : value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
