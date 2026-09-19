import { useState, type FormEvent } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCondominioStore } from '@/store/condominio-store'
import { useActualizarEstadoNovedad, useCrearNovedad, useNovedades } from '../hooks/use-novedades'
import type { Prioridad } from '../types'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'

const priorityStyle: Record<Prioridad, string> = {
  baja: 'bg-ink-100 text-ink-600', media: 'bg-amber-500/10 text-amber-600', alta: 'bg-orange-500/10 text-orange-600', critica: 'bg-red-500/10 text-red-600',
}

export function NovedadesList() {
  const condominioId = useCondominioStore((state) => state.condominioActivoId)
  const { data: novedades, isLoading } = useNovedades()
  const crear = useCrearNovedad()
  const actualizarEstado = useActualizarEstadoNovedad()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<{ titulo: string; descripcion: string; prioridad: Prioridad; evidencia?: File }>({ titulo: '', descripcion: '', prioridad: 'media' })
  const [turnoId, setTurnoId] = useState('')
  const [fechaHora, setFechaHora] = useState('')
  const { data: turnos } = useQuery({ queryKey: ['turnos', condominioId], queryFn: async () => (await apiClient.get<Array<{ id: number; tipo: string; inicio: string; fin: string; usuario?: { name: string } }>>('/turnos', { params: { condominio_id: condominioId } })).data, enabled: !!condominioId })

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!condominioId) return
    await crear.mutateAsync({ ...form, condominioId, turnoId: turnoId ? Number(turnoId) : undefined, fechaHora: fechaHora || undefined })
    setForm({ titulo: '', descripcion: '', prioridad: 'media' }); setTurnoId(''); setFechaHora('')
    setShowForm(false)
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between"><div><p className="text-sm font-medium text-amber-600">Conserjería</p><h1 className="mt-1 text-2xl font-semibold text-ink-900">Libro de novedades</h1><p className="mt-1 text-sm text-ink-500">Registra incidencias y entrega cada turno con trazabilidad.</p></div><Button onClick={() => setShowForm((value) => !value)}>{showForm ? 'Cerrar' : 'Registrar novedad'}</Button></div>
      {showForm && <Card><form className="space-y-4" onSubmit={submit}><input required placeholder="Título de la novedad" value={form.titulo} onChange={(event) => setForm({ ...form, titulo: event.target.value })} className="w-full rounded-md border border-ink-200 px-3 py-2" /><textarea required placeholder="Describe lo ocurrido, acciones y pendientes" value={form.descripcion} onChange={(event) => setForm({ ...form, descripcion: event.target.value })} className="min-h-28 w-full rounded-md border border-ink-200 px-3 py-2" /><div className="grid gap-4 sm:grid-cols-2"><label className="text-sm text-ink-600">Fecha y hora<input required type="datetime-local" value={fechaHora} onChange={(event) => setFechaHora(event.target.value)} className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2" /></label><label className="text-sm text-ink-600">Turno<select value={turnoId} onChange={(event) => setTurnoId(event.target.value)} className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2"><option value="">Sin turno asociado</option>{turnos?.map((turno) => <option key={turno.id} value={turno.id}>{turno.tipo} · {turno.usuario?.name ?? 'personal'} · {new Date(turno.inicio).toLocaleString()}</option>)}</select></label></div><select value={form.prioridad} onChange={(event) => setForm({ ...form, prioridad: event.target.value as Prioridad })} className="rounded-md border border-ink-200 px-3 py-2"><option value="baja">Prioridad baja</option><option value="media">Prioridad media</option><option value="alta">Prioridad alta</option><option value="critica">Prioridad crítica</option></select><label className="block text-sm text-ink-600">Evidencia (imagen o audio)<input type="file" accept="image/*,audio/*" onChange={(event) => setForm({ ...form, evidencia: event.target.files?.[0] })} className="mt-2 block w-full text-sm" /></label><Button disabled={crear.isPending} type="submit">{crear.isPending ? 'Guardando...' : 'Guardar en bitácora'}</Button></form></Card>}
      {isLoading && <p className="text-sm text-ink-500">Cargando novedades...</p>}
      {!isLoading && !novedades?.length && <Card><p className="text-sm text-ink-500">No hay novedades registradas en este condominio.</p></Card>}
      {novedades?.map((novedad) => <Card key={novedad.id}><div className="flex items-start justify-between gap-4"><div><div className="flex items-center gap-2"><h2 className="font-semibold text-ink-900">{novedad.titulo}</h2><span className={`rounded-full px-2 py-1 text-xs font-medium ${priorityStyle[novedad.prioridad]}`}>{novedad.prioridad}</span></div><p className="mt-2 text-sm text-ink-600">{novedad.descripcion}</p><p className="mt-3 text-xs text-ink-400">Registrado por {novedad.registradoPor?.name ?? 'usuario'}{novedad.turno ? ` · Turno ${novedad.turno.tipo}` : ''}</p>{novedad.evidenciaPath && <p className="mt-1 text-xs font-medium text-amber-600">Evidencia adjunta</p>}</div><select value={novedad.estado} onChange={(event) => actualizarEstado.mutate({ id: novedad.id, estado: event.target.value as 'abierta' | 'en_proceso' | 'resuelta' })} className="rounded-md border border-ink-200 px-2 py-1 text-xs"><option value="abierta">Abierta</option><option value="en_proceso">En proceso</option><option value="resuelta">Resuelta</option></select></div></Card>)}
    </div>
  )
}