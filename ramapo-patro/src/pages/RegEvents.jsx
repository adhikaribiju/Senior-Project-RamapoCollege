import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageHeader from "../components/PageHeader";
import { AuthContext } from "../context/AuthProvider";
import Swal from 'sweetalert2';
import useCurrentUser from "../hooks/useCurrentUser";


/*
RegEvents()
NAME
    RegEvents
SYNOPSIS
    RegEvents();
DESCRIPTION
    This React component displays a list of events that the current user has registered for. It provides functionalities 
    such as search, pagination, and the ability to deregister from events. The events are fetched from the backend and 
    filtered based on the user's registration status. Users can also search for events by title and navigate through pages 
    of registered events.

STATE
    - events: Stores the list of registered events fetched from the API.
    - searchText: Stores the search query for filtering events by title.
    - isLoading: Tracks whether the event data is being fetched.
    - currentPage: Keeps track of the current page for pagination.
    - itemsPerPage: Defines the number of events displayed per page.

RETURNS
    Returns a list of registered events with options to search, deregister, and paginate through the results.
*/
const RegEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;



  const cuser = useCurrentUser();

  useEffect(() => {
    if (user?.email) {
      setIsLoading(true);
      fetch(`http://localhost:5001/all-events`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch events");
          }
          return res.json();
        })
        .then((data) => {
          // Filter events where the user's email is in the regEmails array
          //const registeredEvents = data.filter(event => event.regEmails.includes(user.email));
          console.log(data);
          const userEvents = data.filter(event => Array.isArray(event.regEmails) ? event.regEmails.includes(user.email) : event.regEmails === user.email);
          setEvents(userEvents);
          console.log(cuser.email);
          console.log(userEvents);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
          setIsLoading(false);
        });
    }
  }, [user]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = events.slice(indexOfFirstItem, indexOfLastItem);

  // Search functionality
  const handleSearch = () => {
    const filteredEvents = events.filter((event) =>
      event.eventTitle.toLowerCase().includes(searchText.toLowerCase())
    );
    setEvents(filteredEvents);
  };

  // Pagination navigation
  const nextPage = () => {
    if (indexOfLastItem < events.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Delete an event
  const handleDelete = async (id) => {
      // Remove user's email from regEmails in MongoDB
      const response = await fetch(`http://localhost:5001/unregister/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email })
      });

      const result = await response.json();
      if (result.success) {
        window.location.reload(); // Refresh the page
        Swal.fire("Registration Deleted Successfully!", "", "success");
        setIsRegistered(false);
        window.location.reload(); // Refresh the page
      } else {
        Swal.fire("Failed to delete registration, please try again.", "", "error");
      }
    }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Registered Events"} path={"Registered Events"}/>
      <div className="my-events-container">
        <h1 className="text-center p-4">You have successfully registered for the following events</h1>
        <div className="search-box p-2 text-center mb-2">
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className="py-2 pl-3 border focus:outline-none lg:w-6/12 mb-4 w-full"
          />
          <button
            onClick={handleSearch}
            className="bg-blue text-white font-semibold px-8 py-2 rounded-sm mb-4"
          >
            Search
          </button>
        </div>

        {/* Table */}
        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex md:flex-row gap-4 flex-col items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      Registered Events
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                   
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        No.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Title
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Organizer
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Time
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Deregister
                      </th>
                    </tr>
                  </thead>

                  {isLoading ? (
                    <div className="flex items-center justify-center h-20">
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <tbody>
                      {currentEvents.map((event, index) => (
                        <tr key={event._id}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                            {index + 1}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {event.eventTitle}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {event.organizerName}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {event.startTime} - {event.endTime}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button
                              className="bg-blue py-2 px-6 text-white rounded-sm"
                              onClick={() => handleDelete(event._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            </div>
          </div>

          {/* Pagination */}
          <div className="flex justify-center text-black space-x-8">
            {currentPage > 1 && (
              <button onClick={prevPage} className="hover:underline">
                Previous
              </button>
            )}
            {indexOfLastItem < events.length && (
              <button onClick={nextPage} className="hover:underline">
                Next
              </button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default RegEvents;
