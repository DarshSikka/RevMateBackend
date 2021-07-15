const express = require("express");
const cors = require("cors");
const Dictation = require("../models/Dictation");
const router = express.Router();
router.post("/new", cors(), (req, res) => {
  const { publiclyVisible, dicData, createdBy, name } = req.body;
  const newDic = new Dictation({
    publiclyVisible,
    dicData,
    createdBy,
    name,
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
      res.send(result);
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
router.get("/dictationsforuser", cors(), (req, res) => {
  const { user } = req.query;
  Dictation.find({ createdBy: user }, (err, result) => {
    if (err) throw err;
    if (!result) {
      res.send({ error: true, message: "User not found" });
    }
    res.send({
      error: false,
      message: result,
    });
  });
});
module.exports = router;
