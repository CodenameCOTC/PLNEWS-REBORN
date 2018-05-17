const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const morgan = require("morgan");
const path = require("path");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Morgan logging HTTP Request
app.use(morgan("tiny"));

// DB Config
const db = require("./config/keys").mongoURI;
const option = {
  autoIndex: false,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 500,
  bufferMaxEntries: 0
};
mongoose
  .connect(db, option)
  .then(() => console.log("Successfully connect to DB host"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

// Requiring routes
const users = require("./routes/api/users");
const news = require("./routes/api/news");

// Use API routes
app.use("/api/users", users);
app.use("/api/news", news);

const port = process.env.PORT || 5000;

app.listen(port, (req, res) => {
  console.log(`Server running at http://localhost:${port}/`);
});
