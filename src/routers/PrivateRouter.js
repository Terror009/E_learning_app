import React from "react";
import { Navigate } from "react-router-dom";
export default function PrivateRouter({ Component, isAuth, ...rest }) {
  return { ...rest }, isAuth ? <Component /> : <Navigate to="/login" />;
}
