const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  dictation: {
    type: Array,
    required: true,
  },
  publiclyVisible: {
    type: Boolean,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
});
const Dictation = mongoose.model("Dictation", schema, "dictations");
module.exports = Dictation;
