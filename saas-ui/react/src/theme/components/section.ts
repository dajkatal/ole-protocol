import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const parts = ['container', 'header', 'title', 'description', 'body']

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts)

const baseStyle = definePartsStyle({
  title: {
    fontSize: ['lg', 'xl'],
    fontWeight: 'semibold',
    lineHeight: '110%',
    letterSpacing: '-1%',
    mb: 1,
  },
  description: {
    color: 'muted',
    fontSize: 'md',
    a: {
      fontWeight: 'medium',
      color: 'app-text',
    },
  },
})

const variantDefault = definePartsStyle({
  container: {
    flexDirection: 'column',
  },
  header: {
    mb: 4,
  },
})

const variantAnnotated = definePartsStyle({
  container: {
    flexDirection: ['column', null, 'row'],
    mt: 4,
  },
  header: {
    width: ['full', null, '30%'],
    mt: 0,
    mb: [4, null, 0],
    pe: [4, null, 8],
  },
})

export default defineMultiStyleConfig({
  defaultProps: {
    variant: 'default',
  },
  baseStyle,
  variants: {
    default: variantDefault,
    annotated: variantAnnotated,
  },
})
