import React, { useContext, useState } from "react";
import {
  FaGoogle,
} from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";


/*
SignUp()
NAME
    SignUp
SYNOPSIS
    SignUp();
DESCRIPTION
    This React component provides a sign-up form for users to create a new account. Users can register with their email and password,
    and confirm the password to avoid mismatches. The component also allows users to sign up with their Google account using Google OAuth.
    After a successful sign-up, the user is redirected to a welcome page if it's their first login, or the previous page if not.

STATE
    - errorMessage: Stores any error messages that occur during the sign-up process.
RETURNS
    Returns a form where users can sign up using email/password or Google, with appropriate error handling and navigation.
*/
const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { createUser, signUpWithGmail } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const handleSignUp = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;

    // Basic validation
    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match!");
      return;
    }

    createUser(email, password)
      .then((result) => {
        const user = result.user;

        // Check if it's the user's first login
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          navigate('/welcome', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage(errorMessage || "Sign-up failed, please try again.");
      });
  };

  const handleRegisterWithGoogle = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;

        // Check if it's the user's first login
        if (user.metadata.creationTime === user.metadata.lastSignInTime) {
          navigate('/welcome', { replace: true });
        } else {
          navigate(from, { replace: true });
        }
      })
      .catch((error) => {
        setErrorMessage(error.message || "Google sign-up failed, please try again.");
      });
  };

  return (
    <div className="h-screen mx-auto container flex items-center justify-center">
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={handleSignUp}
          className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
        >
          <h3 className="text-xl font-semibold mb-4">Create an Account</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="name@email.com"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Confirm Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="confirmPassword"
              type="password"
              placeholder="******************"
            />
          </div>

          {/* show errors */}
          {errorMessage && (
            <p className="text-red-500 text-xs italic">{errorMessage}</p>
          )}

          <div className="flex items-center justify-center gap-4">
            <input
              className="bg-blue hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Sign Up"
            />
            
            <Link
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              to="/login"
            >
              Already have an account? Sign in
            </Link>
          </div>

          {/* Social login */}
          <div className="mt-10 text-center w-full mx-auto">
            <div className="flex items-center justify-center gap-4 w-full mx-auto">
              <button
                className="border-2 text-blue hover:text-white hover:bg-blue font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center gap-2"
                type="button"
                onClick={handleRegisterWithGoogle}
              >
                <FaGoogle className="text-lg" />
                <span className="font-medium">Sign up with Google</span>
              </button>
            </div>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 RamapoPatro. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default SignUp;
