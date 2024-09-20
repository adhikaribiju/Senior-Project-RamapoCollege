
import React from 'react'


/*
Events()
NAME
    Events
SYNOPSIS
    Events({ result });
    - result: An array of event elements or components to be displayed.
DESCRIPTION
    This React component displays a list of events. It receives the `result` prop, which is an array of event components 
    or elements, and renders them within a section. It also displays the total number of events at the top.

RETURNS
    Returns a section that displays the total number of events and renders the list of event components.
*/

const Events = ({ result }) => {
  return (
    <>
     <div>
     <h3 className='text-lg font-bold mb-2'>{result.length} Events</h3>
     </div>
      <section className="card-container">{result}</section>
    </>
  );
};

export default Events;

