// Tipos del dominio "reservas". Reflejan la forma de los datos que
// devuelve el backend Laravel — mantenerlos sincronizados con los
// Resources/API de Laravel evita bugs de "el campo no existe".

export interface EspacioComun {
  id: number
  nombre: string
  capacidad: number
  condominioId: number
}

export interface Reserva {
  id: number
  espacioComunId: number
  espacioComun?: EspacioComun
  unidadId: number
  userId: number
  inicio: string
  fin: string
  estado: 'pendiente' | 'confirmada' | 'rechazada' | 'cancelada'
  motivoRechazo?: string | null
}

export interface NuevaReservaInput {
  espacioComunId: number
  unidadId: number
  inicio: string
  fin: string
}
