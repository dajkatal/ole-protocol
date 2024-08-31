import * as React from 'react'
import { Heading, useBreakpointValue } from '@chakra-ui/react'
import { Has } from '@saas-ui-pro/feature-flags'
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarLink,
  AppShell,
} from '@saas-ui/react'
import { FiFolder, FiUser } from 'react-icons/fi'

import { usePath } from '@app/features/common/hooks/use-path'
import { useActivePath } from '@app/nextjs'

const SettingsLink = (props: { path: string; label: string }) => {
  const { path, label } = props
  const href = usePath(`/settings${path}`)
  return (
      <NavbarLink href={href} isActive={useActivePath(href)}>
        {label}
      </NavbarLink>
  )
}

export const SettingsNavbar = () => {
  return (
      <AppShell
          navbar={
            <Navbar
                position="sticky"
                borderBottomWidth="1px"
                background="transparent"
                backdropFilter="blur(10px)"
            >
              <NavbarBrand>
                <Heading as="h1" fontSize="xl">
                  Settings
                </Heading>
              </NavbarBrand>
              <NavbarContent>
                <Has feature="settings">
                  <NavbarItem icon={<FiFolder />} label="Organization">
                    <SettingsLink path="/" label="Overview" />
                    <SettingsLink path="/organization" label="Organization" />
                    <SettingsLink path="/members" label="Members" />
                    <SettingsLink path="/plans" label="Plans" />
                    <SettingsLink path="/billing" label="Billing" />
                  </NavbarItem>
                </Has>
                <NavbarItem icon={<FiUser />} label="Account">
                  <SettingsLink path="/account" label="Profile" />
                  <SettingsLink path="/account/security" label="Security" />
                  <SettingsLink path="/account/notifications" label="Notifications" />
                  <SettingsLink path="/account/api" label="Api" />
                </NavbarItem>
              </NavbarContent>
            </Navbar>
          }
      >
        {/* Your main content here */}
      </AppShell>
  )
}

export default SettingsNavbar
