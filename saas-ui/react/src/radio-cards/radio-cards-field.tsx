import { forwardRef } from '@chakra-ui/system'
import { createField } from '@saas-ui/forms'

import { RadioCards } from './radio-cards'

export const RadioCardsField = createField(
  forwardRef((props, ref) => {
    return <RadioCards {...props} ref={ref} />
  }),
  {
    isControlled: true,
  },
)
