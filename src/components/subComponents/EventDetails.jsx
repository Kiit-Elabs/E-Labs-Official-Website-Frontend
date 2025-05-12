import React from "react";
import HPCard from "../subComponents/HPCard";
import EventCard from "../subComponents/EventCard";
import { Link } from "react-router-dom";

function EventDetails({ eventInfo }) {
  return (
    <div className="md:flex flex-row justify-evenly items-center gap-12 py-12 hover:shadow-lg transition-shadow duration-300">
      <div className="ml-6">
        <Link to={`/register/${eventInfo.id}`}>
          <EventCard
            imgSource={eventInfo.img}
            eventId={eventInfo.id}
            eventName={eventInfo.name || `Event ${eventInfo.id}`}
          />
        </Link>
      </div>
      <HPCard
        userClass="text-3xl text-wrap hover:scale-105 transition-transform duration-300"
        heading={eventInfo.name || `Event ${eventInfo.id}`}
        // subHeading={`${eventInfo.date} | ${eventInfo.venue}`}
        description={eventInfo.Description}
      />
    </div>
  );
}

export default EventDetails;
