import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCondominioStore } from '@/store/condominio-store'
import { visitasApi } from '../api/visitas-api'
import type { EstadoVisita, NuevaVisitaInput } from '../types'

export function useVisitas(rut = '') {
  const condominioId = useCondominioStore((state) => state.condominioActivoId)
  return useQuery({ queryKey: ['visitas', condominioId, rut], queryFn: () => visitasApi.listar(condominioId!, rut), enabled: !!condominioId })
}

export function useCrearVisita() {
  const client = useQueryClient()
  return useMutation({ mutationFn: (input: NuevaVisitaInput) => visitasApi.crear(input), onSuccess: () => client.invalidateQueries({ queryKey: ['visitas'] }) })
}

export function useActualizarEstadoVisita() {
  const client = useQueryClient()
  return useMutation({ mutationFn: ({ id, estado }: { id: number; estado: EstadoVisita }) => visitasApi.actualizarEstado(id, estado), onSuccess: () => client.invalidateQueries({ queryKey: ['visitas'] }) })
}

export function useReportarVisita() {
  const client = useQueryClient()
  return useMutation({ mutationFn: ({ id, motivo }: { id: number; motivo: string }) => visitasApi.reportarNoAutorizada(id, motivo), onSuccess: () => client.invalidateQueries({ queryKey: ['visitas'] }) })
}

export function useEliminarVisita() {
  const client = useQueryClient()
  return useMutation({ mutationFn: (id: number) => visitasApi.eliminar(id), onSuccess: () => client.invalidateQueries({ queryKey: ['visitas'] }) })
}