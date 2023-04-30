require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function result() {
  var introprompt =
    "Please evaluate the candidate's response in detail. " +
    "Please provide negative feedback on the candidate's eagerness to learn, optimism, willingness to collaborate with others, and technical confidence based on their responses to the questions. " +
    "Question: " +
    question +
    "\n" +
    "Response: " +
    answer +
    "\n";

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: introprompt,
    temperature: 0.5,
    max_tokens: 100,
  });
  console.log(response.data.choices[0].text);
}
