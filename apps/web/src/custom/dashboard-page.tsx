'use client'

import { useEffect, useState } from 'react'

import {
    Grid,
    GridItem,
    Card,
    CardBody,
    Stat,
    StatLabel,
    StatNumber,
    Text,
    HStack,
    Tabs,
    TabList, Tab, TabPanels, TabPanel
} from '@chakra-ui/react'
import {
    LoadingOverlay,
    LoadingSpinner,
} from '@saas-ui/react'

import {
    Page,
    PageBody,
    PageHeader,
    Toolbar,
    ToolbarButton,
    DataGrid,
    DataGridCell,
    FiltersProvider,
    FiltersAddButton,
    ActiveFiltersList,
    getDataGridFilter,
    DataGridPagination,
} from '@saas-ui-pro/react'

import { MetricsCard } from '../features/organizations/components/metrics/metrics-card'

import { Sparkline } from '@saas-ui/charts'
import { FaDiscord, FaGithub, FaTwitter } from 'react-icons/fa'

import { NavBar } from '../features/common/components/navbar'
import { IntroTour } from '../features/organizations/components/intro-tour'
import { generateMockData } from './mockData'
import {Metric} from "@app/features/organizations/components/metrics/metric";
import {RevenueChart} from "@app/features/organizations/components/metrics/revenue-chart";
import Leaderboard from "./leaderboard";
import YourOcImpact from "./your-oc-impact";

const { mockDataRequested, mockDataSupplied } = generateMockData()

const currencyFormatter = (value) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(value)
}

const generateSuppliedData = () => {
    return Array.from({ length: 20 }, (_, i) => ({
        date: `Week ${i + 1}`,
        value: Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000,
    }))
}

const suppliedData = generateSuppliedData()

const requestedData = suppliedData.map(item => ({
    date: item.date,
    value: Math.round(item.value * 1.44),
}))

const columns: ColumnDef<any>[] = [
    {
        id: 'loanAmount',
        header: 'Loan Amount',
        cell: ({ getValue }) => (
            <Text>
                {currencyFormatter(getValue<number>())}
            </Text>
        ),
        meta: {
            isNumeric: true,
        },
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'collateral',
        header: 'Collateral Offered',
        filterFn: getDataGridFilter('string'),
    },
    {
        id: 'apy',
        header: 'APY (%)',
        meta: {
            isNumeric: true,
        },
        cell: ({ getValue }) => <Text>{getValue<number>()}%</Text>,
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'purpose',
        header: 'Purpose of Loan',
        filterFn: getDataGridFilter('string'),
    },
    {
        id: 'duration',
        header: 'Duration',
        filterFn: getDataGridFilter('string'),
    },
    {
        id: 'ocid',
        header: 'OCID',
        filterFn: getDataGridFilter('string'),
    },
]

const loanSuppliedMetric = {
    label: "Loans You Supplied",
    value: "$124,312.00",
    previousValue: "$94,312.00",
    change: "30",
    isIncreasePositive: true
}
const loanRequestedMetric = {
    label: "Loans You Requested",
    value: "$24,312.00",
    change: "",
    isIncreasePositive: true
}

