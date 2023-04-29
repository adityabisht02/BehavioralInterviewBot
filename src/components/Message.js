import React from "react";
import robotimg from "../images/robot.png";

const Message = ({ message }) => {
  console.log(message);
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <img
          src={robotimg}
          className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
        ></img>
        <div className="relative ml-3 text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white p-5 shadow rounded-xl">
          <div>
            Hey I am your buddy CareerBot
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
