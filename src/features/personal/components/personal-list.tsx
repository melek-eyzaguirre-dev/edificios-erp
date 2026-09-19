import { useState, type FormEvent } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { apiClient } from '@/lib/api-client'
import { usePersonal } from '../hooks/use-personal'

export function PersonalList() {
  const { data: personal, isLoading } = usePersonal()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', rut: '', password: '', rol: 'conserje', telefono: '' })
  const [error, setError] = useState('')

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    try {
      await apiClient.post('/personal', form)
      setForm({ name: '', email: '', rut: '', password: '', rol: 'conserje', telefono: '' })
      setShowForm(false)
      window.location.reload()
    } catch {
      setError('No se pudo crear la cuenta. Revisa el correo, RUT y contraseña.')
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-amber-600">Administración</p>
          <h1 className="mt-1 text-2xl font-semibold text-ink-900">Cuentas de administrador y personal</h1>
          <p className="mt-1 text-sm text-ink-500">Crea accesos para conserjería, aseo, proveedores y administradores.</p>
        </div>
        <Button onClick={() => setShowForm((value) => !value)}>{showForm ? 'Cerrar' : 'Crear cuenta'}</Button>
      </div>

      {showForm && (
        <Card>
          <form className="grid gap-4 sm:grid-cols-2" onSubmit={submit}>
            <input required placeholder="Nombre completo" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2" />
            <input required type="email" placeholder="Correo para iniciar sesión" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2" />
            <input placeholder="RUT (recomendado)" value={form.rut} onChange={(event) => setForm({ ...form, rut: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2" />
            <input required type="password" minLength={8} placeholder="Contraseña temporal" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2" />
            <input placeholder="Teléfono" value={form.telefono} onChange={(event) => setForm({ ...form, telefono: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2" />
            <select value={form.rol} onChange={(event) => setForm({ ...form, rol: event.target.value })} className="rounded-md border border-ink-200 px-3 py-2">
              <option value="conserje">Conserje</option>
              <option value="personal_aseo">Personal de aseo</option>
              <option value="proveedor">Proveedor</option>
              <option value="admin_condominio">Administrador de condominio</option>
            </select>
            <Button type="submit">Crear cuenta</Button>
            {error && <p className="text-sm text-red-600 sm:col-span-2">{error}</p>}
          </form>
        </Card>
      )}

      {isLoading && <p className="text-sm text-ink-500">Cargando personal...</p>}
      <div className="grid gap-3 md:grid-cols-2">
        {personal?.map((persona) => (
          <Card key={persona.id} className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-ink-900">{persona.name}</p>
              <p className="text-sm text-ink-500">{persona.email}{persona.rut ? ` · RUT ${persona.rut}` : ''}{persona.telefono ? ` · ${persona.telefono}` : ''}</p>
            </div>
            <span className="rounded-full bg-ink-100 px-3 py-1 text-xs text-ink-600">{persona.rol}</span>
          </Card>
        ))}
      </div>
    </div>
  )
}
