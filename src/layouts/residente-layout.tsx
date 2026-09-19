import { NavLink, Outlet } from 'react-router-dom'
import { useActiveCondominio } from '@/hooks/use-active-condominio'

export function ResidenteLayout() {
  useActiveCondominio()
  return <div className="min-h-screen bg-ink-50 p-5"><header className="mb-6 flex items-center justify-between"><div><p className="text-lg font-semibold text-ink-900">Portal residente</p><p className="text-sm text-ink-500">Gastos, reservas y seguridad de tu unidad</p></div><nav className="flex gap-2"><NavLink to="/residente" className="rounded-md bg-white px-3 py-2 text-sm text-ink-700 shadow-sm">Resumen</NavLink><NavLink to="/residente/visitas" className="rounded-md bg-white px-3 py-2 text-sm text-ink-700 shadow-sm">Visitas</NavLink></nav></header><Outlet /></div>
}