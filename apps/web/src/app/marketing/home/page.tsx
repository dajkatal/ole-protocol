import { HomePage } from 'marketing/pages/home'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'home',
  renderComponent: HomePage,
})

export { metadata }
export default Page
