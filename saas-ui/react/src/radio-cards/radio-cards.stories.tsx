import * as React from 'react'

import { Container, Text, VStack } from '@chakra-ui/react'
import { Meta } from '@storybook/react'

import { RadioCard, RadioCards } from './radio-cards'

export default {
  title: 'Components/RadioCards',
  component: RadioCards,
  decorators: [
    (Story: any) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta

export const Basic = {
  render: () => (
    <RadioCards defaultValue="1" onChange={(e) => console.log(e)} columns={3}>
      <RadioCard value="1">
        <Text fontWeight="medium">1-core CPU</Text>
        <Text color="muted">8GB RAM</Text>
      </RadioCard>
      <RadioCard value="2">
        <Text fontWeight="medium">2-core CPU</Text>
        <Text color="muted">16GB RAM</Text>
      </RadioCard>
      <RadioCard value="4">
        <Text fontWeight="medium">4-core CPU</Text>
        <Text color="muted">32GB RAM</Text>
      </RadioCard>
    </RadioCards>
  ),
}

export const Variants = {
  render: () => (
    <VStack>
      <RadioCards
        variant="outline"
        defaultValue="1"
        onChange={(e) => console.log(e)}
        columns={3}
      >
        <RadioCard value="1">
          <Text fontWeight="medium">1-core CPU</Text>
          <Text color="muted">8GB RAM</Text>
        </RadioCard>
        <RadioCard value="2">
          <Text fontWeight="medium">2-core CPU</Text>
          <Text color="muted">16GB RAM</Text>
        </RadioCard>
        <RadioCard value="4">
          <Text fontWeight="medium">4-core CPU</Text>
          <Text color="muted">32GB RAM</Text>
        </RadioCard>
      </RadioCards>

      <RadioCards
        variant="elevated"
        defaultValue="1"
        onChange={(e) => console.log(e)}
        columns={3}
      >
        <RadioCard value="1">
          <Text fontWeight="medium">1-core CPU</Text>
          <Text color="muted">8GB RAM</Text>
        </RadioCard>
        <RadioCard value="2">
          <Text fontWeight="medium">2-core CPU</Text>
          <Text color="muted">16GB RAM</Text>
        </RadioCard>
        <RadioCard value="4">
          <Text fontWeight="medium">4-core CPU</Text>
          <Text color="muted">32GB RAM</Text>
        </RadioCard>
      </RadioCards>
    </VStack>
  ),
}

export const Sizes = {
  render: () => (
    <VStack>
      <RadioCards
        size="sm"
        defaultValue="1"
        onChange={(e) => console.log(e)}
        columns={3}
      >
        <RadioCard value="1">
          <Text fontWeight="medium">1-core CPU</Text>
          <Text color="muted">8GB RAM</Text>
        </RadioCard>
        <RadioCard value="2">
          <Text fontWeight="medium">2-core CPU</Text>
          <Text color="muted">16GB RAM</Text>
        </RadioCard>
        <RadioCard value="4">
          <Text fontWeight="medium">4-core CPU</Text>
          <Text color="muted">32GB RAM</Text>
        </RadioCard>
      </RadioCards>

      <RadioCards
        size="md"
        defaultValue="1"
        onChange={(e) => console.log(e)}
        columns={3}
      >
        <RadioCard value="1">
          <Text fontWeight="medium">1-core CPU</Text>
          <Text color="muted">8GB RAM</Text>
        </RadioCard>
        <RadioCard value="2">
          <Text fontWeight="medium">2-core CPU</Text>
          <Text color="muted">16GB RAM</Text>
        </RadioCard>
        <RadioCard value="4">
          <Text fontWeight="medium">4-core CPU</Text>
          <Text color="muted">32GB RAM</Text>
        </RadioCard>
      </RadioCards>

      <RadioCards
        size="lg"
        defaultValue="1"
        onChange={(e) => console.log(e)}
        columns={3}
      >
        <RadioCard value="1">
          <Text fontWeight="medium">1-core CPU</Text>
          <Text color="muted">8GB RAM</Text>
        </RadioCard>
        <RadioCard value="2">
          <Text fontWeight="medium">2-core CPU</Text>
          <Text color="muted">16GB RAM</Text>
        </RadioCard>
        <RadioCard value="4">
          <Text fontWeight="medium">4-core CPU</Text>
          <Text color="muted">32GB RAM</Text>
        </RadioCard>
      </RadioCards>
    </VStack>
  ),
}
