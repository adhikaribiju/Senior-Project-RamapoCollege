import React from 'react'
import Location from './Location'
import EventType from './EventType'
import EventPostingData from './EventPostingData'
import ExperienceLevel from './ExperienceLevel'
import EventCategory from './EventCategory'



/*
Sidebar()
NAME
    Sidebar
SYNOPSIS
    Sidebar({ handleChange, handleClick });
DESCRIPTION
    This React component serves as a sidebar filter menu for events, containing various filtering options such as 
    location, event type, posting date, experience level, and category. Each section is handled by a corresponding 
    child component, and the selected filters are managed through the `handleChange` and `handleClick` functions passed as props.

RETURNS
    Returns a sidebar containing multiple filtering sections for events.
*/


const Sidebar = ({ handleChange, handleClick }) => {
  return (
    <div className='space-y-5'>
        <h3 className='text-lg font-bold mb-2'>Filters</h3>
        <Location handleChange={handleChange}/>
        <EventType handleChange={handleChange} handleClick={handleClick}/>
        <EventPostingData handleChange={handleChange}/>
        <ExperienceLevel handleChange={handleChange}/>
        <EventCategory handleChange={handleChange}/>
    </div>
  )
}

export default Sidebar