import React from "react";
import Chat from "./Chat";
import VideoRecorder from "./VideoRecorder";

function Home() {
  return (
    <div className="flex flex-row">
      <VideoRecorder />
      <Chat />
    </div>
  );
}

export default Home;
