import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import PageHeader from "../components/PageHeader";
import { AuthContext } from "../context/AuthProvider";
import useCurrentUser from '../hooks/useCurrentUser';
import { Link } from "react-router-dom";


/*
CreateUserData()
NAME
    CreateUserData
SYNOPSIS
    CreateUserData();
DESCRIPTION
    This React component allows users to input their class schedules and interests. Users can add multiple class schedules with custom times 
    and select the days for each class. Additionally, users can tag their interests using a multi-select dropdown. The form performs validation 
    to prevent overlapping class times and duplicate course titles. It submits the collected data to the backend for saving.
RETURNS
    Returns a form where users can enter their class schedules, select days for each class, and add interests.
*/

const CreateUserData = () => {

  const user = useCurrentUser().email;
  console.log("email: -> " + user);
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      starttime: "09:00", // Default start time
      endtime: "10:00",   // Default end time
    }
  });
  const { fields, append, remove } = useFieldArray({ control, name: "classSchedule" });
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedDays, setSelectedDays] = useState({});

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const interestOptions = [
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
  

  const toggleDay = (day, index) => {
    setSelectedDays(prevState => {
      const currentDays = prevState[index] || [];
      const isSelected = currentDays.includes(day);

      if (isSelected) {
        return {
          ...prevState,
          [index]: currentDays.filter(d => d !== day)
        };
      } else {
        return {
          ...prevState,
          [index]: [...currentDays, day]
        };
      }
    });
  };


  const onSubmit = (data) => {
    data.interestTags = selectedTags.map(tag => tag.value);
    
    // Check if days have been selected for each class schedule
    const hasSelectedDays = fields.every((_, index) => selectedDays[index] && selectedDays[index].length > 0);
    
    if (!hasSelectedDays) {
      alert("Please select at least one day for each class schedule.");
      return; // Prevent form submission
    }
  
    // Check for overlapping times on the same day
    for (let i = 0; i < fields.length; i++) {
      const { starttime, endtime } = data.classSchedule[i];
      const days = selectedDays[i] || [];
  
      for (let j = i + 1; j < fields.length; j++) {
        const { starttime: nextStarttime, endtime: nextEndtime } = data.classSchedule[j];
        const nextDays = selectedDays[j] || [];
  
        const hasOverlap = days.some(day => nextDays.includes(day)) &&
          ((starttime < nextEndtime && nextStarttime < endtime) || 
           (nextStarttime < endtime && starttime < nextEndtime));
  
        if (hasOverlap) {
          alert("You have overlapping class times on the same day. Please adjust your schedule.");
          return; // Prevent form submission
        }
      }
    }
  
    // Check for duplicate course titles
    const courseTitles = data.classSchedule.map(schedule => schedule.title);
    const hasDuplicateTitles = new Set(courseTitles).size !== courseTitles.length;
  
    if (hasDuplicateTitles) {
      alert("Course titles must be unique. Please ensure that no two classes have the same name.");
      return; // Prevent form submission
    }
  
    data.classSchedule = data.classSchedule.map((schedule, index) => ({
      ...schedule,
      days: selectedDays[index] || []
    }));
  
    // Assume `user.email` is available through a custom hook
    //const user = useCurrentUser().email;
    data.userEmail = user ; // Replace with actual email

    fetch("http://localhost:5001/class-schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then(res => res.json())
    .then(result => {
      if (result.status === true) {
        alert("Class Schedules and Interests saved successfully!");
        window.location.href = "/"; // Redirect to home
        
      } else {
        alert("Failed to save the data. Please try again.");
      }
    });
  };
  
  
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <PageHeader title={"Interests & Class Schedule"} path={"Interests & Class Schedule"} />
      <div className="bg-[#FAFAFA] py-10 px-4 lg:px-16">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          
          {/* Interest Tags */}
          <div className="">
            <label className="block mb-2 text-lg">Tell us your interests:</label>
            <CreatableSelect
              isMulti
              options={interestOptions}
              onChange={setSelectedTags}
              className="create-user-input"
            />
          </div>

          {/* Class Schedule */}
          <div className="space-y-5">
            <label className="block mb-2 text-lg">Class Schedule:</label>
            
            {fields.map((item, index) => (
              <div key={item.id} className="border p-4 mb-4">
                <div className="flex items-center mb-2">
                  <input
                    placeholder="Course Title"
                    {...register(`classSchedule.${index}.title`)}
                    className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900"
                  />
                </div>
                <div className="flex items-center mb-2 max-w-32">
                  <input
                    type="time"
                    {...register(`classSchedule.${index}.starttime`, { required: true })}
                    defaultValue="09:00"
                    className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900"
                  />
                </div>
                <div className="flex items-center mb-2 max-w-32">
                  <input
                    type="time"
                    {...register(`classSchedule.${index}.endtime`, { required: true })}
                    defaultValue="10:00"
                    className="block w-full flex-1 border-1 bg-white py-1.5 pl-3 text-gray-900"
                  />
                </div>
                <div className="flex items-center mb-2">
                  <label className="block w-full text-lg">Select Days</label>
                  <br />
                </div>
                <div className="grid grid-cols-7 gap-1 max-w-96 ">
                    {daysOfWeek.map(day => (
                      <button
                        type="button"
                        key={day}
                        onClick={() => toggleDay(day, index)}
                        className={`px-2 py-1 max-w-12 rounded ${
                          selectedDays[index]?.includes(day)
                            ? "bg-gray-200 text-black"
                            : "bg-blue text-white"
                        }`}
                      >
                        {day}
                      </button>
                    ))}
                  </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="text-red-500"
                >
                  Remove
                </button>
              </div>
            ))}
            
            <button
              type="button"
              onClick={() => append({})}
              className="border border-blue text-blue px-4 py-2 rounded"
            >
              Add Class
            </button>
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

export default CreateUserData;
