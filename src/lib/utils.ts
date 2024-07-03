import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import urls from '@/constants/url'

const isProduction = process.env.NODE_ENV === 'production'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRedirectUrl = () => {
  return 'http://localhost:3000/dashboard'
}
