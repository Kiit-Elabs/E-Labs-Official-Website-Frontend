import { useState, useEffect, useCallback } from "react";
// import { useSelector } from "react-redux";
import FeedbackCard from "../subComponents/FeedbackCard";

function Feedback() {
  // const feedbacks = useSelector((state) => state.feedback);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      const response = await fetch(import.meta.env.VITE_GET_FEEDBACK_URI);
      const data = await response.json();
      const shuffledFeedbacks = data.feedback.sort(() => Math.random() - 0.5);
      setFeedbacks(shuffledFeedbacks);
    };
    fetchFeedbacks();
  }, []);

  const updateVisibleCards = useCallback(() => {
    const width = window.innerWidth;
    if (width < 768) {
      setVisibleCards(1);
    } else if (width < 1024) {
      setVisibleCards(2);
    } else if (width < 1280) {
      setVisibleCards(2);
    } else {
      setVisibleCards(3);
    }
  }, []);

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [updateVisibleCards]);

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % feedbacks.length);
    }, 2000);

    return () => clearInterval(slideInterval);
  }, [feedbacks.length]);

  return (
    <div className="flex flex-col items-center justify-around dark:bg-[radial-gradient(circle_at_center,#fff_1%,#ffedde_20%,#ffd4b3_50%)] py-20 p-4 xl:px-8 w-full mt-6">
      <h1 className="md:text-5xl text-4xl text-balance font-black text-textColor1 mb-8 text-center">
        Feedback from our Students
      </h1>

      {/* <div
        className="w-[90%] h-[4px] bg-gradient-to-b from-[#F7941D] to-[#915711]"
        style={{
          background:
            "linear-gradient(180deg, #F7941D -348.21%, #915711 0.22%)",
        }}
      ></div> */}

      <div className="flex w-full mx-20 overflow-hidden my-10">
        <div
          className="flex transition-transform duration-700 ease-in-out w-full justify center"
          style={{
            transform: `translateX(-${currentIndex * (100 / visibleCards)}%)`,
          }}
        >
          {feedbacks.map((feedback, index) => (
            <div
              key={index}
              className="flex-shrink-0 px-2"
              style={{ width: `${100 / visibleCards}%` }}
            >
              <div className="max-w-[80%] mx-auto">
                <FeedbackCard
                  name={feedback.user}
                  feedback={feedback.feedback}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feedback;
