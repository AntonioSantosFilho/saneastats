"use client"

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

interface Props {
  credenciados: number
  naoCred: number
}

export function CredenciadoDonut({ credenciados, naoCred }: Props) {
  const data = [
    { name: "Credenciados", value: credenciados },
    { name: "Não Credenciados", value: naoCred },
  ]
  const total = credenciados + naoCred
  const percent = ((credenciados / total) * 100).toFixed(1)

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Taxa de Credenciamento</h3>
      <div className="h-[250px] relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={70}
              outerRadius={100}
              dataKey="value"
              startAngle={90}
              endAngle={-270}
            >
              <Cell fill="#4ecdc4" />
              <Cell fill="rgba(255,255,255,0.2)" />
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-bold text-white">{percent}%</span>
          <span className="text-sm text-white/70">Credenciados</span>
        </div>
      </div>
      <div className="flex justify-center gap-6 mt-2">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#4ecdc4]" />
          <span className="text-sm text-white/70">Sim ({credenciados})</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-white/20" />
          <span className="text-sm text-white/70">Não ({naoCred})</span>
        </div>
      </div>
    </div>
  )
}
