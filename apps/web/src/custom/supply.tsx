// 'use client'
// import * as React from 'react'
// import {
//     Card,
//     Grid,
//     GridItem,
//     Text,
//     Button,
//     Spacer,
//     HStack,
//     CardBody,
//     Stat,
//     StatLabel,
//     StatNumber,
// } from '@chakra-ui/react'
// import { Sparkline } from '@saas-ui/charts'
// import { ColumnDef, DataGrid, DataGridCell, FiltersProvider, FiltersAddButton, ActiveFiltersList, ActiveFilterValueInput, getDataGridFilter } from '@saas-ui-pro/react'
// import { MetricsCard } from '../features/organizations/components/metrics/metrics-card'
// import {
//     Page,
//     PageBody,
//     PageHeader,
//     Toolbar,
//     DataGridPagination
// } from '@saas-ui-pro/react'
// import LoanDetailsModal from './loan-details-modal';
// import { useEffect, useState } from 'react';
// const currencyFormatter = (value) => {
//     return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//     }).format(value)
// }
// const numberFormatter = (value: number) => {
//     return new Intl.NumberFormat('en-US').format(value);
// }
// const loansRequestedData = [
//     { date: 'Jan 1', value: 2000 },
//     { date: 'Jan 8', value: 2500 },
//     { date: 'Jan 15', value: 2300 },
//     { date: 'Jan 22', value: 2700 },
//     { date: 'Jan 29', value: 4800 },
//     { date: 'Feb 5', value: 1000 },
//     { date: 'Feb 12', value: 4200 },
//     { date: 'Feb 19', value: 3400 },
//     { date: 'Feb 26', value: 2600 },
//     { date: 'Mar 5', value: 2800 },
//     { date: 'Mar 12', value: 2900 },
//     { date: 'Mar 19', value: 4100 },
//     { date: 'Mar 26', value: 3300 },
//     { date: 'Apr 2', value: 3400 },
//     { date: 'Apr 9', value: 2600 },
//     { date: 'Apr 16', value: 3700 },
//     { date: 'Apr 23', value: 5900 },
//     { date: 'Apr 30', value: 5100 },
//     { date: 'May 7', value: 6300 },
//     { date: 'May 14', value: 6500 },
//     { date: 'May 21', value: 6700 },
//     { date: 'May 28', value: 6900 },
//     { date: 'Jun 4', value: 7100 },
//     { date: 'Jun 11', value: 7300 },
//     { date: 'Jun 18', value: 8500 },
//     { date: 'Jun 25', value: 8700 },
// ]
// const generateSuppliedData = () => {
//     return Array.from({ length: 20 }, (_, i) => ({
//         date: `Week ${i + 1}`,
//         value: Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000,
//     }))
// }
// const suppliedData = generateSuppliedData()
// const requestedData = suppliedData.map(item => ({
//     date: item.date,
//     value: Math.round(item.value * 1.44),
// }))
// const scholarsCreatedData = loansRequestedData.reduce((acc, item, index) => {
//     const previousValue = acc[index - 1]?.value || 300
//     const increment = Math.random() * (1.5 - 0.85) + 0.85
//     const newValue = Math.floor(previousValue * increment)
//     acc.push({ date: item.date, value: newValue })
//     return acc
// }, [] as { date: string, value: number }[])
// // Mock data for the table
// const names = [
//     'dany', 'alex', 'mike', 'jane', 'sara', 'chris', 'emma', 'noah', 'olivia', 'liam',
//     'zoe', 'lucas', 'mia', 'mason', 'sophia', 'ben', 'ella', 'jacob', 'ava', 'james',
//     'isabella', 'will', 'charlotte', 'henry'
// ];
// const loanPurposes = [
//     'Higher Education',
//     'Vocational Training',
//     'Online Learning',
//     'Study Abroad Programs',
//     'Continuing Education',
//     'Professional Certifications',
//     'STEM Programs',
//     'Arts and Humanities',
//     'Technical Schools',
//     'Language Learning',
//     'Research and Development',
//     'Educational Workshops',
//     'Internships and Apprenticeships',
//     'Educational Startups',
//     'E-learning Platforms'
// ];
// interface LoanData {
//     ocid: string
//     loanAmount: number
//     collateral: string
//     apy: number
//     purpose: string
//     duration: string
// }
// const mockData: LoanData[] = Array.from({ length: 23 }, (_, index) => ({
//     ocid: `${names[index % names.length]}.edu`,
//     loanAmount: Math.floor(Math.random() * 50000) + 1000,
//     collateral: ['Real Estate', 'Art', 'Car', 'Jewelry', 'Cryptocurrency'][Math.floor(Math.random() * 5)],
//     apy: parseFloat((Math.random() * (10 - 2) + 2).toFixed(2)),
//     purpose: loanPurposes[Math.floor(Math.random() * loanPurposes.length)],
//     duration: ['1 year', '2 years', '3 years', '4 years'][Math.floor(Math.random() * 4)],
// }));
// const CurrencyCell: DataGridCell<LoanData> = ({ getValue }) => (
//     <Text>
//         {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getValue<number>())}
//     </Text>
// )
// const FundScholarButton: DataGridCell<LoanData> = ({ row }) => (
//     <Button colorScheme="blue" onClick={() => handleFundScholar(row.original)}>
//         Fund Scholar
//     </Button>
// );
// const handleFundScholar = (loanData: LoanData) => {
//     console.log("Funding scholar with OCID:", loanData.ocid);
// };
// const columns: ColumnDef<LoanData>[] = [
//     {
//         id: 'loanAmount',
//         header: 'Loan Amount',
//         cell: CurrencyCell,
//         meta: {
//             isNumeric: true,
//         },
//         filterFn: getDataGridFilter('number'),
//     },
//     {
//         id: 'collateral',
//         header: 'Collateral Offered',
//         filterFn: getDataGridFilter('string'),
//     },
//     {
//         id: 'apy',
//         header: 'APY (%)',
//         meta: {
//             isNumeric: true,
//         },
//         cell: ({ getValue }) => <Text>{getValue<number>()}%</Text>,
//         filterFn: getDataGridFilter('number'),
//     },
//     {
//         id: 'purpose',
//         header: 'Purpose of Loan',
//         filterFn: getDataGridFilter('string'),
//     },
//     {
//         id: 'duration',
//         header: 'Duration',
//         filterFn: getDataGridFilter('string'),
//     },
//     {
//         id: 'ocid',
//         header: 'OCID',
//         filterFn: getDataGridFilter('string'),
//     },
//     {
//         id: 'fundScholar',
//         header: '',
//         cell: FundScholarButton,
//         meta: {
//             isNumeric: false,
//         },
//     },
// ]
// const customEaseOut = (t) => {
//     if (t < 0.5) {
//         return 4 * t * t * t; // Quick start
//     } else {
//         const f = (t - 1);
//         return 1 + f * f * f * f * f; // Very slow end
//     }
// };
// export function RequestedLoansPage() {
//     const [loansRequested, setLoansRequested] = useState(requestedData.reduce((acc, item) => acc + item.value, 0));
//     const [loansSupplied, setLoansSupplied] = useState(suppliedData.reduce((acc, item) => acc + item.value, 0));
//     const [scholarsCreated, setScholarsCreated] = useState(scholarsCreatedData[scholarsCreatedData.length - 1].value);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null);
//     useEffect(() => {
//         const requestedTotal = requestedData.reduce((acc, item) => acc + item.value, 0);
//         const suppliedTotal = suppliedData.reduce((acc, item) => acc + item.value, 0);
//         const scholarsTotal = scholarsCreatedData[scholarsCreatedData.length - 1].value;
//         const duration = 500; // Animation duration in milliseconds
//         const frameRate = 1000 / 60; // 60 FPS
//         const totalFrames = Math.round(duration / frameRate);
//         let currentFrame = 0;
//         const animate = () => {
//             currentFrame++;
//             const progress = customEaseOut(currentFrame / totalFrames);
//             setLoansRequested(Math.floor(requestedTotal * progress));
//             setLoansSupplied(Math.floor(suppliedTotal * progress));
//             setScholarsCreated(Math.floor(scholarsTotal * progress));
//             if (currentFrame < totalFrames) {
//                 requestAnimationFrame(animate);
//             }
//         };
//         animate();
//     }, []);
//     const gridRef = React.useRef<DataGrid<LoanData>>(null);
//     const filters = React.useMemo(
//         () => [
//             {
//                 id: 'loanAmount',
//                 label: 'Loan Amount',
//                 type: 'number',
//                 operators: ['lessThan', 'moreThan'],
//                 defaultOperator: 'lessThan',
//             },
//             {
//                 id: 'collateral',
//                 label: 'Collateral',
//                 type: 'enum',
//                 items: [
//                     { id: 'Real Estate', label: 'Real Estate' },
//                     { id: 'Art', label: 'Art' },
//                     { id: 'Car', label: 'Car' },
//                     { id: 'Jewelry', label: 'Jewelry' },
//                     { id: 'Cryptocurrency', label: 'Cryptocurrency' },
//                 ],
//             },
//             {
//                 id: 'apy',
//                 label: 'APY (%)',
//                 type: 'number',
//                 operators: ['lessThan', 'moreThan'],
//                 defaultOperator: 'moreThan',
//             },
//             {
//                 id: 'purpose',
//                 label: 'Purpose of Loan',
//                 type: 'enum',
//                 items: loanPurposes.map((purpose) => ({ id: purpose, label: purpose })),
//             },
//             {
//                 id: 'duration',
//                 label: 'Duration',
//                 type: 'enum',
//                 items: [
//                     { id: '1 year', label: '1 year' },
//                     { id: '2 years', label: '2 years' },
//                     { id: '3 years', label: '3 years' },
//                     { id: '4 years', label: '4 years' },
//                 ],
//             },
//         ],
//         []
//     );
//     const onFilter = React.useCallback((filters) => {
//         if (gridRef.current) {
//             gridRef.current.setColumnFilters(
//                 filters.map((filter) => {
//                     return {
//                         id: filter.id,
//                         value: {
//                             value: filter.value,
//                             operator: filter.operator || 'is',
//                         },
//                     }
//                 })
//             )
//         }
//     }, [])
//     const onRowClick = (row: LoanData) => {
//         setSelectedLoan(row);
//         setIsModalOpen(true);
//     };
//     const renderValue = React.useCallback((context) => {
//         if (context.id === 'loanAmount' || context.id === 'apy') {
//             return <ActiveFilterValueInput bg='none' />
//         }
//         return context.value?.toLocaleString()
//     }, [])
//     return (
//         <Page>
//             <PageBody contentWidth="container.2xl" py={8} px={8}>
//                 <Grid
//                     templateColumns={['repeat(1, 1fr)', null, null, 'repeat(3, 1fr)']}
//                     gap={8}
//                 >
//                     {/* First row cards */}
//                     <GridItem>
//                         <Card>
//                             <CardBody>
//                                 <Stat>
//                                     <StatLabel>Loans Requested</StatLabel>
//                                     <StatNumber>
//                                         {currencyFormatter(loansRequested)}
//                                     </StatNumber>
//                                     <Sparkline data={requestedData} height="60px" mx="-4" />
//                                 </Stat>
//                             </CardBody>
//                         </Card>
//                     </GridItem>
//                     <GridItem>
//                         <Card>
//                             <CardBody>
//                                 <Stat>
//                                     <StatLabel>Loans Supplied</StatLabel>
//                                     <StatNumber>
//                                         {currencyFormatter(loansSupplied)}
//                                     </StatNumber>
//                                     <Sparkline data={suppliedData} height="60px" mx="-4" />
//                                 </Stat>
//                             </CardBody>
//                         </Card>
//                     </GridItem>
//                     <GridItem>
//                         <Card>
//                             <CardBody>
//                                 <Stat>
//                                     <StatLabel>Scholars Created</StatLabel>
//                                     <StatNumber>
//                                         {numberFormatter(scholarsCreated)}
//                                     </StatNumber>
//                                     <Sparkline data={scholarsCreatedData} height="60px" mx="-4" />
//                                 </Stat>
//                             </CardBody>
//                         </Card>
//                     </GridItem>
//                     {/* Second row - full width table */}
//                     <GridItem colSpan={{ base: 1, lg: 3 }}>
//                         <MetricsCard noPadding>
//                             <FiltersProvider filters={filters} onChange={onFilter}>
//                                 <HStack justifyContent="space-between" px={4} py={3}>
//                                     <Text fontSize="xl" fontWeight="bold">
//                                         Requested Loans
//                                     </Text>
//                                     <Toolbar>
//                                         <FiltersAddButton />
//                                     </Toolbar>
//                                 </HStack>
//                                 <ActiveFiltersList renderValue={renderValue} />
//                                 <DataGrid<LoanData>
//                                     columns={columns}
//                                     data={mockData}
//                                     isSortable
//                                     stickyHeader={true}
//                                     instanceRef={gridRef}
//                                     onRowClick={(row) => onRowClick(row.original)}
//                                     sx={{
//                                         td: {
//                                             justifyContent: 'left !important',
//                                         },
//                                         th: {
//                                             justifyContent: 'left !important', // Also align headers to the left for consistency
//                                         },
//                                         tfoot: {
//                                             display: 'none', // Hides the footer element if it causes space
//                                         },
//                                     }}
//                                 >
//                                     <DataGridPagination
//                                         rowsPerPageOptions={[5, 10, 15]}
//                                         count={mockData.length}
//                                         defaultPageSize={10}
//                                         sx={{ px: '16px', py: '13px' }}
//                                     />
//                                 </DataGrid>
//                             </FiltersProvider>
//                         </MetricsCard>
//                     </GridItem>
//                 </Grid>
//                 {selectedLoan && (
//                     <LoanDetailsModal
//                         isOpen={isModalOpen}
//                         onClose={() => setIsModalOpen(false)}
//                         loanData={selectedLoan}
//                     />
//                 )}
//             </PageBody>
//         </Page>
//     )
// }
// export default RequestedLoansPage
// 'use client'
// import * as React from 'react'
// import { useCallback, useEffect, useRef, useState } from 'react'
// import { NavBar } from '../features/common/components/navbar'
// import {
//   Button,
//   Card,
//   CardBody,
//   Grid,
//   GridItem,
//   HStack,
//   Stat,
//   StatLabel,
//   StatNumber,
//   Text,
//   useToast,
// } from '@chakra-ui/react'
// import {
//   ActiveFilterValueInput,
//   ActiveFiltersList,
//   ColumnDef,
//   DataGrid,
//   DataGridCell,
//   FiltersAddButton,
//   FiltersProvider,
//   getDataGridFilter,
// } from '@saas-ui-pro/react'
// import { DataGridPagination, Page, PageBody, Toolbar } from '@saas-ui-pro/react'
// import { Sparkline } from '@saas-ui/charts'
// import {
//   useWeb3ModalAccount,
//   useWeb3ModalProvider,
// } from '@web3modal/ethers/react'
// import { ethers } from 'ethers'
// import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers'
// import oleABI from '../../../../contracts/oleprotocolabi.json'
// import { MetricsCard } from '../features/organizations/components/metrics/metrics-card'
// import LoanDetailsModal from './loan-details-modal'
// // Contract addresses and ABIs
// const contractAddress = '0xFF10F39F0C24Ce78A52AaA11B447256AE24FeE82'
// const USDTAddress = '0xF79E7D0C6B73C277553C6fAC7277Fc0362953Ad7'
// const USDTAbi = [
//   'function approve(address spender, uint256 amount) public returns (bool)',
//   'function balanceOf(address) view returns (uint)',
// ]
// const currencyFormatter = (value) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(value)
// }
// const numberFormatter = (value: number) => {
//   return new Intl.NumberFormat('en-US').format(value)
// }
// const loansRequestedData = [
//   { date: 'Jan 1', value: 2000 },
//   { date: 'Jan 8', value: 2500 },
//   { date: 'Jan 15', value: 2300 },
//   { date: 'Jan 22', value: 2700 },
//   { date: 'Jan 29', value: 4800 },
//   { date: 'Feb 5', value: 1000 },
//   { date: 'Feb 12', value: 4200 },
//   { date: 'Feb 19', value: 3400 },
//   { date: 'Feb 26', value: 2600 },
//   { date: 'Mar 5', value: 2800 },
//   { date: 'Mar 12', value: 2900 },
//   { date: 'Mar 19', value: 4100 },
//   { date: 'Mar 26', value: 3300 },
//   { date: 'Apr 2', value: 3400 },
//   { date: 'Apr 9', value: 2600 },
//   { date: 'Apr 16', value: 3700 },
//   { date: 'Apr 23', value: 5900 },
//   { date: 'Apr 30', value: 5100 },
//   { date: 'May 7', value: 6300 },
//   { date: 'May 14', value: 6500 },
//   { date: 'May 21', value: 6700 },
//   { date: 'May 28', value: 6900 },
//   { date: 'Jun 4', value: 7100 },
//   { date: 'Jun 11', value: 7300 },
//   { date: 'Jun 18', value: 8500 },
//   { date: 'Jun 25', value: 8700 },
// ]
// const generateSuppliedData = () => {
//   return Array.from({ length: 20 }, (_, i) => ({
//     date: `Week ${i + 1}`,
//     value: Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000,
//   }))
// }
// const suppliedData = generateSuppliedData()
// const requestedData = suppliedData.map((item) => ({
//   date: item.date,
//   value: Math.round(item.value * 1.44),
// }))
// const scholarsCreatedData = loansRequestedData.reduce(
//   (acc, item, index) => {
//     const previousValue = acc[index - 1]?.value || 300
//     const increment = Math.random() * (1.5 - 0.85) + 0.85
//     const newValue = Math.floor(previousValue * increment)
//     acc.push({ date: item.date, value: newValue })
//     return acc
//   },
//   [] as { date: string; value: number }[],
// )
// interface LoanData {
//   id: number
//   borrower: string
//   borrowerOCID: string
//   amount: bigint
//   collateral: bigint
//   duration: number
//   apy: number
//   reason: string
// }
// const CurrencyCell: DataGridCell<LoanData> = ({ getValue }) => (
//   <Text>
//     {currencyFormatter(ethers.formatUnits(getValue<ethers.BigNumberish>(), 6))}
//   </Text>
// )
// const CollateralCell: DataGridCell<LoanData> = ({ getValue }) => (
//   <Text>{ethers.formatEther(getValue<ethers.BigNumberish>())} EDU</Text>
// )
// const FundScholarButton: DataGridCell<LoanData> = ({ row }) => (
//   <Button colorScheme="blue" onClick={() => handleFundScholar(row.original)}>
//     Fund Scholar
//   </Button>
// )
// const handleFundScholar = async (loanData: LoanData) => {
//   // This function will be implemented later
//   console.log('Funding scholar with ID:', loanData.id)
// }
// const columns: ColumnDef<LoanData>[] = [
// {
//     id: 'amount',
//     header: 'Loan Amount',
//     cell: ({ getValue }) => <CurrencyCell value={Number(getValue<BigInt>())} />, // Convert BigInt to Number
//     meta: {
//     isNumeric: true,
//     },
//     filterFn: getDataGridFilter('number'),
// },
// {
//     id: 'collateral',
//     header: 'Collateral Offered',
//     cell: ({ getValue }) => <CollateralCell value={Number(getValue<BigInt>())} />, // Convert BigInt to Number
//     filterFn: getDataGridFilter('number'),
// },
// {
//     id: 'apy',
//     header: 'APY (%)',
//     meta: {
//     isNumeric: true,
//     },
//     cell: ({ getValue }) => <Text>{Number(getValue<BigInt>()) / 100}%</Text>, // Convert BigInt to Number
//     filterFn: getDataGridFilter('number'),
// },
// {
//     id: 'reason',
//     header: 'Purpose of Loan',
//     filterFn: getDataGridFilter('string'),
// },
// {
//     id: 'duration',
//     header: 'Duration (days)',
//     cell: ({ getValue }) => <Text>{Number(getValue<BigInt>())}</Text>, // Convert BigInt to Number
//     filterFn: getDataGridFilter('number'),
// },
// {
//     id: 'borrowerOCID',
//     header: 'Borrower',
//     filterFn: getDataGridFilter('string'),
// },
// {
//     id: 'fundScholar',
//     header: '',
//     cell: FundScholarButton,
//     meta: {
//     isNumeric: false,
//     },
// },
// ]
// export function RequestedLoansPage() {
//   const [availableLoans, setAvailableLoans] = useState<LoanData[]>([])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null)
//   const toast = useToast()
//   const gridRef = useRef<DataGrid<LoanData>>(null)
//   const { address, isConnected } = useWeb3ModalAccount()
//   const { walletProvider } = useWeb3ModalProvider()
//   const fetchAvailableLoans = useCallback(async () => {
//     if (!isConnected || !walletProvider) return
//     try {
//       const ethersProvider = new BrowserProvider(walletProvider)
//       const signer = await ethersProvider.getSigner()
//       const contractInstance = new Contract(contractAddress, oleABI, signer)
//       const loans = await contractInstance.getAvailableLoans()
//       console.log(loans);
//       console.log('here');
//       setAvailableLoans(loans)
//     } catch (error) {
//       console.error('Failed to fetch available loans:', error)
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch available loans. Please try again.',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       })
//     }
//   }, [isConnected, walletProvider, toast])
//   useEffect(() => {
//     fetchAvailableLoans()
//   }, [fetchAvailableLoans])
// //   const handleFundScholar = async (loanData: LoanData) => {
// //     if (!isConnected || !walletProvider) {
// //       toast({
// //         title: 'Error',
// //         description: 'Wallet not connected. Please connect your wallet.',
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       })
// //       return
// //     }
// //     try {
// //       const ethersProvider = new BrowserProvider(walletProvider)
// //       const signer = await ethersProvider.getSigner()
// //       const usdtContract = new Contract(USDTAddress, USDTAbi, signer)
// //       const oleContract = new Contract(contractAddress, oleABI, signer)
// //       // Approve USDT transfer
// //       const approveTx = await usdtContract.approve(
// //         contractAddress,
// //         loanData.amount,
// //       )
// //       await approveTx.wait()
// //       // Supply the loan
// //       const supplyTx = await oleContract.supplyLoan(loanData.id)
// //       await supplyTx.wait()
// //       toast({
// //         title: 'Success',
// //         description: 'Loan supplied successfully!',
// //         status: 'success',
// //         duration: 5000,
// //         isClosable: true,
// //       })
// //       // Refresh available loans
// //       fetchAvailableLoans()
// //     } catch (error) {
// //       console.error('Error supplying loan:', error)
// //       toast({
// //         title: 'Error',
// //         description: 'Failed to supply loan. Please try again.',
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       })
// //     }
// //   }
//   const filters = React.useMemo(
//     () => [
//       {
//         id: 'amount',
//         label: 'Loan Amount',
//         type: 'number',
//         operators: ['lessThan', 'moreThan'],
//         defaultOperator: 'lessThan',
//       },
//       {
//         id: 'collateral',
//         label: 'Collateral',
//         type: 'number',
//         operators: ['lessThan', 'moreThan'],
//         defaultOperator: 'moreThan',
//       },
//       {
//         id: 'apy',
//         label: 'APY (%)',
//         type: 'number',
//         operators: ['lessThan', 'moreThan'],
//         defaultOperator: 'moreThan',
//       },
//       {
//         id: 'reason',
//         label: 'Purpose of Loan',
//         type: 'string',
//       },
//       {
//         id: 'duration',
//         label: 'Duration (days)',
//         type: 'number',
//         operators: ['lessThan', 'moreThan'],
//         defaultOperator: 'lessThan',
//       },
//     ],
//     [],
//   )
//   const onFilter = React.useCallback((filters) => {
//     if (gridRef.current) {
//       gridRef.current.setColumnFilters(
//         filters.map((filter) => {
//           return {
//             id: filter.id,
//             value: {
//               value: filter.value,
//               operator: filter.operator || 'is',
//             },
//           }
//         }),
//       )
//     }
//   }, [])
//   const onRowClick = (row: LoanData) => {
//     setSelectedLoan(row)
//     setIsModalOpen(true)
//   }
//   const renderValue = React.useCallback((context) => {
//     if (['amount', 'collateral', 'apy', 'duration'].includes(context.id)) {
//       return <ActiveFilterValueInput bg="none" />
//     }
//     return context.value?.toLocaleString()
//   }, [])
//   return (
//     <Page>
//         <NavBar/>
//       <PageBody contentWidth="container.2xl" py={8} px={8}>
//         <Grid
//           templateColumns={['repeat(1, 1fr)', null, null, 'repeat(3, 1fr)']}
//           gap={8}
//         >
//           {/* First row cards */}
//           <GridItem>
//             <Card>
//               <CardBody>
//                 <Stat>
//                   <StatLabel>Loans Requested</StatLabel>
//                   <StatNumber>{currencyFormatter(100000)}</StatNumber>
//                   <Sparkline data={requestedData} height="60px" mx="-4" />
//                 </Stat>
//               </CardBody>
//             </Card>
//           </GridItem>
//           <GridItem colSpan={{ base: 1, lg: 3 }}>
//             <MetricsCard noPadding>
//               <FiltersProvider filters={filters} onChange={onFilter}>
//                 <HStack justifyContent="space-between" px={4} py={3}>
//                   <Text fontSize="xl" fontWeight="bold">
//                     Available Loans
//                   </Text>
//                   <Toolbar>
//                     <FiltersAddButton />
//                   </Toolbar>
//                 </HStack>
//                 <ActiveFiltersList renderValue={renderValue} />
//                 <DataGrid<LoanData>
//                   columns={columns}
//                   data={availableLoans}
//                   isSortable
//                   stickyHeader={true}
//                   instanceRef={gridRef}
//                   onRowClick={(row) => onRowClick(row.original)}
//                   sx={{
//                     td: {
//                       justifyContent: 'left !important',
//                     },
//                     th: {
//                       justifyContent: 'left !important',
//                     },
//                     tfoot: {
//                       display: 'none',
//                     },
//                   }}
//                 >
//                   <DataGridPagination
//                     rowsPerPageOptions={[5, 10, 15]}
//                     count={availableLoans.length}
//                     defaultPageSize={10}
//                     sx={{ px: '16px', py: '13px' }}
//                   />
//                 </DataGrid>
//               </FiltersProvider>
//             </MetricsCard>
//           </GridItem>
//         </Grid>
//         {selectedLoan && (
//           <LoanDetailsModal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             loanData={selectedLoan}
//           />
//         )}
//       </PageBody>
//     </Page>
//   )
// }
// export default RequestedLoansPage
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

