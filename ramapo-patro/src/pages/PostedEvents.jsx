import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthProvider";
import PageHeader from "../components/PageHeader";
import useCurrentUser from "../hooks/useCurrentUser";


/*
PostedEvents()
NAME
    PostedEvents
SYNOPSIS
    PostedEvents();
DESCRIPTION
    This React component displays a list of events posted by the current user. It allows users to search, edit, delete, 
    and paginate through their posted events. Event data is fetched from the backend based on the user's email. 
    The component provides pagination and search functionality, and also allows users to post a new event or modify an existing one.

STATE
    - events: Stores the list of events fetched from the API.
    - searchText: Stores the search query for filtering events by title.
    - isLoading: Tracks whether the event data is still being fetched from the API.
    - currentPage: Keeps track of the current page for pagination.
    - itemsPerPage: Defines the number of events displayed per page.
    
RETURNS
    Returns a table displaying the user's posted events with options to search, edit, delete, and paginate.
*/
const PostedEvents = () => {
  const { user } = useContext(AuthContext);
  const [events, setJobs] = useState([]);
  const [searchText, setSearchText] = useState("");
  // console.log(searchText)
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // console.log(control)
  useEffect(() => {
    setIsLoading(true);
    fetch(`http://localhost:5001/myEvents/${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setJobs(data);
        setIsLoading(false);
      });
  }, [searchText, user]);

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentJobs = events.slice(indexOfFirstItem, indexOfLastItem);

  // search functionality
  const handleSearch = () => {
    const filter = events.filter(
      (event) =>
        event.eventTitle.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
    );
    // console.log(filter);
    setJobs(filter);
    setIsLoading(false);
  };

 // pagination previous and next
 const nextPage = () => {
  if (indexOfLastItem < events.length) {
    setCurrentPage(currentPage + 1);
  }
};

// delete a books
const handleDelete = (id) => {
  // console.log(id)
  fetch(`http://localhost:5001/event/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      // console.log(data);
      // setAllBooks(data);
      if(data.acknowledged === true){
        alert("Event Deleted Successfully!!")
      }
    });
};

const prevPage = () => {
  if (currentPage > 1) {
    setCurrentPage(currentPage - 1);
  }
};

console.log(currentJobs)
// 
  return (
    <div className="w-full container mx-auto px-4">
      <PageHeader title={"Posted Events"} path={"Posted Events"}/>
      <div className="my-events-container">
        <h1 className="text-center p-4 ">You have successfully posted for the following events </h1>
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

        {/* table */}
        <section className="py-1 bg-blueGray-50">
          <div className="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-5">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex md:flex-row gap-4 flex-col items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-blueGray-700">
                      All Events
                    </h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    <Link
                      to="/post-event"
                      className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    >
                      Post A New Event
                    </Link>
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        No.
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Title
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Event Organizer
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Time
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Edit
                      </th>
                      <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  {/* set loding here */}
                  {isLoading ? (
                    <div className="flex items-center justify-center h-20">
                      <p>loading......</p>
                    </div>
                  ) : (
                    <tbody>
                      {currentJobs.map((event, index) => (
                        <tr key={index}>
                          <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
                            {index + 1}
                          </th>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
                            {event.eventTitle}
                          </td>
                          <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {event.organizerName}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            {event.startTime} - {event.endTime}
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button><Link to={`/edit-event/${event?._id}`}>Edit</Link></button>
                          </td>
                          <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                            <button className="bg-red-700 py-2 px-6 text-white rounded-sm" onClick={() => handleDelete(event._id)}>
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
                  {/* pagination */}
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

export default PostedEvents;
