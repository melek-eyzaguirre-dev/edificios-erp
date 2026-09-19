import { apiClient } from '@/lib/api-client'

export interface DashboardSummary {
  kpis: { reservas_mes: number; visitas_hoy: number; visitas_dentro: number; novedades_abiertas: number }
  series: Array<{ fecha: string; visitas: number; novedades: number }>
}

export async function getDashboardSummary(condominioId: number): Promise<DashboardSummary> {
  return (await apiClient.get<DashboardSummary>('/dashboard/summary', { params: { condominio_id: condominioId } })).data
}