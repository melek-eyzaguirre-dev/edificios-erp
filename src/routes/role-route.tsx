import { Navigate } from 'react-router-dom'
import { useAuthStore, type RolUsuario } from '@/store/auth-store'

interface RoleRouteProps {
  roles: RolUsuario[]
  children: React.ReactNode
}

export function RoleRoute({ roles, children }: RoleRouteProps) {
  const usuario = useAuthStore((state) => state.usuario)
  return usuario && roles.includes(usuario.rol) ? children : <Navigate to="/login" replace />
}