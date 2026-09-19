import { apiClient } from '@/lib/api-client'

export interface Asistencia { id: number; fecha: string; entrada?: string | null; salida?: string | null; minutos_extra: number; usuario?: { name: string; rol: string }; turno?: { tipo: string; sistema: string } }
export const asistenciasApi = {
  listar: async (): Promise<Asistencia[]> => (await apiClient.get<{ data: Asistencia[] }>('/asistencias')).data.data,
  crear: async (input: Record<string, unknown>) => (await apiClient.post('/asistencias', input)).data,
  entrada: async (id: number) => (await apiClient.post(`/asistencias/${id}/entrada`)).data,
  salida: async (id: number) => (await apiClient.post(`/asistencias/${id}/salida`)).data,
}