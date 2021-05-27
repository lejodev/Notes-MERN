const express = require("express");
const user = require("./routes/user");
const notes = require("./routes/notes");
const mongoose = require("mongoose");
const expressJWT = require("express-jwt");
const path = require("path");
require("dotenv/config");


const app = express();
app.use(express.json());
const jwtKey = process.env.JWT_SECRET;

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to the database");
});

app.use(
  expressJWT({ jwtKey, algorithms: ["HS256"] }).unless({
    path: ["/user/signin", "/user/login"],
  })
);

app.use("/user", user);
app.use("/notes", notes);

const PORT = process.env.PORT || 8080;

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname + "client/build/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
