import { useState, type FormEvent } from 'react'
import { Card, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useCrearFeedback, useFeedbackResidente, useResidenteSummary } from '../hooks/use-residente'
import { ParkingReservation } from './parking-reservation'

const money = (value: number, currency = 'CLP') =>
  new Intl.NumberFormat('es-CL', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)

export function ResidenteHome() {
  const { data, isLoading, isError } = useResidenteSummary()
  const { data: feedback } = useFeedbackResidente()
  const crear = useCrearFeedback()
  const [form, setForm] = useState({ tipo: 'sugerencia', asunto: '', mensaje: '' })

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await crear.mutateAsync(form)
    setForm({ tipo: 'sugerencia', asunto: '', mensaje: '' })
  }

  if (isLoading) return <p className="text-sm text-ink-500">Cargando información de tu unidad...</p>
  if (isError || !data) return <Card><p className="text-sm text-red-600">No encontramos una unidad asociada a este usuario. Solicita al administrador vincular tu departamento.</p></Card>

  const cuenta = data.estado_cuenta
  const parking = data.estacionamientos_visita[0]

  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm font-medium text-amber-600">Mi unidad</p>
        <h1 className="mt-1 text-2xl font-semibold text-ink-900">{data.unidad.torre ? `${data.unidad.torre} - ` : ''}{data.unidad.numero}</h1>
        <p className="mt-1 text-sm text-ink-500">Relación: {data.tipo_relacion ?? 'residente'} · Los cambios de habitantes los valida administración.</p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card><CardTitle>Período vigente</CardTitle><p className="mt-2 text-2xl font-semibold text-ink-900">{cuenta?.periodo ?? 'Sin emitir'}</p><p className="mt-1 text-xs text-ink-500">Mes del gasto común</p></Card>
        <Card><CardTitle>Saldo anterior</CardTitle><p className="mt-2 text-2xl font-semibold text-ink-900">{money(cuenta?.saldo_anterior ?? 0)}</p></Card>
        <Card><CardTitle>Vencimiento</CardTitle><p className="mt-2 text-2xl font-semibold text-ink-900">{cuenta?.vencimiento ?? 'Pendiente'}</p><p className="mt-1 text-xs text-ink-500">Estado: {cuenta?.estado ?? 'sin cargo'}</p></Card>
        <Card><CardTitle>Habitantes</CardTitle><p className="mt-2 text-2xl font-semibold text-ink-900">{data.habitantes.length}</p><p className="mt-1 text-xs text-ink-500">{data.habitantes.map((habitante) => habitante.name).join(', ') || 'Sin registros'}</p></Card>
      </div>

      {parking && <Card><CardTitle>Estacionamiento de visitas</CardTitle><p className="mt-1 text-sm text-ink-500">Cupo {parking.codigo}: {money(Number(parking.tarifa_hora), parking.moneda)} por hora, máximo {parking.max_horas_visita} horas.</p><ParkingReservation parking={parking} /></Card>}

      <Card>
        <CardTitle>Libro de atención</CardTitle>
        <p className="mt-1 text-sm text-ink-500">Envía un reclamo, sugerencia o felicitación a la administración.</p>
        <form className="mt-4 grid gap-3 sm:grid-cols-3" onSubmit={submit}>
          <select value={form.tipo} onChange={(event) => setForm({ ...form, tipo: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2"><option value="reclamo">Reclamo</option><option value="sugerencia">Sugerencia</option><option value="felicitacion">Felicitación</option></select>
          <input required placeholder="Asunto" value={form.asunto} onChange={(event) => setForm({ ...form, asunto: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2" />
          <textarea required placeholder="Escribe tu mensaje" value={form.mensaje} onChange={(event) => setForm({ ...form, mensaje: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2 sm:col-span-3" />
          <Button disabled={crear.isPending} type="submit">{crear.isPending ? 'Enviando...' : 'Enviar registro'}</Button>
        </form>
        {feedback?.map((item) => <div key={item.id} className="mt-3 border-t border-ink-100 pt-3 text-sm"><p className="font-medium text-ink-800">{item.tipo}: {item.asunto}</p><p className="text-ink-500">{item.mensaje} · {item.estado}</p></div>)}
      </Card>
    </div>
  )
}