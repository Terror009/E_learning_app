import React from "react";
import { Navigate } from "react-router-dom";
export default function PublicRouter({
  Component,
  isAuth,
  redirected,
  ...rest
}) {
  return { ...rest }, !isAuth ? <Component /> : <Navigate to={redirected} />;
}
