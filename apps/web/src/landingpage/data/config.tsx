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
      },
      {
        id: 'how-it-works',
        label: 'How It Works',
      },
      {
        id: 'use-benefits',
        label: 'Benefits'
      },
      {
        id: 'faq',
        label: 'FAQ',
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
  },
  signup: {
    title: 'Start building with Saas UI',
    features: [
      {
        icon: FiCheck,
        title: 'Accessible',
        description: 'All components strictly follow WAI-ARIA standards.',
      },
      {
        icon: FiCheck,
        title: 'Themable',
        description:
          'Fully customize all components to your brand with theme support and style props.',
      },
      {
        icon: FiCheck,
        title: 'Composable',
        description:
          'Compose components to fit your needs and mix them together to create new ones.',
      },
      {
        icon: FiCheck,
        title: 'Productive',
        description:
          'Designed to reduce boilerplate and fully typed, build your product at speed.',
      },
    ],
  },
}

export default siteConfig
