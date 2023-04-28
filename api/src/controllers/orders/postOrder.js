const userModel = require("../../models/nosql/user");
const OrderModel = require("../../models/nosql/orders");
const beatModel = require("../../models/nosql/beats");

module.exports = async (req, res) => {
  try {
    const today = new Date();
    const { buyer, beat } = req.body;
    const beatBuyed = await beatModel.findById(beat);
    const comprobacion = await userModel.findById(buyer);
    if (comprobacion.bougthBeats.includes(beat))
      return res
        .status(400)
        .json({ message: "No puedes comprar un beat que ya tienes" });
    if (buyer === beatBuyed.userCreator)
      return res
        .status(400)
        .json({ message: "No puedes comprar tu propio beat" });
    const order = await OrderModel.create({
      buyer,
      seller: beatBuyed.userCreator,
      beat,
      date: today.toLocaleDateString("es"),
    });
    const buyerUser = await userModel.findById(buyer);
    buyerUser.bougthBeats = [...buyerUser.bougthBeats, beat];
    buyerUser.userOrders = [...buyerUser.userOrders, order._id];
    await buyerUser.save();
    const sellerUser = await userModel.findById(beatBuyed.userCreator);
    sellerUser.userOrders = [...sellerUser.userOrders, order._id];
    await sellerUser.save();
    res.status(200).json(order);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
