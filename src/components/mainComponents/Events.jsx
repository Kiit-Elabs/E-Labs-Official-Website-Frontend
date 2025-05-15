import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import EventDetails from "../subComponents/EventDetails";
// import { useSelector } from "react-redux";
import { FiArrowLeftCircle, FiArrowRightCircle } from "react-icons/fi";
import "../../styles/Slider.css";
import { Image } from "@heroui/react";
import { useEffect, useState } from "react";

const CustomNextArrow = ({ className, onClick }) => (
  <div
    className="
      hidden md:flex 
      md:absolute md:-mt-4 md:top-1/2 md:-translate-y-1/2 md:right-6
      lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-right-5 
      justify-center items-center z-10 cursor-pointer"
    onClick={onClick}
  >
    <FiArrowRightCircle className="text-3xl text-textColor1 transition-all duration-250 ease-in-out hover:scale-110" />
  </div>
);

const CustomPrevArrow = ({ className, onClick }) => (
  <div
    className="
      hidden md:flex 
      md:absolute md:-mt-4 md:top-1/2 md:-translate-y-1/2 md:left-6
      lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:-left-5 
      justify-center items-center z-10 cursor-pointer"
    onClick={onClick}
  >
    <FiArrowLeftCircle className="text-3xl font-bold text-textColor1 transition-all duration-250 ease-in-out hover:scale-110" />
  </div>
);

function Events() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(import.meta.env.VITE_GET_EVENT_URI);
      const data = await response.json();
      setEvents(data.events);
    };
    fetchEvents();
  }, []);

  let settings = {
    dots: true,
    dotsClass: "slick-dots slick-thumb",
    customPaging: (i) => {
      return (
        <a>
          <Image
            src={events[i].image}
            alt={`Event ${i}`}
            isBlurred
            className="rounded-md shadow-sm shadow-textColor1"
          />
        </a>
      );
    },
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    swipeToSlide: true,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
  };

  return (
    <div className="relative w-full max-w-6xl px-4 mt-20 mx-auto mb-24 dark:bg-[radial-gradient(circle_at_center,#fff_1%,#ffedde_15%,#ffd4b3_40%)]">
      <h1 className="sm:text-5xl text-4xl font-black mb-8 text-textColor1 mx-5 text-balance text-center">
        Our Past and Upcoming Events
      </h1>
      <Slider {...settings}>
        {events.map((el, index) => (
          <div
            key={index}
            className="w-full flex flex-col md:flex-row items-center justify-evenly px-4 lg:px-10"
          >
            <EventDetails eventInfo={el} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default Events;
