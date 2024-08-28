'use client'

import * as React from 'react'

import {
  Button,
  ButtonGroup,
  ButtonGroupProps,
  ButtonProps,
  HTMLChakraProps,
  IconButton,
  Input,
  InputProps,
  MenuButton,
  MenuButtonProps,
  MenuItem,
  MenuProps,
  Portal,
  PortalProps,
  SystemProps,
  SystemStyleObject,
  ThemingProps,
  Wrap,
  WrapItem,
  WrapProps,
  chakra,
  createStylesContext,
  forwardRef,
  useMultiStyleConfig,
  useStyleConfig,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { MenuDialogListProps } from '@saas-ui/react'

import { XIcon } from '../icons'
import { ResponsiveMenu, ResponsiveMenuList } from '../menu'
import { createSplitProps, splitProps } from '../utils/split-props'
import { FilterItem, FilterItems, FilterMenu } from './filter-menu'
import { FilterOperatorId, FilterType } from './operators'
import { useFiltersContext } from './provider'
import {
  ActiveFilterContextValue,
  ActiveFilterProvider,
  ActiveFilterValueOptions,
  Filter,
  FilterValue,
  UseFilterOperatorProps,
  useActiveFilter,
  useActiveFilterContext,
  useFilterOperator,
  useFilterValue,
} from './use-active-filter'

export type FilterRenderFn = (
  context: ActiveFilterContextValue,
) => React.ReactNode

const [StylesProvider, useStyles] = createStylesContext('SuiActiveFilter')

export interface ActiveFilterOptions {
  id: string
  icon?: React.ReactNode
  label?: string
  value?: FilterValue
  defaultValue?: FilterValue
  items?: FilterItems
  operators?: FilterItem[]
  operator?: FilterOperatorId
  defaultOperator?: FilterOperatorId
  type?: FilterType
  onRemove?(): void
  onChange?(filter: Filter): void
  onOperatorChange?(id: FilterOperatorId): void
  onValueChange?(value: FilterValue): void
  /**
   * Custom label formatter
   */
  formatLabel?(label?: string): string
  /**
   * Format the value of the filter, eg timestamps, numbers, etc.
   */
  formatValue?(value: FilterValue): string
  /**
   * Render the value of the filter, can render custom components like inputs.
   * Return `undefined` to use the default value rendering
   */
  renderValue?: FilterRenderFn
  /**
   * Enable multiple select
   */
  multiple?: boolean
}

export interface ActiveFilterProps
  extends Omit<ActiveFilterContainerProps, 'id' | 'onChange' | 'defaultValue'>,
    ActiveFilterOptions {}

const splitActiveFilterProps = createSplitProps<ActiveFilterOptions>([
  'defaultOperator',
  'defaultValue',
  'formatLabel',
  'formatValue',
  'icon',
  'id',
  'items',
  'label',
  'multiple',
  'onChange',
  'onOperatorChange',
  'onRemove',
  'onValueChange',
  'operator',
  'operators',
  'renderValue',
  'type',
  'value',
])

export const ActiveFilter: React.FC<ActiveFilterProps> = (props) => {
  const [filterProps, containerProps] = splitActiveFilterProps(props)

  const {
    icon,
    label,
    value,
    defaultValue,
    items,
    operators,
    operator,
    defaultOperator,
    onRemove,
    formatLabel,
    formatValue,
    renderValue,
    multiple,
  } = filterProps

  const { filter, onOperatorChange, onValueChange } =
    useActiveFilter(filterProps)

  const context: ActiveFilterContextValue = {
    ...filter,
    items,
    value: defaultValue || value,
    label,
    onValueChange,
  }

  return (
    <ActiveFilterProvider value={context}>
      <ActiveFilterContainer {...containerProps}>
        <ActiveFilterLabel icon={icon}>
          {formatLabel?.(label) || label}
        </ActiveFilterLabel>
        <ActiveFilterOperator
          items={operators}
          value={operator}
          defaultValue={defaultOperator}
          onChange={onOperatorChange}
        />
        <ActiveFilterValue
          items={items}
          value={value}
          defaultValue={defaultValue}
          onChange={onValueChange}
          multiple={multiple}
          format={formatValue}
        >
          {renderValue?.(context)}
        </ActiveFilterValue>
        <ActiveFilterRemove
          onClick={onRemove}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              onRemove?.()
            }
          }}
        />
      </ActiveFilterContainer>
    </ActiveFilterProvider>
  )
}

