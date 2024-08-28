import { chakra } from '@chakra-ui/react'
import { Link } from '@saas-ui/react'
import { Cell, ColumnDef } from '@tanstack/react-table'

import { getResult } from './data-grid.utils'

export type DataGridCell<Data extends object> = ColumnDef<Data>['cell']

export const DefaultDataGridCell = <Data extends object, TValue>(
  props: Cell<Data, TValue>,
) => {
  const { column, row, getValue } = props

  const meta = column.columnDef.meta || {}

  let content = getValue<React.ReactNode>()

  if (meta.href) {
    const href = getResult(meta.href, row.original)
    content = <Link href={href}>{content}</Link>
  }

  if (typeof content === 'string') {
    content = (
      <chakra.span
        sx={
          meta.isTruncated !== false
            ? {
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }
            : {}
        }
      >
        {content}
      </chakra.span>
    )
  }

  return content
}

DefaultDataGridCell.displayName = 'DefaultDataTableCell'
