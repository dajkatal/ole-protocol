'use client';

import React from 'react';
// @ts-ignore
import { OCConnect, OCConnectProps } from '@opencampus/ocid-connect-js'; // Import OCConnect and useOCAuth

// Define the props for your custom AuthProvider
interface AuthProviderProps extends OCConnectProps {
  children: React.ReactNode;
}

// Custom AuthProvider component that wraps the app with OCConnect
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const opts = {
    redirectUri: `${process.env.NEXT_PUBLIC_DOMAIN_URL}/redirect`
  };

  return (
      <OCConnect opts={opts} sandboxMode={true}>
        {children}
      </OCConnect>
  );
};