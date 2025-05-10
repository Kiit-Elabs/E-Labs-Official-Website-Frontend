import React from 'react'
import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'

function MemberCard({
  imgSource = 'https://static.remove.bg/sample-gallery/graphics/bird-thumbnail.jpg',
  name = 'Name',
  position = 'Position',
  domain = '',
  github = '',
  linkedin = '',
  instagram = '',
}) {
  return (
    <div className="flex flex-wrap-reverse justify-center items-center group h-full">
      <div
        className={`w-[80%] flex flex-col justify-center items-center border-2 border-textColor1 rounded-xl backdrop-blur-lg h-full`}
      >
        <div className="h-1/2 justify-center items-center p-5">
          <figure className="rounded-xl overflow-hidden group-hover:scale-105 aspect-square object-cover group-hover:shadow-md group-hover:shadow-textColor1 transition-all duration-200 ease-in-out">
            <img
              src={imgSource}
              width={225}
              height={225}
              alt={`${name}'s image`}
            />
          </figure>
        </div>
        <div className="flex flex-col justify-start items-center h-[170px] mx-3 gap-3 mb-4">
          <div className="h-1/3 flex">
            <h1 className="text-xl font-extrabold text-textColor1">
              {name.toUpperCase()}
            </h1>
          </div>
          <div className="h-1/3 flex flex-col items-center justify-center">
            <p className="text-lg text-textColor2 font-medium">
              {position.toUpperCase()}
            </p>
            <p className="text-base text-textColor1 font-black">
              {domain.toUpperCase()}
            </p>
          </div>
          <div className="h-1/3 flex flex-row items-end justify-center gap-5  ">
            {github && (
              <a
                href={github}
                target="_blank"
                className="text-textColor2 hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all"
              >
                <FaGithub className="text-[22px]"></FaGithub>
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                className="text-textColor2 hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all"
              >
                <FaLinkedin className="text-[22px]"></FaLinkedin>
              </a>
            )}
            {instagram && (
              <a
                href={instagram}
                target="_blank"
                className="text-textColor2 hover:text-textColor1 hover:scale-105 duration-200 ease-in-out transition-all"
              >
                <FaInstagram className="text-[22px]"></FaInstagram>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberCard
