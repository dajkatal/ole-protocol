'use client'

import * as React from 'react';

import { LoadingOverlay, LoadingSpinner } from '@saas-ui/react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@app/features/common/hooks/use-auth";
import { useUserRegistration } from "@app/features/common/hooks/use-user-registration";
import DashboardPage from "./dashboard-page";

export const HomePageCustom: React.FC = () => {
    const router = useRouter();
    const { isAuthenticated, isLoading, username } = useAuth();

    // Call useUserRegistration only after username is set
    const { isRegistered, setRegistrationStatus } = useUserRegistration(username || '');

    // Effect to handle redirection based on authentication and registration
    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/');
        } else if (isAuthenticated && !isRegistered) {
            // Needs to setup the user
            router.push('/dashboard/getting-started');
        } else if (isAuthenticated && isRegistered) {
            // All good, will display the normal dashboard UI
        }
    }, [isAuthenticated, isLoading, isRegistered, router]);

    // Add a loading state
    if (isLoading || (isAuthenticated && !username)) {
        return <div>Loading...</div>;
    }

    return (
        <DashboardPage />
    );
};
