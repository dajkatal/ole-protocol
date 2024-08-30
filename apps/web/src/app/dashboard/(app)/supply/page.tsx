import {RequestedLoansPage} from 'src/custom/supply'

import { createPage } from '#lib/create-page'

const { Page, metadata } = createPage({
    title: 'Supply a Loan',
    renderComponent: () => <RequestedLoansPage />,
})

export { metadata }
export default Page
