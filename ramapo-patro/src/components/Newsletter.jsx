import React from "react";
import { Link } from "react-router-dom";
import { FaEnvelopeOpenText, FaRocket, FaLink, FaLinkSlash} from "react-icons/fa6";
import { IoCreateOutline } from "react-icons/io5";
import { GrSchedule } from "react-icons/gr";
import { MdSportsSoccer } from "react-icons/md";

/*
Newsletter()
NAME
    Newsletter
SYNOPSIS
    Newsletter();
DESCRIPTION
    This React component is a placeholder for future functionality related to newsletters and event suggestions. 
    It includes links for managing events and class schedules, and allows users to subscribe to event notifications via email. 
    The component also provides a section for users to submit their event ideas, but this feature is not yet implemented.

STATUS
    This feature is intended for future use and is not fully functional yet.

RETURNS
    Returns a form for subscribing to newsletters and a prompt for submitting event ideas.
*/

const Newsletter = () => {
  return (
    <div>
      <div>
      <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          {" "}
          <FaLink /> Useful Links
        </h3>
        <Link to="/post-event" className="text-sm  mb-1 flex text-rose-900 items-center gap-2 ml-7 hover:text-black">
        <IoCreateOutline />Create an event
        </Link>
        <Link to="/update-userdata" className="text-sm  mb-1 flex text-blue items-center gap-2 ml-7 hover:text-black">
        <GrSchedule /> Manage Class Schedule
        </Link>
        <Link to="/update-userdata" className="text-sm  mb-1 flex text-blue items-center gap-2 ml-7 hover:text-black">
        <MdSportsSoccer /> Manage Interests
        </Link>

        <h3 className="text-lg font-bold mb-2 mt-10 flex items-center gap-2">
          {" "}
          <FaEnvelopeOpenText /> Email me for events
        </h3>
        <p className="text-primary/75 text-base mb-4">
        Sign up here if you're interested in participating in upcoming events
        </p>
        <div className="w-full space-y-4">
          <input
            type="email"
            placeholder="name@mail.com"
            className="w-full block py-2 pl-3 border focus:outline-none"
          />
          <input
            type="submit"
            value="Subcribe"
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>

      {/* 2nd section */}
      <div className="mt-20">
        <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
          <FaRocket /> Got an event idea?
        </h3>
        <p className="text-primary/75 text-base mb-4">
        Do you have a suggestion for a future event? We'd love to hear it!
        </p>
        <div className="w-full space-y-4">
          <input
            type="submit"
            value="Tell us about it!"
            className="w-full block py-2 bg-blue rounded-sm text-white cursor-pointer font-semibold"
          />
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
