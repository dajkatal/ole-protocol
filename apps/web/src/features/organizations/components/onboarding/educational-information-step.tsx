import { useRef } from 'react'

import * as z from 'zod'
import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { UseFormReturn, useStepperContext } from '@saas-ui/react'
import {
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from '@web3modal/ethers/react'
import { ethers } from 'ethers'
import { BrowserProvider, Contract } from 'ethers'

import { OnboardingStep } from './onboarding-step'

const contractAddress = '0x622d6ddad0298042F3F671A34990bc7dDE47ea4B'

// Define a minimal schema since this step doesn't require much data
const schema = z.object({
  acknowledged: z.boolean().optional(),
})

type FormInput = z.infer<typeof schema>

export const PaymentStep = () => {
  const stepper = useStepperContext()
  const formRef = useRef<UseFormReturn<FormInput>>(null)

  const { address, isConnected } = useWeb3ModalAccount()
  const { walletProvider } = useWeb3ModalProvider()

  const handleSendETH = async () => {
    if (!isConnected || !walletProvider) {
      console.log('Wallet not connected or provider unavailable.')
      return
    }

    try {
      const ethersProvider = new BrowserProvider(walletProvider)
      const signer = await ethersProvider.getSigner()

      // Create a transaction object to send 0.06 ETH
      const tx = {
        to: contractAddress,
        value: ethers.parseEther('0.06'), // Convert 0.06 ETH to wei
      }

      // Send the transaction
      const txResponse = await signer.sendTransaction(tx)
      await txResponse.wait() // Wait for the transaction to be confirmed

      console.log('Transaction successful!')
      // Proceed to the next step in the onboarding process if needed
    } catch (error) {
      console.error('Error sending ETH:', error)
    }
  }

  return (
    <OnboardingStep
      schema={schema}
      formRef={formRef}
      title="Confirm Loan" // Ensure it moves to the next step
      submitLabel="Pay 0.06 EDU"
      onSubmit={async () => {
        try {
          await handleSendETH() // Send the ETH when the form is submitted
          stepper.nextStep()
          // Optionally move to the next step here, if using a stepper
        } catch {
          console.log('Error during submission.')
        }
      }}
    >
      <VStack spacing={4} align="center">
        <Text>
          You are requesting a loan of 250 USDT with a Collateralization Ratio
          of 1.2, requiring a collateral of 0.06 EDU.
        </Text>
        <Text>Please ensure this is correct before proceeding.</Text>
      </VStack>
    </OnboardingStep>
  )
}
