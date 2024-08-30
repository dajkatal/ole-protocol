'use client'

import * as React from 'react'
import { useState } from 'react'
import {
    Box,
    Avatar,
    Badge,
    Text,
    HStack,
    VStack, Icon,
} from '@chakra-ui/react'
import {
    DataGrid,
    ColumnDef,
    DataGridPagination,
} from '@saas-ui-pro/react'
import { MetricsCard } from '@app/features/organizations/components/metrics/metrics-card'
import {IconBadge} from "@saas-ui/react";
import { FaMedal } from 'react-icons/fa'

// Sample data for leaderboard
const leaderboardData = [
    { ocid: 'alex.edu', totalLoansSupplied: 105000, averageApy: 4.2 },
    { ocid: 'mike.edu', totalLoansSupplied: 98000, averageApy: 4.0 },
    { ocid: 'jane.edu', totalLoansSupplied: 95000, averageApy: 3.9 },
    { ocid: 'sara.edu', totalLoansSupplied: 90000, averageApy: 4.1 },
    { ocid: 'chris.edu', totalLoansSupplied: 88000, averageApy: 3.7 },
    { ocid: 'emma.edu', totalLoansSupplied: 87000, averageApy: 4.3 },
    { ocid: 'noah.edu', totalLoansSupplied: 85000, averageApy: 3.6 },
    { ocid: 'olivia.edu', totalLoansSupplied: 82000, averageApy: 4.2 },
    { ocid: 'liam.edu', totalLoansSupplied: 80000, averageApy: 4.0 },
    { ocid: 'zoe.edu', totalLoansSupplied: 78000, averageApy: 3.5 },
    { ocid: 'lucas.edu', totalLoansSupplied: 76000, averageApy: 4.1 },
    { ocid: 'mia.edu', totalLoansSupplied: 74000, averageApy: 3.8 },
    { ocid: 'mason.edu', totalLoansSupplied: 72000, averageApy: 4.4 },
];

const columns: ColumnDef<any>[] = [
    {
        id: 'rank',
        header: 'Rank',
        cell: ({ row }) => {
            const rank = row.index + 1; // Correctly calculate the rank based on index

            if (rank <= 3) {
                const color = rank === 1 ? 'gold' : rank === 2 ? 'silver' : '#cd7f32';
                return <Icon as={FaMedal} color={color} />;
            } else if (rank === 16) {
                return <Text>...</Text>;
            } else if (rank === 17) {
                return <Text>{row.original.rank}</Text>;
            } else {
                return <Text>{rank}</Text>;
            }
        },
    },
    {
        id: 'ocid',
        header: 'OCID',
        cell: ({ row }) => (
            <HStack>
                <Avatar name={row.original.ocid} size="sm" />
                <Text>{row.original.ocid}</Text>
            </HStack>
        ),
    },
    {
        id: 'totalLoansSupplied',
        header: 'Total Loans Supplied',
        cell: ({ getValue }) => (
            <Text>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getValue<number>())}</Text>
        ),
    },
    {
        id: 'averageApy',
        header: 'Average APY (%)',
        cell: ({ getValue }) => (
            <Text>{getValue<number>().toFixed(2)}%</Text>
        ),
    },
];

const Leaderboard = () => {
    const [data, setData] = useState(leaderboardData);

    return (
        <MetricsCard noPadding>
            <HStack justifyContent="space-between" px={4} py={3}>
                <Text fontSize="xl" fontWeight="bold">
                    Highest OC Impact
                </Text>
            </HStack>
            <DataGrid
                columns={columns}
                data={data}
                isSortable
                stickyHeader={true}
                initialState={{ pagination: { pageSize: 5 } }}
                sx={{
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
                    rowsPerPageOptions={[5]} // Only show the option to display 5 rows per page
                    count={data.length}
                    defaultPageSize={5} // Set default page size to 5
                    sx={{ px: '16px', py: '13px' }}
                />
            </DataGrid>
        </MetricsCard>
    );
};

export default Leaderboard;
