import { apiClient } from '@/lib/api-client'
import type { NuevaVisitaInput, Visita, EstadoVisita } from '../types'

interface PaginatedResponse { data: Visita[] }

const mapVisita = (visita: Visita & Record<string, unknown>): Visita => ({
  ...visita,
  unidadId: Number(visita.unidad_id ?? visita.unidadId),
  nombreVisitante: String(visita.nombre_visitante ?? visita.nombreVisitante),
  rutVisitante: (visita.rut_visitante ?? visita.rutVisitante) as string | null,
  autorizadoDesde: (visita.autorizado_desde ?? visita.autorizadoDesde) as string | null,
  autorizadoHasta: (visita.autorizado_hasta ?? visita.autorizadoHasta) as string | null,
  horaIngreso: (visita.hora_ingreso ?? visita.horaIngreso) as string | null,
  horaSalida: (visita.hora_salida ?? visita.horaSalida) as string | null,
  registradoPor: (visita.registrado_por ?? visita.registradoPor) as Visita['registradoPor'],
  motivoRechazo: (visita.motivo_rechazo ?? visita.motivoRechazo) as string | null,
})

export const visitasApi = {
  listar: async (condominioId: number, rut = ''): Promise<Visita[]> => (await apiClient.get<PaginatedResponse>('/visitas', { params: { condominio_id: condominioId, rut: rut || undefined } })).data.data.map((visita) => mapVisita(visita as Visita & Record<string, unknown>)),
  crear: async (input: NuevaVisitaInput): Promise<Visita> => (await apiClient.post<Visita>('/visitas', {
    unidad_id: input.unidadId,
    nombre_visitante: input.nombreVisitante,
    rut_visitante: input.rutVisitante || undefined,
    autorizado_desde: input.autorizadoDesde || undefined,
    autorizado_hasta: input.autorizadoHasta || undefined,
  })).data,
  actualizarEstado: async (id: number, estado: EstadoVisita): Promise<Visita> => (await apiClient.patch<Visita>(`/visitas/${id}`, { estado })).data,
  reportarNoAutorizada: async (id: number, motivo: string): Promise<Visita> => (await apiClient.post<Visita>(`/visitas/${id}/reportar-no-autorizada`, { motivo_rechazo: motivo })).data,
  eliminar: async (id: number): Promise<void> => { await apiClient.delete(`/visitas/${id}`) },
}