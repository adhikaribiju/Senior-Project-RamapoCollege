import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import router from './router/Router.jsx';
import AuthProvider from './context/AuthProvider.jsx';


/*
ReactDOM.createRoot()
NAME
    ReactDOM.createRoot
SYNOPSIS
    ReactDOM.createRoot(container).render(element);
DESCRIPTION
    Initializes the React application by creating a root element and rendering the app within it. The application is wrapped with the `AuthProvider` to manage authentication context and the `RouterProvider` for handling routing with the provided `router` object.
RETURNS
    Renders the React app into the root DOM node with authentication and routing contexts enabled.
*/

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <RouterProvider router={router} />
</AuthProvider>
)
