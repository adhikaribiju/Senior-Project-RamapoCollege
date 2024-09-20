
import { Outlet } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

/*
App()
NAME
    App
SYNOPSIS
    App();
DESCRIPTION
    The main application component that renders the `Navbar`, `Footer`, and child routes.
    It uses `Outlet` from React Router to dynamically display different components based on the route.
RETURNS
    Returns the main layout of the application with a `Navbar`, `Footer`, and dynamic content based on the current route.
*/
function App() {


  return (
    <div>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </div>
  )
}

export default App
