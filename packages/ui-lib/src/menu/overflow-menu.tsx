import {
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuProps,
  Portal,
} from '@chakra-ui/react'
import { LuMoreVertical } from 'react-icons/lu'

export interface OverflowMenuProps extends MenuProps {
  children: React.ReactNode
}

export const OverflowMenu: React.FC<OverflowMenuProps> = (props) => {
  const { children, ...rest } = props
  return (
    <Menu {...rest}>
      <MenuButton
        as={IconButton}
        icon={<LuMoreVertical />}
        aria-label="Actions"
        size="xs"
        variant="ghost"
      />
      <Portal>
        <MenuList>{children}</MenuList>
      </Portal>
    </Menu>
  )
}
