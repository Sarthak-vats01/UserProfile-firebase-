import React from "react";
import { Navigate } from "react-router";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");
  if (token) {
    return children;
  } else {
    return <Navigate to={"/"} />;
  }
}

export default ProtectedRoute;
