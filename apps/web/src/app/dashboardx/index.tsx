'use client'

import { useAuth } from 'src/features/common/hooks/use-auth'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'
import { HomePage as MarketingHomePage } from 'marketing/pages/home'

import { HomePage } from '@app/features/organizations/pages/home'

export const IndexPage = () => {
  const { isAuthenticated, isLoggingIn } = useAuth();

  console.log(isAuthenticated, isLoggingIn);

  if (isLoggingIn) {
    return (
      <LoadingOverlay variant="fullscreen">
        <LoadingSpinner />
      </LoadingOverlay>
    )
  }

  if (isAuthenticated) {
    return <HomePage />
  }

  return <MarketingHomePage />
}
