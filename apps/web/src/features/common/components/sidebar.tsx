import * as React from 'react'
import {
    AppShell,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarLink,
} from '@saas-ui/react'
import {Box} from '@chakra-ui/react'
import {FiUser} from 'react-icons/fi'
import {Logo} from '../../../landingpage/data/logo' // Adjust the import path for your project
import {UserMenu} from './user-menu'
import {useActivePath} from "@app/nextjs";
import ConnectButton from "@app/features/common/components/connectbtn"; // Adjust the import path for your project
import {FaDiscord, FaGithub, FaTwitter} from 'react-icons/fa'

export const AppSidebar: React.FC = () => {
    return (
        <AppShell
            navbar={
                <Navbar
                    position="relative"
                    borderBottomWidth="1px"
                    background="transparent"
                    backdropFilter="blur(10px)"
                >
                    {/* Navbar brand/logo */}
                    <NavbarBrand>
                        <Logo width={'80px'}/> {/* Adjust the logo component and size as needed */}
                    </NavbarBrand>

                    {/* Navbar links */}
                    <NavbarContent>
                        <NavbarItem>
                            <NavbarLink href="/dashboard" isActive={useActivePath('dashboard', {end: true})}
                                        sx={{
                                            mr: '10px !important',
                                            bg: useActivePath('dashboard', {end: true}) ? 'var(--chakra-colors-whiteAlpha-200)' : 'inherit', // Apply background only when active
                                            borderRadius: 'md',
                                            _hover: {
                                                bg: 'var(--chakra-colors-whiteAlpha-200)', // Background color on hover
                                                textDecoration: 'none'
                                            },
                                        }}
                            >
                                Dashboard
                            </NavbarLink>
                        </NavbarItem>
                        <NavbarItem>
                            <NavbarLink href="/dashboard/supply" isActive={useActivePath('supply', {end: true})}
                                        sx={{
                                            bg: useActivePath('supply', {end: true}) ? 'var(--chakra-colors-whiteAlpha-200)' : 'inherit', // Apply background only when active
                                            borderRadius: 'md',
                                            _hover: {
                                                bg: 'var(--chakra-colors-whiteAlpha-200)', // Background color on hover
                                                textDecoration: 'none'
                                            },
                                        }}
                            >
                                Supply a Loan
                            </NavbarLink>
                        </NavbarItem>
                        <NavbarItem>
                            <NavbarLink href="/dashboard/request" isActive={useActivePath('request', {end: true})}
                                        sx={{
                                            ml: '10px !important',
                                            bg: useActivePath('request', {end: true}) ? 'var(--chakra-colors-whiteAlpha-200)' : 'inherit', // Apply background only when active
                                            borderRadius: 'md',
                                            _hover: {
                                                bg: 'var(--chakra-colors-whiteAlpha-200)', // Background color on hover
                                                textDecoration: 'none'
                                            },
                                        }}
                            >
                                Request Loan
                            </NavbarLink>
                        </NavbarItem>
                    </NavbarContent>

                    {/* User profile menu */}
                    <NavbarContent justifyContent="flex-end">
                        <NavbarItem>
                            <NavbarLink
                                as="a"
                                href="https://x.com/oleprotocol"
                                aria-label="Share on Twitter"
                            >
                                <FaTwitter/>
                            </NavbarLink>
                        </NavbarItem>
                        <NavbarItem sx={{mr: '10px'}}>
                            <NavbarLink
                                as="a"
                                href="https://github.com/dajkatal/ole-protocol"
                                aria-label="Star on Github"
                            >
                                <FaGithub/>
                            </NavbarLink>
                        </NavbarItem>

                        <NavbarItem>
                            <UserMenu icon={<FiUser/>}/> {/* This is your profile icon/menu component */}
                        </NavbarItem>
                    </NavbarContent>
                    <ConnectButton/>
                </Navbar>
            }
        >
            <Box as="main" flex="1" py="2" px="4">
                {/* Main content goes here */}
            </Box>
        </AppShell>
    )
}

export default AppSidebar
