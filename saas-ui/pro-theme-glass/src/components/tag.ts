import { tagAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/styled-system'

const { defineMultiStyleConfig } = createMultiStyleConfigHelpers(
  tagAnatomy.keys,
)

export const tagTheme = defineMultiStyleConfig({
  baseStyle: {
    container: {
      borderRadius: 'full',
    },
  },
})
