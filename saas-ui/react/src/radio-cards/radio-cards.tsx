'use client'

import * as React from 'react'

import {
  chakra,
  forwardRef,
  useControllableState,
  useStyleConfig,
} from '@chakra-ui/react'
import { mergeRefs } from '@chakra-ui/react-utils'
import { cx, mapResponsive } from '@chakra-ui/utils'

import { RadioCardProps, RadioCardsProps } from './radio-card-types'
import { RadioCardsProvider } from './radio-cards-context'
import { useRadioCard } from './use-radio-card'

function countToColumns(count: any) {
  return mapResponsive(count, (value) =>
    value === null ? null : `repeat(${value}, minmax(0, 1fr))`,
  )
}

export const RadioCards = forwardRef<RadioCardsProps, 'div'>((props, ref) => {
  const {
    children,
    defaultValue,
    value: valueProp,
    onChange,
    isDisabled,
    variant,
    size,
    colorScheme,
    ...rest
  } = props

  const styles = useStyleConfig('SuiRadioCards', props)

  const containerRef = React.useRef<HTMLDivElement>(null)

  const [value, setValue] = useControllableState({
    defaultValue,
    value: valueProp,
    onChange: (value: string) => onChange?.(value),
  })

  const context = {
    setValue,
    value,
    isDisabled,
    variant,
    size,
    colorScheme,
    containerRef,
  }

  const rootStyles = {
    display: 'grid',
    gridTemplateColumns: countToColumns(props.columns),
    gap: '4',
    ...styles,
  }

  return (
    <RadioCardsProvider value={context}>
      <chakra.div
        role="radiogroup"
        ref={mergeRefs(containerRef, ref)}
        {...rest}
        className={cx('sui-radio-group', rest.className)}
        __css={rootStyles}
      >
        {children}
      </chakra.div>
    </RadioCardsProvider>
  )
})

export const RadioCard = forwardRef<RadioCardProps, 'button'>((props, ref) => {
  const { rootProps, variant, size, colorScheme } = useRadioCard(props)

  const styles = useStyleConfig('SuiRadioCard', {
    ...props,
    variant,
    size,
    colorScheme,
  })

  return (
    <chakra.button
      ref={ref}
      as="button"
      {...rootProps}
      {...props}
      className={cx('sui-radio-card', props.className)}
      __css={styles}
    >
      {props.children}
    </chakra.button>
  )
})
