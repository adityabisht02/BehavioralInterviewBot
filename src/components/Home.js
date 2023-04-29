import React from "react";
import Chat from "./Chat";
import Message from "./Message";
const { Configuration, OpenAIApi } = require("openai");
console.log(process.env);
function Home() {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);

  async function getFeedback() {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt:
        "A candidate is practising for his behavioural interview for software engineering,I will be giving u the question asked and his response, I want u to critically evaluate his response in detail(i repeat in detail)." +
        "Q1.Can u talk about a time where u had to do something in a very short deadline." +
        "response- I had to maintain an open source android app, so I had to learn about fragments, api integration, etc in a short time.",
    });
    console.log(response.data.choices[0].text);
  }
  return (
    <div className="flex flex-row ">
      <div className="w-1/2">
        <button onClick={getFeedback}>Click me</button>hi
      </div>
      <Chat />
    </div>
  );
}

export default Home;
