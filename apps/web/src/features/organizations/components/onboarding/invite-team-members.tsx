import * as z from 'zod'
import { Button } from '@chakra-ui/react'
import { useSessionStorageValue } from '@react-hookz/web'
import {
  Field,
  FormLayout,
  useSnackbar,
  useStepperContext,
} from '@saas-ui/react'
import { useMutation } from '@tanstack/react-query'

import { inviteToOrganization } from '@api/client'

import { OnboardingStep } from './onboarding-step'

const schema = z.object({
  emails: z.string(),
})

export const InviteTeamMembersStep = () => {
  const workspace = useSessionStorageValue<string>('getting-started.workspace')

  const stepper = useStepperContext()
  const snackbar = useSnackbar()

  const { mutateAsync: invite } = useMutation({
    mutationFn: inviteToOrganization,
  })

  return (
    <OnboardingStep
      schema={schema}
      title="Invite your team"
      description="Saas UI works better with your team."
      defaultValues={{ emails: '' }}
      onSubmit={async (data) => {
        if (workspace.value && data.emails) {
          try {
            await invite({
              organizationId: workspace.value,
              emails: data.emails.split(/,\s?/),
            })
          } catch {
            snackbar.error({
              title: 'Failed to invite team members',
              description: 'Please try again or skip this step.',
              action: <Button onClick={() => stepper.nextStep()}>Skip</Button>,
            })
            return
          }
        }
        stepper.nextStep()
      }}
      submitLabel="Continue"
    >
      <FormLayout>
        <Field
          name="emails"
          label="Email addresses"
          placeholder="member@acme.co, member2@acme.co"
          type="textarea"
          autoFocus
        />
      </FormLayout>
    </OnboardingStep>
  )
}
