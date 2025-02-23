import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import axiosRequest from "../utils/axiosConfig";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { UserData } from "../utils/userData";

interface Props {
  children: React.ReactNode;
  redirectTo?: string;
  allowedRoles?: string[];
}
const ProtectedRoute = ({
  children,
  redirectTo = "/login",
  allowedRoles,
}: Props) => {
  const userData: any = UserData();
  const dispatch = useDispatch();

  const hasAccess =
    userData && (!allowedRoles || allowedRoles.includes(userData.userType));

  return hasAccess ? children : <Navigate to={redirectTo} />;
};

export default ProtectedRoute;
