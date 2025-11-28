"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { CHART_COLORS } from "@/lib/chart-colors"

interface ChartProps {
  data: { name: string; value: number }[]
  title: string
}

export function AreaDistributionChart({ data, title }: ChartProps) {
  const filtered = data.filter((d) => d.name && d.name !== "Não informado" && d.name !== "").slice(0, 12)

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filtered} margin={{ bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={80}
              tickFormatter={(value) => (value.length > 15 ? value.slice(0, 15) + "..." : value)}
            />
            <YAxis tick={{ fill: "rgba(255,255,255,0.7)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 60, 90, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value}`, "Valor"]}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {filtered.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
