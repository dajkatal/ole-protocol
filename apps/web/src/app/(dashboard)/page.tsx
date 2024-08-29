import { createPage } from '#lib/create-page'

import { IndexPage } from './index'

const { Page, metadata } = createPage({
  title: 'Home',
  renderComponent: () => {
    return <IndexPage />
  },
})

export { metadata }
export default Page
