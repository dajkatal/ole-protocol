import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const parts = ['container', 'overlay', 'section', 'toggleWrapper', 'toggle']

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts)

const baseStyle = definePartsStyle((props) => {
  const { colorScheme: c } = props

  const bg = c ? `${c}.500` : 'sidebar-background'

  return {
    container: {
      bg,
      color: 'sidebar-text',
      '&, & *, & *::before, & &::after': {
        borderColor: 'sidebar-border-color',
      },
      _dark: {
        bg,
      },
    },
  }
})

export default defineMultiStyleConfig({
  baseStyle,
})
