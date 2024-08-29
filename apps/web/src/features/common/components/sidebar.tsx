import * as React from 'react'

import {
  Badge,
  Box,
  IconButton,
  Spacer,
  Text,
  useBreakpointValue,
  useControllableState,
} from '@chakra-ui/react'
import {
  Command,
  ResizeHandle,
  ResizeHandler,
  Resizer,
} from '@saas-ui-pro/react'
import {
  NavGroup,
  NavItem,
  NavItemProps,
  Sidebar,
  SidebarOverlay,
  SidebarProps,
  SidebarSection,
  SidebarToggleButton,
  useHotkeysShortcut,
  useLocalStorage,
  useSidebarContext,
} from '@saas-ui/react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useParams, useRouter } from 'next/navigation'
import {
  FiHelpCircle,
  FiHome,
  FiInbox,
  FiPlus,
  FiSearch,
  FiUsers,
} from 'react-icons/fi'

import { usePath } from '@app/features/common/hooks/use-path'
import { useActivePath } from '@app/nextjs'

import { Tags, User, getTags } from '@api/client'

import {
  ElectronNav,
  InviteDialog,
  SortableNavGroup,
  SortableNavItem,
  useHelpCenter,
  useModals,
} from '@ui/lib'

import { useCurrentUser } from '../hooks/use-current-user'
import { GlobalSearchInput } from './global-search-input'
import { UserMenu } from './user-menu'
import { WorkspacesMenu } from './workspaces-menu'
import {Logo} from "../../../landingpage/data/logo";

export interface AppSidebarProps extends SidebarProps {}

export const AppSidebar: React.FC<AppSidebarProps> = (props) => {
  const user = useCurrentUser()
  const modals = useModals()
  const help = useHelpCenter()

  const [width, setWidth] = useLocalStorage('app.sidebar.width', 280)

  const { variant, colorScheme } = props
  const isCompact = variant === 'compact'

  const onResize: ResizeHandler = ({ width }) => {
    setWidth(width)
  }

  return (
    <Resizer
      defaultWidth={isCompact ? 60 : width}
      onResize={onResize}
      isResizable={useBreakpointValue(
        { base: false, lg: true },
        { fallback: 'lg' },
      )}
    >
      <Sidebar {...props} variant={variant} colorScheme={colorScheme}>
        <SidebarToggleButton />
        <ElectronNav />
        <SidebarSection direction="row">
          <Logo width={'30px'} compact={isCompact} />
          {!isCompact && (
            <>
              <Spacer />
              <UserMenu />
            </>
          )}
        </SidebarSection>
        <Box px={3}>
          {isCompact ? (
            <IconButton icon={<FiSearch />} aria-label="Search" />
          ) : (
            <GlobalSearchInput />
          )}
        </Box>
        <SidebarSection overflowY="auto" flex="1">
          <NavGroup>
            <AppSidebarLink
              href={usePath()}
              label="Dashboard"
              icon={<FiHome />}
              hotkey="navigation.dashboard"
            />
            <AppSidebarLink
              href={usePath('inbox')}
              isActive={useActivePath('inbox', { end: false })}
              label="Inbox"
              badge={2}
              icon={<FiInbox />}
              hotkey="navigation.inbox"
            />
            <AppSidebarLink
              href={usePath('contacts')}
              isActive={useActivePath('contacts', { end: false })}
              label="Contacts"
              icon={<FiUsers />}
              hotkey="navigation.contacts"
            />
          </NavGroup>

          {!isCompact && user && <AppSidebarTags user={user} />}

          <Spacer />

          <NavGroup>
            <NavItem
              onClick={() =>
                modals.open(InviteDialog, {
                  title: 'Invite people',
                  onInvite: async () => {
                    // TODO: handle invite
                  },
                })
              }
              color="sidebar-muted"
              icon={<FiPlus />}
            >
              Invite people
            </NavItem>
            <NavItem
              onClick={() => help.open()}
              color="sidebar-muted"
              icon={<FiHelpCircle />}
            >
              Help &amp; support
            </NavItem>
          </NavGroup>
        </SidebarSection>

        {isCompact ? (
          <SidebarSection>
            <UserMenu />
          </SidebarSection>
        ) : (
          <SidebarSection>
          </SidebarSection>
        )}

        <SidebarOverlay />
        <ResizeHandle />
      </Sidebar>
    </Resizer>
  )
}

interface AppSidebarlink extends NavItemProps {
  hotkey: string
  href: string
  label: string
  badge?: React.ReactNode
}

const AppSidebarLink: React.FC<AppSidebarlink> = (props) => {
  const { href, label, hotkey, badge, ...rest } = props
  const { push } = useRouter()
  const isActive = useActivePath(href)

  const { variant } = useSidebarContext()

  const command = useHotkeysShortcut(
    hotkey,
    () => {
      push(href)
    },
    [href],
  )

  return (
    <NavItem
      href={href}
      isActive={isActive}
      {...rest}
      tooltipProps={{
        label: (
          <>
            {label} <Command>{command}</Command>
          </>
        ),
      }}
    >
      <Box as="span" noOfLines={1}>
        {label}
      </Box>

      {typeof badge !== 'undefined' && variant !== 'compact' ? (
        <Badge borderRadius="sm" ms="auto" px="1.5" bg="none">
          {badge}
        </Badge>
      ) : null}
    </NavItem>
  )
}

const AppSidebarTags = ({ user }: { user: User }) => {
  const queryClient = useQueryClient()
  const query = useParams()

  const userTags = user.workspace?.tags || []

  const mutation = useMutation({
    mutationFn: async (tags: string[]) => {
      /**
       * This just updates the local cache, you should also update the server.
       */
      queryClient.setQueryData<any>(
        ['CurrentUser'],
        (data: { currentUser: User }) => ({
          currentUser: {
            ...data.currentUser,
            workspace: {
              ...data?.currentUser?.workspace,
              tags,
            },
          },
        }),
      )
    },
  })

  const getSortedTags = React.useCallback(
    (tags: Tags) => {
      return userTags
        .map((id) => tags.find((tag) => tag.id === id))
        .filter(Boolean) as Tags
    },
    [userTags],
  )

  const { data } = useQuery({
    queryKey: ['GetTags'],
    queryFn: async () => {
      const data = await getTags()
      setTags(getSortedTags(data?.tags || []))
      return data
    },
  })

  const [sortedTags, setTags] = useControllableState<Tags>({
    defaultValue: getSortedTags(data?.tags || []),
    onChange(tags) {
      if (sortedTags.length) {
        mutation.mutate(tags.map(({ id }) => id))
      }
    },
  })

  const basePath = usePath(`/tag/`)

  if (!sortedTags.length) {
    return null
  }

  return (
    <SortableNavGroup
      title="Tags"
      isCollapsible
      items={sortedTags}
      onSorted={setTags}
    >
      {sortedTags.map((tag) => (
        <SortableNavItem
          key={tag.id}
          id={tag.id}
          my="0"
          href={`${basePath}/${tag.id}`}
          isActive={query.tag === tag.id}
          icon={
            <Badge
              bg={tag.color}
              boxSize="2"
              borderRadius="full"
              variant="solid"
            />
          }
        >
          <Text>{tag.label}</Text>
          <Badge
            opacity="0.6"
            borderRadius="full"
            bg="none"
            ms="auto"
            fontWeight="medium"
          >
            {tag.count}
          </Badge>
        </SortableNavItem>
      ))}
    </SortableNavGroup>
  )
}