export function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true)
    const [loansRequested, setLoansRequested] = useState(requestedData.reduce((acc, item) => acc + item.value, 0))
    const [loansSupplied, setLoansSupplied] = useState(suppliedData.reduce((acc, item) => acc + item.value, 0))

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 500) // 0.7 seconds

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
                position="relative"
            >
                <IntroTour />
                <LoadingOverlay
                    variant="overlay"
                    isLoading={isLoading}
                    background="#171a1d !important"
                    zIndex={3}
                >
                    <LoadingSpinner size="lg" color="primary.500" thickness="4px" />
                </LoadingOverlay>
                <Grid
                    templateColumns={['repeat(1, 1fr)', null, null, 'repeat(2, 1fr)']}
                    gap={{ base: 4, xl: 8 }}
                    pb="8"
                >
                    {/* First row statistics */}
                    <GridItem colSpan={{ base: 1, lg: 3 }}>
                        <Card>
                            <Tabs variant="unstyled" tabIndex={0}>
                                <TabList
                                    overflow="hidden"
                                    borderTopRadius="md"
                                    display="flex"
                                    flexWrap="wrap"
                                >
                                    <Tab
                                        key="Loans Supplied"
                                        id="loans-supplied"
                                        alignItems="stretch"
                                        justifyContent="stretch"
                                        flex={{ base: '0 0 50%', lg: '1 0 auto' }}
                                        width="50%"
                                        height="auto"
                                        textAlign="left"
                                        borderBottomWidth="1px"
                                        borderRightWidth="1px"
                                        _hover={{
                                            bg: 'whiteAlpha.100',
                                            _dark: {
                                                bg: 'whiteAlpha.100',
                                            },
                                        }}
                                        _selected={{
                                            borderBottomWidth: '2px',
                                            borderBottomColor: 'primary.500',
                                            display: 'flex',
                                        }}
                                        _last={{
                                            borderRightWidth: '0',
                                        }}
                                    >
                                        <Metric {...loanSuppliedMetric} />
                                    </Tab>
                                    <Tab
                                        key="Loans Requesed"
                                        id="loans-requesed"
                                        alignItems="stretch"
                                        justifyContent="stretch"
                                        flex={{ base: '0 0 50%', lg: '1 0 auto' }}
                                        width="50%"
                                        height="auto"
                                        textAlign="left"
                                        borderBottomWidth="1px"
                                        borderRightWidth="1px"
                                        _hover={{
                                            bg: 'whiteAlpha.100',
                                            _dark: {
                                                bg: 'whiteAlpha.100',
                                            },
                                        }}
                                        _selected={{
                                            borderBottomWidth: '2px',
                                            borderBottomColor: 'primary.500',
                                            display: 'flex',
                                        }}
                                        _last={{
                                            borderRightWidth: '0',
                                        }}
                                    >
                                        <Metric {...loanRequestedMetric} />
                                    </Tab>
                                </TabList>
                                <TabPanels>
                                    <TabPanel key="loans-supplied" pt="8">
                                        <DataGrid
                                            columns={columns}
                                            data={mockDataSupplied}
                                            isSortable
                                            stickyHeader={true}
                                            sx={{
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                td: {
                                                    justifyContent: 'left !important',
                                                },
                                                th: {
                                                    justifyContent: 'left !important',
                                                },
                                                tfoot: {
                                                    display: 'none',
                                                },
                                            }}
                                        >
                                            <DataGridPagination
                                                rowsPerPageOptions={[5, 10, 15]}
                                                count={mockDataSupplied.length}
                                                defaultPageSize={10}
                                                sx={{ px: '16px', py: '13px' }}
                                            />
                                        </DataGrid>
                                    </TabPanel>
                                    <TabPanel key="loans-requested" pt="8">
                                        <DataGrid
                                            columns={columns}
                                            data={mockDataRequested}
                                            isSortable
                                            stickyHeader={true}
                                            sx={{
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                td: {
                                                    justifyContent: 'left !important',
                                                },
                                                th: {
                                                    justifyContent: 'left !important',
                                                },
                                                tfoot: {
                                                    display: 'none',
                                                },
                                            }}
                                        >
                                            <DataGridPagination
                                                rowsPerPageOptions={[5, 10, 15]}
                                                count={mockDataRequested.length}
                                                defaultPageSize={10}
                                                sx={{ px: '16px', py: '13px' }}
                                            />
                                        </DataGrid>
                                    </TabPanel>
                                </TabPanels>
                            </Tabs>
                        </Card>
                    </GridItem>
                    <GridItem colSpan={{ base: 1, lg: 2 }}>
                        <Leaderboard />
                    </GridItem>
                    <GridItem colSpan={{ base: 1, lg: 1 }}>
                        <YourOcImpact />
                    </GridItem>
                </Grid>
            </PageBody>
        </Page>
    )
}

export default DashboardPage
