import {
  cssVar,
  defineStyle,
  defineStyleConfig,
} from '@chakra-ui/styled-system'
import { get } from '@chakra-ui/utils'
import { transparentize } from 'polished'

const $bg = cssVar('card-bg')
const $paddingY = cssVar('card-padding-y')
const $paddingX = cssVar('card-padding-x')
const $shadow = cssVar('card-shadow')
const $radius = cssVar('card-radius')
const $border = cssVar('card-border-width', '0')
const $borderColor = cssVar('card-border-color')
const $outlineColor = cssVar(
  'card-outline-color',
  'var(--chakra-colors-primary-500)',
)

const baseStyle = defineStyle(({ theme }) => ({
  background: $bg.reference,
  borderColor: $borderColor.reference,
  borderWidth: $border.reference,
  borderRadius: $radius.reference,
  boxShadow: $shadow.reference,
  py: $paddingY.reference,
  px: $paddingX.reference,

  [$outlineColor.variable]: 'colors.primary.500',
  position: 'relative',
  textAlign: 'start',
  transitionProperty: 'common',
  transitionDuration: 'normal',
  _before: {
    content: '""',
    position: 'absolute',
    inset: 0,
    borderRadius: $radius.reference,
    pointerEvents: 'none',
  },
  _checked: {
    outline: '2px solid',
    outlineOffset: '-2px',
    outlineColor: $outlineColor.reference,
  },
  _focusVisible: {
    outline: 'none',
    _before: {
      bg: transparentize(0.95, get(theme, 'colors.primary.500')),
    },
  },
}))

const variantElevated = defineStyle(() => {
  return {
    [$bg.variable]: 'colors.white',
    [$borderColor.variable]: 'colors.blackAlpha.200',
    [$border.variable]: '1px',
    [$shadow.variable]: 'shadows.sm',
    _dark: {
      [$bg.variable]: 'colors.whiteAlpha.200',
      [$borderColor.variable]: 'colors.whiteAlpha.50',
    },
    _hover: {
      [$borderColor.variable]: 'colors.blackAlpha.300',
      _dark: {
        [$borderColor.variable]: 'colors.whiteAlpha.300',
      },
    },
  }
})

const variantOutline = defineStyle(() => {
  return {
    [$border.variable]: '1px',
    [$shadow.variable]: 'none',
    [$borderColor.variable]: 'colors.blackAlpha.200',
    [$bg.variable]: 'transparent',
    _hover: {
      [$borderColor.variable]: 'colors.blackAlpha.300',
    },
    _dark: {
      [$borderColor.variable]: 'colors.whiteAlpha.300',
      _hover: {
        [$borderColor.variable]: 'colors.whiteAlpha.300',
      },
    },
  }
})

const sizes = {
  sm: defineStyle({
    [$radius.variable]: 'radii.md',
    [$paddingY.variable]: 'space.2',
    [$paddingX.variable]: 'space.3',
  }),
  md: defineStyle({
    [$radius.variable]: 'radii.md',
    [$paddingY.variable]: 'space.3',
    [$paddingX.variable]: 'space.4',
  }),
  lg: defineStyle({
    [$radius.variable]: 'radii.lg',
    [$paddingY.variable]: 'space.4',
    [$paddingX.variable]: 'space.6',
  }),
}

export const radioCardTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: 'primary',
    variant: 'outline',
    size: 'md',
  },
  baseStyle,
  variants: {
    elevated: variantElevated,
    outline: variantOutline,
  },
  sizes,
})
