
/*
CustomMouseEvent()
NAME
    CustomMouseEvent
SYNOPSIS
    CustomMouseEvent({ event, onMouseEnter, onMouseLeave });
DESCRIPTION
    This React component renders a simple div displaying the event title and handles mouse events. 
    It triggers the `onMouseEnter` function when the mouse enters the div, passing both the event object and the native event.
    The `onMouseLeave` function is triggered when the mouse leaves the div.

EVENT HANDLERS
    - onMouseEnter: Function called when the mouse enters the div, receiving the event data and native mouse event.
    - onMouseLeave: Function called when the mouse leaves the div.

RETURNS
    Returns a React component that displays the event title and listens for mouse enter and leave events.
*/


import React from 'react';

const CustomMouseEvent = ({ event, onMouseEnter, onMouseLeave }) => {
  return (
    <div
      onMouseEnter={(e) => onMouseEnter(event, e)}
      onMouseLeave={onMouseLeave}
    >
      {event.title}
    </div>
  );
};

export default CustomMouseEvent;
