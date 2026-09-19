import { useQuery } from '@tanstack/react-query'
import { useCondominioStore } from '@/store/condominio-store'
import { getDashboardSummary } from '../api/dashboard-api'

export function useDashboardSummary() {
  const condominioId = useCondominioStore((state) => state.condominioActivoId)
  return useQuery({ queryKey: ['dashboard-summary', condominioId], queryFn: () => getDashboardSummary(condominioId!), enabled: !!condominioId })
}