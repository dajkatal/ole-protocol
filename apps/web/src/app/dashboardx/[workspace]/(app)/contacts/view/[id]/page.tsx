import { ContactsViewPage } from '@app/features/contacts/pages/view'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'Contact',
  renderComponent: ContactsViewPage,
})

export { metadata }
export default Page
