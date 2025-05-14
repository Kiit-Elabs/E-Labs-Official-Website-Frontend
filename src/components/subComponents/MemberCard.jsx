import { Image } from "@heroui/react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";

function MemberCard({
  imgSource = "https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg",
  name = "Name",
  position = "Position",
  domain = "",
  github = "",
  linkedin = "",
  instagram = "",
  membersPage = false,
}) {
  return (
    <div className="flex flex-wrap-reverse justify-center items-center group h-full">
      <div
        className={`w-[240px] flex flex-col justify-center items-center border-2 border-textColor1 rounded-2xl backdrop-blur-lg h-full dark:shadow-sm dark:bg-[#ffccaa]`}
      >
        <div className="h-1/2 justify-center items-center p-5">
          <Image
            className="overflow-hidden group-hover:scale-105 group-hover:shadow-md group-hover:shadow-textColor1 transition-all duration-200 ease-in-out"
            src={imgSource.replace(
              /ar_1:1,c_(fill|auto),g_auto/g,
              "w_1024,ar_1:1,c_auto,g_auto,f_auto"
            )}
            alt={`${name}'s image`}
            radius="lg"
            isBlurred
          ></Image>
        </div>
        <div
          className={`flex flex-col justify-center items-center ${
            !membersPage ? "h-[170px]" : "h-[130px]"
          } mx-3 gap-3 mb-4`}
        >
          <div className="h-1/3 flex items-center justify-start">
            <h1 className="text-xl font-extrabold text-textColor1 h-full">
              {name.toUpperCase()}
            </h1>
          </div>
          <div className="h-1/3 flex flex-col items-center justify-center">
            <p className="text-lg text-textColor2 dark:text-bgColor dark:font-semibold font-medium">
              {position.toUpperCase()}
            </p>
            {!membersPage && (
              <p className="text-base text-textColor1 font-black">
                {domain.toUpperCase()}
              </p>
            )}
          </div>
          <div className="h-1/3 flex flex-row items-end justify-center gap-5 text-textColor2 dark:text-bgColor">
            {github && (
              <a
                href={github}
                target="_blank"
                className=" hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all"
              >
                <FaGithub className="text-[22px]" />
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                className="hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all"
              >
                <FaLinkedin className="text-[22px]" />
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                className="hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all"
              >
                <FaInstagram className="text-[22px]" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
