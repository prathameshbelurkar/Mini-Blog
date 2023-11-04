const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
const PORT = 4000;

app.use(bodyParser.json());

// DUMMY DATA
const posts = {};

app.get("/posts", (_, res) => {
  res.send(posts);
});

app.post("/posts", (req, res) => {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;
  posts[id] = {
    id,
    title,
  };
  res.status(201).send({ status: "success", post: posts[id] });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
