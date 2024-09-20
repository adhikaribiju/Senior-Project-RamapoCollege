/*
generateClassDates()
NAME
    generateClassDates
SYNOPSIS
    generateClassDates(classSchedule)
        classSchedule -> An array of class objects, each containing days of the week, start time, end time, and title.
DESCRIPTION
    This function generates a list of class dates for the next two weeks based on the provided class schedule.
    It iterates over each class in the schedule, determines which days of the week the class occurs, and then 
    generates the class dates for the next 14 days. Each generated class includes the date, start time, end time, 
    and class title.

RETURNS
    An array of class dates for the next two weeks, including the class start time, end time, and title.
*/
const generateClassDates = (classSchedule) => {
  const twoWeeks = 14; // Number of days to consider
  const today = new Date();
  let classDates = [];

  classSchedule.forEach((classItem) => {
    classItem.days.forEach((day) => {
      for (let i = 0; i < twoWeeks; i++) {
        let tempDate = new Date(today);
        tempDate.setDate(today.getDate() + i);
        if (tempDate.toLocaleString('en-US', { weekday: 'short' }) === day) {
          classDates.push({
            date: tempDate.toISOString().split('T')[0],
            starttime: classItem.starttime,
            endtime: classItem.endtime,
            title: classItem.title
          });
        }
      }
    });
  });

  return classDates;
};

/*
hasTimeConflict()
NAME
    hasTimeConflict
SYNOPSIS
    hasTimeConflict(classDates, eventDate, eventStartTime, eventEndTime)
        classDates       -> An array of class objects, each containing a date, start time, and end time.
        eventDate        -> The date of the event to check.
        eventStartTime   -> The start time of the event to check.
        eventEndTime     -> The end time of the event to check.
DESCRIPTION
    This function checks if there is a time conflict between a given event and a class. It compares the event date 
    and times with the class dates and times to determine if they overlap. The function checks if the event start 
    or end time overlaps with any class scheduled for the same day.

RETURNS
    A boolean value indicating whether there is a time conflict between the event and any class on the same day.
*/
const hasTimeConflict = (classDates, eventDate, eventStartTime, eventEndTime) => {
  return classDates.some((classItem) => {
    if (classItem.date === eventDate) {
      return (
        (eventStartTime >= classItem.starttime && eventStartTime < classItem.endtime) ||
        (eventEndTime > classItem.starttime && eventEndTime <= classItem.endtime) ||
        (eventStartTime <= classItem.starttime && eventEndTime >= classItem.endtime)
      );
    }
    return false;
  });
};

/*
eventRecommender()
NAME
    eventRecommender
SYNOPSIS
    eventRecommender(events, userData)
        events    -> An array of event objects, each containing a date, start time, end time, skills, and regEmails.
        userData  -> An object containing the user's class schedule and interest tags.
DESCRIPTION
    This is the main function that recommends events to the user based on multiple factors:
        1. Time conflicts with the user's class schedule.
        2. Matching skills between the event and the user's interest tags.
        3. Whether the user is already registered for events with similar skills.
        4. Event popularity, based on the number of registrations.
    Each event is ranked based on these factors, and the function returns a list of events sorted by rank.

RETURNS
    An array of recommended events, sorted by their calculated rank.
*/
export const eventRecommender = (events, userData) => {
  const classDates = generateClassDates(userData.classSchedule);
  const recommendedEvents = [];

  events.forEach((event) => {
    let rank = 0;

    // 1. Check for time conflicts with class schedule
    const eventDate = event.postingDate;
    const eventStartTime = event.startTime;
    const eventEndTime = event.endTime;

    if (hasTimeConflict(classDates, eventDate, eventStartTime, eventEndTime)) {
      rank -= 100; // Penalize events with time conflicts
    } else {
      rank += 10; // Reward events with no time conflicts
    }

    // 2. Compare interestTags with event skills
    if (event.skills) {
      event.skills.forEach((skill) => {
        if (userData.interestTags.includes(skill.value)) {
          rank += 20; // Increase rank if skills match interestTags
        }
      });
    }

    // 3. Check if user is already registered for any event
    let userRegisteredSkills = [];
    events.forEach((e) => {
      if (e.regEmails.includes(userData.userEmail)) {
        if (e.skills) {
          userRegisteredSkills = userRegisteredSkills.concat(
            e.skills.map((skill) => skill.value)
          );
        }
      }
    });

    // 4. Compare skills of other registered events with current event skills
    if (event.skills) {
      event.skills.forEach((skill) => {
        if (userRegisteredSkills.includes(skill.value)) {
          rank += 15; // Increase rank if registered event skills match
        }
      });
    }

    // 5. Add event popularity based on the number of registrations
    const numRegistrations = event.regEmails.length;
    if (numRegistrations > 0) {
      rank += numRegistrations * 2; // Increase rank based on popularity
    }

    // 6. Add event to the recommended list with its rank
    recommendedEvents.push({ event, rank });
  });

  // Sort events by rank in descending order (higher rank first)
  recommendedEvents.sort((a, b) => b.rank - a.rank);

  // Return only the sorted events without rank
  return recommendedEvents.map((item) => item.event);
};
