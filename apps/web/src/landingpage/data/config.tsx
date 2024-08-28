import { Button } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaTwitter } from 'react-icons/fa'
import { FiCheck } from 'react-icons/fi'
import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'OLE Protocol',
    description: 'OLE is a decentralized platform revolutionizing educational finance by connecting lenders with students and educators. Utilizing blockchain technology and Open Campus ID, OLE ensures transparency, security, and trust in the lending process. Borrowers can access flexible, low-interest loans using EDU tokens and real-world assets as collateral, while lenders earn interest and governance rewards. Join OLE to support the future of education through innovative, transparent financial solutions.',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'opportunities',
        label: 'Opportunities',
        href: '#opportunities', // Added href
      },
      {
        id: 'how-it-works',
        label: 'How It Works',
        href: '#how-it-works', // Added href
      },
      {
        id: 'use-benefits',
        label: 'Benefits',
        href: '#use-benefits', // Added href
      },
      {
        id: 'faq',
        label: 'FAQ',
        href: '#faq', // Added href
      },
      {
        label: 'Connect with OCID',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: (
        <>
          © 2024 OLE Protocol
        </>
    ),
    links: [
      {
        href: 'mailto:dajkatal@gmail.com',
        label: 'Contact',
      },
      {
        href: 'https://twitter.com/saas_js',
        label: <FaTwitter size="14" />,
      },
      {
        href: 'https://github.com/saas-js/saas-ui',
        label: <FaGithub size="14" />,
      },
    ],
  }
}

export default siteConfig
