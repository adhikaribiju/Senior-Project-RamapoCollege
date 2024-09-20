import React, { useContext, useState } from "react";
import {
  FaGoogle,
} from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


/*
Login()
NAME
    Login
SYNOPSIS
    Login();
DESCRIPTION
    This React component provides a login form for users to authenticate with their email and password. 
    Users can also sign in using their Google account or reset their password via email. If the login is successful, 
    the user is redirected to the previous page or the home page. New users are redirected to a welcome page upon first login.

RETURNS
    Returns a login form with options for email/password login, Google login, password reset, and a link to the sign-up page.
*/
const Login = () => {
  const [email, setEmail] = useState(""); // State for email input
  const [errorMessage, setErrorMessage] = useState(""); // State for error messages
  const { signUpWithGmail, login, resetPassword } = useContext(AuthContext);

  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    login(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        alert("Login successful!");
        navigate(from, { replace: true });
      })
      .catch((error) => {
        setErrorMessage("Please provide valid email & password!");
      });
  };

  const handleRegister = () => {
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
      .catch((error) => console.log(error));
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert("Please enter your email address first.");
      return;
    }
    resetPassword(email)
      .then(() => {
        alert("Password reset email sent!");
      })
      .catch((error) => {
        setErrorMessage(error.message);
      });
  };

  return (
    <div className="h-screen mx-auto container flex items-center justify-center">
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={handleLogin}
          className="bg-white shadow-md rounded px-8 pt-8 pb-8 mb-4"
        >
          <h3 className="text-xl font-semibold mb-4">Login</h3>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email Address
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="name@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Update the email state
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
            />

            {/* Show error message */}
            {errorMessage && (
              <p className="text-red-500 text-xs italic">
                {errorMessage}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <input
              className="bg-blue hover:bg-white border hover:border-blue hover:text-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              value="Sign in"
            />

            <button
              type="button"
              className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>
          <div className="flex items-center float-right mt-2 mb-5">
            <Link
              to="/signup"
              className="bg-white hover:bg-blue hover:text-white border border-blue text-blue font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </Link>
          </div>

          {/* Social login */}
          <div className="mt-20 text-center w-full mx-auto">
            <div className="flex items-center justify-center gap-4 w-full mx-auto">
              <button
                className="border-2 text-blue hover:text-white hover:bg-blue font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline flex items-center justify-center gap-2"
                type="button"
                onClick={handleRegister}
              >
                <FaGoogle className="text-lg" />
                <span className="font-medium">Sign in with Google</span>
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

export default Login;
