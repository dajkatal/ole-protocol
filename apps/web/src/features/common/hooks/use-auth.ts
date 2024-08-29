// @ts-ignore
import { useOCAuth } from '@opencampus/ocid-connect-js';
import { useEffect, useState } from 'react';

const dummyUser = {
    id: 'dummyUserId',
    name: 'John Doe',
    email: 'john.doe@example.com',
    token: 'dummyToken123',
};

export const useAuth = () => {
    const { authState, ocAuth } = useOCAuth();

    // State to manage the authentication status
    const [isAuthenticated, setIsAuthenticated] = useState(() => {
        return localStorage.getItem('isAuthenticated') === 'true';
    });

    const [isLoading, setIsLoading] = useState(false); // Initialize isLoading to false
    const [username, setUsername] = useState(() => {
        return localStorage.getItem('username') || null; // Initialize from localStorage if available
    });

    const storeOcAuthInLocalStorage = (ocAuth) => {
        const authData = {
            authInfoManager: ocAuth.authInfoManager, // Assuming this is serializable
        };
        localStorage.setItem('ocAuth', JSON.stringify(authData));
    };

    const initializeAuthState = () => {
        if (authState.isAuthenticated) {
            setIsAuthenticated(true);
            localStorage.setItem('isAuthenticated', 'true');
            storeOcAuthInLocalStorage(ocAuth);

            // Set and store username if authenticated
            if (ocAuth?.authInfoManager?._idInfo?.edu_username) {
                setUsername(ocAuth.authInfoManager._idInfo.edu_username);
                localStorage.setItem('username', ocAuth.authInfoManager._idInfo.edu_username);
            }

        } else {
            setIsAuthenticated(false);
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('ocAuth');
            setUsername(null);
            localStorage.removeItem('username');
        }

        setIsLoading(false);
    };

    useEffect(() => {
        initializeAuthState();
    }, [authState]);

    // Safely parse user data from localStorage
    const getUserFromLocalStorage = () => {
        const user = localStorage.getItem('user');
        try {
            return user !== 'undefined' ? JSON.parse(user) : dummyUser;
        } catch (error) {
            console.error('Failed to parse user from localStorage:', error);
            return dummyUser;
        }
    };

    // Retrieve ocAuth from localStorage
    const getOcAuthFromLocalStorage = () => {
        const ocAuthData = localStorage.getItem('ocAuth');
        if (!ocAuthData || ocAuthData === 'undefined') {
            return null;
        }
        try {
            return JSON.parse(ocAuthData);
        } catch (error) {
            console.error('Failed to parse ocAuth from localStorage:', error);
            return null;
        }
    };

    const user = getUserFromLocalStorage();
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
        setIsLoading(true);
    };

    // Custom function to handle logout
    const logOut = () => {
        try {
            setIsLoading(true); // Set loading to true during logout process

            // Perform logout and clear any stored session
            localStorage.removeItem('ocidAuthToken');
            sessionStorage.removeItem('ocidSession');
            localStorage.removeItem('isAuthenticated');
            localStorage.removeItem('ocAuth'); // Clear stored ocAuth
            localStorage.removeItem('username'); // Clear stored username

            // Reset states
            setIsAuthenticated(false);
            setUsername(null);

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
