import { createPage } from '#lib/create-page'
import {RequestLoan} from "@app/features/organizations/pages/request-loan";

const { Page, metadata } = createPage({
  title: 'Request Loan',
  renderComponent: () => {
    return <RequestLoan />
  },
})

export { metadata }
export default Page
