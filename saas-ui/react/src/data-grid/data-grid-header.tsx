import { Th, chakra, useTableStyles } from '@chakra-ui/react'
import { dataAttr } from '@chakra-ui/utils'
import { Header, flexRender } from '@tanstack/react-table'

import { DataGridColumnResizer } from './data-grid-column-resizer'
import { DataGridSort } from './data-grid-sort'
import { escapeId } from './data-grid.utils'
import { getPinnedStyles, isGroupColumn } from './utils'

export interface DataGridHeaderProps<Data extends object, TValue> {
  header: Header<Data, TValue>
  isSortable?: boolean
}

export const DataGridHeader = <Data extends object, TValue>(
  props: DataGridHeaderProps<Data, TValue>,
) => {
  const { header, isSortable, ...rest } = props

  const styles = useTableStyles()

  let titleProps = {}

  const column = header.column

  if (isSortable && column.getCanSort()) {
    const sorted = column.getIsSorted()
    titleProps = {
      userSelect: 'none',
      cursor: 'pointer',
      tabIndex: 0,
      'aria-sort': sorted
        ? sorted === 'desc'
          ? 'descending'
          : 'ascending'
        : 'none',
      onClick: column.getToggleSortingHandler(),
      onKeyDown: (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
          column.toggleSorting()
        }
      },
    }
  }

  const isColumnPinned = !isGroupColumn(column) && column.getIsPinned()
  const isLast = column.getIsLastColumn(isColumnPinned)

  const headerStyle = getPinnedStyles(column)

  const meta = (header.column.columnDef.meta || {}) as any

  const colId = escapeId(header.id)

  return (
    <Th
      scope="col"
      colSpan={header.colSpan}
      isNumeric={meta.isNumeric}
      data-pinned={isColumnPinned ? isColumnPinned : undefined}
      data-last={dataAttr(isLast)}
      flex={`1 0 calc(var(--header-${colId}-size) * 1px)`}
      width={`calc(var(--header-${colId}-size) * 1px)`}
      minWidth={`max(var(--col-${colId}-size) * 1px, 40px)`}
      {...meta.headerProps}
      {...rest}
      style={{
        ...headerStyle,
        ...meta.headerProps?.style,
      }}
    >
      <chakra.div
        __css={styles.title}
        className="sui-data-grid__title"
        {...meta.titleProps}
        {...titleProps}
      >
        {flexRender(header.column.columnDef.header, header.getContext())}
        {isSortable && <DataGridSort header={header} />}
      </chakra.div>
      <DataGridColumnResizer header={header} />
    </Th>
  )
}

DataGridHeader.displayName = 'DataGridHeader'
