const express = require("express");
const cors = require("cors");
const Dictation = require("../models/Dictation");
const User = require("../models/User");
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
  User.findOne({ _id: user }, (err, result) => {
    if (!result) {
      resp.send({ error: true, message: "User not found" });
    }
    Dictation.find({ createdBy: result.username }, (erro, resp) => {
      if (erro) throw erro;
      if (!resp) {
        return res.send({ error: true, message: "User not found" });
      }
      res.send({
        error: false,
        message: resp,
      });
    });
  });
});
router.get("/public", cors(), (req, res) => {
  Dictation.find({ publiclyVisible: true }, (err, result) => {
    res.send(result);
  });
});
module.exports = router;
