"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { HelpCircle } from "lucide-react"
import { useState } from "react"

interface ChartProps {
  data: { name: string; value: number }[]
  title: string
  color?: string
}

export function HorizontalBarChart({ data, title, color }: ChartProps) {
  const [showTooltip, setShowTooltip] = useState(false)

  const naoRespondeu = data.find(
    (item) =>
      item.name.toLowerCase().includes("não respondeu") ||
      item.name.toLowerCase().includes("nao respondeu") ||
      item.name === "" ||
      item.name === "Não informado",
  )
  const filteredData = data.filter(
    (item) =>
      !item.name.toLowerCase().includes("não respondeu") &&
      !item.name.toLowerCase().includes("nao respondeu") &&
      item.name !== "" &&
      item.name !== "Não informado",
  )

  const top10 = filteredData.slice(0, 10)
  const naoRespondeuCount = naoRespondeu?.value || 0

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        {naoRespondeuCount > 0 && (
          <div className="relative">
            <button
              onMouseEnter={() => setShowTooltip(true)}
              onMouseLeave={() => setShowTooltip(false)}
              className="text-white/60 hover:text-white transition-colors"
            >
              <HelpCircle size={18} />
            </button>
            {showTooltip && (
              <div className="absolute right-0 top-6 bg-[#1e3c5a] border border-white/20 rounded-lg px-3 py-2 text-sm text-white whitespace-nowrap z-10 shadow-lg">
                {naoRespondeuCount} não responderam
              </div>
            )}
          </div>
        )}
      </div>
      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={top10} layout="vertical" margin={{ left: 80, right: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis type="number" tick={{ fill: "rgba(255,255,255,0.7)" }} />
            <YAxis
              dataKey="name"
              type="category"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 12 }}
              width={75}
              tickFormatter={(value) => (value.length > 12 ? value.slice(0, 12) + "..." : value)}
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
            <Bar dataKey="value" fill={color || "#f18c42"} radius={[0, 4, 4, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
