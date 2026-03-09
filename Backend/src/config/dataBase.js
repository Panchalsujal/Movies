const mongoose = require("mongoose");

function connectToDB() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("Server is connect to DataBase");
  });
}

module.exports = connectToDB;
