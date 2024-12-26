import { Navigate } from 'react-router-dom';
import React from 'react';

import { useAuth } from '../hooks/useAuth';
import Loading from '../components/Loading';

interface ProtectedRouteProps {
    children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (!user) {
        return <Navigate to="/sign-in" />;
    }

    return <>{children}</>;
};
