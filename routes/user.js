const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();

require("dotenv").config();

router.post("/signin", async (req, res) => {
  const userExists = await User.find({ userName: req.body.userName }).then(
    (resp) => resp.length > 0
  );

  if (userExists) {
    res.status(201).json({ messagw: "User already exists" });
  } else {
    const user = new User({
      userName: req.body.userName,
      password: req.body.password,
    });
    user
      .save()
      .then((data) => {
        console.log("Created", data);
        res.status(200).send({ message: "User created successfully" });
      })
      .catch((err) => {
        console.log("ERROR", err);
      });
  }
});

router.post("/login", async (req, res) => {
  const body = {
    userName: req.body.userName,
    password: req.body.password, // Encode password
  };

  const user = await User.findOne({
    userName: req.body.userName,
    password: req.body.password,
  });

  if (user != null) {
    console.log("USER", user);
    const payload = { id: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.status(200).json({ token: token });
  } else {
    res.status(400).json({ message: "No user found" });
  }
  console.log(req.body);
  console.log(body);
});

module.exports = router;