ActiveFilter.displayName = 'ActiveFilter'

export const ActiveFilterValueInput: React.FC<InputProps> = (props) => {
  const { value, onValueChange } = useActiveFilterContext()

  return (
    <Input
      type="text"
      value={value?.toString()}
      size="sm"
      autoFocus
      variant="plain"
      width="80px"
      px="0"
      bg="none"
      borderRadius="0"
      placeholder="Enter a value..."
      onChange={(e) => {
        onValueChange?.(e.target.value)
      }}
      {...props}
    />
  )
}

export interface ActiveFilterContainerProps
  extends Omit<ButtonGroupProps, 'size' | 'variant' | 'colorScheme'>,
    ThemingProps<'ActiveFilter'> {}

export const ActiveFilterContainer: React.FC<ActiveFilterContainerProps> = (
  props,
) => {
  const { children, ...rest } = props

  const styles = useMultiStyleConfig('SuiActiveFilter', props) as Record<
    string,
    SystemStyleObject
  >

  const containerStyles: SystemStyleObject = {
    borderWidth: '1px',
    borderRadius: 'md',
    display: 'flex',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <ButtonGroup
        variant="ghost"
        isAttached
        {...rest}
        sx={containerStyles}
        className={cx('sui-active-filter', props.className)}
      >
        {children}
      </ButtonGroup>
    </StylesProvider>
  )
}

ActiveFilterContainer.displayName = 'ActiveFilterContainer'

export interface ActiveFilterLabelProps extends HTMLChakraProps<'div'> {
  icon?: React.ReactNode
  iconSpacing?: SystemProps['marginRight']
}

export const ActiveFilterLabel: React.FC<ActiveFilterLabelProps> = (props) => {
  const { children, icon, iconSpacing = 2, ...rest } = props

  const styles = useStyles()

  const labelStyles: SystemStyleObject = {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    ...styles.label,
  }

  const _icon = React.isValidElement(icon)
    ? React.cloneElement<any>(icon, {
        'aria-hidden': true,
        focusable: false,
      })
    : null

  return (
    <chakra.div
      {...rest}
      __css={labelStyles}
      className={cx('sui-active-filter__label', props.className)}
    >
      {_icon && (
        <chakra.span marginEnd={iconSpacing} display="inline-flex">
          {_icon}
        </chakra.span>
      )}
      <chakra.span>{children}</chakra.span>
    </chakra.div>
  )
}

ActiveFilterLabel.displayName = 'ActiveFilterLabel'

export interface ActiveFilterOperatorProps
  extends Omit<MenuProps, 'children'>,
    UseFilterOperatorProps {
  items?: FilterItem[]
  buttonProps?: MenuButtonProps
  menuListProps?: MenuDialogListProps
  portalProps?: PortalProps
  children?: React.ReactNode
}

/**
 * ActiveFilterOperator
 */
export const ActiveFilterOperator: React.FC<ActiveFilterOperatorProps> = (
  props,
) => {
  const { items, buttonProps, menuListProps, portalProps, ...rest } = props

  const styles = useStyles()

  const operatorStyles: SystemStyleObject = {
    color: 'muted',
    px: 2,
    minWidth: 0,
    ...styles.operator,
  }

  const { label, getItemProps } = useFilterOperator(props)

  return (
    <ResponsiveMenu {...rest}>
      <MenuButton
        as={ActiveFilterButton}
        sx={operatorStyles}
        {...buttonProps}
        className={cx('sui-active-filter__operator')}
      >
        {label}
      </MenuButton>
      <Portal {...portalProps}>
        <ResponsiveMenuList zIndex="dropdown" {...menuListProps}>
          {items?.map((item) => (
            <MenuItem key={item.id} icon={item.icon} {...getItemProps(item)}>
              {item.label}
            </MenuItem>
          ))}
        </ResponsiveMenuList>
      </Portal>
    </ResponsiveMenu>
  )
}

ActiveFilterOperator.displayName = 'ActiveFilterOperator'

export interface ActiveFilterValueProps
  extends ActiveFilterValueOptions,
    Omit<HTMLChakraProps<'div'>, 'onChange' | 'defaultValue' | 'value'> {}

