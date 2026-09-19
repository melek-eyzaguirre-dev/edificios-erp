import { apiClient } from '@/lib/api-client'

export interface Estacionamiento { id: number; codigo: string; tipo: 'fijo' | 'visita'; unidadId?: number | null; disponible: boolean; unidad?: { numero: string; torre?: string | null } }
export interface NuevoEstacionamiento { condominioId: number; codigo: string; tipo: 'fijo' | 'visita'; unidadId?: number | null; moneda?: string; tarifaHora?: number; maxHorasVisita?: number }

const map = (item: Estacionamiento & Record<string, unknown>): Estacionamiento => ({ ...item, unidadId: (item.unidad_id ?? item.unidadId) as number | null })

export const estacionamientosApi = {
  listar: async (condominioId: number) => (await apiClient.get<Estacionamiento[]>('/estacionamientos', { params: { condominio_id: condominioId } })).data.map((item) => map(item as Estacionamiento & Record<string, unknown>)),
  crear: async (input: NuevoEstacionamiento) => (await apiClient.post<Estacionamiento>('/estacionamientos', { condominio_id: input.condominioId, codigo: input.codigo, tipo: input.tipo, unidad_id: input.unidadId || undefined, moneda: input.moneda, tarifa_hora: input.tarifaHora, max_horas_visita: input.maxHorasVisita })).data,
  actualizar: async (id: number, disponible: boolean) => (await apiClient.patch<Estacionamiento>(`/estacionamientos/${id}`, { disponible })).data,
  eliminar: async (id: number) => { await apiClient.delete(`/estacionamientos/${id}`) },
}