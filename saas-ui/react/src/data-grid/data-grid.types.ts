import {
  type BoxProps,
  HTMLChakraProps,
  TableCellProps,
  TableColumnHeaderProps,
  type TableProps,
  type TableRowProps,
} from '@chakra-ui/react'
import type { Cell, Header, Row } from '@tanstack/react-table'
import { Table as TableInstance } from '@tanstack/react-table'

import { DataGridExpanderProps } from './data-grid-expander'
import type { DataGridHeaderProps } from './data-grid-header.js'

export type {
  Table as TableInstance,
  ColumnDef,
  Row,
  SortingState,
  RowSelectionState,
  PaginationState,
  ColumnFiltersState,
  FilterFn,
  SortingFn,
  OnChangeFn,
} from '@tanstack/react-table'

export interface DataGridColumnMeta<TData, TValue> {
  /**
   * Will render a link with the href value in the cell.
   */
  href?: (row: TData) => string
  /**
   * Enables numeric cell styles.
   */
  isNumeric?: boolean
  /**
   * Enables text overflow.
   * @default true
   */
  isTruncated?: boolean
  /**
   * Custom header props
   */
  headerProps?: TableColumnHeaderProps
  /**
   * Custom title props
   */
  titleProps?: HTMLChakraProps<'div'>
  /**
   * Custom cell props
   */
  cellProps?: TableCellProps
  /**
   * Custom expander props
   */
  expanderProps?: DataGridExpanderProps
}

export type FocusChangeHandler<Data extends object = object> = (details: {
  row: Row<Data>
  cell: Cell<Data, unknown>
}) => void

export interface DataGridSlotProps<Data extends object = object> {
  container?: BoxProps | ((params: { table: TableInstance<Data> }) => BoxProps)
  inner?: BoxProps | ((params: { table: TableInstance<Data> }) => BoxProps)
  table?: TableProps | ((params: { table: TableInstance<Data> }) => TableProps)
  header?:
    | DataGridHeaderProps<Data, any>
    | ((params: {
        header: Header<Data, any>
        table: TableInstance<Data>
      }) => DataGridHeaderProps<Data, any>)
  row?:
    | TableRowProps
    | ((params: {
        row: Row<Data>
        table: TableInstance<Data>
      }) => TableRowProps)
  cell?:
    | TableCellProps
    | ((params: {
        cell: Cell<Data, any>
        table: TableInstance<Data>
      }) => TableCellProps)
  footer?:
    | TableCellProps
    | ((params: {
        header: Header<Data, any>
        table: TableInstance<Data>
      }) => TableCellProps)
}
