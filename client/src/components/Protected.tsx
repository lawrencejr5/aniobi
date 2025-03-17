import React, { ReactNode } from "react";
import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";

import { useGlobalContext, ContextAppType } from "../Global";

interface ProtectedProps {
  children: ReactNode;
}

export const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { signedIn } = useGlobalContext() as ContextAppType;

  const token: any = localStorage.getItem("token");

  const { isExpired }: any = useJwt(token);

  if (!token || isExpired || !signedIn || !signedIn?.username)
    return <Navigate to={"/admin/signin"} />;
  return <>{children}</>;
};

export const SuperProtected: React.FC<ProtectedProps> = ({ children }) => {
  const { signedIn } = useGlobalContext() as ContextAppType;

  const token: any = localStorage.getItem("token");

  const { isExpired }: any = useJwt(token);

  if (!token || isExpired || !signedIn || signedIn?.role !== "super")
    return <Navigate to={"/admin/not-authorized"} />;
  return <>{children}</>;
};
