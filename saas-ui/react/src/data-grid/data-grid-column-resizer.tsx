import { chakra, useEnvironment, useTableStyles } from '@chakra-ui/react'
import { Header } from '@tanstack/react-table'

export interface DataGridColumnResizerProps<Data extends object, TValue> {
  header: Header<Data, TValue>
}
export const DataGridColumnResizer = <Data extends object, TValue>(
  props: DataGridColumnResizerProps<Data, TValue>,
) => {
  const { header, ...rest } = props

  const styles = useTableStyles()

  if (!header.column.getCanResize()) {
    return null
  }

  const env = useEnvironment()

  const document = env.getDocument()

  return (
    <chakra.div
      __css={styles.resizer}
      className="sui-data-grid__resizer"
      {...rest}
      onDoubleClick={() => header.column.resetSize()}
      onMouseDown={header.getResizeHandler(document)}
      onTouchStart={header.getResizeHandler(document)}
    />
  )
}

DataGridColumnResizer.displayName = 'DataGridColumnResizer'
