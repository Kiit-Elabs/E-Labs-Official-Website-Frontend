import React from "react";
import { useSelector } from "react-redux";

function Domain() {
  let stdmt = useSelector((state) => state.studyMaterials);

  return (
    <div className="w-full font-verna mt-12 h-full flex flex-col items-center justify-center ">
      <h1 className="text-4xl text-balance md:text-5xl font-black mb-8 text-textColor1 mx-3 text-center">
        Introducing Our Domains
      </h1>
      <div
        className="w-[90%] h-[4px] bg-gradient-to-b from-[#F7941D] to-[#915711]"
        style={{
          background:
            "linear-gradient(180deg, #F7941D -348.21%, #915711 0.22%)",
        }}
      ></div>
      <div className="rounded-[32px] border-[3px] border-[#F7941D] mt-[4%] bg-[#0B1215] dark:bg-[#ffdab9] w-[90%] h-full flex flex-col items-center justify-evenly">
        <div className="flex gap-7 px-4 items-center flex-wrap w-full justify-center py-10">
          {stdmt.map((element) => (
            <a
              href="#"
              className="flex hover:scale-105 transition-all ease-in-out duration-300 w-full sm:w-[45%] md:w-[30%] max-w-[350px]"
              key={element.domain}
            >
              <div
                className="flex font-verna flex-col items-center justify-center rounded-[15px] border-[4px] border-[#F7941D] bg-[#0B1215] dark:bg-[#ffccaa] h-52 gap-2.5 w-full p-2"
              >
                <div className="flex items-end justify-center w-full">
                  <img
                    src={element.img}
                    alt={element.domain}
                    className="w-[25%]"
                  />
                </div>
                <div className="flex items-start justify-center w-full">
                  <p className="text-center h-[50%] font-bold text-[22px] w-full text-wrap leading-normal text-[#FFFAFA] dark:text-black">
                    {element.domain}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Domain;
