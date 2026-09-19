import { apiClient } from '@/lib/api-client'
import type { Usuario } from '@/store/auth-store'

export interface LoginInput {
  email: string
  password: string
}

interface LoginResponse {
  token: string
  user: Usuario
}

export const authApi = {
  login: async (input: LoginInput): Promise<LoginResponse> => {
    const { data } = await apiClient.post<LoginResponse>('/login', input)
    return data
  },

  logout: async (): Promise<void> => {
    await apiClient.post('/logout')
  },

  me: async (): Promise<Usuario> => {
    const { data } = await apiClient.get<Usuario>('/me')
    return data
  },
}