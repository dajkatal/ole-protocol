import {
  HTMLChakraProps,
  ResponsiveValue,
  ThemingProps,
} from '@chakra-ui/react'

export interface RadioCardsProps
  extends Omit<HTMLChakraProps<'div'>, 'onChange'>,
    ThemingProps<'SuiRadioCards'> {
  value?: string
  defaultValue?: string
  onChange?: (value: string) => void
  isDisabled?: boolean
  columns?: ResponsiveValue<number>
}

export interface RadioCardProps
  extends HTMLChakraProps<'button'>,
    ThemingProps<'SuiRadioCard'> {
  value: string
  isDisabled?: boolean
}
