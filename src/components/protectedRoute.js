import React from "react";
import { Navigate , Route, Outlet  } from "react-router-dom";

import AuthService from "../services/auth.service";

function ProtectedRoute({ component: Component, ...restOfProps }) {

  const isAuthenticated = AuthService.getCurrentUser();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
 
}

export default ProtectedRoute;