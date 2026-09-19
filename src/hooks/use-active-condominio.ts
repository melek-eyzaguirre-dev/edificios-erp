import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { apiClient } from '@/lib/api-client'
import { useCondominioStore } from '@/store/condominio-store'

interface Condominio {
  id: number
  nombre: string
}

export function useActiveCondominio() {
  const activeId = useCondominioStore((state) => state.condominioActivoId)
  const setActive = useCondominioStore((state) => state.setCondominioActivo)
  const query = useQuery({
    queryKey: ['condominios'],
    queryFn: async () => (await apiClient.get<Condominio[]>('/condominios')).data,
    enabled: !activeId,
  })

  useEffect(() => {
    if (!activeId && query.data?.[0]) setActive(query.data[0].id)
  }, [activeId, query.data, setActive])

  return query
}