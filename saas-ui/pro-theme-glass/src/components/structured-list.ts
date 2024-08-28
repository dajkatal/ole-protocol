// @todo fix this export path
// import { structuredListAnatomy } from '@saas-ui/theme/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig, definePartsStyle } =
  createMultiStyleConfigHelpers(['button'])

const variantRounded = definePartsStyle(() => {
  return {
    button: {
      borderRadius: 'md',
      mx: 3,
      mb: '2px',
    },
  }
})

export const structuredListTheme = defineMultiStyleConfig({
  variants: {
    rounded: variantRounded,
  },
})
