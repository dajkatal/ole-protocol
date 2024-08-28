import { chakra, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react';

export const Logo: React.FC<HTMLChakraProps<'svg'>> = (props) => {
  // Use useColorModeValue to dynamically set color based on theme
  const color = useColorModeValue('#fff', '#ffffff'); // White in light mode, dark grey in dark mode

  return (
      <chakra.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 691.13 691.13"
          fill={color} // Set the fill attribute to the dynamic color value
          {...props}
      >
        <path
            d="M478,345.55a43.77,43.77,0,0,0,43.76,43.77H688.38a349.15,349.15,0,0,0,2.75-43.76c0-143.94-88-267.31-213.16-319.26Z"
        />
        <path
            d="M517.09,476.84a215.63,215.63,0,0,1-171.53,84.73c-119.29,0-216-96.71-216-216s96.71-216,216-216a216.86,216.86,0,0,1,44.88,4.68V2.9A348,348,0,0,0,345.56,0C154.71,0,0,154.71,0,345.56S154.71,691.13,345.56,691.13c144.37,0,268.05-88.55,319.73-214.29Z"
        />
      </chakra.svg>
  );
};
