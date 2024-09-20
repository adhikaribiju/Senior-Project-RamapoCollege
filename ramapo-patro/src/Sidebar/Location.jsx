import { Input } from "postcss";
import React from "react";
import InputField from "../components/InputField";

/*
Location()
NAME
    Location
SYNOPSIS
    Location({ handleChange });
DESCRIPTION
    This React component renders a list of radio buttons to filter events by their location. 
    The options include locations such as "ASB," "Pavillion," "Bischoff," and "SC." It uses the `InputField` component 
    to display individual radio buttons for each location.

RETURNS
    Returns a section containing radio button options for filtering events based on their location.
*/

const Location = ({ handleChange }) => {
  return (
    <div>
      <h4 className="text-lg font-medium mb-2">Location</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <InputField
          handleChange={handleChange}
          value="ASB"
          title="ASB"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Pavillion"
          title="Pavillion"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Bischoff"
          title="Bischoff"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="SC"
          title="SC"
          name="test"
        />
      </div>
    </div>
  );
};

export default Location;
