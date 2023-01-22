const express = require("express");
const { CartItemModel } = require("../Models/cartItem.model");

const CartRouter = express.Router();

CartRouter.get("/", async (req, res) => {
  const userID = req.body.userID;
  try {
    const cartItems = await CartItemModel.find({ userID, ...req.query });
    res.json(cartItems);
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went Wrong" });
  }
});

CartRouter.post("/create", async (req, res) => {
  try {
    const cartItem = new CartItemModel(req.body);
    await cartItem.save();
    res.send({ msg: "cartItem has been created" });
  } catch (e) {
    console.log(e);
    res.send({ msg: "Something went Wrong" });
  }
});

CartRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { userID } = req.body;
  try {
    const cartItem = await CartItemModel.findById(id);
    if (cartItem.userID == userID) {
      await CartItemModel.findByIdAndDelete(id);
      res.send({ msg: "cartItam has baan deleted" });
    } else {
      res.status(401);
      res.send({ msg: "User not matched" });
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went Wrong" });
  }
});

module.exports = { CartRouter };
