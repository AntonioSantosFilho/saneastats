"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { CHART_COLORS } from "@/lib/chart-colors"

export function InstagramReachChart() {
  const data = [
    { name: "Seguidores", value: 50 },
    { name: "Não Seguidores", value: 50 },
  ]

  const adsData = [
    { name: "Anúncios", value: 11.5 },
    { name: "Orgânico", value: 88.5 },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-2">Alcance e Visualizações</h3>
      <p className="text-sm text-white/70 mb-4">Total: 387.249 visualizações</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="h-[250px]">
          <h4 className="text-sm text-white/80 mb-2 text-center">Distribuição de Seguidores</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={data} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
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
                formatter={(value) => <span style={{ color: "#fff", fontSize: "12px" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="h-[250px]">
          <h4 className="text-sm text-white/80 mb-2 text-center">Origem das Visualizações</h4>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={adsData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={2} dataKey="value">
                {adsData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={index === 0 ? CHART_COLORS[2] : CHART_COLORS[1]} />
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
                formatter={(value) => <span style={{ color: "#fff", fontSize: "12px" }}>{value}</span>}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

