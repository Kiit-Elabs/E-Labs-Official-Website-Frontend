import React from "react";
import HPCard from "../subComponents/HPCard";
import EventCard from "../subComponents/EventCard";
import { Link } from "react-router-dom";

function EventDetails({ eventInfo }) {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center lg:gap-8 py-8 mt-7">
      <div className="w-full lg:w-2/5 flex justify-center">
        {/* <Link to={`/register/${eventInfo.id}`}> */}
        <EventCard
          imgSource={eventInfo.image}
          eventId={eventInfo._id}
          eventName={eventInfo.name || `Event ${eventInfo._id}`}
        />
        {/* </Link> */}
      </div>

      <div className="w-full lg:w-3/5">
        <HPCard
          userClass="text-3xl text-center lg:text-3xl text-wrap lg:text-left hover:scale-105 transition-all ease-in-out duration-300 w-full mt-6 lg:mt-0"
          heading={eventInfo.name || `Event ${eventInfo._id}`}
          description={eventInfo.description}
        />
      </div>
    </div>
  );
}

export default EventDetails;
