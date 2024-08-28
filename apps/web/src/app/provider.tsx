'use client'

import { AppProvider } from '@app/features/common/providers/app'

/**
 * This is the root context provider for the application.
 * You can add context providers here that should be available to all pages.
 */
export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <AppProvider onError={(error, info) => console.error(error, info)}>
      {children}
    </AppProvider>
  )
}
