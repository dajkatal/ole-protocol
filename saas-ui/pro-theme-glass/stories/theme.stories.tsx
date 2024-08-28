import * as React from 'react'
import { Story, Meta } from '@storybook/react'
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Progress,
  Radio,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Switch,
  VStack,
  Kbd,
  Text,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Stack,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  useDisclosure,
  Spacer,
  Heading,
  Editable,
  EditablePreview,
  EditableInput,
  ButtonGroup,
  Tag,
  IconButton,
  Portal,
  Card,
  CardHeader,
  CardFooter,
  Image,
  Divider,
  useClipboard,
  Tabs,
  TabList,
  Tab,
} from '@chakra-ui/react'
import {
  Select,
  PropertyList,
  Property,
  PersonaAvatar,
  SearchInput,
  useSnackbar,
  SelectButton,
  SelectList,
  SelectOption,
  StructuredList,
  StructuredListItem,
  StructuredListIcon,
  StructuredListCell,
} from '@saas-ui/react'
import {
  FiAlignCenter,
  FiAlignLeft,
  FiAlignRight,
  FiBold,
  FiChevronDown,
  FiItalic,
  FiLink,
  FiMoreVertical,
  FiUnderline,
} from 'react-icons/fi'

import { theme } from '../src/theme'
import { FaGithub } from 'react-icons/fa'
import { MenuInput } from '@saas-ui-pro/react'

export default {
  title: 'Themes/Glass',
  decorators: [(Story: any) => <Story />],
  parameters: {
    theme,
    layout: 'fullscreen',
  },
} as Meta

export const Glass: Story = () => {
  const snackbar = useSnackbar()

  const { onCopy } = useClipboard('npm i @saas-ui/theme-glass')

  return (
    <Box
      p="20"
      fontSize="sm"
      position="relative"
      background="radial-gradient(ellipse 80% 50% at 50% -15%,rgba(110,114,180,0.25),transparent)"
    >
      <Box width="container.xl" margin="0 auto">
        <Stack
          spacing="4"
          justifySelf="flex-start"
          alignSelf="flex-start"
          width="400px"
          alignItems="flex-start"
          position="absolute"
          zIndex="2"
        >
          <Stack spacing="1">
            <Heading>Glass Theme</Heading>
            <Text color="muted" fontSize="lg">
              A Linear inspired Chakra UI theme
            </Text>
          </Stack>

          <ButtonGroup>
            <Button
              variant="outline"
              size="md"
              onClick={() => {
                onCopy()

                snackbar.success('Copied to clipboard')
              }}
            >
              npm i @saas-ui/theme-glass
            </Button>
            <Button
              variant="ghost"
              leftIcon={<FaGithub />}
              size="md"
              as="a"
              href="https://github.com/saas-js/saas-ui/tree/main/packages/saas-ui-theme-glass"
            >
              Source
            </Button>
          </ButtonGroup>
        </Stack>
        <Stack spacing="4" position="absolute" top="20">
          <VStack alignItems="flex-end" spacing="4">
            <HStack spacing="4" alignItems="flex-end">
              <VStack alignItems="flex-end" spacing="4">
                <Checkbox isChecked />
                <HStack>
                  <Button variant="primary">Primary</Button>
                </HStack>
                <HStack>
                  <Button variant="tertiary">Tertiary</Button>
                  <Button variant="secondary">Secondary</Button>
                </HStack>
              </VStack>

              <Card width="240px" position="relative" overflow="hidden">
                <Image src="/mountains.jpg" objectFit="cover" mb="0" />
                <CardFooter
                  position="absolute"
                  bottom="0"
                  width="100%"
                  bgGradient="linear(to-t, blackAlpha.900, transparent)"
                  py="2"
                  px="2"
                  color="white"
                  height="76px"
                  alignItems="flex-end"
                >
                  <Text flex="1" fontSize="md">
                    South Tirol
                  </Text>
                  <Button variant="primary" size="xs">
                    Book now
                  </Button>
                </CardFooter>
              </Card>
            </HStack>

            <HStack alignItems="flex-end" spacing="4">
              <VStack alignItems="flex-end">
                <Switch defaultChecked />

                <Menu defaultIsOpen placement="bottom-start" flip={false}>
                  <MenuButton
                    as={Button}
                    variant="secondary"
                    rightIcon={<FiChevronDown />}
                  >
                    Filter
                  </MenuButton>
                  <Portal>
                    <MenuList>
                      <MenuInput
                        placeholder="Filter by..."
                        groupProps={{ pb: 1, mb: 1 }}
                      />
                      <MenuItem>Status</MenuItem>
                      <MenuItem>Created at</MenuItem>
                    </MenuList>
                  </Portal>
                </Menu>
              </VStack>
              <Upgrade />
            </HStack>
          </VStack>
          <Slider
            aria-label="slider-ex-1"
            defaultValue={30}
            width="570px"
            ms="auto"
            alignSelf="flex-end"
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
          <VStack alignItems="flex-end">
            <HStack alignItems="flex-end" spacing="4">
              <VStack alignItems="flex-end" spacing="4">
                <Radio isChecked />
                <HStack spacing="0.5">
                  <Kbd>⌘</Kbd>
                  <Kbd>K</Kbd>
                </HStack>
                <Tabs variant="segments" size="xs">
                  <TabList>
                    <Tab>All</Tab>
                    <Tab>Leads</Tab>
                    <Tab>Customers</Tab>
                  </TabList>
                </Tabs>
                <Profile />
              </VStack>
              <Members />
            </HStack>
          </VStack>
          <VStack alignItems="flex-end">
            <HStack spacing="4" alignItems="flex-start">
              <Progress
                colorScheme="green"
                size="xs"
                value={80}
                width="300px"
              />
              <Card px="1" py="1">
                <ButtonGroup variant="ghost">
                  <ButtonGroup spacing="1" variant="ghost">
                    <IconButton
                      icon={<FiAlignLeft />}
                      aria-label="Align left"
                      isActive
                    />
                    <IconButton
                      icon={<FiAlignCenter />}
                      aria-label="Align center"
                    />
                    <IconButton
                      icon={<FiAlignRight />}
                      aria-label="Align right"
                    />
                  </ButtonGroup>
                  <Divider orientation="vertical" />
                  <ButtonGroup spacing="1" variant="ghost">
                    <IconButton icon={<FiBold />} aria-label="Bold" />
                    <IconButton icon={<FiItalic />} aria-label="Italic" />
                    <IconButton icon={<FiUnderline />} aria-label="Underline" />
                  </ButtonGroup>
                  <Divider orientation="vertical" />
                  <IconButton icon={<FiLink />} aria-label="Create link" />
                  <Spacer />
                  <Button variant="primary" si>
                    Save
                  </Button>
                </ButtonGroup>
              </Card>
            </HStack>
          </VStack>
        </Stack>
      </Box>
    </Box>
  )
}

