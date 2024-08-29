import { InboxListPage } from '@app/features/contacts/pages/inbox'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'Inbox',
  renderComponent: InboxListPage,
})

export { metadata }
export default Page
