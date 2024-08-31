'use client'

import { useEffect, useState } from 'react'

import {
    Grid,
    GridItem,
    Card,
    Text,
    Tabs,
    TabList, Tab, TabPanels, TabPanel, Badge,
    Button
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

const requestedLoanColumns: ColumnDef<any>[] = [
    {
        id: 'amount',
        header: 'Loan Amount',
        cell: ({ getValue }) => (
            <Text>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(getValue<number>())}
            </Text>
        ),
        meta: {
            isNumeric: true,
        },
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'apy',
        header: 'APY (%)',
        cell: ({ getValue }) => <Text>{getValue<number>().toFixed(2)}%</Text>,
        meta: {
            isNumeric: true,
        },
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'amountToRepay',
        header: 'Amount to Repay',
        cell: ({ row }) => {
            const amount = row.original.amount;
            const apy = row.original.apy;
            const amountToRepay = amount * (1 + apy / 100); // Calculate amount to repay

            return (
                <Text>
                    {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: 'USD',
                    }).format(amountToRepay)}
                </Text>
            );
        },
        meta: {
            isNumeric: true,
        },
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'reason',
        header: 'Reason',
        cell: ({ getValue }) => (
            <Text
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                maxWidth="150px" // Adjust this width as needed
            >
                {getValue<string>()}
            </Text>
        ),
        filterFn: getDataGridFilter('string'),
    },
    {
        id: 'daysTillExpiry',
        header: 'Days Till Due',
        cell: ({ getValue }) => <Text>{getValue<number>()}</Text>,
        meta: {
            isNumeric: true,
        },
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'fulfilled',
        header: 'Fulfilled',
        cell: ({ getValue }) => {
            const fulfilled = getValue<boolean>();
            const colorScheme = fulfilled ? 'green' : 'red'; // Green if fulfilled, red if not

            return (
                <Badge
                    fontWeight="normal"
                    textAlign="center"
                    borderRadius="5px"
                    p="2px 4px"
                    colorScheme={colorScheme}
                >
                    {fulfilled ? 'Yes' : 'No'}
                </Badge>
            );
        },
        meta: {
            isNumeric: false,
        },
        filterFn: getDataGridFilter('boolean'),
        sortFn: (rowA, rowB) => {
            const fulfilledA = rowA.original.fulfilled ? 1 : 0;
            const fulfilledB = rowB.original.fulfilled ? 1 : 0;
            return fulfilledA - fulfilledB; // Sorts unfulfilled (false) before fulfilled (true)
        },
    },
    {
        id: 'repay',
        header: '',
        cell: ({ row }) => {
            const fulfilled = row.original.fulfilled;

            return (
                <Button
                    colorScheme="blue"
                    size="sm"
                    onClick={() => alert('Repay action')}
                    width="100px"
                    bgColor={fulfilled ? 'gray' : 'blue.500'}
                    isDisabled={fulfilled}
                >
                    {fulfilled ? 'Already Paid' : 'Repay Now'}
                </Button>
            );
        },
        filterFn: getDataGridFilter('boolean'),
    },
];


const suppliedLoanColumns: ColumnDef<any>[] = [
    {
        id: 'amount',
        header: 'Loan Amount',
        cell: ({ getValue }) => (
            <Text>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(getValue<number>())}
            </Text>
        ),
        meta: {
            isNumeric: true,
        },
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'borrowerOCID',
        header: 'Borrower OCID',
        cell: ({ getValue }) => <Text>{getValue<string>()}</Text>,
        filterFn: getDataGridFilter('string'),
    },
    {
        id: 'apy',
        header: 'APY (%)',
        cell: ({ getValue }) => <Text>{getValue<number>().toFixed(2)}%</Text>,
        meta: {
            isNumeric: true,
        },
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'profitOnFulfilment',
        header: 'Profit on Fulfilment',
        cell: ({ getValue }) => (
            <Text>
                {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                }).format(getValue<number>())}
            </Text>
        ),
        meta: {
            isNumeric: true,
        },
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'daysTillExpiry',
        header: 'Days Till Expiry',
        cell: ({ getValue }) => <Text>{getValue<number>()}</Text>,
        meta: {
            isNumeric: true,
        },
        filterFn: getDataGridFilter('number'),
    },
    {
        id: 'status',
        header: 'Status',
        cell: ({ getValue }) => {
            const status = getValue<string>();
            let colorScheme = 'gray'; // Default color

            if (status === 'Paid') {
                colorScheme = 'green';
            } else if (status === 'Defaulted') {
                colorScheme = 'red';
            } else if (status === 'Ongoing') {
                colorScheme = 'blue';
            }

            return (
                <Badge
                    fontWeight="normal"
                    textAlign="center"
                    borderRadius="5px"
                    colorScheme={colorScheme}
                >
                    {status}
                </Badge>
            );
        },
        filterFn: getDataGridFilter('string'),
        sortFn: (rowA, rowB) => {
            const statusOrder = { 'Ongoing': 0, 'Paid': 1, 'Defaulted': 2 };
            const statusA = rowA.original.status;
            const statusB = rowB.original.status;

            return statusOrder[statusA] - statusOrder[statusB];
        },
    },
];


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
                                    <TabPanel key="loans-supplied" pt="8" pb="0">
                                        <DataGrid
                                            columns={suppliedLoanColumns}
                                            data={mockDataSupplied}
                                            isSortable
                                            initialState={{
                                                sorting: [{ id: 'status', desc: false }] // This sets the initial sorting state to sort by 'fulfilled' in ascending order
                                            }}
                                            stickyHeader={true}
                                            sx={{
                                                borderRadius: '10px',
                                                overflow: 'hidden',
                                                td: {
                                                    justifyContent: 'left !important',
                                                    height: '56px'
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
                                    <TabPanel key="loans-requested" pt="8" pb="0">
                                        <DataGrid
                                            columns={requestedLoanColumns}
                                            data={mockDataRequested}
                                            initialState={{
                                                sorting: [{ id: 'fulfilled', desc: false }] // This sets the initial sorting state to sort by 'fulfilled' in ascending order
                                            }}
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
