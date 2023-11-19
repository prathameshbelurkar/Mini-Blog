const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios");

const app = express();
const PORT = 4001;

/*
Dummy Db

{
  <post-id>: [
    {
      id: <comment-id>,
      content: ""
    }
  ]
}
*/
const commentsByPostId = {};

app.use(cors());
app.use(bodyParser.json());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;

  const comments = commentsByPostId[req.params.id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[req.params.id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      content,
      postId: req.params.id,
    },
  });
  res.status(201).send({
    status: "success",
    comments,
  });
});

app.post("/events", (req, res) => {
  const event = req.body;
  console.log(`${PORT} recieved: ${event.type}`);

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Comments Server is listening on ${PORT}`);
});
