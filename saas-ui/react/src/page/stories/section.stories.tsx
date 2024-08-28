import * as React from 'react'
import { StoryObj, Meta } from '@storybook/react'
import { Card, CardBody, Text } from '@chakra-ui/react'
import { Section, SectionBody, SectionHeader, SectionProps } from '../section'

export default {
  title: 'Components/Layout/Section',
  component: Section,
} as Meta

const Content = () => {
  return (
    <Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce sed nibh
      sit amet nulla ultricies vehicula. Proin consequat auctor vestibulum.
      Phasellus sit amet fringilla erat, nec placerat dui. In iaculis ex non
      lacus dictum pellentesque. Pellentesque malesuada ipsum ex, ac ultricies
      nisi ornare non. Suspendisse potenti. Vestibulum hendrerit tellus elit,
      eget suscipit odio luctus ut. Nunc aliquam urna arcu, sit amet ultrices
      nunc malesuada id. Nam semper ante lectus, id egestas dolor tempus non.
    </Text>
  )
}

type Story = StoryObj<SectionProps>

export const Basic: Story = {
  args: {
    children: (
      <>
        <SectionHeader title="Basic section" />
        <SectionBody>
          <Content />
        </SectionBody>
      </>
    ),
  },
}

export const Description: Story = {
  args: {
    children: (
      <>
        <SectionHeader
          title="Basic section"
          description="Section description"
        />
        <SectionBody>
          <Content />
        </SectionBody>
      </>
    ),
  },
}

export const VariantAnnotated: Story = {
  args: {
    variant: 'annotated',
    children: (
      <>
        <SectionHeader
          title="Annotated variant"
          description="Annotated variant"
        />
        <SectionBody>
          <Card>
            <CardBody>
              <Content />
            </CardBody>
          </Card>
        </SectionBody>
      </>
    ),
  },
}

export const IsLoading: Story = {
  args: {
    isLoading: true,
    children: (
      <>
        <SectionHeader title="Section" />
        <SectionBody>
          <Content />
        </SectionBody>
      </>
    ),
  },
}
