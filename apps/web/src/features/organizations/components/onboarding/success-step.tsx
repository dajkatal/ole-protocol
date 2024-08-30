import { useRef } from 'react'

import * as z from 'zod'
import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { UseFormReturn, useStepperContext } from '@saas-ui/react'

import { OnboardingStep } from './onboarding-step'

// Define a minimal schema since this step doesn't require much data
const schema = z.object({
  acknowledged: z.boolean().optional(),
})

type FormInput = z.infer<typeof schema>

export const SuccessStep = () => {
  const stepper = useStepperContext()
  const formRef = useRef<UseFormReturn<FormInput>>(null)

  const handleStartApplication = () => {
    stepper.nextStep() // Move to the next step in the process
  }

  return (
    <OnboardingStep
      schema={schema}
      formRef={formRef}
      title="Congratulations! Your loan request was submitted!"
      submitLabel="My Dashboard"
      onSubmit={() => handleStartApplication()} // Ensure it moves to the next step
    >
      <VStack spacing={4} align="center">
        <Text>You will be notified when a lender fulfills your loan.</Text>
      </VStack>
    </OnboardingStep>
  )
}
