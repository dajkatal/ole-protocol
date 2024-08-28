'use client';

import React from 'react';
import { OCConnect, OCConnectProps } from '@opencampus/ocid-connect-js'; // Import OCConnect and useOCAuth

// Define the props for your custom AuthProvider
interface AuthProviderProps extends OCConnectProps {
  children: React.ReactNode;
}

// Custom AuthProvider component that wraps the app with OCConnect
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const opts = {
    redirectUri: 'http://localhost:3000/redirect', // Adjust this URL
  };

  return (
      <OCConnect opts={opts} sandboxMode={true}>
        {children}
      </OCConnect>
  );
};