// 'use client'
// import * as React from 'react'
// import {
//     Card,
//     Grid,
//     GridItem,
//     Text,
//     Button,
//     Spacer,
//     HStack,
//     CardBody,
//     Stat,
//     StatLabel,
//     StatNumber,
// } from '@chakra-ui/react'
// import { Sparkline } from '@saas-ui/charts'
// import { ColumnDef, DataGrid, DataGridCell, FiltersProvider, FiltersAddButton, ActiveFiltersList, ActiveFilterValueInput, getDataGridFilter } from '@saas-ui-pro/react'
// import { MetricsCard } from '../features/organizations/components/metrics/metrics-card'
// import {
//     Page,
//     PageBody,
//     PageHeader,
//     Toolbar,
//     DataGridPagination
// } from '@saas-ui-pro/react'
// import LoanDetailsModal from './loan-details-modal';
// import { useEffect, useState } from 'react';
// const currencyFormatter = (value) => {
//     return new Intl.NumberFormat('en-US', {
//         style: 'currency',
//         currency: 'USD',
//     }).format(value)
// }
// const numberFormatter = (value: number) => {
//     return new Intl.NumberFormat('en-US').format(value);
// }
// const loansRequestedData = [
//     { date: 'Jan 1', value: 2000 },
//     { date: 'Jan 8', value: 2500 },
//     { date: 'Jan 15', value: 2300 },
//     { date: 'Jan 22', value: 2700 },
//     { date: 'Jan 29', value: 4800 },
//     { date: 'Feb 5', value: 1000 },
//     { date: 'Feb 12', value: 4200 },
//     { date: 'Feb 19', value: 3400 },
//     { date: 'Feb 26', value: 2600 },
//     { date: 'Mar 5', value: 2800 },
//     { date: 'Mar 12', value: 2900 },
//     { date: 'Mar 19', value: 4100 },
//     { date: 'Mar 26', value: 3300 },
//     { date: 'Apr 2', value: 3400 },
//     { date: 'Apr 9', value: 2600 },
//     { date: 'Apr 16', value: 3700 },
//     { date: 'Apr 23', value: 5900 },
//     { date: 'Apr 30', value: 5100 },
//     { date: 'May 7', value: 6300 },
//     { date: 'May 14', value: 6500 },
//     { date: 'May 21', value: 6700 },
//     { date: 'May 28', value: 6900 },
//     { date: 'Jun 4', value: 7100 },
//     { date: 'Jun 11', value: 7300 },
//     { date: 'Jun 18', value: 8500 },
//     { date: 'Jun 25', value: 8700 },
// ]
// const generateSuppliedData = () => {
//     return Array.from({ length: 20 }, (_, i) => ({
//         date: `Week ${i + 1}`,
//         value: Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000,
//     }))
// }
// const suppliedData = generateSuppliedData()
// const requestedData = suppliedData.map(item => ({
//     date: item.date,
//     value: Math.round(item.value * 1.44),
// }))
// const scholarsCreatedData = loansRequestedData.reduce((acc, item, index) => {
//     const previousValue = acc[index - 1]?.value || 300
//     const increment = Math.random() * (1.5 - 0.85) + 0.85
//     const newValue = Math.floor(previousValue * increment)
//     acc.push({ date: item.date, value: newValue })
//     return acc
// }, [] as { date: string, value: number }[])
// // Mock data for the table
// const names = [
//     'dany', 'alex', 'mike', 'jane', 'sara', 'chris', 'emma', 'noah', 'olivia', 'liam',
//     'zoe', 'lucas', 'mia', 'mason', 'sophia', 'ben', 'ella', 'jacob', 'ava', 'james',
//     'isabella', 'will', 'charlotte', 'henry'
// ];
// const loanPurposes = [
//     'Higher Education',
//     'Vocational Training',
//     'Online Learning',
//     'Study Abroad Programs',
//     'Continuing Education',
//     'Professional Certifications',
//     'STEM Programs',
//     'Arts and Humanities',
//     'Technical Schools',
//     'Language Learning',
//     'Research and Development',
//     'Educational Workshops',
//     'Internships and Apprenticeships',
//     'Educational Startups',
//     'E-learning Platforms'
// ];
// interface LoanData {
//     ocid: string
//     loanAmount: number
//     collateral: string
//     apy: number
//     purpose: string
//     duration: string
// }
// const mockData: LoanData[] = Array.from({ length: 23 }, (_, index) => ({
//     ocid: `${names[index % names.length]}.edu`,
//     loanAmount: Math.floor(Math.random() * 50000) + 1000,
//     collateral: ['Real Estate', 'Art', 'Car', 'Jewelry', 'Cryptocurrency'][Math.floor(Math.random() * 5)],
//     apy: parseFloat((Math.random() * (10 - 2) + 2).toFixed(2)),
//     purpose: loanPurposes[Math.floor(Math.random() * loanPurposes.length)],
//     duration: ['1 year', '2 years', '3 years', '4 years'][Math.floor(Math.random() * 4)],
// }));
// const CurrencyCell: DataGridCell<LoanData> = ({ getValue }) => (
//     <Text>
//         {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(getValue<number>())}
//     </Text>
// )
// const FundScholarButton: DataGridCell<LoanData> = ({ row }) => (
//     <Button colorScheme="blue" onClick={() => handleFundScholar(row.original)}>
//         Fund Scholar
//     </Button>
// );
// const handleFundScholar = (loanData: LoanData) => {
//     console.log("Funding scholar with OCID:", loanData.ocid);
// };
// const columns: ColumnDef<LoanData>[] = [
//     {
//         id: 'loanAmount',
//         header: 'Loan Amount',
//         cell: CurrencyCell,
//         meta: {
//             isNumeric: true,
//         },
//         filterFn: getDataGridFilter('number'),
//     },
//     {
//         id: 'collateral',
//         header: 'Collateral Offered',
//         filterFn: getDataGridFilter('string'),
//     },
//     {
//         id: 'apy',
//         header: 'APY (%)',
//         meta: {
//             isNumeric: true,
//         },
//         cell: ({ getValue }) => <Text>{getValue<number>()}%</Text>,
//         filterFn: getDataGridFilter('number'),
//     },
//     {
//         id: 'purpose',
//         header: 'Purpose of Loan',
//         filterFn: getDataGridFilter('string'),
//     },
//     {
//         id: 'duration',
//         header: 'Duration',
//         filterFn: getDataGridFilter('string'),
//     },
//     {
//         id: 'ocid',
//         header: 'OCID',
//         filterFn: getDataGridFilter('string'),
//     },
//     {
//         id: 'fundScholar',
//         header: '',
//         cell: FundScholarButton,
//         meta: {
//             isNumeric: false,
//         },
//     },
// ]
// const customEaseOut = (t) => {
//     if (t < 0.5) {
//         return 4 * t * t * t; // Quick start
//     } else {
//         const f = (t - 1);
//         return 1 + f * f * f * f * f; // Very slow end
//     }
// };
// export function RequestedLoansPage() {
//     const [loansRequested, setLoansRequested] = useState(requestedData.reduce((acc, item) => acc + item.value, 0));
//     const [loansSupplied, setLoansSupplied] = useState(suppliedData.reduce((acc, item) => acc + item.value, 0));
//     const [scholarsCreated, setScholarsCreated] = useState(scholarsCreatedData[scholarsCreatedData.length - 1].value);
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null);
//     useEffect(() => {
//         const requestedTotal = requestedData.reduce((acc, item) => acc + item.value, 0);
//         const suppliedTotal = suppliedData.reduce((acc, item) => acc + item.value, 0);
//         const scholarsTotal = scholarsCreatedData[scholarsCreatedData.length - 1].value;
//         const duration = 500; // Animation duration in milliseconds
//         const frameRate = 1000 / 60; // 60 FPS
//         const totalFrames = Math.round(duration / frameRate);
//         let currentFrame = 0;
//         const animate = () => {
//             currentFrame++;
//             const progress = customEaseOut(currentFrame / totalFrames);
//             setLoansRequested(Math.floor(requestedTotal * progress));
//             setLoansSupplied(Math.floor(suppliedTotal * progress));
//             setScholarsCreated(Math.floor(scholarsTotal * progress));
//             if (currentFrame < totalFrames) {
//                 requestAnimationFrame(animate);
//             }
//         };
//         animate();
//     }, []);
//     const gridRef = React.useRef<DataGrid<LoanData>>(null);
//     const filters = React.useMemo(
//         () => [
//             {
//                 id: 'loanAmount',
//                 label: 'Loan Amount',
//                 type: 'number',
//                 operators: ['lessThan', 'moreThan'],
//                 defaultOperator: 'lessThan',
//             },
//             {
//                 id: 'collateral',
//                 label: 'Collateral',
//                 type: 'enum',
//                 items: [
//                     { id: 'Real Estate', label: 'Real Estate' },
//                     { id: 'Art', label: 'Art' },
//                     { id: 'Car', label: 'Car' },
//                     { id: 'Jewelry', label: 'Jewelry' },
//                     { id: 'Cryptocurrency', label: 'Cryptocurrency' },
//                 ],
//             },
//             {
//                 id: 'apy',
//                 label: 'APY (%)',
//                 type: 'number',
//                 operators: ['lessThan', 'moreThan'],
//                 defaultOperator: 'moreThan',
//             },
//             {
//                 id: 'purpose',
//                 label: 'Purpose of Loan',
//                 type: 'enum',
//                 items: loanPurposes.map((purpose) => ({ id: purpose, label: purpose })),
//             },
//             {
//                 id: 'duration',
//                 label: 'Duration',
//                 type: 'enum',
//                 items: [
//                     { id: '1 year', label: '1 year' },
//                     { id: '2 years', label: '2 years' },
//                     { id: '3 years', label: '3 years' },
//                     { id: '4 years', label: '4 years' },
//                 ],
//             },
//         ],
//         []
//     );
//     const onFilter = React.useCallback((filters) => {
//         if (gridRef.current) {
//             gridRef.current.setColumnFilters(
//                 filters.map((filter) => {
//                     return {
//                         id: filter.id,
//                         value: {
//                             value: filter.value,
//                             operator: filter.operator || 'is',
//                         },
//                     }
//                 })
//             )
//         }
//     }, [])
//     const onRowClick = (row: LoanData) => {
//         setSelectedLoan(row);
//         setIsModalOpen(true);
//     };
//     const renderValue = React.useCallback((context) => {
//         if (context.id === 'loanAmount' || context.id === 'apy') {
//             return <ActiveFilterValueInput bg='none' />
//         }
//         return context.value?.toLocaleString()
//     }, [])
//     return (
//         <Page>
//             <PageBody contentWidth="container.2xl" py={8} px={8}>
//                 <Grid
//                     templateColumns={['repeat(1, 1fr)', null, null, 'repeat(3, 1fr)']}
//                     gap={8}
//                 >
//                     {/* First row cards */}
//                     <GridItem>
//                         <Card>
//                             <CardBody>
//                                 <Stat>
//                                     <StatLabel>Loans Requested</StatLabel>
//                                     <StatNumber>
//                                         {currencyFormatter(loansRequested)}
//                                     </StatNumber>
//                                     <Sparkline data={requestedData} height="60px" mx="-4" />
//                                 </Stat>
//                             </CardBody>
//                         </Card>
//                     </GridItem>
//                     <GridItem>
//                         <Card>
//                             <CardBody>
//                                 <Stat>
//                                     <StatLabel>Loans Supplied</StatLabel>
//                                     <StatNumber>
//                                         {currencyFormatter(loansSupplied)}
//                                     </StatNumber>
//                                     <Sparkline data={suppliedData} height="60px" mx="-4" />
//                                 </Stat>
//                             </CardBody>
//                         </Card>
//                     </GridItem>
//                     <GridItem>
//                         <Card>
//                             <CardBody>
//                                 <Stat>
//                                     <StatLabel>Scholars Created</StatLabel>
//                                     <StatNumber>
//                                         {numberFormatter(scholarsCreated)}
//                                     </StatNumber>
//                                     <Sparkline data={scholarsCreatedData} height="60px" mx="-4" />
//                                 </Stat>
//                             </CardBody>
//                         </Card>
//                     </GridItem>
//                     {/* Second row - full width table */}
//                     <GridItem colSpan={{ base: 1, lg: 3 }}>
//                         <MetricsCard noPadding>
//                             <FiltersProvider filters={filters} onChange={onFilter}>
//                                 <HStack justifyContent="space-between" px={4} py={3}>
//                                     <Text fontSize="xl" fontWeight="bold">
//                                         Requested Loans
//                                     </Text>
//                                     <Toolbar>
//                                         <FiltersAddButton />
//                                     </Toolbar>
//                                 </HStack>
//                                 <ActiveFiltersList renderValue={renderValue} />
//                                 <DataGrid<LoanData>
//                                     columns={columns}
//                                     data={mockData}
//                                     isSortable
//                                     stickyHeader={true}
//                                     instanceRef={gridRef}
//                                     onRowClick={(row) => onRowClick(row.original)}
//                                     sx={{
//                                         td: {
//                                             justifyContent: 'left !important',
//                                         },
//                                         th: {
//                                             justifyContent: 'left !important', // Also align headers to the left for consistency
//                                         },
//                                         tfoot: {
//                                             display: 'none', // Hides the footer element if it causes space
//                                         },
//                                     }}
//                                 >
//                                     <DataGridPagination
//                                         rowsPerPageOptions={[5, 10, 15]}
//                                         count={mockData.length}
//                                         defaultPageSize={10}
//                                         sx={{ px: '16px', py: '13px' }}
//                                     />
//                                 </DataGrid>
//                             </FiltersProvider>
//                         </MetricsCard>
//                     </GridItem>
//                 </Grid>
//                 {selectedLoan && (
//                     <LoanDetailsModal
//                         isOpen={isModalOpen}
//                         onClose={() => setIsModalOpen(false)}
//                         loanData={selectedLoan}
//                     />
//                 )}
//             </PageBody>
//         </Page>
//     )
// }
// export default RequestedLoansPage
// 'use client'

