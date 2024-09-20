import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

/*
Welcome()
NAME
    Welcome
SYNOPSIS
    Welcome();
DESCRIPTION
    This React component displays a welcome screen with two action buttons: one to navigate to the class schedule 
    setup page and another to return to the home page. When the component mounts, an animation triggers to slide 
    the content into view. The page is centered with a bold welcome message, and both buttons are styled with hover 
    effects and transitions for a smooth user experience.

RETURNS
    Returns a full-screen welcome page with options to set up a class schedule or return to the homepage.
*/


const Welcome = () => {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true); // Trigger the animation when the component mounts
  }, []);

  const handleScheduleRedirect = () => {
    navigate('/class-schedule');
  };

  const handleHomeRedirect = () => {
    navigate('/');
  };

  return (
    <div className={`h-screen flex items-center justify-center bg-white transition-transform duration-1000 ease-in-out ${animate ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="text-center px-4">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 text-[#852533]">Welcome!</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 mt-4">
          <button
            onClick={handleScheduleRedirect}
            className="bg-white text-[#842433] font-bold py-3 px-6 rounded-3xl border-2 border-[#842433] hover:bg-[#842433] hover:text-white focus:outline-none focus:shadow-outline transition-colors duration-300 w-full md:w-auto"
          >
            Enter Class Schedule and Interests
          </button>
          <button
            onClick={handleHomeRedirect}
            className="bg-white text-[#842433] font-bold py-3 px-6 rounded-3xl border-2 border-[#842433] hover:bg-[#842433] hover:text-white focus:outline-none focus:shadow-outline transition-colors duration-300 w-full md:w-auto"
          >
            Set up Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
