import React, { ReactNode } from "react";
import { useJwt } from "react-jwt";
import { Navigate } from "react-router-dom";

import { useGlobalContext, ContextAppType } from "../Global";

interface ProtectedProps {
  children: ReactNode;
}

const Protected: React.FC<ProtectedProps> = ({ children }) => {
  const { signedIn } = useGlobalContext() as ContextAppType;

  const token: any = localStorage.getItem("token");

  const { isExpired }: any = useJwt(token);

  if (!token || isExpired || !signedIn)
    return <Navigate to={"/admin/signin"} />;
  return <>{children}</>;
};

export default Protected;
