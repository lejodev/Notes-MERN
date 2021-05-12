const express = require("express");
const user = require("./routes/user");
const mongoose = require("mongoose");
const expressJWT = require("express-jwt");
require("dotenv").config();

require("dotenv/config");

const app = express();
app.use(express.json());

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to the database");
});

app.use(
  expressJWT({ secret: process.env.JWT_SECRET, algorithms: ["HS256"] }).unless({
    path: ["/user/signin", "/user/login"],
  })
);

app.use("/user", user);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
