import React from "react";
import { Navigate } from "react-router-dom"; // Allows navigation/redirection
import { UserData } from "../utils/userData"; // Retrieves the current user data (from storage or state)

interface Props {
  children: React.ReactNode;   // Components to render if user is unauthorized (e.g., Login/Register)
  redirectTo: string;          // Path to redirect if user *is* logged in
  allowedRoles?: string[];     // (Optional) Not used here, but available if needed for role checks
}

const UnauthorizedRoute = ({ children, redirectTo }: Props) => {
  const userData = UserData();   // Check if user is already authenticated

  // If there's no user, allow access to the route (e.g., show login page)
  // If user exists, redirect them (e.g., to home or dashboard)
  return !userData ? children : <Navigate to={redirectTo} />;
};

export default UnauthorizedRoute;
