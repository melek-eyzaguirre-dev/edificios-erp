import { useReservas, useCancelarReserva, useCrearReserva, useEspaciosDisponibles } from '../hooks/use-reservas'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useState } from 'react'

const ESTADO_ESTILOS: Record<string, string> = {
  pendiente: 'bg-amber-500/10 text-amber-600',
  confirmada: 'bg-emerald-500/10 text-emerald-600',
  cancelada: 'bg-ink-200 text-ink-500',
}

export function ReservasList() {
  const { data: reservas, isLoading, isError } = useReservas()
  const { data: espacios } = useEspaciosDisponibles()
  const cancelar = useCancelarReserva()
  const crear = useCrearReserva()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ espacioComunId: '', unidadId: '', inicio: '', fin: '' })

  const handleCreate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await crear.mutateAsync({
      espacioComunId: Number(form.espacioComunId),
      unidadId: Number(form.unidadId),
      inicio: form.inicio,
      fin: form.fin,
    })
    setForm({ espacioComunId: '', unidadId: '', inicio: '', fin: '' })
    setShowForm(false)
  }

  if (isLoading) return <p className="text-ink-500 text-sm">Cargando reservas…</p>
  if (isError) return <p className="text-red-600 text-sm">No pudimos cargar las reservas. Intenta de nuevo.</p>

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-amber-600">Operaciones</p>
          <h1 className="mt-1 text-2xl font-semibold text-ink-900">Reservas</h1>
          <p className="mt-1 text-sm text-ink-500">Gestiona los espacios comunes y sus horarios.</p>
        </div>
        <Button onClick={() => setShowForm((current) => !current)}>{showForm ? 'Cerrar' : 'Nueva reserva'}</Button>
      </div>

      {showForm && (
        <Card>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={handleCreate}>
            <label className="text-sm font-medium text-ink-700">Espacio común
              <select required value={form.espacioComunId} onChange={(event) => setForm({ ...form, espacioComunId: event.target.value })} className="mt-2 w-full rounded-md border border-ink-200 px-3 py-2">
                <option value="">Selecciona un espacio</option>
                {espacios?.map((espacio) => <option key={espacio.id} value={espacio.id}>{espacio.nombre}</option>)}
              </select>
            </label>
            <label className="text-sm font-medium text-ink-700">ID de unidad
              <input required type="number" min="1" value={form.unidadId} onChange={(event) => setForm({ ...form, unidadId: event.target.value })} className="mt-2 w-full rounded-md border border-ink-200 px-3 py-2" />
            </label>
            <label className="text-sm font-medium text-ink-700">Inicio
              <input required type="datetime-local" value={form.inicio} onChange={(event) => setForm({ ...form, inicio: event.target.value })} className="mt-2 w-full rounded-md border border-ink-200 px-3 py-2" />
            </label>
            <label className="text-sm font-medium text-ink-700">Fin
              <input required type="datetime-local" value={form.fin} onChange={(event) => setForm({ ...form, fin: event.target.value })} className="mt-2 w-full rounded-md border border-ink-200 px-3 py-2" />
            </label>
            <Button className="sm:col-span-2" disabled={crear.isPending} type="submit">{crear.isPending ? 'Guardando...' : 'Guardar reserva'}</Button>
          </form>
        </Card>
      )}

      {!reservas?.length && <Card><p className="text-sm text-ink-500">Todavía no hay reservas para este condominio.</p></Card>}
      {reservas?.map((reserva) => (
        <Card key={reserva.id} className="flex items-center justify-between">
          <div><p className="font-medium text-ink-900">{reserva.espacioComun?.nombre ?? 'Espacio común'}</p><p className="text-sm text-ink-500">{new Date(reserva.inicio).toLocaleString()} · {new Date(reserva.fin).toLocaleTimeString()}</p></div>
          <div className="flex items-center gap-3"><span className={`rounded-full px-3 py-1 text-xs font-medium ${ESTADO_ESTILOS[reserva.estado] ?? 'bg-ink-100 text-ink-600'}`}>{reserva.estado}</span>{reserva.estado !== 'cancelada' && <Button variant="secondary" onClick={() => cancelar.mutate(reserva.id)} disabled={cancelar.isPending}>Cancelar</Button>}</div>
        </Card>
      ))}
    </div>
  )
}
