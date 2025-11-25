// this Higher Order Component (HOC) checks if the user is authenticated
// and optionally if they have the required role to access a component.
// Usage: Wrap any component with withAuth(Component, requiredRole) to enforce authentication and role-based access.
//use this into route.index.tsx for protected routes

import { useUserInfoQuery } from "@/redux/features/auth/auth.api";
import type { TRole } from "@/types";
import type { ComponentType } from "react";
import { Navigate } from "react-router";

export const withAuth = (Component: ComponentType, requiredRole?: TRole) => {
  return function AuthWrapper() {
    const { data, isLoading } = useUserInfoQuery(undefined);

    // If not authenticated, it redirects to the login page.
    if (!isLoading && !data?.data?.data?.email) {
      return <Navigate to="/login" />;
    }

    // If the user does not have the required role, it redirects to an unauthorized page.
    if (requiredRole && !isLoading && requiredRole !== data?.data?.data?.role) {
      return <Navigate to="/unauthorized" />;
    }

    return <Component />;
  };
};