const Upgrade = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef<HTMLButtonElement>(null)
  return (
    <>
      <Alert
        status="info"
        alignItems="flex-start"
        colorScheme="primary"
        width="460px"
      >
        <Box width="100%">
          <HStack mb="2" spacing="0">
            <AlertIcon />
            <AlertTitle>This feature requires the Pro plan</AlertTitle>
          </HStack>

          <AlertDescription>
            Upgrade your subscription to start using this feature.
          </AlertDescription>
        </Box>
        <Box>
          <Button
            variant="outline"
            colorScheme="primary"
            size="sm"
            onClick={onOpen}
          >
            Upgrade
          </Button>
        </Box>
      </Alert>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="solid"
                colorScheme="red"
                onClick={onClose}
                ml={3}
              >
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
}

const members = [
  {
    name: 'Renata Alink',
    email: 'hello@saas-ui.dev',
    presence: 'online',
    status: 'owner',
    avatar: '/showcase-avatar.jpg',
  },
  {
    name: 'Selini Shanta',
    email: 'selini@saas-ui.dev',
    status: 'invited',
    avatar: '/showcase-avatar2.jpg',
  },
]

const Members = () => {
  return (
    <Card width="600px">
      <CardHeader>
        <Stack spacing="1">
          <Heading size="sm" fontWeight="semibold">
            Members
          </Heading>
          <Text color="muted">Manage and invite your colleagues</Text>
        </Stack>
      </CardHeader>
      <ButtonGroup px="3" py="3" borderTopWidth="1px">
        <Box>
          <SearchInput placeholder="Filter by name or email" size="sm" />
        </Box>
        <Spacer />
        <Button colorScheme="primary" variant="solid">
          Invite people
        </Button>
      </ButtonGroup>
      <StructuredList>
        {members.map((member) => (
          <StructuredListItem
            borderBottomWidth="1px"
            sx={{ '&:last-of-type': { borderWidth: 0 } }}
          >
            <StructuredListIcon>
              <PersonaAvatar
                name={member.name}
                presence={member.presence}
                src={member.avatar}
                size="xs"
              />
            </StructuredListIcon>
            <StructuredListCell flex="1">
              <Heading size="xs" fontWeight="medium">
                {member.name || member.email}
              </Heading>
              <Text color="muted" size="sm">
                {member.name ? member.email : null}
              </Text>
            </StructuredListCell>
            <StructuredListCell>
              <Tag size="sm">{member.status}</Tag>
            </StructuredListCell>
            <StructuredListCell>
              <Menu>
                <MenuButton
                  as={IconButton}
                  icon={<FiMoreVertical />}
                  px="0"
                  size="xs"
                  variant="ghost"
                />
                <MenuList>
                  <MenuItem>Remove</MenuItem>
                </MenuList>
              </Menu>
            </StructuredListCell>
          </StructuredListItem>
        ))}
      </StructuredList>
    </Card>
  )
}

const Profile = () => {
  return (
    <Card width="320px">
      <CardHeader pb="2">
        <Stack spacing="1">
          <Heading size="sm" fontWeight="semibold">
            Details
          </Heading>
        </Stack>
      </CardHeader>
      <PropertyList px="4" pb="2">
        <Property
          label="Name"
          value={
            <Editable defaultValue="Eelco">
              <EditablePreview />
              <EditableInput />
            </Editable>
          }
        />
        <Property
          label="Status"
          value={
            <Select name="status" value="Open" size="xs">
              <SelectButton w="full" />
              <SelectList>
                <SelectOption value="Open">Open</SelectOption>
                <SelectOption value="Closed">Closed</SelectOption>
              </SelectList>
            </Select>
          }
        />
      </PropertyList>
    </Card>
  )
}
