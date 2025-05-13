import React, { useRef } from "react";
import IconButton from "../subComponents/IconButton";
import EventCard from "../subComponents/EventCard";
import Member from "./Member";
// import Signup from "../mainComponents/Signup";
// import Login from "../mainComponents/Login";
import EventPage from "../mainComponents/EventPage";
import { delay, motion } from "framer-motion";

function FirstPage() {
  const widgetRef = useRef();
  const firstVariant = {
    initial: { y: "-100vh" },
    final: { y: 0 },
    transition: {
      delay: 0,
      duration: 5,
      type: "spring",
      stiffness: 200,
    },
  };

  return (
    <div className="flex flex-col items-center justify-center flex-grow dark:bg-[#ffdab9] ">
      <div className="flex scale-95 flex-col items-center justify-center gap-6 w-full">
        <motion.figure
          variants={firstVariant}
          initial="initial"
          animate="final"
          transition="transition"
        >
          <img
            className=""
            src="https://res.cloudinary.com/dpqdgcipi/image/upload/v1719200986/Trasnparent12_1_d7siyr.png"
            width={256}
          />
        </motion.figure>
        <div className="heading flex items-center justify-center flex-col gap-2">
          <motion.h1
            animate={{ left: 0 }}
            className="text-textColor1 text-center font-black text-3xl md:text-5xl "
          >
            Empowering Through Collaboration
          </motion.h1>
          <motion.div
            animate={{ scale: 1 }}
            className="text-textColor1 text-center font-black flex flex-wrap justify-center items-center gap-2"
          >
            <span className="text-2xl md:text-4xl text-center font-black break-inside-avoid whitespace-nowrap flex">
              Peer-to-Peer Learning at
            </span>
            <span className="text-4xl md:text-6xl text-center font-black break-inside-avoid whitespace-nowrap flex">
              E Labs
            </span>
          </motion.div>
        </div>
        <p className="text-textColor2 dark:text-black max-w-96 text-center">
          Join us as we foster a community-driven approach to knowledge.
        </p>
        <IconButton
          userClass="animate-bounce"
          buttonName="KNOW MORE"
          imageSource="../Images/next.png"
        />
        {/* Testing Components */}
      </div>
    </div>
  );
}

export default FirstPage;
