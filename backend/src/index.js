require("dotenv").config();

const app = require("./app");
const mongoose = require("mongoose");
const config = require("./config/config");

const PORT = config.PORT;
const connectionString = config.MONGODB_URI;

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