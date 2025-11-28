"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { CHART_COLORS } from "@/lib/chart-colors"

export function InstagramContentChart() {
  const data = [
    { name: "Stories", value: 43.0 },
    { name: "Posts", value: 42.1 },
    { name: "Reels", value: 14.9 },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Desempenho por Tipo de Conteúdo</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={100} paddingAngle={2} dataKey="value">
              {data.map((_, index) => (
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
              formatter={(value: number) => [`${value}%`, "Percentual"]}
            />
            <Legend
              formatter={(value) => <span style={{ color: "#fff" }}>{value}</span>}
              wrapperStyle={{ paddingTop: "20px" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-sm font-semibold text-white">{item.name}</p>
            <p className="text-lg font-bold text-white">{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

