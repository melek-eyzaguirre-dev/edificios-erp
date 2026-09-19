import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface Usuario {
  id: number
  name: string
  email: string
  rol: 'super_admin' | 'admin_administradora' | 'admin_condominio' | 'conserje' | 'residente' | 'personal_aseo' | 'proveedor'
  administradora_id: number | null
  activo: boolean
}

export type RolUsuario = Usuario['rol']

interface AuthState {
  token: string | null
  usuario: Usuario | null
  setSesion: (token: string, usuario: Usuario) => void
  logout: () => void
}

/**
 * Estado global de sesión. Solo va acá lo que de verdad es global
 * (usuario logueado, condominio activo). Todo lo demás (listas,
 * formularios, filtros) vive en el estado local de cada feature
 * o en React Query — así evitamos que este store se convierta
 * en un basurero de estado como pasa en apps grandes mal organizadas.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      usuario: null,
      setSesion: (token, usuario) => set({ token, usuario }),
      logout: () => set({ token: null, usuario: null }),
    }),
    { name: 'edificios-auth' },
  ),
)
