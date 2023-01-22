const express = require("express");
const bcrypt = require("bcrypt");
const { UserModel } = require("../Models/user.model");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");

userRouter.post("/register", (req, res) => {
  const data = req.body;
  bcrypt.hash(data.password, 10, async (err, hash) => {
    if (err) {
      console.log(err);
      res.status(401);
      res.send({ msg: "Something went wrong" });
    } else {
      const user = new UserModel({ ...data, password: hash });
      try {
        await user.save();
        res.send({
          msg: "Registration successfull",
        });
      } catch (err) {
        console.log(err);
        res.status(401);
        res.send({ msg: "Something went wrong" });
      }
    }
  });
});

userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.find({ email });
    if (user.length > 0) {
      bcrypt.compare(password, user[0].password, (err, result) => {
        if (result) {
          const token = jwt.sign({ userID: user[0]._id }, "priyank");
          res.send({ msg: "login successfull", token: token });
        } else {
          res.status(401);
          res.send({ msg: "Invalid Credentials" });
        }
      });
    } else {
      res.status(401);
      res.send({ msg: "User Not Found" });
    }
  } catch (e) {
    console.log(err);
    res.status(401);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = { userRouter };
