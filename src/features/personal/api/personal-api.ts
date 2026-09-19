import { apiClient } from '@/lib/api-client'

export interface Personal { id: number; name: string; email: string; rut?: string | null; rol: string; telefono?: string | null }
export interface Unidad { id: number; numero: string; torre?: string | null }

export const personalApi = {
  listar: async (): Promise<Personal[]> => (await apiClient.get<Personal[]>('/personal')).data,
  unidades: async (condominioId: number): Promise<Unidad[]> => (await apiClient.get<Unidad[]>('/unidades', { params: { condominio_id: condominioId } })).data,
}