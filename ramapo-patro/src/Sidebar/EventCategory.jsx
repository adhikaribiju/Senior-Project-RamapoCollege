import React from 'react'
import InputField from '../components/InputField'


/*
EventCategory()
NAME
    EventCategory
SYNOPSIS
    EventCategory({ handleChange });
    - handleChange: A function that handles the onChange event for the radio buttons to update the selected event category.
DESCRIPTION
    This React component renders a list of radio buttons to allow users to filter events by category. 
    It uses the `InputField` component for each category option and passes the `handleChange` function to capture 
    the selected category.
RETURNS
    Returns a section containing radio button options for filtering events by category, such as "Lecture," "Sports," and "Networking."
*/

const EventCategory = ({handleChange}) => {
  return (
    <div>
    <h4 className="text-lg font-medium mb-2">Event Category</h4>
 <div>
   <label className="sidebar-label-container">
     <input onChange={handleChange} type="radio" value="" name="test" />
     <span className="checkmark"></span>Any
   </label>
   <InputField
     handleChange={handleChange}
     value="Lecture"
     title="Lecture"
     name="test"
   />
   <InputField
     handleChange={handleChange}
     value="Sports"
     title="Sports"
     name="test"
   />
   <InputField
     handleChange={handleChange}
     value="Networking"
     title="Networking"
     name="test"
   />
 </div>
</div>
  )
}

export default EventCategory