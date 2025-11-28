"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { CHART_COLORS } from "@/lib/chart-colors"

interface ChartProps {
  data: { name: string; value: number }[]
  title: string
}

export function TransportChart({ data, title }: ChartProps) {
  const filtered = data.filter((d) => d.name && d.name !== "" && d.name !== "Não informado")
  const total = filtered.reduce((acc, item) => acc + item.value, 0)

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">{title}</h3>
      <div className="h-[380px] overflow-hidden">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart margin={{ top: 10, right: 10, bottom: 70, left: 10 }}>
            <Pie
              data={filtered}
              cx="50%"
              cy="38%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {filtered.map((_, index) => (
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
              formatter={(value: number, name: string) => [
                `${value} (${((value / total) * 100).toFixed(1)}%)`,
                name,
              ]}
            />
            <Legend
              verticalAlign="bottom"
              height={90}
              iconType="circle"
              wrapperStyle={{ 
                paddingTop: "10px",
                fontSize: "11px",
                maxWidth: "100%",
                overflow: "hidden",
              }}
              formatter={(value: string, entry: any) => {
                const percent = entry?.payload?.value ? ((entry.payload.value / total) * 100).toFixed(1) : "0"
                const label = value.length > 18 ? value.substring(0, 18) + "..." : value
                return (
                  <span 
                    style={{ 
                      color: "#fff", 
                      fontSize: "11px",
                      padding: "3px 8px",
                      borderRadius: "4px",
                      transition: "all 0.2s ease",
                      cursor: "pointer",
                      display: "inline-block",
                      maxWidth: "100%",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = "rgba(241, 140, 66, 0.4)"
                      e.currentTarget.style.color = "#fff"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent"
                      e.currentTarget.style.color = "#fff"
                    }}
                  >
                    {label} ({percent}%)
                  </span>
                )
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
