const Cart = require("../../models/nosql/cart");

module.exports = async (req, res) => {
  const productCart = await Cart.find();
  if (productCart) {
    res.json({ productCart });
  } else {
    res.json({ message: "no products in cart" });
  }
};
