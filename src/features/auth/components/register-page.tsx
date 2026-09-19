import { useState, type FormEvent } from 'react'
import { isAxiosError } from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { apiClient } from '@/lib/api-client'

export function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', rut: '', password: '' })
  const [error, setError] = useState('')
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setError('')
    try {
      await apiClient.post('/register-residente', form)
      navigate('/login', { replace: true })
    } catch (requestError) {
      setError(isAxiosError<{ message?: string }>(requestError) ? requestError.response?.data?.message ?? 'Revisa los datos ingresados.' : 'No se pudo crear la cuenta.')
    }
  }
  return <main className="flex min-h-screen items-center justify-center bg-ink-950 px-4 py-10"><section className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"><p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">Edificios</p><h1 className="mt-3 text-3xl font-semibold text-ink-900">Crear cuenta residente</h1><p className="mt-2 text-sm text-ink-500">La administración deberá vincular tu cuenta a una unidad.</p><form className="mt-7 space-y-4" onSubmit={submit}><input required placeholder="Nombre completo" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="w-full rounded-md border border-ink-200 px-3 py-2.5" /><input required type="email" placeholder="Correo electrónico" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="w-full rounded-md border border-ink-200 px-3 py-2.5" /><input placeholder="RUT (recomendado)" value={form.rut} onChange={(event) => setForm({ ...form, rut: event.target.value })} className="w-full rounded-md border border-ink-200 px-3 py-2.5" /><input required minLength={8} type="password" placeholder="Contraseña" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="w-full rounded-md border border-ink-200 px-3 py-2.5" />{error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}<Button className="w-full" type="submit">Crear cuenta</Button></form><Link to="/login" className="mt-5 block text-center text-sm text-ink-500 hover:text-ink-900">Ya tengo una cuenta</Link></section></main>
}