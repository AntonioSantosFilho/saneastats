"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Attendee } from "@/lib/parse-csv"

interface Props {
  attendees: Attendee[]
}

export function CredenciamentoTimeline({ attendees }: Props) {
  const dateCounts: Record<string, number> = {}

  attendees.forEach((a) => {
    if (a.credenciado === "sim" && a.dataCredenciamento && a.dataCredenciamento.trim() !== "") {
      dateCounts[a.dataCredenciamento] = (dateCounts[a.dataCredenciamento] || 0) + 1
    }
  })

  const data = Object.entries(dateCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => {
      const [dA, mA, yA] = a.date.split("/")
      const [dB, mB, yB] = b.date.split("/")
      return new Date(`${yA}-${mA}-${dA}`).getTime() - new Date(`${yB}-${mB}-${dB}`).getTime()
    })

  if (data.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Timeline de Credenciamento</h3>
        <div className="h-[300px] flex items-center justify-center text-white/70">
          Sem dados de credenciamento disponíveis
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Timeline de Credenciamento</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ left: 10, right: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis
              dataKey="date"
              tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              height={60}
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
            <Area
              type="monotone"
              dataKey="count"
              stroke="#f18c42"
              fill="#f18c42"
              fillOpacity={0.3}
              name="Credenciamentos"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
