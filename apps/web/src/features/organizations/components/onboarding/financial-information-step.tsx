import { FormEvent, useRef } from 'react'
import * as z from 'zod'
import { Field, FormLayout, UseFormReturn, useSnackbar, useStepperContext } from '@saas-ui/react'
import { OnboardingStep } from './onboarding-step'

// Define validation schema
const schema = z.object({
    loanAmount: z.string().min(1, 'Please enter the loan amount requested.'),
    purposeOfLoan: z.string().min(1, 'Please enter the purpose of the loan.'),
    collateral: z.string().min(1, 'Please enter the assets or RWAs you will use as collateral.'),
    existingDebts: z.string().optional()
})

type FormInput = z.infer<typeof schema>

export const FinancialInformationStep = () => {
    const stepper = useStepperContext()
    const snackbar = useSnackbar()
    const formRef = useRef<UseFormReturn<FormInput>>(null)

    return (
        <OnboardingStep
            schema={schema}
            formRef={formRef}
            title="Financial Information"
            description="Please provide your financial information."
            defaultValues={{
                loanAmount: '',
                purposeOfLoan: '',
                collateral: '',
                existingDebts: ''
            }}
            onSubmit={async (data) => {
                try {
                    // Save data to local storage or handle data here
                    localStorage.setItem('userFinancialInfo', JSON.stringify(data))
                    stepper.nextStep()
                } catch {
                    snackbar.error('Failed to save your financial information.')
                }
            }}
            submitLabel="Submit"
        >
            <FormLayout>
                <Field name="loanAmount" label="Loan Amount Requested" rules={{ required: true }} />
                <Field name="purposeOfLoan" label="Purpose of Loan" rules={{ required: true }} />
                <Field name="collateral" label="Collateral Information" rules={{ required: true }} />
                <Field name="existingDebts" label="Existing Debts (if any)" />
            </FormLayout>
        </OnboardingStep>
    )
}
