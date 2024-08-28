import { AccountNotificationsPage } from '@app/features/settings/pages/account/notifications'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'Notifications',
  renderComponent: AccountNotificationsPage,
})

export { metadata }
export default Page
