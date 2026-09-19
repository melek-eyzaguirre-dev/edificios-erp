import { useQuery } from '@tanstack/react-query'
import { personalApi } from '../api/personal-api'
import { useCondominioStore } from '@/store/condominio-store'

export function usePersonal() {
  return useQuery({ queryKey: ['personal'], queryFn: personalApi.listar })
}

export function useUnidades() {
  const condominioId = useCondominioStore((state) => state.condominioActivoId)
  return useQuery({ queryKey: ['unidades', condominioId], queryFn: () => personalApi.unidades(condominioId!), enabled: !!condominioId })
}