// import * as React from 'react'
// import { useCallback, useEffect, useRef, useState } from 'react'
// import { NavBar } from '../features/common/components/navbar'

// import {
//   Button,
//   Card,
//   CardBody,
//   Grid,
//   GridItem,
//   HStack,
//   Stat,
//   StatLabel,
//   StatNumber,
//   Text,
//   useToast,
// } from '@chakra-ui/react'

// import {
//   ActiveFilterValueInput,
//   ActiveFiltersList,
//   ColumnDef,
//   DataGrid,
//   DataGridCell,
//   FiltersAddButton,
//   FiltersProvider,
//   getDataGridFilter,
// } from '@saas-ui-pro/react'
// import { DataGridPagination, Page, PageBody, Toolbar } from '@saas-ui-pro/react'
// import { Sparkline } from '@saas-ui/charts'
// import {
//   useWeb3ModalAccount,
//   useWeb3ModalProvider,
// } from '@web3modal/ethers/react'
// import { ethers } from 'ethers'
// import { BrowserProvider, Contract, formatUnits, parseUnits } from 'ethers'

// import oleABI from '../../../../contracts/oleprotocolabi.json'
// import { MetricsCard } from '../features/organizations/components/metrics/metrics-card'
// import LoanDetailsModal from './loan-details-modal'

