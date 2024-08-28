import * as React from 'react'

import {
  Badge,
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
} from '@chakra-ui/react'
import { runIfFn } from '@chakra-ui/utils'
import {
  PersonaAvatar,
  Property,
  PropertyLabel,
  PropertyList,
  PropertyValue,
} from '@saas-ui/react'
import { FiMoreVertical } from 'react-icons/fi'
import {
  LuCalendar,
  LuCheckCircle,
  LuCircleDashed,
  LuCircleDot,
  LuListChecks,
  LuMilestone,
  LuSignalHigh,
  LuSignalLow,
  LuSignalMedium,
  LuSignalZero,
} from 'react-icons/lu'

export function TaskCardWithProperties() {
  return (
    <Card size="sm">
      <CardHeader
        display="flex"
        alignItems="center"
        gap="2"
        position="relative"
      >
        <PersonaAvatar
          size="2xs"
          name={task.user.name}
          src={task.user.avatar}
          presence={task.user.presence}
        />
        <Text fontSize="sm" fontWeight="medium">
          {task.user.name}
        </Text>
        <Menu>
          <MenuButton
            as={IconButton}
            position="absolute"
            top="2"
            right="2"
            aria-label="Options"
            variant="ghost"
            icon={<FiMoreVertical />}
          />
          <MenuList>
            <MenuItem>Edit</MenuItem>
            <MenuItem>Delete</MenuItem>
          </MenuList>
        </Menu>
      </CardHeader>
      <CardBody pt="1">
        <HStack mb="1" alignItems="center">
          <TaskStatus status={task.status} />

          <Heading size="xs" fontWeight="medium" noOfLines={1}>
            Define design tokens
          </Heading>
        </HStack>

        <Text color="muted" mb="2" noOfLines={1}>
          Design consistent variables for visual properties like colors,
          typography, and spacing.
        </Text>

        <PropertyList display="grid" gridTemplateColumns="1fr 1fr">
          <TaskProperty id="dueDate" value={task.dueDate} />
          <TaskProperty id="milestone" value={task.milestone} />
          <TaskProperty id="priority" value={task.priority} />
          <TaskProperty id="subtasks" value={task.subtasks} />
        </PropertyList>
      </CardBody>
      <CardFooter borderTopWidth="1px">
        <TaskTags tags={task.tags} />
      </CardFooter>
    </Card>
  )
}

function TaskStatus(props: { status: string }) {
  const status = states[props.status]

  return (
    <Box color={status.color} rounded="full" aria-label={status.label}>
      {status.icon}
    </Box>
  )
}

function TaskProperty(props: { id: string; value: string | number }) {
  const property = properties[props.id]

  if (!property) {
    return null
  }

  return (
    <Property key={props.id} color="muted">
      <PropertyLabel display="flex" width="3" aria-label={property.label}>
        {runIfFn(property.icon, props.value)}
      </PropertyLabel>
      <PropertyValue>
        {property.value ? property.value(props.value) : props.value}
      </PropertyValue>
    </Property>
  )
}

function TaskTags(props: { tags: string[] }) {
  const visibleTags = props.tags.slice(0, 3)
  const hiddenTags = props.tags.slice(3).length

  return (
    <>
      {visibleTags?.map((tag, i) => (
        <Tag
          key={i}
          variant="outline"
          mr="1"
          boxShadow="none"
          border="1px solid"
          borderColor="blackAlpha.300"
          color="gray.600"
          _dark={{
            borderColor: 'whiteAlpha.300',
            color: 'gray.300',
          }}
        >
          <Badge
            variant="solid"
            boxShadow="none"
            colorScheme={tags[tag].color}
            boxSize="2"
            rounded="full"
            me="1"
          />
          {tags[tag].label}
        </Tag>
      ))}
      {hiddenTags > 0 && (
        <Tag
          variant="outline"
          mr="1"
          boxShadow="none"
          border="1px dashed"
          borderColor="blackAlpha.300"
          color="muted"
          _dark={{
            borderColor: 'whiteAlpha.200',
          }}
        >
          +{hiddenTags}
        </Tag>
      )}
    </>
  )
}

const states: Record<
  string,
  { label: string; color: string; icon: React.ReactNode }
> = {
  backlog: {
    label: 'Backlog',
    color: 'gray',
    icon: <LuCircleDashed />,
  },
  'in-progress': {
    label: 'In progress',
    color: 'green',
    icon: <LuCircleDot />,
  },
  completed: {
    label: 'Completed',
    color: 'blue',
    icon: <LuCheckCircle />,
  },
}

type Properties = Record<
  string,
  {
    icon: React.ReactNode | ((value: any) => React.ReactNode)
    label: string
    value?: (value: any) => string
  }
>

const properties: Properties = {
  dueDate: {
    icon: <LuCalendar />,
    label: 'Due date',
  },
  milestone: {
    icon: <LuMilestone />,
    label: 'Milestone',
  },
  priority: {
    icon: (priority: Priority) => priorities[priority]?.icon,
    label: 'Priority',
    value: (value: number) => priorities[value]?.label,
  },
  subtasks: {
    icon: <LuListChecks />,
    label: 'Subtasks',
  },
}

const priorities: Record<number, { label: string; icon: React.ReactNode }> = {
  0: {
    label: 'None',
    icon: <LuSignalZero />,
  },
  1: {
    label: 'Low',
    icon: <LuSignalLow />,
  },
  2: {
    label: 'Medium',
    icon: <LuSignalMedium />,
  },
  3: {
    label: 'High',
    icon: <LuSignalHigh />,
  },
}

const tags: Record<string, { label: string; color: string }> = {
  css: {
    label: 'CSS',
    color: 'blue',
  },
  ui: {
    label: 'UI',
    color: 'green',
  },
  javascript: {
    label: 'Javascript',
    color: 'yellow',
  },
  react: {
    label: 'React',
    color: 'blue',
  },
}

type Priority = keyof typeof priorities

const task = {
  status: 'backlog',
  priority: 3,
  dueDate: '2024-03-01',
  user: {
    name: 'Sara Cruz',
    avatar: '/avatars/10.jpg',
    presence: 'online',
  },
  tags: ['css', 'ui', 'javascript', 'react'],
  milestone: 'v1.0',
  subtasks: '3/5',
}

type Task = typeof task
