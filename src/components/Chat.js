import { useEffect, useState } from "react";
import Message from "./Message";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone, faStopCircle } from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";

const Chat = () => {
  const [listening, setListening] = useState(false);
  const {
    transcript,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    transcriptionOnEnd: false, // disable automatic stopping
  });

  useEffect(() => {
    if (listening) {
      SpeechRecognition.startListening({ continuous: true }); // start listening continuously
    } else {
      SpeechRecognition.stopListening(); // stop listening
    }
  }, [listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex h-screen antialiased text-gray-800 w-1/2">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                <div className="grid grid-cols-12 gap-y-2">
                  <Message />
                  <Message />
                  <div className="chat-balloon relative col-span-10">
                    <p className="absolute bottom-2 left-2">{transcript}</p>
                  </div>
                  <div className="microphone-status col-span-2 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faMicrophone}
                      size="2x"
                      color={listening ? "#10B981" : "#6B7280"}
                    />
                    <p>{listening ? "Listening" : "Not Listening"}</p>
                  </div>
                  <button
                    className="btn btn-primary"
                    onClick={() => setListening(true)}
                    disabled={listening}
                  >
                    Start
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => setListening(false)}
                    disabled={!listening}
                  >
                    <FontAwesomeIcon icon={faStopCircle} size="1x" />
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={resetTranscript}
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
