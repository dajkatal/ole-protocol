import {
  createMultiStyleConfigHelpers,
  defineCssVars,
} from '@chakra-ui/styled-system'
import { transparentize } from '@chakra-ui/theme-tools'
import type { SystemStyleObject } from '@chakra-ui/theme-tools'

const parts = [
  'container',
  'inner',
  'table',
  'thead',
  'tbody',
  'tfoot',
  'tr',
  'th',
  'title',
  'resizer',
  'td',
  'caption',
]

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(parts)

const vars = defineCssVars('data-grid', [
  'bg',
  'row-bg',
  'row-hover-bg',
  'row-selected-bg',
])

const pinnedLeftStyles: SystemStyleObject = {
  position: 'sticky',
  left: 'var(--pinned-left)',
  zIndex: 1,
  bg: vars['row-bg'].reference,
  '&[data-last]:after': {
    content: '""',
    display: 'block',
    position: 'absolute',
    right: '-4px',
    zIndex: 1,
    top: '-1px',
    bottom: '-1px',
    width: '4px',
    pointerEvents: 'none',
    bgGradient: 'linear(to-r, blackAlpha.200, transparent)',
  },
  _before: {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
    pointerEvents: 'none',
  },
  _dark: {
    '&[data-last]:after': {
      my: '1px',
      borderLeft: '1px solid',
      borderColor: 'inherit',
      bgGradient: 'linear(to-r, blackAlpha.300, transparent)',
    },
  },
}

const pinnedRightStyles: SystemStyleObject = {
  position: 'sticky',
  right: 'var(--pinned-right)',
  zIndex: 1,
  bg: vars.bg.reference,
  opacity: 0.95,
  '&[data-last]:after': {
    content: '""',
    position: 'absolute',
    left: '-4px',
    zIndex: 1,
    top: '-1px',
    bottom: '-1px',
    width: '4px',
    pointerEvents: 'none',
    bgGradient: 'linear(to-l, blackAlpha.200, transparent)',
  },
  _before: {
    content: '""',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    zIndex: -1,
    pointerEvents: 'none',
  },
  _dark: {
    '&[data-last]:after': {
      my: '1px',
      borderRight: '1px solid',
      borderColor: 'inherit',
      bgGradient: 'linear(to-r, blackAlpha.300, transparent)',
    },
  },
}

const baseStyle = definePartsStyle({
  container: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    height: '100%',
    maxWidth: '100%',
    position: 'relative',
    [vars.bg.variable]: 'colors.chakra-body-bg',
    [vars['row-bg'].variable]: 'colors.chakra-body-bg',
    [vars['row-hover-bg'].variable]: 'inherit',
    [vars['row-selected-bg'].variable]: 'inherit',
  },
  inner: {
    height: '100%',
    width: '100%',
    overflow: 'auto',
  },
  table: {
    display: 'grid',
    fontVariantNumeric: 'lining-nums tabular-nums',
    borderCollapse: 'collapse',
  },
  thead: {
    display: 'grid',
    '&[data-sticky]': {
      position: 'sticky',
      top: 0,
      zIndex: 2,
      bg: vars.bg.reference,
    },
  },
  tbody: {
    display: 'grid',
  },
  th: {
    display: 'flex',
    position: 'relative',
    alignItems: 'center',
    fontWeight: 'medium',
    textAlign: 'start',
    padding: 0,
    '&[data-pinned=left]': pinnedLeftStyles,
    '&[data-pinned=right]': pinnedRightStyles,
    '&[data-is-numeric=true]': {
      textAlign: 'end',
      justifyContent: 'end',
    },
  },
  title: {
    display: 'flex',
    flex: 1,
    '&[aria-sort="none"] svg': {
      opacity: 0,
      transitionProperty: 'opacity',
      transitionDuration: 'normal',
    },
    '&[aria-sort="none"]:hover, &[aria-sort="none"]:focus svg': {
      opacity: 1,
    },
    _focusVisible: {
      outlineColor: 'purple.400',
      outlineOffset: '-2px',
    },
  },
  resizer: {
    position: 'absolute',
    right: '-8px',
    zIndex: 1,
    visibility: 'hidden',
    width: '20px',
    height: '100%',
    userSelect: 'none',
    cursor: 'col-resize',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'blackAlpha.300',
    '&:hover, &:active': {
      color: 'primary.500',
      visibility: 'visible',
    },
    _dark: {
      color: 'whiteAlpha.300',
      '&:hover, &:active': {
        color: 'primary.500',
      },
    },
    _before: {
      content: '""',
      display: 'block',
      width: '2px',
      height: '18px',
      cursor: 'col-resize',
      bg: 'currentColor',
      transitionProperty: 'all',
      transitionDuration: 'normal',
    },
    'th:hover &': {
      visibility: 'visible',
    },
  },
  tr: {
    bg: vars['row-bg'].reference,
    display: 'flex',
    width: 'full',
    position: 'relative',
    _hover: {
      bg: vars['row-hover-bg'].reference,
    },
    _selected: {
      bg: vars['row-selected-bg'].reference,
    },
    _focusVisible: {
      outline: 'none',
      _after: {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        bg: 'transparent',
        zIndex: 1,
        pointerEvents: 'none',
        boxShadow: 'inset 0 0 0 2px var(--chakra-colors-purple-400)',
      },
    },
  },
  td: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'start',
    _focus: {
      outline: 'none',
      boxShadow: 'inset 0 0 0 2px var(--chakra-colors-purple-400)',
    },
    '&[data-pinned=left]': pinnedLeftStyles,
    '&[data-pinned=right]': pinnedRightStyles,
    '&[data-is-numeric=true]': {
      textAlign: 'end',
      justifyContent: 'end',
    },
  },
  caption: {
    mt: 4,
    fontFamily: 'heading',
    textAlign: 'center',
    fontWeight: 'medium',
  },
})

