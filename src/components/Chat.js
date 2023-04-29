import { useEffect, useState, React } from "react";
import Message from "./Message";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
console.log(SpeechRecognition);

const Chat = () => {
  const [listening, setListening] = useState(false);
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition({
      transcriptionOnEnd: false, // disable automatic stopping
    });
  //state to store questions and their responses
  const [quesresponse, setresponse] = useState([
    {
      question:
        "Can u talk about a time where u had to do something in a very short deadline.",
      response: "",
      feedback: "",
    },
  ]);
  //keep track of question number
  const [questionIndex, setQuestionIndex] = useState(0);

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

  function askNextQuestion() {
    var arr = quesresponse;
    console.log(arr);
  }

  return (
    <div className="flex h-screen antialiased text-gray-800 w-1/2">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full  justify-between">
                {/* <div className="grid grid-cols-12 gap-y-2"> */}
                <div className="container">
                  <Message />
                </div>
                <div className="flex flex-row m-auto text-md text-white">
                  <p>Microphone: {listening ? "on" : "off"}</p>

                  <button
                    className="p-1 bg-slate-600  hover:bg-slate-500 m-2"
                    onClick={() => setListening(true)}
                  >
                    Speak
                  </button>
                  <button
                    className="p-1 bg-slate-600  hover:bg-slate-500 m-2"
                    onClick={() => setListening(false)}
                  >
                    Stop speaking
                  </button>
                  <button
                    className="p-2 bg-slate-600  hover:bg-slate-500 w-1/4 m-2"
                    onClick={askNextQuestion}
                  >
                    Next question
                  </button>
                </div>
                <p>{transcript} hello</p>
                {console.log(transcript)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
