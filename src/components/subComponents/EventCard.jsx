// import React from "react";
// import { Link } from "react-router-dom";
// import Button from "./Button";

// function EventCard({ imgSource, eventId, eventName }) {
//   return (
//     <div className="w-[24rem] border-2 border-textColor1 rounded-md h-[24rem] p-4 transform hover:scale-105 transition-all ease-in-out flex flex-col gap-8">
//       <div className="overflow-hidden w-88 border-neutral-300 h-72 rounded-md border-2">
//         <figure>
//           <img src={imgSource} alt={`Event ${eventId}`} />
//         </figure>
//       </div>
//       <div className="flex items-center justify-evenly">
//         <Link to={`/register/${eventId}`}>
//           <Button buttonName="Register Now!" />
//         </Link>
//         <Button buttonName={eventName} />
//       </div>
//     </div>
//   );
// }

// export default EventCard;

import { Link } from "react-router-dom";
import Button from "./Button";
import { Image } from "@heroui/react";

function EventCard({ imgSource, eventId, eventName }) {
  return (
    <div className="w-fit border-2 border-textColor1 rounded-xl h-auto p-4 transform hover:scale-105 transition-all ease-in-out flex flex-col gap-6 hover:shadow-[0_0_20px_rgba(255,140,0,0.5)] duration-300 dark:bg-[#ffccaa]/40">
      {/* <div className="overflow-hidden w-48 h-48 sm:h-64 md:h-72 rounded-md aspect-square">
        <figure className="w-full h-full">
          <img
            src={imgSource}
            alt={`Event ${eventId}`}
            className="w-full h-full object-cover aspect-square"
          />
        </figure>
      </div> */}
      <Image
        className="overflow-hidden aspect-square sm:w-[14rem] md:w-[18rem]"
        src={imgSource}
        alt={`Event ${eventId}`}
        radius="lg"
        isBlurred
      ></Image>
      {/* <div className="flex items-center justify-evenly">
        <Link to={`/register/${eventId}`}>
          <Button buttonName="Register Now!" />
        </Link>
        <Link to={`/events/design-of-development`}>
          <Button buttonName="Know More" />
        </Link>
      </div> */}
    </div>
  );
}

export default EventCard;
