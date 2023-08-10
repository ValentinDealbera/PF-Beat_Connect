const Cart = require("../../models/nosql/cart");
const Beats = require("../../models/nosql/beats");
const User = require("../../models/nosql/user");

module.exports = async (req, res) => {
  const { beatId, userId } = req.body;
  try {
    const beat = await Beats.findById(beatId);
    const user = await User.findById(userId);
    const cart = await Cart.findOne({ user: userId });

    if (!beat) {
      return res.status(400).json({ message: "Beat not found" });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!cart) {
      // create a new cart if it does not exist
      const newCart = new Cart({
        user: userId,
        beats: [{ beat: beatId, quantity: 1 }],
        totalAmount: beat.priceAmount,
      });

      await newCart.save();

      beat.inCart = true;
      await beat.save();

      return res.json({ message: "Beat added to cart", cart: newCart });
    }

    // check if the beat is already in the cart
    const beatInCartIndex = cart.beats.findIndex(
      (item) => item.beat.toString() === beatId,
    );

    if (beatInCartIndex === -1) {
      // add a new beat to the cart
      cart.beats.push({ beat: beatId, quantity: 1 });
      cart.totalAmount += beat.priceAmount;

      await cart.save();

      beat.inCart = true;
      await beat.save();

      return res.json({ message: "Beat added to cart", cart });
    } else {
      return res.status(400).json({ message: "Beat already in cart" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
