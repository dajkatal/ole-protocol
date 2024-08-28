import { inputAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, cssVar } from '@chakra-ui/styled-system'

const { definePartsStyle } = createMultiStyleConfigHelpers(inputAnatomy.keys)

const $height = cssVar('input-height')
const $padding = cssVar('input-padding')
const $borderRadius = cssVar('input-border-radius')

const sizes = {
  sm: definePartsStyle({
    field: {
      [$borderRadius.variable]: 'radii.sm',
      [$height.variable]: 'sizes.8',
    },
    group: {
      [$borderRadius.variable]: 'radii.sm',
      [$height.variable]: 'sizes.8',
    },
  }),
  md: definePartsStyle({
    field: {
      [$padding.variable]: 'space.3',
      [$height.variable]: 'sizes.10',
    },
    group: {
      [$padding.variable]: 'space.3',
      [$height.variable]: 'sizes.10',
    },
  }),
}

const Input = {
  sizes,
}

export default {
  Input,
  NumberInput: Input,
  PinInput: Input,
  Textarea: {
    sizes: {
      sm: sizes.sm.field,
      md: sizes.md.field,
    },
  },
  Select: Input,
}
