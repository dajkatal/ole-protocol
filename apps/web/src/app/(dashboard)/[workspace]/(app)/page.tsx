import { DashboardPage } from '@app/features/organizations/pages/dashboard'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'Dashboard',
  renderComponent: () => <DashboardPage />,
})

export { metadata }
export default Page
