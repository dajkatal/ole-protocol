import * as React from 'react'

import { Meta } from '@storybook/react'

export default {
  title: 'Blocks/Task Management/SortableTaskList',
  decorators: [(Story) => <Story />],
} as Meta

export { default as SortableTaskList } from './sortable-task-list'
