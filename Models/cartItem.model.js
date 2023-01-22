const { default: mongoose } = require("mongoose");

const cartItemSchema = mongoose.Schema({
  name: String,
  image: String,
  brand: String,
  price: Number,
  userID: String,
});

const CartItemModel = mongoose.model("cartItems", cartItemSchema);

module.exports = { CartItemModel };
