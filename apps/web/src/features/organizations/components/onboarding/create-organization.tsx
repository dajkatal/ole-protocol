import { FormEvent, useRef } from 'react';
import * as z from 'zod';
import { InputLeftElement, Text, SimpleGrid, Input } from '@chakra-ui/react';
import { useSessionStorageValue } from '@react-hookz/web';
import {
    Field,
    FormLayout,
    UseFormReturn,
    useSnackbar,
    useStepperContext,
} from '@saas-ui/react';
import { useMutation } from '@tanstack/react-query';
import slug from 'slug';

import { createOrganization } from '@api/client';
import { OnboardingStep } from './onboarding-step';
import { useUserRegistration } from '@app/features/common/hooks/use-user-registration';
import { useRouter } from 'next/navigation';
import {useAuth} from "@app/features/common/hooks/use-auth"; // Import router for navigation

const schema = z.object({
    fname: z.string().min(1, 'Please enter your first name.'),
    lname: z.string().min(1, 'Please enter your last name.'),
    dob: z.string().nonempty('Please enter your date of birth.').describe('Date of Birth'),
});

type FormInput = z.infer<typeof schema>;

export const CreateOrganizationStep = () => {
    const stepper = useStepperContext();
    const snackbar = useSnackbar();
    const router = useRouter(); // Initialize router for navigation

    const workspace = useSessionStorageValue('getting-started.workspace');
    const formRef = useRef<UseFormReturn<FormInput>>(null);

    const {username} = useAuth();

    const { setRegistrationStatus } = useUserRegistration(username); // Use a default user identifier for now

    const { mutateAsync } = useMutation({
        mutationFn: createOrganization,
    });

    return (
        <OnboardingStep
            schema={schema}
            formRef={formRef}
            title="Welcome to the OLE Protocol"
            description="To get started, we just need a few details from you to set up your account"
            defaultValues={{ fname: '', lname: '', dob: '' }}
            onSubmit={async (data) => {
                try {
                    // Store user data in local storage
                    localStorage.setItem('user', JSON.stringify({
                        fname: data.fname,
                        lname: data.lname,
                        dob: data.dob,
                    }));

                    // Set registration status to true
                    setRegistrationStatus(true);

                    // Redirect to dashboard
                    router.push('/dashboard');
                } catch (error) {
                    snackbar.error('Error during setup. Please try again');
                }
            }}
            submitLabel="Get Started"
        >
            <FormLayout>
                <SimpleGrid columns={2} spacing={4}>
                    <Field
                        name="fname"
                        label="First Name"
                        autoFocus
                        rules={{ required: true }}
                        data-1p-ignore
                        onChange={(e: FormEvent<HTMLInputElement>) => {
                            const value = e.currentTarget.value;
                            formRef.current?.setValue('fname', value);
                        }}
                    />
                    <Field
                        name="lname"
                        label="Last Name"
                        rules={{ required: true }}
                        data-1p-ignore
                        onChange={(e: FormEvent<HTMLInputElement>) => {
                            const value = e.currentTarget.value;
                            formRef.current?.setValue('lname', value);
                        }}
                    />
                </SimpleGrid>
                <Field
                    name="dob"
                    label="Date of Birth"
                    rules={{ required: 'Please enter your date of birth.' }}
                    as={Input}
                    type="date" // Use date input type for date picker
                    placeholder="Select Date of Birth"
                />
            </FormLayout>
        </OnboardingStep>
    );
};
