'use client'

import React from 'react'

import { useAuth } from 'src/features/common/hooks/use-auth'
import { useRouter } from 'next/navigation'

import { AuthLayout as BaseAuthLayout } from '@app/features/common/layouts/auth-layout'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAuthenticated } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated])

  return <BaseAuthLayout>{children}</BaseAuthLayout>
}
