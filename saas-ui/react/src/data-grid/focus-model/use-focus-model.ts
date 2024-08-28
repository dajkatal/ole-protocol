import React from 'react'

import {
  Cell,
  Row,
  RowData,
  RowSelectionState,
  Table,
} from '@tanstack/react-table'

import { FocusModel, FocusModelOptions, FocusState } from './focus-model'

export interface FocusModelProps<TData extends RowData>
  extends Pick<FocusModelOptions, 'mode'> {
  rootRef?: React.RefObject<HTMLDivElement | HTMLTableElement>
  table: Table<TData>
  onFocusChange?: (details: {
    row: Row<TData>
    cell: Cell<TData, unknown>
  }) => void
}

export const useFocusModel = <TData extends RowData>(
  props: FocusModelProps<TData>,
) => {
  const { mode = 'list', table, onFocusChange } = props

  const gridRef = React.useRef<HTMLTableElement | HTMLDivElement>(null)

  const [focus, setFocus] = React.useState<FocusState>({
    row: 0,
    column: 0,
  })

  const [focusModel, setFocusModel] = React.useState<FocusModel | null>(null)

  React.useEffect(() => {
    if (!gridRef.current) {
      return
    }

    const focusModel = new FocusModel(gridRef.current, {
      mode,
      onFocusChange: (state) => {
        setFocus(state)

        if (onFocusChange) {
          const row = table.getRowModel().rows[state.row]
          const cell = row.getVisibleCells()[state.column]
          onFocusChange({ row, cell })
        }
      },
      getSelectedRows: () => {
        return Object.keys(table.getState().rowSelection)
      },
      onSelectRows: (start, end) => {
        const rows = table.getRowModel().rows

        if (!end) {
          rows[start].toggleSelected(true)
          return
        }

        const selectIds = rows
          .slice(start, end + 1)
          .map((row) => row.id)
          .filter(Boolean)

        table.setRowSelection(() => {
          const selections: RowSelectionState = {}

          for (const id of selectIds) {
            selections[id] = true
          }

          return selections
        })
      },
      onToggleRowSelected: (rowIndex) => {
        const row = table.getRowModel().rows[rowIndex]
        if (row.getCanSelect()) {
          row.toggleSelected(!row.getIsSelected())
        }
      },
      onCollapseRow: (row) => {
        table.getRowModel().rows[row]?.toggleExpanded(false)
      },
    })

    setFocusModel(focusModel)

    return () => {
      focusModel?.destroy()
    }
  }, [])

  const getRowProps = React.useCallback(
    (row: Row<TData>) => {
      const rowIndex = table.getRowModel().rows.indexOf(row)

      if (mode === 'grid') {
        return {
          'data-row': rowIndex,
        }
      } else if (mode !== 'list') {
        return
      }

      return {
        tabIndex: rowIndex === focus.row ? 0 : -1,
        ['data-row']: rowIndex,
      }
    },
    [mode, focus.row],
  )

  const getCellProps = React.useCallback(
    (cell: Cell<TData, any>) => {
      if (mode !== 'grid') {
        return
      }

      const visibleColumns = table.getVisibleFlatColumns()
      const columnIndex = visibleColumns.findIndex(
        (col) => col.id === cell.column.id,
      )

      const isFocused = (row: number, column: number) =>
        row === focus.row && column === focus.column

      return {
        tabIndex: isFocused(cell.row.index, columnIndex) ? 0 : -1,
        ['data-col']: columnIndex,
      }
    },
    [mode, focus],
  )

  return {
    getRowProps,
    getCellProps,
    gridRef,
    setFocusedRow: focusModel?.setFocusedRow,
    setFocusedCell: focusModel?.setFocusedCol,
  }
}
