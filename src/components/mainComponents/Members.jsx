import "../../styles/Slider.css";

import { useState, useEffect, useCallback } from "react";
import MemberCard from "../subComponents/MemberCard";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
// import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { Button, Select, SelectItem } from "@heroui/react";

// const CustomNextArrow = ({ className, onClick, style }) => {
//   return (
//     <div className={className} onClick={onClick}>
//       <FaArrowCircleRight className="text-2xl text-textColor1/80 hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all" />
//     </div>
//   );
// };

// const CustomPrevArrow = ({ className, onClick, style }) => {
//   return (
//     <div className={className} onClick={onClick}>
//       <FaArrowCircleLeft className="text-2xl text-textColor1/80 hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all" />
//     </div>
//   );
// };

const domainList = [
  { label: "Coordinators", value: "coordinator" },
  { label: "Web Development", value: "web_dev" },
  { label: "Android Development", value: "android" },
  { label: "UI/UX", value: "ui_ux" },
  { label: "Graphic Designing", value: "graphic" },
  { label: "AI/ML", value: "ml" },
  { label: "AR/VR & Game Development", value: "arvr_game" },
  { label: "Java", value: "java" },
  { label: "IoT & Embedded Systems", value: "iot" },
  { label: "Cloud Computing", value: "cloud" },
  { label: "Marketing & PR", value: "marketing" },
  { label: "Content Writing", value: "content" },
  { label: "Photography & Video Editing", value: "photography" },
  { label: "Cyber Security", value: "cyber_sec" },
  { label: "Data Analytics", value: "data_anal" },
];