export const ActiveFilterValue: React.FC<ActiveFilterValueProps> = (props) => {
  const { children, ...rest } = props

  const [, htmlProps] = splitProps(rest, [
    'defaultValue',
    'items',
    'multiple',
    'onChange',
    'value',
  ])

  const styles = useStyles()

  const valueStyles: SystemStyleObject = {
    display: 'flex',
    alignItems: 'center',
    px: 2,
    ...styles.value,
  }

  const { item, label, getMenuProps, isLoading } = useFilterValue(props)

  const [, menuProps] = splitProps(getMenuProps(), ['icon'])

  if (menuProps.items?.length) {
    return (
      <FilterMenu
        {...menuProps}
        buttonProps={{
          as: ActiveFilterButton,
          leftIcon: item?.icon,
          isLoading,
        }}
      />
    )
  }

  return (
    <chakra.div
      {...htmlProps}
      __css={valueStyles}
      className={cx('sui-active-filter__value', props.className)}
    >
      {children || label}
    </chakra.div>
  )
}

ActiveFilterValue.displayName = 'ActiveFilterValue'

export interface ActiveFilterRemoveProps extends HTMLChakraProps<'button'> {}

export const ActiveFilterRemove: React.FC<ActiveFilterRemoveProps> = (
  props,
) => {
  const styles = useStyles()

  const removeStyles = {
    px: 2,
    fontSize: '1.2em',
    ...styles.remove,
  }
  return (
    <IconButton
      icon={<XIcon />}
      as="div"
      aria-label="Remove filter"
      role="button"
      tabIndex={0}
      {...props}
      sx={removeStyles}
      className={cx('sui-active-filter__remove', props.className)}
    />
  )
}

ActiveFilterRemove.displayName = 'ActiveFilterRemove'

const ActiveFilterButton = forwardRef<ButtonProps, 'div'>((props, ref) => {
  const styles = useStyles()

  const buttonStyles = {
    fontWeight: 'normal',
    px: '2',
    rounded: 'none',
    ...styles.valueButton,
  }

  return (
    <Button
      as="div"
      role="button"
      tabIndex={0}
      {...props}
      sx={{
        ...buttonStyles,
        ...props.sx,
      }}
      ref={ref}
    />
  )
})

ActiveFilterButton.displayName = 'ActiveFilterButton'

export interface ActiveFiltersListProps
  extends WrapProps,
    ThemingProps<'SuiActiveFiltersList'> {
  formatValue?(value: FilterValue): string
  renderValue?: FilterRenderFn
}

export const ActiveFiltersList: React.FC<ActiveFiltersListProps> = (props) => {
  const { formatValue, renderValue, children, size, ...rest } = props
  const {
    activeFilters,
    getOperators,
    getFilter,
    enableFilter,
    disableFilter,
  } = useFiltersContext()

  const styles = useStyleConfig('SuiActiveFiltersList', props)

  return activeFilters?.length ? (
    <Wrap {...rest} __css={styles}>
      {activeFilters?.map((activeFilter) => {
        const { key, id, value, operator } = activeFilter

        const filter = getFilter(id)

        const operators = getOperators(filter?.type).filter(({ id }) => {
          if (filter?.operators && !filter.operators.includes(id)) {
            return false
          }

          return true
        })

        const multiple = !!filter?.multiple

        const activeFilterProps: ActiveFilterProps = {
          id,
          value,
          operator,
          multiple,
          icon: filter?.icon,
          label: filter?.activeLabel || filter?.label,
          placeholder: filter?.label,
          defaultOperator: filter?.defaultOperator,
          items: filter?.items,
          operators,
          type: filter?.type,
          size,
          onValueChange: (value: FilterValue) => {
            enableFilter({ key, ...activeFilter, value })
          },
          onOperatorChange: (operator: FilterOperatorId) => {
            enableFilter({ key, ...activeFilter, operator })
          },
          onRemove: () => key && disableFilter(key),
          formatValue,
          renderValue,
        }

        return (
          <WrapItem key={key}>
            <ActiveFilter {...activeFilterProps} />
          </WrapItem>
        )
      })}
      {children}
    </Wrap>
  ) : null
}

export const ResetFilters: React.FC<ButtonProps> = (props) => {
  const { children, ...rest } = props
  const { reset } = useFiltersContext()
  return (
    <Button variant="ghost" size="sm" {...rest} onClick={reset}>
      {children}
    </Button>
  )
}
