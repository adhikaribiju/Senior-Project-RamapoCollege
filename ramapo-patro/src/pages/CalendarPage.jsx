import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import PageHeader from '../components/PageHeader';
import useCurrentUser from '../hooks/useCurrentUser';
import EventTooltip from '../components/EventTooltip';
import CustomMouseEvent from '../components/CustomMouseEvent';

const localizer = momentLocalizer(moment);



/*
CalendarPage()
NAME
    CalendarPage
SYNOPSIS
    CalendarPage();
DESCRIPTION
    This React component renders a calendar view using `react-big-calendar` and displays both user-registered events 
    and class schedules. It retrieves events and user data from an API, filters them by the current user's email, and 
    maps the data into a format that the calendar can display. A tooltip is shown when hovering over events, displaying 
    additional details. The component also differentiates event types with custom styles.
RETURNS
    Returns a calendar view displaying user-registered events and class schedules, with hoverable tooltips for more details.
*/

const CalendarPage = () => {
  const user = useCurrentUser();
  if (user) {
    console.log(user.email); // Logs the email correctly
  }
  const [events, setEvents] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, event: null, position: {} });

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5001/all-events`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Failed to fetch events");
          }
          return res.json();
        })
        .then((data) => {
          // showing only events registered
          const userEvents = data.filter(event => Array.isArray(event.regEmails) ? event.regEmails.includes(user.email) : event.regEmails === user.email);
          console.log(userEvents);

          const calendarEvents = userEvents.map(event => ({
            id: event._id,
            title: event.eventTitle,
            start: new Date(`${event.postingDate}T${event.startTime}:00`),
            end: new Date(`${event.postingDate}T${event.endTime}:00`),
            date: event.postingDate,
            time: `${event.startTime} - ${event.endTime}`,
            location: event.eventLocation,
            description: event.eventDescription,
          }));

          // Fetch the user's class schedule
          fetch(`http://localhost:5001/userdata/${user.email}`)
            .then((res) => {
              if (!res.ok) {
                throw new Error("Failed to fetch user data");
              }
              return res.json();
            })
            .then((userData) => {
              const daysOfWeek = { Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6, Sun: 0 };
              const classScheduleEvents = [];

              userData.classSchedule.forEach((schedule, index) => {
                schedule.days.forEach(day => {
                  const dayOffset = daysOfWeek[day];

                  // Generate events for every week in a year
                  for (let week = 0; week < 52; week++) {
                    const eventStart = moment().startOf('week').add(week, 'weeks').day(dayOffset).set({
                      hour: schedule.starttime.split(':')[0],
                      minute: schedule.starttime.split(':')[1],
                    });

                    const eventEnd = eventStart.clone().set({
                      hour: schedule.endtime.split(':')[0],
                      minute: schedule.endtime.split(':')[1],
                    });

                    classScheduleEvents.push({
                      id: `class-${schedule.title}-${index}-${day}-week-${week}`,
                      title: schedule.title,
                      //time: `${event.startTime} - ${event.endTime}`,
                      start: eventStart.toDate(),
                      end: eventEnd.toDate(),
                      //time: '${start} - ${end}',
                      time: `${eventStart.format('h:mm ')} - ${eventEnd.format('h:mm ')}`,
                     // location: "Classroom", // Adjust this as needed
                      //description: "Course"
                    });
                  }
                });
              });

              // Combine both events and class schedule events
              setEvents([...calendarEvents, ...classScheduleEvents]);
            })
            .catch((error) => {
              console.error("Error fetching user data:", error);
              setEvents(calendarEvents); // Set only the event data if fetching user data fails
            });
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  }, [user]);

  const eventStyleGetter = (event, start, end, isSelected) => {
    console.log(event);
 // Determine if the event is a class schedule based on the presence of event.date
    const isEvent = !!event.date;
    const backgroundColor = isEvent ? '#842433' : '#248475'; // Yellow for class schedule, original color for events
    const style = {
      backgroundColor,
      borderRadius: '0px',
      opacity: 0.8,
      color: 'white',
      border: '0px',
      display: 'block',
    };
    return {
      style,
    };
  };

  const handleEventMouseEnter = (event, e) => {
    const xPos = e.clientX + 50;
    const yPos = e.clientY + 50;
    console.log(`Tooltip position: x=${xPos}, y=${yPos}`);
    setTooltip({
      visible: true,
      event: event,
      position: { x: xPos, y: yPos }
    });
  };

  const handleEventMouseLeave = () => {
    console.log("Mouse left the event, hiding tooltip");
    setTooltip({ visible: false, event: null, position: {} });
  };

  return (
    <div className="calendar-container">
      <PageHeader title={"Calendar"} path={"Calendar"} />
      <div className="calendar-wrapper flex items-center justify-center h-screen">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView="week"
          min={new Date(2024, 4, 13, 8, 0)} // Start time 8:00 AM
          max={new Date(2024, 4, 13, 22, 0)} // End time 10:00 PM
          views={['month', 'week', 'day']}
          style={{ width: '100%' }}
          eventPropGetter={eventStyleGetter}
          components={{
            event: (props) => (
              <CustomMouseEvent
                {...props}
                onMouseEnter={handleEventMouseEnter}
                onMouseLeave={handleEventMouseLeave}
              />
            ),
          }}
        />
        {tooltip.visible && (
          <EventTooltip 
            event={tooltip.event} 
            style={{ top: `${tooltip.position.y}px`, left: `${tooltip.position.x}px` }} 
          />
        )}
      </div>
    </div>
  );
};

export default CalendarPage;