function Members({ isHomePage = false }) {
  const navigate = useNavigate();
  const [selectedDomain, setSelectedDomain] = useState("");
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleCards, setVisibleCards] = useState(4);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_GET_MEMBER_URI);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        if (!data?.members || !Array.isArray(data.members)) {
          throw new Error("Invalid data format received from API");
        }

        const sortedMembers = data.members.sort(
          (a, b) => b.priority - a.priority
        );
        setAllMembers(sortedMembers);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, []);

  const updateVisibleCards = useCallback(() => {
    const width = window.innerWidth;
    if (width < 640) setVisibleCards(1);
    else if (width < 768) setVisibleCards(2);
    else if (width < 1024) setVisibleCards(3);
    else setVisibleCards(4);
  }, []);

  useEffect(() => {
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, [updateVisibleCards]);

  const coordinators = allMembers.filter(
    (member) =>
      member?.designation?.toLowerCase()?.includes("coordinator") ||
      member?.designation?.toLowerCase()?.includes("assistant coordinator")
  );

  const leadsAndAssistantLeads = allMembers.filter(
    (member) =>
      member?.designation?.toLowerCase()?.includes("lead") ||
      member?.designation?.toLowerCase()?.includes("assistant lead")
  );

  const regularMembers = allMembers.filter(
    (member) =>
      !member?.designation?.toLowerCase()?.includes("coordinator") &&
      !member?.designation?.toLowerCase()?.includes("assistant coordinator") &&
      !member?.designation?.toLowerCase()?.includes("lead") &&
      !member?.designation?.toLowerCase()?.includes("assistant lead")
  );

  const domains = [
    ...new Set(
      allMembers.flatMap((member) =>
        Array.isArray(member?.domain) ? member.domain : []
      )
    ),
  ].filter(Boolean);

  useEffect(() => {
    if (domains.length > 0 && selectedDomain === "") {
      setSelectedDomain("coordinator");
    }
  }, [domains, selectedDomain]);

  const filteredMembers = !selectedDomain
    ? regularMembers
    : selectedDomain === "coordinator"
    ? coordinators
    : regularMembers
        .concat(leadsAndAssistantLeads)
        .filter(
          (member) =>
            Array.isArray(member?.domain) &&
            member.domain.includes(selectedDomain)
        )
        .sort((a, b) => b.priority - a.priority);

  const handleViewMore = () => navigate("/members");

  if (loading)
    return (
      <div className="flex items-center justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-textColor1"></div>
      </div>
    );

  if (error)
    return (
      <div className="text-center py-12 bg-red-50 rounded-lg max-w-2xl mx-auto">
        <div className="text-red-500 font-medium">Error: {error}</div>
      </div>
    );

  if (isHomePage) {
    const leadershipMembers = [...coordinators, ...leadsAndAssistantLeads].sort(
      (a, b) => b.priority - a.priority
    );
    // const displayMembers = leadershipMembers.slice(0, visibleCards);

    let settings = {
      dots: false,
      arrows: false,
      infinite: true,
      slidesToShow: 4,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 2500,
      speed: 2500,
      cssEase: "linear",
      // nextArrow: <CustomNextArrow />,
      // prevArrow: <CustomPrevArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
          },
        },
        {
          breakpoint: 900,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };

    return (
      <div className="w-full flex flex-col items-center justify-center text-center mt-36 dark:bg-[radial-gradient(circle_at_center,#fff_1%,#ffedde_20%,#ffd4b3_50%)] mb-36 h-full">
        <h1 className="sm:text-5xl text-4xl font-black mb-14 text-textColor1 mx-3 text-balance">
          Meet With Our Team
        </h1>

        {/* <div className="w-full max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
            {leadershipMembers.map((member) => (
              <div
                key={member?._id}
                className="w-full"
                style={{
                  minWidth: "300px",
                  maxWidth: "350px",
                }}
              >
                <div className="relative h-full w-full group">
                  <MemberCard
                    imgSource={member?.image}
                    name={member?.name}
                    position={member?.designation}
                    domain={
                      Array.isArray(member?.domain)
                        ? member.domain.join(", ")
                        : ""
                    }
                    github={member?.github}
                    linkedin={member?.linkedin}
                    instagram={member?.instagram}
                    className="relative z-10 w-full h-full transform group-hover:scale-105 group-hover:-translate-y-2 transition-all duration-300 ease-out shadow-xl group-hover:shadow-2xl rounded-2xl overflow-hidden border-2 border-white/20 group-hover:border-textColor1/30"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-textColor1/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        <Slider
          {...settings}
          className="flex flex-row justify-center items-center text-center w-[90%] gap-16 h-full cursor-grabbing"
        >
          {leadershipMembers.map((el) => (
            <div
              className="w-full flex items-center justify-center h-full"
              key={el._id}
            >
              <MemberCard
                name={el.name}
                imgSource={el.image}
                position={el.designation}
                domain={
                  el.designation != "Coordinator" &&
                  el.designation != "Assistant Coordinator"
                    ? domainList.find((domain) => domain.value === el.domain[0])
                        ?.label
                    : ""
                }
                github={el.github}
                linkedin={el.linkedin}
                instagram={el.instagram}
              />
            </div>
          ))}
        </Slider>

        <Link to="/members">
          <Button
            className="w-[250px] hover:scale-105 transition-all ease-in-out duration-200 font-bold text-xl mt-12"
            type="submit"
            variant="shadow"
            color="warning"
            radius="lg"
            size="lg"
          >
            View More
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col items-center justify-center text-center py-12 px-4 dark:bg-[radial-gradient(circle_at_center,#fff_1%,#ffedde_20%,#ffd4b3_50%)]">
      <h1 className="text-4xl md:text-5xl font-black mb-6 text-textColor1 tracking-wide mt-4">
        OUR TEAM MEMBERS
      </h1>

      {domains.length > 0 && (
        <div className="mb-14 mt-6 w-full max-w-md px-6">
          <Select
            variant="faded"
            color="warning"
            size="lg"
            defaultSelectedKeys={["coordinator"]}
            classNames={{
              popoverContent: "dark",
            }}
            className="dark dark:light"
            onSelectionChange={(keys) => {
              if (keys instanceof Set && keys.size > 0) {
                setSelectedDomain(Array.from(keys)[0]);
              } else {
                setSelectedDomain(selectedDomain);
              }
            }}
            scrollShadowProps={{
              hideScrollBar: false,
            }}
          >
            {["coordinator"]
              .concat(
                domains.sort((a, b) =>
                  domainList
                    .find((domain) => domain.value === a)
                    ?.label.localeCompare(
                      domainList.find((domain) => domain.value === b)?.label
                    )
                )
              )
              .map((domain) => (
                <SelectItem
                  key={domain}
                  variant="flat"
                  color="warning"
                  classNames={{ title: "font-verna" }}
                >
                  {domainList.find((d) => d.value === domain)?.label}
                </SelectItem>
              ))}
          </Select>
        </div>
      )}

      <div className="w-full max-w-7xl mb-16">
        {filteredMembers.length > 0 ? (
          <div className="flex flex-wrap justify-center items-center gap-12 mx-10">
            {filteredMembers.map((member) => (
              <MemberCard
                key={member?._id}
                imgSource={member?.image}
                name={member?.name}
                position={member?.designation}
                github={member?.github}
                linkedin={member?.linkedin}
                instagram={member?.instagram}
                membersPage={true}
                // className="transform hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-lg hover:shadow-xl rounded-lg overflow-hidden w-[85%] mx-auto"
              />
            ))}
          </div>
        ) : (
          <p className="text-textColor1 text-lg py-8 bg-orange-50 rounded-lg max-w-2xl mx-auto">
            No members found for the selected domain.
          </p>
        )}
      </div>
    </div>
  );
}

export default Members;
