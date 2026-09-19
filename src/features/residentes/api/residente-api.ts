import { apiClient } from '@/lib/api-client'

export interface ResidenteSummary {
  unidad: { id: number; numero: string; torre?: string | null }
  tipo_relacion: string | null
  habitantes: Array<{ id: number; name: string; email: string }>
  estado_cuenta: { periodo: string; monto: number; pagado: number; saldo_anterior: number; vencimiento: string | null; estado: string } | null
  estacionamientos_visita: Array<{ id: number; codigo: string; moneda: string; tarifa_hora: number; max_horas_visita: number }>
}

export interface Feedback { id: number; tipo: string; asunto: string; mensaje: string; estado: string; created_at: string }

export const residenteApi = {
  summary: async () => (await apiClient.get<ResidenteSummary>('/residente/summary')).data,
  feedback: async () => (await apiClient.get<Feedback[]>('/feedback-residentes')).data,
  crearFeedback: async (input: { tipo: string; asunto: string; mensaje: string }) => (await apiClient.post<Feedback>('/feedback-residentes', input)).data,
}