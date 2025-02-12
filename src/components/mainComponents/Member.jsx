import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import MemberCard from "../subComponents/MemberCard";
import { useSelector } from "react-redux";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "../../styles/Slider.css";

const CustomNextArrow = ({ className, onClick, style }) => {
  return (
    <div className={className} onClick={onClick}>
      <FaArrowCircleRight className="text-2xl text-textColor1/80 hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all" />
    </div>
  );
};

const CustomPrevArrow = ({ className, onClick, style }) => {
  return (
    <div className={className} onClick={onClick}>
      <FaArrowCircleLeft className="text-2xl text-textColor1/80 hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all" />
    </div>
  );
};

function Member() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  let memberDetails = useSelector((state) => state.memberDetails);

  return (
    <div className="w-full flex flex-col items-center justify-center text-center mt-24 dark:bg-[radial-gradient(circle_at_center,#fff_1%,#ffedde_20%,#ffd4b3_50%)] mb-32 px-3 h-full">
      <h1 className="sm:text-5xl text-4xl font-black mb-14 text-textColor1 mx-3 text-balance">
        Meet With Our Team
      </h1>
      <Slider
        {...settings}
        className="flex flex-row justify-center items-center text-center w-[80%] gap-16 h-full"
      >
        {memberDetails.map((el) => (
          <div
            className="w-full flex items-center justify-center h-full"
            key={el.name}
          >
            <MemberCard
              name={el.name}
              imgSource={el.imgSrc}
              position={el.position}
              domain={el.domain}
              github={el.github}
              linkedin={el.linkedin}
              instagram={el.instagram}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Member;
