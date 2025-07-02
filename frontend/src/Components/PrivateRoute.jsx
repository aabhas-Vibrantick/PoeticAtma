// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuthenticated = sessionStorage.getItem("authenticate");

  if (isAuthenticated === "true") {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
