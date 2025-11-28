"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import type { Attendee } from "@/lib/parse-csv"

interface Props {
  attendees: Attendee[]
}

export function DataTable({ attendees }: Props) {
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(0)
  const perPage = 15

  const filtered = attendees.filter(
    (a) =>
      a.nome.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.cidade.toLowerCase().includes(search.toLowerCase()) ||
      a.instituicao.toLowerCase().includes(search.toLowerCase()),
  )

  const totalPages = Math.ceil(filtered.length / perPage)
  const paged = filtered.slice(page * perPage, (page + 1) * perPage)

  return (
    <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
        <h3 className="text-lg font-semibold text-white">Tabela de Inscritos</h3>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
          <Input
            placeholder="Buscar por nome, email, cidade..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
            className="pl-9 bg-white/10 border-white/20 text-white placeholder:text-white/50"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/20">
              <th className="text-left py-3 px-2 text-white/70 font-medium">Nome</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Email</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">UF</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Cidade</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Instituição</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Categoria</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Formação</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Status</th>
              <th className="text-left py-3 px-2 text-white/70 font-medium">Credenciado</th>
            </tr>
          </thead>
          <tbody>
            {paged.map((a, i) => (
              <tr key={i} className="border-b border-white/10 hover:bg-white/5">
                <td className="py-3 px-2 text-white">{a.nome || "-"}</td>
                <td className="py-3 px-2 text-white">{a.email || "-"}</td>
                <td className="py-3 px-2 text-white">{a.uf || "-"}</td>
                <td className="py-3 px-2 text-white">{a.cidade || "-"}</td>
                <td className="py-3 px-2 text-white max-w-[200px] truncate">{a.instituicao || "-"}</td>
                <td className="py-3 px-2 text-white">{a.categoria || "-"}</td>
                <td className="py-3 px-2 text-white">{a.formacao || "-"}</td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      a.inscricao === "Aprovado" ? "bg-[#4ecdc4]/20 text-[#4ecdc4]" : "bg-[#ff6b6b]/20 text-[#ff6b6b]"
                    }`}
                  >
                    {a.inscricao || "Pendente"}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      a.credenciado === "sim" ? "bg-[#4ecdc4]/20 text-[#4ecdc4]" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {a.credenciado === "sim" ? "Sim" : "Não"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-sm text-white/70">
          Mostrando {page * perPage + 1} - {Math.min((page + 1) * perPage, filtered.length)} de {filtered.length}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={page === 0}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            disabled={page >= totalPages - 1}
            className="bg-white/10 border-white/20 text-white hover:bg-white/20"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
