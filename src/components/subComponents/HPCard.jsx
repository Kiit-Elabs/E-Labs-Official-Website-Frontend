import React from "react";

function HPCard({
  heading = "",
  // subHeading = "",
  description = "",
  userClass = "",
}) {
  return (
    <div className="p-4 flex flex-col gap-5 max-w-[60rem]">
      <div className="flex flex-col justify-center items-start">
        <h1 className={`text-textColor1 font-extrabold ${userClass}`}>
          {heading}
        </h1>
        {/* <h3 className="text-textColor1 text- font-thin text-sm">
          {subHeading}
        </h3> */}
      </div>
      <div>
        <p className="text-textColor2 dark:text-black max-w-[60ch] text-left text-balance lg:line-clamp-[8] mt-4 lg:mt-0">
          {description}
        </p>
      </div>
    </div>
  );
}

export default HPCard;