// // Contract addresses and ABIs
// const contractAddress = '0xFF10F39F0C24Ce78A52AaA11B447256AE24FeE82'
// const USDTAddress = '0xF79E7D0C6B73C277553C6fAC7277Fc0362953Ad7'
// const USDTAbi = [
//   'function approve(address spender, uint256 amount) public returns (bool)',
//   'function balanceOf(address) view returns (uint)',
// ]

// const currencyFormatter = (value) => {
//   return new Intl.NumberFormat('en-US', {
//     style: 'currency',
//     currency: 'USD',
//   }).format(value)
// }

// const numberFormatter = (value: number) => {
//   return new Intl.NumberFormat('en-US').format(value)
// }

// const loansRequestedData = [
//   { date: 'Jan 1', value: 2000 },
//   { date: 'Jan 8', value: 2500 },
//   { date: 'Jan 15', value: 2300 },
//   { date: 'Jan 22', value: 2700 },
//   { date: 'Jan 29', value: 4800 },
//   { date: 'Feb 5', value: 1000 },
//   { date: 'Feb 12', value: 4200 },
//   { date: 'Feb 19', value: 3400 },
//   { date: 'Feb 26', value: 2600 },
//   { date: 'Mar 5', value: 2800 },
//   { date: 'Mar 12', value: 2900 },
//   { date: 'Mar 19', value: 4100 },
//   { date: 'Mar 26', value: 3300 },
//   { date: 'Apr 2', value: 3400 },
//   { date: 'Apr 9', value: 2600 },
//   { date: 'Apr 16', value: 3700 },
//   { date: 'Apr 23', value: 5900 },
//   { date: 'Apr 30', value: 5100 },
//   { date: 'May 7', value: 6300 },
//   { date: 'May 14', value: 6500 },
//   { date: 'May 21', value: 6700 },
//   { date: 'May 28', value: 6900 },
//   { date: 'Jun 4', value: 7100 },
//   { date: 'Jun 11', value: 7300 },
//   { date: 'Jun 18', value: 8500 },
//   { date: 'Jun 25', value: 8700 },
// ]

