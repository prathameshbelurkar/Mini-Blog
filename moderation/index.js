const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = 4007;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/events", () => {});

app.listen(PORT, () => {
  console.log(`Moderation is listening on ${PORT}`);
});
