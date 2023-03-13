import React from "react";
import { Navigate } from "react-router-dom";
export default function PublicRouter({
  Component,
  isAuth,
  ...rest
}) {
 
  return { ...rest }, !isAuth ? <Component /> : <Navigate to="/dashboard" />;
}
