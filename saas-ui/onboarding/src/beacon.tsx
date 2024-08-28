import * as React from 'react'

import {
  HTMLChakraProps,
  ThemingProps,
  chakra,
  forwardRef,
  useStyleConfig,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'

export interface BeaconProps
  extends HTMLChakraProps<'div'>,
    ThemingProps<'SuiBeacon'> {}

export const Beacon = forwardRef<BeaconProps, 'div'>((props, ref) => {
  const styles = useStyleConfig('SuiBeacon', props)

  return (
    <chakra.div
      ref={ref}
      {...props}
      __css={styles}
      className={cx('sui-beacon', props.className)}
    />
  )
})

Beacon.displayName = 'Beacon'
