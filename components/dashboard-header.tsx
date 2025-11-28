import { Users, UserCheck, Clock, FileCheck, MapPin, Building2 } from "lucide-react"

interface StatsProps {
  total: number
  credenciados: number
  aprovados: number
  pendentes: number
  totalCidades: number
  totalInstituicoes: number
}

export function DashboardHeader({
  total,
  credenciados,
  aprovados,
  pendentes,
  totalCidades,
  totalInstituicoes,
}: StatsProps) {
  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold text-white mb-2">Dashboard de dados do II SANEA BRASIL</h1>
      <p className="text-white/70 mb-6">Análise completa dos dados de inscrição e credenciamento do evento</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-[#f18c42]/20 p-3 rounded-lg">
            <Users className="w-6 h-6 text-[#f18c42]" />
          </div>
          <div>
            <p className="text-sm text-white/70">Total Inscritos</p>
            <p className="text-2xl font-bold text-white">{total.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-[#4ecdc4]/20 p-3 rounded-lg">
            <UserCheck className="w-6 h-6 text-[#4ecdc4]" />
          </div>
          <div>
            <p className="text-sm text-white/70">Credenciados</p>
            <p className="text-2xl font-bold text-white">{credenciados.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-[#ffe66d]/20 p-3 rounded-lg">
            <FileCheck className="w-6 h-6 text-[#ffe66d]" />
          </div>
          <div>
            <p className="text-sm text-white/70">Aprovados</p>
            <p className="text-2xl font-bold text-white">{aprovados.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-[#ff6b6b]/20 p-3 rounded-lg">
            <Clock className="w-6 h-6 text-[#ff6b6b]" />
          </div>
          <div>
            <p className="text-sm text-white/70">Pendentes</p>
            <p className="text-2xl font-bold text-white">{pendentes.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-[#95e1d3]/20 p-3 rounded-lg">
            <MapPin className="w-6 h-6 text-[#95e1d3]" />
          </div>
          <div>
            <p className="text-sm text-white/70">Cidades</p>
            <p className="text-2xl font-bold text-white">{totalCidades.toLocaleString()}</p>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-5 flex items-center gap-4">
          <div className="bg-[#a8e6cf]/20 p-3 rounded-lg">
            <Building2 className="w-6 h-6 text-[#a8e6cf]" />
          </div>
          <div>
            <p className="text-sm text-white/70">Instituições</p>
            <p className="text-2xl font-bold text-white">{totalInstituicoes.toLocaleString()}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
