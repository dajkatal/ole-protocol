import React from 'react'

import { useId } from '@chakra-ui/react'
import { callAllHandlers, dataAttr } from '@chakra-ui/utils'
import { nextById, prevById, queryAll } from '@zag-js/dom-utils'

import { RadioCardProps } from './radio-card-types'
import { useRadioCardsContext } from './radio-cards-context'

export const useRadioCard = (props: RadioCardProps) => {
  const { variant, size, colorScheme, value, setValue, containerRef } =
    useRadioCardsContext()

  const id = useId(undefined, 'radio-card')
  const cardId = props.id ?? id

  const isChecked = value === props.value

  function getItems() {
    return queryAll(
      containerRef.current,
      `.sui-radio-card:not([aria-disabled=true])`,
    )
  }

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const items = getItems()

      const prevItem = () => {
        const item = prevById(items, cardId, true)
        if (item) {
          item.focus()
          setValue(item.getAttribute('value') as string)
        }
      }

      const nextItem = () => {
        const item = nextById(items, cardId, true)
        if (item) {
          item.focus()
          setValue(item.getAttribute('value') as string)
        }
      }

      const keyMap: Record<string, React.KeyboardEventHandler> = {
        ArrowUp: prevItem,
        ArrowDown: nextItem,
        ArrowLeft: prevItem,
        ArrowRight: nextItem,
      }

      if (keyMap[e.key]) {
        e.preventDefault()
        keyMap[e.key](e)
      }
    },
    [cardId, setValue],
  )

  return {
    variant: props.variant ?? variant,
    size: props.size ?? size,
    colorScheme: props.colorScheme ?? colorScheme,
    rootProps: {
      id,
      role: 'radio',
      tabIndex: isChecked ? 0 : -1,
      'data-checked': dataAttr(isChecked),
      'aria-checked': isChecked,
      'aria-disabled': props.isDisabled,
      onClick: callAllHandlers(props.onClick, () => setValue(props.value)),
      onKeyDown: callAllHandlers(props.onKeyDown, onKeyDown),
    },
  }
}
