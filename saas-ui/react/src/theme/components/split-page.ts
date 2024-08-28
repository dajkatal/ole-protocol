import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const parts = ['container', 'content']

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts)

const baseStyle = definePartsStyle({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    bg: 'app-background',
    display: 'flex',
    flex: 1,
    height: '100%',
  },
})

export default defineMultiStyleConfig({
  defaultProps: {
    variant: 'default',
    colorScheme: 'gray',
  },
  baseStyle,
})
