import { FormEvent, useRef } from 'react'
import * as z from 'zod'
import { Field, FormLayout, UseFormReturn, useSnackbar, useStepperContext } from '@saas-ui/react'
import { OnboardingStep } from './onboarding-step'

// Define validation schema
const schema = z.object({
    institutionName: z.string().min(1, 'Please enter your institution name.'),
    programName: z.string().min(1, 'Please enter your program name.'),
    programDuration: z.string().min(1, 'Please enter the duration of your program.'),
    expectedGraduationDate: z.string().nonempty('Please enter your expected graduation date.')
})

type FormInput = z.infer<typeof schema>

export const EducationalInformationStep = () => {
    const stepper = useStepperContext()
    const snackbar = useSnackbar()
    const formRef = useRef<UseFormReturn<FormInput>>(null)

    return (
        <OnboardingStep
            schema={schema}
            formRef={formRef}
            title="Educational Information"
            description="Please provide your educational information."
            defaultValues={{
                institutionName: '',
                programName: '',
                programDuration: '',
                expectedGraduationDate: ''
            }}
            onSubmit={async (data) => {
                try {
                    // Save data to local storage or handle data here
                    localStorage.setItem('userEducationalInfo', JSON.stringify(data))
                    stepper.nextStep()
                } catch {
                    snackbar.error('Failed to save your educational information.')
                }
            }}
            submitLabel="Next"
        >
            <FormLayout>
                <Field name="institutionName" label="Institution Name" rules={{ required: true }} />
                <Field name="programName" label="Program Name" rules={{ required: true }} />
                <Field name="programDuration" label="Program Duration" rules={{ required: true }} />
                <Field name="expectedGraduationDate" label="Expected Graduation Date" type="date" rules={{ required: true }} />
            </FormLayout>
        </OnboardingStep>
    )
}
