/* eslint-disable react/no-unknown-property */
import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";


/*
Navbar()
NAME
    Navbar
SYNOPSIS
    Navbar()
DESCRIPTION
    This React component renders a responsive navigation bar with links to different sections of the application. 
    It adjusts for both desktop and mobile views. The component includes login/logout functionality, 
    which is managed using the `AuthContext`. Logged-in users see their profile image and a "Log out" button, 
    while non-logged-in users are shown "Log in" and "Sign up" buttons. On mobile screens, a menu toggle button 
    is provided to show or hide the navigation links.

RETURNS
    A JSX structure containing:
      - The application logo.
      - Navigation links to Home, My Events, Calendar, and My Postings.
      - User-specific login/logout controls.
      - A mobile menu toggle button to display or hide navigation items.
*/

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  console.log(user)

  
  const handleLogout = () => {
    logOut()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // menu toggle btn
  const handleMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navItems = [
    { path: "/", title: "Home" },
    { path: "/reg-events", title: "My Events" },
    { path: "/calendar", title: "Calendar" },
    { path: "/posted-events", title: "My Postings" },
  ];

  return (
    <header className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <nav className="flex justify-between items-center py-6">
         <a href="/" className="flex items-center gap-2 text-2xl">
          <img
              src="images/rcnj.png" 
              alt="Logo eventDescription"      
              width="29"
              height="30"
          />
            <span>Ramapo Patro</span>
          </a>


        {/* nav items */}
        <ul className="hidden md:flex gap-12">
          {navItems.map(({ path, title }) => (
            <li key={path} className="text-base text-primary">
              <NavLink
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* sign up signout btn */}
        <div className="text-base text-primary font-medium space-x-5 hidden lg:block">
          {user ? (
            <>
              <div className="flex gap-4 items-center">
                <div class="flex -space-x-2 overflow-hidden">
                  {
                    user?.photoURL ? <> <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src={user?.photoURL}
                    alt=""
                  /></> : <> <img
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://res.cloudinary.com/ddlih3uaz/image/upload/v1723653743/icons8-bust-in-silhouette-96_qebiba.png"
                    alt=""
                  /></>
                  }
                 
                </div>
                <button onClick={handleLogout} className="py-2 px-5 border rounded hover:bg-blue hover:text-white">Log out</button>
              </div>
            </>
          ) : (
            <>
              {" "}
              <Link to="/login" className="py-2 px-5 border rounded">
                Log in
              </Link>
              <Link
                to="/signup"
                className="bg-blue py-2 px-5 text-white rounded"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

        {/* mobile menu */}
        <div className="md:hidden block">
          <button onClick={handleMenuToggler}>
            {isMenuOpen ? (
              <>
                <FaXmark className="w-5 h-5 text-primary/75" />
              </>
            ) : (
              <>
                <FaBarsStaggered className="w-5 h-5 text-primary/75" />
              </>
            )}
          </button>
        </div>
      </nav>

      {/* mobile menu items */}
      <div
        className={`px-4 bg-black py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
          {navItems.map(({ path, title }) => (
            <li
              key={path}
              className="text-base text-white first:text-white py-1"
            >
              <NavLink
                onClick={handleMenuToggler}
                to={path}
                className={({ isActive }) => (isActive ? "active" : "")}
              >
                {title}
              </NavLink>
            </li>
          ))}

          <li className="text-white py-1">
            <Link to="login">Log in</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
