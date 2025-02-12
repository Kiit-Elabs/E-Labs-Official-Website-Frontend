import React from "react";

function MemberCard({
  imgSource = "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
  name = "Name",
  position = "Position",
}) {
  return (
    <div className="flex flex-wrap-reverse justify-center items-center group">
      <div
        className={`w-[70%] flex flex-col justify-center gap-3 items-center border-2 border-textColor1 rounded-xl backdrop-blur-lg pt-2`}
      >
        <div className="h-1/2 justify-center items-center p-5 group-hover:scale-105 transition-all duration-200 ease-in-out">
          <figure className="rounded-xl overflow-hidden aspect-square object-cover group-hover:shadow-md group-hover:shadow-textColor1 transition-all duration-200 ease-in-out">
            <img src={imgSource} width={225} height={225} />
          </figure>
        </div>
        <div className="flex flex-col justify-center items-stat h-1/2 mx-3 gap-2 mb-4">
          <h1 className="text-xl sm:text-[25px] font-bold text-textColor1">
            {name.toUpperCase()}
          </h1>
          <p className="text-lg text-textColor2 font-thin">
            {position.toUpperCase()}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
