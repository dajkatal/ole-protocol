// LoanDetailsModal.tsx
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button, Text, VStack } from '@chakra-ui/react';
import { PropertyList, Property } from '@saas-ui/react';

interface LoanDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    loanData: {
        ocid: string;
        loanAmount: number;
        collateral: string;
        apy: number;
        purpose: string;
        duration: string;
    };
}

const LoanDetailsModal: React.FC<LoanDetailsModalProps> = ({ isOpen, onClose, loanData }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="md">
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Loan Details</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <PropertyList>
                        <Property label="OCID" value={loanData.ocid} />
                        <Property label="Loan Amount" value={`$${loanData.loanAmount.toLocaleString()}`} />
                        <Property label="Collateral Offered" value={loanData.collateral} />
                        <Property label="APY (%)" value={`${loanData.apy}%`} />
                        <Property label="Purpose of Loan" value={loanData.purpose} />
                        <Property label="Duration" value={loanData.duration} />
                    </PropertyList>
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default LoanDetailsModal;
