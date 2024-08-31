import { FormEvent, useRef } from 'react'

import * as z from 'zod'
import {
  Field,
  FormLayout,
  UseFormReturn, useLocalStorage,
  useSnackbar,
  useStepperContext,
} from '@saas-ui/react'

import { useAuth } from '@app/features/common/hooks/use-auth'

import { OnboardingStep } from './onboarding-step'

// Import your custom useAuth hook

// Define validation schema
const schema = z.object({
  fullName: z.string().min(1, 'Please enter your full name.'),
  openCampusId: z.string().min(1, 'Please enter your Open Campus ID.'),
  reasonForLoan: z.string().min(1, 'Please enter the reason for your loan.'),
})

type FormInput = z.infer<typeof schema>

export const PersonalInformationStep = () => {
  const stepper = useStepperContext()
  const snackbar = useSnackbar()
  const formRef = useRef<UseFormReturn<FormInput>>(null)
  const { username } = useAuth() // Get username from useAuth hook

  // Retrieve user data from localStorage
  const [ userData, setUserData ] = useLocalStorage('user', { fname: '', lname: '' });

  const fullName = `${userData.fname} ${userData.lname}`

  return (
    <OnboardingStep
      schema={schema}
      formRef={formRef}
      title="Personal Information"
      description="Please provide your personal information."
      defaultValues={{
        fullName: fullName,
        openCampusId: username,
        reasonForLoan: '',
      }}
      onSubmit={async (data) => {
        try {
          // Save data to local storage or handle data here
          localStorage.setItem('userPersonalInfo', JSON.stringify(data))
          stepper.nextStep()
        } catch {
          snackbar.error('Failed to save your personal information.')
        }
      }}
      submitLabel="Next"
    >
      <FormLayout>
        <Field
          name="fullName"
          label="Full Name"
          defaultValue={fullName}
          isReadOnly
          isDisabled
        />
        <Field
          name="openCampusId"
          label="Open Campus ID"
          defaultValue={username}
          isReadOnly
          isDisabled
        />
        <Field
          name="reasonForLoan"
          label="Reason for Loan"
          rules={{ required: true }}
        />
      </FormLayout>
    </OnboardingStep>
  )
}
