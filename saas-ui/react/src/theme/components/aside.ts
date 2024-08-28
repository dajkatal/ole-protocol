import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const parts = ['container', 'headerWrapper', 'header', 'title', 'body']

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(parts)

const baseStyle = definePartsStyle({
  container: {
    display: 'flex',
    flexDirection: 'column',
    minH: 0,
    position: 'relative',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'stretch',
    minH: 12,
    borderBottomWidth: '1px',
    '& > .saas-toolbar': {
      ms: 4,
    },
  },
  title: {
    fontWeight: 'medium',
  },
  body: {
    flex: 1,
    overflow: 'auto',
  },
})

export default defineMultiStyleConfig({
  defaultProps: {
    size: 'md',
  },
  baseStyle,
  sizes: {
    md: {
      header: {
        p: 4,
      },
      title: {
        fontSize: 'md',
      },
      body: {
        p: 4,
      },
    },
    lg: {
      header: {
        p: 6,
      },
      title: {
        fontSize: 'lg',
      },
      body: {
        p: 6,
      },
    },
  },
})
