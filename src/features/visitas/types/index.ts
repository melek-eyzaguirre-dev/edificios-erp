export type EstadoVisita = 'pendiente' | 'autorizada' | 'en_edificio' | 'finalizada' | 'rechazada'

export interface Visita {
  id: number
  unidadId: number
  nombreVisitante: string
  rutVisitante?: string | null
  estado: EstadoVisita
  autorizadoDesde?: string | null
  autorizadoHasta?: string | null
  horaIngreso?: string | null
  horaSalida?: string | null
  registradoPor?: { id: number; name: string }
  motivoRechazo?: string | null
}

export interface NuevaVisitaInput {
  unidadId: number
  nombreVisitante: string
  rutVisitante: string
  autorizadoDesde: string
  autorizadoHasta: string
}