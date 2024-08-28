import { DataGridColumnMeta } from './data-grid.types'

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData, TValue>
    extends DataGridColumnMeta<TData, TValue> {}
}
