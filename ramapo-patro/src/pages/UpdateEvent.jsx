import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useLoaderData, useParams } from 'react-router-dom';
import CreatableSelect from "react-select/creatable";
import PageHeader from '../components/PageHeader';


/*
UpdateEvent()
NAME
    UpdateEvent
SYNOPSIS
    UpdateEvent();
DESCRIPTION
    This React component provides a form to update an existing event. The form is pre-populated with event data fetched 
    via the `useLoaderData` hook, allowing users to modify event details such as title, organizer, time, location, tags, 
    and more. Upon submission, the event data is updated in the backend.
STATE
    - selectedOption: Stores the selected event tags.
FORM FIELDS
    - Event Title: Input for the event's name.
    - Organizer Name: Input for the event organizer.
    - Start/End Time: Time pickers for the event's start and end times.
    - Event Type: Dropdown to select the type of event (On Campus, Online, Hybrid).
    - Event Location: Input for the event's location.
    - Event Date: Date picker for the event date.
    - Who Can Register: Dropdown to define who is allowed to register for the event.
    - Event Tags: Multi-select for adding or editing tags related to the event.
    - Event Logo: Input for the event logo URL.
    - Event Category: Dropdown to select the event category.
    - Event Description: Textarea for the event's description.
RETURNS
    Returns a form pre-populated with existing event data, allowing users to update the event details and submit changes.
*/
const UpdateEvent = () => {
    const { id } = useParams();
    const { organizerName, eventTitle, eventLogo, startTime, endTime,eventType, eventLocation, postingDate, experienceLevel, eventCategory, eventDescription, postedBy, skills } = useLoaderData();


    const [selectedOption, setSelectedOption] = useState(null);

  // const { user } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset 
  } = useForm();

  const onSubmit = (data) => {
    data.skills = selectedOption;
    // console.log(data)
     // update the book object
     fetch(`http://localhost:5001/update-event/${id}`, {
      method: "PATCH",

      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        if(result.acknowledged === true){
          alert("Event Updated Successfully!!")
        }
      });
  };

  const options = [
    { value: "Soccer", label: "Soccer" },
    { value: "Basketball", label: "Basketball" },
    { value: "Dance", label: "Dance" },
    { value: "Food", label: "food" },
    { value: "Prizes", label: "Prizes" },
    { value: "Research", label: "Research" },
    { value: "Movie", label: "Movie" },
    { value: "Music", label: "Music" },
    { value: "Social", label: "Social" },
    { value: "Networking", label: "Networking" },
    { value: "Cultural", label: "Cultural" },
    { value: "Sports", label: "Sports" },
    { value: "Teamwork", label: "Teamwork" },
    { value: "Debate", label: "Debate" },
    { value: "Esports", label: "Esports" },
    { value: "Art", label: "Art" },
    { value: "Karaoke", label: "Karaoke" },
    { value: "Poetry", label: "Poetry" },
    { value: "Drama", label: "Drama" },
    { value: "Fashion", label: "Fashion" },
    { value: "Coding", label: "Coding" },
    { value: "Innovation", label: "Innovation" },
    { value: "Science", label: "Science" },
    { value: "Literature", label: "Literature" },
    { value: "Cooking", label: "Cooking" },
    { value: "MentalHealth", label: "Mental Health" },
    { value: "Entrepreneurship", label: "Entrepreneurship" },
    { value: "Photography", label: "Photography" },
    { value: "Volunteering", label: "Volunteering" },
    { value: "Meditation", label: "Meditation" },
    { value: "Fitness", label: "Fitness" },
    { value: "Math", label: "Math" }

  ];

  // console.log(watch("example"));

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
    <PageHeader title={"Update This Event"} path={"Edit Event"} />

    {/* form */}
    <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* 1st row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Event Title</label>
            <input
              defaultValue={eventTitle}
              {...register("eventTitle")}
              className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
            />
          </div>
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Event Name</label>
            <input
              placeholder="Ex: Microsoft"
              defaultValue={organizerName}
              {...register("organizerName")}
              className="create-event-input"
            />
          </div>
        </div>

        {/* 2nd row */}
        <div className="create-event-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Start Time</label>
              <input
                type="time"
                defaultValue={startTime}
                {...register("startTime")}
                className="create-event-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">End Time</label>
              <input
                type="time"
                defaultValue={endTime}
                {...register("endTime")}
                className="create-event-input"
              />
            </div>
          </div>

              {/* 3rd row */}
              <div className="create-event-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Event Type</label>
              <select {...register("eventType")} className="create-event-input">
                <option value={eventType}>{eventType}</option>
                <option value="Hourly">On Campus</option>
                <option value="Monthly">Online</option>
                <option value="Yearly">Hybrid</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Event Location</label>
              <input
                defaultValue={eventLocation}
                {...register("eventLocation")}
                className="create-event-input"
              />
            </div>
          </div>


        {/* 4th row */}
        <div className="create-event-flex">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Event Date</label>
            <input
              className="create-event-input"
              {...register("postingDate")}
              placeholder="Ex: 2023-11-03"
              type="date"
              defaultValue={postingDate}
            />
          </div>

          <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Who is allowed to register?</label>
              <select
                {...register("experienceLevel")}
                className="create-event-input"
              >
                <option value={experienceLevel}>{experienceLevel}</option>
                <option value="Everyone">Everyone</option>
                <option value="RCNJ Students only">RCNJ Students only </option>
                <option value="Faculty only">Faculty only</option>
              </select>
            </div>
        </div>

        {/* 5th row */}
        <div className="">
          <label className="block mb-2 text-lg">Select Tags below:</label>
          <CreatableSelect
            className="create-event-input py-4"
            defaultValue={skills}
            onChange={setSelectedOption}
            options={options}
            isMulti
          />
        </div>

        {/* 6th row */}
        <div className="create-event-flex">
          <div className="lg:w-1/2 w-full">
            <label className="block mb-2 text-lg">Event Logo</label>
            <input
              type="url"
              placeholder="Paste your image url: https://weshare.com/img1.jpg"
              {...register("eventLogo")}
              className="create-event-input"
              defaultValue={eventLogo}
            />
          </div>

          <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Event Category</label>
              <select
                {...register("eventCategory")}
                className="create-event-input"
              >
                <option value={eventCategory}>{eventCategory}</option>
                <option value="">Select the Category of the event</option>
                <option value="Workshop">Workshop</option>
                <option value="Conference">Conference</option>
                <option value="Networking">Networking</option>
                <option value="Seminar">Seminar</option>
                <option value="Exhibition">Exhibition</option>
                <option value="Sports">Sports</option>
                <option value="Concert">Concert</option>
                <option value="Festival">Festival</option>
                <option value="Lecture">Lecture</option>
                <option value="Social">Social</option>
              </select>
            </div>
        </div>

        {/* 7th row */}
        <div className="w-full">
        <label className="block mb-2 text-lg">Event Description</label>
        <textarea
            className="w-full pl-3 py-1.5 focus:outline-none"
            rows={6}
            {...register("eventDescription")}
            placeholder="event eventDescription"
            defaultValue={eventDescription}
          />
        </div>

        

        <input
          type="submit"
          className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
        />
      </form>
    </div>
  </div>
  )
}

export default UpdateEvent