// const generateSuppliedData = () => {
//   return Array.from({ length: 20 }, (_, i) => ({
//     date: `Week ${i + 1}`,
//     value: Math.floor(Math.random() * (50000 - 10000 + 1)) + 10000,
//   }))
// }

// const suppliedData = generateSuppliedData()

// const requestedData = suppliedData.map((item) => ({
//   date: item.date,
//   value: Math.round(item.value * 1.44),
// }))

// const scholarsCreatedData = loansRequestedData.reduce(
//   (acc, item, index) => {
//     const previousValue = acc[index - 1]?.value || 300
//     const increment = Math.random() * (1.5 - 0.85) + 0.85
//     const newValue = Math.floor(previousValue * increment)
//     acc.push({ date: item.date, value: newValue })
//     return acc
//   },
//   [] as { date: string; value: number }[],
// )

// interface LoanData {
//   id: number
//   borrower: string
//   borrowerOCID: string
//   amount: bigint
//   collateral: bigint
//   duration: number
//   apy: number
//   reason: string
// }

// const CurrencyCell: DataGridCell<LoanData> = ({ getValue }) => (
//   <Text>
//     {currencyFormatter(ethers.formatUnits(getValue<ethers.BigNumberish>(), 6))}
//   </Text>
// )

// const CollateralCell: DataGridCell<LoanData> = ({ getValue }) => (
//   <Text>{ethers.formatEther(getValue<ethers.BigNumberish>())} EDU</Text>
// )

