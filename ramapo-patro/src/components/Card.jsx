
import { FiCalendar, FiClock, FiDollarSign, FiMapPin, FiSearch } from "react-icons/fi";
import { HiMenuAlt2 } from "react-icons/hi";
import { Link } from "react-router-dom";

/*
Card()
NAME
    Card
SYNOPSIS
    Card({ data });
DESCRIPTION
    This React component renders a card that displays event details such as the event title, organizer, location, category, time, and posting date.
    The card also includes an event logo and a short description of the event. The description is shortened to 22 words if it exceeds 28 words.
    The card is clickable, redirecting the user to a detailed event page via a React Router `Link` component.

RETURNS
    Returns a styled card component displaying a summary of the event information with a link to the event's detailed page.
*/

const Card = ({ data }) => {
  console.log(data);
  const {_id,eventLogo, eventTitle, organizerName, eventLocation, eventCategory, eventType, startTime,endTime, postingDate, eventDescription} = data;
  
  /*
  getShortDescription()
  NAME
      getShortDescription
  SYNOPSIS
      getShortDescription(description);
  DESCRIPTION
      This function takes an event description as input, splits it into words, and shortens it to 22 words if it contains more than 28 words.
      If the description exceeds the limit, an ellipsis (`...`) is appended to indicate that the text is shortened. If the description 
      is already within the limit, the original text is returned.
  RETURNS
      Returns the truncated description with an ellipsis if longer than 28 words; otherwise, returns the full description.
  */

  // Function to get the first 28 words
  const getShortDescription = (description) => {
    const words = description.split(' ');
    if (words.length > 28) {
      return words.slice(0, 22).join(' ') + '...';
    } else {
      return description;
    }
  };


  return (
    <div>
      <section className="card">
        <Link to={`/events/${_id}`} className="flex gap-4 flex-col sm:flex-row items-start">
          <img src={eventLogo} alt={eventTitle} className="w-60 h-120 mb-8" />
          <div className="card-details">
            <h4 className="text-primary mb-1">{organizerName}</h4>
            <h3 className="text-lg font-semibold mb-2">{eventTitle}</h3>

            <div className="text-primary/70 text-base flex flex-wrap gap-2 mb-2">
              <span className="flex items-center gap-2"><FiMapPin/> {eventLocation}</span>
              <span className="flex items-center gap-2"><HiMenuAlt2 /> {eventCategory}</span>
              <span className="flex items-center gap-2"><FiClock/> {startTime} - {endTime}</span>
              <span className="flex items-center gap-2"><FiCalendar/> {postingDate}</span>
            </div>

            <p className="text-base text-primary/70 ">{getShortDescription(eventDescription)}</p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Card;
