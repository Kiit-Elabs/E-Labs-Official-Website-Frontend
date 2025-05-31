import { useEffect, useState } from "react";

import About from "./About";
import FirstPage from "./FirstPage";
import Events from "./Events";
import Member from "./Member";
import Feedback from "./Feedback";
import Gallery from "./Gallery";
import Domain from "./Domain";

function Home() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const response = await fetch(import.meta.env.VITE_GET_EVENT_URI);
      const data = await response.json();
      setEvents(data.events);
    };
    fetchEvents();
  }, []);

  return (
    <div className="body dark:bg-[#ffd4b3] dark:backdrop-blur-lg " >
      <section
        id="home"
        className="min-h-screen flex flex-col justify-center items-center"
      >
        <FirstPage />
      </section>
      <section id="aboutPage">
        <About />
      </section>
      <section id="domain">
        <Domain />
      </section>
      <section id="eventPage">
        <Events />
      </section>
      {/* <section id="membersPage">
        <Member />
      </section> */}
      <section id="galleryPage">
        <Gallery />
      </section>
      <section id="feedbackPage">
        <Feedback />
      </section>
      <br />
    </div>
  );
}

export default Home;
