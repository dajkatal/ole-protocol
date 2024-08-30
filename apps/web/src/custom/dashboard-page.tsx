'use client'

import { useEffect, useState } from 'react'

import { Grid } from '@chakra-ui/react'
import {
  Page,
  PageBody,
  PageHeader,
  Toolbar,
  ToolbarButton,
} from '@saas-ui-pro/react'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

import { NavBar } from '../features/common/components/navbar'
import { IntroTour } from '../features/organizations/components/intro-tour'

export function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500) // 1.5 seconds

    return () => clearTimeout(timer) // Cleanup the timer
  }, [])

  const toolbar = (
    <Toolbar className="overview-toolbar" variant="ghost">
      <ToolbarButton
        as="a"
        href="https://x.com/oleprotocol"
        icon={<FaTwitter />}
        label="Share on Twitter"
      />
      <ToolbarButton
        as="a"
        href="https://github.com/dajkatal/ole-protocol"
        icon={<FaGithub />}
        label="Star on Github"
      />
      <ToolbarButton as="a" href="" icon={<FaDiscord />} label="Join Discord" />
      <ToolbarButton
        as="a"
        href="#"
        label="Connect Wallet"
        colorScheme="primary"
        variant="solid"
        className="pre-order"
      />
    </Toolbar>
  )

  return (
    <Page>
      <PageHeader title="My Dashboard" toolbar={<NavBar />} />
      <PageBody
        contentWidth="container.2xl"
        bg="page-body-bg-subtle"
        py={{ base: 4, xl: 8 }}
        px={{ base: 4, xl: 8 }}
        position="relative" // Ensures the overlay is positioned relative to the content
      >
        <IntroTour />
        <LoadingOverlay
          variant="overlay"
          isLoading={isLoading}
          color="primary.500"
          zIndex={2} // Ensures the overlay appears above other content
        >
          <LoadingSpinner />
        </LoadingOverlay>
        <Grid
          templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}
          gridAutoColumns="fr1"
          width="100%"
          gap={{ base: 4, xl: 8 }}
          pb="8"
        >
          {/* Your grid content here */}
        </Grid>
      </PageBody>
    </Page>
  )
}

export default DashboardPage