// const FundScholarButton: DataGridCell<LoanData> = ({ row }) => (
//   <Button colorScheme="blue" onClick={() => handleFundScholar(row.original)}>
//     Fund Scholar
//   </Button>
// )

// const handleFundScholar = async (loanData: LoanData) => {
//   // This function will be implemented later
//   console.log('Funding scholar with ID:', loanData.id)
// }

// const columns: ColumnDef<LoanData>[] = [
// {
//     id: 'amount',
//     header: 'Loan Amount',
//     cell: ({ getValue }) => <CurrencyCell value={Number(getValue<BigInt>())} />, // Convert BigInt to Number
//     meta: {
//     isNumeric: true,
//     },
//     filterFn: getDataGridFilter('number'),
// },
// {
//     id: 'collateral',
//     header: 'Collateral Offered',
//     cell: ({ getValue }) => <CollateralCell value={Number(getValue<BigInt>())} />, // Convert BigInt to Number
//     filterFn: getDataGridFilter('number'),
// },
// {
//     id: 'apy',
//     header: 'APY (%)',
//     meta: {
//     isNumeric: true,
//     },
//     cell: ({ getValue }) => <Text>{Number(getValue<BigInt>()) / 100}%</Text>, // Convert BigInt to Number
//     filterFn: getDataGridFilter('number'),
// },
// {
//     id: 'reason',
//     header: 'Purpose of Loan',
//     filterFn: getDataGridFilter('string'),
// },
// {
//     id: 'duration',
//     header: 'Duration (days)',
//     cell: ({ getValue }) => <Text>{Number(getValue<BigInt>())}</Text>, // Convert BigInt to Number
//     filterFn: getDataGridFilter('number'),
// },
// {
//     id: 'borrowerOCID',
//     header: 'Borrower',
//     filterFn: getDataGridFilter('string'),
// },
// {
//     id: 'fundScholar',
//     header: '',
//     cell: FundScholarButton,
//     meta: {
//     isNumeric: false,
//     },
// },
// ]

