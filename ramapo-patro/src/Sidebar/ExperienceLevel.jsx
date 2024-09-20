import React from 'react'
import InputField from '../components/InputField'

/*
ExperienceLevel()
NAME
    ExperienceLevel
SYNOPSIS
    ExperienceLevel({ handleChange });
      - handleChange: A function that handles the onChange event for the radio buttons to update the selected audience filter.
DESCRIPTION
    This React component renders radio buttons to filter events based on the audience allowed to register. 
    Options include "Everyone", "RCNJ Students only", and "Faculty only". It uses the `InputField` component to handle the rendering of the radio buttons.
RETURNS
    Returns a section containing radio button options to filter events based on the target audience.
*/

const ExperienceLevel = ({handleChange}) => {
  return (
    <div>
         <h4 className="text-lg font-medium mb-2">Open to</h4>
      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>Everyone
        </label>
        <InputField
          handleChange={handleChange}
          value="RCNJ Students only"
          title="RCNJ Students only"
          name="test"
        />
        <InputField
          handleChange={handleChange}
          value="Faculty only"
          title="Faculty only"
          name="test"
        />
      </div>
    </div>
  )
}

export default ExperienceLevel;