const variantSimple = definePartsStyle((props) => {
  const { colorScheme: c, theme } = props

  return {
    th: {
      color: 'gray.600',
      borderBottom: '1px',
      borderColor: 'blackAlpha.200',
      _dark: {
        color: 'gray.400',
        borderColor: 'whiteAlpha.100',
      },
    },
    caption: {
      color: 'gray.600',
      _dark: {
        color: 'gray.400',
      },
    },
    tbody: {
      tr: {
        borderBottom: '1px',
        borderColor: 'blackAlpha.200',
        _dark: {
          borderColor: 'whiteAlpha.100',
        },
      },
      'tr[data-interactive]:hover': {
        '& [data-pinned]:before': {
          bg: vars['row-hover-bg'].reference,
        },
        [vars['row-hover-bg'].variable]: 'colors.gray.50',
        _dark: {
          [vars['row-hover-bg'].variable]: 'colors.whiteAlpha.50',
        },
      },
      'tr[data-selected]': {
        '& [data-pinned]:before': {
          bg: vars['row-selected-bg'].reference,
        },
        [vars['row-selected-bg'].variable]: `colors.${c}.50`,
        borderColor: `${c}.100`,
        _dark: {
          [vars['row-selected-bg'].variable]: transparentize(
            `${c}.500`,
            0.1,
          )(theme),
          borderColor: transparentize(`${c}.500`, 0.2)(theme),
        },
        '&[data-interactive]:hover': {
          '& [data-pinned]:before': {
            bg: vars['row-selected-bg'].reference,
          },
          [vars['row-selected-bg'].variable]: `colors.${c}.100`,
          _dark: {
            [vars['row-selected-bg'].variable]: transparentize(
              `${c}.500`,
              0.2,
            )(theme),
          },
        },
      },
      'tr:last-of-type': {
        border: 0,
      },
    },
    tfoot: {
      tr: {
        '&:last-of-type': {
          th: { borderBottomWidth: 0 },
        },
      },
    },
  }
})

const variantStriped = definePartsStyle((props) => {
  const styles = variantSimple(props)

  return {
    ...styles,
    tbody: {
      'tr:nth-of-type(odd)': {
        [vars['row-bg'].variable]: 'colors.gray.50',
        _dark: {
          '& [data-pinned]': {
            bg: vars['bg'].reference,
          },
          '& [data-pinned]:before': {
            bg: vars['row-bg'].reference,
          },
          [vars['row-bg'].variable]: 'colors.whiteAlpha.50',
          _selected: {
            '& [data-pinned]:before': {
              bg: vars['row-selected-bg'].reference,
            },
          },
        },
      },
      ...styles.tbody,
    },
  }
})

const sizes = definePartsStyle({
  sm: {
    title: {
      px: '3',
      py: '2',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '3',
      py: '2',
      fontSize: 'sm',
      lineHeight: '4',
    },
    caption: {
      px: '3',
      py: '2',
      fontSize: 'xs',
    },
  },
  md: {
    title: {
      px: '4',
      py: '3',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '4',
      py: '3',
      lineHeight: '4',
    },
    caption: {
      px: '4',
      py: '2',
      fontSize: 'sm',
    },
  },
  lg: {
    title: {
      px: '6',
      py: '4',
      lineHeight: '4',
      fontSize: 'xs',
    },
    td: {
      px: '6',
      py: '4',
      lineHeight: '5',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'sm',
    },
  },
  xl: {
    title: {
      px: '8',
      py: '5',
      lineHeight: '5',
      fontSize: 'sm',
    },
    td: {
      px: '8',
      py: '5',
      lineHeight: '6',
    },
    caption: {
      px: '6',
      py: '2',
      fontSize: 'md',
    },
  },
})

const dataGridTheme = defineMultiStyleConfig({
  baseStyle,
  sizes,
  variants: {
    simple: variantSimple,
    striped: variantStriped,
    unstyled: {},
  },
  defaultProps: {
    variant: 'simple',
    size: 'md',
    colorScheme: 'primary',
  },
})

export default dataGridTheme
