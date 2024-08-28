import { StackDivider, VStack } from '@chakra-ui/react'
import {
  Page,
  PageBody,
  PageHeader,
  PageHeaderProps,
  PageProps,
} from '@saas-ui-pro/react'

interface SettingsPageProps
  extends PageProps,
    Pick<PageHeaderProps, 'title' | 'description' | 'toolbar'> {}

/**
 * SettingsPage
 *
 * Use this component as a base for your settings pages.
 */
export const SettingsPage = (props: SettingsPageProps) => {
  const { children, title, description, toolbar, ...rest } = props

  return (
    <Page variant="settings" mt={[14, null, 0]} {...rest}>
      <PageHeader title={title} description={description} toolbar={toolbar} />
      <PageBody>
        <VStack divider={<StackDivider />} align="stretch" spacing={8} pb="16">
          {children}
        </VStack>
      </PageBody>
    </Page>
  )
}
