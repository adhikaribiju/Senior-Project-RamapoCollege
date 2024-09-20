import React from 'react';

/*
InputField()
NAME
    InputField
SYNOPSIS
    InputField({ handleChange, value, title, name });
DESCRIPTION
    This React component displays a radio button with a label. When the user selects the button, 
    the `handleChange` function is triggered. The radio button has a `value` and `name` for grouping, 
    and the `title` is shown as the label text.

RETURNS
    Returns a radio button with a label and custom checkmark.
*/


const InputField = ({ handleChange, value, title, name }) => {
  return (
    <label className="sidebar-label-container">
      <input
        onChange={handleChange}
        type="radio"
        value={value} // Set the value prop as the input value
        name={name}
      />
      <span className="checkmark"></span>
      {title}
    </label>
  );
};

export default InputField;
