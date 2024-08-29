'use client'

import * as React from 'react'
import { Center, Container } from '@chakra-ui/react'
import { useSessionStorageValue } from '@react-hookz/web'
import { LoadingOverlay, LoadingSpinner, Steps, StepsCompleted, StepsItem } from '@saas-ui/react'
import { useRouter } from 'next/navigation'
import { OnboardingPage } from '../components/onboarding'
import { IntroductionStep } from '../components/onboarding/introduction-step'
import { PersonalInformationStep } from '../components/onboarding/personal-information-step'
import { EducationalInformationStep } from '../components/onboarding/educational-information-step'
import { FinancialInformationStep } from '../components/onboarding/financial-information-step'

export const RequestLoan: React.FC = () => {

  return (
      <OnboardingPage isLoading={false}>
        <Container maxW="container.md">
          <Center minH="$100vh">
            <Steps variant="dots" flexDirection="column-reverse" width="full">
              <StepsItem title="Introduction">
                <IntroductionStep />
              </StepsItem>
              <StepsItem title="Personal Information">
                <PersonalInformationStep />
              </StepsItem>
              <StepsItem title="Educational Information">
                <EducationalInformationStep />
              </StepsItem>
              <StepsItem title="Financial Information">
                <FinancialInformationStep />
              </StepsItem>
              <StepsCompleted>
                <OnboardingCompleted />
              </StepsCompleted>
            </Steps>
          </Center>
        </Container>
      </OnboardingPage>
  )
}

const OnboardingCompleted = () => {
  const router = useRouter()
  const workspace = useSessionStorageValue('getting-started.workspace')

  React.useEffect(() => {
    router.push(`/dashboard`)
  }, [])

  return (
      <LoadingOverlay
          variant="overlay"
          bg="chakra-body-bg"
          _dark={{ bg: 'chakra-body-bg' }}
      >
        <LoadingSpinner />
      </LoadingOverlay>
  )
}
