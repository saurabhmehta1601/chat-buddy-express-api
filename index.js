const { Configuration, OpenAIApi } = require("openai");
const uuid = require("uuid").v4;
const express = require("express");

const config = new Configuration({ apiKey: process.env.OPENAI_API_KEY });
const openai = new OpenAIApi(config);

const app = express();
const PORT = 80;

app.get("/", function (req, res) {
  return res.send("Hello from Chat Buddy.");
});

app.post("/autocomplete", function (req, res) {
  return res.status(200).json({ message: "get autocomplete" });
});

app.listen(PORT, function () {
  console.log(`> Express server running on PORT ${PORT}`);
});
