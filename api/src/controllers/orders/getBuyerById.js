const OrderModel = require("../../models/nosql/orders");

module.exports = async (req, res) => {
  try {
    const { userBuyerId } = req.params;
    const orders = await OrderModel.find({ buyer: userBuyerId })
      .populate("beat")
      .populate("buyer")
      .populate("seller");
    if (orders.length === 0)
      return res
        .status(400)
        .json({ message: "Este usuario no tiene ninguna order" });
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
