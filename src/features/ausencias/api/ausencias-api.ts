import { apiClient } from '@/lib/api-client'

export interface Ausencia { id: number; tipo: string; desde: string; hasta: string; motivo: string; estado: string; documento_path?: string | null; usuario?: { name: string; rut?: string | null } }
export const ausenciasApi = {
  listar: async () => (await apiClient.get<{ data: Ausencia[] }>('/solicitudes-ausencia')).data.data,
  crear: async (input: { tipo: string; desde: string; hasta: string; motivo: string; documento?: File }) => {
    const form = new FormData(); form.append('tipo', input.tipo); form.append('desde', input.desde); form.append('hasta', input.hasta); form.append('motivo', input.motivo); if (input.documento) form.append('documento', input.documento)
    return (await apiClient.post<Ausencia>('/solicitudes-ausencia', form)).data
  },
  resolver: async (id: number, estado: 'aprobada' | 'rechazada', observaciones: string) => (await apiClient.patch(`/solicitudes-ausencia/${id}`, { estado, observaciones })).data,
}