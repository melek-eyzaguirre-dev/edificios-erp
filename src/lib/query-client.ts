import { QueryClient } from '@tanstack/react-query'

// Configuración central de React Query: cuánto tiempo se considera
// "fresco" un dato antes de volver a pedirlo al servidor.
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // 1 minuto
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})
