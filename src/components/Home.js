import React from "react";
import Chat from "./Chat";
import VideoRecorder from "./VideoRecorder";
import botimg from "../images/robot.png";
function Home() {
  return (
    <div className="flex flex-col">
      <div className="mt-0 p-4 bg-slate-700 flex flex-row items-center ">
        <img className="h-10 w-10 rounded-full" src={botimg}></img>
        <p className="font-bold text-lg text-white ml-4">InterviewBot</p>
      </div>
      <div className="flex flex-row">
        <VideoRecorder />
        <Chat />
      </div>
    </div>
  );
}

export default Home;
