const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 4006;

app.use(cors());
app.use(bodyParser.json());

/* 
Dummy DB

const posts = {
  <post-id>: {
    id: <post-id>,
    comments: [
      {
        id: <comment-id>,
        content: '',
        status: ''
      }
    ],
  }
}
*/
const posts = {};

app.get("/posts", (req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id, title, comments: [] };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((c) => {
      return c.id === id;
    });
    comment.status = status;
    comment.content = content;
  }

  res.send({});
});

app.listen(PORT, () => {
  console.log(`Query server is listening on ${PORT}`);
});
