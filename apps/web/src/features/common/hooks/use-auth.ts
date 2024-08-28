import { useOCAuth } from '@opencampus/ocid-connect-js';

export const useAuth = () => {
    const { authState, ocAuth } = useOCAuth();

    // Mapping authState properties to match the useAuth interface
    const isLoading = authState.isLoading;
    const isAuthenticated = authState.isAuthenticated;
    const isLoggingIn = authState.isLoading; // Use isLoading as isLoggingIn for consistent naming

    // Custom function to handle logout
    const logOut = () => {
        try {
            // Clear any authentication tokens or user session data
            localStorage.removeItem('ocidAuthToken');  // Example of clearing a token from localStorage
            sessionStorage.removeItem('ocidSession');  // Example of clearing a session item
            // You might also need to clear cookies or other storage depending on how you handle auth

            // Optionally update application state or perform other clean-up actions
            // You could dispatch an action to update your state management (e.g., Redux, Zustand)

            // Redirect the user to a login page or another safe page
            window.location.href = '/';  // Adjust the URL as needed

            console.log('User logged out successfully');
        } catch (error) {
            console.error('Error during custom logout:', error);
        }
    };

    // Return the mapped states, methods, and any actions you want to expose
    return {
        isLoading,
        isAuthenticated,
        isLoggingIn,
        ocAuth, // Expose ocAuth if needed for login/logout actions
        logOut, // Expose the custom logout function
    };
};
