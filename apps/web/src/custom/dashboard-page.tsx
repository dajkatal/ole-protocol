'use client'

import { useState, useEffect } from 'react'

import {
    Grid
} from '@chakra-ui/react'
import {
    Page,
    PageBody,
    PageHeader,
    Toolbar,
    ToolbarButton,
} from '@saas-ui-pro/react'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'
import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react'

import { IntroTour } from '../features/organizations/components/intro-tour'

export function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1500000); // 1.5 seconds

        return () => clearTimeout(timer); // Cleanup the timer
    }, []);


    const toolbar = (
        <Toolbar className="overview-toolbar" variant="ghost">
            <ToolbarButton
                as="a"
                href="https://twitter.com/intent/tweet?text=Check%20out%20%40saas_js,%20an%20advanced%20component%20library%20for%20SaaS%20products%20build%20with%20%40chakra_ui.%20https%3A//saas-ui.dev%20"
                icon={<FaTwitter />}
                label="Share on Twitter"
            />
            <ToolbarButton
                as="a"
                href="https://github.com/saas-js/saas-ui"
                icon={<FaGithub />}
                label="Star on Github"
            />
            <ToolbarButton
                as="a"
                href="https://discord.gg/4PmJGFcAjX"
                icon={<FaDiscord />}
                label="Join Discord"
            />
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
            <PageHeader
                title="My Dashboard"
                toolbar={toolbar}
            />
            <PageBody
                contentWidth="container.2xl"
                bg="page-body-bg-subtle"
                py={{ base: 4, xl: 8 }}
                px={{ base: 4, xl: 8 }}
            >
                <IntroTour />
                <LoadingOverlay variant="overlay"
                                isLoading={isLoading}
                                color="primary.500"
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

                </Grid>
            </PageBody>
        </Page>
    )
}
