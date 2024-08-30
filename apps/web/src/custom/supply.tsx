'use client'

import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'

import {
  Button,
  Card,
  CardBody,
  Grid,
  GridItem,
  HStack,
  Stat,
  StatLabel,
  StatNumber,
  Text,
  useToast,
} from '@chakra-ui/react'
import {
  ActiveFilterValueInput,
  ActiveFiltersList,
  ColumnDef,
  DataGrid,
  DataGridCell,
  FiltersAddButton,
  FiltersProvider,
  getDataGridFilter,
} from '@saas-ui-pro/react'
import { DataGridPagination, Page, PageBody, Toolbar } from '@saas-ui-pro/react'
import { Sparkline } from '@saas-ui/charts'
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers/react'
import { ethers } from 'ethers'
import { BrowserProvider, Contract } from 'ethers'

import oleABI from '../../../../contracts/oleprotocolabi.json'
import { NavBar } from '../features/common/components/navbar'
import { MetricsCard } from '../features/organizations/components/metrics/metrics-card'

const contractAddress = '0x622d6ddad0298042F3F671A34990bc7dDE47ea4B'
const USDTAddress = '0xF79E7D0C6B73C277553C6fAC7277Fc0362953Ad7'
const USDTAbi = [
  'function approve(address spender, uint256 amount) public returns (bool)',
  'function balanceOf(address) view returns (uint)',
]

const currencyFormatter = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value)
}

interface LoanData {
  id: number
  borrower: string
  borrowerOCID: string
  amount: bigint
  collateral: bigint
  duration: number
  apy: number
  reason: string
}

const CurrencyCell: DataGridCell<LoanData> = ({ getValue }) => {
  const value = getValue<ethers.BigNumberish>()
  return (
    <Text>{currencyFormatter(Number(ethers.formatUnits(value, 6)))} USDT</Text>
  )
}

const CollateralCell: DataGridCell<LoanData> = ({ getValue }) => {
  const value = getValue<ethers.BigNumberish>()
  return <Text>{ethers.formatUnits(value, 6)} EDU</Text>
}

