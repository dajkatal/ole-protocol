'use client'

import { Button, ButtonGroup, Center, Stack } from '@chakra-ui/react'
import { useAuth } from 'src/features/common/hooks/use-auth'

import { LinkButton, Logo } from '@ui/lib'

export const HomePage = () => {
  const { isAuthenticated, logOut } = useAuth()

  return (
    <Center height="100vh">
      <Stack spacing="8">
        <Logo />

        {isAuthenticated ? (
          <ButtonGroup>
            <LinkButton href="/app" colorScheme="primary">
              Dashboard
            </LinkButton>
            <Button onClick={() => logOut()}>Logout</Button>
          </ButtonGroup>
        ) : (
          <ButtonGroup>
            <LinkButton href="/login">Login</LinkButton>
            <LinkButton href="/signup">Sign up</LinkButton>
          </ButtonGroup>
        )}
      </Stack>
    </Center>
  )
}
