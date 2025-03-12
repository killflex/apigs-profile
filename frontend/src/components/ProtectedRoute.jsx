import React from "react";
import { Navigate } from "react-router-dom";

const isAutehnticated = () => {
  // return !!localStorage.getItem("token");
  return true;
};

const ProtectedRoute = ({ children }) => {
  if (!isAutehnticated()) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
