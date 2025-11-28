"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import type { Attendee } from "@/lib/parse-csv"

interface Props {
  attendees: Attendee[]
}

export function HourChart({ attendees }: Props) {
  const hourCounts: Record<string, number> = {}

  attendees.forEach((a) => {
    if (a.horaInscricao) {
      const hour = a.horaInscricao.split(":")[0]
      if (hour) {
        hourCounts[hour] = (hourCounts[hour] || 0) + 1
      }
    }
  })

  const data = Object.entries(hourCounts)
    .map(([hour, count]) => ({ hour: `${hour}h`, count }))
    .sort((a, b) => Number.parseInt(a.hour) - Number.parseInt(b.hour))

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Inscrições por Hora do Dia</h3>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
            <XAxis dataKey="hour" tick={{ fill: "rgba(255,255,255,0.7)", fontSize: 10 }} />
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
            <Bar dataKey="count" fill="#ffe66d" radius={[4, 4, 0, 0]} name="Inscrições" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
