const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Username must be required"],
    unique: [true, "Username must me unique"],
  },
  email: {
    type: String,
    require: [true, "email must be required"],
    unique: [true, "email must me unique"],
  },
  password: {
    type: String,
    require: [true, "password must be required"],
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;
