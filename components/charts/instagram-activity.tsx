"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"
import { CHART_COLORS } from "@/lib/chart-colors"

export function InstagramActivityChart() {
  const data = [
    {
      name: "Total de Ações",
      value: 4589,
      growth: 547.2,
    },
    {
      name: "Visitas ao Perfil",
      value: 4136,
      growth: 589.3,
    },
    {
      name: "Cliques em Links",
      value: 453,
      growth: 315.6,
    },
  ]

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Atividade do Perfil</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="name"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 11 }}
              angle={-15}
              textAnchor="end"
              height={80}
              tickFormatter={(value) => value.split(" ")[0]}
            />
            <YAxis tick={{ fill: "rgba(255,255,255,0.7)" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 60, 90, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number, name: string, props: any) => {
                const growth = props?.payload?.growth || 0
                return [`${value.toLocaleString("pt-BR")} (+${growth}%)`, "Valor"]
              }}
            />
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-3 gap-2 mt-4">
        {data.map((item, index) => (
          <div key={index} className="text-center">
            <p className="text-xs text-white/60">{item.name}</p>
            <p className="text-sm font-semibold text-white">{item.value.toLocaleString("pt-BR")}</p>
            <p className="text-xs text-green-400">+{item.growth}%</p>
          </div>
        ))}
      </div>
    </div>
  )
}

