import { badgeTheme } from './badge'
import { buttonTheme } from './button'
import { cardTheme } from './card'
import { navItemTheme } from './nav-item'
import { navGroupTheme } from './nav-group'
import { menuTheme } from './menu'
import { toolbarTheme } from './toolbar'
import { tabsTheme } from './tabs'
import { tagTheme } from './tag'
import { tooltipTheme } from './tooltip'
import { structuredListTheme } from './structured-list'
import { selectTheme } from './select'
import Form from './form'

export const components = {
  Badge: badgeTheme,
  Button: buttonTheme,
  Card: cardTheme,
  Menu: menuTheme,
  Tabs: tabsTheme,
  Tag: tagTheme,
  Tooltip: tooltipTheme,
  SuiToolbar: toolbarTheme,
  SuiNavItem: navItemTheme,
  SuiNavGroup: navGroupTheme,
  SuiStructuredList: structuredListTheme,
  SuiSelect: selectTheme,
  ...Form,
}
