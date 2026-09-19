import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { reservasApi } from '../api/reservas-api'
import type { NuevaReservaInput } from '../types'
import { useCondominioStore } from '@/store/condominio-store'

/**
 * Hooks del módulo reservas. Los componentes solo usan estos hooks,
 * nunca importan reservasApi directamente. Esto centraliza el manejo
 * de caché, loading y errores en un solo lugar por módulo.
 */

export function useReservas() {
  const condominioId = useCondominioStore((s) => s.condominioActivoId)

  return useQuery({
    queryKey: ['reservas', condominioId],
    queryFn: () => reservasApi.listar(condominioId!),
    enabled: !!condominioId,
  })
}

export function useEspaciosDisponibles() {
  const condominioId = useCondominioStore((s) => s.condominioActivoId)

  return useQuery({
    queryKey: ['espacios-comunes', condominioId],
    queryFn: () => reservasApi.espaciosDisponibles(condominioId!),
    enabled: !!condominioId,
  })
}

export function useCrearReserva() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: NuevaReservaInput) => reservasApi.crear(input),
    onSuccess: () => {
      // Invalida la lista de reservas para que se refresque sola
      queryClient.invalidateQueries({ queryKey: ['reservas'] })
    },
  })
}

export function useCancelarReserva() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => reservasApi.cancelar(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['reservas'] })
    },
  })
}
