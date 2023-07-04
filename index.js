require("dotenv").config();
const { Configuration, OpenAIApi } = require("openai");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

const PORT = 80;
const app = express();
app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", function (req, res) {
  return res.send("Hello from Chat Buddy.");
});

app.post("/autocomplete", async function (req, res) {
  try {
    const { prompt } = req.body;
    if (
      !Boolean(prompt) ||
      (typeof prompt === "string" && !Boolean(prompt.trim()))
    ) {
      return res.status(400).send("Invalid or missing prompt in request");
    }

    const autocompleteResponse = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.2,
      max_tokens: 1000,
      presence_penalty: 0.1,
      frequency_penalty: 0.1,
    });

    const { id, choices } = autocompleteResponse.data;
    return res.status(200).json({ id, text: choices[0]?.text });
  } catch (error) {
    console.error({ error });
    return res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, function () {
  console.log(`> Express server running on PORT ${PORT}`);
});
