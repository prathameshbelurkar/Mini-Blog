const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const PORT = 4005;

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Storing all events recieved
const events = [];

app.post("/events", async (req, res) => {
  const event = req.body;
  events.push(event);

  // Posts
  axios.post("http://localhost:4000/events", event).catch((err) => {
    console.log(err.message);
  });

  // Comments
  axios.post("http://localhost:4001/events", event).catch((err) => {
    console.log(err.message);
  });

  // Query
  axios.post("http://localhost:4006/events", event).catch((err) => {
    console.log(err.message);
  });

  // Moderation
  axios.post("http://localhost:4007/events", event).catch((err) => {
    console.log(err.message);
  });

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(PORT, () => {
  console.log(`Event bus is listening on ${PORT}`);
});
