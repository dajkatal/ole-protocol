import { createPage } from '#lib/create-page'
import {HomePageCustom} from "src/custom/dashboard";

const { Page, metadata } = createPage({
  title: 'Dashboard',
  renderComponent: () => <HomePageCustom />,
})

export { metadata }
export default Page
