import {
    AppShell,
    Sidebar,
    SidebarSection,
    NavItem,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    SearchInput,
} from '@saas-ui/react'
import {
    Box,
    Spacer,
    Button,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react'
import {
    PersonaAvatar,
} from '@saas-ui/react'
import { FiHome, FiUsers } from 'react-icons/fi'


import {Logo} from "../landingpage/data/logo";

export default function DashboardPage() {
    return (
        <AppShell
            variant="static"
            minH="$100vh"
            sidebar={
                <Sidebar width="30%" toggleBreakpoint="sm">
                    <SidebarSection direction="row">
                        <Logo width="30px" />
                        <Spacer />
                        <Menu>
                            <MenuButton
                                as={IconButton}
                                icon={
                                    <PersonaAvatar
                                        presence="online"
                                        size="xs"
                                        src="/img/showcase-avatar.jpg"
                                    />
                                }
                                variant="ghost"
                            />
                            <MenuList>
                                <MenuItem>Sign out</MenuItem>
                            </MenuList>
                        </Menu>
                    </SidebarSection>
                    <SidebarSection flex="1" overflowY="auto">
                        <NavItem icon={<FiHome size="1.2em" />}>Home</NavItem>
                        <NavItem icon={<FiUsers size="1.2em" />}>Contacts</NavItem>
                    </SidebarSection>
                </Sidebar>
            }
        >
            <Box as="main" flex="1" py="2" px="4">
                Your application content
            </Box>
        </AppShell>
    )
}