// @ts-ignore
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { useEffect, useState } from 'react';
import { useLocalStorage } from "@saas-ui/react";

const dummyUser = {
    id: 'dummyUserId',
    name: 'John Doe',
    email: 'john.doe@example.com',
    token: 'dummyToken123',
};

export const useAuth = () => {
    const { authState, ocAuth } = useOCAuth();

    // Directly use useLocalStorage for states
    const [isAuthenticated, setIsAuthenticated] = useLocalStorage('isAuthenticated', false);
    const [username, setUsername] = useLocalStorage('username', null);
    const [user, setUser] = useLocalStorage('user', dummyUser);
    const [ocAuthData, setOcAuthData] = useLocalStorage('ocAuth', null);

    const [isLoading, setIsLoading] = useState(false); // Initialize isLoading to false

    const storeOcAuthInLocalStorage = (ocAuth) => {
        const authData = {
            authInfoManager: ocAuth.authInfoManager, // Assuming this is serializable
        };
        setOcAuthData(authData);
    };

    const initializeAuthState = () => {
        if (authState.isAuthenticated) {
            setIsAuthenticated(true);
            storeOcAuthInLocalStorage(ocAuth);

            // Set and store username if authenticated
            if (ocAuth?.authInfoManager?._idInfo?.edu_username) {
                setUsername(ocAuth.authInfoManager._idInfo.edu_username);
            }
        } else {
            setIsAuthenticated(false);
            setOcAuthData(null);
            setUsername(null);
            setUser(dummyUser);
        }

        setIsLoading(false);
    };

    const getOcAuthFromLocalStorage = () => {
        return ocAuthData;
    };

    const storedOcAuth = getOcAuthFromLocalStorage();

    // Custom function to handle login
    const logIn = async () => {
        try {
            setIsLoading(true); // Set loading to true during login process
            await ocAuth.signInWithRedirect({ state: 'opencampus' });
        } catch (error) {
            console.error('Login error:', error);
        }
        initializeAuthState();
        setIsLoading(false);
    };

    // Custom function to handle logout
    const logOut = () => {
        try {
            setIsLoading(true); // Set loading to true during logout process

            // Perform logout and clear any stored session
            localStorage.removeItem('ocidAuthToken');
            sessionStorage.removeItem('ocidSession');
            setOcAuthData(null); // Clear stored ocAuth
            setUsername(null); // Clear stored username

            // Reset states
            setIsAuthenticated(false);
            setUser(dummyUser);

            // Redirect the user to a login page or another safe page
            window.location.href = '/'; // Adjust the URL as needed

            console.log('User logged out successfully');
        } catch (error) {
            console.error('Error during custom logout:', error);
        } finally {
            setIsLoading(false); // Set loading to false after logout completes
        }
    };

    return {
        isLoading,
        isAuthenticated,
        isLoggingIn: isLoading, // Alias for isLoading
        ocAuth: storedOcAuth || ocAuth, // Use stored ocAuth or fallback to the current one
        logIn, // Expose the custom login function
        logOut, // Expose the custom logout function
        user, // Provide the user object
        username, // Provide the username
    };
};
