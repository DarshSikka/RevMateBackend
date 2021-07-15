const mongoose = require("mongoose");
const schema = new mongoose.Schema({
  questions: {
    type: Array,
    required: true,
  },
  answers: {
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
});
const Dictation = mongoose.model("Dictation", schema, "dictations");
module.exports = Dictation;
