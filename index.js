const express = require("express");
const app = express();
const parser = require("body-parser");
const cors = require("cors");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const auth = require("./routes/auth");
app.use(parser.json());
app.use(cors());
app.use("/auth", auth);
require("dotenv").config();
mongoose.connect(
  process.env.DB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err, result) => {
    if (err) throw err;
    console.log("Connected to database");
  }
);
app.listen(port, () => console.log(`Listening on port ${port}`));
