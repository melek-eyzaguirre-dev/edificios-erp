import { NavLink, Outlet } from 'react-router-dom'
import { useActiveCondominio } from '@/hooks/use-active-condominio'

// Layout aparte y más simple para el panel de conserjería:
// pensado para uso rápido en tablet/celular en la portería.
export function ConserjeLayout() {
  useActiveCondominio()

  return (
    <div className="min-h-screen bg-ink-50 p-4">
      <header className="mb-4">
        <p className="text-lg font-semibold text-ink-900">Portería</p>
        <nav className="mt-3 flex gap-2 overflow-x-auto text-sm">
          {['visitas', 'estacionamientos', 'novedades', 'asistencias', 'ausencias'].map((item) => (
            <NavLink key={item} to={`/conserje/${item}`} className="whitespace-nowrap rounded-md bg-white px-3 py-2 text-ink-600 shadow-sm hover:text-sky-700">
              {item[0].toUpperCase() + item.slice(1)}
            </NavLink>
          ))}
        </nav>
      </header>
      <Outlet />
    </div>
  )
}
