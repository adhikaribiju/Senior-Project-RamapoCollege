import React, { useEffect, useState, useContext } from "react";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { FaBriefcase } from "react-icons/fa6";
import Swal from 'sweetalert2';
import { AuthContext } from "../context/AuthProvider";
import useCurrentUser from "../hooks/useCurrentUser";

/*
EventDetails()
NAME
    EventDetails
SYNOPSIS
    EventDetails();
DESCRIPTION
    This React component displays the details of a specific event, including the event title, organizer, date, time, location, 
    type, and description. It also allows users to register or unregister for the event based on their current status. If the user 
    is registered for the event, it shows the option to delete the registration. The event data is fetched from the backend 
    using the event's ID, which is passed through the URL parameters.
RETURNS
    Returns a detailed event page with information and options to register or unregister based on the user's status.
*/

const EventDetails = () => {
  
  const user = useCurrentUser();
  const { id } = useParams();
  const [event, setJob] = useState({});
  const [isRegistered, setIsRegistered] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5001/all-events/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setJob(data);
        if (user && data.regEmails && data.regEmails.includes(user.email)) {
          setIsRegistered(true);
        }
      });
  }, [id, user]);

  const handleJobApply = async () => {
    if (user && user.email) {
      // Update MongoDB with user's email
      const response = await fetch(`http://localhost:5001/register/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: user.email })
      });

      const result = await response.json();
      if (result.success) {
        Swal.fire("Registration Successful!", "", "success");
        setIsRegistered(true);
      } else {
        Swal.fire("Registration failed, please try again.", "", "error");
      }
    } else {
      // Prompt user to log in
      Swal.fire({
        icon: 'warning',
        title: 'Login Required',
        text: 'Please log in to register for the event.',
        confirmButtonText: 'Login'
      });
    }
  };

  const handleDeleteRegistration = async () => {
    if (user && user.email) {
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
        Swal.fire("Registration Deleted Successfully!", "", "success");
        setIsRegistered(false);
      } else {
        Swal.fire("Failed to delete registration, please try again.", "", "error");
      }
    }
  };

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4 pb-12">
      <PageHeader title={"Event Details"} path={"Events"} />

      <div className="mt-10 flex flex-col md:flex-row justify-between gap-12">
        {/* Event Flyer */}
        <div className="md:w-1/2">
          {event.eventLogo && (
            <img
              src={event.eventLogo}
              alt="Event Flyer"
              className="w-full h-auto rounded-sm shadow-lg"
            />
          )}
        </div>
        
        {/* Event Info */}
        <div className="md:w-1/2">
          <h3 className="font-semibold mb-2">Event Title: {event.eventTitle}</h3>

          <div className="my-4 space-y-2">
            <div className="flex items-center gap-2">
              <FaBriefcase />
              <p className="text-xl font-medium mb-2">Event Details</p>
            </div>
            <p><strong>Organizer:</strong> {event.organizerName}</p>
            <p><strong>Date:</strong> {event.postingDate}</p>
            <p><strong>Time:</strong> {event.startTime} - {event.endTime}</p>
            <p><strong>Location:</strong> {event.eventLocation}</p>
            <p><strong>Type:</strong> {event.eventType}</p>
            <p><strong>Who can register:</strong> {event.experienceLevel}</p>
            <p><strong>Category:</strong> {event.eventCategory || "N/A"}</p>
          </div>

          <div className="my-4">
            <h4 className="text-lg font-medium mb-3">Event Description</h4>
            <p className="text-primary/90">{event.eventDescription}</p>
          </div>

          {/* Registration Button or Registered/Unregister Button */}
          <div className="my-4 flex gap-4">
            {isRegistered ? (
              <>
                <button className="bg-white px-6 py-2 text-blue border border-blue rounded-sm" disabled>
                  Registered
                </button>
                <button className="bg-blue px-6 py-2 text-white rounded-sm" onClick={handleDeleteRegistration}>
                  Delete Registration
                </button>
              </>
            ) : (
              <button className="bg-blue px-6 py-2 text-white rounded-sm" onClick={handleJobApply}>
                Register Now
              </button>
            )}
          </div>
        </div>



        
      </div>
    </div>
  );
};

export default EventDetails;
