const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require('helmet');
const router = require("./routes/task.route");

const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(helmet());
app.use(express.urlencoded({extended: true}));

app.use("/taskmanager", router);


app.get("/", (req, res) => {
//   res.send("Hello, This is Task Manager app backend!");
  res.json("Hello, This is Task Manager app backend!");
});

module.exports = app;