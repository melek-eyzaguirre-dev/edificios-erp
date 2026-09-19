import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/auth-store'
import { cn } from '@/lib/utils'
import { authApi } from '@/api/auth-api'
import { useActiveCondominio } from '@/hooks/use-active-condominio'

const NAV_ITEMS = [
  { to: '/admin', label: 'Estadísticas', end: true },
  { to: '/admin/reservas', label: 'Reservas' },
  { to: '/admin/visitas', label: 'Visitas' },
  { to: '/admin/estacionamientos', label: 'Estacionamientos' },
  { to: '/admin/residentes', label: 'Residentes' },
  { to: '/admin/gastos-comunes', label: 'Gastos comunes' },
  { to: '/admin/proveedores', label: 'Proveedores' },
  { to: '/admin/inventario', label: 'Inventario' },
  { to: '/admin/novedades', label: 'Novedades' },
  { to: '/admin/turnos', label: 'Turnos' },
  { to: '/admin/personal', label: 'Personal' },
  { to: '/admin/asistencias', label: 'Asistencias' },
]

export function AdminLayout() {
  useActiveCondominio()
  const usuario = useAuthStore((s) => s.usuario)
  const logout = useAuthStore((s) => s.logout)
  const navigate = useNavigate()
  const esSupervision = usuario?.rol === 'super_admin' || usuario?.rol === 'admin_administradora' || usuario?.rol === 'admin_condominio'

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } finally {
      logout()
      navigate('/login', { replace: true })
    }
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-60 border-r border-ink-200 bg-white p-4">
        <p className="mb-6 px-2 text-lg font-semibold text-ink-900">Edificios</p>
        <nav className="space-y-1">
          {NAV_ITEMS.filter((item) => item.to !== '/admin/turnos' || esSupervision).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'block rounded-md px-3 py-2 text-sm font-medium text-ink-600 hover:bg-ink-50',
                  isActive && 'bg-ink-100 text-ink-900',
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8">
        <header className="mb-6 flex items-center justify-between">
          <div />
          <div className="flex items-center gap-4">
            <p className="text-sm text-ink-500">{usuario?.name}</p>
            <button type="button" onClick={handleLogout} className="text-sm font-medium text-ink-600 hover:text-ink-900">
              Salir
            </button>
          </div>
        </header>
        <Outlet />
      </main>
    </div>
  )
}
