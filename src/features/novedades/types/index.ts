export type Prioridad = 'baja' | 'media' | 'alta' | 'critica'
export type EstadoNovedad = 'abierta' | 'en_proceso' | 'resuelta'

export interface Novedad {
  id: number
  titulo: string
  descripcion: string
  prioridad: Prioridad
  estado: EstadoNovedad
  registradoPor?: { id: number; name: string }
  createdAt: string
  evidenciaPath?: string | null
  turno?: { id: number; tipo: string; inicio: string; fin: string; usuario?: { name: string } }
}

export interface NuevaNovedadInput {
  condominioId: number
  titulo: string
  descripcion: string
  prioridad: Prioridad
  evidencia?: File
  turnoId?: number
  fechaHora?: string
}