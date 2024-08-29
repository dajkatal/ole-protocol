import { Box, useColorModeValue, useTheme } from '@chakra-ui/react'

export const BackgroundGradient = ({ hideOverlay, ...props }: any) => {
  const theme = useTheme()

  // Define the gradient colors
  const colors = ['#58359d', '#000000']

  // Create the gradient background
  const fallbackBackground = `linear-gradient(135deg, ${colors[0]} 0%, ${colors[1]} 100%)`

  // Define the overlay gradient based on color mode
  const gradientOverlay = `linear-gradient(0deg, var(--chakra-colors-${useColorModeValue(
    'white',
    'gray-900',
  )}) 60%, rgba(0, 0, 0, 0) 100%)`

  return (
    <Box
      backgroundImage={fallbackBackground} // Apply the new gradient background
      backgroundBlendMode="saturation"
      position="absolute"
      top="0"
      left="0"
      zIndex="0"
      opacity={useColorModeValue('0.3', '0.5')}
      height="100vh"
      width="100%"
      overflow="hidden"
      pointerEvents="none"
      {...props}
    >
      <Box
        backgroundImage={!hideOverlay ? gradientOverlay : undefined}
        position="absolute"
        top="0"
        right="0"
        bottom="0"
        left="0"
        zIndex="1"
      ></Box>
    </Box>
  )
}
