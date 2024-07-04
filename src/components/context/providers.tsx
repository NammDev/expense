'use client'

import * as React from 'react'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { type ThemeProviderProps } from 'next-themes/dist/types'
import { TooltipProvider } from '@/components/ui/tooltip'
import { SidebarContextProvider } from './sidebar-provider'

export function Providers({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider {...props}>
      <SidebarContextProvider>
        <TooltipProvider delayDuration={500}>{children}</TooltipProvider>;
      </SidebarContextProvider>
    </NextThemesProvider>
  )
}