// export function RequestedLoansPage() {
//   const [availableLoans, setAvailableLoans] = useState<LoanData[]>([])
//   const [isModalOpen, setIsModalOpen] = useState(false)
//   const [selectedLoan, setSelectedLoan] = useState<LoanData | null>(null)
//   const toast = useToast()
//   const gridRef = useRef<DataGrid<LoanData>>(null)

//   const { address, isConnected } = useWeb3ModalAccount()
//   const { walletProvider } = useWeb3ModalProvider()

//   const fetchAvailableLoans = useCallback(async () => {
//     if (!isConnected || !walletProvider) return

//     try {
//       const ethersProvider = new BrowserProvider(walletProvider)
//       const signer = await ethersProvider.getSigner()
//       const contractInstance = new Contract(contractAddress, oleABI, signer)

//       const loans = await contractInstance.getAvailableLoans()
//       console.log(loans);
//       console.log('here');
//       setAvailableLoans(loans)
//     } catch (error) {
//       console.error('Failed to fetch available loans:', error)
//       toast({
//         title: 'Error',
//         description: 'Failed to fetch available loans. Please try again.',
//         status: 'error',
//         duration: 5000,
//         isClosable: true,
//       })
//     }
//   }, [isConnected, walletProvider, toast])

//   useEffect(() => {
//     fetchAvailableLoans()
//   }, [fetchAvailableLoans])

