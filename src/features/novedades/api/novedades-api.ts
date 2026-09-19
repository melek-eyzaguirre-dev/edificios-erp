import { apiClient } from '@/lib/api-client'
import type { NuevaNovedadInput, Novedad, EstadoNovedad } from '../types'

interface PaginatedResponse {
  data: Novedad[]
}

const mapNovedad = (item: Novedad & Record<string, unknown>): Novedad => ({
  ...item,
  createdAt: String(item.created_at ?? item.createdAt ?? ''),
  evidenciaPath: (item.evidencia_path ?? item.evidenciaPath) as string | null,
  registradoPor: (item.registrado_por ?? item.registradoPor) as Novedad['registradoPor'],
  turno: item.turno as Novedad['turno'],
})

export const novedadesApi = {
  listar: async (condominioId: number): Promise<Novedad[]> => {
    const { data } = await apiClient.get<PaginatedResponse>('/novedades', { params: { condominio_id: condominioId } })
    return data.data.map((item) => mapNovedad(item as Novedad & Record<string, unknown>))
  },
  crear: async (input: NuevaNovedadInput): Promise<Novedad> => {
    const form = new FormData()
    form.append('condominio_id', String(input.condominioId))
    form.append('titulo', input.titulo)
    form.append('descripcion', input.descripcion)
    form.append('prioridad', input.prioridad)
    if (input.turnoId) form.append('turno_id', String(input.turnoId))
    if (input.fechaHora) form.append('fecha_hora', input.fechaHora)
    if (input.evidencia) form.append('evidencia', input.evidencia)
    const { data } = await apiClient.post<Novedad>('/novedades', form)
    return data
  },
  actualizarEstado: async (id: number, estado: EstadoNovedad): Promise<Novedad> => {
    const { data } = await apiClient.patch<Novedad>(`/novedades/${id}`, { estado })
    return data
  },
}