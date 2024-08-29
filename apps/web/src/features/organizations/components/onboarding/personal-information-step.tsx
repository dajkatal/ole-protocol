import { FormEvent, useRef } from 'react'
import * as z from 'zod'
import { Field, FormLayout, UseFormReturn, useSnackbar, useStepperContext } from '@saas-ui/react'
import { OnboardingStep } from './onboarding-step'
import { useAuth } from '@app/features/common/hooks/use-auth' // Import your custom useAuth hook

// Define validation schema
const schema = z.object({
    fullName: z.string().min(1, 'Please enter your full name.'),
    openCampusId: z.string().min(1, 'Please enter your Open Campus ID.'),
    dateOfBirth: z.string().nonempty('Please enter your date of birth.'),
    nationality: z.string().min(1, 'Please enter your nationality.'),
    email: z.string().email('Please enter a valid email address.'),
    phoneNumber: z.string().min(1, 'Please enter your phone number.')
})

type FormInput = z.infer<typeof schema>

export const PersonalInformationStep = () => {
    const stepper = useStepperContext()
    const snackbar = useSnackbar()
    const formRef = useRef<UseFormReturn<FormInput>>(null)
    const { username } = useAuth() // Get username from useAuth hook

    // Retrieve user data from localStorage
    const storedUser = localStorage.getItem('user')
    const userData = storedUser ? JSON.parse(storedUser) : { fname: '', lname: '' }
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
                dateOfBirth: '',
                nationality: '',
                email: '',
                phoneNumber: ''
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
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    rules={{ required: true }}
                />
                <Field
                    name="nationality"
                    label="Nationality"
                    rules={{ required: true }}
                />
                <Field
                    name="email"
                    label="Email"
                    type="email"
                    rules={{ required: true }}
                />
                <Field
                    name="phoneNumber"
                    label="Phone Number"
                    rules={{ required: true }}
                />
            </FormLayout>
        </OnboardingStep>
    )
}
