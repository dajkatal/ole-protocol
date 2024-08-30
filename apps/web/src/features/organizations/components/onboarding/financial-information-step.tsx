import { FormEvent, useRef } from 'react'

import * as z from 'zod'
import {
  Field,
  FormLayout,
  UseFormReturn,
  useSnackbar,
  useStepperContext,
} from '@saas-ui/react'

import { OnboardingStep } from './onboarding-step'

// Define validation schema
const schema = z.object({
  loanAmount: z.string().min(1, 'Please enter the loan amount requested.'),
  collateral: z
    .string()
    .min(1, 'Please enter the assets or RWAs you will use as collateral.'),
  collateralRatio: z
    .string()
    .min(1, 'Please enter the desired collateral ratio.'),
  apyPercentage: z.string().min(1, 'Please enter the desired APY'),
  loanDuration: z
    .string()
    .min(1, 'Please enter how many days you want the loan for'),
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
      title="Loan Information"
      description="Please provide your loan information."
      defaultValues={{
        loanAmount: '',
        collateral: 'EDU',
        collateralRatio: '120%',
        apyPercentage: '10%',
        loanDuration: '',
      }}
      onSubmit={async (data) => {
        try {
          // Save data to local storage or handle data here
          localStorage.setItem('userFinancialInfo', JSON.stringify(data))
          stepper.nextStep()
        } catch {
          snackbar.error('Failed to save your loan information.')
        }
      }}
      submitLabel="Submit"
    >
      <FormLayout>
        <Field
          name="loanAmount"
          label="Loan Amount Requested (USDT)"
          rules={{ required: true }}
        />
        <Field
          name="collateral"
          label="Collateral Instrument"
          rules={{ required: true }}
          isDisabled
        />
        <Field
          name="collateralRatio"
          label="Collateralization Ratio (%)"
          isDisabled
        />
        <Field name="apyPercentage" label="APY Percentage" isDisabled />
        <Field
          name="loanDuration"
          label="Loan Duration (days)"
          rules={{ required: true }}
        />
      </FormLayout>
    </OnboardingStep>
  )
}
