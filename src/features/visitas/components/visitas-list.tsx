import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useActualizarEstadoVisita, useCrearVisita, useEliminarVisita, useReportarVisita, useVisitas } from '../hooks/use-visitas'
import { useUnidades } from '@/features/personal/hooks/use-personal'

export function VisitasList() {
  const [rut, setRut] = useState('')
  const { data: visitas, isLoading } = useVisitas(rut)
  const { data: unidades } = useUnidades()
  const crear = useCrearVisita()
  const actualizarEstado = useActualizarEstadoVisita()
  const reportar = useReportarVisita()
  const eliminar = useEliminarVisita()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ unidadId: '', nombreVisitante: '', rutVisitante: '', autorizadoDesde: '', autorizadoHasta: '' })

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await crear.mutateAsync({ ...form, unidadId: Number(form.unidadId) })
    setForm({ unidadId: '', nombreVisitante: '', rutVisitante: '', autorizadoDesde: '', autorizadoHasta: '' })
    setShowForm(false)
  }

  return <div className="space-y-5"><div className="flex items-center justify-between"><div><p className="text-sm font-medium text-amber-600">Conserjería</p><h1 className="mt-1 text-2xl font-semibold text-ink-900">Control de visitas</h1><p className="mt-1 text-sm text-ink-500">Busca por RUT y reutiliza los datos de visitantes frecuentes.</p></div><Button onClick={() => setShowForm((value) => !value)}>{showForm ? 'Cerrar' : 'Registrar visita'}</Button></div>
    <Card><div className="flex gap-3"><input placeholder="Buscar por RUT" value={rut} onChange={(event) => setRut(event.target.value)} className="flex-1 rounded-md border border-ink-200 px-3 py-2" /><Button variant="secondary" onClick={() => setRut('')}>Limpiar</Button></div></Card>
    {showForm && <Card><form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}><select required value={form.unidadId} onChange={(event) => setForm({ ...form, unidadId: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2"><option value="">Seleccionar unidad</option>{unidades?.map((unidad) => <option key={unidad.id} value={unidad.id}>{unidad.torre ? `${unidad.torre} - ` : ''}{unidad.numero}</option>)}</select><input required placeholder="Nombre del visitante" value={form.nombreVisitante} onChange={(event) => setForm({ ...form, nombreVisitante: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2" /><input placeholder="RUT del visitante" value={form.rutVisitante} onChange={(event) => setForm({ ...form, rutVisitante: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2" /><label className="text-sm text-ink-600">Autorizado desde<input type="datetime-local" value={form.autorizadoDesde} onChange={(event) => setForm({ ...form, autorizadoDesde: event.target.value })} className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2" /></label><label className="text-sm text-ink-600">Autorizado hasta<input type="datetime-local" value={form.autorizadoHasta} onChange={(event) => setForm({ ...form, autorizadoHasta: event.target.value })} className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2" /></label><Button type="submit" disabled={crear.isPending} className="sm:col-span-2">{crear.isPending ? 'Guardando...' : 'Guardar autorización'}</Button></form></Card>}
    {isLoading && <p className="text-sm text-ink-500">Cargando visitas...</p>}{!isLoading && !visitas?.length && <Card><p className="text-sm text-ink-500">No hay visitas registradas.</p></Card>}{visitas?.map((visita) => <Card key={visita.id} className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-semibold text-ink-900">{visita.nombreVisitante}</p><p className="text-sm text-ink-500">Unidad {visita.unidadId}{visita.rutVisitante ? ` · ${visita.rutVisitante}` : ''}</p><p className="mt-1 text-xs text-ink-400">Registrado por {visita.registradoPor?.name ?? 'personal de turno'}{visita.motivoRechazo ? ` · Motivo: ${visita.motivoRechazo}` : ''}</p></div><div className="flex flex-wrap gap-2"><select value={visita.estado} onChange={(event) => actualizarEstado.mutate({ id: visita.id, estado: event.target.value as typeof visita.estado })} className="rounded-md border border-ink-200 px-3 py-2 text-sm"><option value="autorizada">Autorizada</option><option value="en_edificio">Entrada registrada</option><option value="finalizada">Salida registrada</option><option value="rechazada">Rechazada</option></select><Button variant="secondary" onClick={() => { const motivo = window.prompt('Motivo de rechazo'); if (motivo) reportar.mutate({ id: visita.id, motivo }) }}>No autorizada</Button><Button variant="danger" onClick={() => eliminar.mutate(visita.id)}>Eliminar</Button></div></Card>)}</div>
}