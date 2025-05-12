import React from "react";
import HPCard from "../subComponents/HPCard";
import EventCard from "../subComponents/EventCard";
import { Link } from "react-router-dom";

function EventDetails({ eventInfo }) {
  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start justify-center gap-8 px-4 py-8">
      <div className="w-full lg:w-1/2 flex justify-center">
        <Link to={`/register/${eventInfo.id}`}>
          <EventCard
            imgSource={eventInfo.img}
            eventId={eventInfo.id}
            eventName={eventInfo.name || `Event ${eventInfo.id}`}
          />
        </Link>
      </div>

      <div className="w-full lg:w-1/2">
        <HPCard
          userClass="text-xl lg:text-3xl text-wrap text-center lg:text-left hover:scale-105 transition-transform duration-300"
          heading={eventInfo.name || `Event ${eventInfo.id}`}
          description={eventInfo.Description}
        />
      </div>
    </div>
  );
}

export default EventDetails;
