import React, { useContext } from "react";

import { context } from "../AuthContext/AuthContext";

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { uid } = useContext(context);

  if (!uid) return <Navigate to="/" />;

  return <> {children} </>;
}

export default ProtectedRoute;
