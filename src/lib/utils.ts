import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEuro(bedrag: number): string {
  return new Intl.NumberFormat('nl-BE', {
    style: 'currency',
    currency: 'EUR',
  }).format(bedrag)
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 9).toUpperCase()
}

export function generateReservatieNummer(): string {
  const datum = new Date()
  const prefix = `SDD`
  const tijdstempel = datum.getTime().toString().slice(-6)
  return `${prefix}-${tijdstempel}`
}

export function generateOrderId(): string {
  const prefix = 'ORD'
  const tijdstempel = Date.now().toString().slice(-8)
  return `${prefix}-${tijdstempel}`
}
