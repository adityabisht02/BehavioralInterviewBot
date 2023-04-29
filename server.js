require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);
var introprompt =
  "A candidate is practicing for his behavioral interview for software engineering. I will give you the question asked and his response. Please evaluate his response in detail. \n\nQ1. Can you talk about a time where you had to do something in a very short deadline? \n\nResponse: I had to maintain an open source android app, so I had to learn about fragments, API integration, etc. in a short time. \n\nFeedback: Please provide feedback on the candidate's eagerness to learn, optimism, willingness to collaborate with others, and technical confidence based on their response to the above question.";
async function getFeedback() {
  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: introprompt,
    temperature: 0.5,
    max_tokens: 100,
  });
  console.log(response.data.choices[0].text);
}

getFeedback();
