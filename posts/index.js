const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());

// DUMMY DATA
const posts = {};

app.get("/posts", (_, res) => {
  res.send(posts);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id,
      title,
    },
  });
  res.status(201).send({ status: "success", post: posts[id] });
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(`${PORT} recieved: ${event.type}`);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Posts server is listening on ${PORT}`);
});
