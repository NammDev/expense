import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import urls from '@/constants/url'

const isProduction = process.env.NODE_ENV === 'production'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getRedirectUrl = () => {
  let url = process?.env?.NEXT_PUBLIC_SITE_URL ?? urls.app.overview
  url = isProduction ? `https:${url}` : `http://${url}`
  return url
}
