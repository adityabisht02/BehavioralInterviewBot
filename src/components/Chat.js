import { useEffect, useState } from "react";
import Message from "./Message";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMicrophone,
  faPlay,
  faReply,
  faStopCircle,
} from "@fortawesome/free-solid-svg-icons";
import "./Chat.css";

const Chat = () => {
  const [listening, setListening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [messages, setMessages] = useState([]);

  const questions = ["What is your name?", "How old are you?", "Where are you from?",];

  const { transcript, resetTranscript } = useSpeechRecognition();

  useEffect(() => {
    if (listening) {
      SpeechRecognition.startListening({ continuous: true });
    } else {
      SpeechRecognition.stopListening();
    }
  }, [listening]);

  useEffect(() => {
    if (transcript !== "") {
      setAnswers((prevAnswers) => [...prevAnswers, transcript]);
      resetTranscript();
    }
  }, [transcript]);

  useEffect(() => {
    if (currentQuestion === questions.length) {
      setListening(false);
      //here we can add the api and update the user's answer and update the messgae
      setMessages([...messages, { text: "Thank you for your answers!", isUser: false },]);
    } else if (currentQuestion >= 0) {
      setMessages([...messages, { text: questions[currentQuestion], isUser: false },
      ]);
      setListening(true);
    }
  }, [currentQuestion]);

  const handleNextQuestion = () => {
    setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    resetTranscript();
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setMessages([]);
  };

  return (
    <div className="flex h-screen antialiased text-gray-800 w-1/2">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex flex-col flex-auto h-full p-6">
          <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
            <div className="flex flex-col h-full overflow-x-auto mb-4">
              <div className="flex flex-col h-full">
                {messages.map((message, index) => (
                  <Message key={index} message={message} />
                ))}
                {currentQuestion >= 0 && (
                  <div className="chat-balloon relative col-span-10">
                    <p className="absolute bottom-2 left-2">{transcript}</p>
                  </div>
                )}
                <div className="grid grid-cols-12 gap-y-2">
                  <div className="microphone-status col-span-2 flex items-center justify-center">
                    <FontAwesomeIcon
                      icon={faMicrophone}
                      className={`${listening ? "text-red-500" : "text-gray-400"} text-3xl cursor-pointer`}
                      onClick={() => setListening(!listening)}
                    />
                  </div>
                  {currentQuestion >= 0 && (
                    <div className="col-span-6">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font -semibold py-2 px-4 rounded-full"
                        onClick={handleNextQuestion}
                      >
                        <FontAwesomeIcon icon={faPlay} className="mr-2" />
                        Next
                      </button>
                    </div>
                  )}
                  {currentQuestion === questions.length && (
                    <div className="col-span-6">
                      <button
                        className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-full"
                        onClick={handleRestart}
                      >
                        <FontAwesomeIcon icon={faReply} className="mr-2" />
                        Restart
                      </button>
                    </div>
                  )}
                  {currentQuestion >= 0 && (
                    <div className="col-span-4">
                      <button
                        className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-full"
                        onClick={() => {
                          setListening(false);
                          resetTranscript();
                        }}
                      >
                        <FontAwesomeIcon icon={faStopCircle} className="mr-2" />
                        Stop
                      </button>
                    </div>
                  )}
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