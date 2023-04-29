import React from "react";
import robotimg from "../images/robot.png";

const Message = (props) => {
  console.log(props.message);
  return (
    <div className="col-start-1 col-end-8 p-3 rounded-lg">
      <div className="flex flex-row items-center">
        <img
          src={robotimg}
          className="flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0"
        alt=""></img>
        <div className="relative ml-3 text-sm bg-slate-700 font-bold text-white p-5 shadow rounded-xl">
          <div>{props.message}</div>
        </div>
      </div>
    </div>
  );
};

export default Message;
