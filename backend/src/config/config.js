const { default: mongoose } = require("mongoose");

module.exports = {
  MONGODB_URI: process.env.MONGODB_URI || "mongodb://localhost:27017/task-manager",
  PORT: process.env.PORT || 3000,
  mongooseOptions: {
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        }
};