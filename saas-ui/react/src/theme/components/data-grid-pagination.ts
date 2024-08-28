import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(['container'])

export default defineMultiStyleConfig({
  defaultProps: {
    size: 'sm',
  },
  baseStyle: {
    container: {
      display: 'flex',
      flexDirection: 'row',
    },
  },
  sizes: {
    xs: {
      container: {
        fontSize: 'xs',
        px: 2,
        py: 1,
      },
    },
    sm: {
      container: {
        fontSize: 'sm',
        px: 4,
        py: 2,
      },
    },
  },
})
