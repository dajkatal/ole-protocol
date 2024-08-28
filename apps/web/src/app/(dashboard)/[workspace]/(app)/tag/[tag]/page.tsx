import { ContactsListPage } from '@app/features/contacts/pages/list'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'Contacts',
  renderComponent: ContactsListPage,
})

export { metadata }
export default Page
