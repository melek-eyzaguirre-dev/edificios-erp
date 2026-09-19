import axios from 'axios'
import { useAuthStore } from '@/store/auth-store'

/**
 * Cliente HTTP único para toda la app.
 * Nada de "fetch" repetido en cada componente: todas las llamadas
 * a la API de Laravel pasan por acá, así el manejo de auth, errores
 * y base URL vive en un solo lugar.
 */
export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
  headers: {
    Accept: 'application/json',
  },
})

// Adjunta el token de Sanctum a cada request automáticamente
apiClient.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Si el backend responde 401, cerramos sesión localmente
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
    }
    return Promise.reject(error)
  },
)
