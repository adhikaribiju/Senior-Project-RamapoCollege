import React from 'react'

import {createBrowserRouter,} from "react-router-dom";
import App from '../App';
import Home from '../pages/Home';
import RegEvents from '../pages/RegEvents';
import CalendarPage from '../pages/CalendarPage';
import CreateEvent from '../pages/CreateEvent';
import CreateUserData from '../pages/CreateUserData';
import UpdateEvent from '../pages/UpdateEvent';
import EventDetails from '../pages/EventDetails';
import Login from '../pages/Login';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import PostedEvents from '../pages/PostedEvents';
import UpdateUserData from '../pages/UpdateUserData';
import SignUp from '../pages/Signup';
import Welcome from '../components/Welcome';


/*
Router Configuration
NAME
    Router Configuration for React App
SYNOPSIS
    The router is created using `createBrowserRouter()` to define multiple routes for the application. 
    Routes are organized into a nested structure, where some are protected using a `PrivateRoute` component to restrict access based on authentication status.
DESCRIPTION
    This router handles all page navigation for the application, defining both public and protected routes. 
    The `PrivateRoute` component ensures that some pages are only accessible to authenticated users, such as creating events or viewing registered events.

ROUTES
    - `/`: Home page displaying event listings.
    - `/posted-events`: Shows events posted by the current user (Protected).
    - `/reg-events`: Shows events the user is registered for (Protected).
    - `/calendar`: Displays a calendar of events.
    - `/post-event`: Allows the user to create a new event (Protected).
    - `/class-schedule`: Allows the user to set up their class schedule and interests (Protected).
    - `/edit-event/:id`: Allows the user to edit a specific event based on its ID (Protected, with data loader).
    - `/update-userdata`: Allows the user to update their profile data (Protected, with data loader).
    - `/events/:id`: Shows detailed information about a specific event.
    - `/welcome`: Welcome page shown after the first login (Protected).
    - `/login`: Login page for user authentication.
    - `/signup`: Sign-up page for creating a new account.
*/

  const router = createBrowserRouter([
    {
      path: "/",
      element: <App/>,
      children: [
        {
            path: "/",
            element: <Home/>
        },
        {
            path: "/posted-events",
            element: <PrivateRoute><PostedEvents/></PrivateRoute>
        },
        {
          path: "/reg-events",
          element: <PrivateRoute><RegEvents/></PrivateRoute>
      },
        {
            path: "/calendar",
            element: <CalendarPage/>
        },
        {
          path: "/post-event",
          element: <PrivateRoute><CreateEvent/></PrivateRoute>
        },
        {
          path: "/class-schedule",
          element: <PrivateRoute><CreateUserData/></PrivateRoute>
        },
        {
          path: "edit-event/:id",
          element: <UpdateEvent/>,
          loader: ({params}) => fetch(`http://localhost:5001/all-events/${params.id}`)
        },
        {
          path: "/update-userdata",
          element: <PrivateRoute><UpdateUserData/></PrivateRoute>,
          loader: ({params}) => fetch(`http://localhost:5001/update-userdata/${params.email}`)
        },
        {
          path:"/events/:id",
          element: <EventDetails/>,
        },
        {
          path:"/welcome",
          element: <PrivateRoute><Welcome/></PrivateRoute>,
        }
      ]
    },
    {
      path: "/login",
      element: <Login/>
    },
    {
      path: "/signup",
      element: <SignUp/>
    }
  ]);

  export default router;