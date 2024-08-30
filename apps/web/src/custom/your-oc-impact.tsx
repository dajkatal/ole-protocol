'use client'

import * as React from 'react'
import {Flex, Image, Text, VStack, Button, Spacer} from '@chakra-ui/react'
import { MetricsCard } from '@app/features/organizations/components/metrics/metrics-card'

const YourOcImpact: React.FC = () => {
    return (
        <MetricsCard
            p={5}
            shadow="md"
            borderWidth="1px"
            borderRadius="md"
            height="435px"
        >
            {/* Use Flex to center the content vertically and horizontally */}
            <Flex
                direction="column"
                align="center"
                justify="center"
                height="100%"
            >
                {/* Display the OC Badge Logo */}
                <Image
                    src="img/oc-logo.png" // Adjust the path according to your file structure
                    alt="OC Badge"
                    mb={10}
                    boxSize="80px"
                />

                {/* Display the Text Underneath the Logo */}
                <VStack spacing={2} textAlign="center">
                    <Text fontSize="lg" fontWeight="bold">
                        You are currently ranked 762 in the OC Network
                    </Text>
                    <Text fontSize="md" color="gray.600">
                        Thank you for helping the scholars of the future
                    </Text>
                    <Text fontSize="sm" color="gray.500">
                        To improve your OC ranking, try supplying loans with a lower APY
                    </Text>
                </VStack>

                {/* Add the Supply a Loan Button */}
                <Button colorScheme="blue" size="md" mt={10}>
                    Supply a Loan
                </Button>
            </Flex>
        </MetricsCard>
    )
}

export default YourOcImpact
