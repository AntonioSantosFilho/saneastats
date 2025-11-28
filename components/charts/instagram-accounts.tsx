"use client"

import { ResponsiveContainer } from "recharts"

export function InstagramAccountsChart() {
  const accountsReached = 50454
  const growth = 168.2

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <h3 className="text-lg font-semibold text-white mb-4">Contas Alcançadas</h3>
      <div className="flex flex-col items-center justify-center h-[250px]">
        <div className="text-center mb-4">
          <p className="text-5xl font-bold text-white mb-2">{accountsReached.toLocaleString("pt-BR")}</p>
          <p className="text-sm text-white/70 mb-4">contas alcançadas</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/40 rounded-lg">
          <span className="text-green-400 font-semibold text-2xl">+{growth}%</span>
          <span className="text-white/80 text-sm">crescimento</span>
        </div>
        <p className="text-xs text-white/60 mt-4 text-center max-w-sm">
          Crescimento em relação ao período anterior
        </p>
      </div>
    </div>
  )
}

