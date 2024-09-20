import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

/*
useCurrentUser()
NAME
    useCurrentUser
SYNOPSIS
    useCurrentUser();
DESCRIPTION
    This custom React hook retrieves the current authenticated user from the `AuthContext`. It safely accesses the user object 
    and handles any errors that occur while trying to get the context. If a user is logged in, their email is logged to the console; 
    otherwise, a message is shown if no user or context is available.

RETURNS
    Returns the current user object if the user is authenticated, or `null` if there is no authenticated user or an error occurs.
*/
const useCurrentUser = () => {
  let user = null;

  try {
    const context = useContext(AuthContext);
    if (context && context.user) {
      user = context.user;
      console.log("User Email:", user.email);
    } else {
      console.log("AuthContext or user is not available.");
    }
  } catch (error) {
    console.error("Error accessing AuthContext:", error);
    user = null; // Set user to null or handle the error appropriately
  }

  return user;
};

export default useCurrentUser;
