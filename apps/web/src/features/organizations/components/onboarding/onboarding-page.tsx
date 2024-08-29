import * as React from 'react';
import {
  Button,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { BackButton, Page, PageBody, PageHeader } from '@saas-ui-pro/react';
import { useAuth } from 'src/features/common/hooks/use-auth';
import { Link } from '@saas-ui/react';

export interface OnboardingPageProps {
  isLoading?: boolean;
  hideBackButton?: boolean;
  returnHome?: boolean;
  children: React.ReactNode;
}

export const OnboardingPage: React.FC<OnboardingPageProps> = (props) => {
  const { hideBackButton, returnHome= false, children, ...pageProps } = props;
  const { username, logOut } = useAuth();

  const nav = (
      <HStack>
        {!hideBackButton && !returnHome && (
            // Update BackButton to use onClick for logout
            <BackButton onClick={logOut} />
        )}
          {!hideBackButton && returnHome && (
              // Update BackButton to use onClick for logout
              <BackButton href="/dashboard" />
          )}
        <Menu>
          <MenuButton
              as={Button}
              variant="ghost"
              textAlign="left"
              py="2"
              height="auto"
          >
            <Text size="xs" color="muted">
              Logged in as
            </Text>
            <Text>{username}</Text>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => logOut()}>Log out</MenuItem>
          </MenuList>
        </Menu>
      </HStack>
  );

  return (
      <Page {...pageProps}>
        <PageHeader nav={nav}></PageHeader>
        <PageBody maxW="full" position="relative">
          {children}
        </PageBody>
      </Page>
  );
};
