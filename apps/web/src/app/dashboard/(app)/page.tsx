import { HomePageCustom} from 'src/custom/dashboard'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
  title: 'Dashboard',
  renderComponent: () => <HomePageCustom />,
})

export { metadata }
export default Page
