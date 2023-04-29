import { useEffect, useState, React } from "react";
import Message from "./Message";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
console.log(SpeechRecognition);

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
                  <p>Microphone: {listening ? "on" : "off"}</p>
                  <button
                    className="p-1 bg-slate-600  hover:bg-slate-500"
                    onClick={() => setListening(true)}
                  >
                    Start
                  </button>
                  <button
                    className="p-1 bg-slate-600  hover:bg-slate-500"
                    onClick={() => setListening(false)}
                  >
                    Stop
                  </button>
                  <button
                    className="p-1 bg-slate-600  hover:bg-slate-500"
                    onClick={resetTranscript}
                  >
                    Reset
                  </button>
                  <p>{transcript} hello</p>
                  {console.log(transcript)}
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
