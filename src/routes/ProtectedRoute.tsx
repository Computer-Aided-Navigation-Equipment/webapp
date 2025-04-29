import React, { useEffect } from "react";
import { Navigate } from "react-router-dom"; // Used to programmatically redirect
import axiosRequest from "../utils/axiosConfig"; // Custom Axios instance (not used here directly)
import { useDispatch } from "react-redux"; // To dispatch Redux actions if needed
import toast from "react-hot-toast"; // Toast notifications (not used in this snippet but imported)
import { UserData } from "../utils/userData"; // Helper to fetch current user data (e.g., from localStorage or Redux)

interface Props {
  children: React.ReactNode;          // Components/pages to protect
  redirectTo?: string;                // Optional redirect path if not authorized
  allowedRoles?: string[];           // Optional role-based access control
}

const ProtectedRoute = ({
  children,
  redirectTo = "/login",            // Default redirect to login if not authorized
  allowedRoles,
}: Props) => {
  const userData: any = UserData();  // Get current user information
  const dispatch = useDispatch();    // Available for future logic (e.g., token refresh or logout)

  // Check if user exists and their role is in the allowedRoles array (if specified)
  const hasAccess =
    userData && (!allowedRoles || allowedRoles.includes(userData.userType));

  // If access is granted, render the children components; otherwise, redirect
  return hasAccess ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
