import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import { Card, CardTitle } from '@/components/ui/card'
import { useDashboardSummary } from '../hooks/use-dashboard-summary'

function exportSummary(data: { kpis: Record<string, number>; series: Array<{ fecha: string; visitas: number; novedades: number }> }) {
  const rows = [['fecha', 'visitas', 'novedades'], ...data.series.map((row) => [row.fecha, String(row.visitas), String(row.novedades)])]
  const csv = rows.map((row) => row.join(',')).join('\n')
  const link = document.createElement('a')
  link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }))
  link.download = 'resumen-condominio.csv'
  link.click()
  URL.revokeObjectURL(link.href)
}

export function StatsOverview() {
  const { data, isLoading, isError } = useDashboardSummary()
  const kpis = [
    { label: 'Reservas este mes', valor: data?.kpis.reservas_mes ?? 0 },
    { label: 'Visitas registradas hoy', valor: data?.kpis.visitas_hoy ?? 0 },
    { label: 'Visitas dentro', valor: data?.kpis.visitas_dentro ?? 0 },
    { label: 'Novedades abiertas', valor: data?.kpis.novedades_abiertas ?? 0 },
  ]

  if (isLoading) return <p className="text-sm text-ink-500">Cargando indicadores...</p>
  if (isError) return <Card><p className="text-sm text-red-600">No se pudieron cargar los indicadores. Verifica que la sesión siga activa y que exista un condominio.</p></Card>

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => (
          <Card key={kpi.label}>
            <CardTitle>{kpi.label}</CardTitle>
            <p className="mt-2 text-2xl font-semibold text-ink-900">{kpi.valor}</p>
          </Card>
        ))}
      </div>

      <Card>
        <div className="flex items-center justify-between"><CardTitle>Actividad de los últimos 7 días</CardTitle>{data && <button type="button" onClick={() => exportSummary(data)} className="text-sm font-medium text-amber-600 hover:text-amber-700">Exportar CSV</button>}</div>
        <div className="mt-4 h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data?.series ?? []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e9ee" />
              <XAxis dataKey="fecha" stroke="#6c869c" fontSize={12} />
              <YAxis stroke="#6c869c" fontSize={12} />
              <Tooltip />
              <Bar dataKey="visitas" fill="#3a5169" radius={[4, 4, 0, 0]} />
              <Bar dataKey="novedades" fill="#c8842a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
