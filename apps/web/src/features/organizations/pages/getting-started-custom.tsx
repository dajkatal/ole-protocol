'use client'

import * as React from 'react'

import { Center, Container } from '@chakra-ui/react'
import { useSessionStorageValue } from '@react-hookz/web'
import {
  LoadingOverlay,
  LoadingSpinner,
  Steps,
  StepsCompleted,
  StepsItem,
} from '@saas-ui/react'
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { getCurrentUser } from '@api/client'

import {
  CreateOrganizationStep,
  InviteTeamMembersStep,
  OnboardingPage,
} from '../components/onboarding'
import { AppearanceStep } from '../components/onboarding/appearance'
import { SubscribeStep } from '../components/onboarding/subscribe'

export const GettingStartedPage: React.FC = () => {

  return (
    <OnboardingPage isLoading={false}>
      <Container maxW="container.md">
        <Center minH="$100vh">
          <Steps variant="dots" flexDirection="column-reverse" width="full">
            <StepsItem title="Welcome to the OLE Protocol">
              <CreateOrganizationStep />
            </StepsItem>
          </Steps>
        </Center>
      </Container>
    </OnboardingPage>
  )
}
