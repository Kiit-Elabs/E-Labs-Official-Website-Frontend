import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import EventDetails from "../subComponents/EventDetails";
import { useSelector } from "react-redux";
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import "../../styles/Slider.css";

const CustomNextArrow = ({ className, onClick }) => (
  <div
    className="
      hidden md:flex 
      md:absolute md:-mt-4 md:top-1/2 md:-translate-y-1/2 md:right-6
      lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0 
      justify-center items-center z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowCircleRight className="text-3xl text-orange-500 hover:text-orange-400 transition-transform hover:scale-110" />
  </div>
);

const CustomPrevArrow = ({ className, onClick }) => (
  <div
    className="
      hidden md:flex 
      md:absolute md:-mt-4 md:top-1/2 md:-translate-y-1/2 md:left-6
      lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:left-0 
      justify-center items-center z-10 cursor-pointer"
    onClick={onClick}
  >
    <FaArrowCircleLeft className="text-3xl text-orange-500 hover:text-orange-400 transition-transform hover:scale-110" />
  </div>
);
function Events() {
  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    swipeToSlide: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  
  
  let events = useSelector((state) => state.eventDetails);
  return (
    <div className="relative w-full max-w-6xl px-4 pt-32 mx-auto">
      <h1 className="text-5xl font-black mb-8 text-textColor1 text-center">UPCOMING EVENTS</h1>
      <Slider {...settings}>
        {events.map((el, index) => (
          <div key={index} className="w-full flex flex-col md:flex-row items-center justify-evenly">
            <EventDetails eventInfo={el} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Events;
