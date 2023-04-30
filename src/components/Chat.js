import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
const { Configuration, OpenAIApi } = require("openai");

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
        "Can u talk about a time where u had to do something in a very short deadline?",
      response: "",
      feedback: "",
    },
    {
      question:
        " Speak about a project you’re most passionate about or one that you felt exhibited your best work.",
      response: "",
      feedback: "",
    },
    {
      question: "What are you looking for in your next role?",
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

  //openAI configuration
  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);

  async function getFeedback(question, answer) {
    var introprompt =
      "Please evaluate the candidate's response in detail. " +
      "Please provide negative feedback on the candidate's eagerness to learn, optimism, willingness to collaborate with others, and technical confidence based on their responses to the questions. " +
      "Question: " +
      question +
      "\n" +
      "Response: " +
      answer +
      "\n";
    try {
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: introprompt,
        temperature: 0.5,
        max_tokens: 100,
      });
      return response.data.choices[0].text;
    } catch (error) {
      console.log(error);
    }
  }
  function nextQuestion(transcript) {
    //set user response
    var arr = quesresponse;
    arr[questionIndex].response = transcript;
    //get feedback from gpt
    var feedback = getFeedback(
      arr[questionIndex].question,
      arr[questionIndex].response
    );
    //set feedback
    arr[questionIndex].feedback = feedback;
    setresponse(arr);
    if (questionIndex == 2) {
      return;
    }
    setQuestionIndex(questionIndex + 1);
  }
  function printresp() {
    console.log(quesresponse);
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
                  <Message message="Welcome to your behavioral Interview!! U will be given 3 questions to get an idea of your technical experience, optimism and eagerness to learn. Click on next question to move to the next question and the play and stop buttons to speak your response." />
                  <Message message={quesresponse[questionIndex].question} />
                  <div className="chat-balloon relative col-span-10">
                    <p className="absolute bottom-2 left-2">{transcript}</p>
                  </div>
                  <div className="microphone-status col-span-2 flex items-center justify-center">
                    {listening ? (
                      <div>
                        <FontAwesomeIcon
                          icon={faMicrophone}
                          size="2x"
                          color="#10B981"
                        />
                        <p>Listening</p>
                        <button
                          className="btn btn-danger"
                          onClick={() => setListening(false)}
                          disabled={!listening}
                        >
                          <FontAwesomeIcon icon={faStopCircle} size="1x" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <FontAwesomeIcon
                          icon={faMicrophone}
                          size="2x"
                          color="#6B7280"
                        />
                        <br />
                        <p>Not Listening</p>
                        <button
                          className="btn btn-primary"
                          onClick={() => setListening(true)}
                          disabled={listening}
                        >
                          <FontAwesomeIcon icon={faPlay} size="1x" />
                        </button>
                      </div>
                    )}
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={resetTranscript}
                  >
                    <FontAwesomeIcon icon={faReply} size="1x" />
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      nextQuestion(transcript);
                      resetTranscript(); //reset transcript after setting it
                    }}
                  >
                    Submit and Next question
                  </button>
                  <button className="btn btn-secondary" onClick={printresp}>
                    Log Array
                  </button>
                  <Link
                    to={{
                      pathname: "/report",
                    }}
                    state={quesresponse}
                  >
                    <button
                      className="btn btn-secondary"
                      onClick={() => {
                        console.log(quesresponse[0]);
                      }}
                    >
                      Generate Report
                    </button>
                  </Link>
                </div>
                <p>{transcript} hello</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
