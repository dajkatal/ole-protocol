import { AccountSecurityPage } from '@app/features/settings/pages/account/security'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'Security',
  renderComponent: AccountSecurityPage,
})

export { metadata }
export default Page
