import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { useStepperContext, UseFormReturn } from '@saas-ui/react'
import { OnboardingStep } from './onboarding-step'
import * as z from 'zod'
import { useRef } from 'react'

// Define a minimal schema since this step doesn't require much data
const schema = z.object({
    acknowledged: z.boolean().optional(),
})

type FormInput = z.infer<typeof schema>

export const IntroductionStep = () => {
    const stepper = useStepperContext()
    const formRef = useRef<UseFormReturn<FormInput>>(null)

    const handleStartApplication = () => {
        stepper.nextStep()  // Move to the next step in the process
    }

    return (
        <OnboardingStep
            schema={schema}
            formRef={formRef}
            title="OLE Protocol Loan Application"
            submitLabel="Start Application"
            onSubmit={() => handleStartApplication()}  // Ensure it moves to the next step
        >
            <VStack spacing={4} align="start">
                <Text>
                    Welcome! You are about to apply for a loan through the OLE Protocol. We just need a few details to get started.
                </Text>
                <Text>
                    Please ensure that you have all the necessary documents and information ready before proceeding.
                </Text>
            </VStack>
        </OnboardingStep>
    )
}
