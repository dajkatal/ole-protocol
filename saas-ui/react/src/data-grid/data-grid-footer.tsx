import { Td, Tfoot, Tr } from '@chakra-ui/react'
import { runIfFn } from '@chakra-ui/utils'
import { flexRender } from '@tanstack/react-table'

import { useDataGridContext } from './data-grid-context'
import { useColumnVirtualizerPadding } from './data-grid-virtualizer'
import { escapeId } from './data-grid.utils'

export function DataGridFooter() {
  const { instance, slotProps, virtualizer } = useDataGridContext()

  const footerGroups = instance.getFooterGroups()

  if (!footerGroups.length) return null

  const { virtualPaddingLeft, virtualPaddingRight } =
    useColumnVirtualizerPadding(virtualizer?.column)

  const virtualColumns = virtualizer?.column?.getVirtualItems()

  return (
    <Tfoot>
      {footerGroups.map((footerGroup) => {
        const headers = virtualColumns ?? footerGroup.headers

        return (
          <Tr key={footerGroup.id}>
            {virtualPaddingLeft ? (
              <th style={{ display: 'flex', width: virtualPaddingLeft }} />
            ) : null}
            {headers.map((vc) => {
              const header = 'column' in vc ? vc : footerGroup.headers[vc.index]

              const colId = escapeId(header.id)

              const footerProps = runIfFn(slotProps?.footer, {
                header,
                table: instance,
              })

              return (
                <Td
                  key={header.id}
                  flex={`1 0 calc(var(--col-${colId}-size) * 1px)`}
                  width={`calc(var(--col-${colId}-size) * 1px)`}
                  minWidth={`max(var(--col-${colId}-size) * 1px, 40px)`}
                  {...footerProps}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext(),
                      )}
                </Td>
              )
            })}
            {virtualPaddingRight ? (
              <th style={{ display: 'flex', width: virtualPaddingRight }} />
            ) : null}
          </Tr>
        )
      })}
    </Tfoot>
  )
}
