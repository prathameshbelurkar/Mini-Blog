const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 4001;

app.use(cors());
app.use(bodyParser.json());

app.listen(PORT, () => {
  console.log(`Query server is listening on ${PORT}`);
});
