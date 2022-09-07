const express = require("express");

const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv/config");

//Middleware
app.use(cors());
app.use(bodyParser.json());

//Import Routes
const postsRoute = require("./routes/posts");
const userAuthRoute = require("./routes/user-auth");
const siteRoute = require("./routes/sites");
const siteDataRoute = require("./routes/siteData");

app.use("/posts", postsRoute);
app.use("/api/users", userAuthRoute);
app.use("/api/sites", siteRoute);
app.use("/api/sitedata", siteDataRoute);

//Routes
app.get("/", (req, res) => {
  res.send("Connected!");
});

//connect to db
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("connected to db");
});

//Start listening
app.listen(process.env.PORT);
