"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { CHART_COLORS } from "@/lib/chart-colors"

interface ChartProps {
  data: { name: string; value: number }[]
  title: string
}

export function FormacaoChart({ data, title }: ChartProps) {
  const filtered = data.filter((d) => d.name && d.name !== "Não informado" && d.name !== "").slice(0, 10)

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={filtered} layout="vertical" margin={{ left: 100, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" horizontal={false} />
            <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.7)" }} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
              width={95}
              tickFormatter={(value) => (value.length > 15 ? value.slice(0, 15) + "..." : value)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 60, 90, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [`${value}`, "Valor"]}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
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
