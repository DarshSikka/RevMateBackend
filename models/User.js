const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  profile: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const User = mongoose.model("User", schema, "users");
module.exports = User;
