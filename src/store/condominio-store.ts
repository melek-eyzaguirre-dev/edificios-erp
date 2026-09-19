import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CondominioState {
  condominioActivoId: number | null
  setCondominioActivo: (id: number) => void
}

// En un sistema multi-condominio, esto controla "sobre qué edificio
// estoy trabajando ahora mismo" — se usa en casi todas las llamadas a la API.
export const useCondominioStore = create<CondominioState>()(
  persist(
    (set) => ({
      condominioActivoId: null,
      setCondominioActivo: (id) => set({ condominioActivoId: id }),
    }),
    { name: 'edificios-condominio-activo' },
  ),
)
