import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCondominioStore } from '@/store/condominio-store'
import { estacionamientosApi } from '../api/estacionamientos-api'
import type { NuevoEstacionamiento } from '../api/estacionamientos-api'

export function useEstacionamientos() { const id = useCondominioStore((state) => state.condominioActivoId); return useQuery({ queryKey: ['estacionamientos', id], queryFn: () => estacionamientosApi.listar(id!), enabled: !!id }) }
export function useCrearEstacionamiento() { const client = useQueryClient(); return useMutation({ mutationFn: (input: NuevoEstacionamiento) => estacionamientosApi.crear(input), onSuccess: () => client.invalidateQueries({ queryKey: ['estacionamientos'] }) }) }
export function useCambiarDisponibilidad() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, disponible }: { id: number; disponible: boolean }) => estacionamientosApi.actualizar(id, disponible), onSuccess: () => client.invalidateQueries({ queryKey: ['estacionamientos'] }) }) }
export function useEliminarEstacionamiento() { const client = useQueryClient(); return useMutation({ mutationFn: estacionamientosApi.eliminar, onSuccess: () => client.invalidateQueries({ queryKey: ['estacionamientos'] }) }) }