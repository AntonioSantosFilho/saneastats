"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Attendee } from "@/lib/parse-csv"

interface Props {
  attendees: Attendee[]
}

export function TimelineChart({ attendees }: Props) {
  const dateCounts: Record<string, number> = {}

  attendees.forEach((a) => {
    if (a.dataInscricao) {
      dateCounts[a.dataInscricao] = (dateCounts[a.dataInscricao] || 0) + 1
    }
  })

  const data = Object.entries(dateCounts)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => {
      const [dA, mA, yA] = a.date.split("/")
      const [dB, mB, yB] = b.date.split("/")
      return new Date(`${yA}-${mA}-${dA}`).getTime() - new Date(`${yB}-${mB}-${dB}`).getTime()
    })

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Timeline de Inscrições</h3>
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
            <Area type="monotone" dataKey="count" stroke="#4ecdc4" fill="#4ecdc4" fillOpacity={0.3} name="Inscrições" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
