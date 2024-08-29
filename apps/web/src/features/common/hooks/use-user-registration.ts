import React from 'react';
import { useLocalStorage } from '@saas-ui/react';

/**
 * Custom hook to check and manage user registration status based on `edu_username`.
 *
 * @param {string} edu_username - The educational username to check registration status for.
 * @returns {boolean} `isRegistered` - Whether the user is registered.
 * @returns {Function} `setRegistrationStatus` - Function to update the registration status.
 */
export const useUserRegistration = (edu_username: string) => {
    // Initialize local storage for registration status
    const [isRegistered, setIsRegistered] = useLocalStorage<boolean>(
        `user.${edu_username}.is_registered`,
        false // Default to false if not found
    );

    // Function to update registration status
    const setRegistrationStatus = (status: boolean) => {
        setIsRegistered(status);
    };

    return { isRegistered, setRegistrationStatus };
};
