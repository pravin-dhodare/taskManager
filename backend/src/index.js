const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");
require("dotenv").config();

const PORT = process.env.PORT;
const connectionString = process.env.MONGODB_URI;

mongoose.connect(connectionString, config.mongooseOptions)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});