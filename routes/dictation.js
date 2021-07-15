const express = require("express");
const cors = require("cors");
const Dictation = require("../models/Dictation");
const router = express.Router();
router.post("/new", cors(), (req, res) => {
  const { publiclyVisible, questions, answers, createdBy } = req.body;
  const newDic = new Dictation({
    publiclyVisible,
    questions,
    answers,
    createdBy,
  });
  res.send(newDic);
  newDic.save();
});
router.get("/dictation/:id", (req, res) => {
  const { id } = req.params;
  Dictation.findOne({ _id: id }, (err, result) => {
    if (!result) {
      res.status(404).send({
        error: true,
        message: "Not Found",
      });
    } else {
      res.send({ ...result, error: false });
    }
  });
});
router.post("/delete", (req, res) => {
  const { id } = req.body;
  Dictation.deleteOne({ _id: id }, (err) => {
    if (err) res.send({ error: true, message: err });
    res.send({ error: false, message: "Deleted that dictation" });
  });
});
router.get("/dictationsforuser", (req, res) => {
  const { user } = req.body;
  Dictation.findOne({ createdBy: user }, (err, result) => {
    if (err) throw err;
  });
});
module.exports = router;
