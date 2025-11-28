"use client"

import { useEffect, useState } from "react"
import { DashboardHeader } from "@/components/dashboard-header"
import { CategoryChart } from "@/components/charts/category-chart"
import { HorizontalBarChart } from "@/components/charts/bar-chart"
import { StateChart } from "@/components/charts/state-chart"
import { TimelineChart } from "@/components/charts/timeline-chart"
import { TransportChart } from "@/components/charts/transport-chart"
import { CityTreemap } from "@/components/charts/city-chart"
import { CredenciadoDonut } from "@/components/charts/donut-stats"
import { FormacaoChart } from "@/components/charts/formacao-chart"
import { AreaDistributionChart } from "@/components/charts/area-chart"
import { PessoasTransporteChart } from "@/components/charts/pessoas-transporte-chart"
import { CredenciamentoTimeline } from "@/components/charts/credenciamento-timeline"
import { PaisChart } from "@/components/charts/pais-chart"
import { HourChart } from "@/components/charts/hour-chart"
import { InstagramReachChart } from "@/components/charts/instagram-reach"
import { InstagramAccountsChart } from "@/components/charts/instagram-accounts"
import { InstagramActivityChart } from "@/components/charts/instagram-activity"
import { InstagramContentChart } from "@/components/charts/instagram-content"
import { fetchCSVWithEncoding, parseCSV, countByField, toChartData, type Attendee } from "@/lib/parse-csv"
import { CHART_COLORS } from "@/lib/chart-colors"

export default function Dashboard() {
  const [attendees, setAttendees] = useState<Attendee[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCSVWithEncoding("/data.csv")
      .then((text) => {
        const parsed = parseCSV(text)
        setAttendees(parsed)
        setLoading(false)
      })
      .catch((err) => {
        console.error("[v0] Error loading CSV:", err)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-[#f18c42] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white/70">Carregando dados...</p>
        </div>
      </div>
    )
  }

  const total = attendees.length
  const credenciados = attendees.filter((a) => a.credenciado === "sim").length
  const aprovados = attendees.filter((a) => a.inscricao === "Aprovado").length
  const pendentes = attendees.filter((a) => a.inscricao === "Pendente" || !a.inscricao).length

  const categoriaData = toChartData(countByField(attendees, "categoria"))
  const ufData = toChartData(countByField(attendees, "uf"))
  const cidadeData = toChartData(countByField(attendees, "cidade"))
  const formacaoData = toChartData(countByField(attendees, "formacao"))
  const instituicaoData = toChartData(countByField(attendees, "instituicao"))
  const transporteData = toChartData(countByField(attendees, "transporte"))
  const hospedagemData = toChartData(countByField(attendees, "hospedagem"))
  const areaData = toChartData(countByField(attendees, "area"))
  const subAreaData = toChartData(countByField(attendees, "subArea"))
  const paisData = toChartData(countByField(attendees, "pais"))

  const totalCidades = Object.keys(countByField(attendees, "cidade")).filter(
    (c) => c !== "Não informado" && c !== "",
  ).length
  const totalInstituicoes = Object.keys(countByField(attendees, "instituicao")).filter(
    (i) => i !== "Não informado" && i !== "",
  ).length

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <DashboardHeader
          total={total}
          credenciados={credenciados}
          aprovados={aprovados}
          pendentes={pendentes}
          totalCidades={totalCidades}
          totalInstituicoes={totalInstituicoes}
        />

        {/* Row 1: Key metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <CategoryChart data={categoriaData} title="Inscritos por Categoria" />
          <CredenciadoDonut credenciados={credenciados} naoCred={total - credenciados} />
          <FormacaoChart data={formacaoData} title="Nível de Formação" />
        </div>

        {/* Row 2: Geographic */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <StateChart data={ufData} />
          <CityTreemap data={cidadeData} />
        </div>

        {/* Row 3: Timelines */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TimelineChart attendees={attendees} />
          <CredenciamentoTimeline attendees={attendees} />
        </div>

        {/* Row 4: Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <AreaDistributionChart data={areaData} title="Distribuição por Área" />
          <AreaDistributionChart data={subAreaData} title="Distribuição por Sub-Área" />
        </div>

        {/* Row 5: Institutions & Country */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <HorizontalBarChart data={instituicaoData} title="Top 10 Instituições" color={CHART_COLORS[0]} />
          <PaisChart data={paisData} />
        </div>

        {/* Row 6: Transport & Accommodation */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          <TransportChart data={transporteData} title="Meio de Transporte" />
          <TransportChart data={hospedagemData} title="Tipo de Hospedagem" />
          <PessoasTransporteChart attendees={attendees} />
        </div>

        <div className="grid grid-cols-1 gap-6 mb-6">
          <HourChart attendees={attendees} />
        </div>

        {/* Row 8: Instagram Analytics */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Métricas do Instagram</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <InstagramReachChart />
            <InstagramAccountsChart />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <InstagramActivityChart />
            <InstagramContentChart />
          </div>
        </div>
      </div>
    </div>
  )
}
