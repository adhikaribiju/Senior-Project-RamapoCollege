/* eslint-disable react/no-unknown-property */
import React, { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import PageHeader from "../components/PageHeader";
import { useLocation } from "react-router-dom";
import useCurrentUser from "../hooks/useCurrentUser";
import { AuthContext } from "../context/AuthProvider";


/*
CreateEvent()
NAME
    CreateEvent
SYNOPSIS
    CreateEvent();
DESCRIPTION
    This React component provides a form to create and submit a new event. It includes fields for event details such as title, organizer, 
    time, location, and tags. The user can also upload an event flyer and choose from various event categories. The form integrates 
    with Cloudinary for image uploads and sends the event data to a backend API.
FORM FIELDS
    - Event Title: Input for the event's name.
    - Organizer Name: Input for the club or organization hosting the event.
    - Start/End Time: Time pickers for the event's start and end times.
    - Event Type: Dropdown to select if the event is On Campus, Online, or Hybrid.
    - Event Location: Input for the event's location.
    - Event Date: Date picker for the event date.
    - Event Tags: Multi-select dropdown for tags related to the event.
    - Event Flyer: File input to upload an event flyer.
    - Event Category: Dropdown to select the category of the event.
    - Event Description: Textarea for a detailed description of the event.
RETURNS
    Returns a form that allows users to create a new event with various details and options.
*/

const CreateEvent = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const userEmail = useCurrentUser();
  //const { useremail } = useContext(AuthContext);

  // const { user } = useContext(AuthContext);

  //scroll to top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset 
  } = useForm({
    defaultValues: {
      startTime: '18:00', // Default value for start time
      endTime: '20:00',   // Default value for end time
    },
  });

  async function uploadImages(file) { // file from <input type="file"> 
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qylnndo1");
  
    const res = await fetch(
      `https://api.cloudinary.com/v1_1/ddlih3uaz/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );
    const img = await res.json();
    // Post `img.secure_url` to your server and save to MongoDB
  }


  async function uploadImage(file) {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "qylnndo1"); // Ensure this is your correct upload preset
  
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/ddlih3uaz/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
  
      const img = await res.json();
  
      if (img.secure_url) {
        return img.secure_url; // Return the URL of the uploaded image
      } else {
        console.error("Upload failed:", img); // Log the entire response if secure_url is missing
        return undefined;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      return undefined;
    }
  }
  
  const onSubmit = async (data) => {
    data.skills = selectedOption;

  const file = data.eventLogo[0]; // Access the file from the input
  if (file) {
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      console.log("IMAGE: " + imageUrl);
      data.eventLogo = imageUrl; // Replace file object with URL
    } else {
      console.error("Image upload failed");
      alert("Failed to upload image. Please try again.");
      return; // Exit the function if image upload fails
    }
  } else {
    data.eventLogo = ""; // Handle cases with no image uploaded
  }


    console.log(data);
    data.postedBy = userEmail.email;
    fetch("http://localhost:5001/post-event", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if(result.acknowledged === true){
          alert("Event Created Successfully!!")
        }
        reset(); // Reset the form
      });

    // console.log(data)
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
      <PageHeader title={"Create New Event"} path={"Events"} />

      {/* form */}
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* 1st row */}
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Event Title</label>
              <input
                placeholder="Ex: Ramapo Hackathon 2024"
                {...register("eventTitle", { required: "Event Title is required" })}
                className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Club Name</label>
              <input
                placeholder="Ex: Computer Science Club"
                {...register("organizerName", { required: "Organizer Name is required" })}
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
                {...register("startTime")}
                className="create-event-input"
              />
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">End Time</label>
              <input
                type="time"
                placeholder="8:00PM"
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
                <option value="">Choose the event type</option>
                <option value="On Campus">On Campus</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Event Location</label>
              <input
                placeholder="Ex: ASB-420"
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
                {...register("postingDate", { required: "Event Date is required" })}
                placeholder="Ex: 2023-11-03"
                type="date"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Who is allowed to register?</label>
              <select
                {...register("experienceLevel")}
                className="create-event-input"
              >
                <option value="Everyone">Everyone</option>
                <option value="RCNJ Students only">RCNJ Students only </option>
                <option value="Faculty only">Faculty only</option>
              </select>
            </div>
          </div>

          {/* 5th row */}
          <div className="">
            <label className="block mb-2 text-lg">Event Tags:</label>
            <CreatableSelect
              className="create-event-input py-4"
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              isMulti
            />
           
          </div>

          {/* 6th row */}
          <div className="create-event-flex">
            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Event Flyer</label>
              <input
                type="file"
                {...register("eventLogo")}
                className="create-event-input"
              />
            </div>

            <div className="lg:w-1/2 w-full">
              <label className="block mb-2 text-lg">Event Category</label>
              <select
                {...register("eventCategory")}
                className="create-event-input"
              >
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
              placeholder="Event Description"
              defaultValue={"Mollit in laborum tempor Lorem incididunt irure. Aute eu ex ad sunt. Pariatur sint culpa do incididunt eiusmod eiusmod culpa. laborum tempor Lorem incididunt."}
            />
          </div>

         

          <input
            type="submit"
            className="block mt-12 bg-blue text-white font-semibold px-8 py-2 rounded-sm cursor-pointer"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;


