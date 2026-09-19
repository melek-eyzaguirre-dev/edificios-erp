import { apiClient } from '@/lib/api-client'
import type { Reserva, NuevaReservaInput, EspacioComun } from '../types'

/**
 * Toda la comunicación HTTP del módulo "reservas" vive acá, separada
 * de los componentes. Los componentes nunca llaman a axios directamente:
 * llaman a estas funciones (a través de los hooks de React Query).
 */
export const reservasApi = {
  listar: async (condominioId: number): Promise<Reserva[]> => {
    const { data } = await apiClient.get<Reserva[]>('/reservas', { params: { condominio_id: condominioId } })
    return data
  },

  crear: async (input: NuevaReservaInput): Promise<Reserva> => {
    const { data } = await apiClient.post<Reserva>('/reservas', {
      espacio_comun_id: input.espacioComunId,
      unidad_id: input.unidadId,
      inicio: input.inicio,
      fin: input.fin,
    })
    return data
  },

  cancelar: async (id: number): Promise<void> => {
    await apiClient.delete(`/reservas/${id}`)
  },

  espaciosDisponibles: async (condominioId: number): Promise<EspacioComun[]> => {
    const { data } = await apiClient.get<EspacioComun[]>('/espacios-comunes', { params: { condominio_id: condominioId } })
    return data
  },
}
