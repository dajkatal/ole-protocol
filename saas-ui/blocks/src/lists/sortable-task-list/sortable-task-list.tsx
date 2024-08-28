import * as React from 'react'

import { Box, Checkbox, HStack, Portal, Tag, Text } from '@chakra-ui/react'
import {
  Active,
  DndContext,
  DndContextProps,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  Over,
  TouchSensor,
  UniqueIdentifier,
  closestCenter,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { snapCenterToCursor } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  useSortable,
} from '@dnd-kit/sortable'
import {
  StructuredList,
  StructuredListButton,
  StructuredListCell,
  StructuredListHeader,
  StructuredListItem,
} from '@saas-ui/react'

export interface SortableTaskListProps extends DndContextProps {
  tasks: Task[]
  states?: TaskStates
}

const useSortableTaskList = (props: SortableTaskListProps) => {
  const {
    tasks,
    states = taskStates,
    onDragStart,
    onDragOver,
    onDragEnd,
    onDragCancel,
    ...rest
  } = props

  const [items, setItems] = React.useState<Task[]>(tasks)

  const [groupedItems, flatIds] = React.useMemo(() => {
    const groupedItems: Record<string, Task[]> = {}
    const flatIds: string[] = []

    for (const task of items) {
      if (!groupedItems[task.status]) {
        groupedItems[task.status] = []
        flatIds.push(getHeaderId(task.status))
      }

      groupedItems[task.status].push(task)
      flatIds.push(task.id)
    }

    return [groupedItems, flatIds]
  }, [items])

  const [activeId, setActiveId] = React.useState<UniqueIdentifier | null>(null)

  const getIndex = (id: UniqueIdentifier) =>
    items.findIndex((item) => item.id === id)

  const activeItem = tasks.find((task) => task.id === activeId)
  const activeIndex = activeId ? getIndex(activeId) : -1

  const handleDragEnd = (event: DragEndEvent) => {
    const { over } = event

    if (!over || !activeItem) {
      return
    }

    const overIndex = getIndex(over.id)
    const overType = over.data.current?.type

    if (overType === 'task' && activeIndex !== overIndex) {
      setItems((items) => {
        if (
          over.data.current?.task &&
          over.data.current?.task.status !== activeItem?.status
        ) {
          // Update the status of the task and move it to the new status group
          const item = {
            ...activeItem,
            status: over.data.current?.task.status,
          }

          items[activeIndex] = item
        }

        return arrayMove(items, activeIndex, overIndex)
      })
    } else if (overType === 'header' && over.data.current?.sortable.index > 0) {
      // Move the task to the status group above the header
      const index = over.data.current?.sortable.index
      const prevId = flatIds[index - 1]
      const prevItem = tasks.find((task) => task.id === prevId)

      if (prevItem) {
        setItems((items) => {
          const item = {
            ...activeItem,
            status: prevItem.status,
          }

          items[activeIndex] = item

          return arrayMove(items, activeIndex, overIndex)
        })
      }
    }

    setActiveId(null)
  }

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 50,
        tolerance: 5,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  )

  const dndContextProps: DndContextProps = {
    collisionDetection: closestCenter,
    sensors,
    onDragStart: (event) => {
      if (!event.active) {
        return
      }
      setActiveId(event.active.id)
      onDragStart?.(event)
    },
    onDragOver,
    onDragEnd: (event) => {
      handleDragEnd(event)
      onDragEnd?.(event)
    },
    onDragCancel: (event) => {
      setActiveId(null)
      onDragCancel?.(event)
    },
    ...rest,
  }

  return {
    dndContextProps,
    items,
    groupedItems,
    flatIds,
    activeItem,
    states,
  }
}

