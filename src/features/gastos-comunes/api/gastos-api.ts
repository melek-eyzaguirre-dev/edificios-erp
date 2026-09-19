import { apiClient } from '@/lib/api-client'

export interface Periodo { id: number; periodo: string; total_gastos: number; estado: string; cargos_count: number }
export interface Cargo { id: number; unidad_id: number; monto: number; pagado: number; vencimiento?: string | null; unidad?: { numero: string; torre?: string | null } }
export interface PeriodoDetalle extends Periodo { cargos: Cargo[] }

export const gastosApi = {
  listar: async (condominioId: number) => (await apiClient.get<{ data: Periodo[] }>('/gastos-comunes', { params: { condominio_id: condominioId } })).data.data,
  detalle: async (id: number) => (await apiClient.get<PeriodoDetalle>(`/gastos-comunes/${id}/detalle`)).data,
  crearPeriodo: async (input: { condominioId: number; periodo: string; totalGastos: number }) => (await apiClient.post<Periodo>('/gastos-comunes', { condominio_id: input.condominioId, periodo: input.periodo, total_gastos: input.totalGastos })).data,
  emitirCargos: async (id: number, cargos: Array<{ unidad_id: number; monto: number; vencimiento: string }>) => (await apiClient.post(`/gastos-comunes/${id}/cargos`, { cargos })).data,
  distribuirPorProrrateo: async (id: number, vencimiento: string) => (await apiClient.post(`/gastos-comunes/${id}/distribuir`, { vencimiento })).data,
  registrarPago: async (id: number, pagado: number) => (await apiClient.post(`/gastos-comunes/cargos/${id}/pagos`, { pagado })).data,
}