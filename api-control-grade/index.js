const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

global.filename = "grades.json";

const app = express();
const server = require("http").Server(app);
const PORT = process.env.PORT || 3333;

app.use(morgan("dev"));
app.use(cors());

app.use(express.json());

app.use(require("./routes"));

server.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});
