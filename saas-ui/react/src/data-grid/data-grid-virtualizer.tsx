import type { Virtualizer } from '@tanstack/react-virtual'

export function useColumnVirtualizerPadding(
  columnVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>,
) {
  let virtualPaddingLeft: number | undefined
  let virtualPaddingRight: number | undefined

  const virtualColumns = columnVirtualizer?.getVirtualItems()

  if (columnVirtualizer && virtualColumns?.length) {
    virtualPaddingLeft = virtualColumns[0]?.start ?? 0
    virtualPaddingRight =
      columnVirtualizer.getTotalSize() -
      (virtualColumns[virtualColumns.length - 1]?.end ?? 0)
  }

  return {
    virtualPaddingLeft,
    virtualPaddingRight,
  }
}

export function useRowVirtualizerPadding(
  rowVirtualizer?: Virtualizer<HTMLDivElement, HTMLTableRowElement>,
) {
  const virtualRows = rowVirtualizer?.getVirtualItems()

  let virtualPaddingTop: number = 0
  let virtualPaddingBottom: number = 0

  if (rowVirtualizer && virtualRows?.length) {
    const totalSize = rowVirtualizer?.getTotalSize()

    virtualPaddingTop =
      virtualRows.length > 0 ? virtualRows?.[0]?.start || 0 : 0
    virtualPaddingBottom =
      virtualRows.length > 0
        ? totalSize - (virtualRows?.[virtualRows.length - 1]?.end || 0)
        : 0
  }

  return {
    virtualPaddingTop,
    virtualPaddingBottom,
  }
}
