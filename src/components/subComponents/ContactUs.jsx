import React from "react";

function ContactUs() {
  let arr = {
    desc: `Kalinga Institute of\nIndustrial Technology (KIIT)`,
  };
  return (
    <div className="flex flex-col gap-4 min-w-48">
      <h1 className="font-extrabold text-xl text-textColor1 text-center sm:text-left">
        Contact Us
      </h1>
      <div className="flex flex-col gap-2">
        <div className="flex flex-col text-textColor2 dark:text-black text-sm">
          <div>
            <pre className="text-center sm:text-left">
              <a
                className="hover:text-textColor1 focus:text-textColor1 font-verna  duration-200"
                target="_blank"
                href="https://kiit.ac.in/"
              >
                {arr.desc}
              </a>
            </pre>
          </div>
        </div>
        <div className="h-1"></div>
        <div className=" duration-200 flex gap-2 justify-center sm:justify-start items-center text-sm">
          <img src="../Images/circle-phone (3).png" alt="" width={18} />
          <a
            href="tel:0674 2725113"
            className="hover:text-textColor1 focus:text-textColor1 duration-200 text-textColor2 dark:text-black"
          >
            +91 7063887497
          </a>
        </div>
        <div className=" duration-200 flex gap-2 justify-center sm:justify-start items-center">
          <img src="../Images/circle-envelope (1).png" alt="" width={18} />
          <a
            href="mailto: support@elabskiit.in"
            className="text-textColor2 dark:text-black text-sm duration-200 hover:text-textColor1 "
          >
            support@elabskiit.in
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
