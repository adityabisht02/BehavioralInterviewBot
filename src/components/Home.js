import React from "react";
import Chat from "./Chat";
import Message from "./Message";
import { EmotionDetector } from "./EmotionDetector";
import {VideoRecorder} from './VideoRecorder';

function Home() {
  const { Configuration, OpenAIApi } = require("openai");

  const configuration = new Configuration({
    apiKey: "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",
  });

  const openai = new OpenAIApi(configuration);
  var introprompt =
    "Your task is to evaluate my response to behvioural questions. I will be giving you a behavioural quwestion and I will give u my response for that question. Your task is to critically evaluate my response and give detailed feedback. For background I am applying for a software engineering position.Q1.Can u talk about a time where u had to do something in a very short deadline. My response- I had to maintain an open source android app, so I had to learn about fragments, api integration, etc in a short time.";

  async function getFeedback() {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: introprompt,
      temperature: 0.5,
      max_tokens: 100,
    });
    console.log(response.data.choices[0].text);
  }
  return (
    <div className="flex flex-row ">
      <div className="w-1/2">
      {/* <VideoRecorder/> */}
      <EmotionDetector/>
      </div>
      <Chat />
    </div>
  );
}

export default Home;
