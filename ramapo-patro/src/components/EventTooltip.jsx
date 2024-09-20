import React from 'react';

/*
EventTooltip()
NAME
    EventTooltip
SYNOPSIS
    EventTooltip({ event, style });
DESCRIPTION
    This React component displays a tooltip with event details such as title, date, time, location, and description.
    It conditionally applies a green background with white text if the `event.location` is not provided.
    The component dynamically renders event information, only displaying the date and location if they are available in the event object.

RETURNS
    Returns a styled component to display the event's title, time, location, and description, with conditional rendering for the date and location.
*/


const EventTooltip = ({ event, style }) => {
  console.log('Event data:', event); // Log the event object to the console

  // Conditionally add a green background if location does not exist
  const containerStyle = event.location
    ? { ...style }
    : { ...style, backgroundColor: 'green', color: 'white' }; // Add green background and white text if no location

  return (
    <div className="tooltip-container" style={containerStyle}>
      <h4>{event.title}</h4>
      {event.date && <p><strong>Date:</strong> {event.date}</p>}  {/* Only show if event.date exists */}
      <p><strong>Time:</strong> {event.time}</p>
      {event.location && <p><strong>Location:</strong> {event.location}</p>}  {/* Only show if event.location exists */}
      <br />
      <p>{event.description}</p>
    </div>
  );
};

export default EventTooltip;