const FundScholarButton: DataGridCell<LoanData> = ({ row }) => {
  const { address, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()
  const toast = useToast()

  const handleFundScholar = async (loanData: LoanData) => {
    if (!isConnected || !walletProvider) {
      toast({
        title: 'Error',
        description: 'Wallet not connected. Please connect your wallet.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
      return
    }

    try {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()

      const usdtContract = new Contract(USDTAddress, USDTAbi, signer)
      const oleContract = new Contract(contractAddress, oleABI, signer)

      // Approve USDT transfer
      const approveTx = await usdtContract.approve(
        contractAddress,
        loanData.amount,
      )
      await approveTx.wait()

      // Supply the loan
      const supplyTx = await oleContract.supplyLoan(1, 'arihaan.edu')
      await supplyTx.wait()

      toast({
        title: 'Success',
        description: 'Loan supplied successfully!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      })

      // Refresh available loans
      //fetchAvailableLoans()
    } catch (error) {
      console.error('Error supplying loan:', error)
      toast({
        title: 'Error',
        description: 'Failed to supply loan. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }

  return (
    <Button colorScheme="blue" onClick={() => handleFundScholar(row.original)}>
      Fund Scholar
    </Button>
  )
}

const columns: ColumnDef<LoanData>[] = [
  {
    id: 'amount',
    header: 'Loan Amount',
    cell: CurrencyCell,
    meta: {
      isNumeric: true,
    },
    filterFn: getDataGridFilter('number'),
  },
  {
    id: 'collateral',
    header: 'Collateral Offered',
    cell: CollateralCell,
    filterFn: getDataGridFilter('number'),
  },
  {
    id: 'apy',
    header: 'APY (%)',
    meta: {
      isNumeric: true,
    },
    cell: ({ getValue }) => <Text>{Number(getValue<bigint>()) / 100}%</Text>,
    filterFn: getDataGridFilter('number'),
  },
  {
    id: 'reason',
    header: 'Purpose of Loan',
    filterFn: getDataGridFilter('string'),
  },
  {
    id: 'duration',
    header: 'Duration (days)',
    cell: ({ getValue }) => <Text>{Number(getValue<bigint>())}</Text>,
    filterFn: getDataGridFilter('number'),
  },
  {
    id: 'borrowerOCID',
    header: 'Borrower',
    filterFn: getDataGridFilter('string'),
  },
  {
    id: 'fundScholar',
    header: '',
    cell: FundScholarButton,
    meta: {
      isNumeric: false,
    },
  },
]

export function RequestedLoansPage() {
  const [availableLoans, setAvailableLoans] = useState<LoanData[]>([])
  const toast = useToast()
  const gridRef = useRef<DataGrid<LoanData>>(null)

  const { isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const fetchAvailableLoans = useCallback(async () => {
    if (!isConnected || !walletProvider) return

    try {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()
      const contractInstance = new Contract(contractAddress, oleABI, signer)

      const loans = await contractInstance.getAvailableLoans()
      console.log(loans)
      setAvailableLoans(loans)
    } catch (error) {
      console.error('Failed to fetch available loans:', error)
      toast({
        title: 'Error',
        description: 'Failed to fetch available loans. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      })
    }
  }, [isConnected, walletProvider, toast])

  useEffect(() => {
    fetchAvailableLoans()
  }, [fetchAvailableLoans])

  const filters = React.useMemo(
    () => [
      {
        id: 'amount',
        label: 'Loan Amount',
        type: 'number',
        operators: ['lessThan', 'moreThan'],
        defaultOperator: 'lessThan',
      },
      {
        id: 'collateral',
        label: 'Collateral',
        type: 'number',
        operators: ['lessThan', 'moreThan'],
        defaultOperator: 'moreThan',
      },
      {
        id: 'apy',
        label: 'APY (%)',
        type: 'number',
        operators: ['lessThan', 'moreThan'],
        defaultOperator: 'moreThan',
      },
      {
        id: 'reason',
        label: 'Purpose of Loan',
        type: 'string',
      },
      {
        id: 'duration',
        label: 'Duration (days)',
        type: 'number',
        operators: ['lessThan', 'moreThan'],
        defaultOperator: 'lessThan',
      },
    ],
    [],
  )

  const onFilter = React.useCallback((filters) => {
    if (gridRef.current) {
      gridRef.current.setColumnFilters(
        filters.map((filter) => {
          return {
            id: filter.id,
            value: {
              value: filter.value,
              operator: filter.operator || 'is',
            },
          }
        }),
      )
    }
  }, [])

  return (
    <Page>
      <PageBody contentWidth="container.2xl" py={8} px={8}>
        <NavBar />
        <Grid
          templateColumns={['repeat(1, 1fr)', null, null, 'repeat(3, 1fr)']}
          gap={8}
        >
          <GridItem>
            <Card>
              <CardBody>
                <Stat>
                  <StatLabel>Loans Requested</StatLabel>
                  <StatNumber>{currencyFormatter(100000)}</StatNumber>
                  <Sparkline data={[]} height="60px" mx="-4" />
                </Stat>
              </CardBody>
            </Card>
          </GridItem>

          <GridItem colSpan={{ base: 1, lg: 3 }}>
            <MetricsCard noPadding>
              <FiltersProvider filters={filters} onChange={onFilter}>
                <HStack justifyContent="space-between" px={4} py={3}>
                  <Text fontSize="xl" fontWeight="bold">
                    Available Loans
                  </Text>
                  <Toolbar>
                    <FiltersAddButton />
                  </Toolbar>
                </HStack>
                <ActiveFiltersList />
                <DataGrid<LoanData>
                  columns={columns}
                  data={availableLoans}
                  isSortable
                  stickyHeader={true}
                  instanceRef={gridRef}
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
                    rowsPerPageOptions={[5, 10, 15]}
                    count={availableLoans.length}
                    defaultPageSize={10}
                    sx={{ px: '16px', py: '13px' }}
                  />
                </DataGrid>
              </FiltersProvider>
            </MetricsCard>
          </GridItem>
        </Grid>
      </PageBody>
    </Page>
  )
}

export default RequestedLoansPage
