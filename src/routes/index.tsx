import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AdminLayout } from '@/layouts/admin-layout'
import { ConserjeLayout } from '@/layouts/conserje-layout'
import { StatsOverview } from '@/features/dashboard/components/stats-overview'
import { ReservasList } from '@/features/reservas/components/reservas-list'
import { ModuleOverview } from '@/features/operations/components/module-overview'
import { LoginPage } from '@/features/auth/components/login-page'
import { ProtectedRoute } from './protected-route'
import { NovedadesList } from '@/features/novedades/components/novedades-list'
import { VisitasList } from '@/features/visitas/components/visitas-list'
import { TurnosList } from '@/features/turnos/components/turnos-list'
import { RoleRoute } from './role-route'
import { EstacionamientosList } from '@/features/estacionamientos/components/estacionamientos-list'
import { ResidenteLayout } from '@/layouts/residente-layout'
import { PersonalList } from '@/features/personal/components/personal-list'
import { AsistenciasList } from '@/features/asistencias/components/asistencias-list'
import { ResidenteHome } from '@/features/residentes/components/residente-home'
import { GastosList } from '@/features/gastos-comunes/components/gastos-list'
import { RegisterPage } from '@/features/auth/components/register-page'
import { AusenciasList } from '@/features/ausencias/components/ausencias-list'

/**
 * Rutas centralizadas. Cada módulo nuevo (visitas, estacionamientos)
 * agrega una línea acá y su propio folder en /features — así el
 * router nunca se llena de lógica de negocio, solo de mapeo.
 */
export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [{
      path: '/admin',
      element: <RoleRoute roles={['super_admin', 'admin_administradora', 'admin_condominio']}><AdminLayout /></RoleRoute>,
      children: [
      { index: true, element: <StatsOverview /> },
      { path: 'reservas', element: <ReservasList /> },
      { path: 'residentes', element: <ModuleOverview title="Residentes" description="Gestiona residentes, unidades y vínculos de convivencia del condominio." metrics={[{ label: 'Residentes activos', value: '128' }, { label: 'Unidades ocupadas', value: '86' }, { label: 'Invitaciones pendientes', value: '6', tone: 'text-amber-600' }]} actions={['Nuevo residente', 'Importar padrón']} /> },
      { path: 'gastos-comunes', element: <GastosList /> },
      { path: 'proveedores', element: <ModuleOverview title="Proveedores" description="Centraliza contratos, contactos y servicios recurrentes del edificio." metrics={[{ label: 'Proveedores activos', value: '24' }, { label: 'Contratos por vencer', value: '3', tone: 'text-amber-600' }, { label: 'Servicios recurrentes', value: '11' }]} actions={['Nuevo proveedor', 'Exportar listado']} /> },
      { path: 'inventario', element: <ModuleOverview title="Inventario de aseo" description="Mantén existencias, mínimos y movimientos de artículos de aseo." metrics={[{ label: 'Artículos', value: '42' }, { label: 'Bajo mínimo', value: '5', tone: 'text-rose-600' }, { label: 'Valor inventario', value: '$486K' }]} actions={['Nuevo artículo', 'Registrar movimiento']} /> },
      { path: 'visitas', element: <VisitasList /> },
      { path: 'turnos', element: <TurnosList /> },
      { path: 'personal', element: <PersonalList /> },
      { path: 'asistencias', element: <AsistenciasList /> },
      { path: 'ausencias', element: <AusenciasList /> },
      { path: 'estacionamientos', element: <EstacionamientosList /> },
      { path: 'novedades', element: <NovedadesList /> },
      ],
    }, {
      path: '/conserje',
      element: <RoleRoute roles={['conserje']}><ConserjeLayout /></RoleRoute>,
      children: [
      { index: true, element: <ModuleOverview title="Panel de conserjería" description="Una vista rápida para operar la portería durante el turno." metrics={[{ label: 'Visitas dentro', value: '7' }, { label: 'Novedades abiertas', value: '8', tone: 'text-rose-600' }, { label: 'Estacionamientos libres', value: '4', tone: 'text-emerald-600' }]} actions={['Registrar visita', 'Nueva novedad']} /> },
      { path: 'visitas', element: <VisitasList /> },
      { path: 'estacionamientos', element: <EstacionamientosList /> },
      { path: 'novedades', element: <NovedadesList /> },
      ],
    }],
  },
  { path: '/residente', element: <RoleRoute roles={['residente']}><ResidenteLayout /></RoleRoute>, children: [{ index: true, element: <ResidenteHome /> }, { path: 'visitas', element: <VisitasList /> }] },
  { path: '/personal', element: <RoleRoute roles={['conserje', 'personal_aseo']}><ConserjeLayout /></RoleRoute>, children: [{ path: 'asistencias', element: <AsistenciasList /> }, { path: 'ausencias', element: <AusenciasList /> }] },
  { path: '/login', element: <LoginPage /> },
  { path: '/registro', element: <RegisterPage /> },
  { path: '/', element: <Navigate to="/admin" replace /> },
])
