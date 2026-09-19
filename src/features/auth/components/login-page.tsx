import { useState, type FormEvent } from 'react'
import { isAxiosError } from 'axios'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { authApi, type LoginInput } from '@/api/auth-api'
import { useAuthStore } from '@/store/auth-store'

const DEMO_ACCOUNTS = [
  { label: 'Administrador', email: 'admin@edificios.test', password: 'admin1234' },
  { label: 'Conserje', email: 'conserje@edificios.test', password: 'conserje1234' },
  { label: 'Residente', email: 'residente@edificios.test', password: 'residente1234' },
]

export function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const setSesion = useAuthStore((state) => state.setSesion)
  const [form, setForm] = useState<LoginInput>({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { token, user } = await authApi.login(form)
      setSesion(token, user)
      const destination = user.rol === 'conserje' ? '/conserje' : user.rol === 'residente' ? '/residente' : location.state?.from || '/admin'
      navigate(destination, { replace: true })
    } catch (requestError) {
      const message = isAxiosError<{ message?: string }>(requestError)
        ? requestError.response?.data?.message
        : undefined
      setError(message || 'No se pudo iniciar sesión. Revisa tus credenciales.')
    } finally {
      setLoading(false)
    }
  }

  const useDemoAccount = (account: LoginInput) => {
    setForm(account)
    setError('')
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-ink-950 px-4 py-10">
      <div className="grid w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl md:grid-cols-[1.05fr_0.95fr]">
        <section className="hidden bg-ink-800 p-10 text-white md:flex md:flex-col md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-500">Edificios</p>
            <h1 className="mt-12 text-4xl font-semibold leading-tight">La operación del edificio, en orden.</h1>
            <p className="mt-5 max-w-sm text-ink-200">Administra reservas, visitas, proveedores y novedades desde un solo lugar.</p>
          </div>
          <p className="text-sm text-ink-300">Acceso seguro para tu equipo.</p>
        </section>

        <section className="p-7 sm:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-600">Bienvenido</p>
          <h2 className="mt-3 text-3xl font-semibold text-ink-900">Iniciar sesión</h2>
          <p className="mt-2 text-sm text-ink-500">Ingresa con tu cuenta de operación.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
            <label className="block text-sm font-medium text-ink-700">
              Correo electrónico
              <input
                required
                type="email"
                value={form.email}
                onChange={(event) => setForm({ ...form, email: event.target.value })}
                className="mt-2 w-full rounded-md border border-ink-200 px-3 py-2.5 outline-none transition focus:border-ink-600 focus:ring-2 focus:ring-ink-100"
              />
            </label>
            <label className="block text-sm font-medium text-ink-700">
              Contraseña
              <input
                required
                type="password"
                value={form.password}
                onChange={(event) => setForm({ ...form, password: event.target.value })}
                className="mt-2 w-full rounded-md border border-ink-200 px-3 py-2.5 outline-none transition focus:border-ink-600 focus:ring-2 focus:ring-ink-100"
              />
            </label>
            {error && <p className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>}
            <Button className="w-full" disabled={loading} type="submit">
              {loading ? 'Ingresando...' : 'Ingresar'}
            </Button>
          </form>

          <div className="mt-8 border-t border-ink-100 pt-6">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-ink-400">Cuentas de prueba</p>
            <div className="mt-3 space-y-2">
              {DEMO_ACCOUNTS.map((account) => (
                <button
                  key={account.email}
                  type="button"
                  onClick={() => useDemoAccount(account)}
                  className="flex w-full items-center justify-between rounded-md border border-ink-100 px-3 py-2 text-left text-sm hover:border-ink-300 hover:bg-ink-50"
                >
                  <span className="font-medium text-ink-700">{account.label}</span>
                  <span className="text-ink-400">Usar cuenta</span>
                </button>
              ))}
            </div>
          </div>
          <div className="mt-5 border-t border-ink-100 pt-5 text-center"><Link to="/registro" className="text-sm font-medium text-amber-600 hover:text-amber-700">Crear cuenta de residente</Link><p className="mt-2 text-xs text-ink-400">Las cuentas de administrador y personal las crea un administrador desde el panel.</p></div>
        </section>
      </div>
    </main>
  )
}