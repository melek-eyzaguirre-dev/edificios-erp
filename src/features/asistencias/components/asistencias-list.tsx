import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { asistenciasApi } from '../api/asistencias-api'
import { useAuthStore } from '@/store/auth-store'

export function AsistenciasList() {
  const rol = useAuthStore((state) => state.usuario?.rol)
  const esPersonal = rol === 'conserje' || rol === 'personal_aseo'
  const client = useQueryClient()
  const { data, isLoading } = useQuery({ queryKey: ['asistencias'], queryFn: asistenciasApi.listar })
  const marcar = useMutation({ mutationFn: ({ id, accion }: { id: number; accion: 'entrada' | 'salida' }) => accion === 'entrada' ? asistenciasApi.entrada(id) : asistenciasApi.salida(id), onSuccess: () => client.invalidateQueries({ queryKey: ['asistencias'] }) })
  return <div className="space-y-5"><div><p className="text-sm font-medium text-amber-600">{esPersonal ? 'Mi jornada' : 'Administración'}</p><h1 className="mt-1 text-2xl font-semibold text-ink-900">{esPersonal ? 'Mis asistencias' : 'Asistencia del personal'}</h1><p className="mt-1 text-sm text-ink-500">{esPersonal ? 'Consulta tus turnos y registros de entrada y salida.' : 'Listado agrupable por fecha y turno, con control de entrada, salida y horas extra.'}</p></div>{isLoading && <p className="text-sm text-ink-500">Cargando asistencia...</p>}{data?.map((registro) => <Card key={registro.id} className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-ink-900">{registro.usuario?.name ?? 'Personal'}</p><p className="text-sm text-ink-500">{registro.fecha} · {registro.turno?.tipo ?? 'turno'} · sistema {registro.turno?.sistema ?? 'personalizado'}</p><p className="text-xs text-ink-400">Entrada: {registro.entrada ? new Date(registro.entrada).toLocaleTimeString() : 'pendiente'} · Salida: {registro.salida ? new Date(registro.salida).toLocaleTimeString() : 'pendiente'} · Extra: {registro.minutos_extra} min</p></div>{!esPersonal && <div className="flex gap-2"><Button variant="secondary" disabled={!!registro.entrada || marcar.isPending} onClick={() => marcar.mutate({ id: registro.id, accion: 'entrada' })}>Marcar entrada</Button><Button disabled={!registro.entrada || !!registro.salida || marcar.isPending} onClick={() => marcar.mutate({ id: registro.id, accion: 'salida' })}>Marcar salida</Button></div>}</Card>)}</div>
}