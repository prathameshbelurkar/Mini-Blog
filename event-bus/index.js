const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const PORT = 4005;

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/events", (req, res) => {
  const event = req.body;

  axios.post("http://localhost:4000/events", event); // Posts
  axios.post("http://localhost:4001/events", event); // Comments
  // axios.post("http://localhost:4002/events", event); // Query
  res.send({ status: "OK" });
});

app.listen(PORT, () => {
  console.log(`Event bus is listening on ${PORT}`);
});
