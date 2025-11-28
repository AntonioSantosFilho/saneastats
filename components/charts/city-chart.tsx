"use client"

import { Treemap, ResponsiveContainer, Tooltip } from "recharts"
import { CHART_COLORS } from "@/lib/chart-colors"

interface ChartProps {
  data: { name: string; value: number }[]
}

export function CityTreemap({ data }: ChartProps) {
  const top15 = data.filter((d) => d.name && d.name !== "Não informado").slice(0, 15)
  const treeData = top15.map((item, index) => ({
    name: item.name,
    size: item.value,
    fill: CHART_COLORS[index % CHART_COLORS.length],
  }))

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Top 15 Cidades</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <Treemap
            data={treeData}
            dataKey="size"
            aspectRatio={4 / 3}
            stroke="#235d89"
            content={({ x, y, width, height, name, fill }) => (
              <g>
                <rect x={x} y={y} width={width} height={height} fill={fill} rx={4} />
                {width > 50 && height > 30 && (
                  <text
                    x={x + width / 2}
                    y={y + height / 2}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill="#1a1a1a"
                    fontSize={11}
                    fontWeight={600}
                  >
                    {name && name.length > 10 ? name.slice(0, 10) + "..." : name}
                  </text>
                )}
              </g>
            )}
          >
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(30, 60, 90, 0.95)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "8px",
                color: "#fff",
              }}
              formatter={(value: number) => [value, "Inscritos"]}
            />
          </Treemap>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
