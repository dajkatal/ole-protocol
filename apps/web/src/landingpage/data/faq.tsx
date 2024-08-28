import * as React from 'react'

const faq = {
  title: 'Frequently asked questions',
  // description: '',
  items: [
    {
      q: 'What is the OLE Protocol?',
      a: (
          <>
            The OLE Protocol (Open Lending for Education) is a decentralized platform that connects lenders with borrowers seeking educational financing. It utilizes blockchain technology and the Open Campus ID to provide a secure and transparent environment for all participants, allowing lenders to earn interest and governance tokens while borrowers access flexible, low-interest loans.
          </>
      ),
    },
    {
      q: 'How does Open Campus ID enhance the lending process?',
      a: (
          <>
            Open Campus ID is a decentralized identifier that represents the borrower’s educational credentials on the blockchain. It ensures transparency and trust by providing lenders with verified borrower profiles, helping them make informed lending decisions aligned with educational purposes.
          </>
      ),
    },
    {
      q: 'What are the benefits of using EDU tokens on the OLE Protocol?',
      a: (
          <>
            EDU tokens are the native currency of the EDU Chain, used to secure loans and participate in governance on the OLE Protocol. Borrowers can use EDU tokens as collateral to access loans, while lenders earn EDU tokens as interest and governance rewards, integrating educational and financial ecosystems for mutual benefit.
          </>
      ),
    },
    {
      q: 'How can I get started as a lender or borrower on the OLE Protocol?',
      a: (
          <>
            To get started as a lender, sign up on our platform, review available loan opportunities, and choose where to invest. For borrowers, apply for a loan by creating an Open Campus ID and submitting your educational credentials. Our platform guides you through every step, ensuring a smooth process for achieving your educational or investment goals.
          </>
      ),
    },
  ]
  ,
}

export default faq
