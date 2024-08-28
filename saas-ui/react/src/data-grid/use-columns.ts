import {
  ColumnDef,
  ColumnHelper,
  RowData,
  createColumnHelper,
} from '@tanstack/react-table'
import React from 'react'

/**
 * Returns a memoized array of columns.
 *
 * @see https://tanstack.com/table/v8/docs/guide/column-defs#column-helpers
 *
 * @param columnHelper Tanstack table column helper
 */
export const useColumns = <Data extends RowData, Columns = unknown>(
  factory: (
    columnHelper: Pick<ColumnHelper<Data>, 'accessor' | 'display'>,
  ) => Array<Columns>,
  deps: React.DependencyList,
) =>
  React.useMemo(() => {
    const columnHelper = createColumnHelper<Data>()
    return factory(columnHelper) as Array<ColumnDef<Data>>
  }, [...deps])
