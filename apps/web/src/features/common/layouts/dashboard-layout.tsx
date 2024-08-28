'use client'

import * as React from 'react'

import { Container } from '@chakra-ui/react'
import { BillingProvider } from '@saas-ui-pro/billing'
//import { Auth } from '@saas-ui/auth'
import { usePathname } from 'next/navigation'

import { authPaths, authProviders, authType } from '@app/config'
import { Link } from '@app/nextjs'

import { AppLoader, Logo } from '@ui/lib'

import { useInitApp } from '../hooks/use-init-app'
import { AuthLayout } from './auth-layout'

/**
 * Wrapper component for dashboard pages.
 *
 * Loads the minimal required user data for the app and
 * renders authentication screens when the user isn't authenticated.
 */
export const DashboardLayout: React.FC<{ children: React.ReactNode }> = (
  props,
) => {
  const pathname = usePathname()

  const { isInitializing, isAuthenticated, billing } = useInitApp()

  const { view, title } = authPaths[pathname || '/login'] || authPaths['/login']

  // Rendering the auth screens here so they are rendered in place,
  // on the current route, without the need to redirect.
  if (!isInitializing && !isAuthenticated) {
    return (
      <AuthLayout>
        <Container>
          <Logo margin="0 auto" mb="12" />
          {/*<Auth
            title={title}
            providers={authProviders}
            view={view}
            type={authType}
            signupLink={<Link href="/signup">Sign up</Link>}
            loginLink={<Link href="/login">Log in</Link>}
            forgotLink={<Link href="/forgot_password">Forgot password?</Link>}
            backLink={<Link href="/login">Back to log in</Link>}
          />*/}
        </Container>
      </AuthLayout>
    )
  }

  return (
    <BillingProvider value={billing}>
      <AppLoader isLoading={isInitializing} />
      {!isInitializing && props.children}
    </BillingProvider>
  )
}
