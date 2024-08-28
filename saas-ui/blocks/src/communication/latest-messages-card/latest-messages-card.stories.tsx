import * as React from 'react'
import { Meta } from '@storybook/react'
import { Container } from '@chakra-ui/react'

export default {
  title: 'Blocks/Communication/LatestMessagesCard',
  decorators: [
    (Story) => (
      <Container>
        <Story />
      </Container>
    ),
  ],
} as Meta

export { LatestMessagesCard } from './latest-messages-card'
