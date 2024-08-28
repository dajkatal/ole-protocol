import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const parts = ['container', 'inner', 'main']

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(parts)

const appShellTheme = defineMultiStyleConfig({
  defaultProps: {
    variant: 'fullscreen',
  },
  variants: {
    static: {
      minHeight: '100%',
    },
    fullscreen: {
      container: {
        position: 'absolute',
        inset: 0,
      },
    },
  },
})

export default appShellTheme
