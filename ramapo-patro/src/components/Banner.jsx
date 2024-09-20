import React from "react";
import { FiMapPin, FiSearch } from "react-icons/fi";

/*
Banner()
NAME
    Banner
SYNOPSIS
    Banner({ handleInputChange, query });
    - handleInputChange: A function to handle input field changes.
    - query: A string representing the current input value in the search bar.
DESCRIPTION
    This React component displays a banner that allows users to search for events on campus. 
    It includes a title, a subtitle, and a search input field where users can type in their query. 
    The search input value is controlled by the `query` prop and any changes are handled by the `handleInputChange` function.
RETURNS
    Returns a React component that displays a banner with a search input field and search button.
*/


const Banner = ({ handleInputChange, query }) => {
  return (
    <div class="container mx-auto px-4 md:px-24 py-14 md:py-20 text-center">
    <h1 class="text-5xl font-bold text-primary mb-3">
      Find an <span class="text-blue">event</span> on campus
    </h1>
    <p class="text-lg text-black/70 mb-8">
      Experience the vibrant campus culture.
    </p>
    <form className="">
        <div className="flex justify-start md:flex-row flex-col md:gap-0">
          <div className="flex md:rounded-s-md rounded shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 w-full">
            <input
              type="text"
              name="username"
              id="username"
              className="block flex-1 border-0 bg-transparent py-1.5 pl-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
              placeholder="What type of event are you looking for?"
              onChange={handleInputChange}
              value={query}
            />
            <FiSearch className="absolute mt-2.5 ml-2 text-gray-400" />
          </div>

          <button
            type="submit"
            disabled
            className="bg-blue py-2 px-8 text-white md:rounded-e-md md:rounded-s-none rounded"
          >
            Search
          </button>
        </div>
      </form>
     
      
    </div>
  );
};

export default Banner;
