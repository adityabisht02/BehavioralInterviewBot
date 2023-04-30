import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import "./VideoRecorder.css";

export const VideoRecorder = () => {
  const webcamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);

  const startRecording = () => {
    setRecording(true);
    setRecordedChunks([]);
  };

  const stopRecording = () => {
    setRecording(false);
    const videoBlob = new Blob(recordedChunks, { type: "video/mp4" });
    const videoUrl = URL.createObjectURL(videoBlob);
    setRecordedChunks([]);
    if (!webcamRef.current || !webcamRef.current.video.readyState === 4) {
      return;
    }
    webcamRef.current.stop();
    webcamRef.current.stream.getTracks().forEach((track) => track.stop());
    webcamRef.current.stream.getTracks().forEach((track) => track.stop());
    console.log(videoBlob, videoUrl);
  };

  const handleDataAvailable = (event) => {
    if (event.data.size > 0) {
      setRecordedChunks((prev) => prev.concat(event.data));
    }
  };

  const videoConstraints = {
    width: 1280,
    height: 900,
    facingMode: "user",
  };

  return (
    <div className="video-recorder-container">
      <Webcam
        className="webcam"
        audio={false}
        ref={webcamRef}
        videoConstraints={videoConstraints}
      />
      {/* <div className="buttons-container">
        {recording ? (
          <button
            className="stop-button"
            onClick={() => {
              if (webcamRef.current) {
                stopRecording();
              }
            }}
          >
            Stop Recording
          </button>
        ) : (
          <button className="start-button" onClick={startRecording}>
            Start Recording
          </button>
        )}
      </div> */}
      <video
        className="recorded-video"
        style={{ display: recordedChunks.length > 0 ? "block" : "none" }}
        src={URL.createObjectURL(
          new Blob(recordedChunks, { type: "video/mp4" })
        )}
        controls
      />
    </div>
  );
};

export default VideoRecorder;
