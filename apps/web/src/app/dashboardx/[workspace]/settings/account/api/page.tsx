import { AccountApiPage } from '@app/features/settings/pages/account/api'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'API',
  renderComponent: AccountApiPage,
})

export { metadata }
export default Page
