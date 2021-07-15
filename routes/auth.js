const express = require("express");
const router = express.Router();
const User = require("../models/User.js");
const cors = require("cors");
router.post("/signup", cors(), (req, res) => {
  const { username, password, profile } = req.body;
  console.log(req.body);
  if (password.length > 0) {
  }
  User.findOne({ username }, (err, result) => {
    if (err) throw err;
    if (!result) {
      const usr = new User({
        username,
        password,
        profile,
      });
      usr.save();
      res.send({
        error: false,
        message: "Successfully Created the User",
      });
    } else {
      res.send({
        error: true,
        message: "Invalid Username",
      });
    }
  });
});
router.post("/login", cors(), (req, res) => {
  const { username, password } = req.body;
  User.findOne({ username, password }, (err, result) => {
    if (!result) {
      res.send({
        error: true,
        message: "Wrong Password/Username",
      });
    } else {
      res.send({
        error: false,
        message: "Authorized",
        userid: result._id,
      });
    }
  });
});
module.exports = router;
