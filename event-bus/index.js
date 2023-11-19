const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const PORT = 4005;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/events", async (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event); // Posts
  axios.post("http://localhost:4001/events", event); // Comments
  axios.post("http://localhost:4006/events", event); // Query
  axios.post("http://localhost:4007/events", event); // Moderation

  res.send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Event bus is listening on ${PORT}`);
});
