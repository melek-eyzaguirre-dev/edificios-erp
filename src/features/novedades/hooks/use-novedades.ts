import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCondominioStore } from '@/store/condominio-store'
import { novedadesApi } from '../api/novedades-api'
import type { EstadoNovedad, NuevaNovedadInput } from '../types'

export function useNovedades() {
  const condominioId = useCondominioStore((state) => state.condominioActivoId)
  return useQuery({
    queryKey: ['novedades', condominioId],
    queryFn: () => novedadesApi.listar(condominioId!),
    enabled: !!condominioId,
  })
}

export function useCrearNovedad() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (input: NuevaNovedadInput) => novedadesApi.crear(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['novedades'] }),
  })
}

export function useActualizarEstadoNovedad() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, estado }: { id: number; estado: EstadoNovedad }) => novedadesApi.actualizarEstado(id, estado),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['novedades'] }),
  })
}