export const SortableTaskList: React.FC<SortableTaskListProps> = (props) => {
  const { dndContextProps, groupedItems, flatIds, activeItem, states } =
    useSortableTaskList(props)

  return (
    <DndContext {...dndContextProps}>
      <SortableContext items={flatIds}>
        <StructuredList py="0">
          {Object.entries(groupedItems).map(([status, tasks]) => (
            <React.Fragment key={status}>
              <TaskListHeader
                id={status}
                title={states[status]?.label}
                total={tasks.length}
              />
              {tasks.map((task) => (
                <TaskListItem key={task.id} task={task} />
              ))}
            </React.Fragment>
          ))}
        </StructuredList>
        <Portal>
          {activeItem ? (
            <DragOverlay
              style={{ minWidth: 200 }}
              modifiers={[snapCenterToCursor]}
            >
              <TaskListDragItem task={activeItem} />
            </DragOverlay>
          ) : null}
        </Portal>
      </SortableContext>
    </DndContext>
  )
}

const getHeaderId = (id: string) => `task-list-header-${id}`

const TaskListHeader: React.FC<{ id: string; title: string; total: number }> = (
  props,
) => {
  const id = getHeaderId(props.id)

  const { setNodeRef, over, active } = useSortable({
    id,
    data: {
      type: 'header',
    },
    disabled: true,
  })

  const itemProps = useSortableProps({
    active,
    over,
    id,
  })

  return (
    <Box
      as="li"
      ref={setNodeRef}
      {...itemProps}
      listStyleType="none"
      position="relative"
    >
      <StructuredListHeader
        as="div"
        fontWeight="normal"
        bg="gray.100"
        _dark={{ bg: 'gray.700' }}
        color="app-text"
      >
        {props.title}
        <Text as="span" color="muted" ms="2">
          {props.total}
        </Text>
      </StructuredListHeader>
    </Box>
  )
}

const TaskListDragItem: React.FC<{ task: Task }> = (props) => {
  return (
    <Box
      display="inline-block"
      px="3"
      py="2"
      boxShadow="md"
      borderRadius="md"
      borderWidth="1px"
      bg="chakra-body-bg"
      width="auto"
      cursor="grabbing"
      userSelect="none"
    >
      {props.task.title}
    </Box>
  )
}

const useSortableProps = ({
  id,
  active,
  over,
}: {
  id: string
  active: Active | null
  over: Over | null
}) => {
  // make sure items can't be dropped above the first header.
  if (
    id === over?.id &&
    over?.data.current?.type === 'header' &&
    over.data.current.sortable.index === 0
  ) {
    return {
      'data-dnd-dragging': 'false',
      'data-dnd-over': 'false',
      'data-dnd-below-active': 'false',
    }
  }

  return {
    'data-dnd-dragging': active && active?.id === id ? 'true' : 'false',
    'data-dnd-over':
      active?.id !== over?.id && over?.id === id ? 'true' : 'false',
    'data-dnd-below-active':
      over?.data.current?.sortable.index > active?.data.current?.sortable.index,
    sx: {
      '&[data-dnd-dragging=true]': {
        opacity: 0.5,
      },
      '&[data-dnd-over=true]': {
        _after: {
          content: '""',
          position: 'absolute',
          width: '100%',
          height: '2px',
          background: 'primary.500',
        },
      },
      '&[data-dnd-below-active=false][data-dnd-over=true]': {
        _after: {
          top: '-1px',
        },
      },
      '&[data-dnd-below-active=true][data-dnd-over=true]': {
        _after: {
          bottom: '-1px',
        },
      },
    },
  }
}

const TaskListItem: React.FC<{ task: Task }> = (props) => {
  const { task } = props

  const { attributes, listeners, setNodeRef, over, active } = useSortable({
    id: task.id,
    data: {
      type: 'task',
      task,
    },
  })

  const itemProps = useSortableProps({
    active,
    over,
    id: task.id,
  })

  return (
    <StructuredListItem
      ref={setNodeRef}
      {...itemProps}
      position="relative"
      p="0"
      borderBottom="1px"
      borderColor="gray.100"
      fontSize="sm"
      _dark={{
        borderColor: 'whiteAlpha.100',
      }}
    >
      <StructuredListButton
        as={HStack}
        {...attributes}
        {...listeners}
        h="10"
        py="0"
        _hover={{
          bg: 'gray.50',
          _dark: {
            bg: 'whiteAlpha.50',
          },
        }}
      >
        <StructuredListCell width="4" role="group">
          <Checkbox
            opacity="0"
            _checked={{ opacity: 1 }}
            _groupHover={{ opacity: 1 }}
            size="md"
            rounded="sm"
          />
        </StructuredListCell>
        <StructuredListCell color="muted">{task.id}</StructuredListCell>
        <StructuredListCell flex="1">
          <Text noOfLines={1}>{task.title}</Text>
        </StructuredListCell>
        <StructuredListCell
          color="muted"
          as={HStack}
          display={{ base: 'none', md: 'flex' }}
          gap="1"
        >
          {task.labels.map((label) => (
            <Tag
              key={label}
              bg="none"
              border="1px solid"
              borderColor="blackAlpha.100"
              color="muted"
              rounded="full"
              _dark={{
                borderColor: 'whiteAlpha.100',
              }}
            >
              {label}
            </Tag>
          ))}
        </StructuredListCell>
        <StructuredListCell color="muted" flexShrink="0">
          {task.date}
        </StructuredListCell>
      </StructuredListButton>
    </StructuredListItem>
  )
}

