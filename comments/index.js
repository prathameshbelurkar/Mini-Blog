const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");

const app = express();
const PORT = 4001;

// DUMMY DATA
const commentsByPostId = {};

app.use(cors());
app.use(bodyParser.json());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  res.status(201).send({
    status: "success",
    comments,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
