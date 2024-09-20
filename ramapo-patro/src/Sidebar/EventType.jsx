import React from "react";
import InputField from "../components/InputField";
import Button from "../components/Button";

/*
EventType()
NAME
    EventType
SYNOPSIS
    EventType({ handleChange, handleClick });
     - handleClick: A function that handles the button click events to filter events based on their type (On Campus, Online, or Hybrid).

DESCRIPTION
    This React component renders buttons to allow users to filter events by their type. The options provided are "On Campus," 
    "Online," and "Hybrid." Each button triggers the `handleClick` function when selected to update the filter accordingly.

RETURNS
    Returns a section with buttons to filter events by type.
*/
const EventType = ({ handleChange, handleClick }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Type of Event</h4>
      {/* eventType filtering */}
      <div className="mb-4">
        <Button onClickHandler={handleClick} value="On campus" title="On Campus" />
        <Button onClickHandler={handleClick} value="Online" title="Online" />
        <Button onClickHandler={handleClick} value="Hybrid" title="Hybrid" />
      </div>
    </div>
  );
};

export default EventType;