type TaskStates = Record<string, { label: string; color: string }>

const taskStates: TaskStates = {
  todo: {
    label: 'To do',
    color: 'gray',
  },
  'in-progress': {
    label: 'In progress',
    color: 'yellow',
  },
  done: {
    label: 'Done',
    color: 'green',
  },
}

interface Task {
  id: string
  title: string
  date: string
  labels: string[]
  status: string
}

const tasks: Task[] = [
  {
    id: 'SUI-123',
    title: 'Research product trends',
    date: '10 Jan',
    labels: ['Research', 'Trends'],
    status: 'in-progress',
  },
  {
    id: 'SUI-133',
    title: 'Develop user interface',
    date: '3 Feb',
    labels: ['UI', 'Development'],
    status: 'in-progress',
  },
  {
    id: 'SUI-134',
    title: 'Create user experience flows',
    date: '5 Feb',
    labels: ['UX', 'Flows'],
    status: 'in-progress',
  },
  {
    id: 'SUI-135',
    title: 'Select materials for production',
    date: '7 Feb',
    labels: ['Materials', 'Production'],
    status: 'in-progress',
  },
  {
    id: 'SUI-136',
    title: 'Work with engineers on product specifications',
    date: '9 Feb',
    labels: ['Engineering', 'Specifications'],
    status: 'in-progress',
  },
  {
    id: 'SUI-137',
    title: 'Conduct user research',
    date: '11 Feb',
    labels: ['User research', 'Testing'],
    status: 'in-progress',
  },
  {
    id: 'SUI-124',
    title: 'Brainstorm product ideas',
    date: '12 Jan',
    labels: ['Brainstorming', 'Ideas'],
    status: 'todo',
  },
  {
    id: 'SUI-125',
    title: 'Create initial sketches',
    date: '15 Jan',
    labels: ['sketches', 'design'],
    status: 'todo',
  },
  {
    id: 'SUI-126',
    title: 'Get feedback on sketches',
    date: '17 Jan',
    labels: ['Feedback', 'Design'],
    status: 'todo',
  },
  {
    id: 'SUI-127',
    title: 'Refine and finalize design',
    date: '20 Jan',
    labels: ['Design', 'Refinement'],
    status: 'todo',
  },
  {
    id: 'SUI-128',
    title: 'Create 3D model',
    date: '23 Jan',
    labels: ['3D', 'Model'],
    status: 'todo',
  },
  {
    id: 'SUI-129',
    title: 'Test and iterate prototype',
    date: '25 Jan',
    labels: ['Testing', 'Prototype'],
    status: 'todo',
  },
  {
    id: 'SUI-130',
    title: 'Refine prototype based on feedback',
    date: '27 Jan',
    labels: ['Feedback', 'Iteration'],
    status: 'todo',
  },
  {
    id: 'SUI-131',
    title: 'Create final product',
    date: '30 Jan',
    labels: ['Final', 'Product'],
    status: 'done',
  },
  {
    id: 'SUI-132',
    title: 'Test final product before launch',
    date: '1 Feb',
    labels: ['testing', 'final'],
    status: 'Done',
  },
]

export default () => {
  return <SortableTaskList tasks={tasks} />
}
