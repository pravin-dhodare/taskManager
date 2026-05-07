const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
// const taskRoutes = require("./routes/taskRoutes");

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
// app.use("/tasks", taskRoutes);


app.get("/", (req, res) => {
//   res.send("Hello, This is Task Manager app backend!");
  res.json("Hello, This is Task Manager app backend!");
});

module.exports = app;