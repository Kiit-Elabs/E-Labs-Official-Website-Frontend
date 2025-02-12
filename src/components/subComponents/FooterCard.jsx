import React from "react";

function FooterCard({ heading = "Heading", array = [], icon1 }) {
  return (
    <div className="flex flex-col gap-2 min-w-48">
      <h1 className="font-extrabold text-xl text-textColor1 sm:text-left text-center">
        {heading}
      </h1>
      <div>
        {array.map((el) => {
          return (
            <pre className="sm:text-left text-center" key={el.desc}>
              <a
                target="_blank"
                href={el.url}
                className=" text-sm font-verna text-textColor2 dark:text-black hover:text-textColor1 duration-200"
              >
                {icon1}
                {el.desc}
              </a>
            </pre>
          );
        })}
      </div>
    </div>
  );
}

export default FooterCard;
