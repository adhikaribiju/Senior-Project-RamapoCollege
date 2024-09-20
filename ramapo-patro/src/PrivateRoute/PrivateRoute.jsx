/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthProvider";


/*
PrivateRoute()
NAME
    PrivateRoute
SYNOPSIS
    PrivateRoute({ children });
     - children: The components or routes that will be rendered if the user is authenticated.
DESCRIPTION
    This component acts as a route guard for protected routes. It checks if the user is authenticated by accessing the `AuthContext`. 
    If the user is authenticated, it renders the child components. If not, it redirects the user to the login page, preserving the 
    intended destination in the state to navigate back after a successful login. A loading indicator is displayed while authentication 
    status is being checked.
RETURNS
    - If `loading` is true: Displays a "Loading..." message.
    - If `user` is authenticated: Renders the child components.
    - If `user` is not authenticated: Redirects to the login page with the current location stored in state.
*/

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <div>Loading...</div>
    );
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;