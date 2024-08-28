'use client'

import { ButtonGroup, Card, CardBody, Stack, Text } from '@chakra-ui/react'
import { FormattedDate } from '@common/i18n'
import { useBilling } from '@saas-ui-pro/billing'
import { Section, SectionBody, SectionHeader } from '@saas-ui-pro/react'
import { Field, FormLayout, SubmitButton } from '@saas-ui/react'
import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

import { usePath } from '@app/features/common/hooks/use-path'
import { useWorkspace } from '@app/features/common/hooks/use-workspace'

import { getOrganization } from '@api/client'

import { Form, LinkButton, SettingsPage } from '@ui/lib'

function BillingPlan() {
  const { isTrialing, isTrialExpired, trialEndsAt, currentPlan } = useBilling()

  return (
    <Section variant="annotated">
      <SectionHeader
        title="Billing plan"
        description="Update your billing plan."
      />
      <SectionBody>
        <Card>
          <CardBody>
            <Stack alignItems="flex-start">
              {!isTrialExpired && (
                <Text>
                  You are currently on the <strong>{currentPlan?.name}</strong>{' '}
                  plan.
                </Text>
              )}

              {isTrialing && (
                <Text>
                  Your trial ends <FormattedDate value={trialEndsAt} />.
                </Text>
              )}

              {isTrialExpired && (
                <Text>
                  Your trial ended on <FormattedDate value={trialEndsAt} />.
                </Text>
              )}

              <LinkButton href={usePath('/settings/plans')}>
                View plans and upgrade
              </LinkButton>
            </Stack>
          </CardBody>
        </Card>
      </SectionBody>
    </Section>
  )
}

function BillingEmail() {
  return (
    <Section variant="annotated">
      <SectionHeader
        title="Billing email"
        description="Send invoices to an alternative address."
      />
      <SectionBody>
        <Card>
          <CardBody>
            <Form
              schema={z.object({ billing: z.object({ email: z.string() }) })}
              onSubmit={() => null}
            >
              <FormLayout>
                <Field
                  name="billing.email"
                  label="Email address"
                  type="email"
                />
                <ButtonGroup>
                  <SubmitButton>Update</SubmitButton>
                </ButtonGroup>
              </FormLayout>
            </Form>
          </CardBody>
        </Card>
      </SectionBody>
    </Section>
  )
}

function BillingInvoices() {
  return (
    <Section variant="annotated">
      <SectionHeader
        title="Invoices"
        description="Invoices are sent on the first of every month."
      />
      <SectionBody>
        <Card>
          <CardBody>
            <Text color="muted">No invoices received yet.</Text>
          </CardBody>
        </Card>
      </SectionBody>
    </Section>
  )
}

export function BillingPage() {
  const slug = useWorkspace()

  const { isLoading } = useQuery({
    queryKey: ['Organization', slug],
    queryFn: () => getOrganization({ slug }),
    enabled: !!slug,
  })

  return (
    <SettingsPage
      isLoading={isLoading}
      title="Billing"
      description="Manage your billing information and invoices"
    >
      <BillingPlan />
      <BillingEmail />
      <BillingInvoices />
    </SettingsPage>
  )
}
