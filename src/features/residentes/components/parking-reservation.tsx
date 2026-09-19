import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api-client'

interface Parking { id: number; codigo: string; moneda: string; tarifa_hora: number; max_horas_visita: number }
interface ParkingReservationProps { parking: Parking }

const money = (value: number, currency: string) => new Intl.NumberFormat('es-CL', { style: 'currency', currency, maximumFractionDigits: 0 }).format(value)

export function ParkingReservation({ parking }: ParkingReservationProps) {
  const [start, setStart] = useState('')
  const [hours, setHours] = useState(1)
  const [message, setMessage] = useState('')
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const end = new Date(start)
    end.setHours(end.getHours() + hours)
    try {
      await apiClient.post('/ocupaciones-estacionamiento', { estacionamiento_id: parking.id, inicio: start, fin: end.toISOString() })
      setMessage('Estacionamiento reservado correctamente.')
    } catch (error) {
      setMessage('No fue posible reservar ese horario. Puede estar ocupado.')
    }
  }
  return <form className="mt-4 grid gap-3 sm:grid-cols-3" onSubmit={submit}><label className="text-sm text-ink-600">Desde<input required type="datetime-local" value={start} onChange={(event) => setStart(event.target.value)} className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2" /></label><label className="text-sm text-ink-600">Horas<select value={hours} onChange={(event) => setHours(Number(event.target.value))} className="mt-1 w-full rounded-md border border-ink-200 px-3 py-2">{Array.from({ length: parking.max_horas_visita }, (_, index) => <option key={index + 1} value={index + 1}>{index + 1}</option>)}</select></label><div className="flex items-end"><Button type="submit">Reservar · {money(Number(parking.tarifa_hora) * hours, parking.moneda)}</Button></div>{message && <p className="text-sm text-emerald-600 sm:col-span-3">{message}</p>}</form>
}