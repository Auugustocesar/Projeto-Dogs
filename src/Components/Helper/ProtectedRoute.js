import React from 'react';
import { Navigate, Route } from "react-router-dom";
import { UserContenxt } from "../../UserContext";

const ProtectedRoute = (props) => {
  const { login } = React.useContext(UserContenxt)

  if (login) return <Route {...props} />
  if (login === false) return <Navigate to="/login" />
  return null
};

export default ProtectedRoute;
