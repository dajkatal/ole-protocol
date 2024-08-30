import React from 'react'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'
import { Property, PropertyList } from '@saas-ui/react'
import { BigNumberish, ethers } from 'ethers'

interface LoanData {
  id: number
  borrower: string
  borrowerOCID: string
  amount: BigNumberish
  collateral: BigNumberish
  duration: number
  apy: number
  reason: string
}

interface LoanDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  loanData: LoanData
}

const LoanDetailsModal: React.FC<LoanDetailsModalProps> = ({
  isOpen,
  onClose,
  loanData,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Loan Details</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PropertyList>
            <Property label="Loan ID" value={loanData.id.toString()} />
            <Property label="Borrower" value={loanData.borrower} />
            <Property
              label="Loan Amount"
              value={`$${ethers.formatUnits(loanData.amount, 6)}`}
            />
            <Property
              label="Collateral Offered"
              value={`${ethers.formatEther(loanData.collateral)} EDU`}
            />
            <Property label="APY (%)" value={`${loanData.apy / 100}%`} />
            <Property label="Purpose of Loan" value={loanData.reason} />
            <Property label="Duration" value={`${loanData.duration} days`} />
          </PropertyList>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default LoanDetailsModal
