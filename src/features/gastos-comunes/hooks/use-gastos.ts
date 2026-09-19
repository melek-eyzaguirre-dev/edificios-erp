import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useCondominioStore } from '@/store/condominio-store'
import { gastosApi } from '../api/gastos-api'

export function useGastos() { const id = useCondominioStore((state) => state.condominioActivoId); return useQuery({ queryKey: ['gastos', id], queryFn: () => gastosApi.listar(id!), enabled: !!id }) }
export function useCrearPeriodo() { const client = useQueryClient(); return useMutation({ mutationFn: gastosApi.crearPeriodo, onSuccess: () => client.invalidateQueries({ queryKey: ['gastos'] }) }) }
export function useEmitirCargos() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, cargos }: { id: number; cargos: Array<{ unidad_id: number; monto: number; vencimiento: string }> }) => gastosApi.distribuirPorProrrateo(id, cargos[0]?.vencimiento ?? ''), onSuccess: () => client.invalidateQueries({ queryKey: ['gastos'] }) }) }
export function useRegistrarPago() { const client = useQueryClient(); return useMutation({ mutationFn: ({ id, pagado }: { id: number; pagado: number }) => gastosApi.registrarPago(id, pagado), onSuccess: () => client.invalidateQueries({ queryKey: ['gastos'] }) }) }