// //   const handleFundScholar = async (loanData: LoanData) => {
// //     if (!isConnected || !walletProvider) {
// //       toast({
// //         title: 'Error',
// //         description: 'Wallet not connected. Please connect your wallet.',
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       })
// //       return
// //     }

// //     try {
// //       const ethersProvider = new BrowserProvider(walletProvider)
// //       const signer = await ethersProvider.getSigner()

// //       const usdtContract = new Contract(USDTAddress, USDTAbi, signer)
// //       const oleContract = new Contract(contractAddress, oleABI, signer)

// //       // Approve USDT transfer
// //       const approveTx = await usdtContract.approve(
// //         contractAddress,
// //         loanData.amount,
// //       )
// //       await approveTx.wait()

// //       // Supply the loan
// //       const supplyTx = await oleContract.supplyLoan(loanData.id)
// //       await supplyTx.wait()

// //       toast({
// //         title: 'Success',
// //         description: 'Loan supplied successfully!',
// //         status: 'success',
// //         duration: 5000,
// //         isClosable: true,
// //       })

// //       // Refresh available loans
// //       fetchAvailableLoans()
// //     } catch (error) {
// //       console.error('Error supplying loan:', error)
// //       toast({
// //         title: 'Error',
// //         description: 'Failed to supply loan. Please try again.',
// //         status: 'error',
// //         duration: 5000,
// //         isClosable: true,
// //       })
// //     }
// //   }

//   const filters = React.useMemo(
//     () => [
//       {
//         id: 'amount',
//         label: 'Loan Amount',
//         type: 'number',
//         operators: ['lessThan', 'moreThan'],
//         defaultOperator: 'lessThan',
//       },
//       {
//         id: 'collateral',
//         label: 'Collateral',
//         type: 'number',
//         operators: ['lessThan', 'moreThan'],
//         defaultOperator: 'moreThan',
//       },
//       {
//         id: 'apy',
//         label: 'APY (%)',
//         type: 'number',
//         operators: ['lessThan', 'moreThan'],
//         defaultOperator: 'moreThan',
//       },
//       {
//         id: 'reason',
//         label: 'Purpose of Loan',
//         type: 'string',
//       },
//       {
//         id: 'duration',
//         label: 'Duration (days)',
//         type: 'number',
//         operators: ['lessThan', 'moreThan'],
//         defaultOperator: 'lessThan',
//       },
//     ],
//     [],
//   )

//   const onFilter = React.useCallback((filters) => {
//     if (gridRef.current) {
//       gridRef.current.setColumnFilters(
//         filters.map((filter) => {
//           return {
//             id: filter.id,
//             value: {
//               value: filter.value,
//               operator: filter.operator || 'is',
//             },
//           }
//         }),
//       )
//     }
//   }, [])

//   const onRowClick = (row: LoanData) => {
//     setSelectedLoan(row)
//     setIsModalOpen(true)
//   }

//   const renderValue = React.useCallback((context) => {
//     if (['amount', 'collateral', 'apy', 'duration'].includes(context.id)) {
//       return <ActiveFilterValueInput bg="none" />
//     }
//     return context.value?.toLocaleString()
//   }, [])

//   return (
//     <Page>
//         <NavBar/>
//       <PageBody contentWidth="container.2xl" py={8} px={8}>
//         <Grid
//           templateColumns={['repeat(1, 1fr)', null, null, 'repeat(3, 1fr)']}
//           gap={8}
//         >
//           {/* First row cards */}
//           <GridItem>
//             <Card>
//               <CardBody>
//                 <Stat>
//                   <StatLabel>Loans Requested</StatLabel>
//                   <StatNumber>{currencyFormatter(100000)}</StatNumber>
//                   <Sparkline data={requestedData} height="60px" mx="-4" />
//                 </Stat>
//               </CardBody>
//             </Card>
//           </GridItem>

//           <GridItem colSpan={{ base: 1, lg: 3 }}>
//             <MetricsCard noPadding>
//               <FiltersProvider filters={filters} onChange={onFilter}>
//                 <HStack justifyContent="space-between" px={4} py={3}>
//                   <Text fontSize="xl" fontWeight="bold">
//                     Available Loans
//                   </Text>
//                   <Toolbar>
//                     <FiltersAddButton />
//                   </Toolbar>
//                 </HStack>
//                 <ActiveFiltersList renderValue={renderValue} />
//                 <DataGrid<LoanData>
//                   columns={columns}
//                   data={availableLoans}
//                   isSortable
//                   stickyHeader={true}
//                   instanceRef={gridRef}
//                   onRowClick={(row) => onRowClick(row.original)}
//                   sx={{
//                     td: {
//                       justifyContent: 'left !important',
//                     },
//                     th: {
//                       justifyContent: 'left !important',
//                     },
//                     tfoot: {
//                       display: 'none',
//                     },
//                   }}
//                 >
//                   <DataGridPagination
//                     rowsPerPageOptions={[5, 10, 15]}
//                     count={availableLoans.length}
//                     defaultPageSize={10}
//                     sx={{ px: '16px', py: '13px' }}
//                   />
//                 </DataGrid>
//               </FiltersProvider>
//             </MetricsCard>
//           </GridItem>
//         </Grid>

//         {selectedLoan && (
//           <LoanDetailsModal
//             isOpen={isModalOpen}
//             onClose={() => setIsModalOpen(false)}
//             loanData={selectedLoan}
//           />
//         )}
//       </PageBody>
//     </Page>
//   )
// }

// export default RequestedLoansPage

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
  return <Text>{currencyFormatter(Number(ethers.formatUnits(value, 6)))}</Text>
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
