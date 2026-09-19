import { type ClassValue, clsx } from 'clsx'

// Helper para combinar clases de Tailwind condicionalmente
export function cn(...inputs: ClassValue[]) {
  return clsx(inputs)
}
