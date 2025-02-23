import React from "react";
import { Navigate } from "react-router-dom";
import { UserData } from "../utils/userData";

interface Props {
  children: React.ReactNode;
  redirectTo: string;
  allowedRoles?: string[];
}
const UnauthorizedRoute = ({ children, redirectTo }: Props) => {
  const userData = UserData();

  return !userData ? children : <Navigate to={redirectTo} />;
};

export default UnauthorizedRoute;
